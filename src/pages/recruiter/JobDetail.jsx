import { useNavigate } from 'react-router-dom'

export default function JobDetail() {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">
      
      {/* 1. HEADER: Full Width, Tinggi 80px agar garis nyambung dengan sidebar */}
      <div className="w-full h-[80px] px-8 flex justify-between items-center border-b border-black/20 shrink-0">
        <div className="text-[18px] font-bold text-[#B4B2A9] flex items-center">
          Recruiter <span className="mx-2 font-normal text-[16px]">&gt;</span> 
          <span className="cursor-pointer hover:text-[#0B173D] transition-colors" onClick={() => navigate('/recruiter/dashboard')}>Dashboard</span> 
          <span className="mx-2 font-normal text-[16px]">&gt;</span> 
          <span className="text-[#0B173D]">Detail Lowongan</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Tombol Search */}
          <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B173D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          {/* Tombol Notifications */}
          <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B173D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          {/* Tombol Buat Job */}
          <button 
            onClick={() => navigate('/recruiter/create-job')}
            className="px-5 h-10 bg-[#FBFAFF] border border-[#0B173D]/30 text-[#0B173D] font-semibold text-[14px] rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <span>+</span> Buat job
          </button>
        </div>
      </div>

      {/* 2. KONTEN UTAMA: Dibatasi 1000px, diletakkan di tengah (Milikmu) */}
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B173D]">Informasi Lowongan Pekerjaan</h1>
          <p className="text-[15px] text-[#0B173D]/80 mt-1">Lihat detail informasi lowongan yang telah kamu buat.</p>
        </div>

        {/* KARTU DETAIL UTAMA */}
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-black/5 mb-8">
          {/* Judul & Meta */}
          <h2 className="text-[22px] font-bold text-[#0B173D] mb-1">Senior Backend Engineer</h2>
          <p className="text-sm text-gray-400 font-medium mb-4">Jakarta • Full-time • Dibuka 3 hari lalu</p>
          
          {/* Badges */}
          <div className="flex gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#10B981] text-white">Aktif</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#6B5BAE] text-white">12 Pelamar</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FACC15] text-white">7 Perlu Review</span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-8 border-b border-gray-100 pb-8">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Lokasi Pekerjaan</p>
              <p className="text-[15px] font-bold text-[#0B173D]">Jakarta</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Tanggal Posting</p>
              <p className="text-[15px] font-bold text-[#0B173D]">12 April 2026</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Tipe Pekerjaan</p>
              <p className="text-[15px] font-bold text-[#0B173D]">Full-time</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Rentang Gaji</p>
              <p className="text-[15px] font-bold text-[#0B173D]">Rp 15-25 juta/bulan</p>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <p className="text-xs font-medium text-gray-400 mb-2">Deskripsi Pekerjaan</p>
            <div className="text-[14px] text-[#0B173D]/80 leading-relaxed font-medium">
              <p className="mb-4">
                Kami mencari Senior Backend Engineer berpengalaman membangun sistem berkinerja tinggi. Kamu akan memimpin arsitektur layanan baru dalam ekosistem fintech kami.
              </p>
              <p className="mb-1 text-gray-400">Responsibilitas:</p>
              <ol className="list-decimal pl-5 mb-4 space-y-1">
                <li>Merancang dan mengimplementasi layanan backend yang scalable.</li>
                <li>Bekerja sama dengan tim Product untuk mendefinisikan solusi teknis.</li>
              </ol>
              <p className="mb-1 text-gray-400">Kualifikasi:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Minimal S1 Teknik Informatika, Ilmu Komputer, atau bidang terkait.</li>
                <li>Pengalaman minimal 3 tahun di bidang backend development.</li>
                <li>Memahami konsep REST API dan microservices.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* KARTU BAWAH (PIPELINE) */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#EBE9F4] p-5 rounded-xl flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#0B173D]/70 font-medium">Lamaran Masuk</p>
            <h3 className="text-[32px] font-bold text-[#0B173D]">12</h3>
          </div>
          <div className="bg-[#EBE9F4] p-5 rounded-xl flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#0B173D]/70 font-medium">Telah Direview</p>
            <h3 className="text-[32px] font-bold text-[#0B173D]">7</h3>
          </div>
          <div className="bg-[#EBE9F4] p-5 rounded-xl flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#0B173D]/70 font-medium">Diterima</p>
            <h3 className="text-[32px] font-bold text-[#0B173D]">1</h3>
          </div>
          <div className="bg-[#EBE9F4] p-5 rounded-xl flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#0B173D]/70 font-medium">Ditolak</p>
            <h3 className="text-[32px] font-bold text-[#0B173D]">6</h3>
          </div>
        </div>

      </div>
    </div>
  )
}