import Image from 'next/image';
import Link from 'next/link';

import BgHero from '@/../public/images/bg-hero.webp';
import Hero1 from '@/../public/images/hero1.webp';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="h-screen">
            <div className="absolute inset-0 z-0 hidden md:block">
                <Image src={BgHero} alt="Login Background" fill={true} quality={100} className="object-cover" />
            </div>
            <div className="relative md:container">
                <div className="absolute top-1/2 z-10 grid translate-y-1/3 grid-cols-1 items-center justify-items-center px-2 md:translate-y-1/2 md:grid-cols-3 md:justify-items-start md:px-20">
                    <div className="md:col-span-2">
                        <h1 className="text-center text-3xl font-bold md:text-left md:text-4xl">
                            Susah Cari <span className="text-yellow-second">Switch</span>
                            <br />
                            Untuk Mechanical Keyboardmu?
                        </h1>
                        <p className="mt-2 text-center md:text-left">
                            Temukan rekomendasi switch mechanical keyboard <br />
                            yang sesuai dengan preferensi kamu.
                        </p>
                        <Link href={'/rekomendasi'} className="flex justify-center md:block" scroll={false}>
                            <Button size={'lg'} className="bg-yellow-second hover:bg-yellow-second/90 mt-5 text-black">
                                Temukan Sekarang!
                            </Button>
                        </Link>
                    </div>
                    <Image src={Hero1} className="w-72 md:w-[1000px]" quality={100} alt="Hero 1" />
                </div>
            </div>
        </div>
    );
}
