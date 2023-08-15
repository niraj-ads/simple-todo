export interface TaskInterface {
    id?: number,
    title: string;
    description?: string;
    status?: string;
    due_date?: Date;
    created_at?: Date;
    updated_at?: Date;
}
