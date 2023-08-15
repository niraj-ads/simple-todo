import Task from '../models/task';
import { InferAttributes } from "sequelize";

class TaskService {

    static async retrieveTaskById(taskId: number): Promise<Task> {
        const task =  await Task.findByPk(taskId);
        if (!task) {
            throw { status: 404, message: 'Task not found' };
        }
        return task;
    }
    static async createTask(taskData: InferAttributes<Task>): Promise<Task> {
        return await Task.create(taskData);
    }
    static async retrieveTasks():Promise<Task[]> {
        return await Task.findAll();
    }
    static async updateTask(taskData: Partial<Task>, taskId: number): Promise<[number]> {
        await this.retrieveTaskById(taskId);
        // Exclude the ID from taskData to ensure it doesn't overwrite the ID from the URL parameter
        const { id, ...updateData } = taskData;
        return await Task.update(updateData, { where: { id: taskId } });
    }
    static async deleteTask(taskId: number): Promise<number> {
        const task= await this.retrieveTaskById(taskId);
        return await Task.destroy({ where: { id: task.id } })
    }
}

export default TaskService;