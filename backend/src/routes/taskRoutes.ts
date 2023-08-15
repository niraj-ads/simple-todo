import { Router } from 'express';
import TaskController from "../controllers/taskController";

const taskRouter: Router = Router();

//Define route handlers
taskRouter.post("/", TaskController.createTask)
taskRouter.get("/getAll", TaskController.retrieveTasks)
taskRouter.put("/:taskId", TaskController.updateTask)
taskRouter.delete("/:taskId", TaskController.deleteTask)
taskRouter.get("/:taskId", TaskController.getTask)

// Apply error handling middleware
//taskRouter.use(errorHandler);

export default taskRouter;