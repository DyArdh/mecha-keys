import { NextResponse } from 'next/server';

import weightedProduct from '@/libs/weightedProduct';
import { getSwitchForWP } from '@/services/switchService';
import { switchType } from '@/types/switch.type';
import errorHandler from '@/utils/errorHandler';
import { weightSchema, alternativeWeightSchema, typeSchema } from '@/utils/validations/weightedProduct.schema';

export async function POST(req: Request) {
    try {
        const { type, alternativeWeights, weights } = await req.json();

        typeSchema.safeParseAsync(type);
        alternativeWeightSchema.safeParseAsync(alternativeWeights);
        weightSchema.safeParseAsync(weights);

        const alternatives: switchType[] = await getSwitchForWP(type);

        const calculate = weightedProduct(alternatives, alternativeWeights, weights);

        return NextResponse.json({ success: true, data: calculate }, { status: 200 });
    } catch (error: any) {
        return errorHandler(error);
    }
}
