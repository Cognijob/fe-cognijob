import { useState } from 'react'
import { User, Lock, Sliders, Mail, Megaphone, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')
  
  // --- STATE UNTUK DATA TERSIMPAN (MOCK DATABASE) ---
  const [savedData, setSavedData] = useState({
    fullName: "Marcus Chen",
    email: "MarcusChen@gmail.com",
    password: "CognijobSecret123!", // <-- Password lama tersimpan
    emailNotif: true,
    marketingNotif: false,
  })

  // --- STATE UNTUK FORM DRAFT (YANG SEDANG DIEDIT) ---
  const [formData, setFormData] = useState({ ...savedData })
  
  // --- STATE UNTUK SECURITY ---
  const [isSecurityEditing, setIsSecurityEditing] = useState(false)
  // Confirm password diisi otomatis sama dengan password awal
  const [confirmPassword, setConfirmPassword] = useState(savedData.password) 
  
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  // --- HANDLER FUNGSI ---
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDiscardChanges = () => {
    // Kembalikan semua ke data yang terakhir disimpan
    setFormData({ ...savedData })
    setConfirmPassword(savedData.password)
    setIsSecurityEditing(false)
    setShowNewPw(false)
    setShowConfirmPw(false)
  }

  const handleSaveChanges = () => {
    // Simpan semua data tab Account & Preferences
    setSavedData({ ...formData })
    alert("Perubahan pengaturan berhasil disimpan!")
  }

  const handleUpdateSecurity = () => {
    // Validasi Minimal 12 Karakter
    if (!formData.password || formData.password.length < 12) {
      alert("Password minimal 12 karakter!")
      return
    }
    // Validasi Kesesuaian Password
    if (formData.password !== confirmPassword) {
      alert("Gagal menyimpan! Password dan Confirm Password tidak cocok.")
      return
    }
    
    // Simpan password ke state "database"
    setSavedData(prev => ({ ...prev, password: formData.password }))
    alert("Kredensial keamanan berhasil diperbarui!")
    setConfirmPassword(formData.password)
    setIsSecurityEditing(false)
    setShowNewPw(false)
    setShowConfirmPw(false)
  }

  const toggleEditSecurity = () => {
    if (isSecurityEditing) {
      // Jika batal edit, kembalikan input ke password yang tersimpan
      setFormData(prev => ({ ...prev, password: savedData.password }))
      setConfirmPassword(savedData.password)
      setShowNewPw(false)
      setShowConfirmPw(false)
    }
    setIsSecurityEditing(!isSecurityEditing)
  }

  const scrollToSection = (id) => {
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in font-poppins">
      
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
        {/* PAGE TITLE */}
        <div className="mb-8">
          <h1 className="text-[24px] font-bold text-[#0B173D]">Account Settings</h1>
          <p className="text-[15px] text-[#0B173D]/80 mt-1">
            Atur preferensi, keamanan, dan akun Anda agar proses rekrutmen tetap berjalan dengan standar terbaik.
          </p>
        </div>

        <div className="flex gap-8 items-start relative">
          
          {/* INNER SIDEBAR (STICKY) */}
          <div className="w-[200px] shrink-0 flex flex-col gap-1.5 sticky top-8">
            <button 
              onClick={() => scrollToSection('account')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-[14px] transition-all
                ${activeTab === 'account' ? 'bg-[#EDF0F9] text-[#112664]' : 'text-[#0B173D]/70 hover:bg-gray-100'}
              `}
            >
              <User size={18} /> Account
            </button>
            <button 
              onClick={() => scrollToSection('security')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-[14px] transition-all
                ${activeTab === 'security' ? 'bg-[#EDF0F9] text-[#112664]' : 'text-[#0B173D]/70 hover:bg-gray-100'}
              `}
            >
              <Lock size={18} /> Security
            </button>
            <button 
              onClick={() => scrollToSection('preferences')}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-[14px] transition-all
                ${activeTab === 'preferences' ? 'bg-[#EDF0F9] text-[#112664]' : 'text-[#0B173D]/70 hover:bg-gray-100'}
              `}
            >
              <Sliders size={18} /> Preferences
            </button>
          </div>

          {/* FORMS AREA */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* SECTION 1: Account Identity */}
            <div id="account" className="bg-[#F3EBF7] rounded-[16px] p-7 w-full border border-black/5 scroll-mt-8">
              <h2 className="text-[20px] font-bold text-[#0B173D] mb-1">Account Identity</h2>
              <p className="text-[14px] text-[#000000]/70 mb-6">Perbarui kontak utama dan akses akun workspace Anda.</p>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">FULL NAME</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full bg-white border-none rounded-xl px-4 py-3 text-[14px] font-medium text-[#111C2D] outline-none focus:ring-2 focus:ring-[#1D42AC]/30 shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">EMAIL ADDRESS</label>
                  <input 
                    type="email" 
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-white border-none rounded-xl px-4 py-3 text-[14px] font-medium text-[#111C2D] outline-none focus:ring-2 focus:ring-[#1D42AC]/30 shadow-sm"
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
                  <p className="text-[14px] text-[#000000]/70">Atur kata sandi dan metode login untuk menjaga keamanan dashboard.</p>
                </div>
                <button 
                  onClick={toggleEditSecurity}
                  className="bg-white border border-black/10 text-[#0B173D] px-5 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  {isSecurityEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="flex flex-col gap-4 max-w-[512px]">
                {/* Input Password (Lama & Baru) */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">NEW PASSWORD</label>
                  <div className="relative">
                    <input 
                      type={showNewPw ? "text" : "password"} 
                      disabled={!isSecurityEditing}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className="w-full bg-white border-none rounded-xl px-4 py-3 text-[14px] font-medium text-gray-700 outline-none pr-10 shadow-sm disabled:bg-white/60 disabled:text-gray-400/80"
                    />
                    <button 
                      disabled={!isSecurityEditing}
                      onClick={() => setShowNewPw(!showNewPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D42AC] transition-colors disabled:opacity-50"
                    >
                      {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Input Confirm Password */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">CONFIRM PASSWORD</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPw ? "text" : "password"} 
                      disabled={!isSecurityEditing}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border-none rounded-xl px-4 py-3 text-[14px] font-medium text-gray-700 outline-none pr-10 shadow-sm disabled:bg-white/60 disabled:text-gray-400/80"
                    />
                    <button 
                      disabled={!isSecurityEditing}
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D42AC] transition-colors disabled:opacity-50"
                    >
                      {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">Password must be at least 12 characters and include a symbol.</p>
                </div>

                {/* Tombol Update Credentials (Selalu Tampil Tapi Nonaktif Jika Tidak Mode Edit) */}
                <button 
                  onClick={handleUpdateSecurity}
                  disabled={!isSecurityEditing}
                  className={`w-fit px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all mt-2 shadow-sm
                    ${isSecurityEditing 
                      ? 'bg-[#1D42AC] text-white hover:bg-[#153285] cursor-pointer' 
                      : 'bg-[#1D42AC]/40 text-white/70 cursor-not-allowed'}
                  `}
                >
                  Update Security Credentials
                </button>
              </div>
            </div>

            {/* SECTION 3: Preferences */}
            <div id="preferences" className="bg-[#F0EBFA] rounded-[16px] p-7 w-full border border-black/5 scroll-mt-8">
              <h2 className="text-[20px] font-bold text-[#0B173D] mb-1">Preferences</h2>
              <p className="text-[14px] text-[#000000]/70 mb-6">Atur bagaimana dan kapan Anda menerima pembaruan kandidat serta notifikasi sistem.</p>

              <div className="flex flex-col gap-3">
                <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-black/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#EAE6F9] flex items-center justify-center shrink-0">
                      <Mail className="text-[#3525CD]" size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111C2D] text-[15px]">Email notifications for new applicants</h3>
                      <p className="text-gray-500 text-[13px] mt-0.5">Receive a daily digest of high-score candidate matches.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => handleChange('emailNotif', !formData.emailNotif)}
                    className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer shrink-0 transition-colors duration-300 ${formData.emailNotif ? 'bg-[#3525CD]' : 'bg-[#D8E3FB]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${formData.emailNotif ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 flex items-center justify-between shadow-sm border border-black/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FCEBE1] flex items-center justify-center shrink-0">
                      <Megaphone className="text-[#C65A2C]" size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111C2D] text-[15px]">Marketing & Product Updates</h3>
                      <p className="text-gray-500 text-[13px] mt-0.5">Stay informed about new editorial tools and recruitment trends.</p>
                    </div>
                  </div>
                  <div 
                    onClick={() => handleChange('marketingNotif', !formData.marketingNotif)}
                    className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer shrink-0 transition-colors duration-300 ${formData.marketingNotif ? 'bg-[#3525CD]' : 'bg-[#D8E3FB]'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${formData.marketingNotif ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-5 mt-2 pt-6">
              <button 
                onClick={handleDiscardChanges}
                className="text-[14px] font-semibold text-[#0B173D] hover:text-[#1D42AC] transition-all duration-300"
              >
                Buang Semua Perubahan
              </button>
              <button 
                onClick={handleSaveChanges}
                className="px-6 py-2.5 rounded-lg text-[14px] font-semibold bg-[#1D42AC] text-white hover:bg-[#153285] transition-all duration-300 shadow-md"
              >
                Simpan Semua Perubahan
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}