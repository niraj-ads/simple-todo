import React, {useEffect} from "react";
import Card from "./Card";
import {InformationCircleIcon} from "@heroicons/react/24/solid";
import {useTasks} from "../hooks/useTasks.ts";
import {useTaskContext} from "../context/tasks.tsx";

type HomeProps = {
    title: string;
};

const Home: React.FC<HomeProps> = ({}) => {
    const { fetchTasks } = useTasks();
    const [tasks, setTasks] = useTaskContext();
    useEffect(() => {
        (
            async function() {
                const data = await fetchTasks();
                setTasks(data)
            })()
    }, [])
    return (
        <section>
            <div className={'mt-4 font-bold text-2xl'}>{`Item${tasks.length > 1 ? 's' : ''}: ${tasks.length}`}</div>
            <ul className={`mt-4 grid gap-2 sm:gap-4 xl:gap-6 grid-cols-1`}>
                {tasks.length === 0 ? (
                    <div className={'p-15 text-3xl mt-8 text-center'}><span><InformationCircleIcon className="inline h-20 w-20" /></span> Task list is empty</div>
                ) : (
                    tasks.map((task) => (
                        <Card key={task.id} task={task} />
                    ))
                )}
            </ul>
        </section>
    );
};

export default React.memo(Home);
