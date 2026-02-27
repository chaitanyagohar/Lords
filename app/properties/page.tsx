import Link from "next/link";
import { supabase } from "@/app/lib/supabase";

export default async function PropertiesPage() {
  const { data: properties } = await supabase
    .from("properties")
    .select("id, title, slug, city, location, image")
    .order("created_at", { ascending: false });

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-semibold mb-12">All Properties</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {properties?.map((property) => (
          <Link
            key={property.id}
            href={`/properties/${property.slug}`}
            className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
          >
            <div className="h-56 overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {property.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {property.location}, {property.city}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}