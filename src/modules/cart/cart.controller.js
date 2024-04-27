import { catchError } from "../../utils/catchError.js";
import { Product } from "../../../DB/models/product.model.js";
import { Cart } from "../../../DB/models/cart.model.js";

export const addToCart = catchError(async (req, res, next) => {
    //data
    const { userId } = req.user;
    const { productId, quantity } = req.body;

    //check productId
    const checkProduct = await Product.findOne({
        _id: productId,
        availableItems: { $gte: quantity },
    });
    if (!checkProduct)
        return next(new Error("please check the quantity ", { cause: 401 }));

    //check he has cart
    const cartUser = await Cart.findOne({ _id: userId }).lean() // to turn form json to object;
    if (cartUser) {
        //update quantity
        let productExist = false;
        for (const product of cartUser.products) {
            if (productId == product.productId) {
                productExist = true;
                product.quantity = quantity;
            }
        }
        
        //push new product
        if (!productExist) {
            cartUser.products.push({ productId, quantity });
        }
        let subTotal = 0
        for (const product of cartUser.products) {
            const productExist = await Product.findById(product.productId)
            subTotal += (productExist.finalPrice * product.quantity) || 0
        }
        const newCar = await Cart.findOneAndUpdate(
            { _id: userId },
            {
                subTotal,
                products: cartUser.products
            },
            { new: true }
        );
    }
    const cartObject = {
        userId,
        products: [{ productId, quantity }],
        subTotal: checkProduct.finalPrice * quantity,
    };
    const cartDB = await Cart.create(cartObject);
    //response
    return res.status(201).json({
        success: true,
        message: cartDB,
    });
});

export const deleteFromCart = catchError(async (req, res, next) => {
    //data
    const { userId } = req.user;
    const { productId } = req.body;

    //check productId
    const checkProduct = await Product.findOne({
        _id: productId
    });
    if (!checkProduct)
        return next(new Error("invalid product id ", { cause: 401 }));

    const cartUser = await Cart.findOne({ userId, 'products.productId': productId });
    if (!cartUser) return next(new Error("no product in cart  ", { cause: 401 })); 

    cartUser.products.forEach((ele) => {
        if (ele.productId == productId) {
            cartUser.products.splice(cartUser.products.indexOf(ele), 1)
        }
    })
    cartUser.save()
    //response
    return res.status(201).json({
        success: true,
        message: cartUser,
    });
})