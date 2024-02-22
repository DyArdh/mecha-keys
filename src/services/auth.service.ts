import prisma from '@/libs/prismaClient';

export async function getUser(username: string) {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    return user;
}
