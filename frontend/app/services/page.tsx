'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import EnquireModal from '@/components/EnquireModal';

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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}services`);
                setServices(response.data);
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
        <div className="min-h-screen bg-linear-to-br     py-16">
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
                            className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500 transition duration-300 shadow-lg hover:shadow-2xl hover:shadow-green-500/20"
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-64 bg-gray-800 overflow-hidden">
                                {service.image ? (
                                    <Image
                                        src={service.image}
                                        alt={service.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        priority={false}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500 bg-linear-to-br from-gray-700 to-gray-800">
                                        <svg className="w-16 h-16 opacity-30" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col h-full">
                                <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition">{service.name}</h2>
                                <p className="text-gray-400 text-sm mb-6 grow line-clamp-3">{service.description}</p>
                                <button
                                    onClick={() => handleEnquireNow(service)}
                                    className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50"
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