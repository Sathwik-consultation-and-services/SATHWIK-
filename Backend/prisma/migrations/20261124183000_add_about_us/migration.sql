-- CreateTable
CREATE TABLE "AboutPage" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutSection" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "imageAlt" TEXT NOT NULL DEFAULT '',
    "designation" TEXT NOT NULL DEFAULT '',
    "qualifications" TEXT NOT NULL DEFAULT '',
    "introduction" TEXT NOT NULL DEFAULT '',
    "experience" TEXT NOT NULL DEFAULT '',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutBlock" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "AboutBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutActivity" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "AboutActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AboutSection_pageId_displayOrder_idx" ON "AboutSection"("pageId", "displayOrder");

-- CreateIndex
CREATE INDEX "AboutBlock_sectionId_displayOrder_idx" ON "AboutBlock"("sectionId", "displayOrder");

-- CreateIndex
CREATE INDEX "AboutActivity_sectionId_displayOrder_idx" ON "AboutActivity"("sectionId", "displayOrder");

-- AddForeignKey
ALTER TABLE "AboutSection" ADD CONSTRAINT "AboutSection_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "AboutPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutBlock" ADD CONSTRAINT "AboutBlock_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "AboutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutActivity" ADD CONSTRAINT "AboutActivity_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "AboutSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed existing About Us content (idempotent)
INSERT INTO "AboutPage" ("id", "heading", "subtitle", "createdAt", "updatedAt")
VALUES (
    'about-page',
    'Solar Expertise With a Practical Purpose',
    'About Us',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AboutSection" (
    "id", "pageId", "type", "label", "title", "imageUrl", "imageAlt",
    "designation", "qualifications", "introduction", "experience",
    "visible", "active", "displayOrder", "createdAt", "updatedAt"
) VALUES (
    'about-company',
    'about-page',
    'COMPANY_PROFILE',
    'Company profile',
    'SATHWIK CONSULTATION & SERVICES',
    '/logo.png',
    'Sathwik Consultation & Services logo',
    '',
    '',
    $about$SATHWIK CONSULTATION & SERVICES was established in 2016 with a vision of providing system certifications such as ISO, OHSAS, CE, and HACCP, along with professional consultations. The company later diversified into various types of AC and DC LED lights, solar products including solar water heaters and solar PV systems, and consultation, BOQ certification, and EPC support for ground-mounted and rooftop solar power plants.$about$,
    '',
    true,
    true,
    0,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AboutSection" (
    "id", "pageId", "type", "label", "title", "imageUrl", "imageAlt",
    "designation", "qualifications", "introduction", "experience",
    "visible", "active", "displayOrder", "createdAt", "updatedAt"
) VALUES (
    'about-founder',
    'about-page',
    'OUR_PROFILE',
    'Our profile',
    'M S Chandrashekhar',
    '/image.png',
    'M S Chandrashekhar',
    '',
    '',
    $about$Mr. Chandrashekhar is an Electronics Engineer who has served for about 30 years in senior-level positions at companies such as RASHMI Solar, Radiant Solar, Shell Solar, KAYNES Energy Systems, and KAYNES Technology.$about$,
    $about$M S Chandrashekhar has vast experience of about 27 years in the design, manufacturing, and techno-commercial aspects of solar water heaters and solar PV systems, including lanterns, home lighting, street lighting, and power plants. His experience includes the design, procurement, and execution of both ground-mounted and rooftop solar PV power plants.$about$,
    true,
    true,
    1,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AboutSection" (
    "id", "pageId", "type", "label", "title", "imageUrl", "imageAlt",
    "designation", "qualifications", "introduction", "experience",
    "visible", "active", "displayOrder", "createdAt", "updatedAt"
) VALUES (
    'about-associate-suresh',
    'about-page',
    'ASSOCIATE',
    'Associate',
    'Dr. R. Suresh Kumar',
    '/image2.png',
    'Dr. R. Suresh Kumar',
    'Professor',
    $about$B.E. (Mechanical), M.B.A., P.G.D.C.A., C. Eng (I), M.I.E., M.I. Mech E (London), and Ph.D. (Solar)$about$,
    $about$Dr. R. Suresh Kumar holds B.E. (Mechanical), M.B.A., P.G.D.C.A., C. Eng (I), M.I.E., M.I. Mech E (London), and Ph.D. (Solar) degrees. He is a Ph.D. guide for Solar Engineering at JJT University, Rajasthan, and a visiting faculty member for M.Tech programs at BITS Pilani. He has also taught at NIT Surathkal.$about$,
    $about$Dr. Kumar has served in senior-level positions at SPM India Ltd., Kurlon Ltd., Rashmi Solar, and Kirloskar Brothers Ltd.$about$,
    true,
    true,
    2,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AboutBlock" ("id", "sectionId", "kind", "text", "displayOrder") VALUES
('about-company-b0', 'about-company', 'paragraph', $about$SATHWIK CONSULTATION & SERVICES was established in 2016 with a vision of providing system certifications such as ISO, OHSAS, CE, and HACCP, along with professional consultations. The company later diversified into various types of AC and DC LED lights, solar products including solar water heaters and solar PV systems, and consultation, BOQ certification, and EPC support for ground-mounted and rooftop solar power plants.$about$, 0),
('about-company-b1', 'about-company', 'paragraph', $about$We also provide FSSAI licensing, Udyam registration, and other business consultation services to help organizations meet their operational and compliance requirements.$about$, 1),
('about-company-b2', 'about-company', 'heading', 'About certification', 2),
('about-company-b3', 'about-company', 'paragraph', $about$We are a channel partner with International Accurate Certification, accredited by UASL, UK, for providing certificates against ISO 9001, ISO 14001, OHSAS 18000, ISO 22000, HACCP, ISO 20000, ISO 27001, ISO 13845, ISO 16949, ISO 29990, CE Mark, and ISO 50001 standards.$about$, 3),
('about-company-b4', 'about-company', 'paragraph', $about$SATHWIK CONSULTATION & SERVICES was founded by the young, dynamic, and visionary entrepreneur Mr. Chandrashekhar. He served as a management representative for more than 20 years and implemented ISO systems in several organizations. SCS has since certified many companies for ISO certifications according to their requirements.$about$, 4)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AboutBlock" ("id", "sectionId", "kind", "text", "displayOrder") VALUES
('about-founder-b0', 'about-founder', 'paragraph', $about$Mr. Chandrashekhar is an Electronics Engineer who has served for about 30 years in senior-level positions at companies such as RASHMI Solar, Radiant Solar, Shell Solar, KAYNES Energy Systems, and KAYNES Technology.$about$, 0),
('about-founder-b1', 'about-founder', 'paragraph', $about$He completed a certificate course conducted by MNRE, BCCI, and CSD in 2015 on PV systems design, installation, and troubleshooting. He has handled more than 4 MW of solar power capacity in different roles.$about$, 1),
('about-founder-b2', 'about-founder', 'paragraph', $about$M S Chandrashekhar has vast experience of about 27 years in the design, manufacturing, and techno-commercial aspects of solar water heaters and solar PV systems, including lanterns, home lighting, street lighting, and power plants. His experience includes the design, procurement, and execution of both ground-mounted and rooftop solar PV power plants.$about$, 2),
('about-founder-b3', 'about-founder', 'heading', 'Our mission', 3),
('about-founder-b4', 'about-founder', 'paragraph', $about$M S Chandrashekhar is a system integrator and solar energy EPC provider. Our mission is to create and integrate competitive solar energy technology that delights customers through best-in-class, optimal, end-to-end solar energy solutions. We consistently pursue customer delight through superior service and cutting-edge technology.$about$, 4),
('about-founder-b5', 'about-founder', 'heading', 'Constant innovation', 5),
('about-founder-b6', 'about-founder', 'paragraph', $about$We stand for constant innovation resulting in the very latest technological solutions.$about$, 6),
('about-founder-b7', 'about-founder', 'heading', 'Principal activities', 7),
('about-founder-b8', 'about-founder', 'activities', '', 8),
('about-founder-b9', 'about-founder', 'paragraph', $about$With our strengths in cutting-edge technology, strategic tie-ups with global leaders in PV technology, and an experienced system integration team, we can execute and manage kilowatt-scale solar PV power plants through to MW-sized solar farms.$about$, 9)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AboutBlock" ("id", "sectionId", "kind", "text", "displayOrder") VALUES
('about-associate-suresh-b0', 'about-associate-suresh', 'paragraph', $about$Dr. R. Suresh Kumar holds B.E. (Mechanical), M.B.A., P.G.D.C.A., C. Eng (I), M.I.E., M.I. Mech E (London), and Ph.D. (Solar) degrees. He is a Ph.D. guide for Solar Engineering at JJT University, Rajasthan, and a visiting faculty member for M.Tech programs at BITS Pilani. He has also taught at NIT Surathkal.$about$, 0),
('about-associate-suresh-b1', 'about-associate-suresh', 'paragraph', $about$Dr. Kumar has served in senior-level positions at SPM India Ltd., Kurlon Ltd., Rashmi Solar, and Kirloskar Brothers Ltd.$about$, 1),
('about-associate-suresh-b2', 'about-associate-suresh', 'paragraph', $about$He received the “Bharat Bhushan” award in 2015 from the Bharathiya Samskrithika Academy, Bangalore, for his service in the field of Solar Power Projects. He also received the “Distinguished Alumnus Award” from Manipal University in 2008 and the “Best Citizen of India” award in 1998 from International Publishing House, New Delhi, for his invention of particle board from areca husk agro-waste. His name has also appeared in the “Outstanding Personalities in India” Directory and the “Outstanding Personalities in World” Directory.$about$, 2),
('about-associate-suresh-b3', 'about-associate-suresh', 'paragraph', $about$Dr. Kumar is a Solar Power Projects Consultant for the Government of Tamil Nadu. He is a Certified Chartered Engineer and a Third Party Evaluator for Solar Power Projects in India, recognized by the Ministry of New and Renewable Energy, Government of India. He has participated as a Solar Power Projects panel expert on TV-9, News-9, and Public TV.$about$, 3),
('about-associate-suresh-b4', 'about-associate-suresh', 'paragraph', $about$His textbook, “Fundamentals of Solar Energy,” was recently published and released in 110 countries and 39,000 locations worldwide, and is available through Amazon and Flipkart from Educreation Publishing, New Delhi.$about$, 4)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "AboutActivity" ("id", "sectionId", "text", "displayOrder") VALUES
('about-founder-a0', 'about-founder', 'Electricity generation and distribution', 0),
('about-founder-a1', 'about-founder', 'Renewable energy and the environment', 1),
('about-founder-a2', 'about-founder', 'Industrial installations', 2),
('about-founder-a3', 'about-founder', 'Engineering installations', 3)
ON CONFLICT ("id") DO NOTHING;
