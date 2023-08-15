import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskInterface } from '../interfaces/task';
import {getDateDetails} from '../utils/date';
import TaskForm from "./TaskForm.tsx";
import TaskApi from "../api/task";
import {ArrowLeftIcon, ArrowPathIcon} from '@heroicons/react/24/solid';
import {TASK_STATUSES} from "../constants/taskStatuses.ts";


const EditTask: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<TaskInterface | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                const data: any = await TaskApi.get(id as any);
                setTask(data);
                setTitle(data.title || '');
                setDescription(data.description || '');
                setDueDate(data.due_date || '');
                setStatus(data.status || TASK_STATUSES.NOT_SET);
            }
        };
        fetchTask();
    }, [id]);


    const [title, setTitle] = useState<string>(task?.title || '');
    const [description, setDescription] = useState<string | undefined>(task?.description || '');
    const [due_date, setDueDate] = useState<string | any>(task?.due_date || '');
    const [status, setStatus] = useState<string>('not set');
    const [errorMessage, setErrorMessage] = useState<string>("");

    const isTitleValid = useRef<Boolean>(false);
    const isDateValid = useRef<Boolean>(false);
    const updateTaskHandler = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();

        isTitleValid.current = title.trim().length > 0;
        isDateValid.current = due_date && due_date.trim().length > 0 && new Date(due_date) >= new Date(getDateDetails().formattedDateParsed);

        if (isTitleValid.current && task) {
            await TaskApi.update(task.id as any, {
                id: task.id as any,
                title,
                description,
                due_date: new Date(due_date),
                status
            })
            navigate('/');
            setErrorMessage("");
        } else {
            let error = "Error: ";
            if (!isTitleValid.current) error += "Title is required. ";
            if (!isDateValid.current) error += "Date must be today or in the future. ";
            setErrorMessage(error.trim());
        }
    };

    return task ? (
        <div className="container mx-auto mt-8">
            <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
            >
                <span><ArrowLeftIcon className="inline h-3 w-4" /></span> Go Back
            </button>
            <h1 className="text-2xl font-bold mb-4">Task: {task.id}</h1>
            <TaskForm
                onSubmit={updateTaskHandler}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                due_date={due_date}
                setDueDate={setDueDate}
                status={status}
                setStatus={setStatus}
                errorMessage={errorMessage}
                buttonText="Update"
            />
        </div>
    ) : (
        <div className={'p-15 text-3xl mt-8 text-center'}><span><ArrowPathIcon className="inline h-20 w-20" /></span> </div>
    );
};

export default EditTask;
