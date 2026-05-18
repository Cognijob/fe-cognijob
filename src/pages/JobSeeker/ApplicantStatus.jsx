import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X
} from 'lucide-react';

// Data Mockup Persis Gambar (Menggunakan Bahasa Inggris)
const mockApplications = [
  {
    id: 1,
    company: "TechVision Indonesia",
    title: "Senior Backend Engineer",
    initials: "TN",
    details: "Remote Full-time Rp 18-28 juta/bulan",
    status: "Accepted",
    updatedAt: "Hari Ini",
    appliedDate: "12 April 2026",
    bgColor: "#112664",
    message: "Selamat! Offer sudah dikirim. Cek detail offer di Messages dan balas sebelum 29 April 2026."
  },
  {
    id: 2,
    company: "TechVision Indonesia",
    title: "Lead UI/UX Designer",
    initials: "TN",
    details: "Remote Full-time Rp 15-25 juta/bulan",
    status: "Next Stage",
    updatedAt: "2 Mei, 10.00",
    appliedDate: "18 April 2026",
    bgColor: "#112664",
    interview: {
      date: "2 Mei 2026, 10.00",
      type: "Video Call (Google Meet)",
      note: "Via Google Meet. Siapkan portofolio dan pertanyaan teknikal."
    }
  },
  {
    id: 3,
    company: "TechVision Indonesia",
    title: "Data Analyst",
    initials: "TN",
    details: "Jakarta Full-time Rp 10-15 juta/bulan",
    status: "Reviewed",
    updatedAt: "3 Hari Lalu",
    appliedDate: "28 April 2026, 07.45",
    location: "Jakarta",
    bgColor: "#112664",
    message: "Profil kamu sedang dievluasi. Sedang Dalam Review Recruiter."
  },
  {
    id: 4,
    company: "TechVision Indonesia",
    title: "Product Manager",
    initials: "TN",
    details: "Jakarta Full-time Rp 20-30 juta/bulan",
    status: "Submitted",
    updatedAt: "1 Hari Lalu",
    appliedDate: "18 April 2026",
    location: "Jakarta",
    bgColor: "#0D1B47",
    message: "Lamaran Terkirim. Menunggu Review. Rekruter akan menghubungi jika lolos ke tahap berikutnya."
  },
  {
    id: 5,
    company: "TechVision Indonesia",
    title: "Frontend Developer",
    initials: "TN",
    details: "Remote Full-time Rp 12-18 juta/bulan",
    status: "Rejected",
    updatedAt: "1 Hari Lalu",
    appliedDate: "18 April 2026",
    location: "Jakarta",
    bgColor: "#112664",
    message: "Lamaran Tidak Dilanjutkan. Kamu bisa melamar ke posisi lain di TechVision Indonesia jika ada lowongan baru."
  }
];

// Konfigurasi Warna Status
const statusStyles = {
  "Submitted": { text: "#4D5EA0", bg: "#C7DAE6", line: "#4D5EA0", bgLight: "rgba(199, 218, 230, 0.5)" }, 
  "Reviewed": { text: "#A0459A", bg: "#DBD6F0", line: "#A0459A", bgLight: "rgba(219, 214, 240, 0.5)" }, 
  "Next Stage": { text: "#6C662F", bg: "#F1E0AD", line: "#6C662F", bgLight: "rgba(241, 224, 173, 0.5)" }, 
  "Accepted": { text: "#328C4A", bg: "#D9ECD6", line: "#328C4A", bgLight: "rgba(217, 236, 214, 0.5)" }, 
  "Rejected": { text: "#942D0D", bg: "#EDAEAE", line: "#942D0D", bgLight: "rgba(237, 174, 174, 0.5)" }, 
};

