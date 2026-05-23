import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchPublicJobs, fetchRecommendedJobs } from '../../services/jobServices'; 

export default function DashboardJobseeker() {
  const navigate = useNavigate();

  // --- STATE DATA DARI API ---
  const [publicJobs, setPublicJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- STATE UNTUK PENCARIAN & FILTER ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // --- STATE UNTUK TOMBOL "LIHAT SEMUA" ---
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [showAllActive, setShowAllActive] = useState(false);

  // --- FUNGSI HELPER: Menghitung selisih hari ---
  const getDaysAgo = (dateString) => {
    if (!dateString) return 'Baru saja';
    const days = Math.floor((new Date() - new Date(dateString)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Dibuka hari ini';
    return `Dibuka ${days} hari lalu`;
  };

  // --- FETCH API ---
  useEffect(() => {
    const getJobsData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Panggil kedua API secara bersamaan menggunakan Promise.all agar lebih cepat
        const [publicRes, recommendedRes] = await Promise.all([
          fetchPublicJobs().catch(err => ({ error: err })),
          fetchRecommendedJobs().catch(err => ({ error: err }))
        ]);

        // Fungsi pemetaan (mapping) standar
        const mapJobData = (job) => ({
          id: job.jobId || job.id,
          title: job.title || 'Posisi Tidak Disebutkan',
          // Backend biasanya me-return relasi company sebagai objek { companyName: ... }
          company: job.company?.companyName || job.companyName || 'Perusahaan Rahasia',
          location: job.location || '-',
          level: job.level || '-',
          type: job.employmentType || '-',
          salary: job.salaryRange || 'Dirahasiakan',
          posted: getDaysAgo(job.createdAt)
        });

        // 1. Ekstrak data public jobs
        if (!publicRes.error) {
          // Antisipasi bentuk response pagination: response.data.data.jobs atau langsung response.data.data
          const pJobsList = publicRes.data?.data?.jobs || publicRes.data?.data || publicRes.data;
          if (Array.isArray(pJobsList)) {
            setPublicJobs(pJobsList.map(mapJobData));
          }
        }

        // 2. Ekstrak data recommended jobs
        if (!recommendedRes.error) {
          const rJobsList = recommendedRes.data?.data?.jobs || recommendedRes.data?.data || recommendedRes.data;
          if (Array.isArray(rJobsList)) {
            setRecommendedJobs(rJobsList.map(mapJobData));
          }
        }

      } catch (err) {
        console.error("Kesalahan fatal saat mengambil lowongan:", err);
        setError("Gagal memuat lowongan pekerjaan. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };

    getJobsData();
  }, []);

  // --- EKSTRAK OPSI DROPDOWN (Berdasarkan data Public Jobs) ---
  const locations = [...new Set(publicJobs.map(j => j.location))].filter(l => l !== '-');
  const levels = [...new Set(publicJobs.map(j => j.level))].filter(l => l !== '-');
  const types = [...new Set(publicJobs.map(j => j.type))].filter(t => t !== '-');

  // --- LOGIKA FILTER ---
  // Fungsi filter yang bisa dipakai untuk kedua jenis data
  const applyFilters = (jobsArray) => jobsArray.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLocation = selectedLocation === '' ? true : job.location === selectedLocation;
    const matchLevel = selectedLevel === '' ? true : job.level === selectedLevel;
    const matchType = selectedType === '' ? true : job.type === selectedType;

    return matchSearch && matchLocation && matchLevel && matchType;
  });

  const filteredPublicJobs = applyFilters(publicJobs);
  const filteredRecommendedJobs = applyFilters(recommendedJobs);

  // --- LOGIKA TAMPILAN "LIHAT SEMUA" ---
  const displayedRecommended = showAllRecommended ? filteredRecommendedJobs : filteredRecommendedJobs.slice(0, 3);
  const displayedActive = showAllActive ? filteredPublicJobs : filteredPublicJobs.slice(0, 6);

  // Tampilan Loading
  if (isLoading) {
    return (
      <div className="w-full flex flex-col min-h-screen items-center justify-center bg-[#FBFAFF]">
        <Loader2 className="animate-spin text-[#1E42AC]" size={40} />
        <p className="mt-4 text-[#1E42AC] font-semibold">Memuat lowongan pekerjaan...</p>
      </div>
    );
  }

  // Tampilan Error
  if (error) {
    return (
      <div className="w-full flex flex-col min-h-screen items-center justify-center bg-[#FBFAFF]">
        <div className="bg-red-100 p-4 rounded-xl text-red-600 font-semibold mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-5 py-2 bg-[#1E42AC] text-white font-bold rounded-lg shadow-md hover:bg-[#112664]"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in bg-[#FBFAFF]">
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* SEARCH BAR */}
        <div className="relative w-full max-w-[550px] mx-auto mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Cari posisi, perusahaan, atau lokasi..." 
            className="w-full h-[45px] pl-12 pr-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#112664]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FILTER SECTION */}
        <div className="text-center mb-6">
          <p className="font-bold text-[15px] mb-3 text-[#0B173D]">Filter Lowongan Pekerjaan Berdasarkan:</p>
          <div className="flex justify-center gap-4 flex-wrap">
            
            <div className="relative w-[160px]">
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

            <div className="relative w-[160px]">
              <select 
                className="w-full h-[36px] appearance-none bg-white border border-[#1E42AC] text-[#1E42AC] font-semibold text-[13px] rounded-full shadow-sm px-4 focus:outline-none cursor-pointer truncate pr-8"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Semua Level</option>
                {levels.map(lvl => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1E42AC]">
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="relative w-[160px]">
              <select 
                className="w-full h-[36px] appearance-none bg-white border border-[#1E42AC] text-[#1E42AC] font-semibold text-[13px] rounded-full shadow-sm px-4 focus:outline-none cursor-pointer truncate pr-8"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Semua Tipe</option>
                {types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1E42AC]">
                <ChevronDown size={16} />
              </div>
            </div>

          </div>
        </div>

        {/* PESAN JIKA DATA KOSONG KARENA FILTER */}
        {(filteredPublicJobs.length === 0 && filteredRecommendedJobs.length === 0) ? (
          <div className="text-center py-10 bg-white border-2 border-dashed border-[#CDD6EE] rounded-[20px]">
             <p className="text-[13px] text-gray-500">Lowongan pekerjaan tidak ditemukan. Silakan ubah kata kunci atau filter Anda.</p>
          </div>
        ) : (
          <>
            {/* SECTION: DIREKOMENDASIKAN (Hanya tampil jika ada datanya) */}
            {filteredRecommendedJobs.length > 0 && (
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="font-bold text-[18px] text-[#0B173D]">Direkomendasikan Untukmu</h2>
                  {filteredRecommendedJobs.length > 3 && (
                    <button 
                      onClick={() => setShowAllRecommended(!showAllRecommended)}
                      className="text-[#1E42AC] text-[13px] font-semibold underline"
                    >
                      {showAllRecommended ? 'Sembunyikan' : 'Lihat Semua'}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {displayedRecommended.map((job) => (
                    <div key={job.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-[#112664] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                        {job.company.substring(0,2).toUpperCase()}
                      </div>
                      <h3 className="font-bold text-[15px] text-[#0B173D] truncate">{job.title}</h3>
                      <p className="text-gray-400 text-[13px] mb-3 truncate">{job.company}</p>
                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-1 text-gray-400 text-[12px] font-medium">
                          <MapPin size={14} className="text-[#1E42AC]"/> <span className="truncate">{job.location}</span>
                        </div>
                        <button 
                          onClick={() => navigate(`/jobseeker/joblisting/${job.id}`)}
                          className="text-[#1E42AC] text-[12px] font-bold hover:underline"
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION: JELAJAHI LOWONGAN AKTIF */}
            {filteredPublicJobs.length > 0 && (
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h2 className="font-bold text-[18px] text-[#0B173D]">Jelajahi Lowongan Aktif</h2>
                  {filteredPublicJobs.length > 6 && (
                    <button 
                      onClick={() => setShowAllActive(!showAllActive)}
                      className="text-[#1E42AC] text-[13px] font-semibold underline"
                    >
                      {showAllActive ? 'Sembunyikan' : 'Lihat Semua'}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {displayedActive.map((job) => (
                    <div key={job.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-5 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                      <div className="flex gap-3 mb-4">
                        <div className="w-12 h-12 bg-[#112664] rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                          {job.company.substring(0,2).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-bold text-[14px] text-[#0B173D] leading-tight truncate">{job.title}</h3>
                          <p className="text-gray-400 text-[11px] truncate mt-0.5">{job.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-y-2 gap-x-3 text-gray-500 text-[11px] mb-2 font-medium">
                        <span className="flex items-center gap-1"><MapPin size={12} className="text-[#1E42AC]"/> {job.location}</span>
                        <span className="px-2 py-0.5 bg-[#EAECF9] rounded text-[#1E42AC]">{job.level}</span>
                        <span className="px-2 py-0.5 bg-[#EAECF9] rounded text-[#1E42AC]">{job.type}</span>
                      </div>
                      <p className="text-[#0B173D] text-[12px] font-bold mb-4">{job.salary}</p>

                      <div className="mt-auto flex justify-between items-center">
                        <span className="text-[#98BDEA] text-[10px] italic">{job.posted}</span>
                        <button 
                          onClick={() => navigate(`/jobseeker/joblisting/${job.id}`, { state: { jobTitle: job.title } })}
                          className="border border-[#1E42AC] text-[#1E42AC] px-5 py-1.5 rounded-lg shadow-sm text-[12px] font-bold hover:bg-[#1E42AC] hover:text-white transition-all"
                        >
                          Lamar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}