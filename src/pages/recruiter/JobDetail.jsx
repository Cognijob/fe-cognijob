import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobDetail } from '../../services/jobServices';

export default function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getJobDetail(id);
        // strukturnya { success: true, data: {...} }
        setJob(response.data.data || response.data); 
      } catch (err) {
        console.error("Gagal memuat detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;
  if (!job) return <div className="p-10 text-center">Data tidak ditemukan.</div>;

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B173D]">Informasi Lowongan Pekerjaan</h1>
          <p className="text-[15px] text-[#0B173D]/80 mt-1">Lihat detail informasi lowongan yang telah kamu buat.</p>
        </div>

        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-black/5 mb-8">
          <h2 className="text-[22px] font-bold text-[#0B173D] mb-1">{job.title}</h2>
          <p className="text-sm text-gray-400 font-medium mb-4">{job.location} • {job.employmentType}</p>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-8 border-b border-gray-100 pb-8">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Lokasi</p>
              <p className="text-[15px] font-bold text-[#0B173D]">{job.location}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Tipe Pekerjaan</p>
              <p className="text-[15px] font-bold text-[#0B173D]">{job.employmentType}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Rentang Gaji</p>
              <p className="text-[15px] font-bold text-[#0B173D]">{job.salaryRange}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Status</p>
              <p className={`text-[15px] font-bold capitalize ${job.status === 'published' ? 'text-green-500' : job.status === 'draft' ? 'text-gray-500' : 'text-red-500'}`}>
                {job.status}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400 mb-2">Deskripsi Pekerjaan</p>
            <p className="text-[14px] text-[#0B173D]/80 mb-6 text-justify">{job.description}</p>
            
            <p className="text-xs font-medium text-gray-400 mb-2">Requirements</p>
            <p className="text-[14px] text-[#0B173D]/80 text-justify">{job.requirements}</p>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button onClick={() => navigate("/recruiter/jobs")} className="px-10 py-2 rounded-lg border border-[#1E42AC] text-[#1E42AC] font-bold bg-white hover:bg-[#1E42AC] hover:text-white transition-all">
            Kembali
          </button>
          <button onClick={() => navigate(`/recruiter/edit-job/${id}`)} className="px-10 py-2 rounded-lg border border-[#1E42AC] text-[#1E42AC] font-bold bg-white hover:bg-[#1E42AC] hover:text-white transition-all">
            Edit Lowongan
          </button>
        </div>
      </div>
    </div>
  );
}