import React, { useState } from 'react';
import { ChevronDown, UploadCloud, Star, X } from 'lucide-react';
import PencilIconImg from '../../assets/AuthPages/PencilIcon.png';

export default function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Data utama (Mock)
  const [companyData, setCompanyData] = useState({
    name: 'TechCogni Indonesia',
    tagline: 'Building the future of fintech in Indonesia',
    description: 'TechCogni adalah startup fintech yang berfokus pada solusi pembayaran digital dan pinjaman berbasis AI untuk pasar Indonesia. Didirikan tahun 2019, kami telah melayani lebih dari 2 juta pengguna aktif dan terus tumbuh bersama tim yang berdedikasi.',
    industry: 'Financial Technology',
    size: '51-200',
    location: 'Jakarta, Indonesia',
    founded: 'Est. 2019',
    values: ['Inklusif', 'Inovatif', 'Kolaboratif'],
    rating: { score: 4.0, reviewers: 18 },
    logo: null
  });

  // State untuk form edit
  const [formData, setFormData] = useState({ ...companyData });
  const [newValue, setNewValue] = useState('');

  // --- LOGIC HELPER ---
  const getInitials = (name) => {
    if (!name) return 'TC';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleAddValue = (e) => {
    if (e.key === 'Enter' && newValue.trim() !== '') {
      e.preventDefault();
      setFormData({ ...formData, values: [...formData.values, newValue.trim()] });
      setNewValue('');
    }
  };

  const handleRemoveValue = (indexToRemove) => {
    setFormData({
      ...formData,
      values: formData.values.filter((_, index) => index !== indexToRemove)
    });
  };

  // --- VALIDATION & SUBMIT ---
  const handleSave = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nama Perusahaan wajib diisi";
    if (!formData.description.trim()) newErrors.description = "Deskripsi wajib diisi";
    if (!formData.industry) newErrors.industry = "Industri wajib dipilih";
    if (!formData.size) newErrors.size = "Ukuran Perusahaan wajib dipilih";
    if (!formData.location.trim()) newErrors.location = "Lokasi wajib diisi";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCompanyData({ ...formData });
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({ ...companyData });
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {!isEditing ? (
          /* ================= VIEW MODE ================= */
          <div className="bg-white rounded-[20px] p-8 shadow-sm border border-black/5 mb-8 relative">
            
            {/* Tombol Edit */}
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute top-8 right-8 px-6 py-2.5 rounded-full bg-[#1E42AC] text-white font-semibold flex items-center gap-2.5 hover:bg-[#15328A] transition-all shadow-md text-[14px]"
            >
              Edit <img src={PencilIconImg} alt="Edit" className="w-3.5 h-3.5 brightness-0 invert" />
            </button>

            {/* Header Profile */}
            <div className="flex gap-6 mb-8 border-b border-gray-100 pb-8">
              {companyData.logo ? (
                <img src={companyData.logo} alt="Logo" className="w-[120px] h-[120px] rounded-2xl object-cover shadow-sm shrink-0" />
              ) : (
                <div className="w-[120px] h-[120px] bg-[#6B5BAE] text-white rounded-2xl flex justify-center items-center text-[48px] font-bold shrink-0 shadow-sm">
                  {getInitials(companyData.name)}
                </div>
              )}
              
              <div className="flex flex-col justify-center">
                <h2 className="text-[24px] font-bold text-[#0B173D] leading-tight mb-1">{companyData.name}</h2>
                <p className="text-[16px] font-medium text-[#B4B2A9] mb-4">{companyData.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 rounded-full text-[13px] font-bold bg-[#10B981] text-white">Terverifikasi</span>
                  <span className="px-4 py-1.5 rounded-full text-[13px] font-semibold bg-[#F0EDFA] text-[#0B173D] border border-black/5">{companyData.industry}</span>
                  <span className="px-4 py-1.5 rounded-full text-[13px] font-semibold bg-[#F0EDFA] text-[#0B173D] border border-black/5">{companyData.size} Karyawan</span>
                  <span className="px-4 py-1.5 rounded-full text-[13px] font-semibold bg-[#F0EDFA] text-[#0B173D] border border-black/5">{companyData.location}</span>
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div className="flex gap-10">
              <div className="flex-[2] flex flex-col gap-8">
                
                {/* Tentang Perusahaan */}
                <div>
                  <p className="text-[13px] font-bold text-[#B4B2A9] mb-2 uppercase tracking-wide">Tentang Perusahaan</p>
                  <p className="text-[15px] text-[#0B173D] leading-relaxed text-justify font-medium">
                    {companyData.description}
                  </p>
                </div>

                {/* Detail Perusahaan */}
                <div>
                  <h3 className="text-[13px] font-bold text-[#B4B2A9] mb-4 uppercase tracking-wide">Detail Perusahaan</h3>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[15px] font-medium text-[#B4B2A9]">Industri</span>
                      <div className="w-fit border border-[#D6CDEE] rounded-full px-5 py-1.5 text-[14px] font-medium text-black">
                        {companyData.industry}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[15px] font-medium text-[#B4B2A9]">Lokasi</span>
                      <div className="w-fit border border-[#D6CDEE] rounded-full px-5 py-1.5 text-[14px] font-medium text-black">
                        {companyData.location}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[15px] font-medium text-[#B4B2A9]">Ukuran</span>
                      <div className="w-fit border border-[#D6CDEE] rounded-full px-5 py-1.5 text-[14px] font-medium text-black">
                        {companyData.size} Karyawan
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[15px] font-medium text-[#B4B2A9]">Tahun Berdiri</span>
                      <div className="w-fit border border-[#D6CDEE] rounded-full px-5 py-1.5 text-[14px] font-medium text-black">
                        {companyData.founded}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nilai Perusahaan */}
                <div>
                  <p className="text-[13px] font-bold text-[#B4B2A9] mb-3 uppercase tracking-wide">Nilai Perusahaan (Core Values)</p>
                  {companyData.values.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {companyData.values.map((val, index) => (
                        <span key={index} className="bg-[#E9EBF8] text-[#1E42AC] px-5 py-1.5 rounded-lg text-[14px] font-bold">
                          {val}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-gray-400 italic">Belum ada nilai perusahaan yang ditambahkan.</p>
                  )}
                </div>

              </div>

              {/* Sidebar Kanan - Rating */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-[#EBE9F4] rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <p className="text-[14px] font-bold text-[#0B173D]/70 mb-2">Workplace Rating</p>
                  {companyData.rating ? (
                    <>
                      <div className="flex items-end justify-center mb-1">
                        <span className="text-[42px] font-bold text-[#0B173D] leading-none">{companyData.rating.score.toFixed(1)}</span>
                        <span className="text-[18px] font-bold text-gray-500 mb-1 ml-1">/5</span>
                      </div>
                      <div className="flex gap-1 text-[#FFD700] mb-3">
                        <Star fill="currentColor" size={20} />
                        <Star fill="currentColor" size={20} />
                        <Star fill="currentColor" size={20} />
                        <Star fill="currentColor" size={20} />
                        <Star size={20} className="text-gray-300" />
                      </div>
                      <p className="text-[13px] font-medium text-gray-500">Berdasarkan {companyData.rating.reviewers} ulasan</p>
                    </>
                  ) : (
                    <p className="text-[13px] text-gray-400 italic mt-2">Belum ada penilaian.</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        ) : (

          /* ================= EDIT MODE ================= */
          <div className="animate-in fade-in duration-300">
            <div className="mb-8">
              <h1 className="text-[24px] font-bold text-[#0B173D]">Edit Profil Perusahaan</h1>
              <p className="text-[#8A95A5] text-[15px] mt-1">Perbarui informasi profil perusahaan.</p>
            </div>

            <div className="bg-[#E9EBF8] rounded-[20px] p-10 max-w-[850px] mx-auto shadow-sm">
              
              <h2 className="text-[20px] font-bold text-[#0B173D] mb-6">Logo Perusahaan</h2>
              <div className="flex gap-6 items-center mb-8">
                <div className="flex-1 bg-white border border-dashed border-[#6B5BAE]/50 rounded-xl p-6 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 bg-[#E9EBF8] rounded-full flex items-center justify-center mb-3">
                    <UploadCloud className="text-[#6B5BAE]" size={20} />
                  </div>
                  <p className="text-[14px] font-bold text-[#0B173D] mb-1">Seret file ke sini atau</p>
                  <label className="text-[#1E42AC] text-[13px] font-bold cursor-pointer hover:underline">
                    Pilih file
                    <input type="file" accept=".jpg, .jpeg, .png" hidden />
                  </label>
                  <span className="text-[11px] font-medium text-gray-400 mt-2">PNG/JPG maks 2 MB</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="w-[100px] h-[100px] bg-[#6B5BAE] text-white rounded-xl flex justify-center items-center text-[32px] font-bold shadow-sm">
                    {getInitials(formData.name)}
                  </div>
                  <span className="text-[11px] font-medium text-gray-500">Preview</span>
                </div>
              </div>

              <h2 className="text-[20px] font-bold text-[#0B173D] mb-6">Informasi Dasar</h2>
              
              <div className="space-y-6">
                
                <div>
                  <label className="block text-[14px] font-bold text-[#0B173D] mb-2">Nama Perusahaan <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-[14px] text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all ${errors.name ? 'border-red-500' : 'border-white'}`} 
                  />
                  {errors.name && <span className="text-red-500 text-[12px] mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-[#0B173D] mb-2">Tagline Singkat</label>
                  <input 
                    type="text" 
                    name="tagline" 
                    value={formData.tagline} 
                    onChange={handleInputChange} 
                    placeholder="Contoh: Building the future of fintech"
                    className="w-full px-4 py-3 rounded-lg border border-white bg-white text-[14px] text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="block text-[14px] font-bold text-[#0B173D] mb-2">Industri <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        name="industry" 
                        value={formData.industry} 
                        onChange={handleInputChange} 
                        className={`w-full px-4 py-3 rounded-lg border bg-white text-[14px] text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all appearance-none cursor-pointer ${errors.industry ? 'border-red-500' : 'border-white'}`}
                      >
                        <option value="">Pilih Industri...</option>
                        <option value="Financial Technology">Financial Technology</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Healthcare">Healthcare</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                    {errors.industry && <span className="text-red-500 text-[12px] mt-1 block">{errors.industry}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-[14px] font-bold text-[#0B173D] mb-2">Ukuran Perusahaan <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select 
                        name="size" 
                        value={formData.size} 
                        onChange={handleInputChange} 
                        className={`w-full px-4 py-3 rounded-lg border bg-white text-[14px] text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all appearance-none cursor-pointer ${errors.size ? 'border-red-500' : 'border-white'}`}
                      >
                        <option value="">Pilih Ukuran...</option>
                        <option value="1-10">1–10 Karyawan</option>
                        <option value="11-50">11–50 Karyawan</option>
                        <option value="51-200">51–200 Karyawan</option>
                        <option value="200+">200+ Karyawan</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    </div>
                    {errors.size && <span className="text-red-500 text-[12px] mt-1 block">{errors.size}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-[#0B173D] mb-2">Lokasi <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    placeholder="Jakarta, Indonesia"
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-[14px] text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all ${errors.location ? 'border-red-500' : 'border-white'}`} 
                  />
                  {errors.location && <span className="text-red-500 text-[12px] mt-1 block">{errors.location}</span>}
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-[#0B173D] mb-2">Deskripsi Perusahaan <span className="text-red-500">*</span></label>
                  <textarea 
                    rows="5"
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Ceritakan sejarah, visi, dan misi perusahaan Anda..."
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-[14px] text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all resize-none ${errors.description ? 'border-red-500' : 'border-white'}`} 
                  />
                  {errors.description && <span className="text-red-500 text-[12px] mt-1 block">{errors.description}</span>}
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-[#0B173D] mb-2">Nilai Perusahaan <span className="text-gray-400 font-normal">(Opsional)</span></label>
                  <div className="w-full bg-white border border-white rounded-lg px-4 py-3 min-h-[50px] flex flex-col gap-2 focus-within:ring-2 focus-within:ring-[#1E42AC]/20 transition-all">
                    <div className="flex flex-wrap gap-2">
                      {formData.values.map((val, index) => (
                        <span key={index} className="bg-[#E9EBF8] text-[#1E42AC] px-3 py-1 rounded-md text-[13px] font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors" onClick={() => handleRemoveValue(index)}>
                          {val} <X size={14} />
                        </span>
                      ))}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Ketik nilai (misal: Inovatif) lalu tekan Enter..." 
                      value={newValue} 
                      onChange={(e) => setNewValue(e.target.value)} 
                      onKeyDown={handleAddValue} 
                      className="w-full bg-transparent outline-none text-[14px] text-[#0B173D]" 
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Action Buttons Container */}
            <div className="flex flex-col items-center gap-3 mt-8 pb-10 max-w-[850px] mx-auto">
              <div className="flex justify-center gap-5 w-full">
                <button 
                  onClick={handleCancel}
                  className="px-8 py-3 rounded-xl border border-[#1E42AC] text-[#1E42AC] bg-white hover:bg-[#1E42AC] hover:text-white transition-all font-semibold text-[15px]"
                >
                  Batalkan Perubahan
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 rounded-xl border border-[#1E42AC] text-[#09090B] bg-white hover:bg-[#1E42AC] hover:text-white transition-all font-semibold text-[15px]"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}