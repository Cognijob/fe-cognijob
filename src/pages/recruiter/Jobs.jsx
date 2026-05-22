import React, { useState, useEffect } from 'react';
import { Eye, Edit3, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchJobs, deleteJob } from '../../services/jobServices';

export default function Jobs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Modal Hapus
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Load data dari API
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const res = await fetchJobs();
        // Backend memberikan data di res.data.data 
        setJobData(res.data.data || []);
      } catch (err) {
        console.error("Gagal memuat lowongan:", err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  // Fungsi hapus ke API
  const confirmDelete = async () => {
    try {
      await deleteJob(selectedJob.jobId);
      // Update state lokal setelah hapus di DB
      setJobData(jobData.filter(j => j.jobId !== selectedJob.jobId));
      setIsModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Gagal menghapus job:", err);
    }
  };

  const openDeleteModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  //mapping
  const getDisplayStatus = (status) => {
    if (status === 'published') return 'Aktif';
    if (status === 'draft') return 'Draft';
    return 'Tutup';
  };

  const filteredData = activeTab === 'Semua' 
    ? jobData 
    : jobData.filter(job => getDisplayStatus(job.status) === activeTab);

  return (
    <div className="p-8 animate-fade-in relative min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B173D]">Job Management</h1>
        <p className="text-gray-500 mt-1">Kelola semua lowongan yang aktif, masih dalam draft, dan sudah berakhir.</p>
      </div>

      <div className="flex gap-8 border-b border-gray-200 mb-6">
        {['Semua', 'Aktif', 'Draft', 'Tutup'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold transition-all ${
              activeTab === tab 
              ? 'border-b-2 border-[#1E42AC] text-[#1E42AC]' 
              : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab} ({tab === 'Semua' ? jobData.length : jobData.filter(j => getDisplayStatus(j.status) === tab).length})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden mb-6">
        {loading ? (
          <div className="p-10 text-center text-gray-500">Memuat data...</div>
        ) : (
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
              {filteredData.map((job) => (
                <tr key={job.jobId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-6 font-bold text-[#0B173D] text-[15px]">{job.title}</td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-lg text-[12px] font-bold text-white shadow-sm
                      ${getDisplayStatus(job.status) === 'Aktif' ? 'bg-[#10B981]' : 
                        getDisplayStatus(job.status) === 'Draft' ? 'bg-[#7B807D]' : 'bg-[#F04E4E]'}
                    `}>
                      {getDisplayStatus(job.status)}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-medium text-gray-500">0 Pelamar</td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => navigate(`/recruiter/jobs/job/${job.jobId}`)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <Eye size={20} className="text-[#0B173D]" />
                      </button>
                      <button
                        onClick={() => navigate(`/recruiter/edit-job/${job.jobId}`, { state: { job } })}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Edit3 size={20} className="text-[#0B173D]" />
                      </button>
                      <button onClick={() => openDeleteModal(job)} className="p-1 hover:bg-red-50 rounded transition-colors group">
                        <Trash2 size={20} className="text-[#EF4444]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL HAPUS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white w-[450px] rounded-[24px] p-8 shadow-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-[#EF4444] rounded-full flex items-center justify-center text-white font-bold text-3xl">!</div>
            </div>
            <h2 className="text-[18px] font-bold text-[#0B173D] mb-2">Hapus lowongan ini?</h2>
              <h3 className="text-[15px] font-light text-[#000000] mb-5 text-left">Kamu akan menghapus lowongan berikut secara permanen: </h3>
            <div className="w-full bg-[#FEE2E2]/50 border border-[#FCA5A5]/30 rounded-xl py-3 px-4 mb-5">
              <h3 className="text-[#B91C1C] font-bold text-[14px]">{selectedJob?.title}</h3>
            </div>
            <div>
              <h3 className="text-[12px] font-light text-[#B4B2A9] mb-7 text-justify ">Tindakan ini tidak dapat dibatalkan. Semua data terkait lowongan pekerjaan ini akan terhapus secara permanen.</h3>
            </div>
            <div className="flex w-full gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-gray-300 rounded-xl text-[14px] font-bold">Batal</button>
              <button onClick={confirmDelete} className="flex-1 py-3 bg-[#B91C1C] text-white rounded-xl text-[14px] font-bold">Hapus Lowongan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}