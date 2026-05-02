import { useState, useEffect } from 'react'
import { User, Lock, Sliders, Mail, Megaphone, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')

  // --- STATE UNTUK FORM IDENTITY ---
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  // --- STATE UNTUK SECURITY ---
  const [isEditingSecurity, setIsEditingSecurity] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  const [pwError, setPwError] = useState("")
  const [pwSuccess, setPwSuccess] = useState("")

  // --- STATE UNTUK PREFERENCES ---
  const [emailNotif, setEmailNotif] = useState(false)
  const [marketingNotif, setMarketingNotif] = useState(false)

  // --- EFEK SCROLL-SPY OTOMATIS ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['account', 'security', 'preferences'];
      // Offset 150px agar mendeteksi bagian tengah layar
      const scrollPosition = window.scrollY + 150; 

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveTab(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FUNGSI SCROLL PRESISI ---
  const scrollToSection = (id) => {
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      // scroll-mt-[100px] di elemen akan membuatnya berhenti pas di bawah header
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // --- FUNGSI UNTUK RESET DATA GLOBAL ---
  const handleDiscardChanges = () => {
    setFullName("")
    setEmail("")
    setIsEditingSecurity(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setEmailNotif(false)
    setMarketingNotif(false)
    setPwError("")
    setPwSuccess("")
  }

  // --- FUNGSI VALIDASI SECURITY ---
  const handleUpdateSecurity = () => {
    setPwError("");
    setPwSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPwError("Semua kolom password wajib diisi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPwError("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    // Jika sukses
    setPwSuccess("Password berhasil diperbarui.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingSecurity(false); // Tutup form edit kembali ke mode view
  }

  const handleCancelSecurity = () => {
    setIsEditingSecurity(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPwError("");
    setPwSuccess("");
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
          
          {/* INNER SIDEBAR (STICKY & NGUKUT SCROLL) */}
          {/* top-[100px] memberikan jarak yang pas dari header atas */}
          <div className="w-[200px] shrink-0 flex flex-col gap-1.5 sticky top-[100px] self-start">
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
            {/* scroll-mt-[100px] membuat scroll berhenti pas di bawah header Navbar */}
            <div id="account" className="bg-[#F4EBF6] rounded-[16px] p-7 w-full border border-black/5 scroll-mt-[100px]">
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
            <div id="security" className="bg-[#EDF0F9] rounded-[16px] p-7 w-full border border-black/5 scroll-mt-[100px]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-[20px] font-bold text-[#0B173D] mb-1">Security</h2>
                  <p className="text-[14px] text-[#000000]/70">Atur kata sandi dan metode login untuk menjaga keamanan dashboard.</p>
                </div>
                
                {/* Tombol Edit hanya muncul jika tidak sedang mode edit */}
                {!isEditingSecurity && (
                  <button 
                    onClick={() => setIsEditingSecurity(true)}
                    className="bg-white border border-black/20 text-[#1D42AC] px-6 py-1.5 rounded-lg text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Edit
                  </button>
                )}
              </div>

              {!isEditingSecurity ? (
                /* ================= VIEW MODE (HANYA 2 FIELD) ================= */
                <div className="flex flex-col gap-4 max-w-[512px] animate-in fade-in duration-300">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">New Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        value="••••••••••••"
                        disabled
                        className="w-full bg-white border-none rounded-xl px-4 py-2.5 text-[14px] font-medium text-gray-400 outline-none pr-10 cursor-not-allowed"
                      />
                      <EyeOff size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">Confirm Password</label>
                    <div className="relative">
                      <input 
                        type="password" 
                        value="••••••••••••"
                        disabled
                        className="w-full bg-white border-none rounded-xl px-4 py-2.5 text-[14px] font-medium text-gray-400 outline-none pr-10 cursor-not-allowed"
                      />
                      <EyeOff size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5">Password must be at least 12 characters and include a symbol.</p>
                  </div>
                  {/* Pesan Sukses jika baru selesai ganti password */}
                  {pwSuccess && <p className="text-[#10B981] text-[12px] font-bold mt-2">{pwSuccess}</p>}
                </div>
              ) : (

                /* ================= EDIT MODE (MUNCUL 3 FIELD) ================= */
                <div className="flex flex-col gap-4 max-w-[512px] animate-in fade-in duration-300">
                  {/* Current Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">Current Password</label>
                    <div className="relative">
                      <input 
                        autoFocus
                        type={showCurrentPw ? "text" : "password"} 
                        placeholder="Masukkan sandi saat ini"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={`w-full bg-white border rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#0B173D] outline-none pr-10 transition-all ${pwError ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-transparent focus:ring-2 focus:ring-[#1D42AC]/30'}`}
                      />
                      <button 
                        onClick={() => setShowCurrentPw(!showCurrentPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D42AC] transition-colors"
                      >
                        {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">New Password</label>
                    <div className="relative">
                      <input 
                        type={showNewPw ? "text" : "password"} 
                        placeholder="Masukkan sandi baru"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`w-full bg-white border rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#0B173D] outline-none pr-10 transition-all ${pwError ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-transparent focus:ring-2 focus:ring-[#1D42AC]/30'}`}
                      />
                      <button 
                        onClick={() => setShowNewPw(!showNewPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D42AC] transition-colors"
                      >
                        {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-[#B4B2A9] uppercase tracking-wider">Confirm Password</label>
                    <div className="relative">
                      <input 
                        type={showConfirmPw ? "text" : "password"} 
                        placeholder="Ulangi sandi baru"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full bg-white border rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#0B173D] outline-none pr-10 transition-all ${pwError ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-transparent focus:ring-2 focus:ring-[#1D42AC]/30'}`}
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

                  {/* Pesan Validasi Error */}
                  {pwError && <p className="text-red-500 text-[12px] font-medium">{pwError}</p>}

                  {/* Tombol Aksi di Mode Edit */}
                  <div className="flex gap-3 mt-2">
                    <button 
                      onClick={handleUpdateSecurity}
                      className="bg-[#1D42AC] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#153285] transition-colors shadow-sm"
                    >
                      Update Security Credentials
                    </button>
                    <button 
                      onClick={handleCancelSecurity}
                      className="bg-white border border-gray-300 text-gray-600 px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SECTION 3: Preferences */}
            <div id="preferences" className="bg-[#F0EBFA] rounded-[16px] p-7 w-full border border-black/5 scroll-mt-[100px]">
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

            {/* ACTION BUTTONS GLOBAL */}
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