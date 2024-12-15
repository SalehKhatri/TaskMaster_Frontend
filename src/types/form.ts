import {z} from "zod";

export const authFormSchema = z.object({
    email: z.string().email({message:"Please enter a valid email"}).min(2),
    password: z.string().min(6, {message:"Please enter a password with at least 6 characters"}),
})

export type authForm = z.infer<typeof authFormSchema>;

export const taskFormSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    priority: z.number().min(1).max(5),
    status: z.enum(["pending", "finished"]),
    startTime: z.any(),
    endTime: z.any(),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
