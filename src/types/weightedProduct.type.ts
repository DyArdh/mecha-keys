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

export type { weightedCriterionType };
