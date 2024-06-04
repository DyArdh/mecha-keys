/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import DataTable from '@/components/DataTable';
import { resultWPType } from '@/types/weightedProduct.type';
import { ResultContext } from '@/utils/hooks/resultContext';

const page = () => {
    const router = useRouter();
    const { result } = useContext(ResultContext);

    if (!result) {
        router.push('/calculate');
    }

    const data = result as unknown as resultWPType[];

    return (
        <div>
            <DataTable result={data} />
        </div>
    );
};

export default page;
