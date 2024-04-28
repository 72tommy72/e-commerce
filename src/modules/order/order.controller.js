import { Cart } from "../../../DB/models/cart.model.js";
import { OrderModel } from "../../../DB/models/order.model.js";
import { Product } from "../../../DB/models/product.model.js";
import { catchError } from "../../utils/catchError.js";
import { createInvoice } from "../../utils/createInvoice.js";
import { fileURLToPath } from 'url'
import path from 'path'
import cloudinary from "../../utils/cloud.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { clearCart, updateStock } from "./order.service.js";
import Stripe from "stripe";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const createOrder = catchError(async (req, res, next) => {
    //data
    const { payment, phone, address, coupon } = req.body;
    //check coupon
    let checkCoupon;
    if (coupon) {
        checkCoupon = await coupon.findOne({ name: coupon, expiredAt: { $gt: new Date() } });
        if (!coupon) return next(new Error('invalid coupon! '))
    }
    
    //check cart
    const cart = await Cart.findOne({ user: req.user._id })
    const products = cart.products
    if (products.length < 1) {
        return next(new Error('Empty cart'))
    }
    let orderPrice = 0;
    let orderProducts = [];
    //check products
    for (let i = 0; i < products.length; i++) {
        //check product
        const product = await Product.findById(products[i].productId)
        if (!product) return next(new Error(`product ${products[i].productId}not found!`))
        if (!product.inStock(products[i].quantity)) return next(new Error(` ${product.name} out of stock!`))

        orderProducts.push({
            productId: product._id,
            quantity: products[i].quantity,
            name: product.name,
            itemPrice: product.finalPrice,
            totalPrice: products[i].quantity * product.finalPrice,
        })
        orderPrice += products[i].quantity * product.finalPrice;
    }

    //create order
    const order = await OrderModel.create({
        user: req.user._id,
        products: orderProducts,
        address,
        phone,
        coupon: {
            id: checkCoupon?._id,
            name: checkCoupon?.name,
            discount: checkCoupon?.discount
        },
        payment,
        price: orderPrice,
    })
    //generate invoice
    user = req.user
    const invoice = {
        shipping: {
            name: user.userName,
            address: order.address,
            country: "EG",
        },
        items: order.products,
        subTotal: order.price,
        paid: order.finalPrice,
        invoice_nr: order._id,
        
    }
    const pdfPath = path.join(__dirname, `./.././../../invoiceTemp/${order._id}.pdf`)
    
    createInvoice(invoice, pdfPath);
    //upload cloud
    const { secure_url, public_id } = await cloudinary.uploader.upload(pdfPath,
        { folder: `${process.env.FOLDER_CLOUD_NAME}/order/invoice/${user._id}` })
    //TODO delete from file system
    fs.unlinkSync(pdfPath);
    //add invoice to order
    order.invoice = { id: public_id, url: secure_url };
    await order.save();
    //send Email
    const isSent = await sendEmail({
        to: user.email,
        subject: 'order invoice',
        attachments: [{
            path: secure_url,
            contentType: 'application/pdf'
        }]
    })
    if (isSent) {
        //update stock
        updateStock(order.products, true)
        //clear cart
        clearCart(user._id)
    }
    //strip payment 
    if (payment == 'visa') { 
        const stripe = new Stripe(process.env.STRIPE_KEY)
        let existCoupon;
        if (order.coupon.name !== undefined) {
            existCoupon = await stripe.coupons.create({
                percent_off: order.coupon.discount,
                duration: "once"
            })
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            metedate : {order_id: order._id.toString()},
            success_url: "http://success.com", // link
            cancel_url: "http://cancel.com", /// link
            line_items: order.product.map((product) => {
                return {
                    price_data: {
                        currency: 'EGP',
                        product_data: { name: product.name, images: [product.productId.defaultImage.url] },
                        unit_amount: product.itemPrice * 100,
                        quantity: product.quantity
                    }
                }
            }),
            discounts: existCoupon ? [{ coupon: existCoupon.id }] : [],

        }) 
        return res.json({
            success: true,
            results: session.url
        })
    }
    //response
    return res.json({
        success: true,
        message: 'order placed successfully please check your email'
    })
});
export const cancelOrder = catchError(async (req, res, next) => {
    const order = await OrderModel.findById(req.params.orderId);
    if (!order)
        return next(new Error('order not found'));
    if (order.status === "shipped" || 'delivered')
        return next(new Error('can\'t\ canceled order '));
    order.status = 'canceled'
    order.save();

    updateStock(order.products , false)
    //response
    return res.json({
        success: true,
        message: 'order canceled successfully '
    })
});
