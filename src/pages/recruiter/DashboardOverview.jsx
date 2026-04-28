import { useNavigate } from 'react-router-dom'
import { Search, Bell } from 'lucide-react'

export default function DashboardOverview() {
  const navigate = useNavigate()

  const recentJobs = [
    { id: 'JOB-01', title: 'Senior Backend Engineer', location: 'Jakarta', type: 'Full-time', time: 'Dibuka 3 hari lalu', applicants: 7, status: 'Aktif' },
    { id: 'JOB-02', title: 'Product Designer (Mid-level)', location: 'Jakarta', type: 'Intern', time: 'Dibuka 1 minggu lalu', applicants: 12, status: 'Aktif' },
    { id: 'JOB-03', title: 'Data Analyst', location: 'Bali', type: 'Full-time', time: 'Draft', applicants: 0, status: 'Draft' },
  ]

  return (
    <div className="w-full flex flex-col min-h-screen pb-10 animate-fade-in">

      {/* KONTEN UTAMA: Baru dibatasi lebarnya di sini */}
      <div className="w-full max-w-[1000px] mx-auto px-8 pt-8">
        
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
        <div className="bg-[#DFD9F3]/40 rounded-[16px] p-6 mt-8 border border-black/5">
          <div className="mb-5">
            <h2 className="text-[22px] font-bold text-[#0B173D] leading-tight">Job Terbaru</h2>
            <p className="text-[14px] text-[#000000]/70 mt-1">Postingan job terbaru</p>
          </div>
          
          <div className="flex flex-col gap-3">
            {recentJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white shadow-sm border border-black/5 px-6 py-4 rounded-[12px] flex justify-between items-center hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${job.status === 'Aktif' ? 'bg-[#00D06C]' : 'bg-gray-400'}`}></div>
                  
                  <div className="flex flex-col">
                    <h4 className="font-bold text-[16px] text-[#0B173D]">{job.title}</h4>
                    <p className="text-[14px] text-gray-800 font-medium mt-0.5">
                      {job.location} • {job.type} • {job.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="border border-black/30 px-4 py-1.5 rounded-full text-[13px] font-semibold text-[#000000] bg-white">
                    {job.status === 'Draft' ? 'Draft' : `${job.applicants} Pelamar`}
                  </div>

                  <button
                      onClick={() =>
                        navigate(`/recruiter/edit-job/${job.id}`, {
                          state: { job },
                        })
                      }
                      className="bg-[#1D42AC] text-white px-6 py-1.5 rounded-full text-[14px] font-semibold hover:bg-[#153285] transition-colors"
                    >
                      Buka
                    </button>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}