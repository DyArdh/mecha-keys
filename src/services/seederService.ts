/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import bcrypt from 'bcrypt';

import prisma from '@/lib/prismaClient';

// Read File JSON
function getFileJson(fileName: string): any {
    const filePath = path.join(__dirname, 'data', fileName);
    const readFile = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(readFile);

    return data;
}

async function main(): Promise<void> {
    const hashPassword = await bcrypt.hash('Suichan2203', 10);
    const userData = {
        name: 'Suisei Hoshimachi',
        username: 'suichan',
        password: hashPassword
    };

    await prisma.user.create({ data: userData });
    await prisma.switchMount.createMany({
        data: getFileJson('mount_data.json'),
        skipDuplicates: true
    });
    await prisma.switchType.createMany({
        data: getFileJson('type_data.json'),
        skipDuplicates: true
    });
    await prisma.lubeStatus.createMany({
        data: getFileJson('lube_data.json'),
        skipDuplicates: true
    });
    await prisma.switch.createMany({
        data: getFileJson('switch_data.json'),
        skipDuplicates: true
    });
}

main()
    .then(async () => {
        console.log('Seeding data to database successfully.');
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.log(err);
        await prisma.$disconnect();
        process.exit(1);
    });
