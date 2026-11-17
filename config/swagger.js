const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Student Management System API",
            version: "1.0.0",
            description: "API documentation for managing student records."
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local development server"
            }
        ],
        tags: [
            {
                name: "Students",
                description: "Student management endpoints"
            },
            {
                name: "Health",
                description: "API and database health check"
            }
        ],
        components: {
            schemas: {
                StudentInput: {
                    type: "object",
                    required: [
                        "student_id",
                        "first_name",
                        "last_name",
                        "email"
                    ],
                    properties: {
                        student_id: {
                            type: "string",
                            example: "UNN/2024/12345"
                        },
                        first_name: {
                            type: "string",
                            example: "Cynthia"
                        },
                        last_name: {
                            type: "string",
                            example: "Vincent"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "cynthia@example.com"
                        },
                        phone: {
                            type: "string",
                            nullable: true,
                            example: "08012345678"
                        },
                        gender: {
                            type: "string",
                            nullable: true,
                            example: "Female"
                        },
                        date_of_birth: {
                            type: "string",
                            format: "date",
                            nullable: true,
                            example: "2004-05-12"
                        },
                        department: {
                            type: "string",
                            nullable: true,
                            example: "Computer Science"
                        },
                        course: {
                            type: "string",
                            nullable: true,
                            example: "Software Engineering"
                        },
                        level: {
                            type: "string",
                            nullable: true,
                            example: "300"
                        }
                    }
                },
                StudentUpdate: {
                    type: "object",
                    minProperties: 1,
                    properties: {
                        student_id: {
                            type: "string",
                            example: "UNN/2024/12345"
                        },
                        first_name: {
                            type: "string",
                            example: "Cynthia"
                        },
                        last_name: {
                            type: "string",
                            example: "Vincent"
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "cynthia@example.com"
                        },
                        phone: {
                            type: "string",
                            nullable: true,
                            example: "08012345678"
                        },
                        gender: {
                            type: "string",
                            nullable: true,
                            example: "Female"
                        },
                        date_of_birth: {
                            type: "string",
                            format: "date",
                            nullable: true,
                            example: "2004-05-12"
                        },
                        department: {
                            type: "string",
                            nullable: true,
                            example: "Computer Science"
                        },
                        course: {
                            type: "string",
                            nullable: true,
                            example: "Software Engineering"
                        },
                        level: {
                            type: "string",
                            nullable: true,
                            example: "300"
                        }
                    }
                },
                Student: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/StudentInput"
                        },
                        {
                            type: "object",
                            properties: {
                                id: {
                                    type: "integer",
                                    example: 1
                                },
                                created_at: {
                                    type: "string",
                                    format: "date-time",
                                    nullable: true
                                }
                            }
                        }
                    ]
                },
                Message: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Student created successfully."
                        }
                    }
                },
                Error: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Internal server error."
                        }
                    }
                }
            }
        },
        paths: {
            "/api/students": {
                post: {
                    tags: ["Students"],
                    summary: "Create a student",
                    description: "Creates a new student record.",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/StudentInput"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Student created successfully.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Student created successfully."
                                            },
                                            student_id: {
                                                type: "integer",
                                                example: 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Required fields are missing or email is invalid.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error"
                                    }
                                }
                            }
                        },
                        409: {
                            description: "Student ID or email already exists.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Error"
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Internal server error."
                        }
                    }
                },
                get: {
                    tags: ["Students"],
                    summary: "Get all students",
                    description: "Retrieves all students, ordered by creation date.",
                    responses: {
                        200: {
                            description: "Students retrieved successfully.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            count: {
                                                type: "integer",
                                                example: 2
                                            },
                                            students: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Student"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Internal server error."
                        }
                    }
                }
            },
            "/api/students/{id}": {
                get: {
                    tags: ["Students"],
                    summary: "Get a student by ID",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "The database ID of the student.",
                            schema: {
                                type: "integer",
                                minimum: 1,
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Student retrieved successfully.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            student: {
                                                $ref: "#/components/schemas/Student"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid student ID."
                        },
                        404: {
                            description: "Student not found."
                        },
                        500: {
                            description: "Internal server error."
                        }
                    }
                },
                put: {
                    tags: ["Students"],
                    summary: "Update a student",
                    description: "Updates one or more student fields.",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "The database ID of the student.",
                            schema: {
                                type: "integer",
                                minimum: 1,
                                example: 1
                            }
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/StudentUpdate"
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Student updated successfully.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Message"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid student ID, no valid fields, or invalid email."
                        },
                        404: {
                            description: "Student not found."
                        },
                        409: {
                            description: "Student ID or email already exists."
                        },
                        500: {
                            description: "Internal server error."
                        }
                    }
                },
                delete: {
                    tags: ["Students"],
                    summary: "Delete a student",
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "The database ID of the student.",
                            schema: {
                                type: "integer",
                                minimum: 1,
                                example: 1
                            }
                        }
                    ],
                    responses: {
                        200: {
                            description: "Student deleted successfully.",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/Message"
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid student ID."
                        },
                        404: {
                            description: "Student not found."
                        },
                        500: {
                            description: "Internal server error."
                        }
                    }
                }
            },
            "/api/health": {
                get: {
                    tags: ["Health"],
                    summary: "Check API and database health",
                    responses: {
                        200: {
                            description: "API and database are running.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "Student Management API is running!"
                                            },
                                            database: {
                                                type: "string",
                                                example: "Connected successfully"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Database connection failed."
                        }
                    }
                }
            }
        }
    },
    apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;