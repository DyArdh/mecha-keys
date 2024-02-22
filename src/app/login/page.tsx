import Image from 'next/image';

import LoginImage from '@/../public/images/login-bg.webp';
import LoginForm from '@/components/LoginForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const Login = () => {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="absolute inset-0 z-0">
                <Image src={LoginImage} alt="Login Background" fill={true} quality={100} className="object-cover" />
            </div>
            <Card className="absolute z-10 w-10/12 rounded-md bg-white p-4 shadow-md">
                <CardHeader className="text-center">
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to access admin panel</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
