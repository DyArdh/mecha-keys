type weightedCriterionResult = {
    value: number;
    attribute: string;
};

interface weightedCriterionType {
    bottom_out_force: weightedCriterionResult;
    actuation_travel: weightedCriterionResult;
    total_travel: weightedCriterionResult;
    lube_id: weightedCriterionResult;
    price: weightedCriterionResult;
    [key: string]: weightedCriterionResult;
}

interface alternativeWeightType {
    bottom_out_force: {
        c1: number;
        c2: number;
        c3: number;
        c4: number;
    };
    actuation_travel: {
        c1: number;
        c2: number;
        c3: number;
    };
    total_travel: {
        c1: number;
        c2: number;
        c3: number;
    };
    lube_id: {
        c1: number;
        c2: number;
    };
    price: {
        c1: number;
        c2: number;
        c3: number;
        c4: number;
    };
}

export type { alternativeWeightType, weightedCriterionType };
