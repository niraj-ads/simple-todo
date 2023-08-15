import React from "react";
import { TaskInterface } from "../interfaces/task";
import { CheckIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useTasks } from '../hooks/useTasks';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {useTaskContext} from "../context/tasks.tsx";

const CardActions: React.FC<{ task: TaskInterface; }> = ({ task }: {task: Partial<TaskInterface>}) => {
    const [, setTasks] = useTaskContext();
    const { updateTask, deleteTask } = useTasks();
    const navigate: NavigateFunction = useNavigate();

    const completeTaskHandler = async () => {
        // Update task status to 'completed' and save
        const updatedTask: any = { ...task, status: 'completed' };
        const tasks = await updateTask(updatedTask);
        setTasks(tasks);
    };

    const deleteTaskHandler = async () => {
        const tasks = await deleteTask(task.id as any);
        setTasks(tasks);
    };

    const editTaskHandler = () => {
        navigate(`/edit/${task.id}`)
    };

    return (
        <>
            <div className={`flex border-dashed border-slate-200 dark:border-slate-700/[.3] items-center`}>
                {
                    task.status !== 'completed' &&
                    <button onClick={completeTaskHandler} className="text-blue-600 text-sm bg-slate-100 bg-white hover:bg-slate-200 border border-slate-200 rounded-l-md font-medium px-4 py-2 inline-flex space-x-1 items-center">
                        <CheckIcon className="inline h-5 w-5" />
                    </button>
                }
                <button onClick={deleteTaskHandler} className="text-blue-600 text-sm bg-slate-100 bg-white hover:bg-slate-200 border border-slate-200 rounded-l-md font-medium px-4 py-2 inline-flex space-x-1 items-center">
                    <TrashIcon className="inline h-5 w-5" />
                </button>
                <button onClick={editTaskHandler} className="text-blue-600 text-sm bg-slate-100 bg-white hover:bg-slate-200 border border-slate-200 rounded-r-md font-medium px-4 py-2 inline-flex space-x-1 items-center">
                    <PencilSquareIcon className="inline h-5 w-5" />
                </button>
            </div>
        </>
    );
};

export default CardActions;
