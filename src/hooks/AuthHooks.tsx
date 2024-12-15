import {useMutation} from "@tanstack/react-query";
import {ApiError, AuthPayload, AuthResponse} from "@/types/api.ts";
import apiClient from "@/api/api.ts";
import toast from "react-hot-toast";
import axios from "axios";

export const useSignup = (navigate: (path: string)=> void) =>{
    const toastId = '1'
    return useMutation<AuthResponse, ApiError, AuthPayload>({
        mutationFn: async (payload) => {
            const response = await apiClient.post<AuthResponse>("/api/v1/user/signup", payload);
            return response.data;
        },
        onMutate: ()=>{toast.loading("Please wait...", {id: toastId})
        },
        onSuccess: (response)=>{
            if(response.success && response.data){
                toast.success("Welcome", {id: toastId})
                localStorage.setItem('token', response.data.token)
                navigate('/')
            }else {
                toast.error(response.message || "Something went wrong!", { id: toastId });
            }
        },
        onError: (error)=>{
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage, { id: toastId });
        }
    })
}
export const useLogin = (navigate: (path: string)=> void) =>{
    const toastId = '1'
    return useMutation<AuthResponse, ApiError, AuthPayload>({
        mutationFn: async (payload) => {
            const response = await apiClient.post<AuthResponse>("/api/v1/user/login", payload);
            return response.data;
        },
        onMutate: ()=>{toast.loading("Please wait...", {id: toastId})
        },
        onSuccess: (response)=>{
            if(response.success && response.data){
                toast.success("Welcome back!", {id: toastId})
                localStorage.setItem('token', response.data.token)
                navigate('/')
            }else {
                toast.error(response.message || "Something went wrong!", { id: toastId });
            }
        },
        onError: (error)=>{
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage, { id: toastId });
        }
    })
}