import { switchType, switchAlternativeType } from '@/types/switch.type';
import { alternativeWeightType, weightedCriterionType } from '@/types/weightedProduct.type';

function criterionWeight(criterions: weightedCriterionType) {
    const totalWeight: number = Object.values(criterions).reduce((sum, weight) => sum + weight.value, 0);
    const normalizedWeights: weightedCriterionType = {} as weightedCriterionType;

    for (const criterion in criterions) {
        const value = criterions[criterion].value / totalWeight;
        const attribute = criterions[criterion].attribute;
        const normalizedValue = attribute === 'cost' ? value * -1 : value;

        normalizedWeights[criterion] = {
            value: normalizedValue,
            attribute: attribute
        };
    }

    return normalizedWeights;
}

function alternativeCriterion(alternatives: switchType[], weights: alternativeWeightType) {
    const result = alternatives.map((item) => {
        item.bottom_out_force =
            item.bottom_out_force < 50
                ? weights.bottom_out_force.c1
                : item.bottom_out_force < 60
                    ? weights.bottom_out_force.c2
                    : item.bottom_out_force < 70
                        ? weights.bottom_out_force.c3
                        : weights.bottom_out_force.c4;

        item.actuation_travel =
            item.actuation_travel < 2
                ? weights.actuation_travel.c1
                : item.actuation_travel < 2.5
                    ? weights.actuation_travel.c2
                    : weights.actuation_travel.c3;

        item.total_travel =
            item.total_travel < 3.5
                ? weights.total_travel.c1
                : item.total_travel < 4
                    ? weights.total_travel.c2
                    : weights.total_travel.c3;

        item.lube_id = item.lube_id === 1 ? weights.lube_id.c1 : weights.lube_id.c2;

        item.price =
            item.price < 4000
                ? weights.price.c1
                : item.price < 5000
                    ? weights.price.c2
                    : item.price < 6000
                        ? weights.price.c3
                        : weights.price.c4;

        return item;
    });

    return result;
}

function normalizedAlternative(alternatives: switchType[], weights: weightedCriterionType) {
    return alternatives.map((alternative) => {
        let totalS = 1;

        Object.keys(weights).forEach((criterion) => {
            const criterionValue = alternative[criterion];
            const weight = weights[criterion].value;

            if (typeof criterionValue === 'number') {
                const normalizedValue = Math.pow(criterionValue, weight);
                alternative[criterion] = normalizedValue;
                totalS *= normalizedValue;
            }
        });

        alternative.totalS = totalS;

        return alternative;
    });
}

function calculateWeightedProduct(alternatives: switchAlternativeType[]) {
    const totalValueS: number = alternatives.reduce((sum, alternative) => sum + Number(alternative.totalS), 0);

    const rankedAlternatives = alternatives.map((alternative) => ({
        ...alternative,
        v: (alternative.totalS ?? 0) / totalValueS
    }));

    return rankedAlternatives.sort((a, b) => b.v - a.v);
}

function weightedProduct(
    alternative: switchType[],
    alternativeWeights: alternativeWeightType,
    weights: weightedCriterionType
) {
    const normalizedAlternatives: switchAlternativeType[] = normalizedAlternative(
        alternativeCriterion(alternative, alternativeWeights),
        criterionWeight(weights)
    );

    return calculateWeightedProduct(normalizedAlternatives);
}

export default weightedProduct;
