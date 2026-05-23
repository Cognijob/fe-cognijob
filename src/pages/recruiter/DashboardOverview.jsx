import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchJobs } from '../../services/jobServices';

export default function DashboardOverview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs();
        
        const allJobs = Array.isArray(response) ? response : (response?.data?.data || response?.data || []);
        
        const activeOnly = allJobs.filter(j => 
            j.status && j.status.toLowerCase() === 'published'
        );
        
        const sortedJobs = [...activeOnly].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setJobs(sortedJobs.slice(0, 5));
      } catch (err) {
        setError("Gagal memuat data lowongan.");
        console.error("Gagal memuat dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* SECTION 1: OVERVIEW */}
        <div className="bg-[#CFD6F0]/40 rounded-[16px] p-6 mb-6 relative border border-black/5">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h2 className="text-[22px] font-bold text-[#0B173D] leading-tight">Overview</h2>
              <p className="text-[14px] text-[#000000]/70 mt-1">Ringkasan aktivitas rekrutmen untuk hari ini</p>
            </div>
            <div className="bg-[#ECEDF1] border border-black/10 px-4 py-1.5 rounded-[8px] text-[13px] font-medium text-[#000000]">
              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Total lowongan aktif" value={jobs.length} />
            <StatCard label="Pelamar baru" value="0" />
            <StatCard label="Perlu direview" value="0" />
            <StatCard label="Total diterima bulan ini" value="0" />
          </div>
        </div>

        {/* SECTION 2: PIPELINE STATUS */}
        <div className="bg-[#E6CCEF]/40 rounded-[16px] p-6 mb-6 border border-black/5">
          <div className="mb-5">
            <h2 className="text-[22px] font-bold text-[#0B173D] leading-tight">Pipeline Status</h2>
            <p className="text-[14px] text-[#000000]/70 mt-1">Status kandidat</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Lamaran Masuk" value="0" />
            <StatCard label="Telah diriview" value="0" />
            <StatCard label="Diterima" value="0" />
            <StatCard label="Ditolak" value="0" />
          </div>
        </div>

        {/* SECTION 3: JOB TERBARU */}
        <div className="bg-[#DFD9F3]/40 rounded-[16px] p-6 mt-8 border border-black/5">
          <div className="mb-5">
            <h2 className="text-[22px] font-bold text-[#0B173D] leading-tight">Job Terbaru</h2>
            <p className="text-[14px] text-[#000000]/70 mt-1">Postingan job yang sedang aktif</p>
          </div>
          
          <div className="flex flex-col gap-3">
            {jobs.length > 0 ? jobs.map((job) => (
              <div 
                key={job.jobId || job.id}
                className="bg-white shadow-sm border border-black/5 px-6 py-4 rounded-[12px] flex justify-between items-center hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shrink-0 bg-[#00D06C]"></div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[16px] text-[#0B173D]">{job.title}</h4>
                    <p className="text-[14px] text-gray-800 font-medium mt-0.5">
                      {job.location} • {job.employmentType || 'Full-time'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="border border-[#00D06C] text-[#00D06C] px-4 py-1.5 rounded-full text-[13px] font-semibold bg-white">
                    Aktif
                  </div>
                  <button
                    onClick={() => navigate(`/recruiter/jobs/job/${job.jobId || job.id}`)}
                    className="bg-[#1D42AC] text-white px-6 py-1.5 rounded-full text-[14px] font-semibold hover:bg-[#153285] transition-colors"
                  >
                    Buka
                  </button>
                </div>
              </div>
            )) : (
                <p className="text-gray-500 text-sm">Tidak ada lowongan aktif saat ini.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#DFD9F3] p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
      <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">{label}</p>
      <h3 className="text-[28px] font-bold text-[#0B173D]">{value}</h3>
    </div>
  );
}