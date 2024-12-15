export interface Task {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    priority: number;
    status: "pending" | "finished";
    userId: number;
    createdAt: string;
    updatedAt: string;
    totalTime: number;
}

export interface FilterState {
    priority?: number
    status?: 'pending' | 'finished'
    sortBy?: 'startTime' | 'endTime'
    order?: 'asc' | 'desc'
}