import React from "react";
import { useRef, useState } from "react";
import { TaskInterface } from "../interfaces/task";
import Modal from "./Model/Modal";
import {getDateDetails} from "../utils/date";
import TaskForm from "./TaskForm.tsx";

const CardModal: React.FC<{
    onClose: () => void;
    task?: TaskInterface;
    nameForm: string;
    onConfirm: (task: TaskInterface) => void;
}> = ({ onClose, task, nameForm, onConfirm }) => {

    const [description, setDescription] = useState<string | undefined>(task?.description || "");
    const [title, setTitle] = useState<string>(task?.title || "");
    const [due_date, setDueDate] = useState<string | any>(task?.due_date || "");
    const [status, setStatus] = useState<string>("not set");
    const [errorMessage, setErrorMessage] = useState<string>("");


    const isTitleValid = useRef<Boolean>(false);
    const isDateValid = useRef<Boolean>(false);
    const addNewTaskHandler = (event: React.FormEvent): void => {
        event.preventDefault();

        isTitleValid.current = title.trim().length > 0;
        isDateValid.current = due_date && due_date?.trim().length > 0 && new Date(due_date) >= new Date(getDateDetails().formattedDateParsed);

        if (isTitleValid.current) {
            const newTask: TaskInterface = {
                title: title,
                description: description,
                due_date: new Date(due_date),
                status: status,
            };
            onConfirm(newTask);
            onClose();
            setErrorMessage(""); // Clear any previous error messages
        } else {
            let error = "Error: ";
            if (!isTitleValid.current) error += "Title is required. ";
            if (!isDateValid.current) error += "Date must be today or in the future. ";
            setErrorMessage(error.trim());
        }
    };

    return (
        <Modal onClose={onClose} title={nameForm}>
            <TaskForm
                onSubmit={addNewTaskHandler}
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                due_date={due_date}
                setDueDate={setDueDate}
                status={status}
                setStatus={setStatus}
                errorMessage={errorMessage}
                buttonText="Add (+)"
            />
        </Modal>
    );
};

export default CardModal;