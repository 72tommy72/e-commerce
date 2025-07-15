// docs/brand.docs.js
export default {
    '/createBrand': {
        post: {
            tags: ['Brand'],
            summary: 'Create a new brand',
            description: 'Admin only route. Uploads brand image and creates new brand.',
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                BrandImage: {
                                    type: 'string',
                                    format: 'binary',
                                    description: 'Brand image file',
                                },
                                name: {
                                    type: 'string',
                                    example: 'Nike',
                                }
                            },
                            required: ['BrandImage', 'name']
                        }
                    }
                }
            },
            security: [{ bearerAuth: [] }],
            responses: {
                201: {
                    description: 'Brand created successfully',
                },
                400: {
                    description: 'Validation error or unauthorized',
                },
                401: {
                    description: 'Unauthorized (no token)',
                },
                403: {
                    description: 'Forbidden (not admin)',
                },
            }
        }
    },

    '/{brandId}': {
        patch: {
            tags: ['Brand'],
            summary: 'Update an existing brand',
            description: 'Admin only route. Allows image and data update.',
            parameters: [
                {
                    name: 'brandId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Brand ID to update',
                }
            ],
            requestBody: {
                required: false,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                BrandImage: {
                                    type: 'string',
                                    format: 'binary',
                                },
                                name: { type: 'string', example: 'New Brand Name' }
                            }
                        }
                    }
                }
            },
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Brand updated successfully' },
                400: { description: 'Invalid brand ID or bad input' },
                403: { description: 'Not authorized' },
            }
        },

        delete: {
            tags: ['Brand'],
            summary: 'Delete a brand',
            parameters: [
                {
                    name: 'brandId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Brand ID to delete',
                }
            ],
            security: [{ bearerAuth: [] }],
            responses: {
                200: { description: 'Brand deleted successfully' },
                404: { description: 'Brand not found' },
                403: { description: 'Not authorized' },
            }
        }
    },

    '/': {
        get: {
            tags: ['Brand'],
            summary: 'Get all brands',
            responses: {
                200: {
                    description: 'List of all brands',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' },
                                        image: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
