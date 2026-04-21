import { Search, Bell, ChevronDown } from 'lucide-react'

export default function CreateJob() {
  return (
    <div className="w-full font-poppins animate-fade-in pb-10">
      
      {/* HEADER: Breadcrumb & Actions */}
      <div className="flex justify-between items-center mb-10 mt-2">
        <div className="text-[18px] font-bold text-[#B4B2A9] flex items-center">
          Recruiter <span className="mx-2 font-normal text-[16px]">&gt;</span> <span className="text-[#0B173D]">Buat Job</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
            <Search size={18} color="#0B173D" />
          </button>
          <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
            <Bell size={18} color="#0B173D" />
          </button>
          <button className="px-5 h-10 bg-[#FBFAFF] border border-[#0B173D]/30 text-[#0B173D] font-semibold text-[14px] rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
            <span>+</span> Buat job
          </button>
        </div>
      </div>

      {/* PAGE TITLE */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#0B173D] leading-tight">Buat Job Baru</h1>
        <p className="text-[16px] text-[#000000] mt-1">
          Isi detail lowongan. Job akan masuk draft sampai kamu publikasikan.
        </p>
      </div>

      {/* FORM CONTAINER (Background Abu-abu Kebiruan) */}
      <div className="bg-[#EAECF9] border border-[#EDE8F9] rounded-[20px] p-8 lg:p-10 w-full max-w-[850px] shadow-sm mb-10">
        
        <h2 className="text-[22px] font-bold text-[#000000] mb-8">Informasi Lowongan Pekerjaan</h2>

        <div className="flex flex-col gap-6">
          
          {/* Input: Posisi Pekerjaan */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-bold text-[#000000]">Posisi Pekerjaan</label>
            <input 
              type="text" 
              placeholder="Senior Backend Engineer"
              className="w-full bg-white shadow-sm rounded-[10px] px-5 py-3.5 text-[15px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all"
            />
          </div>

          {/* Textarea: Deskripsi Pekerjaan */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-bold text-[#000000]">Deskripsi Pekerjaan</label>
            <textarea 
              placeholder="Penjelasan mengenai tanggung jawab, harapan, dan konteks pekerjaan..."
              className="w-full bg-white shadow-sm rounded-[10px] px-5 py-3.5 text-[15px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all resize-y min-h-[140px]"
            ></textarea>
          </div>

          {/* Textarea: Kualifikasi/Requirements */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-bold text-[#000000]">Kualifikasi/Requirements</label>
            <textarea 
              placeholder="Kualifikasi"
              className="w-full bg-white shadow-sm rounded-[10px] px-5 py-3.5 text-[15px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all resize-y min-h-[120px]"
            ></textarea>
          </div>

          {/* Grid: Lokasi & Tipe Pekerjaan */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-bold text-[#000000]">Lokasi</label>
              <input 
                type="text" 
                placeholder="Jakarta"
                className="w-full bg-white shadow-sm rounded-[10px] px-5 py-3.5 text-[15px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-bold text-[#000000]">Tipe pekerjaan</label>
              <div className="relative">
                <select className="w-full bg-white shadow-sm rounded-[10px] px-5 py-3.5 text-[15px] text-[#464555] outline-none focus:ring-2 focus:ring-[#1D42AC]/30 transition-all appearance-none cursor-pointer">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          {/* Input: Rentang Gaji */}
          <div className="flex flex-col gap-2 w-1/2 pr-4">
            <label className="text-[16px] font-bold text-[#000000]">Rentang Gaji (Opsional)</label>
            <input 
              type="text" 
              placeholder="Rp 15-25 juta/bulan"
              className="w-full bg-white shadow-sm rounded-[10px] px-5 py-3.5 text-[15px] text-[#464555] outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#1D42AC]/30 transition-all"
            />
          </div>

        </div>
      </div>

      {/* ACTION BUTTONS (Di tengah bawah kotak form) */}
      <div className="flex justify-center items-center gap-6 max-w-[850px]">
        <button className="px-8 py-3 rounded-[10px] font-semibold text-[#1D42AC] border border-[#1D42AC] bg-transparent hover:bg-[#1D42AC] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
          Publikasikan Lowongan
        </button>
        <button className="px-8 py-3 rounded-[10px] font-semibold text-[#1D42AC] border border-[#1D42AC] bg-transparent hover:bg-[#1D42AC] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
          Simpan Sebagai Draft
        </button>
      </div>

    </div>
  )
}