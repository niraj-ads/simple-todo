import { TaskInterface } from "../interfaces/task";
import httpRequest from "../utils/httpRequest";
class TaskApi {
    getAll(): Promise<TaskInterface[]> {
        return httpRequest("GET", "/task/getAll");
    }

    get(id: number): Promise<TaskInterface> {
        return httpRequest("GET", `/task/${id}`);
    }

    create(data: TaskInterface): Promise<TaskInterface> {
        return httpRequest("POST", "/task", data);
    }

    update(id: number, data: Partial<TaskInterface>): Promise<TaskInterface> {
        return httpRequest("PUT", `/task/${id}`, data);
    }

    delete(id: number): Promise<void> {
        return httpRequest("DELETE", `/task/${id}`);
    }
}

export default new TaskApi();
