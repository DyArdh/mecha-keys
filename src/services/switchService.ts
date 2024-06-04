import prisma from '@/lib/prismaClient';
import { switchType } from '@/types/switch.type';
import { switchSchemaType, switchUpdateSchemaType } from '@/utils/validations/switch.schema';

export async function getAllSwitch() {
    const getAllSwitchs = await prisma.switch.findMany();

    return getAllSwitchs;
}

export async function getSwitchById(id: number) {
    const getSwitch = await prisma.switch.findUnique({
        where: {
            id
        }
    });

    return getSwitch;
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

export async function createSwitch(data: switchSchemaType) {
    const createSwitchs = await prisma.switch.create({
        data: {
            name: data.name,
            mount_id: data.mount_id,
            type_id: data.type_id,
            bottom_out_force: data.bottom_out_force,
            actuation_force: data.actuation_force,
            actuation_travel: data.actuation_travel,
            total_travel: data.total_travel,
            top_housing: data.top_housing,
            stem: data.stem,
            bottom_housing: data.bottom_housing,
            lube_id: data.lube_id,
            price: data.price
        }
    });

    return createSwitchs;
}

export async function updateSwitch(id: number, data: switchUpdateSchemaType) {
    const updateSwitchs = await prisma.switch.update({
        where: {
            id: id
        },
        data: data
    });

    return updateSwitchs;
}

export async function deleteSwitch(id: number) {
    const deleteSwitchs = await prisma.switch.delete({
        where: {
            id: id
        }
    });

    return deleteSwitchs;
}