export default function ApplicantStatus() {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const tabNames = ['All', 'Submitted', 'Reviewed', 'Next Stage', 'Accepted', 'Rejected'];
  const stepLabels = ['Submitted', 'Reviewed', 'Next Stage', 'Accepted'];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Submitted': return 0;
      case 'Reviewed': return 1;
      case 'Next Stage': return 2;
      case 'Accepted': return 3;
      case 'Rejected': return 3;
      default: return 0;
    }
  };

  const getCount = (tab) => {
    if (tab === 'All') return mockApplications.length;
    return mockApplications.filter(app => app.status === tab).length;
  };

  const tabsWithData = tabNames.map(name => ({
    name: name,
    count: getCount(name)
  }));

  const filteredApps = mockApplications.filter(app => {
    return activeTab === 'All' ? true : app.status === activeTab;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 bg-[#FBFAFF] font-['Poppins']">
      
      {/* KONTINER UTAMA: Disamakan dengan DashboardJobseeker (max-w-[1000px] px-8 pt-8) */}
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* ========================================================
            BAGIAN 1: KOTAK RINGKASAN STATUS
            ======================================================== */}
        <div className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-6 mb-8 shadow-sm">
          <h2 className="text-center font-bold text-[15px] text-[#B4B2A9] mb-5">
            Ringkasan Status Semua Lamaran Kamu
          </h2>
          <div className="flex justify-center gap-4 md:gap-8">
            
            {/* Box 1: Submitted */}
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#AEC9DA] bg-opacity-50 rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#4D5EA0] mb-2">
                {getCount('Submitted')}
              </div>
              <span className="font-bold text-[11px] text-[#4D5EA0]">Submitted</span>
            </div>

            {/* Box 2: Reviewed */}
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#B8ADE3] bg-opacity-40 rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#7E449A] mb-2">
                {getCount('Reviewed')}
              </div>
              <span className="font-bold text-[11px] text-[#7E449A]">Reviewed</span>
            </div>

            {/* Box 3: Next Stage */}
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#E3C25D] bg-opacity-40 rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#6C662F] mb-2">
                {getCount('Next Stage')}
              </div>
              <span className="font-bold text-[11px] text-[#6C662F]">Next Stage</span>
            </div>

            {/* Box 4: Accepted */}
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#D9ECD6] rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#328C4A] mb-2">
                {getCount('Accepted')}
              </div>
              <span className="font-bold text-[11px] text-[#328C4A]">Accepted</span>
            </div>

            {/* Box 5: Rejected */}
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#DB5D5D] bg-opacity-40 rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#942D0D] mb-2">
                {getCount('Rejected')}
              </div>
              <span className="font-bold text-[11px] text-[#942D0D]">Rejected</span>
            </div>

          </div>
        </div>


        {/* ========================================================
            BAGIAN 2: TABS NAVIGASI
            ======================================================== */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-gray-100 overflow-x-auto hide-scrollbar relative">
          {tabsWithData.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  setExpandedId(null);
                }}
                className={`pb-3 text-[14px] md:text-[15px] whitespace-nowrap relative transition-all ${
                  isActive ? 'text-[#1E42AC] font-bold' : 'text-gray-400 font-semibold hover:text-gray-600'
                }`}
              >
                {tab.name} ({tab.count})
                {isActive && (
                  <div className="absolute bottom-[-2px] left-0 w-full h-[3px] bg-[#1E42AC] rounded-t-full"></div>
                )}
              </button>
            );
          })}
        </div>


        {/* ========================================================
            BAGIAN 3: LIST KARTU LAMARAN
            ======================================================== */}
        <div className="space-y-4">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => {
              const isExpanded = expandedId === app.id;
              const currentStep = getStepIndex(app.status);

              return (
                <div key={app.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] overflow-hidden shadow-sm transition-all duration-300">
                  
                  {/* CARD HEADER */}
                  <div 
                    onClick={() => toggleExpand(app.id)}
                    className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-4 items-center">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                        style={{ backgroundColor: app.bgColor }}
                      >
                        {app.initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-[15px] text-[#0B173D] leading-tight">{app.title}</h3>
                        <p className="font-medium text-[13px] text-gray-400 mt-0.5">{app.company}</p>
                        <p className="font-medium text-[11px] text-gray-400 mt-1">{app.details}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between h-[50px]">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-[11px] text-[#C3C1B9]">
                          {app.updatedAt}
                        </span>
                        <div className="text-[#B4B2A9]">
                          {isExpanded ? <ChevronUp size={18} strokeWidth={3} /> : <ChevronDown size={18} strokeWidth={3} />}
                        </div>
                      </div>
                      
                      <div 
                        className="px-3 py-1 rounded-[8px] shadow-sm flex items-center justify-center mt-1"
                        style={{ backgroundColor: statusStyles[app.status].bg }}
                      >
                        <span className="font-bold text-[11px]" style={{ color: statusStyles[app.status].text }}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ========================================================
                      EXPANDED ACCORDION: DETAIL PROGRESS BAR & PESAN
                      ======================================================== */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-6 border-t-2 border-[#CDD6EE] animate-fade-in">
                      
                      {/* STEPPER PROGRESS */}
                      <div className="relative max-w-[650px] mx-auto mb-10 px-8">
                        {/* Garis Abu-abu Dasar */}
                        <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200"></div>
                        
                        {/* Garis Warna Progres */}
                        <div 
                          className="absolute left-12 top-1/2 -translate-y-1/2 h-[2px] transition-all duration-500"
                          style={{ 
                            width: `calc(${(currentStep / (stepLabels.length - 1)) * 100}% - 3rem)`,
                            backgroundColor: app.status === 'Rejected' ? '#C3C1B9' : statusStyles[app.status].line 
                          }}
                        ></div>

                        <div className="flex justify-between items-center relative z-10">
                          {stepLabels.map((step, idx) => {
                            const isPast = idx < currentStep;
                            const isCurrent = idx === currentStep;
                            const isRejected = app.status === 'Rejected' && isCurrent;

                            return (
                              <div key={step} className="flex flex-col items-center">
                                <div 
                                  className="w-[45px] h-[45px] rounded-full flex items-center justify-center font-bold text-[14px] transition-all"
                                  style={{
                                    backgroundColor: (isPast || isCurrent) && !isRejected ? statusStyles[app.status].bg : '#FFFFFF',
                                    border: isRejected || (!isPast && !isCurrent) ? '2px solid #CDD6EE' : 'none',
                                    color: isRejected ? '#942D0D' : ((isPast || isCurrent) ? statusStyles[app.status].line : 'transparent')
                                  }}
                                >
                                  {isPast ? <Check size={24} color={statusStyles[app.status].line} strokeWidth={3} /> : (isRejected ? <X size={20} color="#942D0D" strokeWidth={3} /> : idx + 1)}
                                </div>
                                <span className="absolute -bottom-7 text-[12px] font-bold whitespace-nowrap text-[#0B173D]">
                                  {step}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3 KOTAK INFO DETAIL (Dibuat responsif Grid) */}
                      <div className="mt-14 w-full max-w-[700px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
                        
                        {/* Kotak 1 */}
                        <div className="bg-white border-2 border-[#CDD6EE] rounded-xl flex flex-col justify-center px-4 py-3 relative shadow-sm">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Dilamar</span>
                          <span className="mt-1 text-[13px] font-bold text-[#0B173D]">{app.appliedDate.split(',')[0]}</span>
                        </div>

                        {/* Kotak 2 */}
                        <div className="bg-white border-2 border-[#CDD6EE] rounded-xl flex flex-col justify-center px-4 py-3 relative shadow-sm">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            {app.status === 'Next Stage' ? 'Jadwal Interview' : (app.status === 'Submitted' ? 'Update Terakhir' : 'Deadline')}
                          </span>
                          <span className="mt-1 text-[13px] font-bold text-[#0B173D]">
                            {app.interview ? app.interview.date : app.appliedDate.split(',')[1] || app.appliedDate}
                          </span>
                        </div>

                        {/* Kotak 3 */}
                        <div className="bg-white border-2 border-[#CDD6EE] rounded-xl flex flex-col justify-center px-4 py-3 relative shadow-sm">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            {app.status === 'Next Stage' ? 'Format' : (app.status === 'Submitted' ? 'Posisi' : 'Lokasi')}
                          </span>
                          <span className="mt-1 text-[13px] font-bold text-[#0B173D] truncate">
                            {app.interview ? app.interview.type : (app.location || app.title)}
                          </span>
                        </div>

                      </div>

                      {/* MESSAGE ALERT BOX */}
                      <div 
                        className="mt-4 w-full max-w-[700px] mx-auto min-h-[60px] p-4 rounded-xl border-2 flex flex-col justify-center"
                        style={{ backgroundColor: statusStyles[app.status].bgLight, borderColor: statusStyles[app.status].line }}
                      >
                        <h4 className="font-bold text-[13px] mb-1" style={{ color: statusStyles[app.status].line }}>
                          {app.status === 'Accepted' ? 'Selamat! Offer sudah dikirim' : 
                           app.status === 'Next Stage' ? `Interview Pada Tanggal ${app.interview.date}` :
                           app.status === 'Reviewed' ? 'Sedang Dalam Review Recruiter' :
                           app.status === 'Submitted' ? 'Lamaran Terkirim. Menunggu Review.' :
                           'Lamaran Tidak Dilanjutkan.'}
                        </h4>
                        <p className="font-medium text-[11px] text-[#0B173D] leading-relaxed">
                          {app.status === 'Next Stage' ? app.interview.note : app.message}
                        </p>
                      </div>

                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white border-2 border-dashed border-[#CDD6EE] rounded-[20px]">
              <p className="font-medium text-[13px] text-gray-500">Belum ada lamaran dengan status "{activeTab}".</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
