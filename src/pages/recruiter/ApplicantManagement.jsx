import React, { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight, Activity, ArrowRight, Check, X, MoreHorizontal } from 'lucide-react';

export default function ApplicantManagement() {
  const [view, setView] = useState('list'); 
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Data Dummy 
  const allJobs = [
    { id: 1, title: "Senior Backend Engineer", status: "Aktif", count: 7, location: "Jakarta", type: "Full Time", category: "Engineering" },
    { id: 2, title: "Product Designer (Mid-level)", status: "Aktif", count: 12, location: "Remote", type: "Full Time", category: "Design" },
    { id: 3, title: "Data Analyst", status: "Draft", count: 34, location: "Jakarta", type: "Intern", category: "Data" },
    { id: 4, title: "Product Designer (Mid-level)", status: "Tutup", count: 12, location: "Jakarta", type: "Full Time", category: "Design" },
  ];

  const filteredJobs = allJobs.filter(job => {
    if (activeFilter === 'Semua') return true;
    return job.status === activeFilter;
  });

  const counts = {
    Semua: allJobs.length,
    Aktif: allJobs.filter(j => j.status === 'Aktif').length,
    Draft: allJobs.filter(j => j.status === 'Draft').length,
    Tutup: allJobs.filter(j => j.status === 'Tutup').length,
  };

  const handleOpenDetail = (job) => {
    setSelectedJob(job);
    setView('detail');
  };

  // --- PAGE  LIST  ---
  const ListView = () => (
    <div className="p-8 animate-fade-in relative min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B173D]">Applicant Management</h1>
        <p className="text-gray-500 mt-1">Kelola semua pelamar dalam lowongan yang aktif, masih dalam draft, dan sudah berakhir.</p>
      </div>

      {/* Tabs Filter  */}
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {Object.keys(counts).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`pb-3 text-sm font-semibold transition-all ${
              activeFilter === tab 
              ? 'border-b-2 border-[#1E42AC] text-[#1E42AC]' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* Table Container - Mengikuti style Jobs */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden mb-6">
        <table className="w-full text-left">
          <thead className="bg-[#F0EDFA]">
            <tr className="text-[14px] font-bold text-[#0B173D]">
              <th className="px-8 py-5">Pekerjaan</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Pelamar</th>
              <th className="px-8 py-5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredJobs.length > 0 ? filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-6 font-bold text-[#0B173D] text-[15px]">{job.title}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-lg text-[12px] font-bold text-white shadow-sm
                    ${job.status === 'Aktif' ? 'bg-[#10B981]' : 
                      job.status === 'Draft' ? 'bg-[#6366F1]' : 'bg-[#8A95A5]'}
                  `}>
                    {job.status}
                  </span>
                </td>
                <td className="px-8 py-6 font-medium text-gray-500">{job.count} Pelamar</td>
                <td className="px-8 py-6 text-center">
                  <button 
                    onClick={() => handleOpenDetail(job)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <Eye size={20} className="text-[#0B173D]" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-8 py-20 text-center text-gray-400 italic text-sm">
                  Tidak ada lowongan dengan status {activeFilter}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer - Mengikuti style Jobs */}
      <div className="flex justify-between items-center px-2">
        <p className="text-[13px] text-gray-400">
          Menampilkan {filteredJobs.length} dari {allJobs.length} lowongan pekerjaan.
        </p>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-[#0B173D] transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#1E42AC] text-white rounded-lg text-[13px] font-bold">1</button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-lg text-[13px] font-medium transition-colors">2</button>
          <button className="p-2 text-gray-400 hover:text-[#0B173D] transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  // --- HALAMAN DETAIL ---
  const DetailView = () => (
    <div className="p-8 bg-white min-h-screen font-poppins animate-in fade-in duration-500">
      <button onClick={() => setView('list')} className="text-[14px] text-gray-400 mb-6 flex items-center gap-2 hover:text-[#1E42AC] transition-all">
        <ChevronLeft size={18} /> Kembali ke daftar
      </button>
      
      <h1 className="text-[32px] font-bold text-[#0B173D] mb-1">{selectedJob?.title}</h1>
      <p className="text-gray-400 text-[15px] mb-10 font-medium">
        {selectedJob?.location} • {selectedJob?.type} • {selectedJob?.category}
      </p>

      {/* Pipeline Card */}
      <div className="bg-[#FBFAFF] border border-black/5 rounded-[24px] p-10 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-12 text-[#0B173D]">
          <Activity size={24} strokeWidth={2.5} />
          <span className="text-[18px] font-bold tracking-tight">Pipeline Status Kandidat</span>
          <MoreHorizontal className="ml-auto text-[#BDBDBD] cursor-pointer hover:text-black" />
        </div>

        <div className="flex justify-between items-start relative px-16">
          <div className="absolute top-[24px] left-32 right-32 h-[1.5px] bg-[#E0E0E0] z-0"></div>
          
          {[
            { label: 'Submitted', count: 7, icon: 'S', color: 'bg-[#F2F4FF]', textColor: 'text-[#0B173D]' },
            { label: 'Reviewed', count: 4, icon: 'R', color: 'bg-[#FFF4E5]', textColor: 'text-[#F2994A]' },
            { label: 'Next Stage', count: 2, icon: <ArrowRight size={20} className="text-[#2F80ED]" />, color: 'bg-[#E5F1FF]', textColor: 'text-[#2F80ED]' },
            { label: 'Accepted', count: 1, icon: <Check size={20} className="text-[#27AE60]" />, color: 'bg-[#E3F9E9]', textColor: 'text-[#27AE60]' },
            { label: 'Rejected', count: 0, icon: <X size={20} className="text-[#EB5757]" />, color: 'bg-[#FFE5E5]', textColor: 'text-[#EB5757]' },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center z-10">
              <div className={`w-[48px] h-[48px] ${step.color} rounded-full flex items-center justify-center font-bold text-[18px] mb-3 shadow-sm border border-white`}>
                {step.icon}
              </div>
              <span className="text-[11px] text-[#BDBDBD] font-bold uppercase tracking-wider mb-1">{step.label}</span>
              <span className="text-[28px] font-bold text-[#0B173D]">{step.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#F0F2FF] p-5 rounded-[16px] text-[#5B6AD0] text-[14px] font-medium leading-relaxed border border-[#D9DFFF] mb-10">
        Mode Hiring Anonim - identitas kandidat (nama, foto, gender) disembunyikan untuk mencegah bias seleksi
      </div>

      <div className="flex gap-10 border-b border-gray-100 text-[15px] font-bold text-[#BDBDBD]">
        <button className="text-[#1E42AC] border-b-2 border-[#1E42AC] pb-3">Semua (4)</button>
        <button className="pb-3 hover:text-gray-600 transition-all">Submitted (2)</button>
        <button className="pb-3 hover:text-gray-600 transition-all">Reviewed (1)</button>
        <button className="pb-3 hover:text-gray-600 transition-all">Next Stage (1)</button>
        <button className="pb-3 hover:text-gray-600 transition-all">Accepted (1)</button>
        <button className="pb-3 hover:text-gray-600 transition-all">Rejected (1)</button>
      </div>
    </div>
  );

  return view === 'list' ? <ListView /> : <DetailView />;
}