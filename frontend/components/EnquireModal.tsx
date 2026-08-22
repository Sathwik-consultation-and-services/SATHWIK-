'use client';

import { useState } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
}

interface EnquireModalProps {
    product: Product;
    onClose: () => void;
}

export default function EnquireModal({ product, onClose }: EnquireModalProps) {
    const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp' | null>(null);
    const [loading, setLoading] = useState(false);

    // Replace with your actual business contact details
    const BUSINESS_EMAIL = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'info@sathwik.com';
    const BUSINESS_WHATSAPP = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || '+919999999999';

    const handleEmailClick = async () => {
        setLoading(true);
        const subject = `Enquiry about ${product.name}`;
        const body = `Hi,\n\nI am interested in knowing more about ${product.name}.\n\nProduct Description: ${product.description}\n\nPlease provide more details.\n\nThank you.`;
        
        // Open default mail client
        window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        setTimeout(() => {
            setLoading(false);
            onClose();
        }, 1000);
    };

    const handleWhatsAppClick = async () => {
        setLoading(true);
        const message = `Hi! I am interested in ${product.name}. Can you please provide more details?`;
        
        // Open WhatsApp
        const whatsappURL = `https://wa.me/${BUSINESS_WHATSAPP.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
        
        setTimeout(() => {
            setLoading(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4 border border-gray-700">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                    <p className="text-gray-400 text-sm mt-2">Inquire about <span className="text-white font-semibold">{product.name}</span></p>
                </div>

                {/* Contact Options */}
                <div className="space-y-4 mb-6">
                    {/* Email Option */}
                    <button
                        onClick={handleEmailClick}
                        disabled={loading}
                        className={`w-full p-4 rounded-lg border-2 transition ${
                            contactMethod === 'email'
                                ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-xl">📧</div>
                            <div className="text-left">
                                <p className="text-white font-semibold">Email</p>
                                <p className="text-gray-400 text-sm">{BUSINESS_EMAIL}</p>
                            </div>
                        </div>
                    </button>

                    {/* WhatsApp Option */}
                    <button
                        onClick={handleWhatsAppClick}
                        disabled={loading}
                        className={`w-full p-4 rounded-lg border-2 transition ${
                            contactMethod === 'whatsapp'
                                ? 'border-green-500 bg-green-500 bg-opacity-10'
                                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-xl">💬</div>
                            <div className="text-left">
                                <p className="text-white font-semibold">WhatsApp</p>
                                <p className="text-gray-400 text-sm">{BUSINESS_WHATSAPP}</p>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Quick Message */}
                <div className="bg-gray-800 rounded p-4 mb-6">
                    <p className="text-gray-300 text-sm">
                        <span className="font-semibold text-white">Message:</span> {product.description}
                    </p>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    disabled={loading}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
                >
                    {loading ? 'Opening...' : 'Close'}
                </button>
            </div>
        </div>
    );
}
