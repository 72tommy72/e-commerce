// docs/subCategory.docs.js
export default {
    '/{categoryId}/subCategory': {
        post: {
            tags: ['SubCategory'],
            summary: 'Create a sub-category under a category',
            description: 'Admin-only route. Requires categoryId in the URL.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'categoryId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Parent category ID'
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            required: ['name', 'subCategory'],
                            properties: {
                                name: { type: 'string', example: 'Smartphones' },
                                subCategory: {
                                    type: 'string',
                                    format: 'binary',
                                    description: 'Image for the sub-category'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: 'Sub-category created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (admin only)' }
            }
        },

        get: {
            tags: ['SubCategory'],
            summary: 'Get all sub-categories for a category',
            parameters: [
                {
                    name: 'categoryId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Parent category ID'
                }
            ],
            responses: {
                200: {
                    description: 'List of sub-categories',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' },
                                        image: { type: 'string' },
                                        categoryId: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    '/{categoryId}/subCategory/{subCategoryId}': {
        patch: {
            tags: ['SubCategory'],
            summary: 'Update a sub-category',
            description: 'Admin-only route to update name/image of a sub-category',
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: 'categoryId', in: 'path', required: true, schema: { type: 'string' } },
                { name: 'subCategoryId', in: 'path', required: true, schema: { type: 'string' } }
            ],
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: { type: 'string', example: 'Updated SubCategory' },
                                subCategory: { type: 'string', format: 'binary' }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: 'Sub-category updated successfully' },
                400: { description: 'Invalid data' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (admin only)' }
            }
        },

        delete: {
            tags: ['SubCategory'],
            summary: 'Delete a sub-category',
            security: [{ bearerAuth: [] }],
            parameters: [
                { name: 'categoryId', in: 'path', required: true, schema: { type: 'string' } },
                { name: 'subCategoryId', in: 'path', required: true, schema: { type: 'string' } }
            ],
            responses: {
                200: { description: 'Sub-category deleted successfully' },
                404: { description: 'Sub-category not found' },
                403: { description: 'Forbidden (admin only)' }
            }
        }
    }
};
