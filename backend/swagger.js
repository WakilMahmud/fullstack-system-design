import swaggerAutogen from 'swagger-autogen';
import { moduleRoutes } from './src/routes/index.js';
import config from './src/config/index.js';


const isProd = config.NODE_ENV === "production";

const HOST = isProd
    ? config.SWAGGER_HOST || "api.yourdomain.com"
    : `localhost:${config.PORT}`;


const doc = {
    info: {
        version: '',                                            // by default: '1.0.0'
        title: 'Fullstack System Design API Documentation',
        description: 'API documentation for the Fullstack System Design project',
        contact: {
            name: "Backend Team",
            email: "wakil@fullstack-system-design.com",
        },
        license: {
            name: "MIT",
        },
    },
    host: HOST,                                                 // by default: 'localhost:3000'
    basePath: `/api/${config.API_VERSION}`,                     // by default: '/'
    schemes: [isProd ? "https" : "http"],                       // by default: ['http']
    consumes: [],                                               // by default: ['application/json']
    produces: [],                                               // by default: ['application/json']
    tags: [                                                     // by default: empty Array
        { name: "Users", description: "User management APIs" },
        { name: "Posts", description: "Post management APIs" },
    ],
    securityDefinitions: {},                                   // by default: empty object
    
    // ✅ common response models (optional but useful)
    definitions: {
        ErrorResponse: {
            type: "object",
            properties: {
                success: { type: "boolean", example: false },
                message: { type: "string", example: "Validation failed" },
                errorDetails: {
                    type: "array",
                    items: { type: "string" },
                    example: ["email is required", "password length must be >= 6"],
                },
            },
        },

        SuccessResponse: {
            type: "object",
            properties: {
                success: { type: "boolean", example: true },
                message: { type: "string", example: "Operation successful" },
                data: { type: "object" },
            },
        },

        // ✅ Example User schema (customize for your DB model)
        User: {
            type: "object",
            properties: {
                _id: { type: "string", example: "64fb0d8f2f4a3d0012ab3456" },
                name: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john@example.com" },
                role: { type: "string", example: "student" },
                createdAt: { type: "string", example: "2025-12-28T10:00:00.000Z" },
                updatedAt: { type: "string", example: "2025-12-28T10:00:00.000Z" },
            },
        }
    }
};

const outputFile = './swagger-output.json';
// const routes = ['./src/app/index.js', ...moduleRoutes.map(route => route.absoluteSourcePath)];
const routes = moduleRoutes.map(route => route.absoluteSourcePath);

swaggerAutogen()(outputFile, routes, doc);