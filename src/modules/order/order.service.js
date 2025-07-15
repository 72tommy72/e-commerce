import { Cart } from "../cart/cart.model.js"
import { Product } from "../product/product.model.js"

export const clearCart = async(userId) => {
    await Cart.findOneAndUpdate({ user : userId}, {products : []})
}
export const updateStock = async (products, placeOrder) => {
    //PLACE order true / false
    if (placeOrder ) {
        for (const product of products) {
        await Product.findOneAndUpdate(product.productId, {
            $inc: {
                availableItems: -product.quantity,
                soldItems: product.quantity
            }
        })  
    }
    } else {
        for (const product of products) {
            await Product.findOneAndUpdate(product.productId, {
                $inc: {
                    availableItems: product.quantity,
                    soldItems: -product.quantity
                }
            })
        }
    }
    
}