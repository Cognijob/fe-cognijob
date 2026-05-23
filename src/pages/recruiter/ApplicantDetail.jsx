import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2, CheckCircle2, XCircle, ArrowRight, Eye, User, MessageCircle } from 'lucide-react';
import { getApplicantDetail, updateApplicantStatus } from '../../services/jobServices';
import { createConversation } from '../../services/chatServices';

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ─── Fetch Detail ─────────────────────────────────────────────────────────
  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response = await getApplicantDetail(id);
      const data = response.data?.data || response.data;
      setApplicant(data);
    } catch (error) {
      console.error("Error fetching applicant detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    if (id) fetchDetail(); 
  }, [id]);

  // ─── Update Status ────────────────────────────────────────────────────────
  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      await updateApplicantStatus(id, newStatus);
      await fetchDetail(); 
    } catch (error) {
      console.error("Update failed:", error);
      alert(error.response?.data?.message || "Gagal mengubah status pelamar.");
    } finally {
      setUpdating(false);
    }
  };

  // ─── Fitur Chat ke Pelamar ────────────────────────────────────────────────
  const handleStartChat = async () => {
    if (!applicant || applicant.isAnonymous || !applicant.userId) {
      alert("Tidak bisa memulai percakapan karena identitas kandidat masih disembunyikan (Anonim).");
      return;
    }
    try {
      const res = await createConversation({ participantId: applicant.userId });
      const convId = res.data?.data?.conversationId || res.data?.conversationId || res.conversationId;
      if (convId) {
        navigate(`/recruiter/messages/${convId}`);
      }
    } catch (err) {
      console.error("Chat Error:", err);
      alert("Gagal memulai obrolan dengan kandidat.");
    }
  };

  // ─── Helper Render Pengalaman Kerja (Mencegah Crash Object) ───────────────
  const renderWorkExperience = (experienceData) => {
    if (!experienceData) {
      return <p className="text-gray-400 text-[13px] italic">Pelamar tidak mencantumkan pengalaman kerjanya.</p>;
    }

    let expArray = [];
    
    // Cek apakah datanya berupa array asli atau string JSON
    if (Array.isArray(experienceData)) {
      expArray = experienceData;
    } else if (typeof experienceData === 'string') {
      try {
        expArray = JSON.parse(experienceData);
      } catch (e) {
        // Jika hanya teks biasa panjang
        return <p className="text-gray-600 text-[13px] leading-relaxed whitespace-pre-line text-justify">{experienceData}</p>;
      }
    }

    if (!Array.isArray(expArray) || expArray.length === 0) {
      return <p className="text-gray-400 text-[13px] italic">Pelamar tidak mencantumkan pengalaman kerjanya.</p>;
    }

    return (
      <div className="space-y-4">
        {expArray.map((exp, idx) => (
          <div key={exp.id || exp._id || idx} className="border-l-2 border-[#1E42AC] pl-4 py-1">
            <h4 className="font-bold text-[#0B173D] text-[14px]">
              {exp.position || exp.namaPosit || "Posisi Pekerjaan"}
            </h4>
            <p className="text-[#1E42AC] font-semibold text-[13px]">
              {exp.company || exp.perusahaan || "Nama Perusahaan"}
            </p>
            <p className="text-gray-400 text-[12px] mb-1.5 font-medium">
              {exp.period || exp.periode || "Periode"} • {exp.type || exp.tipeKerja || "Tipe"}
            </p>
            {exp.description && (
              <p className="text-gray-600 text-[13px] leading-relaxed text-justify mt-1">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  // ─── Logika Tombol Aksi ───────────────────────────────────────────────────
  const renderActionButtons = () => {
    const status = applicant.recruiterStatus;
    
    if (status === 'accepted' || status === 'rejected') {
      return (
        <div className="text-[13px] font-semibold text-gray-500 text-center py-4 bg-gray-50 rounded-xl border border-gray-100">
          Proses rekrutmen untuk pelamar ini telah selesai.
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {status === 'submitted' && (
          <button 
            disabled={updating} onClick={() => updateStatus('reviewed')}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
          >
            <Eye size={18} /> Tandai Telah Direview
          </button>
        )}
        {status === 'reviewed' && (
          <button 
            disabled={updating} onClick={() => updateStatus('next_stage')}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1E42AC] text-white rounded-xl font-semibold hover:bg-[#112664] transition-colors"
          >
            <ArrowRight size={18} /> Pindah ke Next Stage
          </button>
        )}
        {status === 'next_stage' && (
          <button 
            disabled={updating} onClick={() => updateStatus('accepted')}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            <CheckCircle2 size={18} /> Terima Kandidat
          </button>
        )}
        
        <button 
          disabled={updating} onClick={() => updateStatus('rejected')}
          className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-red-500 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-colors"
        >
          <XCircle size={18} /> Tolak Lamaran
        </button>
      </div>
    );
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FBFAFF]"><Loader2 className="animate-spin text-[#1E42AC]" size={40} /></div>;
  if (!applicant) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500 bg-[#FBFAFF]">Data pelamar tidak ditemukan.</div>;

  const skillsList = typeof applicant.skills === 'string' 
    ? applicant.skills.split(',').filter(Boolean) 
    : Array.isArray(applicant.skills) ? applicant.skills : [];

  return (
    <div className="max-w-6xl font-poppins p-8 bg-[#FBFAFF] min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-[#1E42AC] font-semibold hover:underline text-[13px]">
        <ChevronLeft size={18} /> Kembali ke Daftar
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-5">
              <div className="w-[70px] h-[70px] bg-[#CFD6F0] rounded-full flex items-center justify-center text-[#1E42AC] shrink-0">
                <User size={35} />
              </div>
              <div>
                <h1 className="text-[22px] font-bold text-[#0B173D]">
                  {applicant.name || "Kandidat Anonim"}
                </h1>
                <p className="text-gray-500 text-[13px] font-medium mt-1">
                  Melamar pada: {new Date(applicant.appliedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
            
            {!applicant.isAnonymous && (
              <button 
                onClick={handleStartChat}
                className="w-12 h-12 bg-[#EEF2FF] text-[#1E42AC] rounded-full flex items-center justify-center hover:bg-[#CDD6EE] transition-colors shadow-sm"
                title="Kirim Pesan"
              >
                <MessageCircle size={22} />
              </button>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[16px] text-[#1E42AC] mb-4">Pengalaman Kerja</h3>
              <div className="bg-[#FBFAFF] p-5 rounded-xl border border-gray-100">
                {/* Memanggil fungsi mapping object di sini */}
                {renderWorkExperience(applicant.workExperience)}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-[16px] text-[#1E42AC] mb-3">Keahlian (Skills)</h3>
              {skillsList.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((s, i) => (
                    <span key={i} className="px-4 py-1.5 bg-[#EAECF9] text-[#1E42AC] border border-[#CDD6EE] rounded-lg text-[12px] font-semibold shadow-sm">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-[13px] italic">Tidak ada keahlian yang ditambahkan.</p>
              )}
            </div>

            {applicant.cvUrl && (
              <div className="pt-4 mt-2">
                <a 
                  href={applicant.cvUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center w-[250px] py-3 border-2 border-[#1E42AC] text-[#1E42AC] rounded-xl font-bold text-[14px] hover:bg-[#1E42AC] hover:text-white transition-all shadow-sm"
                >
                  Lihat Dokumen CV (PDF)
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-[16px] text-[#0B173D] mb-5 border-b border-gray-100 pb-3">Status Saat Ini</h3>
            <div className="flex justify-center mb-2">
              <span className="capitalize px-6 py-2 bg-[#EEF2FF] text-[#1E42AC] border border-[#CDD6EE] rounded-full text-[14px] font-bold shadow-sm">
                {applicant.recruiterStatus.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-[16px] text-[#0B173D] mb-5 border-b border-gray-100 pb-3">Tindakan Lanjutan</h3>
            {renderActionButtons()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplicantDetail;