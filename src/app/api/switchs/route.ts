import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { createSwitch, getAllSwitch } from '@/services/switchService';
import errorHandler from '@/utils/errorHandler';
import { switchSchema } from '@/utils/validations/switch.schema';

export async function GET(req: Request) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1] || '';

        const verify = !token || jwt.verify(token, process.env.NEXTAUTH_SECRET || '');

        if (!verify) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const switchs = await getAllSwitch();

        return NextResponse.json({ success: true, data: switchs }, { status: 200 });
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        } else {
            return errorHandler(error);
        }
    }
}

export async function POST(req: Request) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1] || '';

        const verify = !token || jwt.verify(token, process.env.NEXTAUTH_SECRET || '');

        if (verify) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();

        const validate = await switchSchema.safeParseAsync(data);

        if (!validate.success) {
            return NextResponse.json(
                { success: false, message: validate.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const create = await createSwitch(validate.data);

        return NextResponse.json({ success: true, data: create }, { status: 200 });
    } catch (err) {
        errorHandler(err);
    }
}
