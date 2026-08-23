"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const socials = [
    {
        label: "Facebook",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "#",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
            </svg>
        ),
    },
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const emailAddress = "sathwikms17@gmail.com";

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const subject = "Consultation Request";
        const body = [
            `Name: ${formData.get("name")}`,
            `Email: ${formData.get("email")}`,
            `Company: ${formData.get("company") || "Not provided"}`,
            `Contact Number: ${formData.get("headcount") || "Not provided"}`,
            "",
            `Message:\n${formData.get("message")}`,
        ].join("\n");
        const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, "_blank", "noopener,noreferrer");
        window.setTimeout(() => {
            window.location.href = mailtoUrl;
        }, 300);
        setSubmitted(true);
    };

    return (
        <section className="bg-background dark:from-orange-950/40 dark:via-background dark:to-background">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-12 text-center sm:px-6 md:py-24">
                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
                        Let&apos;s talk about what you need
                    </h1>
                    <p className="text-muted-foreground mx-auto max-w-xl text-base text-balance md:text-lg">
                        Have a question about our services or want to get started? Drop us
                        a line and we&apos;ll get back to you soon.
                    </p>
                </div>

                {/* Info row */}
                <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 text-center sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-6 md:gap-12">
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="text-muted-foreground size-4 shrink-0" />
                        <span className="text-muted-foreground">Bengaluru, India</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="text-muted-foreground size-4 shrink-0" />
                        <span className="text-muted-foreground">Email us at</span>
                        <a
                            href={`mailto:${emailAddress}?subject=${encodeURIComponent("Consultation Request")}`}
                            className="font-medium underline-offset-4 hover:underline"
                        >
                            {emailAddress}
                        </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="text-muted-foreground size-4 shrink-0" />
                        <span className="text-muted-foreground">Phone: </span>
                        <a
                            href="tel:+919980097736"
                            className="font-medium underline-offset-4 hover:underline"
                        >
                            +91 9980097736
                        </a>
                        <a
                            href="tel:+917892628294"
                            className="font-medium underline-offset-4 hover:underline"
                        >
                            +91 7892628294
                        </a>
                    </div>

                    <div className="flex items-center gap-3">
                        {socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="text-muted-foreground hover:text-foreground transition-colors [&_svg]:size-4"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Faded dashed divider */}
                <div className="relative mt-8 w-full sm:mt-10">
                    <div className="border-border border-t border-dashed" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-background to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-background to-transparent" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 w-full space-y-6 text-left sm:mt-10">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Jane Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="company">
                                Company <span className="text-muted-foreground">(optional)</span>
                            </Label>
                            <Input id="company" name="company" placeholder="Acme Inc." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="headcount">
                                Contact Number{" "}
                                <span className="text-muted-foreground"></span>
                            </Label>
                            <Input id="headcount" name="headcount" placeholder="1-10" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us a little about your project or question..."
                            rows={5}
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={submitted} className="w-full sm:w-auto">
                            {submitted ? "Message sent!" : "Send message"}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
