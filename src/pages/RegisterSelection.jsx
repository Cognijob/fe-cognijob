import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jobSeekerImg from "../assets/AuthPages/JobSeeker.png";
import RecruiterImg from '../assets/AuthPages/Recruiter.png';

const bgGradient = 'linear-gradient(180deg, #E6CDEE 25.96%, #D6CDEE 50.48%, #CDD6EE 77.88%)'

const cardStyle = {
  background: '#EBECF0',
  border: '1px solid rgba(0,0,0,0.5)',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  borderRadius: '30px',
}

const roleCardBase = {
  background: '#FFFFFF',
  border: '1px solid #B9C4E5',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  width: '100%' // Memastikan card memenuhi grid
}

const roleCardActive = {
  ...roleCardBase,
  border: '2px solid #6B5BAE',
  background: '#F5F0FF',
}

const btnPrimary = {
  background: '#0B173D',
  borderRadius: '10px',
  height: '50px',
  fontFamily: 'Poppins',
  fontWeight: 500,
  fontSize: '18px',
  color: '#FFFFFF',
}

const roles = [
  {
    key: 'job-seeker',
    label: 'Job Seeker',
    desc: 'Temukan pekerjaan dan lamar secara anonim.',
    icon: jobSeekerImg,
  },
  {
    key: 'recruiter',
    label: 'Recruiter',
    desc: 'Pasang lowongan kerja dan rekrut talenta.',
    icon: RecruiterImg,
  },
]

export default function RegisterSelection() {
  // Nama state harus konsisten digunakan di bawah
  const [selectedRole, setSelectedRole] = useState('job-seeker'); 
  const navigate = useNavigate()

  const handleLanjut = () => {
    // Navigasi ke /register/job-seeker atau /register/recruiter
    navigate(`/register/${selectedRole}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: bgGradient }}
    >
      <div
        className="relative w-full max-w-lg flex flex-col px-12 py-10"
        style={cardStyle}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 hover:opacity-60 transition-opacity"
        >
          <svg width="24" height="25" viewBox="0 0 24 24" fill="none">
            <path 
              d="M19 12H5M5 12L12 19M5 12L12 5" 
              stroke="#0B173D" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Title */}
        <h2
          className="text-center mt-9 mb-8"
          style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '20px', color: '#000000' }}
        >
          Bergabung dengan Cognijob sebagai:
        </h2>

        {/* Role Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {roles.map((role) => (
            <button
              key={role.key}
              type="button"
              onClick={() => setSelectedRole(role.key)}
              className="flex flex-row items-center gap-2 p-2 text-left"
              // Pastikan membandingkan dengan selectedRole (bukan selected)
              style={selectedRole === role.key ? roleCardActive : roleCardBase}
            >
              {/* Icon */}
              <div className="shrink-0">
                <img src={role.icon} alt={role.label} width={52} height={52} />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <p style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', color: '#000000' }}>
                  {role.label}
                </p>
                <p style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '9px', color: '#767D93', lineHeight: '14px' }}>
                  {role.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleLanjut}
          className="w-full flex items-center justify-center hover:opacity-90 transition-opacity mb-8 active:scale-[0.98]"
          style={btnPrimary}
        >
          Lanjut Daftar Akun
        </button>
      </div>
    </div>
  )
}