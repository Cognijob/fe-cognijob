import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LockIconImg from '../assets/AuthPages/LockIcon.png'
import EmailIconImg from '../assets/AuthPages/EmailIcon.png'

// Gradient dan styling bawaan
const bgGradient = 'linear-gradient(180deg, #E6CDEE 25.96%, #D6CDEE 50.48%, #CDD6EE 77.88%)'

const cardStyle = {
  background: '#EBECF0',
  border: '1px solid rgba(0,0,0,0.5)',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  borderRadius: '20px',
}

const inputStyle = {
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  borderRadius: '8px',
  height: '44px',
}

const btnPrimaryStyle = {
  background: '#0B173D',
  borderRadius: '8px',
  height: '44px',
  fontFamily: 'Poppins',
  fontWeight: 500,
  fontSize: '16px',
  color: '#FFFFFF',
}

// Icon Mata (Diambil dari Register.jsx)
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9197A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9197A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

// Komponen InputField yang diperbarui (mendukung rightEl dan hasError)
function InputField({ icon, placeholder, type = 'text', name, value, onChange, rightEl, hasError }) {
  return (
    <div 
      className="flex items-center gap-3 px-4 w-full transition-colors" 
      style={{
        ...inputStyle,
        border: hasError ? '1px solid #EF4444' : '1px solid #CFD6F0' // Border merah jika error
      }}
    >
      {icon && (
        <img src={icon} alt="" width={16} height={16} className="shrink-0 opacity-60" />
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent outline-none w-full"
        style={{ fontFamily: 'Poppins', fontSize: '14px', color: '#333' }}
      />
      {rightEl && rightEl}
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  
  // State manajemen
  const [view, setView] = useState('login') // 'login' | 'forgot'
  const [showPw, setShowPw] = useState(false)
  const [isError, setIsError] = useState(false) // Trigger error status
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (isError) setIsError(false) // Hilangkan error saat user mengetik ulang
  }

  const handleLogin = () => {
    // Simulasi Error (Kamu bisa ubah logika ini sesuai respon backend nanti)
    if (form.email === '' || form.password === '') {
      setIsError(true)
      return
    }
    
    console.log('Logging in with:', form)
    // Logika login sukses ke backend
  }

  const handleResetPassword = () => {
    console.log('Kirim link atur ulang ke:', form.email)
    // Logika kirim email reset password
  }

  return (
    <div
      className="h-screen w-full flex items-center justify-center px-4 relative"
      style={{ background: bgGradient }}
    >
      <div
        className="w-full max-w-[420px] flex flex-col px-10 py-10 relative transition-all"
        style={cardStyle}
      >
        {/* Tombol Back Dinamis */}
        <button
          onClick={() => view === 'forgot' ? setView('login') : navigate('/')}
          className="absolute top-6 left-6 hover:opacity-60 transition-opacity"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0B173D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {view === 'login' ? (
          /* ================= VIEW: SIGN IN ================= */
          <>
            <h2
              className="text-center mt-3 mb-1"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '22px', color: '#000000' }}
            >
              Selamat datang kembali
            </h2>
            <p
              className="text-center mb-8"
              style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px', color: '#000000' }}
            >
              Masuk ke akun CogniJob kamu
            </p>

            <div className="w-full flex flex-col gap-4 mb-2">
              <InputField
                icon={EmailIconImg} 
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                hasError={isError}
              />

              <InputField
                icon={LockIconImg}
                placeholder="Password"
                type={showPw ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                hasError={isError}
                rightEl={
                  <button onClick={() => setShowPw(!showPw)} className="shrink-0 outline-none">
                    {showPw ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                }
              />
            </div>

            {/* Area Pesan Error & Lupa Kata Sandi */}
            <div className="w-full flex justify-between items-center mt-1 mb-8">
              <div style={{ minWidth: '150px' }}>
                {isError && (
                  <span style={{ fontFamily: 'Poppins', fontSize: '11px', color: '#EF4444', fontWeight: 500 }}>
                    Email atau kata sandi salah.
                  </span>
                )}
              </div>
              <span 
                onClick={() => setView('forgot')}
                style={{ fontFamily: 'Poppins', fontSize: '13px', color: '#1E42AC', fontWeight: 500 }} 
                className="hover:underline cursor-pointer"
              >
                Lupa kata sandi?
              </span>
            </div>

            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center hover:opacity-95 transition-all mb-6 active:scale-[0.98]"
              style={btnPrimaryStyle}
            >
              Masuk
            </button>

            <p
              className="text-center"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '13px', color: '#000000' }}
            >
              Belum punya akun?{' '}
              <span 
                onClick={() => navigate('/register')}
                className="cursor-pointer hover:underline" 
                style={{ color: '#1E42AC' }}
              >
                Daftar di sini
              </span>
            </p>
          </>
        ) : (
          /* ================= VIEW: FORGOT PASSWORD ================= */
          <>
            <h2
              className="text-center mt-3 mb-1"
              style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '22px', color: '#000000' }}
            >
              Lupa Kata Sandi?
            </h2>
            <p
              className="text-center mb-8 px-2"
              style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '13px', color: '#000000', lineHeight: '1.5' }}
            >
              Masukkan email untuk menerima link atur ulang kata sandi.
            </p>

            <div className="w-full flex flex-col gap-4 mb-8">
              <InputField
                icon={EmailIconImg} 
                placeholder="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full flex items-center justify-center hover:opacity-95 transition-all mb-6 active:scale-[0.98]"
              style={btnPrimaryStyle}
            >
              Kirim Link Atur Ulang
            </button>

            <p
              className="text-center"
              style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '13px', color: '#1E42AC' }}
            >
              <span 
                onClick={() => setView('login')}
                className="cursor-pointer hover:underline" 
              >
                Masuk di sini
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}