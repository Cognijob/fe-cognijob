import React, { useState } from 'react';
import { Search, Eye, Edit3, Trash2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Jobs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Semua');
  
  // State untuk Modal Hapus
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Data dummy
  const [jobData, setJobData] = useState([
    { id: 'JOB-01', title: 'Senior Backend Engineer', status: 'Aktif', applicants: 7, type: 'Data • Hybrid' },
    { id: 'JOB-02', title: 'Product Designer (Mid-level)', status: 'Aktif', applicants: 12, type: 'Design • Remote' },
    { id: 'JOB-03', title: 'Data Analyst', status: 'Draft', applicants: 34, type: 'Data • On-site' },
    { id: 'JOB-04', title: 'Product Designer (Mid-level)', status: 'Tutup', applicants: 12, type: 'Design • Hybrid' },
  ]);

  // Fungsi buka modal
  const openDeleteModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Fungsi hapus
  const confirmDelete = () => {
    setJobData(jobData.filter(j => j.id !== selectedJob.id));
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const filteredData = activeTab === 'Semua' 
    ? jobData 
    : jobData.filter(job => job.status === activeTab);

  return (
    <div className="p-8 animate-fade-in relative min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0B173D]">Job Management</h1>
        <p className="text-gray-500 mt-1">Kelola semua lowongan yang aktif, masih dalam draft, dan sudah berakhir.</p>
      </div>

      {/* Tabs Filter */}
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
            {tab} ({tab === 'Semua' ? jobData.length : jobData.filter(j => j.status === tab).length})
          </button>
        ))}
      </div>

      {/* Table Container */}
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
            {filteredData.map((job) => (
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
                <td className="px-8 py-6 font-medium text-gray-500">{job.applicants} Pelamar</td>
                <td className="px-8 py-6">
                  <div className="flex justify-center gap-4">
                    <button onClick={() => navigate(`/recruiter/jobs/job/${job.id}`)} className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <Eye size={20} className="text-[#0B173D]" />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/recruiter/edit-job/${job.id}`, {
                          state: { job },
                        })
                      }
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
      </div>

      {/*  Footer */}
      <div className="flex justify-between items-center px-2">
        <p className="text-[13px] text-gray-400">
          Menampilkan {filteredData.length} dari {jobData.length} lowongan pekerjaan.
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

      {/* MODAL HAPUS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white w-[450px] rounded-[24px] p-8 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            {/* Icon Alert */}
            <div className="w-16 h-16 bg-[#FEE2E2] rounded-full flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-[#EF4444] rounded-full flex items-center justify-center text-white font-bold text-3xl">!</div>
            </div>
            
            <h2 className="text-[18px] font-bold text-[#0B173D] mb-2">Hapus lowongan pekerjaan ini?</h2>
            <p className="text-[14px] text-gray-500 mb-6 px-4">Kamu akan menghapus lowongan berikut secara permanen:</p>
            
            {/* Detail Job Box */}
            <div className="w-full bg-[#FEE2E2]/50 border border-[#FCA5A5]/30 rounded-xl py-3 px-4 mb-6">
              <h3 className="text-[#B91C1C] font-bold text-[14px]">{selectedJob?.title}</h3>
              <p className="text-[#B91C1C] text-[11px] opacity-70 mt-0.5">{selectedJob?.type} • {selectedJob?.status}</p>
            </div>

            <p className="text-[11px] text-gray-400 mb-8 px-6">Tindakan ini tidak dapat dibatalkan. Semua data terkait lowongan pekerjaan ini akan terhapus secara permanen.</p>
            
            {/* Action Buttons */}
            <div className="flex w-full gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl text-[14px] font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 bg-[#B91C1C] text-white rounded-xl text-[14px] font-bold hover:bg-[#991B1B] transition-shadow shadow-lg shadow-red-200"
              >
                Hapus Lowongan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}