import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { refreshTokenType } from '@/types/auth.type';

async function refreshToken(token: refreshTokenType) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refresh_token: token.refresh_token
        })
    });

    const newToken = await res.json();

    return {
        ...token,
        ...newToken.data
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };

                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                });

                const user = await res.json();

                if (res.status !== 200) {
                    throw new Error(user.message);
                }

                return user.data;
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.username = user.username;
                token.access_token = user.access_token;
                token.tokenExp = user.access_token_exp;
                token.refresh_token = user.refresh_token;
            }

            if (new Date().getTime() < token.tokenExp) return token;

            return await refreshToken(token);
        },
        async session({ session, token }: any) {
            if (token) {
                session.user.username = token.username;
                session.access_token = token.access_token;
            }

            return session;
        }
    },
    pages: {
        signIn: '/login'
    }
};
