import prisma from '@/libs/prismaClient';
import { switchType } from '@/types/switch.type';

export async function getAllSwitch() {
    const getAllSwitchs = await prisma.switch.findMany();

    return getAllSwitchs;
}

export async function getSwitchForWP(type: number): Promise<switchType[]> {
    const getSwitchs = await prisma.$queryRaw<switchType[]>`
        SELECT  
            s.id,
            s."name",
            s.bottom_out_force,
            s.actuation_travel,
            s.total_travel,
            s.lube_id,
            s.price
        FROM "Switch" s
        WHERE s.type_id = ${type}
        ORDER BY s.id ASC`;

    return getSwitchs;
}
