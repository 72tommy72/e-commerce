// docs/auth.docs.js
export default {
    '/auth/register': {
        post: {
            tags: ['Auth'],
            summary: 'Register a new user',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['name', 'email', 'password'],
                            properties: {
                                name: { type: 'string', example: 'Mohamed Hatem' },
                                email: { type: 'string', example: 'mohamed@example.com' },
                                password: { type: 'string', example: '12345678' }
                            }
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'User registered successfully'
                },
                400: {
                    description: 'Validation error or user already exists'
                }
            }
        }
    },

    '/auth/confirmEmail/{activationCode}': {
        get: {
            tags: ['Auth'],
            summary: 'Activate account using email confirmation code',
            parameters: [
                {
                    name: 'activationCode',
                    in: 'path',
                    required: true,
                    schema: { type: 'string' },
                    description: 'Activation code sent to user email'
                }
            ],
            responses: {
                200: { description: 'Account activated successfully' },
                400: { description: 'Invalid or expired activation code' }
            }
        }
    },

    '/auth/login': {
        post: {
            tags: ['Auth'],
            summary: 'Login user and return access token',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password'],
                            properties: {
                                email: { type: 'string', example: 'mohamed@example.com' },
                                password: { type: 'string', example: '12345678' }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Login successful'
                },
                401: {
                    description: 'Invalid credentials'
                }
            }
        }
    },

    '/auth/forgetPassword': {
        patch: {
            tags: ['Auth'],
            summary: 'Send password reset link to user email',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email'],
                            properties: {
                                email: { type: 'string', example: 'mohamed@example.com' }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: 'Reset email sent successfully' },
                404: { description: 'Email not found' }
            }
        }
    },

    '/auth/resetPassword': {
        patch: {
            tags: ['Auth'],
            summary: 'Reset user password after email verification',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'newPassword', 'code'],
                            properties: {
                                email: { type: 'string', example: 'mohamed@example.com' },
                                newPassword: { type: 'string', example: 'newpass123' },
                                code: { type: 'string', example: 'ABC123' }
                            }
                        }
                    }
                }
            },
            responses: {
                200: { description: 'Password reset successful' },
                400: { description: 'Invalid reset code or email' }
            }
        }
    }
};
