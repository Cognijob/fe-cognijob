import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Search, Bell, X } from 'lucide-react'
import { CloudSync, Copy } from 'lucide-react';

import DashboardIcon from '../../assets/DashboardPages/DashboardIcon.png'
import JobIcon from '../../assets/DashboardPages/JobIcon.png'
import ApplicantIcon from '../../assets/DashboardPages/ApplicantIcon.png'
import EmailIcon from '../../assets/DashboardPages/EmailIcon.png'
import CompanyIcon from '../../assets/DashboardPages/CompanyIcon.png'
import SettingIcon from '../../assets/DashboardPages/SettingIcon.png'

export default function RecruiterLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const mainMenuItems = [
    { path: '/recruiter/dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/recruiter/jobs', label: 'Job Management', icon: JobIcon },
    { path: '/recruiter/applicants', label: 'Applicant Management', icon: ApplicantIcon },
    { path: '/recruiter/messages', label: 'Messages', icon: EmailIcon },
  ]

  const accountMenuItems = [
    { path: '/recruiter/company-profile', label: 'Company Profile', icon: CompanyIcon },
    { path: '/recruiter/settings', label: 'Settings', icon: SettingIcon },
  ]

  // Fungsi untuk mendapatkan nama halaman dari URL (untuk breadcrumb)
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop()
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ')
  }

  const renderMenuItem = (item) => {
    const isActive = location.pathname.startsWith(item.path)
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[14px] font-medium
          ${isActive 
            ? 'bg-[#1E42AC] text-white shadow-md' 
            : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
      >
        <img 
          src={item.icon} 
          alt={item.label} 
          className={`w-5 h-5 object-contain brightness-0 invert transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`} 
        />
        {item.label}
      </Link>
    )
  }

  return (
    <div className="flex w-full min-h-screen bg-[#FBFAFF]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#0B173D] text-white fixed h-full flex flex-col z-20">
        <div className="h-[80px] px-6 flex flex-col justify-center border-b border-white/20 w-full shrink-0">
          <h1 className="text-2xl font-bold text-white leading-none">Cogni<span className="text-[#1E42AC]">Job</span></h1>
          <p className="text-[11px] text-white/50 mt-1 leading-none">Recruiter Panel</p>
        </div>

        <nav className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide px-4 py-8">
          <div className="flex flex-col gap-1">
            <h3 className="px-4 text-[13px] font-bold text-[#8A95A5] uppercase tracking-wide mb-2">Main</h3>
            {mainMenuItems.map(renderMenuItem)}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="px-4 text-[13px] font-bold text-[#8A95A5] uppercase tracking-wide mb-2">Account</h3>
            {accountMenuItems.map(renderMenuItem)}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-[260px] min-h-screen flex flex-col">
        
        {/* HEADER / TOPBAR */}
        <header className="w-full h-[80px] bg-white px-8 flex justify-between items-center border-b border-black/10 sticky top-0 z-10">
          
          {/* BREADCRUMB */}
          <div className="text-[18px] font-bold text-[#B4B2A9] flex items-center">
            Recruiter <span className="mx-2 font-normal text-[16px]">&gt;</span> <span className="text-[#0B173D]">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* SEARCH INTERACTION */}
<div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'bg-gray-100 px-4 py-1 rounded-full border border-[#0B173D]/20 w-[300px]' : ''}`}>
  
  {isSearchOpen && (
    <div className="flex items-center justify-between w-full"> {/* Container Flex Utama */}
      {/* SEARCH INTERACTION CONTAINER */}
      <Search size={24} color="#0B173D"/>
        <input 
          autoFocus
          type="text"
          placeholder="Cari job, kandidat..."
          className="bg-transparent border-none outline-none text-sm text-[#0B173D] w-full ml-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button 
          onClick={() => {
            setSearchQuery(""); // hapus teks saat klik X
            setIsSearchOpen(false);
          }}
          className="ml-2 hover:bg-gray-200 rounded-full p-1 transition-colors"
        >
          <X size={18} color="#0B173D" />
        </button>

      </div>
    )}

    {/* Button Search Awal (saat tertutup) */}
    {!isSearchOpen && (
      <button 
        onClick={() => setIsSearchOpen(true)}
        className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors"
      >
        <Search size={18} color="#0B173D" />
      </button>
    )}
  </div>

            {/* NOTIFICATION */}
            <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
              <Bell size={18} color="#0B173D" />
            </button>

            {/* BUAT JOB BUTTON */}
            <button 
              onClick={() => navigate('/recruiter/jobs')}
              className="px-5 h-10 bg-[#FBFAFF] border border-[#0B173D]/30 text-[#0B173D] font-semibold text-[14px] rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <span className="text-lg">+</span> Buat job
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto">
          <Outlet /> 
        </div>

      </main>
    </div>
  )
}