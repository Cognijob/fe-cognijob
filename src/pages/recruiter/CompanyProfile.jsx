import React, { useState } from "react";
import { Upload, Star, X, ChevronDown } from "lucide-react";
import PencilIcon from "../../assets/DashboardPages/PencilIcon.png";

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // --- DATA MOCK (Tersimpan di Database) ---
  const [savedData, setSavedData] = useState({
    name: "TechCogni Indonesia",
    tagline: "Building the future of fintech in Indonesia",
    industry: "Financial Technology",
    size: "51-200 Karyawan",
    location: "Jakarta, Indonesia",
    founded: "Est. 2019",
    description: "TechCogni adalah startup fintech yang berfokus pada solusi pembayaran digital dan pinjaman berbasis AI untuk pasar Indonesia.\n\nDidirikan tahun 2019, kami telah melayani lebih dari 2 juta pengguna aktif dan terus tumbuh bersama tim yang berdedikasi.",
    values: ["Inklusif", "Inovatif", "Kolaboratif"],
    rating: 4.0,
    reviewsCount: 18,
  });

  // --- STATE UNTUK DRAFT EDIT & UPLOAD ---
  const [formData, setFormData] = useState({ ...savedData });
  const [newValueInput, setNewValueInput] = useState("");
  const [logoPreview, setLogoPreview] = useState(null); // Menyimpan URL preview gambar lokal

  // --- HANDLERS ---
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Handler Upload Foto
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi maks 2MB
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran file logo maksimal 2MB!");
        return;
      }
      // Membuat URL temporary untuk preview gambar
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  // Handler Nilai Perusahaan (Tag)
  const handleAddValue = (e) => {
    if (e.key === "Enter" && newValueInput.trim() !== "") {
      e.preventDefault();
      if (!formData.values.includes(newValueInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          values: [...prev.values, newValueInput.trim()],
        }));
      }
      setNewValueInput("");
    }
  };

  const handleRemoveValue = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Validasi Form Wajib
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama perusahaan wajib diisi.";
    if (!formData.description.trim()) newErrors.description = "Deskripsi wajib diisi.";
    if (!formData.industry.trim()) newErrors.industry = "Industri wajib diisi.";
    if (!formData.size.trim() || formData.size === "") newErrors.size = "Ukuran perusahaan wajib dipilih.";
    if (!formData.location.trim()) newErrors.location = "Lokasi wajib diisi.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setSavedData({ ...formData });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...savedData }); 
    setNewValueInput("");
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in font-poppins">
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* --- MODE EDIT --- */}
        {isEditing ? (
          <>
            {/* Header Halaman Edit */}
            <div className="mb-6">
              <h1 className="text-[24px] font-bold text-[#0B173D]">Edit Profil Perusahaan</h1>
              <p className="text-[15px] text-[#0B173D]/80 mt-1">Perbarui profil perusahaan.</p>
            </div>

            {/* Container Form Edit */}
            <div className="bg-[#EEEDF8] rounded-[24px] border border-black/5 shadow-sm p-8 w-full max-w-[800px] mx-auto mb-8">
              
              {/* Logo Section */}
              <h3 className="text-[16px] font-bold text-[#0B173D] mb-3">Logo Perusahaan</h3>
              <div className="flex gap-6 mb-8">
                {/* Area Upload */}
                <div className="flex-1 bg-white rounded-2xl border-2 border-dashed border-[#B9C4E5] flex flex-col items-center justify-center py-8 relative hover:bg-gray-50 transition-colors">
                  {/* Input file yang transparan menutupi seluruh area kotak */}
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg"
                    onChange={handleLogoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-12 h-12 bg-[#E9EBF8] text-[#6B5BAE] flex items-center justify-center rounded-full mb-3 pointer-events-none">
                    <Upload size={20} />
                  </div>
                  <p className="text-[14px] font-bold text-[#0B173D] pointer-events-none">Seret file ke sini</p>
                  <p className="text-[12px] text-gray-400 mb-3 pointer-events-none">atau</p>
                  <button className="px-5 py-1.5 bg-white border border-black/20 rounded-full text-[13px] font-semibold text-[#0B173D] pointer-events-none">
                    Pilih file
                  </button>
                  <p className="text-[10px] text-gray-400 mt-3 pointer-events-none">PNG/JPG - maks 2 MB</p>
                </div>
                
                {/* Area Preview */}
                <div className="w-[140px] shrink-0 flex flex-col items-center gap-2 pt-2">
                  <div className="w-[120px] h-[120px] bg-[#6B5BAE] rounded-2xl flex items-center justify-center text-white text-[42px] font-bold shadow-sm overflow-hidden">
                    {/* Jika ada preview gambar, tampilkan gambar. Jika tidak, tampilkan huruf depan */}
                    {logoPreview ? (
                      <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      formData.name ? formData.name.charAt(0).toUpperCase() : "TC"
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium">Preview saat ini</p>
                </div>
              </div>

              {/* Informasi Perusahaan Form */}
              <h3 className="text-[16px] font-bold text-[#0B173D] mb-4">Informasi Perusahaan</h3>
              <div className="flex flex-col gap-4">
                
                {/* Nama Perusahaan */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#0B173D]">Nama Perusahaan</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full bg-white rounded-xl px-4 py-3 text-[14px] font-medium text-[#111C2D] outline-none transition-shadow shadow-sm ${errors.name ? 'border border-red-500 focus:ring-2 focus:ring-red-200' : 'border border-black/5 focus:ring-2 focus:ring-[#1D42AC]/30'}`}
                  />
                  {errors.name && <p className="text-red-500 text-[11px] mt-0.5">{errors.name}</p>}
                </div>

                {/* Tagline */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#0B173D]">Tagline <span className="text-gray-400 font-normal ml-1">(Opsional)</span></label>
                  <input 
                    type="text" 
                    value={formData.tagline}
                    onChange={(e) => handleChange("tagline", e.target.value)}
                    className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 text-[14px] font-medium text-[#111C2D] outline-none focus:ring-2 focus:ring-[#1D42AC]/30 shadow-sm"
                  />
                </div>

                {/* Industri & Ukuran */}
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#0B173D]">Industri</label>
                    <input 
                      type="text" 
                      value={formData.industry}
                      onChange={(e) => handleChange("industry", e.target.value)}
                      className={`w-full bg-white rounded-xl px-4 py-3 text-[14px] font-medium text-[#111C2D] outline-none transition-shadow shadow-sm ${errors.industry ? 'border border-red-500 focus:ring-2 focus:ring-red-200' : 'border border-black/5 focus:ring-2 focus:ring-[#1D42AC]/30'}`}
                    />
                    {errors.industry && <p className="text-red-500 text-[11px] mt-0.5">{errors.industry}</p>}
                  </div>

                  {/* UKURAN PERUSAHAAN DIUBAH MENJADI DROPDOWN */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[#0B173D]">Ukuran Perusahaan</label>
                    <div className="relative">
                      <select 
                        value={formData.size}
                        onChange={(e) => handleChange("size", e.target.value)}
                        className={`w-full bg-white rounded-xl px-4 py-3 text-[14px] font-medium text-[#111C2D] outline-none transition-shadow shadow-sm appearance-none cursor-pointer ${errors.size ? 'border border-red-500 focus:ring-2 focus:ring-red-200' : 'border border-black/5 focus:ring-2 focus:ring-[#1D42AC]/30'}`}
                      >
                        <option value="" disabled>Pilih Ukuran</option>
                        <option value="1-10 Karyawan">1-10 Karyawan</option>
                        <option value="11-50 Karyawan">11-50 Karyawan</option>
                        <option value="51-200 Karyawan">51-200 Karyawan</option>
                        <option value="200+ Karyawan">200+ Karyawan</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                    {errors.size && <p className="text-red-500 text-[11px] mt-0.5">{errors.size}</p>}
                  </div>
                </div>

                {/* Lokasi */}
                <div className="flex flex-col gap-2 w-1/2 pr-2.5">
                  <label className="text-[13px] font-bold text-[#0B173D]">Lokasi</label>
                  <input 
                    type="text" 
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className={`w-full bg-white rounded-xl px-4 py-3 text-[14px] font-medium text-[#111C2D] outline-none transition-shadow shadow-sm ${errors.location ? 'border border-red-500 focus:ring-2 focus:ring-red-200' : 'border border-black/5 focus:ring-2 focus:ring-[#1D42AC]/30'}`}
                  />
                  {errors.location && <p className="text-red-500 text-[11px] mt-0.5">{errors.location}</p>}
                </div>

                {/* Deskripsi */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#0B173D]">Deskripsi</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className={`w-full bg-white rounded-xl px-4 py-3 text-[14px] font-medium text-[#111C2D] outline-none transition-shadow shadow-sm min-h-[100px] resize-y ${errors.description ? 'border border-red-500 focus:ring-2 focus:ring-red-200' : 'border border-black/5 focus:ring-2 focus:ring-[#1D42AC]/30'}`}
                  />
                  {errors.description && <p className="text-red-500 text-[11px] mt-0.5">{errors.description}</p>}
                </div>

                {/* Nilai Perusahaan */}
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#0B173D]">Nilai Perusahaan <span className="text-gray-400 font-normal ml-1">(Opsional)</span></label>
                  <div className="w-full bg-white border border-black/5 rounded-xl p-2.5 shadow-sm focus-within:ring-2 focus-within:ring-[#1D42AC]/30 transition-shadow">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.values.map((value, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 bg-[#6B5BAE] text-white px-3 py-1.5 rounded-full text-[13px] font-medium">
                          {value}
                          <X 
                            size={14} 
                            className="cursor-pointer hover:text-red-200 transition-colors" 
                            onClick={() => handleRemoveValue(idx)}
                          />
                        </div>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Tambah nilai..."
                      value={newValueInput}
                      onChange={(e) => setNewValueInput(e.target.value)}
                      onKeyDown={handleAddValue}
                      className="w-full outline-none text-[14px] px-1 py-1 text-[#111C2D]"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400">Tekan <span className="font-semibold text-gray-500">Enter</span> untuk tambah dan klik X untuk hapus.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-4 w-full max-w-[800px] mx-auto">
              <button 
                onClick={handleCancel}
                className="px-8 py-2.5 rounded-lg text-[14px] font-semibold bg-[#1D42AC] text-white hover:bg-[#153285] transition-all shadow-md"
              >
                Batalkan Perubahan
              </button>
              <button 
                onClick={handleSave}
                className="px-8 py-2.5 rounded-lg text-[14px] font-semibold bg-white text-[#1D42AC] border border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
              >
                Simpan Perubahan
              </button>
            </div>
          </>
        ) : (

          /* --- MODE TAMPILAN (VIEW) --- */
          <div className="bg-[#EEEDF8] rounded-[24px] border border-black/5 shadow-sm relative w-full overflow-hidden">
            
            {/* Header Profil */}
            <div className="p-8 pb-6 border-b border-black/5">
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-8 right-8 bg-[#1D42AC] text-white px-5 py-2 rounded-full text-[14px] font-semibold hover:bg-[#153285] transition-colors shadow-sm flex items-center gap-2"
              >
                <img src={PencilIcon} alt="Edit" className="w-3.5 h-3.5 brightness-0 invert" />
                Edit
              </button>
              
              <div className="flex gap-6 items-start">
                {/* Fallback Logo / Initial */}
                <div className="w-[110px] h-[110px] bg-[#6B5BAE] rounded-2xl flex items-center justify-center text-white text-[42px] font-bold shrink-0 shadow-sm overflow-hidden">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
                  ) : (
                    savedData.name ? savedData.name.charAt(0).toUpperCase() : "TC"
                  )}
                </div>
                <div className="flex flex-col justify-center mt-1">
                  <h1 className="text-[26px] font-bold text-[#0B173D]">{savedData.name}</h1>
                  <p className="text-[17px] text-gray-400 font-bold mb-3">{savedData.tagline}</p>
                  
                  <div className="flex flex-wrap gap-2.5">
                    <span className="px-3.5 py-1.5 bg-[#D1FADF] text-[#027A48] text-[12px] font-bold rounded-full border border-[#027A48]/20 shadow-sm">
                      Terverifikasi
                    </span>
                    <span className="px-3.5 py-1.5 bg-white text-[#0B173D]/80 text-[12px] font-bold rounded-full border border-black/10 shadow-sm">
                      {savedData.industry}
                    </span>
                    <span className="px-3.5 py-1.5 bg-white text-[#0B173D]/80 text-[12px] font-bold rounded-full border border-black/10 shadow-sm">
                      {savedData.size}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 mt-2.5">
                    <span className="px-3.5 py-1.5 bg-white text-[#0B173D]/80 text-[12px] font-bold rounded-full border border-black/10 shadow-sm">
                      {savedData.location}
                    </span>
                    <span className="px-3.5 py-1.5 bg-white text-[#0B173D]/80 text-[12px] font-bold rounded-full border border-black/10 shadow-sm">
                      {savedData.founded}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Konten Bawah */}
            <div className="p-8 grid grid-cols-[1fr_260px] gap-8">
              
              {/* Kolom Kiri */}
              <div className="bg-white rounded-[20px] p-7 shadow-sm border border-black/5">
                <h3 className="text-[13px] font-bold text-gray-400 mb-2">Tentang Perusahaan</h3>
                <p className="text-[14px] text-[#0B173D] font-medium leading-relaxed whitespace-pre-line mb-8">
                  {savedData.description}
                </p>

                <h3 className="text-[13px] font-bold text-gray-400 mb-3">Detail Perusahaan</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8">
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-gray-400">Industri</p>
                    <div className="px-4 py-2 border border-black/10 rounded-xl text-[13px] font-bold text-[#0B173D]/80">
                      {savedData.industry}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-gray-400">Lokasi</p>
                    <div className="px-4 py-2 border border-black/10 rounded-xl text-[13px] font-bold text-[#0B173D]/80">
                      {savedData.location}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-gray-400">Ukuran</p>
                    <div className="px-4 py-2 border border-black/10 rounded-xl text-[13px] font-bold text-[#0B173D]/80">
                      {savedData.size}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-medium text-gray-400">Tahun Berdiri</p>
                    <div className="px-4 py-2 border border-black/10 rounded-xl text-[13px] font-bold text-[#0B173D]/80">
                      {savedData.founded}
                    </div>
                  </div>
                </div>

                <h3 className="text-[13px] font-bold text-gray-400 mb-3">Nilai Perusahaan</h3>
                <div className="flex flex-wrap gap-2.5">
                  {savedData.values.length > 0 ? (
                    savedData.values.map((val, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-[#6B5BAE] text-white rounded-full text-[13px] font-semibold shadow-sm">
                        {val}
                      </span>
                    ))
                  ) : (
                    <span className="text-[13px] italic text-gray-400">Belum ada nilai perusahaan yang ditambahkan.</span>
                  )}
                </div>
              </div>

              {/* Kolom Kanan (Rating) */}
              <div className="bg-[#EAE8F4] rounded-[20px] p-6 h-fit flex flex-col items-center justify-center text-center shadow-sm border border-black/5">
                <h3 className="text-[13px] font-bold text-[#0B173D] mb-4">Penilaian Perusahaan</h3>
                
                {savedData.rating > 0 ? (
                  <>
                    <div className="flex items-end justify-center gap-1 mb-2">
                      <span className="text-[40px] font-bold text-[#0B173D] leading-none">
                        {savedData.rating.toFixed(1)}
                      </span>
                      <span className="text-[18px] text-gray-500 font-bold leading-none pb-1.5">
                        /5
                      </span>
                    </div>
                    
                    <div className="flex gap-1 mb-3 text-[#FACC15]">
                      <Star fill="currentColor" size={16} />
                      <Star fill="currentColor" size={16} />
                      <Star fill="currentColor" size={16} />
                      <Star fill="currentColor" size={16} />
                      <Star size={16} className="text-gray-300" />
                    </div>
                    
                    <p className="text-[11px] font-bold text-[#0B173D]/60 mt-1">
                      dari {savedData.reviewsCount} ulasan
                    </p>
                  </>
                ) : (
                  <p className="text-[13px] italic text-gray-500 mt-2 mb-4">Belum ada penilaian.</p>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}