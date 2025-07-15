// docs/index.js
import swaggerJSDoc from 'swagger-jsdoc';
import authDocs from './auth.docs.js'; 
import brandDocs from './brand.docs.js';
import cartDocs from './cart.docs.js';
import categoryDocs from './category.docs.js';
import productDocs from './product.docs.js';
import orderDocs from './order.docs.js';
import couponDocs from './coupon.docs.js';  
import subCategoryDocs from './subCategory.docs.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce API',
            version: '1.0.0',
            description: 'API documentation for E-Commerce app',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
        paths: {
            ...authDocs, 
            ...brandDocs,
            ...cartDocs,
            ...categoryDocs,
            ...productDocs,
            ...orderDocs,
            ...couponDocs,
            ...subCategoryDocs,
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
