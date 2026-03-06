"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/app/lib/supabase";
import { 
  UploadCloud, CheckCircle2, Loader2, Plus, Trash2, 
  ImageIcon, LogOut, Edit, Building, X 
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
  const [existingGalleryImages, setExistingGalleryImages] = useState<any[]>([]);
  const [galleryImagesToDelete, setGalleryImagesToDelete] = useState<number[]>([]);
  
  // Property Data
  const [formData, setFormData] = useState({
    title: "", slug: "", location: "", city: "Bengaluru", overview: "",
    bhk: "", size: "", starting_price: "", possession: "", possession_date: "",
    property_status: "Construction", units: "", total_floors: "", built_up_area: "", land_parcel: ""
  });
  
  // Pricing & Nested Data
  const [configs, setConfigs] = useState([{ unit_type: "", area_label: "", price: "Price on Request", is_custom: false }]);
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
  
// Automatically inject the Overview text once the form renders
  useEffect(() => {
    if (view === "form" && overviewRef.current) {
      overviewRef.current.innerHTML = formData.overview || "";
    }
  }, [view, editId]);

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
    setFormData({
      title: property.title || "", slug: property.slug || "", location: property.location || "", 
      city: property.city || "Bengaluru", overview: property.overview || "", bhk: property.bhk || "", 
      size: property.size || "", starting_price: property.starting_price || "", possession: property.possession || "", 
      possession_date: property.possession_date || "", property_status: property.property_status || "Construction", 
      units: property.units || "", total_floors: property.total_floors || "", built_up_area: property.built_up_area || "", 
      land_parcel: property.land_parcel || ""
    });
    
    // Set existing main & logo images
    setExistingMainImage(property.image && property.image !== "/default-property.jpg" ? property.image : "");
    setMainImage(null);
    setExistingPartnerLogo(property.partner_logo || "");
    setPartnerLogo(null);
    
    // Fetch and set existing gallery images
    const { data: galleryData } = await supabase.from("property_gallery").select("*").eq("property_id", property.id).order('display_order', { ascending: true });
    setExistingGalleryImages(galleryData || []);
    setGalleryImages([]);
    setGalleryImagesToDelete([]);
    
    // Inject existing overview HTML into the editable div
    if (overviewRef.current) {
      overviewRef.current.innerHTML = property.overview || "";
    }
    
    const { data: confData } = await supabase.from("property_configurations").select("*").eq("property_id", property.id);
    if (confData && confData.length > 0) {
      const mappedConfigs = confData.map(c => ({
        unit_type: c.unit_type,
        area_label: c.area_label,
        price: c.price,
        is_custom: c.price !== "Price on Request" && c.price !== "₹On Request*"
      }));
      setConfigs(mappedConfigs);
    } else {
      setConfigs([{ unit_type: "", area_label: "", price: "Price on Request", is_custom: false }]);
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
      possession: "", possession_date: "", property_status: "Construction", units: "", total_floors: "", 
      built_up_area: "", land_parcel: ""
    });
    if (overviewRef.current) overviewRef.current.innerHTML = "";
    
    setConfigs([{ unit_type: "", area_label: "", price: "Price on Request", is_custom: false }]);
    setLocations([{ distance_value: "", distance_unit: "km", title: "" }]);
    setSelectedAmenities([]);
    
    setMainImage(null);
    setExistingMainImage("");
    setPartnerLogo(null);
    setExistingPartnerLogo("");
    setGalleryImages([]);
    setExistingGalleryImages([]);
    setGalleryImagesToDelete([]);
    
    setIsEditMode(false);
    setEditId(null);
  };

  // ================= FORM HANDLERS =================
  const handleInputChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const generateSlug = () => {
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, slug });
  };

  const toggleAllAmenities = () => {
    if (selectedAmenities.length === AMENITIES_LIST.length) {
      setSelectedAmenities([]); 
    } else {
      setSelectedAmenities(AMENITIES_LIST.map(a => a.id)); 
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: "POST", body: fd });
    if (!res.ok) throw new Error("Failed to upload image");
    return (await res.json()).secure_url;
  };

  // Remove existing gallery image (adds to delete queue)
  const handleRemoveExistingGalleryImage = (id: number) => {
    setGalleryImagesToDelete(prev => [...prev, id]);
    setExistingGalleryImages(prev => prev.filter(img => img.id !== id));
  };

  // Remove newly selected gallery image
  const handleRemoveNewGalleryImage = (index: number) => {
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
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

      // 2. Grab final overview and price logic
      const finalOverview = overviewRef.current?.innerHTML || formData.overview;
      const finalStartingPrice = formData.starting_price?.trim() ? formData.starting_price : "Price on Request";

      // 3. Prep Payload
      const propertyPayload = {
        ...formData,
        overview: finalOverview,
        starting_price: finalStartingPrice,
        price: finalStartingPrice, 
        image: finalMainImageUrl || "/default-property.jpg", // Fallback if cleared
        partner_logo: finalPartnerLogoUrl || null, // Allow null if cleared
      };

      let propertyId = editId;

      // 4. Insert or Update Main Property
      if (isEditMode && editId) {
        await supabase.from("properties").update(propertyPayload).eq("id", editId);
        
        // Clean up nested arrays before re-inserting
        await supabase.from("property_configurations").delete().eq("property_id", editId);
        await supabase.from("property_location_advantages").delete().eq("property_id", editId);
        await supabase.from("property_amenities").delete().eq("property_id", editId);
        
        // Delete gallery images flagged for removal
        if (galleryImagesToDelete.length > 0) {
          await supabase.from("property_gallery").delete().in("id", galleryImagesToDelete);
        }
      } else {
        const { data: newProp, error } = await supabase.from("properties").insert(propertyPayload).select('id').single();
        if (error) throw error;
        propertyId = newProp.id;
      }

      // 5. Insert Nested Data
      // Determine the starting display order for new gallery images
      const nextDisplayOrder = existingGalleryImages.length > 0 
        ? Math.max(...existingGalleryImages.map(g => g.display_order || 0)) + 1 
        : 1;

      if (galleryImages.length > 0) {
        const galleryInserts = await Promise.all(galleryImages.map(async (file, i) => ({
          property_id: propertyId, image_url: await uploadToCloudinary(file), display_order: nextDisplayOrder + i
        })));
        await supabase.from("property_gallery").insert(galleryInserts);
      }
      
      if (configs[0].unit_type) {
        const cleanConfigs = configs.map((c, i) => ({
          property_id: propertyId,
          unit_type: c.unit_type,
          area_label: c.area_label,
          price: (c.is_custom && c.price.trim() !== "") ? c.price : "Price on Request",
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
          <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-white mb-6 mx-auto"><Building size={24} /></div>
          <h1 className="text-2xl font-bold text-center text-[#0F1A2A] mb-2">Agency Admin</h1>
          <p className="text-center text-gray-500 mb-8">Enter your password to access the dashboard</p>
          <input type="password" required value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Password" className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#2a2a2a] mb-4 text-center tracking-widest" />
          <button type="submit" className="w-full bg-[#F8FAFC] text-white py-3 rounded-lg font-semibold hover:bg-[#1a327a] transition-all">Login</button>
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
          <div className="w-8 h-8 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-white"><Building size={16} /></div>
          <span className="font-bold text-[#0F1A2A] text-lg tracking-tight">Admin Panel</span>
        </div>
        <div className="p-4 flex-grow">
          <button onClick={() => { setView("list"); resetForm(); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${view === "list" ? "bg-[#f4f7fb] text-[#2a2a2a]" : "text-gray-600 hover:bg-gray-50"}`}>
            <Building size={18} /> All Projects
          </button>
          <button onClick={() => { setView("form"); resetForm(); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mt-2 ${view === "form" ? "bg-[#f4f7fb] text-[#2a2a2a]" : "text-gray-600 hover:bg-gray-50"}`}>
            <Plus size={18} /> Add Project
          </button>
        </div>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors"><LogOut size={18} /> Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow overflow-y-auto p-8 h-full bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto">
          
          {/* ================= VIEW: LIST PROJECTS ================= */}
          {view === "list" && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#0F1A2A]">Your Projects</h1>
                  <p className="text-gray-500 mt-1">Manage and edit your real estate listings.</p>
                </div>
                <button onClick={() => { setView("form"); resetForm(); }} className="bg-[#2a2a2a] text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#6b6969]"><Plus size={18} /> Add New</button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {loadingData ? ( <div className="p-10 text-center text-gray-500 flex flex-col items-center gap-3"><Loader2 className="animate-spin text-[#2a2a2a]" size={24} /> Loading projects...</div> ) : properties.length === 0 ? ( <div className="p-10 text-center text-gray-500">No projects found. Add your first one!</div> ) : (
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
                          <td className="px-6 py-4 font-medium text-[#2a2a2a]">{p.starting_price}</td>
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
                  <h2 className="text-lg font-semibold text-[#2a2a2a] mb-4">1. Basic Details</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input required type="text" name="title" value={formData.title} onChange={handleInputChange} onBlur={generateSlug} className="w-full border rounded-lg px-3 py-2 outline-none focus:border-[#2a2a2a]" /></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label><input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none" /></div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input 
                        required 
                        type="text" 
                        name="city" 
                        value={formData.city} 
                        onChange={handleInputChange} 
                        placeholder="Type city..."
                        className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:border-[#2a2a2a]" 
                      />
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {['Bengaluru', 'Mumbai', 'Pune', 'Dubai', 'Hyderabad'].map(c => (
                          <span 
                            key={c} 
                            onClick={() => setFormData({...formData, city: c})}
                            className={`text-[11px] font-medium px-2.5 py-1 rounded cursor-pointer transition-colors ${
                              formData.city === c 
                                ? "bg-[#2a2a2a] text-white" 
                                : "bg-[#f4f7fb] text-[#2a2a2a] hover:bg-[#e2e8f0]"
                            }`}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location / Micro-market *</label>
                      <input 
                        required 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleInputChange} 
                        placeholder="e.g. Hennur Road" 
                        className="w-full border rounded-lg px-3 py-2 outline-none focus:border-[#2a2a2a]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overview (Rich Text)</label>
                    <p className="text-xs text-gray-500 mb-2">You can paste formatted text (bold, paragraphs) directly into this box.</p>
                    <div 
                      ref={overviewRef}
                      contentEditable 
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-[#2a2a2a] min-h-[120px] max-h-[300px] overflow-y-auto text-gray-700 bg-white"
                      onInput={(e) => setFormData({ ...formData, overview: e.currentTarget.innerHTML })}
                    />
                  </div>
                </section>

                <section className="bg-[#f8fafe] p-5 rounded-xl border border-blue-50">
                  <h2 className="text-lg font-semibold text-[#2a2a2a] mb-4">2. Specifications</h2>
                  <div className="grid md:grid-cols-4 gap-3 mb-3">
                    <div><label className="block text-xs font-medium text-gray-600">Units</label><input type="text" name="units" value={formData.units} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Floors</label><input type="text" name="total_floors" value={formData.total_floors} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Built Area</label><input type="text" name="built_up_area" value={formData.built_up_area} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Land</label><input type="text" name="land_parcel" value={formData.land_parcel} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3 mb-3">
                    <div><label className="block text-xs font-medium text-gray-600">Status</label><input type="text" name="property_status" value={formData.property_status} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Possession (Sidebar)</label><input type="text" name="possession_date" value={formData.possession_date} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">Possession (Slider)</label><input type="text" name="possession" value={formData.possession} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                    <div><label className="block text-xs font-medium text-gray-600">BHK</label><input type="text" name="bhk" value={formData.bhk} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-gray-600">Size (Slider)</label><input type="text" name="size" value={formData.size} onChange={handleInputChange} className="w-full border rounded px-2 py-1.5 text-sm outline-none" /></div>
                    <div>
                      <label className="block text-xs font-bold text-[#2a2a2a]">Starting Price</label>
                      <input 
                        type="text" 
                        name="starting_price" 
                        value={formData.starting_price} 
                        onChange={handleInputChange} 
                        placeholder="e.g. ₹ 90 Lacs* (Leave empty for Request)" 
                        className="w-full border-2 border-[#2a2a2a]/30 rounded px-2 py-1.5 text-sm outline-none" 
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex justify-between mb-3">
                    <h2 className="text-lg font-semibold text-[#2a2a2a]">3. Pricing Tiers</h2>
                    <button type="button" onClick={() => setConfigs([...configs, { unit_type: "", area_label: "", price: "Price on Request", is_custom: false }])} className="text-sm text-[#2a2a2a] font-medium">+ Add Row</button>
                  </div>
                  {configs.map((c, i) => (
                    <div key={i} className="flex gap-2 mb-2 items-start">
                      <input className="flex-1 border rounded px-2 py-1.5 text-sm outline-none" placeholder="Type (e.g. 3 BHK)" value={c.unit_type} onChange={e => { const n = [...configs]; n[i].unit_type = e.target.value; setConfigs(n); }} />
                      <input className="w-32 border rounded px-2 py-1.5 text-sm outline-none" placeholder="Area" value={c.area_label} onChange={e => { const n = [...configs]; n[i].area_label = e.target.value; setConfigs(n); }} />
                      
                      <select 
                        value={c.is_custom ? "custom" : "on_request"} 
                        onChange={(e) => {
                          const isCustom = e.target.value === "custom";
                          const newC = [...configs];
                          newC[i].is_custom = isCustom;
                          newC[i].price = isCustom ? "" : "Price on Request";
                          setConfigs(newC);
                        }}
                        className="w-40 border rounded px-2 py-1.5 text-sm bg-white outline-none"
                      >
                        <option value="on_request">Price on Request</option>
                        <option value="custom">Custom Price</option>
                      </select>

                      {c.is_custom && (
                        <input className="w-32 border-2 border-[#2a2a2a]/30 rounded px-2 py-1.5 text-sm outline-none" placeholder="e.g. ₹ 1.5 Cr*" value={c.price} onChange={e => { const n = [...configs]; n[i].price = e.target.value; setConfigs(n); }} />
                      )}

                      <button type="button" onClick={() => setConfigs(configs.filter((_, idx) => idx !== i))} className="text-red-400 p-1.5 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                    </div>
                  ))}
                </section>

                <section>
                  <div className="flex justify-between mb-3"><h2 className="text-lg font-semibold text-[#2a2a2a]">4. Locations</h2><button type="button" onClick={() => setLocations([...locations, { distance_value: "", distance_unit: "km", title: "" }])} className="text-sm text-[#2a2a2a] font-medium">+ Add Loc</button></div>
                  {locations.map((loc, i) => (
                    <div key={i} className="flex gap-2 mb-2"><input className="w-16 border rounded px-2 py-1.5 text-sm outline-none" placeholder="Dist" value={loc.distance_value} onChange={e => { const n = [...locations]; n[i].distance_value = e.target.value; setLocations(n); }} /><select className="border rounded px-2 text-sm bg-white outline-none" value={loc.distance_unit} onChange={e => { const n = [...locations]; n[i].distance_unit = e.target.value; setLocations(n); }}><option value="km">km</option><option value="min">min</option></select><input className="flex-1 border rounded px-2 py-1.5 text-sm outline-none" placeholder="Place" value={loc.title} onChange={e => { const n = [...locations]; n[i].title = e.target.value; setLocations(n); }} /><button type="button" onClick={() => setLocations(locations.filter((_, idx) => idx !== i))} className="text-red-400 p-1.5 hover:text-red-600 transition-colors"><Trash2 size={16}/></button></div>
                  ))}
                </section>

                <section>
                  <div className="flex justify-between items-end mb-3">
                    <h2 className="text-lg font-semibold text-[#2a2a2a]">5. Amenities</h2>
                    <button type="button" onClick={toggleAllAmenities} className="text-sm text-[#2a2a2a] font-medium hover:underline">
                      {selectedAmenities.length === AMENITIES_LIST.length ? "Deselect All" : "Select All"}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {AMENITIES_LIST.map(a => (
                      <label key={a.id} className="flex items-center gap-2 p-2 border rounded cursor-pointer text-sm hover:bg-gray-50"><input type="checkbox" checked={selectedAmenities.includes(a.id)} onChange={() => setSelectedAmenities(prev => prev.includes(a.id) ? prev.filter(id => id !== a.id) : [...prev, a.id])} className="w-3.5 h-3.5" />{a.name}</label>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-[#2a2a2a] mb-3">6. Images (Cloudinary)</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Main Cover Image */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Main Cover Image</p>
                      <div className="border-2 border-dashed border-[#2a2a2a]/40 rounded-lg p-4 bg-[#f8fafe] flex flex-col items-center justify-center relative h-48 group">
                        {mainImage ? (
                          <>
                            <img src={URL.createObjectURL(mainImage)} className="absolute inset-0 w-full h-full object-cover rounded-md" />
                            <button type="button" onClick={() => setMainImage(null)} className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md z-20 hover:bg-red-50"><Trash2 size={16}/></button>
                          </>
                        ) : existingMainImage ? (
                          <>
                            <img src={existingMainImage} className="absolute inset-0 w-full h-full object-cover rounded-md opacity-90" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                <button type="button" onClick={() => setExistingMainImage("")} className="bg-white text-red-500 px-3 py-1.5 rounded-md font-medium shadow flex items-center gap-2"><Trash2 size={16}/> Remove</button>
                            </div>
                          </>
                        ) : (
                          <>
                            <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <ImageIcon size={32} className="text-[#2a2a2a] mb-2" />
                            <p className="text-sm font-medium text-[#2a2a2a]">Click to upload Cover</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Partner Logo */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Partner Logo</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center relative h-48 group">
                        {partnerLogo ? (
                          <>
                            <img src={URL.createObjectURL(partnerLogo)} className="absolute inset-0 w-full h-full object-contain p-4 rounded-md" />
                            <button type="button" onClick={() => setPartnerLogo(null)} className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-md z-20 hover:bg-red-50"><Trash2 size={16}/></button>
                          </>
                        ) : existingPartnerLogo ? (
                          <>
                            <img src={existingPartnerLogo} className="absolute inset-0 w-full h-full object-contain p-4 rounded-md opacity-90" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                <button type="button" onClick={() => setExistingPartnerLogo("")} className="bg-white text-red-500 px-3 py-1.5 rounded-md font-medium shadow flex items-center gap-2"><Trash2 size={16}/> Remove</button>
                            </div>
                          </>
                        ) : (
                          <>
                            <input type="file" accept="image/*" onChange={(e) => setPartnerLogo(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <UploadCloud size={32} className="text-gray-400 mb-2" />
                            <p className="text-sm font-medium text-gray-500">Click to upload Logo</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Gallery Section */}
                  <div>
                     <p className="text-sm font-medium text-gray-700 mb-2">Property Gallery (Upload multiple)</p>
                     
                     {/* Existing Gallery Grid */}
                     {existingGalleryImages.length > 0 && (
                       <div className="mb-4">
                         <p className="text-xs text-gray-500 mb-2 font-medium">Currently Saved Images</p>
                         <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                            {existingGalleryImages.map((img) => (
                              <div key={img.id} className="relative aspect-square rounded-md overflow-hidden border shadow-sm group">
                                <img src={img.image_url} alt="Gallery" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => handleRemoveExistingGalleryImage(img.id)} className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><X size={14}/></button>
                              </div>
                            ))}
                         </div>
                       </div>
                     )}

                     {/* Newly Selected Gallery Grid */}
                     {galleryImages.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-blue-500 mb-2 font-medium">New Images to Upload</p>
                          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                            {galleryImages.map((file, index) => (
                              <div key={index} className="relative aspect-square rounded-md overflow-hidden border-2 border-blue-200 shadow-sm group">
                                <img src={URL.createObjectURL(file)} alt="New Gallery" className="w-full h-full object-cover" />
                                <button type="button" onClick={() => handleRemoveNewGalleryImage(index)} className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"><X size={14}/></button>
                              </div>
                            ))}
                          </div>
                        </div>
                     )}

                     {/* Gallery Upload Dropzone */}
                     <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center relative h-24 hover:bg-gray-100 transition-colors">
                        <input type="file" accept="image/*" multiple onChange={(e) => setGalleryImages(prev => [...prev, ...Array.from(e.target.files || [])])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <UploadCloud size={24} className="text-gray-400 mb-1" />
                        <p className="text-sm font-medium text-gray-500">Click or drag to add more gallery images</p>
                     </div>
                  </div>
                </section>

                <div className="pt-4 border-t flex justify-end gap-3">
                  <button type="button" onClick={() => { setView("list"); resetForm(); }} className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" disabled={loadingSubmit} className="bg-[#2a2a2a] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#393939] disabled:opacity-70 flex items-center gap-2 transition-all">
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