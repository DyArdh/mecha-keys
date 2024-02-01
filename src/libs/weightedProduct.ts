import { weightedCriterionType } from '@/types/weightedProduct.type';

const weights = {
    bottom_out_force: { value: 7, attribute: 'benefit' },
    actuation_travel: { value: 5, attribute: 'benefit' },
    total_travel: { value: 5, attribute: 'benefit' },
    lube_id: { value: 4, attribute: 'benefit' },
    price: { value: 9, attribute: 'cost' }
};

function criterionWeight(criterions: weightedCriterionType) {
    const totalWeight: number = Object.values(criterions).reduce((sum, weight) => sum + weight.value, 0);
    const normalizedWeights: weightedCriterionType = {} as weightedCriterionType;

    for (const criterion in weights) {
        const value = criterions[criterion].value / totalWeight;
        const attribute = criterions[criterion].attribute;
        const normalizedValue = attribute === 'cost' ? value * -1 : value;

        normalizedWeights[criterion] = {
            value: parseFloat(normalizedValue.toFixed(3)),
            attribute: attribute
        };
    }

    return normalizedWeights;
}

console.log(criterionWeight(weights));
