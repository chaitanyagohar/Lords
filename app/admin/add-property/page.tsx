"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/app/lib/supabase";
import { 
  UploadCloud, CheckCircle2, Loader2, Plus, Trash2, 
  ImageIcon, LogOut, Edit, MapPin, Building 
} from "lucide-react";

// ==========================================
// CONFIGURATION
// ==========================================
const ADMIN_PASSWORD = "admin"; // CHANGE THIS!
const CLOUDINARY_CLOUD_NAME = "dov06akb0"; 
const CLOUDINARY_UPLOAD_PRESET = "valuepersqft_uploads";

const AMENITIES_LIST = [
  { id: 1, name: "Gymnasium" }, { id: 2, name: "Clubhouse" }, { id: 3, name: "Swimming Pool" },
  { id: 4, name: "Jogging Track" }, { id: 5, name: "Aerobics, Yoga Area" }, { id: 6, name: "Multipurpose Party Area" },
  { id: 7, name: "Multiple Sports Courts" }, { id: 8, name: "Extensive Gardens" }, { id: 9, name: "Kids Play Area, Creche" },
  { id: 10, name: "Indoor Games Arena" }, { id: 11, name: "Mini Theatre" }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [view, setView] = useState<"list" | "form">("list");
  const [properties, setProperties] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Form States
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formError, setFormError] = useState("");
  
  // Image States
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [existingMainImage, setExistingMainImage] = useState("");
  
  const [partnerLogo, setPartnerLogo] = useState<File | null>(null);
  const [existingPartnerLogo, setExistingPartnerLogo] = useState("");
  
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  
  // Property Data
  const [formData, setFormData] = useState({
    title: "", slug: "", location: "", city: "Bengaluru", overview: "",
    bhk: "", size: "", starting_price: "", possession: "", possession_date: "",
    property_status: "Pre Launch", units: "", total_floors: "", built_up_area: "", land_parcel: ""
  });
  
  // Pricing & Nested Data (Added is_custom flag for the dropdown)
  const [configs, setConfigs] = useState([{ unit_type: "", area_label: "", price: "₹On Request*", is_custom: false }]);
  const [locations, setLocations] = useState([{ distance_value: "", distance_unit: "km", title: "" }]);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);

  // Ref for the rich text editor
  const overviewRef = useRef<HTMLDivElement>(null);

  // ================= AUTH & INIT =================
  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchProperties();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      fetchProperties();
    } else {
      alert("Incorrect Password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  // ================= FETCH PROPERTIES =================
  const fetchProperties = async () => {
    setLoadingData(true);
    const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    setProperties(data || []);
    setLoadingData(false);
  };

  // ================= DELETE PROPERTY =================
  const handleDelete = async (id: number, title: string) => {
    if (window.confirm(`Are you sure you want to completely delete "${title}"? This cannot be undone.`)) {
      await supabase.from("properties").delete().eq("id", id);
      fetchProperties();
    }
  };

  // ================= EDIT PREPARATION =================
  const handleEditClick = async (property: any) => {
    // 1. Set Main Data
    setFormData({
      title: property.title || "", slug: property.slug || "", location: property.location || "", 
      city: property.city || "Bengaluru", overview: property.overview || "", bhk: property.bhk || "", 
      size: property.size || "", starting_price: property.starting_price || "", possession: property.possession || "", 
      possession_date: property.possession_date || "", property_status: property.property_status || "Pre Launch", 
      units: property.units || "", total_floors: property.total_floors || "", built_up_area: property.built_up_area || "", 
      land_parcel: property.land_parcel || ""
    });
    
    // Set Images
    setExistingMainImage(property.image || "");
    setMainImage(null);
    setExistingPartnerLogo(property.partner_logo || "");
    setPartnerLogo(null);
    setGalleryImages([]);
    
    // Set Rich Text Content
    if (overviewRef.current) {
      overviewRef.current.innerHTML = property.overview || "";
    }
    
    // 2. Fetch Nested Data
    const { data: confData } = await supabase.from("property_configurations").select("*").eq("property_id", property.id);
    if (confData && confData.length > 0) {
      const mappedConfigs = confData.map(c => ({
        unit_type: c.unit_type,
        area_label: c.area_label,
        price: c.price,
        is_custom: c.price !== "₹On Request*"
      }));
      setConfigs(mappedConfigs);
    } else {
      setConfigs([{ unit_type: "", area_label: "", price: "₹On Request*", is_custom: false }]);
    }

    const { data: locData } = await supabase.from("property_location_advantages").select("*").eq("property_id", property.id);
    setLocations(locData && locData.length > 0 ? locData : [{ distance_value: "", distance_unit: "km", title: "" }]);

    const { data: amenData } = await supabase.from("property_amenities").select("amenity_id").eq("property_id", property.id);
    setSelectedAmenities(amenData ? amenData.map(a => a.amenity_id) : []);

    setIsEditMode(true);
    setEditId(property.id);
    setView("form");
  };

  const resetForm = () => {
    setFormData({
      title: "", slug: "", location: "", city: "Bengaluru", overview: "", bhk: "", size: "", starting_price: "", 
      possession: "", possession_date: "", property_status: "Pre Launch", units: "", total_floors: "", 
      built_up_area: "", land_parcel: ""
    });
    if (overviewRef.current) overviewRef.current.innerHTML = "";
    
    setConfigs([{ unit_type: "", area_label: "", price: "₹On Request*", is_custom: false }]);
    setLocations([{ distance_value: "", distance_unit: "km", title: "" }]);
    setSelectedAmenities([]);
    
    setMainImage(null);
    setExistingMainImage("");
    setPartnerLogo(null);
    setExistingPartnerLogo("");
    setGalleryImages([]);
    
    setIsEditMode(false);
    setEditId(null);
  };

  // ================= FORM HANDLERS =================
  const handleInputChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const generateSlug = () => {
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, slug });
  };

  const uploadToCloudinary = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Failed to upload image");
    return (await res.json()).secure_url;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true); setFormError("");

    try {
      // 1. Upload Images
      let finalMainImageUrl = existingMainImage;
      if (mainImage) finalMainImageUrl = await uploadToCloudinary(mainImage);
      
      let finalPartnerLogoUrl = existingPartnerLogo;
      if (partnerLogo) finalPartnerLogoUrl = await uploadToCloudinary(partnerLogo);

      // 2. Prep Payload
      const propertyPayload = {
        ...formData,
        price: formData.starting_price,
        image: finalMainImageUrl || "/default-property.jpg",
        partner_logo: finalPartnerLogoUrl || null,
      };

      let propertyId = editId;

      // 3. Insert or Update Main Property
      if (isEditMode && editId) {
        await supabase.from("properties").update(propertyPayload).eq("id", editId);
        
        await supabase.from("property_configurations").delete().eq("property_id", editId);
        await supabase.from("property_location_advantages").delete().eq("property_id", editId);
        await supabase.from("property_amenities").delete().eq("property_id", editId);
      } else {
        const { data: newProp, error } = await supabase.from("properties").insert(propertyPayload).select('id').single();
        if (error) throw error;
        propertyId = newProp.id;
      }

      // 4. Insert Nested Data
      if (galleryImages.length > 0) {
        const galleryInserts = await Promise.all(galleryImages.map(async (file, i) => ({
          property_id: propertyId, image_url: await uploadToCloudinary(file), display_order: i + 1
        })));
        await supabase.from("property_gallery").insert(galleryInserts);
      }
      
      if (configs[0].unit_type) {
        const cleanConfigs = configs.map((c, i) => ({
          property_id: propertyId,
          unit_type: c.unit_type,
          area_label: c.area_label,
          price: c.price,
          display_order: i + 1
        }));
        await supabase.from("property_configurations").insert(cleanConfigs);
      }
      
      if (locations[0].title) {
        await supabase.from("property_location_advantages").insert(locations.map((l, i) => ({ ...l, property_id: propertyId, display_order: i + 1 })));
      }
      
      if (selectedAmenities.length > 0) {
        await supabase.from("property_amenities").insert(selectedAmenities.map(id => ({ property_id: propertyId, amenity_id: id })));
      }

      await fetchProperties();
      setView("list");
      resetForm();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ================= UI: LOGIN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center p-4 fixed inset-0 z-[100]">
        <style>{`body > header, body > footer, #global-footer { display: none !important; }`}</style>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="w-12 h-12 bg-[#21409A] rounded-xl flex items-center justify-center text-white mb-6 mx-auto"><Building size={24} /></div>
          <h1 className="text-2xl font-bold text-center text-[#0F1A2A] mb-2">Agency Admin</h1>
          <p className="text-center text-gray-500 mb-8">Enter your password to access the dashboard</p>
          <input type="password" required value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#21409A] mb-4 text-center tracking-widest" />
          <button type="submit" className="w-full bg-[#21409A] text-white py-3 rounded-lg font-semibold hover:bg-[#1a327a] transition-all">Login</button>
        </form>
      </div>
    );
  }

  // ================= UI: DASHBOARD =================
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex fixed inset-0 z-[100] overflow-hidden">
      <style>{`body > header, body > footer, #global-footer { display: none !important; }`}</style>
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#21409A] rounded-lg flex items-center justify-center text-white"><Building size={16} /></div>
          <span className="font-bold text-[#0F1A2A] text-lg tracking-tight">Admin Panel</span>
        </div>
        <div className="p-4 flex-grow">
          <button onClick={() => { setView("list"); resetForm(); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${view === "list" ? "bg-[#f4f7fb] text-[#21409A]" : "text-gray-600 hover:bg-gray-50"}`}>
            <Building size={18} /> All Projects
          </button>
          <button onClick={() => { setView("form"); resetForm(); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mt-2 ${view === "form" ? "bg-[#f4f7fb] text-[#21409A]" : "text-gray-600 hover:bg-gray-50"}`}>
            <Plus size={18} /> Add Project
          </button>
        </div>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors"><LogOut size={18} /> Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow overflow-y-auto p-8 h-full bg-[#fcfdfd]">
        <div className="max-w-5xl mx-auto">
          
          {/* ================= VIEW: LIST PROJECTS ================= */}
          {view === "list" && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#0F1A2A]">Your Projects</h1>
                  <p className="text-gray-500 mt-1">Manage and edit your real estate listings.</p>
                </div>
                <button onClick={() => { setView("form"); resetForm(); }} className="bg-[#21409A] text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#1a327a]"><Plus size={18} /> Add New</button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {loadingData ? ( <div className="p-10 text-center text-gray-500 flex flex-col items-center gap-3"><Loader2 className="animate-spin text-[#21409A]" size={24} /> Loading projects...</div> ) : properties.length === 0 ? ( <div className="p-10 text-center text-gray-500">No projects found. Add your first one!</div> ) : (
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                      <tr><th className="px-6 py-4 font-medium">Project</th><th className="px-6 py-4 font-medium">Location</th><th className="px-6 py-4 font-medium">Price</th><th className="px-6 py-4 font-medium text-right">Actions</th></tr>
                    </thead>
                    <tbody>
                      {properties.map((p) => (
                        <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 flex items-center gap-4">
                            <img src={p.image || "/default-property.jpg"} alt="" className="w-14 h-10 object-cover rounded-md border border-gray-200" />
                            <span className="font-semibold text-[#0F1A2A]">{p.title}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{p.location}, {p.city}</td>
                          <td className="px-6 py-4 font-medium text-[#21409A]">{p.starting_price}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button onClick={() => handleEditClick(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"><Edit size={16} /></button>
                              <button onClick={() => handleDelete(p.id, p.title)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ================= VIEW: ADD / EDIT FORM ================= */}
          {view === "form" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-20 animate-fade-in">
              <div className="mb-8 border-b pb-5">
                <h1 className="text-2xl font-bold text-[#0F1A2A]">{isEditMode ? `Edit Project: ${formData.title}` : "Add New Project"}</h1>
              </div>
              
              {formError && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{formError}</div>}

              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <section>
                  <h2 className="text-lg font-semibold text-[#21409A] mb-4">1. Basic Details</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input required type="text" name="title" value={formData.title} onChange={handleInputChange} onBlur={generateSlug} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-[#21409A]" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label><input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none" /></div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">City *</label><select name="city" value={formData.city} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 bg-white outline-none"><option value="Bengaluru">Bengaluru</option><option value="Mumbai">Mumbai</option><option value="Pune">Pune</option><option value="Dubai">Dubai</option></select></div>
                    <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Location *</label><input required type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-[#21409A]" /></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overview (Rich Text)</label>
                    <p className="text-xs text-gray-500 mb-2">You can paste formatted text (bold, paragraphs) directly into this box.</p>
                    <div 
                      ref={overviewRef}
                      contentEditable 
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#21409A] min-h-[120px] max-h-[300px] overflow-y-auto text-gray-700"
                      onBlur={(e) => setFormData({ ...formData, overview: e.currentTarget.innerHTML })}
                    />
                  </div>
                </section>

                <section className="bg-[#f8fafe] p-5 rounded-xl border border-blue-50">
                  <h2 className="text-lg font-semibold text-[#21409A] mb-4">2. Specifications</h2>
                  <div className="grid md:grid-cols-4 gap-3 mb-3">
                    <div><label className="block text-xs font-medium text-gray-600">Units</label><input type="text" name="units" value={formData.units} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Floors</label><input type="text" name="total_floors" value={formData.total_floors} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Built Area</label><input type="text" name="built_up_area" value={formData.built_up_area} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Land</label><input type="text" name="land_parcel" value={formData.land_parcel} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3 mb-3">
                    <div><label className="block text-xs font-medium text-gray-600">Status</label><input type="text" name="property_status" value={formData.property_status} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Possession (Sidebar)</label><input type="text" name="possession_date" value={formData.possession_date} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Possession (Slider)</label><input type="text" name="possession" value={formData.possession} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">BHK</label><input type="text" name="bhk" value={formData.bhk} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-gray-600">Size (Slider)</label><input type="text" name="size" value={formData.size} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm" /></div>
                    <div><label className="block text-xs font-bold text-[#21409A]">Starting Price *</label><input required type="text" name="starting_price" value={formData.starting_price} onChange={handleInputChange} className="w-full border-2 border-[#21409A]/30 rounded px-2 py-1.5 text-sm" /></div>
                  </div>
                </section>

                <section>
                  <div className="flex justify-between mb-3">
                    <h2 className="text-lg font-semibold text-[#21409A]">3. Pricing Tiers</h2>
                    <button type="button" onClick={() => setConfigs([...configs, { unit_type: "", area_label: "", price: "₹On Request*", is_custom: false }])} className="text-sm text-[#21409A] font-medium">+ Add Row</button>
                  </div>
                  {configs.map((c, i) => (
                    <div key={i} className="flex gap-2 mb-2 items-start">
                      <input className="flex-1 border rounded px-2 py-1.5 text-sm" placeholder="Type (e.g. 3 BHK)" value={c.unit_type} onChange={e => { const n = [...configs]; n[i].unit_type = e.target.value; setConfigs(n); }} />
                      <input className="w-32 border rounded px-2 py-1.5 text-sm" placeholder="Area" value={c.area_label} onChange={e => { const n = [...configs]; n[i].area_label = e.target.value; setConfigs(n); }} />
                      
                      {/* Pricing Mode Toggle */}
                      <select 
                        value={c.is_custom ? "custom" : "on_request"} 
                        onChange={(e) => {
                          const isCustom = e.target.value === "custom";
                          const newC = [...configs];
                          newC[i].is_custom = isCustom;
                          newC[i].price = isCustom ? "" : "₹On Request*";
                          setConfigs(newC);
                        }}
                        className="w-40 border rounded px-2 py-1.5 text-sm bg-white outline-none"
                      >
                        <option value="on_request">₹On Request*</option>
                        <option value="custom">Custom Price</option>
                      </select>

                      {c.is_custom && (
                        <input className="w-32 border-2 border-[#21409A]/30 rounded px-2 py-1.5 text-sm outline-none" placeholder="e.g. ₹ 1.5 Cr*" value={c.price} onChange={e => { const n = [...configs]; n[i].price = e.target.value; setConfigs(n); }} />
                      )}

                      <button type="button" onClick={() => setConfigs(configs.filter((_, idx) => idx !== i))} className="text-red-400 p-1.5"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </section>

                <section>
                  <div className="flex justify-between mb-3"><h2 className="text-lg font-semibold text-[#21409A]">4. Locations</h2><button type="button" onClick={() => setLocations([...locations, { distance_value: "", distance_unit: "km", title: "" }])} className="text-sm text-[#21409A] font-medium">+ Add Loc</button></div>
                  {locations.map((loc, i) => (
                    <div key={i} className="flex gap-2 mb-2"><input className="w-16 border rounded px-2 py-1.5 text-sm" placeholder="Dist" value={loc.distance_value} onChange={e => { const n = [...locations]; n[i].distance_value = e.target.value; setLocations(n); }} /><select className="border rounded px-2 text-sm bg-white" value={loc.distance_unit} onChange={e => { const n = [...locations]; n[i].distance_unit = e.target.value; setLocations(n); }}><option value="km">km</option><option value="min">min</option></select><input className="flex-1 border rounded px-2 py-1.5 text-sm" placeholder="Place" value={loc.title} onChange={e => { const n = [...locations]; n[i].title = e.target.value; setLocations(n); }} /><button type="button" onClick={() => setLocations(locations.filter((_, idx) => idx !== i))} className="text-red-400"><Trash2 size={16}/></button></div>
                  ))}
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-[#21409A] mb-3">5. Amenities</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {AMENITIES_LIST.map(a => (
                      <label key={a.id} className="flex items-center gap-2 p-2 border rounded cursor-pointer text-sm hover:bg-gray-50"><input type="checkbox" checked={selectedAmenities.includes(a.id)} onChange={() => setSelectedAmenities(prev => prev.includes(a.id) ? prev.filter(id => id !== a.id) : [...prev, a.id])} className="w-3.5 h-3.5" />{a.name}</label>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-[#21409A] mb-3">6. Images (Cloudinary)</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    
                    {/* Main Image */}
                    <div className="border-2 border-dashed border-[#21409A]/40 rounded-lg p-4 bg-[#f8fafe] flex flex-col items-center justify-center relative h-32 overflow-hidden">
                      <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      {mainImage ? <p className="text-xs font-medium text-[#21409A] text-center">{mainImage.name}</p> : existingMainImage ? <img src={existingMainImage} className="absolute inset-0 w-full h-full object-cover opacity-50" /> : <><ImageIcon size={24} className="text-[#21409A] mb-1" /><p className="text-xs font-medium text-[#21409A]">Main Cover Image</p></>}
                    </div>

                    {/* Partner Logo */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center relative h-32 overflow-hidden">
                      <input type="file" accept="image/*" onChange={(e) => setPartnerLogo(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      {partnerLogo ? <p className="text-xs font-medium text-gray-700 text-center">{partnerLogo.name}</p> : existingPartnerLogo ? <img src={existingPartnerLogo} className="absolute inset-0 w-full h-full object-contain p-2 opacity-50" /> : <><UploadCloud size={24} className="text-gray-400 mb-1" /><p className="text-xs font-medium text-gray-500">Partner Logo</p></>}
                    </div>

                    {/* Gallery Images */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center relative h-32">
                      <input type="file" accept="image/*" multiple onChange={(e) => setGalleryImages(Array.from(e.target.files || []))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      {galleryImages.length > 0 ? <p className="text-sm font-medium">{galleryImages.length} Gallery Selected</p> : <><UploadCloud size={24} className="text-gray-400 mb-1" /><p className="text-xs font-medium text-gray-500">Gallery (Appends)</p></>}
                    </div>

                  </div>
                </section>

                <div className="pt-4 border-t flex justify-end gap-3">
                  <button type="button" onClick={() => { setView("list"); resetForm(); }} className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={loadingSubmit} className="bg-[#21409A] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1a327a] disabled:opacity-70 flex items-center gap-2">
                    {loadingSubmit ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />} {isEditMode ? "Update Project" : "Publish Project"}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}