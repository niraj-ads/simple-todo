export type TaskStatus = 'not set' | 'pending' | 'on-hold' | 'completed';

export const TASK_STATUSES: Record<string, TaskStatus> = {
    NOT_SET: 'not set',
    PENDING: 'pending',
    ON_HOLD: 'on-hold',
    COMPLETED: 'completed',
};

export type TaskStatusOption = {
    value: TaskStatus;
    label: string;
};

export const TASK_STATUS_OPTIONS: TaskStatusOption[] = [
    { value: TASK_STATUSES.NOT_SET, label: 'Not set' },
    { value: TASK_STATUSES.PENDING, label: 'Pending' },
    { value: TASK_STATUSES.ON_HOLD, label: 'On-hold' },
    { value: TASK_STATUSES.COMPLETED, label: 'Completed' },
];
