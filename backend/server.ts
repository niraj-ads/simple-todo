import express, {Application, Request, Response, NextFunction} from 'express';
import sequelize from './src/config/db';
import taskRoutes from './src/routes/taskRoutes';
import errorHandler from './src/middleware/errorHandler';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

export const app: Application = express();

// Enable CORS for all domains
app.use(cors());

// Middleware for parsing incoming requests with JSON payloads
app.use(express.json());

// Routes
app.use('/task', taskRoutes);

// Endpoint to check if API is working
app.use('/health', (req, res) => {
    res.status(200).json({message: 'API working!'})
})

/* Swagger implementation */
const swaggerFilePath = path.join('./src', 'docs', 'swagger.yaml'); // Construct the file path
try {
    const rawYaml = fs.readFileSync(swaggerFilePath, 'utf8'); // Load Swagger YAML file
    const swaggerDocument: any = yaml.load(rawYaml); // Parse YAML as JSON
    swaggerDocument.info.version = "1.2.3"; // Dynamic version number
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Serve Swagger UI
} catch (error) {
    console.error('Error loading Swagger YAML:', error);
}

//404 Not Found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ error: 'Not Found' });
});

// Global Error Handling Middleware
app.use(errorHandler);


export function startServer(): void {
    const port = Number(process.env.BACKEND_PORT) || 3000;
    const host = process.env.BACKEND_DOMAIN || '0.0.0.0';

    // Synchronize all defined models to the database and run after that
    sequelize.sync()
        .then(() => {
            console.log("DB synced successfully!");
            app.listen(port, host, function () {
                console.log(`Backend is running on port ${port}!`);
            })
                .on("error", (err: any) => {
                    if (err.code === "EADDRINUSE") {
                        console.error("The address is already in use!");
                    } else {
                        console.error(err);
                    }
                });
        })
        .catch((error) => {
            console.error('Unable to connect to the database:', error);
            process.exit(1);
        });
}

if (require.main === module) {
    // Only start the server if this file is the main module and not imported in the test file
    startServer();
}
