// docs/coupon.docs.js
export default {
    '/': {
        post: {
            tags: ['Coupon'],
            summary: 'Create a new coupon',
            description: 'Admin only route to create a discount coupon.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['code', 'discount', 'expiresIn'],
                            properties: {
                                code: { type: 'string', example: 'SUMMER2025' },
                                discount: { type: 'number', example: 15 },
                                expiresIn: { type: 'string', example: '2025-09-01T00:00:00Z' }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: 'Coupon created successfully' },
                400: { description: 'Validation error or duplicate code' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (admin only)' }
            }
        },

        get: {
            tags: ['Coupon'],
            summary: 'Get all coupons',
            responses: {
                200: {
                    description: 'List of all coupons',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        code: { type: 'string' },
                                        discount: { type: 'number' },
                                        expiresIn: { type: 'string', format: 'date-time' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    '/{code}': {
        patch: {
            tags: ['Coupon'],
            summary: 'Update a coupon by code',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'code',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Coupon code to update'
                }
            ],
            requestBody: {
                required: false,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                discount: { type: 'number', example: 20 },
                                expiresIn: { type: 'string', example: '2025-12-01T00:00:00Z' }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: 'Coupon updated successfully' },
                400: { description: 'Invalid data' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (admin only)' }
            }
        },

        delete: {
            tags: ['Coupon'],
            summary: 'Delete a coupon by code',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'code',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Coupon code to delete'
                }
            ],
            responses: {
                200: { description: 'Coupon deleted successfully' },
                404: { description: 'Coupon not found' },
                403: { description: 'Forbidden (admin only)' }
            }
        }
    }
};
