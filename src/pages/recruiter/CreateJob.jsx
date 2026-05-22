import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../services/jobServices';

export default function CreateJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    employmentType: 'Full-time',
    location: '',
    category: 'Engineering', // nilai default
    salaryRange: '',
    status: 'draft'
  });

const handleCreate = async (status) => {
    try {
      const dataToSend = { 
        ...formData, 
        status,
        salaryRange: formData.salaryRange || null 
      };

      console.log("Data yang dikirim:", dataToSend); 
      
      await createJob(dataToSend);

      navigate("/recruiter/jobs");
    } catch (err) {
      // Menangkap detail error dari backend
      const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan";
      console.error("Detail Error Backend:", err.response?.data);
      alert(`Gagal membuat job: ${errorMessage}`);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        <div className="max-w-[850px] mb-8">
          <h1 className="text-2xl font-bold text-[#0B173D]">Buat Job Baru</h1>
          <p className="text-[15px] text-[#0B173D]/80 mt-1">
            Isi detail lowongan. Job akan masuk draft sampai kamu publikasikan.
          </p>
        </div>

        <div className="bg-[#EAECF9] border border-[#EDE8F9] rounded-[20px] p-8 w-full max-w-[850px] mx-auto shadow-sm mb-8">
          <h2 className="text-[20px] font-bold text-[#000000] mb-6">Informasi Lowongan Pekerjaan</h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#0B173D]">Posisi Pekerjaan</label>
              <input 
                type="text" 
                placeholder="Senior Backend Engineer"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white shadow-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#1D42AC]/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#0B173D]">Deskripsi Pekerjaan</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Penjelasan mengenai tanggung jawab, harapan, dan konteks pekerjaan..."
                className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none focus:ring-2 focus:ring-[#1D42AC]/30 min-h-[120px]"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#0B173D]">Kualifikasi/Requirements</label>
              <textarea 
                value={formData.requirements}
                onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                placeholder="Kualifikasi"
                className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none focus:ring-2 focus:ring-[#1D42AC]/30 min-h-[100px]"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-[#0B173D]">Lokasi</label>
                <input 
                  type="text" 
                  placeholder="Jakarta"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none focus:ring-2 focus:ring-[#1D42AC]/30"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-[#0B173D]">Tipe pekerjaan</label>
                <div className="relative">
                  <select 
                    value={formData.employmentType}
                    onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                    className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none focus:ring-2 focus:ring-[#1D42AC]/30 appearance-none cursor-pointer"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-1/2 pr-3">
              <label className="text-[14px] font-semibold text-[#0B173D]">Rentang Gaji (Opsional)</label>
              <input 
                type="text" 
                placeholder="Rp 15-25 juta/bulan"
                value={formData.salaryRange}
                onChange={(e) => setFormData({...formData, salaryRange: e.target.value})}
                className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none focus:ring-2 focus:ring-[#1D42AC]/30"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 max-w-[850px] mx-auto">
          <button onClick={() => handleCreate('published')} 
            className="px-6 py-2.5 rounded-xl bg-[#1D42AC] text-white font-semibold hover:bg-[#15348a] transition-all">
            Publikasikan Lowongan
          </button>
          <button onClick={() => handleCreate('draft')}
            className="px-6 py-2.5 rounded-xl border border-gray-300 bg-white font-semibold hover:bg-gray-50 transition-all">
            Simpan Sebagai Draft
          </button>
        </div>
      </div>
    </div>
  );
}