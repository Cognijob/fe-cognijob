export default function CaraKerja() {
  const cards = [
    {
      num: '01',
      title: 'Search Job',
      desc: 'Temukan lowongan kerja yang sesuai dengan keahlian dan minatmu. Filter berdasarkan posisi, lokasi, dan industri secara cepat dan mudah.',
      badge: 'Filter posisi & lokasi',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E42AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      )
    },
    {
      num: '02',
      title: 'Apply Anonymously',
      desc: 'Lamar pekerjaan tanpa khawatir dinilai dari identitasmu. Jenis kelamin, foto, dan atribut sensitif disembunyikan otomatis — hanya kompetensimu yang terlihat.',
      badge: 'Identitas terlindungi',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B5BAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    {
      num: '03',
      title: 'Track Application',
      desc: 'Pantau status lamaranmu secara real-time. Tidak ada lagi menunggu tanpa kepastian — semua proses rekrutmen transparan dan jelas.',
      badge: 'Status real-time',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D94A8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      )
    }
  ]

  return (
    <section 
      id="cara-kerja" 
      className="w-full flex flex-col items-center py-20" 
      style={{ 
        background: 'linear-gradient(180deg, #E6CDEE 25.96%, #D6CDEE 50.48%, #CDD6EE 77.88%)', 
        fontFamily: 'Poppins' 
      }}
    >
      <div className="w-full max-w-[1280px] px-16">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-[500px]">
            <p className="text-[#000000]/60 uppercase text-[14px] tracking-widest mb-2">Cara Kerja</p>
            <h2 className="text-[32px] font-bold text-[#0B173D] leading-tight">
              Tiga langkah menuju <br/> karier yang lebih <span className="italic text-[#1E42AC]">adil</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-[15px] text-[#000000] leading-relaxed pb-2">
            Menjelaskan alur penggunaan platform secara sederhana — dari pencarian hingga pemantauan lamaran.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-[#F4F5F8] rounded-[24px] p-8 flex flex-col justify-between shadow-sm border border-black/5 relative">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {card.icon}
                  </div>
                  <span className="text-[#000000]/30 font-medium">{card.num}</span>
                </div>
                <h3 className="text-[22px] font-bold text-[#0B173D] mb-3">
                  {card.title.split(' ')[0]} <span className="italic text-[#1E42AC]">{card.title.split(' ')[1]}</span>
                </h3>
                <p className="text-[13px] text-[#000000] leading-[1.6] mb-8">
                  {card.desc}
                </p>
              </div>
              
              <div className="flex items-center gap-2 bg-[#E2E6F2] w-fit px-4 py-2 rounded-full mt-auto">
                <div className="w-2 h-2 rounded-full" style={{ background: idx === 0 ? '#1E42AC' : idx === 1 ? '#6B5BAE' : '#D94A8C' }}></div>
                <span className="text-[11px] font-medium text-[#1E42AC]">{card.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}