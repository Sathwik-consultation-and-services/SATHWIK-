import ResourceManager from "@/components/ResourceManager";

export default function ProductsPage() {
  return (
    <ResourceManager
      resource="products"
      title="Products"
      subtitle="Create, edit and remove products. Images upload straight to Cloudinary."
    />
  );
}
