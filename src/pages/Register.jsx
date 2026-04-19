import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmailIconImg from '../assets/AuthPages/EmailIcon.png'
import LockIconImg from '../assets/AuthPages/LockIcon.png'
import UserIconImg from '../assets/AuthPages/UserIcon.png'
import LocationIconImg from '../assets/AuthPages/LocationIcon.png'
import PhoneIconImg from '../assets/AuthPages/PhoneIcon.png'
import CompanyIconImg from '../assets/AuthPages/Company.png'

const bgGradient = 'linear-gradient(180deg, #E6CDEE 25.96%, #D6CDEE 50.48%, #CDD6EE 77.88%)'

const cardStyle = {
  background: '#EBECF0',
  border: '1px solid rgba(0,0,0,0.5)',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  borderRadius: '20px',
}

const inputStyle = {
  background: '#FFFFFF',
  border: '1px solid #CFD6F0',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  borderRadius: '8px',
  height: '44px',
}

const btnPrimaryStyle = {
  background: '#0B173D',
  borderRadius: '8px',
  height: '48px',
  fontFamily: 'Poppins',
  fontWeight: 500,
  fontSize: '18px',
  color: '#FFFFFF',
}

function InputField({ icon, placeholder, type = 'text', name, value, onChange, rightEl, onKeyDown, inputMode }) {
  return (
    <div className="flex items-center gap-3 px-3 w-full" style={inputStyle}>
      {icon && (
        <img src={icon} alt="" width={18} height={18} className="shrink-0" />
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputMode={inputMode}
        className="flex-1 bg-transparent outline-none"
        style={{ fontFamily: 'Poppins', fontSize: '14px', color: '#9197A8' }}
      />
      {rightEl && rightEl}
    </div>
  )
}

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

export default function Register() {
  const { role } = useParams()
  const navigate = useNavigate()
  const isRecruiter = role === 'recruiter'

  const [showPw, setShowPw] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    whatsapp: '',
    company: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleWhatsappKeyDown = (e) => {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault()
    }
  }

  const handleSubmit = () => {
    console.log('Register as', role, form)
  }

  return (
    <div
      className="h-screen w-full flex items-center justify-center px-4 overflow-hidden"
      style={{ background: bgGradient }}
    >
      {/* Card Utama */}
      <div
        className="relative w-full max-w-md flex flex-col px-8 py-6 max-h-[95vh] overflow-y-auto scrollbar-hide"
        style={cardStyle}
      >
        {/* Tombol Back */}
        <button
          onClick={() => navigate('/register')}
          className="absolute top-6 left-6 hover:opacity-60 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0B173D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Judul */}
        <h2
          className="text-center mt-4 mb-2"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '18px', color: '#000000' }}
        >
          Mari Bergabung dengan CogniJob
        </h2>

        {/* Subtitle */}
        <p
          className="text-center mb-4"
          style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '14px', color: '#000000' }}
        >
          Kamu sedang membuat akun sebagai{' '}
          <strong>{isRecruiter ? 'Recruiter' : 'Job Seeker'}</strong>.
        </p>

        <div className="w-full flex flex-col gap-3 mb-3">
          {!isRecruiter && (
            <>
              <InputField
                icon={UserIconImg}
                placeholder="Nama depan"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
              <InputField
                icon={UserIconImg}
                placeholder="Nama Belakang"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </>
          )}

          <InputField
            icon={EmailIconImg}
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <InputField
            icon={LockIconImg}
            placeholder="Password"
            type={showPw ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            rightEl={
              <button onClick={() => setShowPw(!showPw)} className="shrink-0 outline-none">
                {showPw ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            }
          />

          {/* Khusus Job Seeker */}
          {!isRecruiter && (
            <>
              <InputField
                icon={LocationIconImg}
                placeholder="Masukkan lokasimu (Kota & Provinsi)"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
              <InputField
                icon={PhoneIconImg}
                placeholder="Nomor WhatsApp"
                type="tel"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                onKeyDown={handleWhatsappKeyDown}
                inputMode="numeric"
              />
            </>
          )}

          {/* Khusus Recruiter */}
          {isRecruiter && (
            <InputField
              icon={CompanyIconImg}
              placeholder="Nama Perusahaan"
              name="company"
              value={form.company}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Teks Tambahan */}
        {!isRecruiter && (
          <p
            className="w-full mb-6 text-left"
            style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '12px', color: '#6A6D73', lineHeight: '18px' }}
          >
            Pastikan nomor WhatsApp kamu aktif agar dapat dihubungi oleh pihak perusahaan.
          </p>
        )}

        {/* Tombol Daftar */}
        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center hover:opacity-90 transition-all mb-6 active:scale-[0.98]"
          style={btnPrimaryStyle}
        >
          Daftar
        </button>

        {/* Link Login */}
        <p
          className="text-center"
          style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', color: '#000000' }}
        >
          Sudah punya akun?{' '}
          <a href="/login" className="font-semibold hover:underline" style={{ color: '#1E42AC' }}>
            Masuk di sini
          </a>
        </p>
      </div>
    </div>
  )
}