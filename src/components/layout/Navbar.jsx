import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  // State untuk melacak section mana yang sedang aktif
  const [activeNav, setActiveNav] = useState('main')

  // Fungsi untuk mendeteksi posisi scroll dan update menu aktif  otomatis
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['main', 'cara-kerja', 'keunggulan', 'faq']
      const scrollPosition = window.scrollY + 100 

      sections.forEach((id) => {
        const element = document.getElementById(id)
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveNav(id)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-[#E6CDEE]/10 px-20 py-5 flex items-center justify-between border-b-1 border-black/50">
      {/* Logo */}
      <div 
        className="font-semibold text-xl cursor-pointer flex items-center" 
        style={{ fontFamily: 'Poppins' }}
        onClick={() => navigate('/')}
      >
        <span className="text-[#0B173D]">Cogni</span>
        <span className="text-[#1E42AC]">Job</span>
      </div>

      {/* Menu Navigasi */}
      <div className="font-semibold flex items-center gap-10">
        {['Main', 'Cara Kerja', 'Keunggulan', 'FAQ'].map((item) => {
          const sectionId = item.toLowerCase().replace(' ', '-')
          const isActive = activeNav === sectionId

          return (
            <a
              key={item}
              href={`#${sectionId}`}
              className={`font-semibold text-[18px] transition-colors ${
                isActive ? 'text-[#1E42AC]' : 'text-[#000000] hover:text-[#1E42AC]'
              }`}
              style={{ fontFamily: 'Poppins' }}
              onClick={() => setActiveNav(sectionId)}
            >
              {item}
            </a>
          )
        })}
      </div>

      {/* Tombol Aksi */}
      <div className="font-thin flex items-center gap-4">
        <button
          onClick={() => navigate('/login')}
          className="font-thin px-8 py-2 rounded-full bg-[#EBECF0] border border-[#1E42AC]/20 text-[#0B173D] font-medium text-[18px] hover:bg-white/85 transition-all"
          style={{ fontFamily: 'Poppins' }}
        >
          Masuk
        </button>
        <button
          onClick={() => navigate('/register')}
          className="font-thin px-8 py-2 rounded-full bg-[#0B173D] text-[#CDD6EE] font-medium text-[18px] hover:opacity-90 transition-all shadow-md"
          style={{ fontFamily: 'Poppins' }}
        >
          Daftar
        </button>
      </div>
    </nav>
  )
}