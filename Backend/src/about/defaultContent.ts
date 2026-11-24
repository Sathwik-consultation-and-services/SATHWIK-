export const ABOUT_PAGE_ID = "about-page";

export const SECTION_TYPES = {
  COMPANY_PROFILE: "COMPANY_PROFILE",
  OUR_PROFILE: "OUR_PROFILE",
  ASSOCIATE: "ASSOCIATE",
  CUSTOM: "CUSTOM",
} as const;

export const BLOCK_KINDS = {
  PARAGRAPH: "paragraph",
  HEADING: "heading",
  ACTIVITIES: "activities",
} as const;

export const defaultAboutContent = {
  id: ABOUT_PAGE_ID,
  heading: "Solar Expertise With a Practical Purpose",
  subtitle: "About Us",
  sections: [
    {
      id: "about-company",
      type: SECTION_TYPES.COMPANY_PROFILE,
      label: "Company profile",
      title: "SATHWIK CONSULTATION & SERVICES",
      imageUrl: "/logo.png",
      imageAlt: "Sathwik Consultation & Services logo",
      designation: "",
      qualifications: "",
      introduction:
        "SATHWIK CONSULTATION & SERVICES was established in 2016 with a vision of providing system certifications such as ISO, OHSAS, CE, and HACCP, along with professional consultations. The company later diversified into various types of AC and DC LED lights, solar products including solar water heaters and solar PV systems, and consultation, BOQ certification, and EPC support for ground-mounted and rooftop solar power plants.",
      experience: "",
      visible: true,
      active: true,
      displayOrder: 0,
      activities: [] as string[],
      blocks: [
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "SATHWIK CONSULTATION & SERVICES was established in 2016 with a vision of providing system certifications such as ISO, OHSAS, CE, and HACCP, along with professional consultations. The company later diversified into various types of AC and DC LED lights, solar products including solar water heaters and solar PV systems, and consultation, BOQ certification, and EPC support for ground-mounted and rooftop solar power plants.",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "We also provide FSSAI licensing, Udyam registration, and other business consultation services to help organizations meet their operational and compliance requirements.",
        },
        {
          kind: BLOCK_KINDS.HEADING,
          text: "About certification",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "We are a channel partner with International Accurate Certification, accredited by UASL, UK, for providing certificates against ISO 9001, ISO 14001, OHSAS 18000, ISO 22000, HACCP, ISO 20000, ISO 27001, ISO 13845, ISO 16949, ISO 29990, CE Mark, and ISO 50001 standards.",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "SATHWIK CONSULTATION & SERVICES was founded by the young, dynamic, and visionary entrepreneur Mr. Chandrashekhar. He served as a management representative for more than 20 years and implemented ISO systems in several organizations. SCS has since certified many companies for ISO certifications according to their requirements.",
        },
      ],
    },
    {
      id: "about-founder",
      type: SECTION_TYPES.OUR_PROFILE,
      label: "Our profile",
      title: "M S Chandrashekhar",
      imageUrl: "/image.png",
      imageAlt: "M S Chandrashekhar",
      designation: "",
      qualifications: "",
      introduction:
        "Mr. Chandrashekhar is an Electronics Engineer who has served for about 30 years in senior-level positions at companies such as RASHMI Solar, Radiant Solar, Shell Solar, KAYNES Energy Systems, and KAYNES Technology.",
      experience:
        "M S Chandrashekhar has vast experience of about 27 years in the design, manufacturing, and techno-commercial aspects of solar water heaters and solar PV systems, including lanterns, home lighting, street lighting, and power plants. His experience includes the design, procurement, and execution of both ground-mounted and rooftop solar PV power plants.",
      visible: true,
      active: true,
      displayOrder: 1,
      activities: [
        "Electricity generation and distribution",
        "Renewable energy and the environment",
        "Industrial installations",
        "Engineering installations",
      ],
      blocks: [
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "Mr. Chandrashekhar is an Electronics Engineer who has served for about 30 years in senior-level positions at companies such as RASHMI Solar, Radiant Solar, Shell Solar, KAYNES Energy Systems, and KAYNES Technology.",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "He completed a certificate course conducted by MNRE, BCCI, and CSD in 2015 on PV systems design, installation, and troubleshooting. He has handled more than 4 MW of solar power capacity in different roles.",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "M S Chandrashekhar has vast experience of about 27 years in the design, manufacturing, and techno-commercial aspects of solar water heaters and solar PV systems, including lanterns, home lighting, street lighting, and power plants. His experience includes the design, procurement, and execution of both ground-mounted and rooftop solar PV power plants.",
        },
        {
          kind: BLOCK_KINDS.HEADING,
          text: "Our mission",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "M S Chandrashekhar is a system integrator and solar energy EPC provider. Our mission is to create and integrate competitive solar energy technology that delights customers through best-in-class, optimal, end-to-end solar energy solutions. We consistently pursue customer delight through superior service and cutting-edge technology.",
        },
        {
          kind: BLOCK_KINDS.HEADING,
          text: "Constant innovation",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "We stand for constant innovation resulting in the very latest technological solutions.",
        },
        {
          kind: BLOCK_KINDS.HEADING,
          text: "Principal activities",
        },
        {
          kind: BLOCK_KINDS.ACTIVITIES,
          text: "",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "With our strengths in cutting-edge technology, strategic tie-ups with global leaders in PV technology, and an experienced system integration team, we can execute and manage kilowatt-scale solar PV power plants through to MW-sized solar farms.",
        },
      ],
    },
    {
      id: "about-associate-suresh",
      type: SECTION_TYPES.ASSOCIATE,
      label: "Associate",
      title: "Dr. R. Suresh Kumar",
      imageUrl: "/image2.png",
      imageAlt: "Dr. R. Suresh Kumar",
      designation: "Professor",
      qualifications:
        "B.E. (Mechanical), M.B.A., P.G.D.C.A., C. Eng (I), M.I.E., M.I. Mech E (London), and Ph.D. (Solar)",
      introduction:
        "Dr. R. Suresh Kumar holds B.E. (Mechanical), M.B.A., P.G.D.C.A., C. Eng (I), M.I.E., M.I. Mech E (London), and Ph.D. (Solar) degrees. He is a Ph.D. guide for Solar Engineering at JJT University, Rajasthan, and a visiting faculty member for M.Tech programs at BITS Pilani. He has also taught at NIT Surathkal.",
      experience:
        "Dr. Kumar has served in senior-level positions at SPM India Ltd., Kurlon Ltd., Rashmi Solar, and Kirloskar Brothers Ltd.",
      visible: true,
      active: true,
      displayOrder: 2,
      activities: [] as string[],
      blocks: [
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "Dr. R. Suresh Kumar holds B.E. (Mechanical), M.B.A., P.G.D.C.A., C. Eng (I), M.I.E., M.I. Mech E (London), and Ph.D. (Solar) degrees. He is a Ph.D. guide for Solar Engineering at JJT University, Rajasthan, and a visiting faculty member for M.Tech programs at BITS Pilani. He has also taught at NIT Surathkal.",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "Dr. Kumar has served in senior-level positions at SPM India Ltd., Kurlon Ltd., Rashmi Solar, and Kirloskar Brothers Ltd.",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "He received the “Bharat Bhushan” award in 2015 from the Bharathiya Samskrithika Academy, Bangalore, for his service in the field of Solar Power Projects. He also received the “Distinguished Alumnus Award” from Manipal University in 2008 and the “Best Citizen of India” award in 1998 from International Publishing House, New Delhi, for his invention of particle board from areca husk agro-waste. His name has also appeared in the “Outstanding Personalities in India” Directory and the “Outstanding Personalities in World” Directory.",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "Dr. Kumar is a Solar Power Projects Consultant for the Government of Tamil Nadu. He is a Certified Chartered Engineer and a Third Party Evaluator for Solar Power Projects in India, recognized by the Ministry of New and Renewable Energy, Government of India. He has participated as a Solar Power Projects panel expert on TV-9, News-9, and Public TV.",
        },
        {
          kind: BLOCK_KINDS.PARAGRAPH,
          text: "His textbook, “Fundamentals of Solar Energy,” was recently published and released in 110 countries and 39,000 locations worldwide, and is available through Amazon and Flipkart from Educreation Publishing, New Delhi.",
        },
      ],
    },
  ],
};
