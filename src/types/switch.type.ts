interface switchType {
    id: number;
    name: string;
    bottom_out_force: number;
    actuation_travel: number;
    total_travel: number;
    lube_id: number;
    price: number;
    [key: string]: number | string;
}

interface switchAlternativeType {
    id: number;
    name: string;
    bottom_out_force: number;
    actuation_travel: number;
    total_travel: number;
    lube_id: number;
    price: number;
    totalS?: number;
}

export type { switchType, switchAlternativeType };
