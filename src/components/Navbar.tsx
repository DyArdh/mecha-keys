'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const GripLinesIcon = dynamic(() => import('./icons/GripLinesIcon'), { ssr: false });
const XmarkIcon = dynamic(() => import('./icons/XmarkIcon'), { ssr: false });

interface navProps {
    navOpen: boolean;
}

const navLinkData = [
    { name: 'Home', path: '/' },
    { name: 'Switch', path: '/switch' },
    { name: 'Rekomendasi', path: '/calculate' }
];

function NavLink({ navOpen }: navProps) {
    const pathName = usePathname();
    return (
        <>
            <div
                className="fixed z-40 flex h-screen w-full flex-col items-center justify-between bg-white backdrop-blur transition-transform duration-500 ease-in-out md:hidden"
                style={{
                    transform: navOpen ? 'translateY(0%) translateZ(0px)' : 'translateY(-100%) translateZ(0px)'
                }}
            >
                <div></div>
                <div className="py-4">
                    <div className="flex flex-col items-center space-y-5 text-2xl">
                        {navLinkData.map((data, index) => (
                            <Link
                                key={index}
                                href={data.path}
                                scroll={false}
                                className={`${
                                    pathName === data.path ? 'rounded-full border border-yellow-second px-8 py-2' : ''
                                } px-8 py-2 font-openSans hover:rounded-full hover:border hover:border-yellow-second hover:px-8 hover:py-2`}
                            >
                                {data.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div></div>
            </div>
        </>
    );
}

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        setNavOpen(false);
    }, [pathName]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setNavOpen(!event.matches);
        };

        handleMediaQueryChange({
            matches: mediaQuery.matches
        } as MediaQueryListEvent);

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav
                className={`fixed z-50 w-full bg-transparent transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : ''}`}
            >
                <div className="container flex items-center justify-between px-5 py-4 md:px-[110px]">
                    <h1 className="text-xl font-bold">
                        Mecha<span className="text-yellow-second">Switch</span>
                    </h1>
                    {/* Mobile Navbar */}
                    <div className="flex gap-4 md:hidden">
                        <button onClick={() => setNavOpen(!navOpen)}>
                            {navOpen ? <XmarkIcon className="w-5" /> : <GripLinesIcon className="w-5" />}
                        </button>
                    </div>

                    <div className="hidden font-semibold md:flex md:gap-x-5">
                        {navLinkData.map((data, index) => (
                            <Link
                                key={index}
                                href={data.path}
                                scroll={false}
                                className={`${pathName === data.path ? 'text-yellow-second' : ''} cursor-pointer hover:text-yellow-second`}
                            >
                                {data.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
            <NavLink navOpen={navOpen} />
        </>
    );
}
