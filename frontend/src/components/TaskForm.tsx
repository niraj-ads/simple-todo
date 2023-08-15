import React from "react";
import {getDateDetails} from "../utils/date";
import {TASK_STATUS_OPTIONS} from "../constants/taskStatuses.ts";

const TaskForm: React.FC<{
    onSubmit: (event: React.FormEvent) => void;
    title: string;
    setTitle: (value: string) => void;
    description?: string;
    setDescription: (value: string) => void;
    due_date?: string;
    setDueDate: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
    errorMessage?: string;
    buttonText: string;
}> = ({ onSubmit, title, setTitle, description, setDescription, due_date, setDueDate, status, setStatus, errorMessage, buttonText }) => {
    const dueDate: Date | any = due_date ? new Date(due_date) : '';
    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    const formattedDueDate: string = formatDate(dueDate);
    const formattedMinDate: string = formatDate(new Date());

    return (
        <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <label className="text-lg font-medium">
                Title
                <input
                    type="text"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    className="w-full p-2 mt-1 border rounded-md"
                />
            </label>
            <label className="text-lg font-medium">
                Description (optional)
                <textarea
                    className="w-full p-2 mt-1 border rounded-md"
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                ></textarea>
            </label>
            <label className="text-lg font-medium">
                Due Date (optional)
                <input
                    type="date"
                    className="w-full p-2 mt-1 border rounded-md"
                    value={formattedDueDate}
                    onChange={({ target }) => setDueDate(target.value)}
                    min={formattedMinDate}
                    max={getDateDetails(due_date).maxDate}
                />
            </label>
            <label className="text-lg font-medium">
                Status
                <select
                    className="w-full p-2 mt-1 border rounded-md"
                    value={status}
                    onChange={({ target }) => setStatus(target.value)}
                >
                    {TASK_STATUS_OPTIONS.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </label>
            <span className={'text-right'}>
        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {buttonText}
        </button>
      </span>
        </form>
    );
};

export default TaskForm;
