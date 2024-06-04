import { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { generateToken, verifyToken } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const { refresh_token } = await req.json();

        const verify = verifyToken(refresh_token) as JwtPayload;

        const newAccessToken = generateToken({ username: verify.username }, '10m');
        const verifyNewAccessToken = verifyToken(newAccessToken) as JwtPayload;

        return NextResponse.json(
            { success: true, data: { access_token: newAccessToken, tokenExp: verifyNewAccessToken.exp } },
            { status: 200 }
        );
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
