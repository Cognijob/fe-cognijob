import { Outlet, Link, useLocation } from 'react-router-dom'

// Import Icon dari folder assets
import DashboardIcon from '../../assets/DashboardPages/DashboardIcon.png'
import JobIcon from '../../assets/DashboardPages/JobIcon.png'
import ApplicantIcon from '../../assets/DashboardPages/ApplicantIcon.png'
import EmailIcon from '../../assets/DashboardPages/EmailIcon.png'
import CompanyIcon from '../../assets/DashboardPages/CompanyIcon.png'
import SettingIcon from '../../assets/DashboardPages/SettingIcon.png'

export default function RecruiterLayout() {
  const location = useLocation()

  // Daftar menu yang dipisah berdasarkan kategori "MAIN" dan "ACCOUNT"
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

  // Komponen bantuan untuk merender setiap item menu
  const renderMenuItem = (item) => {
    const isActive = location.pathname.startsWith(item.path)
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
          ${isActive 
            ? 'bg-[#1E42AC] text-white shadow-md' 
            : 'text-white/70 hover:bg-white/10 hover:text-white'
          }`}
      >
        <img 
          src={item.icon} 
          alt={item.label} 
          // Menggunakan brightness-0 invert agar icon yang aslinya gelap berubah menjadi putih
          className={`w-5 h-5 object-contain brightness-0 invert transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`} 
        />
        {item.label}
      </Link>
    )
  }

  return (
    <div className="flex w-full min-h-screen bg-[#FBFAFF] font-poppins">
      
      {/* SIDEBAR (FIXED) */}
      <aside className="w-[260px] bg-[#0B173D] text-white fixed h-full flex flex-col pt-8 pb-8 px-4">
        <div className="mb-8 px-4">
          <h1 className="text-2xl font-bold text-white">Cogni<span className="text-[#1E42AC]">Job</span></h1>
          <p className="text-xs text-white/50 mt-1">Recruiter Panel</p>
        </div>

        <nav className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-hide">
          
          {/* SECTION: MAIN */}
          <div className="flex flex-col gap-1">
            <h3 className="px-4 text-[13px] font-bold text-[#8A95A5] uppercase tracking-wide mb-2">
              Main
            </h3>
            {mainMenuItems.map(renderMenuItem)}
          </div>

          {/* SECTION: ACCOUNT */}
          <div className="flex flex-col gap-1">
            <h3 className="px-4 text-[13px] font-bold text-[#8A95A5] uppercase tracking-wide mb-2">
              Account
            </h3>
            {accountMenuItems.map(renderMenuItem)}
          </div>

        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-[260px] p-8">
        <div className="max-w-[1000px] mx-auto">
          <Outlet /> 
        </div>
      </main>

    </div>
  )
}