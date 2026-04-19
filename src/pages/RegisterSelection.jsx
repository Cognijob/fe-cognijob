import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jobSeekerImg from "../assets/AuthPages/JobSeeker.png";
import RecruiterImg from '../assets/AuthPages/Recruiter.png';
import { Weight } from 'lucide-react';

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
    icon: <img src={jobSeekerImg} alt="Job Seeker" width={52} height={52} />,
  },
  {
    key: 'recruiter',
    label: 'Recruiter',
    desc: 'Pasang lowongan kerja dan rekrut talenta.',
    icon: <img src={RecruiterImg} alt="Recruiter" width={52} height={52} />,
  },
]

export default function RegisterSelection() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

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
          <svg width="24" height="25" viewBox="0 1 24 24" fill="none">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#0B173D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
              onClick={() => setSelected(role.key)}
              
              className="flex flex-row items-center gap-2 p-2 text-left transition-all"
              style={selected === role.key ? roleCardActive : roleCardBase}
            >
              {/* Icon */}
              <div className="shrink-0">{role.icon}</div>

              {/* Text disamping icon */}
              <div className="flex flex-col">
                <p style={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '16px', color: '#000000' }}>
                  {role.label}
                </p>
                <p style={{ fontFamily: 'Poppins', fontWeight: 400, fontSize: '9px', color: '#767D93', lineHeight: '16px' }}>
                  {role.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => selected && navigate(`/register/${selected}`)}
          disabled={!selected}
          className="w-full flex items-center justify-center hover:opacity-80 transition-opacity mb-8"
          style={{
            ...btnPrimary,
            opacity: selected ? 1 : 0.5,
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          Lanjut Daftar Akun
        </button>
      </div>
    </div>
  )
}