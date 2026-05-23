import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2, CheckCircle2, XCircle, Clock, User } from 'lucide-react';
import { createConversation } from '../../services/chatServices';

const handleStartChat = async () => {
  const res = await createConversation(id);
  if (res.success) {
    navigate(`/recruiter/messages/${res.data.conversationId}`);
  }
};

const ApplicantDetail = () => {
  const { id } = useParams(); // Pastikan route menggunakan :id yang merujuk ke applicationId
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ─── Fetch Detail ──────────────────────────────────────────────────────────
  const fetchDetail = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`/api/applications/${id}/detail`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const res = await response.json();
      if (res.success) setApplicant(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ─── Update Status ─────────────────────────────────────────────────────────
  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const token = sessionStorage.getItem("token");
      await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchDetail(); // Refresh data setelah update
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => { fetchDetail(); }, [id]);

  if (loading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin" size={32} /></div>;
  if (!applicant) return <div className="p-8">Data tidak ditemukan.</div>;

  return (
    <div className="max-w-6xl font-poppins p-8 bg-[#FBFAFF] min-h-screen">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm">
        <ChevronLeft size={20} /> Kembali
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-400">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{applicant.name || "Anonymous Candidate"}</h1>
              <p className="text-gray-500 text-sm">Applied at: {new Date(applicant.appliedAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Work Experience</h3>
              <p className="text-gray-600 text-[14px]">{applicant.workExperience || "-"}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {applicant.skills?.split(',').map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-md text-xs font-medium">{s.trim()}</span>
                ))}
              </div>
            </div>
            <a href={applicant.cvUrl} target="_blank" rel="noreferrer" className="block w-full py-3 text-center border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition">
              Lihat Dokumen CV
            </a>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Ubah Status</h3>
            <div className="space-y-3">
              <button 
                disabled={updating}
                onClick={() => updateStatus('accepted')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700"
              >
                <CheckCircle2 size={18} /> Terima
              </button>
              <button 
                disabled={updating}
                onClick={() => updateStatus('rejected')}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700"
              >
                <XCircle size={18} /> Tolak
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-2">Current Status</h3>
            <span className="capitalize px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
              {applicant.recruiterStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;