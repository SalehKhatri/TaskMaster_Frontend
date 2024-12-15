import React, {useEffect} from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Link, useNavigate} from "react-router-dom";
import {Lock, Mail} from "lucide-react";
import {authFormSchema, authForm} from "@/types/form.ts";
import {useLogin} from "@/hooks/AuthHooks.tsx";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const {mutate: LoginUser} = useLogin(navigate)
    const form = useForm<authForm>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/")
        }
    },[navigate])

    const onSubmit = (data: authForm) => {
        LoginUser(data)
    }

    return <div className={'h-[100vh] bg-gray-50 flex items-center justify-center p-4'}>
        <div className={'w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-gray-100'}>
            <div className={'text-center mb-6'}>
                <h1 className={'text-3xl font-semibold font-primary text-neutral-800 mb-2'}>Welcome Back</h1>
                <p className={'text-gray-600 text-sm font-secondary'}>
                    Sign in to your account to continue
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-secondary">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={'flex items-center gap-2 text-gray-700'}>
                                    <Mail size={16}/> Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="you@example.com"
                                        {...field}
                                        className={'focus:ring-2 focus:ring-blue-500/50'}
                                    />
                                </FormControl>
                                <FormDescription className={'text-xs text-gray-500'}>
                                    We'll never share your email with anyone else.
                                </FormDescription>
                                <FormMessage className={'text-red-500 text-xs'}/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={'flex items-center gap-2 text-gray-700'}>
                                    <Lock size={16}/> Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...field}
                                        className={'focus:ring-2 focus:ring-blue-500/50'}
                                    />
                                </FormControl>
                                <FormDescription className={'text-xs text-gray-500'}>
                                    Must be at least 6 characters with a letter, number, and special character
                                </FormDescription>
                                <FormMessage className={'text-red-500 text-xs'}/>
                            </FormItem>
                        )}
                    />

                    <div className={'flex flex-col items-center space-y-4'}>
                        <Button
                            size="lg"
                            type="submit"
                            className={'w-full bg-black hover:bg-black/80 transition-colors'}
                        >
                            Login
                        </Button>

                        <div className={'text-center text-sm text-gray-600'}>
                            Don;t have an account? {' '}
                            <Link
                                to="/signup"
                                className={'text-neutral-900 hover:underline font-semibold'}
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </form>
            </Form>

        </div>
    </div>
};

export default Signup;