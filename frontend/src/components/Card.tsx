import React from "react";
import { TaskInterface } from "../interfaces/task";
import CardActions from "./CardActions";
import { CalendarIcon } from '@heroicons/react/24/solid'
import {formatDate} from "../utils/date";
import {TASK_STATUSES} from "../constants/taskStatuses.ts";


const Card: React.FC<{task: TaskInterface }> = ({task}) => {
    const title = task.title || 'Task'
    const description = task.description || 'You need to change the description'
    const status = task.status || TASK_STATUSES.NOT_SET
    const dueDate = String(task.due_date)

    const statusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case TASK_STATUSES.COMPLETED: return 'bg-green-700';
            case TASK_STATUSES.PENDING: return 'bg-yellow-700';
            case TASK_STATUSES.ON_HOLD: return 'bg-red-700';
            case TASK_STATUSES.NOT_SET: return 'bg-gray-400';
            default: return 'bg-blue-700';
        }
    };
    return (
        <>
            <li key={task.id}>
                <article className="bg-slate-100 rounded-lg p-3 sm:p-4 text-left transition hover:shadow-lg hover:shadow-slate-300 flex flex-col sm:h-18">
                    <div className={'text-right mb-2 text-[10px]'}>
                        <span><CalendarIcon className="inline h-3 w-4" /></span> <time> Due: {task.due_date ? formatDate(dueDate) : 'dd/mm/yyyy'}</time>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col flex-1 pr-8 ">
                            <div className="flex items-center justify-between mb-1 text-2xl">
                                <span className="block font-medium truncate w-full">
                                    {title}{' '}
                                    <span
                                        className={`inline-flex mb-1 items-center rounded-md px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10 max-w-[fit-content] ${statusColor(
                                            status
                                        )}`}
                                    >
                                        {status}
                                    </span>
                                </span>
                            </div>
                            <p
                                title={description}
                                className="block description mb-2 text-slate-500 text-sm line-clamp-3 overflow-hidden"
                            >
                                {description}
                            </p>
                        </div>
                        <CardActions task={task} />
                    </div>
                </article>
            </li>
        </>
    );
};

export default React.memo(Card);
