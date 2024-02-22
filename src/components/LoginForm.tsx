'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, loginSchemaType } from '@/utils/validations/auth.schema';

const LoginForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

    const onSubmit: SubmitHandler<loginSchemaType> = async (data) => {
        await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false,
            callbackUrl: '/test'
        }).then((res) => {
            if (res?.error) {
                throw new Error('Invalid credentials');
            } else {
                router.push('/test');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" placeholder="user" {...register('username')} />
                {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
            </div>
            <div className="mt-4 grid w-full items-center gap-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="*****" {...register('password')} />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <Button className="mt-5 w-full" type="submit">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
