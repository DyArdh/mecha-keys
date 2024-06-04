import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

import { getSwitchById, updateSwitch, deleteSwitch } from '@/services/switchService';
import errorHandler from '@/utils/errorHandler';
import { switchUpdateSchema } from '@/utils/validations/switch.schema';

export async function PUT(req: Request, { params }: { params: { id: string; }; }) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1] || '';

        const verify = !token || jwt.verify(token, process.env.NEXTAUTH_SECRET || '');

        if (!verify) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const data = await req.json();

        const getSwitch = await getSwitchById(Number(id));

        if (!getSwitch) {
            return NextResponse.json({ success: false, message: `Switch with id ${id} not found` }, { status: 404 });
        }

        const validate = await switchUpdateSchema.safeParseAsync(data);

        if (!validate.success) {
            return NextResponse.json(
                { success: false, message: validate.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const update = await updateSwitch(Number(id), validate.data);

        return NextResponse.json({ success: true, data: update }, { status: 200 });
    } catch (err: any) {
        const errMessage = errorHandler(err);
        return NextResponse.json({ success: false, message: errMessage.message }, { status: errMessage.status });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string; }; }) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1] || '';

        const verify = !token || jwt.verify(token, process.env.NEXTAUTH_SECRET || '');

        if (!verify) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        const getSwitch = await getSwitchById(Number(id));

        if (!getSwitch) {
            return NextResponse.json({ success: false, message: `Switch with id ${id} not found` }, { status: 404 });
        }

        const dltSwitch = await deleteSwitch(Number(id));

        return NextResponse.json({ success: true, data: dltSwitch }, { status: 200 });
    } catch (err: any) {
        const errMessage = errorHandler(err);
        return NextResponse.json({ success: false, message: errMessage.message }, { status: errMessage.status });
    }
}
