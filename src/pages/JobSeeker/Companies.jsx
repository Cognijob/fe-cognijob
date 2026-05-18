import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, ChevronLeft, Globe, Users, Calendar, Mail } from 'lucide-react';

// Data Mockup - Fitur Filter
const mockCompanies = [
  { id: 1, name: 'TechCogni Indonesia', industry: 'Teknologi', location: 'Jakarta Selatan', size: '50 - 100 Karyawan', initials: 'TC', jobs: 5 },
  {
    id: 2,
    name: 'TechVision Indonesia',
    industry: 'Teknologi',
    location: 'Jakarta Selatan',
    size: '500 - 1.000 Karyawan',
    initials: 'TN',
    founded: 'Sejak 12 Januari 2015',
    website: 'www.techvision.com',
    email: 'techvision@gmail.com',
    address: 'Sudirman Central Business Distric (SCBD), Jakarta',
    about: 'TechVision Indonesia adalah firma teknologi terkemuka yang berbasis di Jakarta, berdedikasi untuk mendorong transformasi digital di seluruh Asia Tenggara. Kami mengkhususkan diri dalam solusi kecerdasan buatan, infrastruktur cloud berskala besar, dan pengembangan aplikasi mobile yang mengutamakan pengalaman pengguna.',
    businessSector: 'Fokus pada pengembangan Teknologi, Software Development, dan AI Solutions.',
    availableJobs: [
      { id: 1, title: 'Senior Backend Engineer', type: 'Full-time', location: 'Jakarta Selatan', salary: 'Rp 18-28 Juta/Bulan' },
      { id: 2, title: 'Lead UI/UX Designer', type: 'Full-time', location: 'Remote', salary: 'Rp 15-25 Juta/Bulan' }
    ]
  },
  { id: 3, name: 'Artha Jaya Mandiri', industry: 'Keuangan', location: 'Surabaya', size: '100 - 500 Karyawan', initials: 'AJ', jobs: 2 },
  { id: 4, name: 'Biocare Global', industry: 'Kesehatan', location: 'Jakarta Pusat', size: '500 - 1.000 Karyawan', initials: 'BG', jobs: 3 },
  { id: 5, name: 'FastTrack Logistics', industry: 'Logistik', location: 'Semarang', size: '1.000+ Karyawan', initials: 'FL', jobs: 8 },
  { id: 6, name: 'EduNation Hub', industry: 'Pendidikan', location: 'Yogyakarta', size: '10 - 50 Karyawan', initials: 'EH', jobs: 1 },
  { id: 7, name: 'Creative Pulse Asia', industry: 'Media', location: 'Bandung', size: '50 - 100 Karyawan', initials: 'CP', jobs: 4 },
  { id: 8, name: 'PwC Indonesia', industry: 'Konsultan', location: 'Jakarta Selatan', size: '1.000+ Karyawan', initials: 'PW', jobs: 12 },
  { id: 9, name: 'Bank Mandiri', industry: 'Keuangan', location: 'Jakarta Selatan', size: '1.000+ Karyawan', initials: 'BM', jobs: 15 },
];

