import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

function errorHandler(err: any) {
    if (err instanceof z.ZodError) {
        return NextResponse.json({ success: false, message: err.flatten() }, { status: 400 });
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    } else if (err instanceof Prisma.PrismaClientRustPanicError) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    } else {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}

export default errorHandler;
