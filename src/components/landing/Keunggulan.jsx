export default function Keunggulan() {
  return (
    <section id="keunggulan" className="w-full max-w-[1280px] mx-auto px-16 py-20" style={{ fontFamily: 'Poppins' }}>
      <div className="flex flex-col items-center text-center mb-16">
        <p className="text-[#000000]/60 uppercase text-[14px] tracking-widest mb-4">Keunggulan Platform</p>
        <h2 className="text-[32px] font-bold text-[#0B173D] mb-4">
          Kenapa pilih <span className="text-[#1E42AC]">Cognijob?</span>
        </h2>
        <p className="max-w-[600px] text-[15px] text-[#000000] leading-relaxed">
          Kami menghadirkan nilai utama yang belum ada di platform pencarian kerja lain — rekrutmen yang adil, transparan, dan bebas bias.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-[#F4F5F8] rounded-[24px] p-8 flex flex-col shadow-sm border border-black/5 relative">
          <span className="absolute top-8 right-8 text-[#000000]/30 font-medium">01</span>
          <div className="w-full h-[120px] bg-[#E8EBF5] rounded-xl mb-8 flex items-center justify-center">
            <span className="text-[#1E42AC]/40 font-medium text-sm">Ilustrasi Company Info</span>
          </div>
          <h3 className="text-[22px] font-bold text-[#0B173D] mb-3 leading-tight">
            Company <br/><span className="italic text-[#1E42AC]">Transparency</span>
          </h3>
          <p className="text-[13px] text-[#000000] leading-[1.6] mb-8 flex-1">
            Lihat profil perusahaan secara lengkap sebelum melamar — deskripsi, nilai, budaya kerja, hingga rating dari karyawan atau pelamar sebelumnya.
          </p>
          <div className="flex items-center gap-2 bg-[#E2E6F2] w-fit px-4 py-2 rounded-full mt-auto">
            <div className="w-2 h-2 rounded-full bg-[#1E42AC]"></div>
            <span className="text-[11px] font-medium text-[#1E42AC]">Company info & rating</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#F4F5F8] rounded-[24px] p-8 flex flex-col shadow-sm border border-black/5 relative">
          <span className="absolute top-8 right-8 text-[#000000]/30 font-medium">02</span>
          <div className="w-full h-[120px] bg-[#EAE8F5] rounded-xl mb-8 flex items-center justify-center">
            <span className="text-[#6B5BAE]/40 font-medium text-sm">Ilustrasi Anonymous</span>
          </div>
          <h3 className="text-[22px] font-bold text-[#0B173D] mb-3">
            Anonymous <span className="italic text-[#1E42AC]">Apply</span>
          </h3>
          <p className="text-[13px] text-[#000000] leading-[1.6] mb-8 flex-1">
            Lamar pekerjaan tanpa identitas yang terlihat. Foto, gender, dan atribut sensitif disembunyikan otomatis — hanya kompetensimu yang dinilai recruiter.
          </p>
          <div className="flex items-center gap-2 bg-[#EBE8F2] w-fit px-4 py-2 rounded-full mt-auto">
            <div className="w-2 h-2 rounded-full bg-[#6B5BAE]"></div>
            <span className="text-[11px] font-medium text-[#6B5BAE]">Identitas terlindungi</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#F4F5F8] rounded-[24px] p-8 flex flex-col shadow-sm border border-black/5 relative">
          <span className="absolute top-8 right-8 text-[#000000]/30 font-medium">03</span>
          <div className="w-full h-[120px] bg-[#F5E8EE] rounded-xl mb-8 flex items-center justify-center">
            <span className="text-[#D94A8C]/40 font-medium text-sm">Ilustrasi Fair Hiring</span>
          </div>
          <h3 className="text-[22px] font-bold text-[#0B173D] mb-3">
            Fair <span className="italic text-[#1E42AC]">Hiring</span>
          </h3>
          <p className="text-[13px] text-[#000000] leading-[1.6] mb-8 flex-1">
            Proses rekrutmen yang dirancang untuk mengurangi bias gender, etnis, dan penampilan — memberi setiap kandidat peluang yang benar-benar setara.
          </p>
          <div className="flex items-center gap-2 bg-[#F2E8EB] w-fit px-4 py-2 rounded-full mt-auto">
            <div className="w-2 h-2 rounded-full bg-[#D94A8C]"></div>
            <span className="text-[11px] font-medium text-[#D94A8C]">Reduce bias rekrutmen</span>
          </div>
        </div>
      </div>
    </section>
  )
}