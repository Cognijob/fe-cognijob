import { useState } from 'react'
import { User, Lock, Sliders, Mail, Megaphone, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')
  
  // --- STATE UNTUK FORM IDENTITY (DISET KOSONG) ---
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  
  // --- STATE UNTUK SECURITY (DISET KOSONG) ---
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  // --- STATE UNTUK PREFERENCES (DISET FALSE) ---
  const [emailNotif, setEmailNotif] = useState(false)
  const [marketingNotif, setMarketingNotif] = useState(false)

  // --- FUNGSI UNTUK RESET DATA ---
  const handleDiscardChanges = () => {
    setFullName("")
    setEmail("")
    setNewPassword("")
    setConfirmPassword("")
    setEmailNotif(false)
    setMarketingNotif(false)
  }

  const scrollToSection = (id) => {
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">
      
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0B173D]">Account Settings</h1>
          <p className="text-[15px] text-[#0B173D]/80 mt-1">
            Atur preferensi, keamanan, dan akun Anda agar proses rekrutmen tetap berjalan dengan standar terbaik.
          </p>
        </div>

        <div className="flex gap-8 items-start relative">
          
          {/* INNER SIDEBAR (STICKY) */}
          <div className="w-[200px] shrink-0 flex flex-col gap-1.5 sticky top-8">
            <button 
              onClick={() => scrollToSection('account')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-[14px] transition-all
                ${activeTab === 'account' ? 'bg-[#EDF0F9] text-[#112664]' : 'text-gray-500 hover:bg-gray-100'}
              `}
            >
              <User size={18} /> Account
            </button>
            <button 
              onClick={() => scrollToSection('security')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-[14px] transition-all
                ${activeTab === 'security' ? 'bg-[#EDF0F9] text-[#112664]' : 'text-gray-500 hover:bg-gray-100'}
              `}
            >
              <Lock size={18} /> Security
            </button>
            <button 
              onClick={() => scrollToSection('preferences')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-[14px] transition-all
                ${activeTab === 'preferences' ? 'bg-[#EDF0F9] text-[#112664]' : 'text-gray-500 hover:bg-gray-100'}
              `}
            >
              <Sliders size={18} /> Preferences
            </button>
          </div>

          {/* FORMS AREA */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* SECTION 1: Account Identity */}
            <div id="account" className="bg-[#F4EBF6] rounded-[16px] p-7 w-full border border-black/5 scroll-mt-8">
              <h2 className="text-[20px] font-bold text-[#0B173D] mb-1">Account Identity</h2>
              <p className="text-[14px] text-[#000000]/70 mb-6">Perbarui kontak utama dan akses akun workspace Anda.</p>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/80 border-none rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#111C2D] outline-none focus:ring-2 focus:ring-[#1D42AC]/30"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/80 border-none rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#111C2D] outline-none focus:ring-2 focus:ring-[#1D42AC]/30"
                  />
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 size={12} className="text-[#3525CD]" />
                    <span className="text-[11px] text-[#3525CD] font-medium">Primary Verified Address</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: Security */}
            <div id="security" className="bg-[#EDF0F9] rounded-[16px] p-7 w-full border border-black/5 scroll-mt-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-[20px] font-bold text-[#0B173D] mb-1">Security</h2>
                  <p className="text-[14px] text-[#000000]/70">Atur kata sandi dan metode login untuk menjaga keamanan.</p>
                </div>
                <button className="bg-white border border-black/20 text-[#1D42AC] px-5 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors">
                  Edit
                </button>
              </div>

              <div className="flex flex-col gap-4 max-w-[512px]">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">New Password</label>
                  <div className="relative">
                    <input 
                      type={showNewPw ? "text" : "password"} 
                      placeholder="Masukkan sandi baru"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white border-none rounded-xl px-4 py-2.5 text-[14px] font-medium text-gray-700 outline-none pr-10"
                    />
                    <button 
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D42AC] transition-colors"
                    >
                      {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPw ? "text" : "password"} 
                      placeholder="Ulangi sandi baru"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border-none rounded-xl px-4 py-2.5 text-[14px] font-medium text-gray-700 outline-none pr-10"
                    />
                    <button 
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D42AC] transition-colors"
                    >
                      {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">Password must be at least 12 characters and include a symbol.</p>
                </div>

                <button className="bg-[#1D42AC] text-white w-fit px-5 py-2.5 rounded-xl text-[14px] font-semibold hover:bg-[#153285] transition-colors mt-2">
                  Update Security Credentials
                </button>
              </div>
            </div>

            {/* SECTION 3: Preferences */}
            <div id="preferences" className="bg-[#F0EBFA] rounded-[16px] p-7 w-full border border-black/5 scroll-mt-8">
              <h2 className="text-[20px] font-bold text-[#0B173D] mb-1">Preferences</h2>
              <p className="text-[14px] text-[#000000]/70 mb-6">Atur bagaimana dan kapan Anda menerima pembaruan kandidat.</p>

              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E2DFFF] flex items-center justify-center shrink-0">
                      <Mail className="text-[#3525CD]" size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111C2D] text-[15px]">Email notifications</h3>
                      <p className="text-gray-500 text-[13px] mt-0.5">Receive a daily digest of new applicants.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => setEmailNotif(!emailNotif)}
                    className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer shrink-0 transition-colors duration-300 ${emailNotif ? 'bg-[#3525CD]' : 'bg-[#D8E3FB]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${emailNotif ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FFDBCC] flex items-center justify-center shrink-0">
                      <Megaphone className="text-[#7E3000]" size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111C2D] text-[15px]">Marketing Updates</h3>
                      <p className="text-gray-500 text-[13px] mt-0.5">Stay informed about new tools and trends.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => setMarketingNotif(!marketingNotif)}
                    className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer shrink-0 transition-colors duration-300 ${marketingNotif ? 'bg-[#3525CD]' : 'bg-[#D8E3FB]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${marketingNotif ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-4 mt-2 pt-6 border-t border-black/10">
              <button 
                onClick={handleDiscardChanges}
                className="px-5 py-2.5 rounded-xl text-[14px] border font-bold bg-white transition-all duration-300 hover:text-white hover:shadow-lg border-red-500 text-red-500 hover:bg-red-500"
             >
                Buang Semua Perubahan
              </button>
              <button className="px-5 py-2.5 rounded-xl text-[14px] font-semibold text-[#1D42AC] border border-[#1D42AC] bg-transparent hover:bg-[#1D42AC] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                Simpan Semua Perubahan
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}