"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface AboutBlock {
  id: string;
  kind: string;
  text: string;
  displayOrder: number;
}

interface AboutActivity {
  id: string;
  text: string;
  displayOrder: number;
}

interface AboutSection {
  id: string;
  type: string;
  label: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  designation: string;
  visible: boolean;
  active: boolean;
  displayOrder: number;
  blocks: AboutBlock[];
  activities: AboutActivity[];
}

interface AboutPage {
  id: string;
  heading: string;
  subtitle: string;
  sections: AboutSection[];
}

const initialAboutPage: AboutPage = {
  id: "about-page",
  heading: "Solar Expertise With a Practical Purpose",
  subtitle: "About Us",
  sections: [
    {
      id: "about-company",
      type: "COMPANY_PROFILE",
      label: "Company profile",
      title: "SATHWIK CONSULTATION & SERVICES",
      imageUrl: "/logo.png",
      imageAlt: "Sathwik Consultation & Services logo",
      designation: "",
      visible: true,
      active: true,
      displayOrder: 0,
      activities: [],
      blocks: [
        {
          id: "about-company-b0",
          kind: "paragraph",
          text: "SATHWIK CONSULTATION & SERVICES was established in 2016 with a vision of providing system certifications such as ISO, OHSAS, CE, and HACCP, along with professional consultations. The company later diversified into various types of AC and DC LED lights, solar products including solar water heaters and solar PV systems, and consultation, BOQ certification, and EPC support for ground-mounted and rooftop solar power plants.",
          displayOrder: 0,
        },
        {
          id: "about-company-b1",
          kind: "paragraph",
          text: "We also provide FSSAI licensing, Udyam registration, and other business consultation services to help organizations meet their operational and compliance requirements.",
          displayOrder: 1,
        },
        {
          id: "about-company-b2",
          kind: "heading",
          text: "About certification",
          displayOrder: 2,
        },
        {
          id: "about-company-b3",
          kind: "paragraph",
          text: "We are a channel partner with International Accurate Certification, accredited by UASL, UK, for providing certificates against ISO 9001, ISO 14001, OHSAS 18000, ISO 22000, HACCP, ISO 20000, ISO 27001, ISO 13845, ISO 16949, ISO 29990, CE Mark, and ISO 50001 standards.",
          displayOrder: 3,
        },
        {
          id: "about-company-b4",
          kind: "paragraph",
          text: "SATHWIK CONSULTATION & SERVICES was founded by the young, dynamic, and visionary entrepreneur Mr. Chandrashekhar. He served as a management representative for more than 20 years and implemented ISO systems in several organizations. SCS has since certified many companies for ISO certifications according to their requirements.",
          displayOrder: 4,
        },
      ],
    },
    {
      id: "about-founder",
      type: "OUR_PROFILE",
      label: "Our profile",
      title: "M S Chandrashekhar",
      imageUrl: "/image.png",
      imageAlt: "M S Chandrashekhar",
      designation: "",
      visible: true,
      active: true,
      displayOrder: 1,
      activities: [
        { id: "about-founder-a0", text: "Electricity generation and distribution", displayOrder: 0 },
        { id: "about-founder-a1", text: "Renewable energy and the environment", displayOrder: 1 },
        { id: "about-founder-a2", text: "Industrial installations", displayOrder: 2 },
        { id: "about-founder-a3", text: "Engineering installations", displayOrder: 3 },
      ],
      blocks: [
        {
          id: "about-founder-b0",
          kind: "paragraph",
          text: "Mr. Chandrashekhar is an Electronics Engineer who has served for about 30 years in senior-level positions at companies such as RASHMI Solar, Radiant Solar, Shell Solar, KAYNES Energy Systems, and KAYNES Technology.",
          displayOrder: 0,
        },
        {
          id: "about-founder-b1",
          kind: "paragraph",
          text: "He completed a certificate course conducted by MNRE, BCCI, and CSD in 2015 on PV systems design, installation, and troubleshooting. He has handled more than 4 MW of solar power capacity in different roles.",
          displayOrder: 1,
        },
        {
          id: "about-founder-b2",
          kind: "paragraph",
          text: "M S Chandrashekhar has vast experience of about 27 years in the design, manufacturing, and techno-commercial aspects of solar water heaters and solar PV systems, including lanterns, home lighting, street lighting, and power plants. His experience includes the design, procurement, and execution of both ground-mounted and rooftop solar PV power plants.",
          displayOrder: 2,
        },
        {
          id: "about-founder-b3",
          kind: "heading",
          text: "Our mission",
          displayOrder: 3,
        },
        {
          id: "about-founder-b4",
          kind: "paragraph",
          text: "M S Chandrashekhar is a system integrator and solar energy EPC provider. Our mission is to create and integrate competitive solar energy technology that delights customers through best-in-class, optimal, end-to-end solar energy solutions. We consistently pursue customer delight through superior service and cutting-edge technology.",
          displayOrder: 4,
        },
        {
          id: "about-founder-b5",
          kind: "heading",
          text: "Constant innovation",
          displayOrder: 5,
        },
        {
          id: "about-founder-b6",
          kind: "paragraph",
          text: "We stand for constant innovation resulting in the very latest technological solutions.",
          displayOrder: 6,
        },
        {
          id: "about-founder-b7",
          kind: "heading",
          text: "Principal activities",
          displayOrder: 7,
        },
        {
          id: "about-founder-b8",
          kind: "activities",
          text: "",
          displayOrder: 8,
        },
        {
          id: "about-founder-b9",
          kind: "paragraph",
          text: "With our strengths in cutting-edge technology, strategic tie-ups with global leaders in PV technology, and an experienced system integration team, we can execute and manage kilowatt-scale solar PV power plants through to MW-sized solar farms.",
          displayOrder: 9,
        },
      ],
    },
    {
      id: "about-associate-suresh",
      type: "ASSOCIATE",
      label: "Associate",
      title: "Dr. R. Suresh Kumar",
      imageUrl: "/image2.png",
      imageAlt: "Dr. R. Suresh Kumar",
      designation: "Professor",
      visible: true,
      active: true,
      displayOrder: 2,
      activities: [],
      blocks: [
        {
          id: "about-associate-suresh-b0",
          kind: "paragraph",
          text: "Dr. R. Suresh Kumar holds B.E. (Mechanical), M.B.A., P.G.D.C.A., C. Eng (I), M.I.E., M.I. Mech E (London), and Ph.D. (Solar) degrees. He is a Ph.D. guide for Solar Engineering at JJT University, Rajasthan, and a visiting faculty member for M.Tech programs at BITS Pilani. He has also taught at NIT Surathkal.",
          displayOrder: 0,
        },
        {
          id: "about-associate-suresh-b1",
          kind: "paragraph",
          text: "Dr. Kumar has served in senior-level positions at SPM India Ltd., Kurlon Ltd., Rashmi Solar, and Kirloskar Brothers Ltd.",
          displayOrder: 1,
        },
        {
          id: "about-associate-suresh-b2",
          kind: "paragraph",
          text: "He received the “Bharat Bhushan” award in 2015 from the Bharathiya Samskrithika Academy, Bangalore, for his service in the field of Solar Power Projects. He also received the “Distinguished Alumnus Award” from Manipal University in 2008 and the “Best Citizen of India” award in 1998 from International Publishing House, New Delhi, for his invention of particle board from areca husk agro-waste. His name has also appeared in the “Outstanding Personalities in India” Directory and the “Outstanding Personalities in World” Directory.",
          displayOrder: 2,
        },
        {
          id: "about-associate-suresh-b3",
          kind: "paragraph",
          text: "Dr. Kumar is a Solar Power Projects Consultant for the Government of Tamil Nadu. He is a Certified Chartered Engineer and a Third Party Evaluator for Solar Power Projects in India, recognized by the Ministry of New and Renewable Energy, Government of India. He has participated as a Solar Power Projects panel expert on TV-9, News-9, and Public TV.",
          displayOrder: 3,
        },
        {
          id: "about-associate-suresh-b4",
          kind: "paragraph",
          text: "His textbook, “Fundamentals of Solar Energy,” was recently published and released in 110 countries and 39,000 locations worldwide, and is available through Amazon and Flipkart from Educreation Publishing, New Delhi.",
          displayOrder: 4,
        },
      ],
    },
  ],
};

