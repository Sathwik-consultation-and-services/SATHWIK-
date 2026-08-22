'use client';
import { PrimaryButtons } from "./components/PrimaryButtons";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter()

  const navigatetoproduct = () => {
    router.push("/products");
  }

  const navigatetoservice = () => {
    router.push('/services')
  }
  

  return (
    <div className="flex flex-col items-center gap-[5vh] min-h-screen bg-white pb-10">
      {/* Header */}
      <div className="w-full bg-white py-10 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-950 mb-2">Sathwik Consultation & Services</h1>
      </div>

      {/* Products Section */}
      <div className="w-[90%] rounded-2xl p-6 md:p-8 bg-linear-to-br border-2 border-black hover:shadow-2xl transition-shadow duration-300 min-h-96 flex flex-col justify-between">
        <div className="">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Products</h2>
        </div>
        <PrimaryButtons onClick={navigatetoproduct}>
          View Products
        </PrimaryButtons>
      </div>

      {/* Services Section */}
      <div className="w-[90%] rounded-2xl p-6 md:p-8 bg-linear-to-br border-2 border-black hover:shadow-2xl transition-shadow duration-300 min-h-96 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Services</h2>
        </div>
        <PrimaryButtons onClick={navigatetoservice}>
          View Services
        </PrimaryButtons>
      </div>

    </div>
  );
}
