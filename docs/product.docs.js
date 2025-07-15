// docs/product.docs.js
export default {
    '/': {
        post: {
            tags: ['Product'],
            summary: 'Create a new product',
            description: 'Admin only route to create a product with image uploads.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            required: ['name', 'price', 'stock', 'defaultImage'],
                            properties: {
                                name: { type: 'string', example: 'iPhone 15' },
                                price: { type: 'number', example: 999 },
                                stock: { type: 'number', example: 50 },
                                categoryId: { type: 'string', example: '64f05a1b7a0b1f3e28b1a2f1' },
                                defaultImage: {
                                    type: 'string',
                                    format: 'binary',
                                },
                                subdefaultImage: {
                                    type: 'array',
                                    items: {
                                        type: 'string',
                                        format: 'binary',
                                    }
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: 'Product created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (admin only)' }
            }
        },

        get: {
            tags: ['Product'],
            summary: 'Get all products',
            responses: {
                200: {
                    description: 'List of all products',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' },
                                        price: { type: 'number' },
                                        stock: { type: 'number' },
                                        images: { type: 'array', items: { type: 'string' } },
                                        category: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    '/category/{categoryId}': {
        get: {
            tags: ['Product'],
            summary: 'Get all products by category',
            parameters: [
                {
                    name: 'categoryId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Category ID to filter products'
                }
            ],
            responses: {
                200: { description: 'List of products by category' },
                400: { description: 'Invalid category ID' }
            }
        }
    },

    '/single/{productId}': {
        get: {
            tags: ['Product'],
            summary: 'Get a single product by ID',
            parameters: [
                {
                    name: 'productId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Product ID to retrieve'
                }
            ],
            responses: {
                200: {
                    description: 'Product details',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string' },
                                    name: { type: 'string' },
                                    price: { type: 'number' },
                                    stock: { type: 'number' },
                                    description: { type: 'string' },
                                    images: { type: 'array', items: { type: 'string' } },
                                    category: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                404: { description: 'Product not found' }
            }
        }
    },

    '/{productId}': {
        delete: {
            tags: ['Product'],
            summary: 'Delete a product',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'productId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Product ID to delete'
                }
            ],
            responses: {
                200: { description: 'Product deleted successfully' },
                404: { description: 'Product not found' },
                403: { description: 'Forbidden (admin only)' }
            }
        }
    }
};
