import { useNavigate } from 'react-router-dom'

export default function JobDetail() {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">

      {/* KONTEN UTAMA: Dibatasi 1000px, diletakkan di tengah */}
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* JUDUL HALAMAN */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B173D]">Informasi Lowongan Pekerjaan</h1>
          <p className="text-[15px] text-[#0B173D]/80 mt-1">Lihat detail informasi lowongan yang telah kamu buat.</p>
        </div>

        {/* KARTU DETAIL UTAMA */}
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-black/5 mb-8">
          {/* Judul & Meta */}
          <h2 className="text-[22px] font-bold text-[#0B173D] mb-1">Senior Backend Engineer</h2>
          <p className="text-sm text-gray-400 font-medium mb-4">Jakarta • Full-time • Dibuka 3 hari lalu</p>
          
          {/* Badges Status */}
          <div className="flex gap-3 mb-8">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#10B981] text-white">Aktif</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#6B5BAE] text-white">12 Pelamar</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FACC15] text-white">7 Perlu Review</span>
          </div>

          {/* Info Grid (Detail Ringkas) */}
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

          {/* Deskripsi Lengkap */}
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
                <li>Melakukan code review dan mentoring junior engineers.</li>
              </ol>

              <p className="mb-1 text-gray-400">Kualifikasi:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Minimal S1 Teknik Informatika atau Ilmu Komputer.</li>
                <li>Pengalaman minimal 3 tahun di bidang backend development.</li>
                <li>Mahir menggunakan Node.js, Go, atau Python.</li>
                <li>Memahami konsep REST API dan microservices.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* KARTU BAWAH (PIPELINE STATS) */}
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

        {/* TOMBOL AKSI TAMBAHAN (OPTIONAL) */}
       <div className="flex justify-end gap-4 mt-8">
      <button 
        onClick={() => navigate("/recruiter/jobs")} // Kembali ke halaman sebelumnya
        className= 'px-10 py-2 rounded-lg border border-[#1E42AC] text-[#1E42AC] font-bold bg-white transition-all duration-300 hover:bg-[#1E42AC] hover:text-white hover:shadow-lg'
      >
        Kembali
      </button>
      <button 
        onClick={() => navigate('/recruiter/edit-job/JOB-01')} // Arahkan ke rute edit
        onClick={() => navigate('/recruiter/edit-job/JOB-02')} 
        onClick={() => navigate('/recruiter/edit-job/JOB-03')}
        className= 'px-10 py-2 rounded-lg border border-[#1E42AC] text-[#1E42AC] font-bold bg-white transition-all duration-300 hover:bg-[#1E42AC] hover:text-white hover:shadow-lg'
        >
        Edit Lowongan
      </button>
    </div>

      </div>
    </div>
  )
}