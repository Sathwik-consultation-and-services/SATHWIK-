export const Footer = () => {
    return (
        <footer className="border-2 border-black px-4 py-6 sm:px-8 rounded bg-background">
            <ul className="flex md:grid-cols-3 md:gap-8  justify-center">
                <li className="space-y-3 text-sm text-gray-700">
                    <a href="mailto:sathwikms17@gmail.com" className="block hover:text-black">
                        <span className="mr-2 text-gray-500">Email us at</span>
                        <span className="font-semibold text-slate-950">sathwikms17@gmail.com</span>
                    </a>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <span className="text-gray-500">Phone:</span>
                        <a href="tel:+919980097736" className="font-semibold text-slate-950 hover:underline">
                            +91 9980097736
                        </a>
                        <a href="tel:+917892628294" className="font-semibold text-slate-950 hover:underline">
                            +91 7892628294
                        </a>
                    </div>
                </li>
                <li className="max-w-xs">
                    <a
                        href="https://share.google/Lr1zNUTTa4oxEa1j5"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black"
                    >
                        <svg className="size-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z" />
                            <path fill="#EA4335" d="M12 2a7 7 0 0 0-7 7c0 1.9.82 3.97 1.9 5.93L12 12V2Z" />
                            <path fill="#FBBC04" d="m6.9 14.93 2.45 3.58L12 12l-5.1 2.93Z" />
                            <path fill="#34A853" d="M12 12v10s2.34-2.58 4.23-5.78l-4.23-4.22Z" />
                            <circle cx="12" cy="9" r="2.5" fill="white" />
                        </svg>
                        <span>Visit our location</span>
                    </a>
                    <address className="mt-3 pl-7 text-xs not-italic leading-5 text-gray-600">
                        <span className="block">A-306, KONCEPT NEST APARTMENT</span>
                        <span className="block">HOSAKERAHALLI MAIN ROAD, GANAPATHI NAGAR</span>
                        <span className="block">BYATARAYANAPURA BENGALURU 560026</span>
                    </address>
                </li>
            </ul>
        </footer>
    );
};