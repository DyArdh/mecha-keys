import { getServerSession } from 'next-auth';

import Test from '@/components/test';
import { authOptions } from '@/lib/authOptions';

const Page = async () => {
    const session = (await getServerSession(authOptions)) as any;

    return (
        <>
            <div>
                <Test accessToken={session?.access_token} />
            </div>
        </>
    );
};

export default Page;
