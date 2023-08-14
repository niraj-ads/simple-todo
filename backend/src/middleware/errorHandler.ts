import { Request, Response } from "express";

interface CustomError extends Error {
    status?: number;
    // Any other custom properties you need
}
const errorHandler = (err: CustomError, req: Request, res: Response): void => {
    console.error('An error occurred:', err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
}

export default errorHandler;
