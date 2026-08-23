'use client';
import { useEffect, useState } from "react";
import { PrimaryButtons } from "./components/PrimaryButtons";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
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
  }, []);

  return (
    <div className="flex flex-col items-center gap-[5vh] min-h-screen bg-background text-slate-950 pb-10">
      {/* Header */}
      <div className="w-full bg-background py-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-950 mb-2">Sathwik Consultation & Services</h1>
      </div>

      {/* Products Section */}
      <section className="w-[90%] rounded-2xl border-2 border-black bg-background p-6 shadow-lg transition-shadow duration-300 hover:shadow-2xl md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-3">Products</h2>
          <PrimaryButtons onClick={navigatetoproduct}>
            View Products
          </PrimaryButtons>
        </div>
        {productsLoading ? (
          <p className="py-10 text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="py-10 text-center text-gray-600">No products available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-xl border-2 border-black bg-background">
                <div className="h-52 w-full bg-background">
                  {product.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-500">No image</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-slate-950">{product.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-700">{product.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Services Section */}
      <div className="w-[90%] rounded-2xl p-6 md:p-8 bg-linear-to-br border-2 border-black hover:shadow-2xl transition-shadow duration-300 min-h-96 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-3">Services</h2>
        </div>
        <PrimaryButtons onClick={navigatetoservice}>
          View Services
        </PrimaryButtons>
      </div>

    </div>
  );
}
