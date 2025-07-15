// docs/cart.docs.js
export default {
    '/': {
        post: {
            tags: ['Cart'],
            summary: 'Add item to cart',
            description: 'Authenticated users can add products to their cart.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['productId', 'quantity'],
                            properties: {
                                productId: {
                                    type: 'string',
                                    example: '64b7a23f4e30f2a1c7cda921'
                                },
                                quantity: {
                                    type: 'integer',
                                    example: 2
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Item added to cart successfully'
                },
                400: {
                    description: 'Invalid input or product not found'
                },
                401: {
                    description: 'Unauthorized'
                }
            }
        },

        delete: {
            tags: ['Cart'],
            summary: 'Remove item from cart',
            description: 'Authenticated users can remove items from their cart.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['productId'],
                            properties: {
                                productId: {
                                    type: 'string',
                                    example: '64b7a23f4e30f2a1c7cda921'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Item removed from cart successfully'
                },
                400: {
                    description: 'Invalid product ID or not in cart'
                },
                401: {
                    description: 'Unauthorized'
                }
            }
        },

        get: {
            tags: ['Cart'],
            summary: 'Get current cart contents',
            description: 'Returns all items in the authenticated user’s cart (not yet implemented).',
            security: [{ bearerAuth: [] }],
            responses: {
                200: {
                    description: 'Returns user cart',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    cart: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                productId: { type: 'string' },
                                                quantity: { type: 'integer' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized'
                }
            }
        }
    }
};
