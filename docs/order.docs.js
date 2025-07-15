// docs/order.docs.js
export default {
    '/': {
        post: {
            tags: ['Order'],
            summary: 'Create a new order',
            description: 'Authenticated users can place a new order.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['cartItems', 'address'],
                            properties: {
                                cartItems: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            productId: { type: 'string', example: '64b123abc456' },
                                            quantity: { type: 'number', example: 2 }
                                        }
                                    }
                                },
                                address: { type: 'string', example: '123 Nile Street, Cairo, Egypt' },
                                note: { type: 'string', example: 'Please deliver between 6-8 PM' }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: 'Order created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' }
            }
        }
    },

    '/{orderId}': {
        patch: {
            tags: ['Order'],
            summary: 'Cancel an existing order',
            description: 'Authenticated users can cancel their orders.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'orderId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Order ID to cancel'
                }
            ],
            requestBody: {
                required: false,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                reason: {
                                    type: 'string',
                                    example: 'Changed my mind'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: 'Order cancelled successfully' },
                400: { description: 'Invalid order ID or request' },
                401: { description: 'Unauthorized' }
            }
        }
    }
};
