import TaskApi from '../api/task.ts';
import { TaskInterface } from '../interfaces/task';

export const useTasks = () => {
    const fetchTasks = async () => {
        try {
            const data: any = await TaskApi.getAll();
            return data.tasks;
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    const addTask = async (newTask: TaskInterface) => {
        await TaskApi.create(newTask);
        return await fetchTasks();
    };

    const updateTask = async (updatedTask: Partial<TaskInterface> & { id: number }) => {
        await TaskApi.update(updatedTask.id, updatedTask);
        return await fetchTasks();
    };

    const deleteTask = async (id: number) => {
        await TaskApi.delete(id);
        return await fetchTasks();
    };

    return { addTask, updateTask, deleteTask, fetchTasks};
};
