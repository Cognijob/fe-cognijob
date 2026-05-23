import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../../services/jobServices";

export default function ApplicantManagement() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Semua");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs();
        const data = Array.isArray(response) ? response : (response?.data?.data || []);
        setJobs(data);
      } catch (err) {
        console.error("Gagal load jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Fungsi untuk menyimpan title ke session dan navigasi
  const handleViewApplicants = (job) => {
    sessionStorage.setItem("activeJobTitle", job.title);
    navigate(`/recruiter/applicants/list/${job.jobId}`);
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === "Semua") return true;
    if (activeFilter === "Aktif") return job.status === "published";
    if (activeFilter === "Draft") return job.status === "draft";
    if (activeFilter === "Tutup") return job.status === "closed";
    return true;
  });

  const counts = {
    Semua: jobs.length,
    Aktif: jobs.filter((j) => j.status === "published").length,
    Draft: jobs.filter((j) => j.status === "draft").length,
    Tutup: jobs.filter((j) => j.status === "closed").length,
  };

  if (loading) return <div className="p-10 text-center">Memuat data...</div>;

  return (
    <div className="p-8 animate-fade-in relative min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B173D]">Applicant Management</h1>
        <p className="text-gray-500 mt-1">Kelola semua pelamar dalam lowongan yang tersedia.</p>
      </div>

      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {Object.keys(counts).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`pb-3 text-sm font-semibold transition-all ${
              activeFilter === tab
                ? "border-b-2 border-[#1E42AC] text-[#1E42AC]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab} ({counts[tab]})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden mb-6">
        <table className="w-full text-left">
          <thead className="bg-[#F0EDFA]">
            <tr className="text-[14px] font-bold text-[#0B173D]">
              <th className="px-8 py-5">Pekerjaan</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.jobId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-[#0B173D] text-[15px]">{job.title}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-lg text-[12px] font-bold text-white ${
                      job.status === "published" ? "bg-[#10B981]" : 
                      job.status === "draft" ? "bg-[#6366F1]" : "bg-[#8A95A5]"
                    }`}>
                      {job.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button
                      onClick={() => handleViewApplicants(job)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Eye size={20} className="text-[#0B173D]" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="px-8 py-10 text-center text-gray-400">Tidak ada data ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}