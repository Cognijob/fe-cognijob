import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Loader2 } from 'lucide-react';
import { getPublicJobDetail } from '../../services/jobServices'; // Import fungsi API

const DetailJobListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        // Memanggil API Backend
        const response = await getPublicJobDetail(id);
        
        // Mengekstrak data (menyesuaikan dengan respon Postman kamu: response.data.data)
        const jobData = response.data?.data || response.data;
        
        if (jobData) {
          setJob(jobData);
        } else {
          setError('Data pekerjaan tidak ditemukan.');
        }
      } catch (err) {
        console.error('Gagal mengambil data:', err);
        setError('Gagal memuat detail pekerjaan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex flex-col min-h-screen items-center justify-center bg-[#FBFAFF]">
        <Loader2 className="animate-spin text-[#1E42AC]" size={40} />
        <p className="mt-4 text-[#1E42AC] font-semibold">Memuat Detail Pekerjaan...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="w-full flex flex-col min-h-screen items-center justify-center bg-[#FBFAFF]">
        <div className="bg-red-100 p-4 rounded-xl text-red-600 font-semibold mb-4">
          {error || 'Pekerjaan tidak ditemukan.'}
        </div>
        <button 
          onClick={() => navigate('/jobseeker/dashboard')} 
          className="px-5 py-2 bg-[#1E42AC] text-white font-bold rounded-lg shadow-md hover:bg-[#112664]"
        >
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

  // --- PEMETAAN DATA DARI API KE UI ---
  const jobTitle = job.title || 'Posisi Tidak Disebutkan';
  const companyDisplay = job.companyName || job.company?.companyName || 'Perusahaan Tidak Diketahui';
  const companyInitials = companyDisplay.substring(0, 2).toUpperCase();
  
  // Menggabungkan tag info pekerjaan (Filter nilai yang kosong agar rapi)
  const tags = [job.employmentType, job.location, job.salaryRange].filter(Boolean);

  // Fungsi helper untuk mengubah teks panjang dari database menjadi array (berdasarkan enter atau koma)
  const parseList = (textString) => {
    if (!textString) return [];
    if (textString.includes('\n')) {
      return textString.split('\n').filter(s => s.trim() !== '');
    }
    return textString.split(',').map(s => s.trim()).filter(s => s !== '');
  };

  const requirementsList = parseList(job.requirements);
  const benefitsList = parseList(job.benefits);

  const handleLamarClick = () => {
    navigate(`/jobseeker/joblisting/${id}/lamar`, { 
      state: { jobTitle: jobTitle } 
    });
  };

  return (
    <div className="p-4 bg-[#FBFAFF] min-h-screen font-poppins">

      {/* Bagian Header Identitas Pekerjaan */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-[#112664] rounded-lg flex items-center justify-center text-white font-bold text-base shrink-0 uppercase">
            {companyInitials}
          </div>
          <div>
            <h1 className="text-xl font-bold text-black leading-tight">{jobTitle}</h1>
            <p className="text-base font-semibold text-[#112664]">{companyDisplay}</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {tags.map((tag, i) => (
                <span key={i} className={`h-6 px-3 rounded-full border text-xs font-medium flex items-center
                  ${i === 1 ? 'bg-[#CBB4D3] border-[#B4A0BB]' : 'bg-[#C2B9D7] border-[#ACA4BF]'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={handleLamarClick}
          className="h-9 px-5 bg-white border border-[#1B3B9B] rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-semibold text-sm text-[#1B3B9B] cursor-pointer hover:bg-[#1B3B9B] hover:text-white transition-colors shrink-0"
        >
          Lamar Sekarang
        </button>
      </div>

      {/* Grid Utama (Kiri: Info Job, Kanan: Info Perusahaan) */}
      <div className="grid grid-cols-[1fr_220px] gap-4">

        {/* Kolom Kiri */}
        <div className="flex flex-col gap-4">
          
          {/* Deskripsi Pekerjaan */}
          <div>
            <p className="text-[#1E42AC] font-medium text-sm mb-1">Deskripsi Pekerjaan</p>
            <div className="bg-white border border-black/10 rounded-lg px-4 py-3">
              <p className="text-sm text-black leading-relaxed text-justify whitespace-pre-line">
                {job.description || 'Tidak ada deskripsi yang diberikan untuk lowongan ini.'}
              </p>
            </div>
          </div>

          {/* Persyaratan */}
          {requirementsList.length > 0 && (
            <div>
              <p className="text-[#1E42AC] font-medium text-sm mb-1">Persyaratan</p>
              <div className="bg-white border border-black/10 rounded-lg px-4 py-3">
                <ul className="list-disc pl-5 space-y-1">
                  {requirementsList.map((req, i) => (
                    <li key={i} className="text-sm text-black leading-relaxed text-justify">{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Kolom Kanan (Sidebar Info) */}
        <div className="flex flex-col gap-3">

          {/* Informasi Perusahaan */}
          <div>
            <p className="text-[#1E42AC] font-medium text-sm mb-1">Informasi Perusahaan</p>
            <div className="bg-[#122867] border border-[#0D1E4D] rounded-lg p-3.5">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-sm text-[#122867] shrink-0 uppercase">
                  {companyInitials}
                </div>
                <span className="text-white font-semibold text-sm leading-tight line-clamp-2">
                  {companyDisplay}
                </span>
              </div>
              <p className="text-white text-xs leading-5 text-justify mb-3 line-clamp-4">
                Sektor Industri: {job.companyIndustry || job.category || 'Belum diatur'}
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => navigate('/jobseeker/companies')}
                  className="w-full h-8 bg-[#122867] border border-white rounded-lg text-white font-semibold text-xs cursor-pointer hover:bg-white hover:text-[#122867] transition-colors"
                >
                  Lihat Perusahaan
                </button>
              </div>
            </div>
          </div>

          {/* Lokasi Perusahaan */}
          <div>
            <p className="text-[#1E42AC] font-medium text-sm mb-1">Lokasi Perusahaan</p>
            <div className="bg-[#EAECF9] border border-[#F0F2FA] rounded-lg overflow-hidden">
              <svg viewBox="0 0 220 85" width="100%" height="85" className="block w-full">
                <rect width="220" height="85" fill="#b0c8de"/>
                <rect width="220" height="44" fill="#c8ddf0"/>
                <rect x="0"   y="33" width="14" height="52" fill="#6a8fb0"/>
                <rect x="16"  y="22" width="18" height="63" fill="#567898"/>
                <rect x="36"  y="37" width="12" height="48" fill="#7090b0"/>
                <rect x="50"  y="16" width="22" height="69" fill="#4a6e90"/>
                <rect x="75"  y="28" width="16" height="57" fill="#6080a8"/>
                <rect x="94"  y="9"  width="23" height="76" fill="#3d6080"/>
                <rect x="120" y="31" width="13" height="54" fill="#6888a8"/>
                <rect x="136" y="20" width="19" height="65" fill="#506890"/>
                <rect x="157" y="34" width="15" height="51" fill="#708aaa"/>
                <rect x="174" y="15" width="20" height="70" fill="#426078"/>
                <rect x="197" y="26" width="23" height="59" fill="#5a7898"/>
                {[53,59,65,71].map(y =>
                  [52,60,68,76,84,97,105].map(x =>
                    <rect key={`${x}-${y}`} x={x} y={y} width={3} height={2} fill="rgba(255,248,200,0.55)"/>
                  )
                )}
                <rect x="0" y="74" width="220" height="11" fill="#8aaabf"/>
              </svg>
              <div className="flex items-start gap-1.5 px-2.5 py-2">
                <MapPin size={13} className="text-[#34A853] shrink-0 mt-0.5" />
                <span className="text-xs text-black leading-[18px]">
                  {job.companyLocation || job.location || 'Lokasi tidak spesifik'}
                </span>
              </div>
            </div>
          </div>

          {/* Benefit Perusahaan (Tampil hanya jika data tersedia) */}
          {benefitsList.length > 0 && (
            <div>
              <p className="text-[#1E42AC] font-medium text-sm mb-1">Benefit Perusahaan</p>
              <div className="bg-[#DDE3F3] border border-[#B9C4E5] rounded-lg px-4 py-3">
                <ul className="list-disc pl-3.5 space-y-0.5">
                  {benefitsList.map((b, i) => (
                    <li key={i} className="text-xs text-black leading-5">{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DetailJobListing;