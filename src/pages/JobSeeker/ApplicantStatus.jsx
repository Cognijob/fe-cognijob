import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X,
  Loader2
} from 'lucide-react';
import { fetchApplications } from '../../services/jobseekerServices';

// Konfigurasi Warna Status
const statusStyles = {
  "Submitted": { text: "#4D5EA0", bg: "#C7DAE6", line: "#4D5EA0", bgLight: "rgba(199, 218, 230, 0.5)" }, 
  "Reviewed": { text: "#A0459A", bg: "#DBD6F0", line: "#A0459A", bgLight: "rgba(219, 214, 240, 0.5)" }, 
  "Next Stage": { text: "#6C662F", bg: "#F1E0AD", line: "#6C662F", bgLight: "rgba(241, 224, 173, 0.5)" }, 
  "Accepted": { text: "#328C4A", bg: "#D9ECD6", line: "#328C4A", bgLight: "rgba(217, 236, 214, 0.5)" }, 
  "Rejected": { text: "#942D0D", bg: "#EDAEAE", line: "#942D0D", bgLight: "rgba(237, 174, 174, 0.5)" }, 
};

export default function ApplicantStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeTab, setActiveTab] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const tabNames = ['All', 'Submitted', 'Reviewed', 'Next Stage', 'Accepted', 'Rejected'];
  const stepLabels = ['Submitted', 'Reviewed', 'Next Stage', 'Accepted'];

  // Fetch API pada saat render pertama
  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        const response = await fetchApplications();
        if (response.data && response.data.success) {
          const apiData = response.data.data.applications;
          setApplications(formatApplicationData(apiData));
        }
      } catch (err) {
        console.error("Gagal mengambil data lamaran:", err);
        setError("Gagal memuat status lamaran. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // Fungsi untuk memetakan data API ke format UI (seperti mockup awal)
  const formatApplicationData = (apiApps) => {
    return apiApps.map(app => {
      // Mapping Status Backend ke UI Status
      const statusMap = {
        'applied': 'Submitted',
        'submitted': 'Submitted',
        'reviewed': 'Reviewed',
        'next_stage': 'Next Stage',
        'interview': 'Next Stage',
        'accepted': 'Accepted',
        'rejected': 'Rejected'
      };
      
      const rawStatus = (app.recruiterStatus || app.applicantStatus || 'submitted').toLowerCase();
      const mappedStatus = statusMap[rawStatus] || 'Submitted';

      // Generate inisial perusahaan (Max 2 huruf)
      const companyWords = (app.companyName || "Perusahaan").split(' ');
      const initials = companyWords.slice(0, 2).map(w => w[0]).join('').toUpperCase();

      // Format detail teks
      const details = `${app.jobLocation || 'Remote'} ${app.jobEmploymentType || 'Full-time'}`;

      // Format Tanggal (DD Bulan YYYY)
      const appliedDateObj = new Date(app.appliedAt);
      const appliedDateStr = appliedDateObj.toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      });
      
      // Hitung UpdatedAt relatif simpel (misal ambil tanggal/bulan)
      const updatedDateObj = new Date(app.updatedAt);
      const updatedAtStr = updatedDateObj.toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'short' 
      });

      // Generate pesan alert sesuai status
      let message = "";
      if (mappedStatus === 'Accepted') message = "Selamat! Offer sudah dikirim. Cek detail offer di Messages dan balas secepatnya.";
      else if (mappedStatus === 'Next Stage') message = "Jadwal interview/tahap selanjutnya akan diinformasikan oleh rekruter.";
      else if (mappedStatus === 'Reviewed') message = "Profil kamu sedang dievaluasi. Sedang Dalam Review Recruiter.";
      else if (mappedStatus === 'Submitted') message = "Lamaran Terkirim. Menunggu Review. Rekruter akan menghubungi jika lolos ke tahap berikutnya.";
      else message = "Lamaran Tidak Dilanjutkan. Kamu bisa melamar ke posisi lain jika ada lowongan baru.";

      return {
        id: app.applicationId,
        company: app.companyName,
        title: app.jobTitle,
        initials: initials,
        details: details,
        status: mappedStatus,
        updatedAt: updatedAtStr,
        appliedDate: appliedDateStr,
        location: app.jobLocation,
        bgColor: "#112664", // Default warna kotak inisial
        message: message,
      };
    });
  };

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
    if (tab === 'All') return applications.length;
    return applications.filter(app => app.status === tab).length;
  };

  const tabsWithData = tabNames.map(name => ({
    name: name,
    count: getCount(name)
  }));

  const filteredApps = applications.filter(app => {
    return activeTab === 'All' ? true : app.status === activeTab;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen bg-[#FBFAFF]">
        <Loader2 className="w-10 h-10 animate-spin text-[#1E42AC]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#FBFAFF]">
        <p className="text-[#942D0D] font-bold">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-[#1E42AC] text-white rounded-lg">Coba Lagi</button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 bg-[#FBFAFF] font-['Poppins']">
      
      {/* KONTINER UTAMA */}
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* BAGIAN 1: KOTAK RINGKASAN STATUS */}
        <div className="bg-white border-2 border-[#CDD6EE] rounded-[20px] p-6 mb-8 shadow-sm">
          <h2 className="text-center font-bold text-[15px] text-[#B4B2A9] mb-5">
            Ringkasan Status Semua Lamaran Kamu
          </h2>
          <div className="flex justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#AEC9DA] bg-opacity-50 rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#4D5EA0] mb-2">
                {getCount('Submitted')}
              </div>
              <span className="font-bold text-[11px] text-[#4D5EA0]">Submitted</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#B8ADE3] bg-opacity-40 rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#7E449A] mb-2">
                {getCount('Reviewed')}
              </div>
              <span className="font-bold text-[11px] text-[#7E449A]">Reviewed</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#E3C25D] bg-opacity-40 rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#6C662F] mb-2">
                {getCount('Next Stage')}
              </div>
              <span className="font-bold text-[11px] text-[#6C662F]">Next Stage</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#D9ECD6] rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#328C4A] mb-2">
                {getCount('Accepted')}
              </div>
              <span className="font-bold text-[11px] text-[#328C4A]">Accepted</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-[64px] h-[64px] bg-[#DB5D5D] bg-opacity-40 rounded-[16px] flex items-center justify-center font-bold text-[18px] text-[#942D0D] mb-2">
                {getCount('Rejected')}
              </div>
              <span className="font-bold text-[11px] text-[#942D0D]">Rejected</span>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: TABS NAVIGASI */}
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

        {/* BAGIAN 3: LIST KARTU LAMARAN */}
        <div className="space-y-4">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => {
              const isExpanded = expandedId === app.id;
              const currentStep = getStepIndex(app.status);

              return (
                <div key={app.id} className="bg-white border-2 border-[#CDD6EE] rounded-[20px] overflow-hidden shadow-sm transition-all duration-300">
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

                  {/* EXPANDED ACCORDION: DETAIL PROGRESS BAR & PESAN */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-6 border-t-2 border-[#CDD6EE] animate-fade-in">
                      <div className="relative max-w-[650px] mx-auto mb-10 px-8">
                        <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200"></div>
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

                      <div className="mt-14 w-full max-w-[700px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-white border-2 border-[#CDD6EE] rounded-xl flex flex-col justify-center px-4 py-3 relative shadow-sm">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Dilamar</span>
                          <span className="mt-1 text-[13px] font-bold text-[#0B173D]">{app.appliedDate}</span>
                        </div>
                        <div className="bg-white border-2 border-[#CDD6EE] rounded-xl flex flex-col justify-center px-4 py-3 relative shadow-sm">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            {app.status === 'Next Stage' ? 'Jadwal Interview' : 'Update Terakhir'}
                          </span>
                          <span className="mt-1 text-[13px] font-bold text-[#0B173D]">
                            {app.interview ? app.interview.date : app.updatedAt}
                          </span>
                        </div>
                        <div className="bg-white border-2 border-[#CDD6EE] rounded-xl flex flex-col justify-center px-4 py-3 relative shadow-sm">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">
                            {app.status === 'Next Stage' ? 'Format' : 'Lokasi'}
                          </span>
                          <span className="mt-1 text-[13px] font-bold text-[#0B173D] truncate">
                            {app.interview ? app.interview.type : (app.location || app.title)}
                          </span>
                        </div>
                      </div>

                      <div 
                        className="mt-4 w-full max-w-[700px] mx-auto min-h-[60px] p-4 rounded-xl border-2 flex flex-col justify-center"
                        style={{ backgroundColor: statusStyles[app.status].bgLight, borderColor: statusStyles[app.status].line }}
                      >
                        <h4 className="font-bold text-[13px] mb-1" style={{ color: statusStyles[app.status].line }}>
                          {app.status === 'Accepted' ? 'Selamat! Offer sudah dikirim' : 
                           app.status === 'Next Stage' ? 'Informasi Tahap Selanjutnya' :
                           app.status === 'Reviewed' ? 'Sedang Dalam Review Recruiter' :
                           app.status === 'Submitted' ? 'Lamaran Terkirim. Menunggu Review.' :
                           'Lamaran Tidak Dilanjutkan.'}
                        </h4>
                        <p className="font-medium text-[11px] text-[#0B173D] leading-relaxed">
                          {app.message}
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
