import ResourceManager from "@/components/ResourceManager";

export default function ServicesPage() {
  return (
    <ResourceManager
      resource="services"
      title="Services"
      subtitle="Create, edit and remove services. Images upload straight to Cloudinary."
    />
  );
}