export default function Companies() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  // State Fitur Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Extract Dropdown
  const industries = [...new Set(mockCompanies.map(c => c.industry))];
  const locations = [...new Set(mockCompanies.map(c => c.location))];
  const sizes = [...new Set(mockCompanies.map(c => c.size))];

  // Logika Pencarian & Filter
  const filteredCompanies = mockCompanies.filter(company => {
    const matchSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchIndustry = selectedIndustry === '' ? true : company.industry === selectedIndustry;
    const matchLocation = selectedLocation === '' ? true : company.location === selectedLocation;
    const matchSize = selectedSize === '' ? true : company.size === selectedSize;
    return matchSearch && matchIndustry && matchLocation && matchSize;
  });

  // ==========================================
  // VIEW 1: COMPANY LISTING (PERSIS DASHBOARD)
  // ==========================================
  if (!selectedCompany) {
    return (
      <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in bg-[#FBFAFF] font-['Poppins']">
        <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
          
          {/* SEARCH BAR (Persis Dashboard) */}
          <div className="relative w-full max-w-[550px] mx-auto mb-6">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Temukan perusahaan...." 
              className="w-full h-[45px] pl-12 pr-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#112664]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* FILTER SECTION (Persis Dashboard) */}
          <div className="text-center mb-10">
            <p className="font-bold text-[15px] mb-3 text-[#0B173D]">Filter Lowongan Pekerjaan Berdasarkan:</p>
            <div className="flex justify-center gap-4">
              
              <div className="relative w-[160px]">
                <select 
                  className="w-full h-[36px] appearance-none bg-white border border-[#1E42AC] text-[#1E42AC] font-semibold text-[13px] rounded-full shadow-sm px-4 focus:outline-none cursor-pointer"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <option value="">Semua Industri</option>
                  {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1E42AC]">
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="relative w-[160px]">
                <select 
                  className="w-full h-[36px] appearance-none bg-white border border-[#1E42AC] text-[#1E42AC] font-semibold text-[13px] rounded-full shadow-sm px-4 focus:outline-none cursor-pointer"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Semua Lokasi</option>
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1E42AC]">
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="relative w-[160px]">
                <select 
                  className="w-full h-[36px] appearance-none bg-white border border-[#1E42AC] text-[#1E42AC] font-semibold text-[13px] rounded-full shadow-sm px-4 focus:outline-none cursor-pointer"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Semua Ukuran</option>
                  {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1E42AC]">
                  <ChevronDown size={16} />
                </div>
              </div>

            </div>
          </div>

          {/* Section Title */}
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-bold text-[18px] text-[#0B173D]">
              {filteredCompanies.length > 0 ? 'Perusahaan Terpopuler' : 'Perusahaan Tidak Ditemukan'}
            </h2>
            {(searchTerm || selectedIndustry || selectedLocation || selectedSize) ? (
              <button 
                onClick={() => { setSearchTerm(''); setSelectedIndustry(''); setSelectedLocation(''); setSelectedSize(''); }}
                className="text-red-500 text-[13px] font-semibold underline"
              >
                Reset Filter
              </button>
            ) : (
              <button className="text-[#1E42AC] text-[13px] font-semibold underline">Lihat Semua</button>
            )}
          </div>

          {/* Grid Companies (Ukuran grid & card persis Dashboard) */}
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredCompanies.map((company) => (
                <div key={company.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-5 shadow-sm flex flex-col justify-between">
                  
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-[#112664] rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                        {company.initials}
                      </div>
                      <div className="px-3 py-1 bg-[#CFD6F0] rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-[#0B173D]">{company.industry}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-[14px] text-[#0B173D] leading-tight mb-1">{company.name}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-[11px] font-medium">
                      <MapPin size={12} /> {company.location}
                    </div>
                  </div>

                  <div className="mt-5 flex justify-between items-center">
                    <span className="text-gray-400 text-[11px] font-bold">{company.jobs || 0} Lowongan</span>
                    <button 
                      onClick={() => setSelectedCompany(company)}
                      className="border border-[#1E42AC] text-[#1E42AC] px-5 py-1 rounded-lg shadow-md text-[12px] font-bold hover:bg-[#1E42AC] hover:text-white transition-all"
                    >
                      Lihat detail
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white border-2 border-dashed border-[#CDD6EE] rounded-[20px]">
               <p className="text-[13px] text-gray-500">Silakan ubah kata kunci atau filter untuk menemukan perusahaan.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: COMPANY INFORMATION DETAIL
  // ==========================================
  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in bg-[#FBFAFF] font-['Poppins']">
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        <button 
          onClick={() => setSelectedCompany(null)} 
          className="text-[#1E42AC] font-semibold text-[13px] flex items-center gap-1 mb-4 hover:underline"
        >
          <ChevronLeft size={16} /> Kembali ke Daftar Perusahaan
        </button>

        {/* Header Banner Section */}
        <div className="bg-white border-2 border-[#CDD6EE] rounded-[20px] shadow-sm mb-6 relative">
          <div className="w-full h-[120px] bg-[#CFD6F0] rounded-t-[18px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Banner" className="w-full h-full object-cover opacity-70" />
          </div>

          <div className="px-8 pb-6 flex items-end gap-5 -mt-10 relative">
            <div className="w-[80px] h-[80px] bg-[#D9D9D9] border-[3px] border-white rounded-xl flex items-center justify-center text-[#112664] text-[24px] font-bold shadow-sm shrink-0">
              {selectedCompany.initials}
            </div>
            
            <div className="flex-1 flex justify-between items-end pb-1 w-full">
              <div>
                <h1 className="text-[20px] font-bold text-[#0B173D] leading-tight">{selectedCompany.name}</h1>
                <div className="flex items-center gap-1 mt-1 text-gray-400 text-[12px] font-medium">
                  <MapPin size={14} /> {selectedCompany.location}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-4 py-1.5 bg-[#CFD6F0] rounded-full text-[11px] font-semibold text-[#0B173D]">
                  {selectedCompany.industry}
                </span>
                <button className="px-5 py-1.5 bg-white border border-[#1E42AC] text-[#1E42AC] rounded-full text-[12px] font-bold shadow-sm hover:bg-[#1E42AC] hover:text-white transition-all">
                  Ikuti
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-4">
          
          {/* Kolom Kiri: Tentang & Lowongan (2 Kolom) */}
          <div className="col-span-2 space-y-4">
            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Tentang Perusahaan</h3>
              <div className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-5 shadow-sm">
                <p className="text-[12px] text-gray-600 leading-relaxed text-justify">
                  {selectedCompany.about || "Belum ada deskripsi untuk perusahaan ini."}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Lowongan Terbaru</h3>
              <div className="space-y-3">
                {selectedCompany.availableJobs ? selectedCompany.availableJobs.map((job) => (
                  <div key={job.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-4 shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-[14px] text-[#0B173D]">{job.title}</h4>
                      <p className="text-gray-400 text-[11px] font-medium mt-0.5">{job.type} • {job.location}</p>
                    </div>
                    <button className="border border-[#1E42AC] text-[#1E42AC] px-5 py-1.5 rounded-lg shadow-md text-[12px] font-bold hover:bg-[#1E42AC] hover:text-white transition-all">
                      Lamar
                    </button>
                  </div>
                )) : (
                  <div className="text-center py-6 bg-white border-2 border-[#CDD6EE] rounded-[20px]">
                    <p className="text-gray-400 text-[12px]">Belum ada lowongan tersedia saat ini.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Sidebar Informasi (1 Kolom) */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Hubungi Kami</h3>
              <div className="bg-[#EAECF9] rounded-[20px] p-5 space-y-3 shadow-sm">
                <div className="flex items-center gap-3 text-[#0B173D]">
                  <Globe size={16} />
                  <span className="text-[12px]">{selectedCompany.website || '-'}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0B173D]">
                  <Users size={16} />
                  <span className="text-[12px]">{selectedCompany.size || '-'}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0B173D]">
                  <Calendar size={16} />
                  <span className="text-[12px]">{selectedCompany.founded || '-'}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0B173D]">
                   <Mail size={16} />
                  <span className="text-[12px] truncate">{selectedCompany.email || '-'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Sektor Usaha</h3>
              <div className="bg-[#EAECF9] rounded-[20px] p-5 shadow-sm min-h-[60px] flex items-center">
                <p className="text-[12px] text-[#0B173D] leading-relaxed">
                  {selectedCompany.businessSector || "Informasi sektor usaha belum tersedia."}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Lokasi Perusahaan</h3>
              <div className="bg-[#EAECF9] rounded-[20px] overflow-hidden shadow-sm">
                <div className="h-[80px] bg-[#CFD6F0] w-full">
                   <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80" alt="Map View" className="w-full h-full object-cover opacity-60 mix-blend-multiply" />
                </div>
                <div className="p-4 flex gap-2 items-start">
                  <MapPin size={16} className="text-red-500 shrink-0" />
                  <p className="text-[12px] text-[#0B173D] leading-snug">
                    {selectedCompany.address || '-'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}