function getApiBase() {
  const apiUrl = (
    process.env.NEXT_PUBLIC_API_URL ?? "https://sathwik-consultations-services-backend.onrender.com/api"
  ).replace(/\/+$/, "");
  return apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
}

function sectionTitle(section: AboutSection) {
  if (section.designation?.trim()) {
    return `${section.title}, ${section.designation}`;
  }
  return section.title;
}

function AboutImage({ section }: { section: AboutSection }) {
  const compact = section.type === "OUR_PROFILE";
  const src = section.imageUrl || "";
  const unoptimized = src.startsWith("http") && !src.includes("res.cloudinary.com");

  return (
    <div className="flex min-h-80 items-center justify-center bg-background p-8 md:min-h-full">
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 border-black bg-background shadow-md ${
          compact ? "max-w-56" : "max-w-64"
        }`}
      >
        {src ? (
          <Image
            src={src}
            alt={section.imageAlt || section.title}
            fill
            priority={compact}
            className="object-contain"
            sizes={compact ? "224px" : "256px"}
            unoptimized={unoptimized}
          />
        ) : null}
      </div>
    </div>
  );
}

function SectionBody({ section }: { section: AboutSection }) {
  const isProfile = section.type === "OUR_PROFILE";
  return (
    <div className="p-6 sm:p-8 md:p-10">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.15em] text-gray-500 ${
          isProfile ? "mb-4" : "mb-3"
        }`}
      >
        {section.label}
      </p>
      <h2
        className={
          isProfile
            ? "mb-5 text-3xl font-bold text-slate-950"
            : "mb-5 text-3xl font-bold text-slate-950 md:text-4xl"
        }
      >
        {sectionTitle(section)}
      </h2>
      <div className="space-y-4 leading-7 text-gray-700">
        {section.blocks.map((block) => {
          if (block.kind === "heading") {
            return (
              <h3 key={block.id} className="pt-2 text-2xl font-bold text-slate-950">
                {block.text}
              </h3>
            );
          }
          if (block.kind === "activities") {
            return (
              <ul key={block.id} className="grid gap-3 sm:grid-cols-2">
                {section.activities.map((activity) => (
                  <li key={activity.id} className="border-l-4 border-black pl-3">
                    {activity.text}
                  </li>
                ))}
              </ul>
            );
          }
          return <p key={block.id}>{block.text}</p>;
        })}
      </div>
    </div>
  );
}

export default function About() {
  const [page, setPage] = useState<AboutPage>(initialAboutPage);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`${getApiBase()}/about/get`, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`About Us request failed with status ${response.status}`);
      }
      const data = (await response.json()) as AboutPage;
      if (data?.heading && Array.isArray(data.sections) && data.sections.length > 0) {
        setPage(data);
      }
    } catch (err) {
      console.warn("Could not fetch remote About Us content, displaying default content:", err);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            {page.subtitle}
          </p>
          <h1 className="text-4xl font-bold text-slate-950 md:text-5xl">{page.heading}</h1>
        </header>

        {page.sections.map((section) => (
          <section
            key={section.id}
            className="grid overflow-hidden rounded-2xl border-2 border-black bg-background shadow-lg md:grid-cols-[minmax(240px,0.7fr)_1.3fr]"
          >
            <AboutImage section={section} />
            <SectionBody section={section} />
          </section>
        ))}
      </div>
    </main>
  );
}
