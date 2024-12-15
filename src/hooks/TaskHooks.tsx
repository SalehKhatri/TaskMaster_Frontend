import {useMutation, useQuery} from "@tanstack/react-query";
import {
    ApiError,
    deleteTaskResponse, editAndAddTaskResponse,
    GetTaskResponse,
    insightsResponse,
    pendingTaskSummaryResponse,
    summaryResponse
} from "@/types/api.ts";
import apiClient from "@/api/api.ts";
import toast from "react-hot-toast";
import axios from "axios";
import {FilterState, Task} from "@/types/task.ts";

const fetchTasks = async(filters:FilterState): Promise<GetTaskResponse>=>{
    const params = new URLSearchParams()
    if (filters.priority) params.append('priority', filters.priority.toString())
    if (filters.status) params.append('status', filters.status)
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.order) params.append('order', filters.order)

    const response = await apiClient.get(`/api/v1/task?${params.toString()}`)
    return response.data
}

export const useTasks = (filters:FilterState) => {
    return useQuery<GetTaskResponse, ApiError>({
        queryKey: ["tasks"],
        queryFn: ()=>fetchTasks(filters),
        }
    )
}

export const useDeleteTask = () => {
    const toastId = '1'
    return useMutation<deleteTaskResponse, ApiError, number>({
        mutationFn: async (id) => {
            const response = await apiClient.delete<deleteTaskResponse>(`/api/v1/task/${id}`)
            return response.data
        },
        onMutate:()=> toast.loading("Please wait...", {id: toastId}),
        onSuccess: (response)=>{
            if(response.success){
                toast.success("Task deleted successfully!", {id: toastId})
            }else{
                toast.error(response.message || "Something went wrong!", {id: toastId})
            }
        },
        onError: (error)=>{
            const errorMessage = axios.isAxiosError(error) && error.response?.data.message || "Something went wrong!";
            toast.error(errorMessage, {id: toastId})
        }
    })
}

export const useEditTask = () => {
    const toastId = '1'
    return useMutation<editAndAddTaskResponse, ApiError, Partial<Task>>({
        mutationFn: async (updatedTask) => {
            const {id, ...body} = updatedTask
            if (!id) throw new Error("Task ID is required");
            const response = await apiClient.put<editAndAddTaskResponse>(`/api/v1/task/${id}`, body)
            return response.data
        },
        onMutate: () => toast.loading('Please wait...', {id: toastId}),
        onSuccess: (response) => {
            if (response.success) {
                toast.success('Task updated successfully!', {id: toastId})
            } else {
                toast.error(response.message || 'Something went wrong!', {id: toastId})
            }
        },
        onError: (error) => {
            const errorMessage = axios.isAxiosError(error) && error.response?.data.message || 'Something went wrong!';
            toast.error(errorMessage, {id: toastId})
        }
    })
}

export const useAddTask = () =>{
    const toastId = '1'
    return useMutation<editAndAddTaskResponse, ApiError, Partial<Task>>({
        mutationFn: async(newTask)=>{
            const response = await apiClient.post<editAndAddTaskResponse>("/api/v1/task", newTask)
            return response.data
        }
        ,
        onMutate: () => toast.loading('Please wait...', {id: toastId}),
        onSuccess: (response) => {
            if (response.success) {
                toast.success('Task added successfully!', {id: toastId})
            } else {
                toast.error(response.message || 'Something went wrong!', {id: toastId})
            }
        },
        onError: (error) => {
            const errorMessage = axios.isAxiosError(error) && error.response?.data.message || 'Something went wrong!';
            toast.error(errorMessage, {id: toastId})
        }
    })
}

const fetchSummary = async (): Promise<summaryResponse> => {
    const response = await apiClient.get("/api/v1/task/summary")
    return response.data
}

export const useSummary = () =>{
    return useQuery<summaryResponse, ApiError>({
        queryKey: ["summary"],
        queryFn: fetchSummary,
    })
}
const fetchPendingTaskSummary = async (): Promise<pendingTaskSummaryResponse> => {
    const response = await apiClient.get("/api/v1/task/pendingTaskSummary")
    return response.data
}

export const usePendingTaskSummary = () =>{
    return useQuery<pendingTaskSummaryResponse, ApiError>({
        queryKey: ["pendingTaskSummary"],
        queryFn: fetchPendingTaskSummary,
    })
}
const fetchInsights = async (): Promise<insightsResponse> => {
    const response = await apiClient.get("/api/v1/task/priorityWiseInsights")
    return response.data
}

export const useInsights = () =>{
    return useQuery<insightsResponse, ApiError>({
        queryKey: ["insights"],
        queryFn: fetchInsights,
    })
}