import { Outlet, Link, useLocation } from 'react-router-dom'

export default function RecruiterLayout() {
  const location = useLocation()

  // Daftar menu sesuai requirement
  const menuItems = [
    { path: '/recruiter/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/recruiter/jobs', label: 'Job Management', icon: '💼' },
    { path: '/recruiter/applicants', label: 'Applicant Management', icon: '👥' },
    { path: '/recruiter/messages', label: 'Messages', icon: '✉️' },
    { path: '/recruiter/company-profile', label: 'Company Profile', icon: '🏢' },
    { path: '/recruiter/settings', label: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="flex w-full min-h-screen bg-[#FBFAFF] font-poppins">
      
      {/* SIDEBAR (FIXED) */}
      <aside className="w-[260px] bg-[#0B173D] text-white fixed h-full flex flex-col pt-8 pb-8 px-4">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold text-white">Cogni<span className="text-[#1E42AC]">Job</span></h1>
          <p className="text-xs text-white/50 mt-1">Recruiter Panel</p>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => {
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
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Tombol Logout (Opsional untuk sekarang) */}
        <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#EF4444] hover:bg-[#EF4444]/10 transition-all mt-auto text-left">
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-[260px] p-8">
        <div className="max-w-[1000px] mx-auto">
          {/* <Outlet /> adalah tempat komponen halaman dirender oleh React Router */}
          <Outlet /> 
        </div>
      </main>

    </div>
  )
}