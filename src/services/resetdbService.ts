/* eslint-disable no-console */
import prisma from '@/lib/prismaClient';

interface TableNames {
    tableNames: string;
    tablename: string;
}

async function main(): Promise<void> {
    const tableNames: TableNames[] = await prisma.$queryRaw`
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname='public'
      `;

    const tables = tableNames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ');

    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE`);
}

main()
    .then(async () => {
        console.log('Reset database success.');
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.log(err);
        await prisma.$disconnect();
        process.exit(1);
    });
