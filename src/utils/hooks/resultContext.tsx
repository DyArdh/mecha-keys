'use client';

import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

import { formSchemaType } from '@/utils/validations/weightedProduct.schema';

export const ResultContext = createContext<{
    result: formSchemaType[] | undefined;
    setResult: Dispatch<SetStateAction<formSchemaType[] | undefined>>;
}>({
    result: undefined,
    setResult: () => {}
});

export const ResultProvider = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [result, setResult] = useState<formSchemaType[] | undefined>(undefined);

    return <ResultContext.Provider value={{ result, setResult }}>{children}</ResultContext.Provider>;
};
