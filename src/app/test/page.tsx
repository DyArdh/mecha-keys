import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Test from '@/components/test';

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
