'use client';

import { PrimaryButtons } from "./PrimaryButtons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";


export const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const navbar = navbarRef.current;

        if (!navbar) {
            return;
        }

        const updateNavbarHeight = () => {
            document.documentElement.style.setProperty(
                "--navbar-height",
                `${navbar.getBoundingClientRect().height}px`
            );
        };

        updateNavbarHeight();
        const resizeObserver = new ResizeObserver(updateNavbarHeight);
        resizeObserver.observe(navbar);

        return () => {
            resizeObserver.disconnect();
            document.documentElement.style.removeProperty("--navbar-height");
        };
    }, []);

    const router = useRouter();
    const navigatetoaboutus = () => {
        router.push("/about");
        setMenuOpen(false);
    }
    const navigateto = () => {
        router.push("/");
        setMenuOpen(false);
    }

    const navigatetocontact = () => {
        router.push("/contact");
        setMenuOpen(false);
    }
    return (
        <nav ref={navbarRef} className="fixed top-0 left-0 z-50 w-full border border-black border-t-0 rounded-b-md bg-white px-3 py-2 sm:px-5 md:flex md:items-center md:justify-between md:gap-6 md:py-3">
           
           
            <div className="min-w-0 flex flex-col">
                <div className="flex items-center gap-2 sm:gap-[0.5vw] w-full">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-medium shadow-sm sm:h-16 sm:w-16 sm:text-base">
                        <Image src="/vercel.svg" alt="Logo" width={40} height={40} />
                    </div>
                    <div className="min-w-0 flex-1 px-1 text-center text-sm font-semibold leading-tight sm:text-base md:text-left md:text-lg" id="font">
                        Sathwik Consultations and Services
                    </div>
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-black hover:cursor-pointer hover:bg-black hover:text-white md:hidden"
                    >
                        {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
                    </button>
                </div>
                <div className="address mt-1 text-center  leading-snug text-gray-600 sm:text-xs md:mt-1 md:text-left">
                    <span>A-306, KONCEPT NEST APARTMENT</span>
                    <span>HOSAKERAHALLI MAIN ROAD, GANAPATHI NAGAR</span>
                    <span>
                     BYATARAYANAPURA BENGALURU 560026
                     </span>
                </div>
            </div>

            <div className={`${menuOpen ? "mt-2 flex flex-col gap-2 border-t border-black pt-2" : "hidden"} items-center justify-between md:mt-0 md:flex md:flex-row md:gap-[1vw] md:border-0 md:p-0`}>

                <PrimaryButtons onClick={navigateto} className="w-full md:w-fit md:min-h-9 md:min-w-0 md:px-3 md:text-sm">
                    Home
                </PrimaryButtons>


                <PrimaryButtons onClick={navigatetoaboutus} className="w-full md:w-fit md:min-h-9 md:min-w-0 md:px-3 md:text-sm">
                    About Us
                </PrimaryButtons>


                <PrimaryButtons onClick={navigatetocontact} className="w-full md:w-fit md:min-h-9 md:min-w-0 md:px-3 md:text-sm">
                    Contact Us
                </PrimaryButtons>

            </div>


        </nav>
    )
}
