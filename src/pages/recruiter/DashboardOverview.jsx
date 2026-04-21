import { useNavigate } from 'react-router-dom'

export default function DashboardOverview() {
  const navigate = useNavigate()

  // --- MOCK DATA ---
  const recentJobs = [
    { id: 'JOB-01', title: 'Senior Backend Engineer', location: 'Jakarta', type: 'Full-time', time: 'Dibuka 3 hari lalu', applicants: 7, status: 'Aktif' },
    { id: 'JOB-02', title: 'Product Designer (Mid-level)', location: 'Jakarta', type: 'Intern', time: 'Dibuka 1 minggu lalu', applicants: 12, status: 'Aktif' },
    { id: 'JOB-03', title: 'Data Analyst', location: 'Bali', type: 'Full-time', time: 'Draft', applicants: 0, status: 'Draft' },
  ]

  return (
    <div className="w-full font-poppins animate-fade-in pb-10">
      
      {/* HEADER: Breadcrumb & Actions */}
      <div className="flex justify-between items-center mb-8 mt-2">
        <div className="text-[18px] font-bold text-[#B4B2A9] flex items-center">
          Recruiter <span className="mx-2 font-normal text-[16px]">&gt;</span> <span className="text-[#0B173D]">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B173D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button className="w-10 h-10 bg-[#FBFAFF] rounded-full flex items-center justify-center border border-[#0B173D]/30 hover:bg-gray-100 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B173D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <button 
            onClick={() => navigate('/recruiter/create-job')}
            className="px-5 h-10 bg-[#FBFAFF] border border-[#0B173D]/30 text-[#0B173D] font-semibold text-[14px] rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <span>+</span> Buat job
          </button>
        </div>
      </div>

      {/* SECTION 1: OVERVIEW */}
      <div className="bg-[#CFD6F0]/40 rounded-[16px] p-6 mb-6 relative border border-black/5">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-[22px] font-bold text-[#0B173D] leading-tight">Overview</h2>
            <p className="text-[14px] text-[#000000]/70 mt-1">Ringkasan aktivitas rekrutmen untuk hari ini</p>
          </div>
          <div className="bg-[#ECEDF1] border border-black/10 px-4 py-1.5 rounded-[8px] text-[13px] font-medium text-[#000000]">
            Selasa, 14 Apr 2026
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#DFD9F3] p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">Total <br/> lowongan aktif</p>
            <h3 className="text-[28px] font-bold text-[#0B173D]">12</h3>
          </div>
          <div className="bg-[#D7CDEF]/60 p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">Pelamar baru</p>
            <h3 className="text-[28px] font-bold text-[#0B173D]">47</h3>
          </div>
          <div className="bg-[#D7CDEF]/60 p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">Perlu direview</p>
            <h3 className="text-[28px] font-bold text-[#0B173D]">23</h3>
          </div>
          <div className="bg-[#D7CDEF]/60 p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">Total diterima <br/> bulan ini</p>
            <h3 className="text-[28px] font-bold text-[#0B173D]">6</h3>
          </div>
        </div>
      </div>

      {/* SECTION 2: PIPELINE STATUS */}
      <div className="bg-[#E6CCEF]/40 rounded-[16px] p-6 mb-6 border border-black/5">
        <div className="mb-5">
          <h2 className="text-[22px] font-bold text-[#0B173D] leading-tight">Pipeline Status</h2>
          <p className="text-[14px] text-[#000000]/70 mt-1">Status kandidat</p>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#DFD9F3] p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">Lamaran Masuk</p>
            <h3 className="text-[28px] font-bold text-[#0B173D]">12</h3>
          </div>
          <div className="bg-[#DFD9F3] p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">Telah diriview</p>
            <h3 className="text-[28px] font-bold text-[#0B173D]">47</h3>
          </div>
          <div className="bg-[#DFD9F3] p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">Diterima</p>
            <h3 className="text-[28px] font-bold text-[#0B173D]">23</h3>
          </div>
          <div className="bg-[#DFD9F3] p-4 rounded-[12px] flex flex-col justify-between h-[110px]">
            <p className="text-[13px] text-[#000000]/80 leading-snug font-medium">Ditolak</p>
            <h3 className="text-[28px] font-bold text-[#0B173D]">6</h3>
          </div>
        </div>
      </div>

      {/* SECTION 3: JOB TERBARU */}
      <div className="border border-[#1E42AC]/30 bg-white rounded-[16px] p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-[20px] font-bold text-[#0B173D] leading-tight">Job Terbaru</h2>
          <p className="text-[14px] text-[#000000]/70 mt-1">Postingan job terbaru</p>
        </div>
        
        <div className="flex flex-col gap-3">
          {recentJobs.map((job) => (
            <div 
              key={job.id}
              className="bg-[#FAFAFA] border border-black/5 px-5 py-3.5 rounded-[12px] flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Dot Status */}
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${job.status === 'Aktif' ? 'bg-[#10B981]' : 'bg-gray-400'}`}></div>
                
                {/* Info Job */}
                <div>
                  <h4 className="font-semibold text-[16px] text-[#0B173D]">{job.title}</h4>
                  <p className="text-[13px] text-gray-500 font-medium mt-0.5">
                    {job.location} • {job.type} • {job.time}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <div className="border border-black/20 px-3 py-1 rounded-full text-[12px] font-medium text-black/70 bg-white">
                  {job.status === 'Draft' ? 'Draft' : `${job.applicants} Pelamar`}
                </div>
                <button
                  onClick={() => navigate(`/recruiter/dashboard/job/${job.id}`)}
                  className="bg-[#1939B7] text-white px-5 py-1.5 rounded-full text-[13px] font-medium hover:bg-[#122a8a] transition-colors"
                >
                  Buka
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}