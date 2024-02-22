'use client';

import useSWR from 'swr';

import client from '@/libs/axiosInstance';
import { switchSchemaType } from '@/utils/validations/switch.schema';

const Test = ({ accessToken }: { accessToken: string; }) => {
    const fetcher = (url: string) =>
        client
            .get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((res) => res.data);

    const { data } = useSWR('/api/switchs', fetcher);

    return (
        <>
            <div>{data?.data.map((switchs: switchSchemaType, index: number) => <p key={index}>{switchs.name}</p>)}</div>
        </>
    );
};

export default Test;
