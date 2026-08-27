import Image from "next/image";

export default function About() {
    return (
        <main className="min-h-screen bg-background px-4 py-12 sm:px-6 md:py-16">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                <header className="text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                        About Us
                    </p>
                    <h1 className="text-4xl font-bold text-slate-950 md:text-5xl">
                        Solar Expertise With a Practical Purpose
                    </h1>
                </header>

                <section className="grid overflow-hidden rounded-2xl border-2 border-black bg-background shadow-lg md:grid-cols-[minmax(240px,0.7fr)_1.3fr]">
                    <div className="flex min-h-80 items-center justify-center bg-background p-8 md:min-h-full">
                        <div className="relative aspect-square w-full max-w-64 overflow-hidden rounded-xl border-2 border-black bg-background shadow-md">
                            <Image
                                src="/logo.png"
                                alt="Sathwik Consultation & Services logo"
                                fill
                                className="object-contain"
                                sizes="256px"
                            />
                        </div>
                    </div>
                    <div className="p-6 sm:p-8 md:p-10">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
                            Company profile
                        </p>
                        <h2 className="mb-5 text-3xl font-bold text-slate-950 md:text-4xl">
                            SATHWIK CONSULTATION &amp; SERVICES
                        </h2>
                        <div className="space-y-4 leading-7 text-gray-700">
                            <p>
                                SATHWIK CONSULTATION &amp; SERVICES was established in 2016 with a vision of providing system certifications such as ISO, OHSAS, CE, and HACCP, along with professional consultations. The company later diversified into various types of AC and DC LED lights, solar products including solar water heaters and solar PV systems, and consultation, BOQ certification, and EPC support for ground-mounted and rooftop solar power plants.
                            </p>
                            <p>
                                We also provide FSSAI licensing, Udyam registration, and other business consultation services to help organizations meet their operational and compliance requirements.
                            </p>
                            <h3 className="pt-2 text-2xl font-bold text-slate-950">
                                About certification
                            </h3>
                            <p>
                                We are a channel partner with International Accurate Certification, accredited by UASL, UK, for providing certificates against ISO 9001, ISO 14001, OHSAS 18000, ISO 22000, HACCP, ISO 20000, ISO 27001, ISO 13845, ISO 16949, ISO 29990, CE Mark, and ISO 50001 standards.
                            </p>
                            <p>
                                SATHWIK CONSULTATION &amp; SERVICES was founded by the young, dynamic, and visionary entrepreneur Mr. Chandrashekhar. He served as a management representative for more than 20 years and implemented ISO systems in several organizations. SCS has since certified many companies for ISO certifications according to their requirements.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="grid overflow-hidden rounded-2xl border-2 border-black bg-background shadow-lg md:grid-cols-[minmax(240px,0.7fr)_1.3fr]">
                    <div className="flex min-h-80 items-center justify-center bg-background p-8 md:min-h-full">
                        <div className="relative aspect-square w-full max-w-56 overflow-hidden rounded-xl border-2 border-black bg-background shadow-md">
                            <Image
                                src="/image.png"
                                alt="M S Chandrashekhar"
                                fill
                                priority
                                className="object-contain"
                                sizes="224px"
                            />
                        </div>
                    </div>
                    <div className="p-6 sm:p-8 md:p-10">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
                            Our profile
                        </p>
                        <h2 className="mb-5 text-3xl font-bold text-slate-950">
                            M S Chandrashekhar
                        </h2>
                        <div className="space-y-4 leading-7 text-gray-700">
                            <p>
                                Mr. Chandrashekhar is an Electronics Engineer who has served for about 30 years in senior-level positions at companies such as RASHMI Solar, Radiant Solar, Shell Solar, KAYNES Energy Systems, and KAYNES Technology.
                            </p>
                            <p>
                                He completed a certificate course conducted by MNRE, BCCI, and CSD in 2015 on PV systems design, installation, and troubleshooting. He has handled more than 4 MW of solar power capacity in different roles.
                            </p>
                            <p>
                                M S Chandrashekhar has vast experience of about 27 years in the design, manufacturing, and techno-commercial aspects of solar water heaters and solar PV systems, including lanterns, home lighting, street lighting, and power plants. His experience includes the design, procurement, and execution of both ground-mounted and rooftop solar PV power plants.
                            </p>
                            <h3 className="pt-2 text-2xl font-bold text-slate-950">
                                Our mission
                            </h3>
                            <p>
                                M S Chandrashekhar is a system integrator and solar energy EPC provider. Our mission is to create and integrate competitive solar energy technology that delights customers through best-in-class, optimal, end-to-end solar energy solutions. We consistently pursue customer delight through superior service and cutting-edge technology.
                            </p>
                            <h3 className="pt-2 text-2xl font-bold text-slate-950">
                                Constant innovation
                            </h3>
                            <p>
                                We stand for constant innovation resulting in the very latest technological solutions.
                            </p>
                            <h3 className="pt-2 text-2xl font-bold text-slate-950">
                                Principal activities
                            </h3>
                            <ul className="grid gap-3 sm:grid-cols-2">
                                <li className="border-l-4 border-black pl-3">Electricity generation and distribution</li>
                                <li className="border-l-4 border-black pl-3">Renewable energy and the environment</li>
                                <li className="border-l-4 border-black pl-3">Industrial installations</li>
                                <li className="border-l-4 border-black pl-3">Engineering installations</li>
                            </ul>
                            <p>
                                With our strengths in cutting-edge technology, strategic tie-ups with global leaders in PV technology, and an experienced system integration team, we can execute and manage kilowatt-scale solar PV power plants through to MW-sized solar farms.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="grid overflow-hidden rounded-2xl border-2 border-black bg-background shadow-lg md:grid-cols-[minmax(240px,0.7fr)_1.3fr]">
                    <div className="flex min-h-80 items-center justify-center bg-background p-8 md:min-h-full">
                        <div className="relative aspect-square w-full max-w-64 overflow-hidden rounded-xl border-2 border-black bg-background shadow-md">
                            <Image
                                src="/image2.png"
                                alt="Dr. R. Suresh Kumar"
                                fill
                                className="object-contain"
                                sizes="256px"
                            />
                        </div>
                    </div>
                    <div className="p-6 sm:p-8 md:p-10">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
                            Associate
                        </p>
                        <h2 className="mb-5 text-3xl font-bold text-slate-950 md:text-4xl">
                            Dr. R. Suresh Kumar, Professor
                        </h2>
                        <div className="space-y-4 leading-7 text-gray-700">
                            <p>
                                Dr. R. Suresh Kumar holds B.E. (Mechanical), M.B.A., P.G.D.C.A., C. Eng (I), M.I.E., M.I. Mech E (London), and Ph.D. (Solar) degrees. He is a Ph.D. guide for Solar Engineering at JJT University, Rajasthan, and a visiting faculty member for M.Tech programs at BITS Pilani. He has also taught at NIT Surathkal.
                            </p>
                            <p>
                                Dr. Kumar has served in senior-level positions at SPM India Ltd., Kurlon Ltd., Rashmi Solar, and Kirloskar Brothers Ltd.
                            </p>
                            <p>
                                He received the “Bharat Bhushan” award in 2015 from the Bharathiya Samskrithika Academy, Bangalore, for his service in the field of Solar Power Projects. He also received the “Distinguished Alumnus Award” from Manipal University in 2008 and the “Best Citizen of India” award in 1998 from International Publishing House, New Delhi, for his invention of particle board from areca husk agro-waste. His name has also appeared in the “Outstanding Personalities in India” Directory and the “Outstanding Personalities in World” Directory.
                            </p>
                            <p>
                                Dr. Kumar is a Solar Power Projects Consultant for the Government of Tamil Nadu. He is a Certified Chartered Engineer and a Third Party Evaluator for Solar Power Projects in India, recognized by the Ministry of New and Renewable Energy, Government of India. He has participated as a Solar Power Projects panel expert on TV-9, News-9, and Public TV.
                            </p>
                            <p>
                                His textbook, “Fundamentals of Solar Energy,” was recently published and released in 110 countries and 39,000 locations worldwide, and is available through Amazon and Flipkart from Educreation Publishing, New Delhi.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}