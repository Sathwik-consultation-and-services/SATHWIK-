'use client';
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface Service {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "https://sathwik-consultations-services-backend.onrender.com/api").replace(/\/+$/, "");
        const apiBase = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
        const response = await fetch(`${apiBase}/products/get`);
        if (!response.ok) {
          throw new Error(`Products request failed with status ${response.status}`);
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();

    const loadServices = async () => {
      try {
        const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "https://sathwik-consultations-services-backend.onrender.com/api").replace(/\/+$/, "");
        const apiBase = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
        const response = await fetch(`${apiBase}/services/get`);
        if (!response.ok) {
          throw new Error(`Services request failed with status ${response.status}`);
        }
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setServicesLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="flex flex-col items-center gap-[5vh] min-h-screen bg-background text-slate-950 pb-10">
      {/* Header */}
      <div className="w-full bg-background py-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-950 mb-2">Sathwik Consultation & Services</h1>
      </div>

      {/* Products Section */}
      <a
        href="/products"
        className="block w-[90%] cursor-pointer rounded-2xl border-2 border-black bg-background p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 md:p-8"
        aria-label="View all products"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-3">Products</h2>
          <span className="w-fit min-w-36 rounded-md border border-black bg-background px-5 py-2.5 text-center text-base text-slate-950 transition hover:bg-slate-950 hover:text-white">
            View Products
          </span>
        </div>
        {productsLoading ? (
          <p className="py-10 text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center text-gray-600">No products available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-xl border-2 border-black bg-background">
                <div className="aspect-video w-full bg-background p-2 sm:p-3">
                  {product.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={product.image} alt={product.name} className="h-full w-full rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">No image</div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-slate-950">{product.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-700">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </a>

      {/* Services Section */}
      <a
        href="/services"
        className="block w-[90%] cursor-pointer rounded-2xl border-2 border-black bg-background p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 md:p-8"
        aria-label="View all services"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="mb-3 text-3xl font-bold text-slate-950 md:text-4xl">Services</h2>
          <span className="w-fit min-w-36 rounded-md border border-black bg-background px-5 py-2.5 text-center text-base text-slate-950 transition hover:bg-slate-950 hover:text-white">
            View Services
          </span>
        </div>
        {servicesLoading ? (
          <p className="py-10 text-center text-gray-600">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="py-10 text-center text-gray-600">No services available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="overflow-hidden rounded-xl border-2 border-black bg-background">
                <div className="aspect-video w-full bg-background p-2 sm:p-3">
                  {service.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={service.image} alt={service.name} className="h-full w-full rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">No image</div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-slate-950">{service.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-700">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </a>

    </div>
  );
}
