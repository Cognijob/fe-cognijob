import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Search, Bell, X } from 'lucide-react'

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

  const getBreadcrumbs = () => {
    const breadcrumbMap = {
      'dashboard': 'Dashboard',
      'jobs': 'Job Management',
      'applicants': 'Applicant Management',
      'messages': 'Messages',
      'company-profile': 'Company Profile',
      'settings': 'Settings',
      'create-job': 'Buat Lowongan Baru',
      'edit-job': 'Edit Lowongan',
      'job': 'Detail Lowongan'
    };

    const segments = location.pathname.split('/').filter(x => 
      x && x !== 'recruiter' && !x.toUpperCase().includes('JOB-') && !/^[0-9a-fA-F-]{20,}$/.test(x)
    );

    const activeJobTitle = sessionStorage.getItem("activeJobTitle");
    const activeApplicantId = sessionStorage.getItem("activeApplicantId");

    return (
      <div className="flex items-center">
        <span className="text-[#B4B2A9] font-bold text-[18px]">Recruiter</span>
        
        {/* Breadcrumb 3 Tingkat: Applicant Management > Nama Job > ID Anonim */}
        {location.pathname.includes('/applicant/detail/') ? (
          <span className="flex items-center">
            <span className="mx-2 font-normal text-[18px] text-[#B4B2A9]">&gt;</span>
            <span className="cursor-pointer hover:text-[#0B173D] transition-colors font-bold text-[18px] text-[#B4B2A9]" onClick={() => navigate('/recruiter/applicants')}>Applicant Management</span>
            <span className="mx-2 font-normal text-[18px] text-[#B4B2A9]">&gt;</span>
            <span className="cursor-pointer hover:text-[#0B173D] transition-colors font-bold text-[18px] text-[#B4B2A9]" onClick={() => navigate(-1)}>{activeJobTitle || "Daftar Pelamar"}</span>
            <span className="mx-2 font-normal text-[18px] text-[#B4B2A9]">&gt;</span>
            <span className="text-[#0B173D] font-bold text-[18px]">{activeApplicantId || "Detail"}</span>
          </span>
        ) : location.pathname.includes('/applicants/list/') ? (
          <span className="flex items-center">
            <span className="mx-2 font-normal text-[18px] text-[#B4B2A9]">&gt;</span>
            <span className="cursor-pointer hover:text-[#0B173D] transition-colors font-bold text-[18px] text-[#B4B2A9]" onClick={() => navigate('/recruiter/applicants')}>Applicant Management</span>
            <span className="mx-2 font-normal text-[18px] text-[#B4B2A9]">&gt;</span>
            <span className="text-[#0B173D] font-bold text-[18px]">{activeJobTitle || "Daftar Pelamar"}</span>
          </span>
        ) : (
          segments.map((name, index) => {
            const isLast = index === segments.length - 1;
            const displayName = breadcrumbMap[name.toLowerCase()] || name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
            return (
              <span key={name} className="flex items-center">
                <span className="mx-2 font-normal text-[18px] text-[#B4B2A9]">&gt;</span>
                {isLast ? (
                  <span className="text-[#0B173D] font-bold text-[18px]">{displayName}</span>
                ) : (
                  <span className="cursor-pointer hover:text-[#0B173D] transition-colors font-bold text-[18px] text-[#B4B2A9]" onClick={() => navigate(`/recruiter/${name}`)}>{displayName}</span>
                )}
              </span>
            );
          })
        )}
      </div>
    );
  };

  const renderMenuItem = (item) => {
    const isActive = location.pathname.startsWith(item.path) || 
      (item.path === '/recruiter/jobs' && (location.pathname.includes('edit-job') || location.pathname.includes('job/') || location.pathname.includes('create-job'))) ||
      (item.path === '/recruiter/applicants' && (location.pathname.includes('/applicants/list/') || location.pathname.includes('/applicant/detail/')));
      
    return (
      <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[14px] font-medium ${isActive ? 'bg-[#1E42AC] text-white shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
        <img src={item.icon} alt={item.label} className={`w-5 h-5 object-contain brightness-0 invert transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`} />
        {item.label}
      </Link>
    )
  }

  return (
    <div className="flex w-full min-h-screen bg-[#FBFAFF]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <aside className="w-[260px] bg-[#0B173D] text-white fixed h-full flex flex-col z-50 shadow-xl">
        <div className="h-[80px] px-6 flex flex-col justify-center border-b border-white/10 w-full shrink-0">
          <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/recruiter/dashboard')}>Cogni<span className="text-[#FFFFFF]">Job</span></h1>
        </div>
        <nav className="flex-1 flex flex-col gap-6 overflow-y-auto px-4 py-8 scrollbar-hide">
          <div className="flex flex-col gap-1">
            <h3 className="px-4 text-[11px] font-extrabold text-[#8A95A5] uppercase tracking-widest mb-2">Main Menu</h3>
            {mainMenuItems.map(renderMenuItem)}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="px-4 text-[11px] font-extrabold text-[#8A95A5] uppercase tracking-widest mb-2">Account</h3>
            {accountMenuItems.map(renderMenuItem)}
          </div>
        </nav>
      </aside>

      <main className="flex-1 ml-[260px] min-h-screen flex flex-col">
        <header className="w-full h-[80px] bg-white px-8 flex justify-between items-center border-b border-black/5 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center">{getBreadcrumbs()}</div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/recruiter/create-job')} className="px-5 h-10 bg-[#0B173D] text-white font-semibold text-[13px] rounded-full hover:bg-[#1E42AC] transition-all flex items-center gap-2 shadow-md shadow-[#0B173D]/20">
              <span className="text-lg">+</span> Buat job
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-[#FBFAFF]"><Outlet /></div>
      </main>
    </div>
  )
}