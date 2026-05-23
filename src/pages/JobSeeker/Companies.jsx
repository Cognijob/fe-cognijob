import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown, ChevronLeft, Globe, Users, Calendar, Mail, Loader2 } from 'lucide-react';
import { fetchCompanies } from '../../services/companyServices'; 

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCompany, setSelectedCompany] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSize, setSelectedSize] = useState(''); // State filter ukuran
  
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  useEffect(() => {
    const getCompaniesData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchCompanies();
        const companyList = response.data?.data?.companies || response.data?.data || response.data;

        if (Array.isArray(companyList)) {
          const formattedData = companyList.map((comp) => {
            
            // Logika Pembacaan Ukuran Karyawan dari backend (employeeCount)
            let sizeLabel = 'Informasi belum tersedia';
            const empCount = comp.employeeCount || comp.size; 
            
            if (empCount) {
               // Memastikan format akhirnya selalu ada kata "Karyawan"
               sizeLabel = String(empCount).toLowerCase().includes('karyawan') 
                 ? empCount 
                 : `${empCount} Karyawan`;
            }

            return {
              id: comp.companyId || comp.id,
              name: comp.companyName || 'Perusahaan Tidak Bernama',
              industry: comp.industry || 'Lainnya',
              location: comp.location || 'Tidak diketahui',
              initials: comp.companyName ? comp.companyName.substring(0, 2).toUpperCase() : 'NA',
              size: sizeLabel, // <-- Field ukuran untuk filter & UI
              jobs: comp.jobsCount || 0,
              founded: comp.foundedAt ? new Date(comp.foundedAt).getFullYear() : '-', // Format tanggal berdirinya
              website: comp.website || '-',
              email: comp.contactEmail || '-',
              address: comp.location || '-',
              about: comp.description || 'Belum ada deskripsi untuk perusahaan ini.',
              businessSector: comp.industry || '-',
              availableJobs: []
            };
          });
          
          setCompanies(formattedData);
        } else {
          setError("Format data yang diterima dari server tidak sesuai.");
        }
      } catch (err) {
        setError("Gagal memuat data perusahaan. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };

    getCompaniesData();
  }, []);

  // Ekstrak Opsi Filter (Hapus duplikat dan hindari nilai kosong/tidak tersedia)
  const industries = [...new Set(companies.map(c => c.industry))].filter(Boolean);
  const locations = [...new Set(companies.map(c => c.location))].filter(Boolean);
  const sizes = [...new Set(companies.map(c => c.size))].filter(sz => sz !== 'Informasi belum tersedia');

  // Proses Filter (Search, Industry, Location, Size)
  const filteredCompanies = companies.filter(company => {
    const matchSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchIndustry = selectedIndustry === '' ? true : company.industry === selectedIndustry;
    const matchLocation = selectedLocation === '' ? true : company.location === selectedLocation;
    const matchSize = selectedSize === '' ? true : company.size === selectedSize;
    return matchSearch && matchIndustry && matchLocation && matchSize;
  });

  const displayedCompanies = showAllCompanies ? filteredCompanies : filteredCompanies.slice(0, 6);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col min-h-screen items-center justify-center bg-[#FBFAFF]">
        <Loader2 className="animate-spin text-[#1E42AC]" size={40} />
        <p className="mt-4 text-[#1E42AC] font-semibold">Memuat daftar perusahaan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col min-h-screen items-center justify-center bg-[#FBFAFF]">
        <div className="bg-red-100 p-4 rounded-xl text-red-600 font-semibold mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-5 py-2 bg-[#1E42AC] text-white font-bold rounded-lg shadow-md hover:bg-[#112664] transition-all text-sm"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  // ==========================================
  // VIEW 1: DAFTAR PERUSAHAAN (COMPANY LISTING)
  // ==========================================
  if (!selectedCompany) {
    return (
      <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in bg-[#FBFAFF] font-['Poppins']">
        <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
          
          {/* SEARCH BAR */}
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

          {/* FILTER SECTION */}
          <div className="text-center mb-10">
            <p className="font-bold text-[15px] mb-3 text-[#0B173D]">Filter Berdasarkan:</p>
            <div className="flex justify-center gap-4 flex-wrap">
              
              <div className="relative w-[180px]">
                <select 
                  className="w-full h-[36px] appearance-none bg-white border border-[#1E42AC] text-[#1E42AC] font-semibold text-[13px] rounded-full shadow-sm px-4 focus:outline-none cursor-pointer truncate pr-8"
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

              <div className="relative w-[180px]">
                <select 
                  className="w-full h-[36px] appearance-none bg-white border border-[#1E42AC] text-[#1E42AC] font-semibold text-[13px] rounded-full shadow-sm px-4 focus:outline-none cursor-pointer truncate pr-8"
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

              {/* FILTER UKURAN KARYAWAN */}
              <div className="relative w-[180px]">
                <select 
                  className="w-full h-[36px] appearance-none bg-white border border-[#1E42AC] text-[#1E42AC] font-semibold text-[13px] rounded-full shadow-sm px-4 focus:outline-none cursor-pointer truncate pr-8"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Semua Ukuran</option>
                  {sizes.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1E42AC]">
                  <ChevronDown size={16} />
                </div>
              </div>

            </div>
          </div>

          {/* JUDUL SEKSI & TOMBOL LIHAT SEMUA */}
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-bold text-[18px] text-[#0B173D]">
              {filteredCompanies.length > 0 ? 'Perusahaan Terdaftar' : 'Perusahaan Tidak Ditemukan'}
            </h2>
            {(searchTerm || selectedIndustry || selectedLocation || selectedSize) ? (
              <button 
                onClick={() => { setSearchTerm(''); setSelectedIndustry(''); setSelectedLocation(''); setSelectedSize(''); }}
                className="text-red-500 text-[13px] font-semibold underline"
              >
                Reset Filter
              </button>
            ) : (
              filteredCompanies.length > 6 && (
                <button 
                  onClick={() => setShowAllCompanies(!showAllCompanies)}
                  className="text-[#1E42AC] text-[13px] font-semibold underline"
                >
                  {showAllCompanies ? 'Sembunyikan' : 'Lihat Semua'}
                </button>
              )
            )}
          </div>

          {/* GRID DATA PERUSAHAAN */}
          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {displayedCompanies.map((company) => (
                <div key={company.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-[#112664] rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                        {company.initials}
                      </div>
                      <div className="px-3 py-1 bg-[#CFD6F0] rounded-full flex items-center justify-center max-w-[120px]">
                        <span className="text-[10px] font-semibold text-[#0B173D] truncate">{company.industry}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-[14px] text-[#0B173D] leading-tight mb-1">{company.name}</h3>
                    
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-medium">
                        <MapPin size={12} className="shrink-0 text-[#1E42AC]"/> <span className="truncate">{company.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-semibold">
                        <Users size={12} className="shrink-0 text-[#1E42AC]"/> <span className="truncate">{company.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-between items-center">
                    <span className="text-gray-400 text-[11px] font-bold">{company.jobs} Lowongan</span>
                    <button 
                      onClick={() => setSelectedCompany(company)}
                      className="border border-[#1E42AC] text-[#1E42AC] px-5 py-1 rounded-lg shadow-sm text-[12px] font-bold hover:bg-[#1E42AC] hover:text-white transition-all"
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
  // VIEW 2: HALAMAN DETAIL INFORMASI PERUSAHAAN
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
          
          <div className="col-span-2 space-y-4">
            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Tentang Perusahaan</h3>
              <div className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-5 shadow-sm">
                <p className="text-[12px] text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                  {selectedCompany.about}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Lowongan Terbaru</h3>
              <div className="space-y-3">
                {selectedCompany.availableJobs && selectedCompany.availableJobs.length > 0 ? (
                  selectedCompany.availableJobs.map((job) => (
                    <div key={job.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-4 shadow-sm flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-[14px] text-[#0B173D]">{job.title}</h4>
                        <p className="text-gray-400 text-[11px] font-medium mt-0.5">{job.type} • {job.location}</p>
                      </div>
                      <button className="border border-[#1E42AC] text-[#1E42AC] px-5 py-1.5 rounded-lg shadow-md text-[12px] font-bold hover:bg-[#1E42AC] hover:text-white transition-all">
                        Lamar
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 bg-white border-2 border-[#CDD6EE] rounded-[20px]">
                    <p className="text-gray-400 text-[12px]">Belum ada lowongan tersedia saat ini.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Hubungi Kami</h3>
              <div className="bg-[#EAECF9] rounded-[20px] p-5 space-y-3 shadow-sm">
                <div className="flex items-center gap-3 text-[#0B173D]">
                  <Globe size={16} className="text-[#1E42AC]" />
                  <span className="text-[12px]">{selectedCompany.website}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0B173D]">
                  <Users size={16} className="text-[#1E42AC]" />
                  <span className="text-[12px]">{selectedCompany.size}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0B173D]">
                  <Calendar size={16} className="text-[#1E42AC]" />
                  <span className="text-[12px]">Sejak {selectedCompany.founded}</span>
                </div>
                <div className="flex items-center gap-3 text-[#0B173D]">
                   <Mail size={16} className="text-[#1E42AC]" />
                  <span className="text-[12px] truncate">{selectedCompany.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[15px] text-[#1E42AC] mb-2">Sektor Usaha</h3>
              <div className="bg-[#EAECF9] rounded-[20px] p-5 shadow-sm min-h-[60px] flex items-center">
                <p className="text-[12px] text-[#0B173D] leading-relaxed">
                  {selectedCompany.businessSector}
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
                    {selectedCompany.address}
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