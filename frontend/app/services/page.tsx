'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import EnquireModal from '@/components/EnquireModal';

/* eslint-disable @next/next/no-img-element */

interface Service {
    id: string;
    name: string;
    image: string;
    description: string;
}

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "https://sathwik-consultations-services-backend.onrender.com/api").replace(/\/+$/, "");
                const apiBase = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
                const response = await axios.get(`${apiBase}/services/get`);
                setServices(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, []);

    const handleEnquireNow = (service: Service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background py-16">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold  mb-4">Our Services</h1>
            </div>

            {/* Grid */}
            <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-black bg-background transition duration-300 shadow-lg hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/20"
                        >
                            {/* Image Container */}
                            <div className="relative h-64 w-full bg-background p-3 sm:p-4">
                                {service.image ? (
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="h-full w-full rounded-lg object-cover transition duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 bg-background">
                                        <svg className="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-6">
                                <h2 className="text-2xl font-bold text-slate-950 mb-3 line-clamp-2">{service.name}</h2>
                                <p className="mb-6 line-clamp-3 flex-1 text-sm text-gray-700">{service.description}</p>
                                <button
                                    onClick={() => handleEnquireNow(service)}
                                    className="w-full cursor-pointer border-2 border-black bg-background text-slate-950 font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-slate-950 hover:text-white active:scale-95 shadow-lg"
                                >
                                    Enquire Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && selectedService && (
                <EnquireModal
                    product={selectedService}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}