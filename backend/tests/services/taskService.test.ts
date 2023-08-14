import TaskService from '../../src/services/taskService';
import Task from '../../src/models/task';

/// Mocking Sequelize connection
jest.mock('../../src/config/db', () => {});

// Define mock functions
const mockFindAll = jest.fn()
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDestroy = jest.fn();
const mockFindOne = jest.fn();

// Mock the Task model methods
Task.findAll = mockFindAll;
Task.create = mockCreate;
Task.update = mockUpdate;
Task.destroy = mockDestroy;
Task.findByPk = mockFindOne;
Task.init = jest.fn();

jest.mock('../../src/models/task', () => {
    return {
        default: class {},
    };
});

// Sample task data for testing

describe('TaskService', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });
    it('should retrieve all tasks successfully', async () => {
        // Set up the mock implementation for Task.findAll
        const mockData = [
            {title: 'Task1', description: 'This is the description of task 1', status: "pending"},
            {title: 'Task2', description: 'This is the description of task 2', status: "pending"},
            {title: 'Task3', description: 'This is the description of task 3', status: "pending"},
        ]
        mockFindAll.mockResolvedValueOnce(mockData)

        const result: Task[] = await TaskService.retrieveTasks();

        expect(result).toEqual(mockData);
        expect(Task.findAll).toHaveBeenCalled();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBeGreaterThan(0);
    });
    it('should handle empty result when retrieving all tasks', async () => {
        // Mocking an empty result for Task.findAll
        mockFindAll.mockResolvedValueOnce([]);

        const result: Task[] = await TaskService.retrieveTasks();

        expect(result).toEqual([]);
        expect(Task.findAll).toHaveBeenCalled();
    });
    it('should create a task successfully', async () => {
        const taskData = {
            title: 'New Task',
            description: 'Task description',
            status: 'pending',
        };

        mockCreate.mockResolvedValueOnce(taskData);
        const result: Task = await TaskService.createTask(taskData);

        expect(result.title).toEqual(taskData.title);
        expect(result.description).toEqual(taskData.description);
        expect(result.status).toEqual(taskData.status);
        expect(Task.create).toHaveBeenCalled();
    });
    it('should return 404 status code when task creation fails', async () => {
        // Set up the mock to reject with an error
        mockCreate.mockRejectedValueOnce(new Error('500: Failed!'));
        const taskData = {
            title: 'New Task',
            description: 'Task description',
            status: 'pending',
        };
        try {
            await TaskService.createTask(taskData);
            // Fail the test if no error is thrown
            expect(true).toBe(false);
        } catch (error) {
            // Cast error to Error type
            const err = error as Error;
            // Verify that the error message is correct
            expect(err.message).toEqual('500: Failed!');
        }
    });
    it('should update a task successfully', async () => {
        const taskId = 1; // Example ID
        const taskData = {
            title: 'New Task',
            description: 'Task description',
            status: 'pending',
            id: taskId
        };
        const updates = { title: 'Updated Task Title', description: "Description", status: "working" };
        mockFindOne.mockResolvedValueOnce(taskData);
        mockUpdate.mockResolvedValueOnce([1]);
        const [affectedRows] = await TaskService.updateTask(updates, taskId);
        expect(affectedRows).toEqual(1);
        expect(Task.update).toHaveBeenCalled();
    });
    it('should delete a task successfully', async () => {
        const taskId = 1;
        const taskData = {
            title: 'New Task',
            description: 'Task description',
            status: 'pending',
            id: taskId
        };

        mockFindOne.mockResolvedValueOnce(taskData)
        mockDestroy.mockResolvedValueOnce(1); // Assuming 1 row is deleted
        await TaskService.deleteTask(taskId);
        expect(Task.destroy).toHaveBeenCalled();
    });
    it('should retrieve a task by ID successfully', async () => {
        const taskId = 1; // Example ID
        const expectedTask = {
            title: 'Specific Task',
            description: 'Details about this specific task',
            status: 'pending',
            id: taskId
        };

        mockFindOne.mockResolvedValueOnce(expectedTask);

        const result: Task = await TaskService.retrieveTaskById(taskId);

        expect(result).toEqual(expectedTask);
        expect(Task.findByPk).toHaveBeenCalledWith(taskId);
    });
    it('should throw an error when retrieving a non-existent task by ID', async () => {
        const taskId = 999; // Non-existent ID

        mockFindOne.mockResolvedValueOnce(null);

        try {
            await TaskService.retrieveTaskById(taskId);
            fail('Expected an error to be thrown');
        } catch (error) {
            const err = error as Error;
            expect(err.message).toEqual('Task not found');
        }

        expect(Task.findByPk).toHaveBeenCalledWith(taskId);
    });
});
