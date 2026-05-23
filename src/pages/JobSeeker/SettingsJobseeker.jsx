import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { removeToken } from '../../utils/storage'

export default function SettingsJobseeker() {
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 font-poppins relative">

      {/* MODAL LOGOUT */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B173D]/40 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-[400px] rounded-[16px] shadow-2xl p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5">
              <LogOut className="text-[#AD4141]" size={32} />
            </div>
            <h3 className="text-[18px] font-bold text-[#AD4141] mb-2">Logout dari akun?</h3>
            <p className="text-[14px] text-gray-600 font-medium mb-8 leading-relaxed">Anda akan keluar dari dashboard dan perlu login kembali.</p>
            <div className="flex gap-3 w-full">
              <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold text-gray-700 bg-white border border-[#AD4141] hover:bg-red-50 transition-colors">Batal</button>
              <button onClick={handleLogout} className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold bg-[#AD4141] text-white hover:opacity-90 transition-opacity shadow-sm">Ya, Logout</button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        <div className="mb-8">
          <h1 className="text-[24px] font-bold text-[#0B173D]">Settings</h1>
          <p className="text-[15px] text-[#0B173D]/80 mt-1">Kelola pengaturan akun Anda.</p>
        </div>

        {/* SECTION: LOGOUT */}
        <div className="bg-red-50 rounded-[16px] p-7 w-full border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[20px] font-bold text-[#AD4141] mb-1">Logout</h2>
              <p className="text-[14px] text-[#000000]/70">Keluar dari akun Anda di perangkat ini.</p>
            </div>
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold bg-[#AD4141] text-white hover:bg-[#8B3333] transition-all shadow-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
