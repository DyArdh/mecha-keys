'use client';

import { SessionProvider } from 'next-auth/react';

export default function provider({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <SessionProvider>{children}</SessionProvider>;
}
