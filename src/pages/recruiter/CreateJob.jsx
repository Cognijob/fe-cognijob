import { ChevronDown } from 'lucide-react'

export default function CreateJob() {
  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">
      
      {/* KONTEN UTAMA */}
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* PAGE TITLE */}
        <div className="max-w-[850px]  mb-8 ">
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
          <button onClick={() => navigate("/recruiter/jobs")} 
            className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-[#1D42AC] border border-[#1D42AC] bg-transparent hover:bg-[#1D42AC] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
            Publikasikan Lowongan
          </button>
          <button onClick={() => navigate("/recruiter/jobs")}
            className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-[#1D42AC] border border-[#1D42AC] bg-transparent hover:bg-[#1D42AC] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
            Simpan Sebagai Draft
          </button>
        </div>

      </div>
    </div>
  )
}