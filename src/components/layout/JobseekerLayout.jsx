import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, User, LayoutGrid, Building2, Mail, BriefcaseBusiness } from 'lucide-react'

export default function JobseekerLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { path: '/jobseeker/joblisting', label: 'Job Listing', icon: <LayoutGrid size={20} /> },
    { path: '/jobseeker/companies', label: 'Companies', icon: <Building2 size={20} /> },
    { path: '/jobseeker/messages', label: 'Messages', icon: <Mail size={20} /> },
    { path: '/jobseeker/status', label: 'Applicant Status', icon: <BriefcaseBusiness size={20} /> },
  ]

  const getBreadcrumbs = () => {
    const breadcrumbMap = {
      'joblisting': 'Job Listing',
      'companies': 'Companies',
      'messages': 'Messages',
      'status': 'Applicant Status',
    };

    const segments = location.pathname.split('/').filter(x => x && x !== 'jobseeker');

    return (
      <div className="flex items-center">
        <span className="text-[#B4B2A9] font-bold text-[18px]">Job Seeker</span>
        {segments.map((name, index) => {
          const isLast = index === segments.length - 1;
          const displayName = breadcrumbMap[name.toLowerCase()] || name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <span key={name} className="flex items-center">
              <span className="mx-2 font-normal text-[18px] text-[#B4B2A9]">&gt;</span>
              {isLast ? (
                <span className="text-[#0B173D] font-bold text-[18px]">{displayName}</span>
              ) : (
                <span 
                  className="cursor-pointer hover:text-[#0B173D] transition-colors font-bold text-[18px] text-[#B4B2A9]"
                  onClick={() => navigate(`/jobseeker/${name}`)}
                >
                  {displayName}
                </span>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FBFAFF]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#0B173D] text-white fixed h-full flex flex-col z-50 shadow-xl">
        <div className="h-[80px] px-6 flex flex-col justify-center border-b border-white/10 w-full shrink-0">
          <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate('/jobseeker/joblisting')}>
            Cogni<span className="text-[#FFFFFF]">Job</span>
          </h1>
        </div>

        <nav className="flex-1 flex flex-col gap-6 overflow-y-auto px-4 py-8 scrollbar-hide">
          <div className="flex flex-col gap-1">
            <h3 className="px-4 text-[11px] font-extrabold text-white/60 uppercase tracking-widest mb-2">Main Menu</h3>
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[14px] font-medium
                    ${isActive 
                      ? 'bg-[#1E42AC]/35 text-white shadow-md border border-white/10' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 ml-[260px] min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="w-full h-[80px] bg-white px-8 flex justify-between items-center border-b border-black/5 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center">
            {getBreadcrumbs()}
          </div>

          <div className="flex items-center gap-3">
            
            <button 
                onClick={() => navigate('/jobseeker/notifications')}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors
                  
                ${location.pathname === '/jobseeker/notifications' 
                  ? 'bg-[#0B173D] border-[#0B173D]' 
                  : 'bg-[#FBFAFF] border-[#0B173D]/20 hover:bg-gray-100'}`}
                >
              <Bell size={18} color="#d4cece " />
            </button>

            <button 
                onClick={() => navigate('/jobseeker/profile')}
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors
                  
                ${location.pathname === '/jobseeker/profile' 
                  ? 'bg-[#0B173D] border-[#0B173D]' 
                  : 'bg-[#FBFAFF] border-[#0B173D]/20 hover:bg-gray-100'}`}
                >
              <User size={18} color="#d4cece " />
            </button>
          </div>
        </header>

        {/* OUTLET */}
        <div className="flex-1 overflow-y-auto bg-[#FBFAFF]">
          <Outlet /> 
        </div>
      </main>
    </div>
  )
}