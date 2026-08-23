'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import EnquireModal from '@/components/EnquireModal';

interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleEnquireNow = (product: Product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
            <div className="min-h-screen bg-background py-16">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold  mb-4">Our Products</h1>
            </div>

            {/* Grid */}
            <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group bg-background duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20"
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-64 bg-background overflow-hidden">
                                {product.image ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-500"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        priority={false}
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
                            <div className="p-6 flex flex-col h-full">
                                <h2 className="text-2xl font-bold text-slate-950 mb-3 line-clamp-2 group-hover:text-blue-400 transition">{product.name}</h2>
                                <p className="text-gray-700 text-sm mb-6 grow line-clamp-3">{product.description}</p>
                                <button
                                    onClick={() => handleEnquireNow(product)}
                                    className="w-full border-2 border-black bg-background text-slate-950 font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-slate-950 hover:text-white active:scale-95 shadow-lg"
                                >
                                    Enquire Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && selectedProduct && (
                <EnquireModal
                    product={selectedProduct}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}