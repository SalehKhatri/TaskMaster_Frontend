import {AxiosError, AxiosResponse} from "axios";
import {Task} from "@/types/task.ts";

export interface ApiError extends AxiosError {
    response?: AxiosResponse<{
        success: false;
        message: string;
        data: null;
    }>;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
      token: string;
      user:{
          id: number;
          email: string;
      }
  } | null;
}

export interface summaryResponse {
    success: boolean;
    message: string;
    data?: {
        totalTasks: number,
        completedPercentage: number,
        pendingPercentage: number,
        averageTimePerCompletedTask: number
    } | null
}

export interface pendingTaskSummaryResponse {
    success: boolean;
    message: string;
    data?: {
        numberOfPendingTasks: number,
        totalTimeLapsed: number,
        totalEstimatedTimeToFinish: number
    } | null
}

export interface insightItem {
    priority: number,
    numberOfPendingTasks: number,
    totalTimeLapsed: number,
    totalEstimatedTimeToFinish: number
}

export interface insightsResponse {
    success: boolean;
    message: string;
    data?: insightItem[] | null
}

export interface GetTaskResponse {
    success: boolean;
    message: string;
    data?: Task[] | null;
}

export interface deleteTaskResponse {
    success: boolean;
    message: string;
    data?: null;
}

export interface editAndAddTaskResponse {
    success: boolean;
    message: string;
    data?: Task
}