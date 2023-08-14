import { Request, Response } from "express"; // Assuming Express is used
import Task from "../models/task";
import TaskService from '../services/taskService';
import { ValidationError } from 'sequelize';

class TaskController {
    static async createTask(req: Request, res: Response): Promise<void> {
        try {
            const taskData = req.body;
            const createdTask: Task = await TaskService.createTask(taskData);
            res.status(201).json(createdTask);
        } catch (error) {
            // Handle validation error
            if (error instanceof ValidationError) {
                const validationErrors = error.errors.map((err: any) => err.message);
                res.status(400).json({ error: 'Validation failed', details: validationErrors });
            } else {
                console.error('Error creating task:', error);
                res.status(500).json({ error: 'Failed to create task' });
            }
        }
    }

    static async retrieveTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await TaskService.retrieveTasks();
            res.status(200).json({ tasks });
        } catch (error) {
            console.error('Error retrieving the tasks:', error);
            res.status(500).json({ error: 'Failed to retrieve the tasks' });
        }
    }

    static async updateTask(req: Request, res: Response): Promise<void> {
        try {
            const taskData = req.body;
            const taskId: number = Number(req.params.taskId);
            const [affectedRows]  = await TaskService.updateTask(taskData, taskId);
            if (affectedRows <= 0) {
                res.status(404).json({ message: `Task with id=${taskId} not found or error with the body request` });
            }
            else {
                res.status(200).json({...taskData, id: taskId})
            }
        } catch (error) {
            console.error('Error updating the tasks:', error);
            res.status(500).json({ error: 'Failed to update the task' });
        }
    }

    static async deleteTask(req: Request, res: Response): Promise<void> {
        try {
            const taskId = Number(req.params.taskId);
            await TaskService.deleteTask(taskId);
            res.status(200).json({ message: 'Task deleted' });
        } catch (error) {
            console.error('Error deleting the tasks:', error);
            res.status(500).json({ error: 'Failed to delete the task' });
        }
    }
}

export default TaskController;
