import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Load the API schema
const apiSchemaPath = path.join(__dirname, '../schemas/apiSchema.yaml');
const swaggerDocument = YAML.load(apiSchemaPath);

// Set up a health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('API Viewer Server is running');
});

// Set up Swagger UI for API schema
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
