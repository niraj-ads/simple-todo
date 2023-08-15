import React, { useState } from "react";
import CardModal from "./CardModal";
import {formatDate} from "../utils/date";
import {useTasks} from "../hooks/useTasks.ts";
import {useTaskContext} from "../context/tasks.tsx";

const Header: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
   const { addTask  } = useTasks();
    const [, setTasks] = useTaskContext();

    const openModalHandler = () => {
    setIsModalOpen(true);
  };

    const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const handleTaskSubmission = async (newTask: any) => {
      try {
          const tasks = await addTask(newTask);
          setTasks(tasks)
      }
      catch (err) {
          console.error('Failed to create', err)
      }
      finally {
          closeModalHandler();
      }
  };

  return (
      <>
        <h1 className="font-medium my-5 text-center sm:text-left sm:my-8 md:text-2xl text-lg">
          Task management App
        </h1>
        <header className="flex justify-between gap-4 md:gap-0 md:flex bg-blue-300 p-10">
          <div className="text-center font-bold self-center">
            Today: <span>{formatDate(String(new Date))}</span>
          </div>
          <div className="flex flex-1 justify-end">
            <div className="p-2 bg-black text-white rounded-md hover:cursor-pointer" onClick={openModalHandler}>Add task</div>
          </div>
        </header>
        {isModalOpen && (
            <>
                <div
                    className="fixed inset-0 bg-black opacity-50 z-30"
                    onClick={closeModalHandler}
                ></div>
                <CardModal
                    onClose={closeModalHandler}
                    nameForm="Add New Task"
                    onConfirm={handleTaskSubmission}
                />
            </>
        )}
      </>
  );
};

export default Header;
