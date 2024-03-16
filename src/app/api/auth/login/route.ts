import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { generateToken, verifyToken } from '@/lib/auth';
import { getUser } from '@/services/auth.service';

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        const user = await getUser(username);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Credential is invalid'
                },
                { status: 401 }
            );
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Credential is invalid'
                },
                { status: 401 }
            );
        }

        const generateAccessToken = generateToken({ username: user.username }, '10s');
        const generateRefreshToken = generateToken({ username: user.username }, '7d');

        const verifyAccessToken = verifyToken(generateAccessToken) as JwtPayload;

        return NextResponse.json({
            success: true,
            data: {
                name: user.name,
                username: user.username,
                access_token: generateAccessToken,
                access_token_exp: verifyAccessToken.exp,
                refresh_token: generateRefreshToken
            }
        });
    } catch (err: any) {
        return NextResponse.json(
            {
                success: false,
                message: err.message
            },
            { status: 500 }
        );
    }
}
