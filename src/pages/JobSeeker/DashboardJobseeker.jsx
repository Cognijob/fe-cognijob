import React from 'react';
import { Search, MapPin, ChevronDown, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardJobseeker() {
  const navigate = useNavigate();
  

  const jobs = [
    { id: 1, title: "Senior Backend Engineer", company: "TechCogni Indonesia", location: "Jakarta", level: "Senior", type: "Full-time", salary: "Rp 18-28 Juta/Bulan", posted: "Dibuka 3 hari lalu" },
    { id: 2, title: "Senior Backend Engineer", company: "TechCogni Indonesia", location: "Jakarta", level: "Senior", type: "Full-time", salary: "Rp 18-28 Juta/Bulan", posted: "Dibuka 3 hari lalu" },
    { id: 3, title: "Senior Backend Engineer", company: "TechCogni Indonesia", location: "Jakarta", level: "Senior", type: "Full-time", salary: "Rp 18-28 Juta/Bulan", posted: "Dibuka 3 hari lalu" },
    { id: 4, title: "Senior Backend Engineer", company: "TechCogni Indonesia", location: "Jakarta", level: "Senior", type: "Full-time", salary: "Rp 18-28 Juta/Bulan", posted: "Dibuka 3 hari lalu" },
    { id: 5, title: "Senior Backend Engineer", company: "TechCogni Indonesia", location: "Jakarta", level: "Senior", type: "Full-time", salary: "Rp 18-28 Juta/Bulan", posted: "Dibuka 3 hari lalu" },
    { id: 6, title: "Senior Backend Engineer", company: "TechCogni Indonesia", location: "Jakarta", level: "Senior", type: "Full-time", salary: "Rp 18-28 Juta/Bulan", posted: "Dibuka 3 hari lalu" },
  ];

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
            placeholder="Cari posisi, skill, atau perusahaan..." 
            className="w-full h-[45px] pl-12 pr-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#112664]"
          />
        </div>

        {/* FILTER SECTION */}
        <div className="text-center mb-6">
          <p className="font-bold text-[15px] mb-3">Filter Lowongan Pekerjaan Berdasarkan:</p>
          <div className="flex justify-center gap-4">
            {['Semua Lokasi', 'Semua Skill', 'Semua Level'].map((filter) => (
              <button key={filter} className="flex items-center justify-between w-[160px] px-4 py-2 bg-white border-1 border-[#1E42AC] rounded-full text-[#1E42AC] font-semibold text-[13px] shadow-sm">
                {filter} <ChevronDown size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* SECTION: DIREKOMENDASIKAN */}
        <div className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-bold text-[18px]">Direkomendasikan Untukmu</h2>
            <button className="text-[#1E42AC] text-[13px] font-semibold underline">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-5 shadow-sm">
                <div className="w-12 h-12 bg-[#112664] rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">TN</div>
                <h3 className="font-bold text-[15px] text-[#0B173D]">{job.title}</h3>
                <p className="text-gray-400 text-[13px] mb-3">{job.company}</p>
                <div className="flex items-center gap-1 text-gray-400 text-[12px]">
                  <MapPin size={14} /> {job.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: JELAJAHI LOWONGAN */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-bold text-[18px]">Jelajahi Lowongan Aktif</h2>
            <button className="text-[#1E42AC] text-[13px] font-semibold underline">Lihat Semua</button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-5 shadow-sm flex flex-col">
                <div className="flex gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#112664] rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">TN</div>
                  <div>
                    <h3 className="font-bold text-[14px] text-[#0B173D] leading-tight">{job.title}</h3>
                    <p className="text-gray-300 text-[11px]">{job.company}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-gray-400 text-[11px] mb-2 font-medium">
                  <span className="flex items-center gap-1"><MapPin size={12}/> {job.location}</span>
                  <span>{job.level}</span>
                  <span>{job.type}</span>
                </div>
                <p className="text-gray-400 text-[11px] font-bold mb-4">{job.salary}</p>

                <div className="mt-auto flex justify-between items-center">
                  <span className="text-[#98BDEA] text-[10px] italic">{job.posted}</span>
                  <button 
                    onClick={() => navigate(`/jobseeker/job/${job.id}`)}
                    className="border-1 border-[#1E42AC] text-[#1E42AC] px-5 py-1 rounded-lg shadow-md text-[12px] font-bold hover:bg-[#1E42AC] hover:text-white transition-all"
                  >
                    Lamar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}