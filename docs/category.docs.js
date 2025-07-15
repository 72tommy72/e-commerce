// docs/category.docs.js
export default {
    '/createCategory': {
        post: {
            tags: ['Category'],
            summary: 'Create a new category',
            description: 'Admin only route to create a category with image upload.',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            required: ['name', 'categoryImage'],
                            properties: {
                                name: { type: 'string', example: 'Electronics' },
                                categoryImage: {
                                    type: 'string',
                                    format: 'binary',
                                    description: 'Image for the category',
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                201: { description: 'Category created successfully' },
                400: { description: 'Validation error' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (not admin)' }
            }
        }
    },

    '/{categoryId}': {
        patch: {
            tags: ['Category'],
            summary: 'Update an existing category',
            description: 'Admin only route. Allows updating name and image.',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'categoryId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Category ID to update'
                }
            ],
            requestBody: {
                required: false,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: { type: 'string', example: 'Updated Name' },
                                categoryImage: {
                                    type: 'string',
                                    format: 'binary'
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: 'Category updated successfully' },
                400: { description: 'Invalid data or category not found' },
                401: { description: 'Unauthorized' },
                403: { description: 'Forbidden (not admin)' }
            }
        },

        delete: {
            tags: ['Category'],
            summary: 'Delete a category',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'categoryId',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Category ID to delete'
                }
            ],
            responses: {
                200: { description: 'Category deleted successfully' },
                404: { description: 'Category not found' },
                403: { description: 'Forbidden (not admin)' }
            }
        }
    },

    '/': {
        get: {
            tags: ['Category'],
            summary: 'Get all categories',
            responses: {
                200: {
                    description: 'List of all categories',
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
