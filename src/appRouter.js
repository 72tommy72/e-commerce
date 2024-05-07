import authRouter from './modules/auth/auth.router.js'
import categoryRouter from './modules/category/category.router.js'
import subCategoryRouter from './modules/subCategory/subCategory.router.js'
import brandRouter from './modules/brand/brand.router.js'
import productRouter from './modules/product/product.router.js'
import morgan from 'morgan'
import couponRouter from './modules/coupon/coupon.router.js'
import cartRouter from './modules/cart/cart.router.js'
import orderRouter from './modules/order/order.router.js'

export const appRouter = (app, express) => {
    //morgan
    if (process.env.NODE_ENV === "dev") {
        app.use(morgan("dev"));
    } else {
        app.use(morgan("combined"));
    }
    // //cors
    // const whiteList = [];
    // app.use((req, res, next) => {
    //     //activation account
    //     if (req.originalUrl.includes('/auth/confirmEmail')) {
    //         res.setHeader('Access-Control-Allow-Origin', "*");
    //         res.setHeader('Access-Control-Allow-Headers', "GET");
    //         return next();
    //     }
    //     if (!whiteList.includes(req.header('origin'))) {
    //         return next(new Error('blocked by cors'));
    //     }
    //     res.setHeader('Access-Control-Allow-Origin', "*");
    //     res.setHeader('Access-Control-Allow-Headers', "*");
    //     res.setHeader('Access-Control-Allow-Methods', "*");
    //     res.setHeader('Access-Control-Allow-Private-Network', true);
    //     return next();
    // })
    //global Routes
    app.use((req, res, next) => { // parse data from cover to Json
        if (req.originalUrl === '/order/webhook') {
            return next();
        }
        express.json()(req, res, next);
    }) 
    //APIs for user
    app.use('/auth', authRouter)
    //APIs for category
    app.use('/category', categoryRouter)

    //APIs for subCategory
    app.use('/subCategory', subCategoryRouter)
    //APIs for brand
    app.use('/brand', brandRouter)
    //APIs for product
    app.use('/product', productRouter)
    //APIs for coupon
    app.use('/coupon', couponRouter)
    //APIs for cart
    app.use('/cart', cartRouter)
    //APIs for order
    app.use('/order', orderRouter)

    // Not Found Page 
    app.use('/*', (req, res, next) => {
        return next(new Error('Not Found', { cause: 404 }));
    })

    //error handler
    app.use((error, req, res, next) => {
        return res.status(error.cause || 500).json({
            success: false,
            message: error.message,
            stack: error.stack
        })
    })

}