import { Search, Bell, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CreateJob() {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">
      
      {/* HEADER */}
      <div className="w-full h-[80px] px-8 flex justify-between items-center border-b border-black/20 shrink-0">
        <div className="text-[18px] font-bold text-[#B4B2A9] flex items-center">
          Recruiter <span className="mx-2">&gt;</span> <span className="text-[#0B173D] font-bold">Buat Job</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
            <Search size={18} color="#0B173D" />
          </button>
          <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
            <Bell size={18} color="#0B173D" />
          </button>
          <button 
            onClick={() => navigate('/recruiter/create-job')}
            className="px-5 h-10 bg-[#FBFAFF] border border-[#0B173D]/30 text-[#0B173D] font-semibold text-[14px] rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <span>+</span> Buat job
          </button>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* PAGE TITLE (Ukuran disesuaikan) */}
        <div className="mb-6 max-w-[850px] mx-auto">
          <h1 className="text-2xl font-bold text-[#0B173D]">Buat Job Baru</h1>
          <p className="text-[15px] text-[#0B173D]/80 mt-1">
            Isi detail lowongan. Job akan masuk draft sampai kamu publikasikan.
          </p>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-[#EAECF9] border border-[#EDE8F9] rounded-[20px] p-8 w-full max-w-[850px] mx-auto shadow-sm mb-8">
          
          <h2 className="text-[20px] font-bold text-[#000000] mb-6">Informasi Lowongan Pekerjaan</h2>

          <div className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#0B173D]">Posisi Pekerjaan</label>
              <input 
                type="text" 
                placeholder="Senior Backend Engineer"
                className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#0B173D]">Deskripsi Pekerjaan</label>
              <textarea 
                placeholder="Penjelasan mengenai tanggung jawab, harapan, dan konteks pekerjaan..."
                className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all resize-y min-h-[120px]"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-[#0B173D]">Kualifikasi/Requirements</label>
              <textarea 
                placeholder="Kualifikasi"
                className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all resize-y min-h-[100px]"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-[#0B173D]">Lokasi</label>
                <input 
                  type="text" 
                  placeholder="Jakarta"
                  className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-[#0B173D]">Tipe pekerjaan</label>
                <div className="relative">
                  <select className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none focus:ring-2 focus:ring-[#1D42AC]/30 transition-all appearance-none cursor-pointer">
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
                className="w-full bg-white shadow-sm rounded-lg px-4 py-3 text-[14px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all"
              />
            </div>

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center items-center gap-5 max-w-[850px] mx-auto">
          <button className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-[#1D42AC] border border-[#1D42AC] bg-transparent hover:bg-[#1D42AC] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
            Publikasikan Lowongan
          </button>
          <button className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-[#1D42AC] border border-[#1D42AC] bg-transparent hover:bg-[#1D42AC] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
            Simpan Sebagai Draft
          </button>
        </div>

      </div>
    </div>
  )
}