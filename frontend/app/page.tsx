'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { PrimaryButtons } from "./components/PrimaryButtons";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const router = useRouter()

  const navigatetoproduct = () => {
    router.push("/products");
  }

  const navigatetoservice = () => {
    router.push('/services')
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const apiUrl = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api").replace(/\/+$/, "");
        const apiBase = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;
        const response = await fetch(`${apiBase}/products/get`);
        if (response.ok) {
          const data = await response.json();
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    loadProducts();
  }, []);
  

  return (
    <div className="flex flex-col items-center gap-[5vh] min-h-screen bg-background text-slate-950 pb-10">
      {/* Header */}
      <div className="w-full bg-background py-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-950 mb-2">Sathwik Consultation & Services</h1>
      </div>

      {/* Products Section */}
      <div className="w-[90%] rounded-2xl p-6 md:p-8 bg-linear-to-br border-2 border-black hover:shadow-2xl transition-shadow duration-300 min-h-96 flex flex-col justify-between">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-3">Products</h2>
        </div>
        <PrimaryButtons onClick={navigatetoproduct}>
          View Products
        </PrimaryButtons>
      </div>

      {/* Services Section */}
      <div className="w-[90%] rounded-2xl p-6 md:p-8 bg-linear-to-br border-2 border-black hover:shadow-2xl transition-shadow duration-300 min-h-96 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-3">Services</h2>
        </div>
        <PrimaryButtons onClick={navigatetoservice}>
          View Services
        </PrimaryButtons>
      </div>

      {products.length > 0 && (
        <section className="w-[90%]">
          <h2 className="mb-5 text-3xl font-bold text-slate-950">Featured products</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <article key={product.id} className="overflow-hidden rounded-2xl border-2 border-black bg-background shadow-lg">
                <div className="relative h-52 w-full bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <h3 className="p-4 text-xl font-bold text-slate-950">{product.name}</h3>
              </article>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
