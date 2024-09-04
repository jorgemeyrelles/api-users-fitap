import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Fit-App",
    version: "1.0.0",
    description:
      "Documentação de API para projeto Fit-App (TypeScript | Node.js | TypeORM)",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// rota
const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

// swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
