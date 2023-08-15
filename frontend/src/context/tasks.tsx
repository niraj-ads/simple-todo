import React, {createContext, useContext, useState, ReactNode} from "react";
import {TaskInterface} from "../interfaces/task.ts";

type TaskContextType = [TaskInterface[], React.Dispatch<React.SetStateAction<TaskInterface[]>>];

const Context = createContext<TaskContextType | undefined>(undefined);

type Props = {
    children?: ReactNode;
};

export function TaskProvider({ children }: Props) {
    const [task, setTask] =  useState<TaskInterface[]>([]);
    return (
        <Context.Provider value={[task, setTask]}>{children}</Context.Provider>
    );
}

export function useTaskContext():TaskContextType {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}
