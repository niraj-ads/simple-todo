import request from 'supertest';
import sequelize from '../../src/config/db';
import { app } from '../../server';
import Task from '../../src/models/task';

describe('TaskController', () => {
    beforeAll(async () => {
        try {
            await sequelize.sync({ force: true });
        } catch (err) {
            console.error("Error syncing up test database:", err);
        }
    });

    afterEach(async () => {
        // Clean up all tasks after each test
        await Task.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a task successfully', async () => {
        const taskData = {
            title: 'New Task',
            description: 'Task description',
            status: 'pending',
        };
        const response = await request(app)
            .post('/task')
            .send(taskData)
            .expect(201);
        expect(response.body.title).toEqual(taskData.title);
        expect(response.body.description).toEqual(taskData.description);
        expect(response.body.status).toEqual(taskData.status);

        // Validate that the task was actually created in the database
        const task = await Task.findByPk(response.body.id, );
        expect(task).not.toBeNull();
        expect(task?.title).toEqual(taskData.title);
    });

    it('should retrieve all tasks successfully', async () => {
        const Task1 = { title: 'Task 1', description: 'description', status: 'pending'}
        const Task2 = { title: 'Task 2', description: 'description 2', status: 'pending'}
        const tasks = [Task1, Task2]
        await Task.create(Task1);
        await Task.create(Task2);
        const response = await request(app)
            .get('/task/getAll')
            .expect(200);
        expect(response.body.tasks).toHaveLength(tasks.length);
        expect(response.body.tasks[0].title).toEqual(tasks[0].title);
        expect(response.body.tasks[1].title).toEqual(tasks[1].title);
    });

    it('should update a task successfully', async () => {
        const originalTask = await Task.create({ title: 'Original Task', description: 'description', status: 'pending' });
        const updates = { title: 'Updated Task Title', status: 'working' };
        const response = await request(app)
            .put(`/task/${originalTask?.dataValues?.id}`)
            .send(updates)
            .expect(200);
        expect(response.body.title).toEqual(updates.title);
        expect(response.body.status).toEqual(updates.status);

        // Validate that the task was actually updated in the database
        const updatedTask = await Task.findByPk(originalTask.id,);
        expect(updatedTask).not.toBeNull();
        expect(updatedTask?.title).toEqual(updates.title);
    });

    it('should delete a task successfully', async () => {
        const task = await Task.create({ title: 'Task to delete', description: 'description', status: 'pending' });
        const taskId = task?.dataValues?.id
            //jest.spyOn(TaskService, 'retrieveTaskById').mockResolvedValue(task.dataValues as Task);

        await request(app)
            .delete(`/task/${taskId}`)
            .expect(200);
        // Validate that the task was actually deleted from the database
        const deletedTask = await Task.findByPk(task.id, );
        expect(deletedTask).toBeNull();
    });
});
