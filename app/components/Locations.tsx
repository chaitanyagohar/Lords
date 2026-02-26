import Image from 'next/image';

const locations = [
  { name: 'Bengaluru', properties: 219, image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=300&q=80' },
  { name: 'Chennai', properties: 144, image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=300&q=80' },
  { name: 'Hyderabad', properties: 126, image: 'https://images.unsplash.com/photo-1578336987158-b3d953a77764?auto=format&fit=crop&w=300&q=80' },
  { name: 'Pune', properties: 1, image: 'https://images.unsplash.com/photo-1572445271230-a78b595ed588?auto=format&fit=crop&w=300&q=80' },
];

export default function Locations() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 mb-16">
      <div className="bg-vpsqft-dark text-white p-4 rounded-t-xl inline-block">
        <h3 className="text-xl font-bold px-4">Present in</h3>
      </div>
      <div className="bg-white p-6 rounded-b-xl rounded-tr-xl shadow-lg border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6">
        {locations.map((loc, idx) => (
          <div key={idx} className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition">
            <img src={loc.image} alt={loc.name} className="w-16 h-16 rounded-md object-cover" />
            <div>
              <h4 className="font-bold text-gray-900">{loc.name}</h4>
              <p className="text-sm text-gray-500">{loc.properties} properties</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}