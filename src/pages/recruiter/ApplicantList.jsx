import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Activity, Check, X, ArrowRight, Loader2 } from 'lucide-react';
import { getJobApplicants } from '../../services/jobServices'; // Gunakan Axios Service

// ─── Pipeline config ──────────────────────────────────────────────────────────
const PIPELINE_STAGES = [
  { key: 'submitted',  label: 'Submitted',  icon: 'S',  color: '#9CA3AF', bg: '#E5E7EB', textColor: '#4B5563' },
  { key: 'reviewed',   label: 'Reviewed',   icon: 'R',  color: '#A78BFA', bg: '#EDE9FE', textColor: '#6D28D9' },
  { key: 'next_stage', label: 'Next Stage', icon: '→',  color: '#FBBF24', bg: '#FEF3C7', textColor: '#92400E' }, // Samakan dengan backend "next_stage"
  { key: 'accepted',   label: 'Accepted',   icon: '✓',  color: '#34D399', bg: '#D1FAE5', textColor: '#065F46' },
  { key: 'rejected',   label: 'Rejected',   icon: '✕',  color: '#F87171', bg: '#FEE2E2', textColor: '#991B1B' },
];

const FILTER_TABS = ['Semua', 'submitted', 'reviewed', 'next_stage', 'accepted', 'rejected'];

const getStatusStyle = (status) => {
  const map = {
    reviewed:     'bg-yellow-100 text-yellow-800 border-yellow-200',
    accepted:     'bg-green-100  text-green-800  border-green-200',
    'next_stage': 'bg-blue-100   text-blue-800  border-blue-200',
    submitted:    'bg-gray-100   text-gray-700  border-gray-200',
    rejected:     'bg-red-100    text-red-700    border-red-200',
  };
  return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-700 border-gray-200';
};

const PipelineCircle = ({ stage, count }) => {
  const isArrow  = stage.key === 'next_stage';
  const isCheck  = stage.key === 'accepted';
  const isCross  = stage.key === 'rejected';

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm"
        style={{ background: stage.bg, color: stage.textColor, border: `1.5px solid ${stage.color}` }}>
        {isArrow && <ArrowRight size={18} />} {isCheck && <Check size={18} />} {isCross && <X size={18} />}
        {!isArrow && !isCheck && !isCross && stage.icon}
      </div>
      <span className="text-[11px] text-gray-500 font-medium">{stage.label}</span>
      <span className="text-[22px] font-bold text-gray-800">{count}</span>
    </div>
  );
};

const ApplicantList = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Semua');

  useEffect(() => {
    const fetchApplicantsData = async () => {
      try {
        setLoading(true);
        // Menggunakan service API terpusat yang sudah mencakup Base URL dan Token
        const response = await getJobApplicants(jobId);
        
        // Membaca array pelamar sesuai struktur dari backend
        const data = response.data?.data?.applicants || response.data?.applicants || [];
        setApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (jobId) {
      fetchApplicantsData();
    }
  }, [jobId]);

  // Logika penyaringan (Filter) berdasarkan status
  const filtered = activeTab === 'Semua' 
    ? applicants 
    : applicants.filter(a => a.recruiterStatus === activeTab);
  
  // Perhitungan jumlah pelamar di tiap tahap
  const stageCounts = PIPELINE_STAGES.reduce((acc, s) => {
    acc[s.key] = applicants.filter(a => a.recruiterStatus === s.key).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#FBFAFF] font-poppins px-6 py-8">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold text-[#0B173D]">Daftar Pelamar</h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#1E42AC]" size={40} /></div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-5 shadow-sm">
            <div className="flex items-center gap-2 mb-6"><Activity size={18} className="text-[#1E42AC]" /><h2 className="font-bold text-gray-800 text-[15px]">Pipeline Status</h2></div>
            <div className="flex items-start gap-0">
              {PIPELINE_STAGES.map((stage, i) => (
                <React.Fragment key={stage.key}>
                  <PipelineCircle stage={stage} count={stageCounts[stage.key] ?? 0} />
                  {i < PIPELINE_STAGES.length - 1 && <div className="flex-none w-6 h-[2px] bg-gray-200 mt-6 self-start" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 mb-4 border-b border-gray-100 pb-3">
            {FILTER_TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} 
                className={`text-[13px] font-semibold pb-1 border-b-2 transition-colors ${activeTab === tab ? 'text-[#1E42AC] border-[#1E42AC]' : 'text-gray-500 border-transparent'}`}>
                {tab.replace('_', ' ').charAt(0).toUpperCase() + tab.replace('_', ' ').slice(1)} ({tab === 'Semua' ? applicants.length : (stageCounts[tab] || 0)})
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[12px] font-semibold text-gray-400 uppercase">Pelamar</th>
                  <th className="px-4 py-4 text-[12px] font-semibold text-gray-400 uppercase">Keahlian Utama</th>
                  <th className="px-4 py-4 text-[12px] font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-4 text-[12px] font-semibold text-gray-400 uppercase text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length > 0 ? (
                  filtered.map((app) => (
                    <tr key={app.applicationId} className="hover:bg-gray-50/60">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-[14px] text-gray-800">{app.name}</div>
                        {app.isAnonymous && <span className="text-[11px] text-gray-400">(Anonim)</span>}
                      </td>
                      <td className="px-4 py-5 text-[13px] text-gray-600 line-clamp-2 max-w-[200px]">
                        {app.skills || 'Belum diisi'}
                      </td>
                      <td className="px-4 py-5">
                        <span className={`px-3 py-1 rounded-full text-[12px] font-semibold border ${getStatusStyle(app.recruiterStatus)}`}>
                          {app.recruiterStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <button onClick={() => {
                          sessionStorage.setItem("activeApplicantId", app.applicationId);
                          navigate(`/recruiter/applicant/detail/${app.applicationId}`);
                        }} className="px-5 py-1.5 bg-[#1E42AC] text-white text-[13px] font-semibold rounded-lg hover:bg-[#112664] transition-colors">
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm">
                      Belum ada pelamar di tahap ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicantList;
