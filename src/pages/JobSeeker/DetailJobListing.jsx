import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import axios from 'axios';

const DetailJobListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob]         = useState(null);
  const [loading, setLoading] = useState(true);
  

  // Simulasi/Koneksi ke BE
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        // const response = await axios.get(`https://api.cognijob.com/jobs/${id}`);
        // setJob(response.data);

        setTimeout(() => {
          setJob({
            title:       'Senior Backend Engineer',
            company:     'TechCogni Indonesia',
            location:    'Jakarta Pusat, Indonesia',
            type:        'Full-time',
            experience:  '3-5 Tahun',
            salary:      'Rp 15.000.000 - Rp 25.000.000',
            postedAt:    '2 hari yang lalu',
            description: 'Kami mencari Senior Backend Engineer yang berpengalaman dalam membangun sistem yang scalable...',
            requirements: [
              'Minimal 3 tahun pengalaman dengan Python/Django atau Go.',
              'Memahami arsitektur Microservices dan RESTful API.',
              'Terbiasa dengan PostgreSQL dan Redis.',
              'Mampu bekerja dalam tim dengan metodologi Agile.',
            ],
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
        setLoading(false);
      }
    };
    fetchJobDetail();
  }, [id]);

  if (loading) return <div className="p-6 text-center font-bold text-sm">Memuat Detail Pekerjaan...</div>;
  if (!job)    return <div className="p-6 text-center text-sm">Pekerjaan tidak ditemukan.</div>;

  const companyDisplay  = 'TechVision Indonesia';
  const companyInitials = 'TV';
  const tags = ['Full-Time', 'Jakarta Selatan', 'Rp 15-25 juta/bulan'];

  const descPara1 = 'TechVision Indonesia sedang mencari Senior Backend Engineer yang berpengalaman untuk bergabung dengan tim infrastruktur inti kami. Anda akan bertanggung jawab untuk merancang, mengembangkan, dan memelihara sistem backend yang skalabel untuk mendukung ekosistem platform rekrutmen kami yang berkembang pesat.';
  const descPara2 = 'Sebagai pemain kunci dalam tim engineering kami, Anda akan bekerja sama dengan desainer produk, front-end engineer, dan manajer produk untuk menghadirkan solusi teknis yang elegan bagi masalah yang kompleks.';

  const responsibilities = [
    'Merancang dan mengimplementasikan API RESTful yang efisien dan skalabel menggunakan Go atau Node.js.',
    'Mengoptimalkan kinerja database PostgreSQL dan integrasi Redis untuk caching.',
    'Memimpin inisiatif arsitektur microservices dan integrasi sistem pihak ketiga.',
    'Melakukan code review dan memberikan bimbingan teknis kepada junior engineer.',
  ];

  const requirements = [
    'Minimal 5 tahun pengalaman profesional dalam pengembangan backend.',
    'Penguasaan mendalam terhadap algoritma, struktur data, dan desain sistem.',
    'Berpengalaman dengan teknologi Cloud (AWS/GCP) dan containerization (Docker/Kubernetes).',
    'Memiliki gelar Sarjana/Magister di bidang Ilmu Komputer atau setara.',
  ];

  const benefits = [
    'Asuransi Kesehatan (Kesehatan & Gigi).',
    'Jam Kerja Fleksibel & WFA (Work From Anywhere).',
    'Tunjangan Alat Kerja (Laptop & Perlengkapan).',
    'Bonus Kinerja Tahunan.',
    'Program Pengembangan Karir & Pelatihan.',
  ];


    const handleLamarClick = () => {
    navigate(`/jobseeker/joblisting/${id}/lamar`, { 
        state: { jobTitle: job.title } // Pastikan jobData.title sesuai dengan data dari API/state kamu
    });
    };

  const sections = [
    {
      label: 'Deskripsi Pekerjaan',
      content: (
        <>
          <p className="text-sm text-black leading-relaxed text-justify mb-3">{descPara1}</p>
          <p className="text-sm text-black leading-relaxed text-justify">{descPara2}</p>
        </>
      ),
    },
    {
      label: 'Tanggung Jawab Utama',
      content: (
        <ul className="list-disc pl-5 space-y-1">
          {responsibilities.map(r => <li key={r} className="text-sm text-black leading-relaxed text-justify">{r}</li>)}
        </ul>
      ),
    },
    {
      label: 'Persyaratan',
      content: (
        <ul className="list-disc pl-5 space-y-1">
          {requirements.map(r => <li key={r} className="text-sm text-black leading-relaxed text-justify">{r}</li>)}
        </ul>
      ),
    },
  ];

  return (
    <div className="p-4 bg-[#FBFAFF] min-h-screen font-poppins">

      {/* Job Identity */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-[#112664] rounded-lg flex items-center justify-center text-white font-bold text-base shrink-0">
            {companyInitials}
          </div>
          <div>
            <h1 className="text-xl font-bold text-black leading-tight">{job.title}</h1>
            <p className="text-base font-semibold text-[#112664]">{companyDisplay}</p>
            <div className="flex gap-1.5 mt-1">
              {tags.map((tag, i) => (
                <span key={tag} className={`h-6 px-3 rounded-full border text-xs font-medium flex items-center
                  ${i === 1 ? 'bg-[#CBB4D3] border-[#B4A0BB]' : 'bg-[#C2B9D7] border-[#ACA4BF]'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button 
        onClick={handleLamarClick}
        className="h-9 px-5 bg-white border border-[#1B3B9B] rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-semibold text-sm text-black cursor-pointer hover:bg-gray-50 shrink-0">
          Lamar Sekarang
        </button>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-[1fr_220px] gap-4">

        {/* Left */}
        <div className="flex flex-col gap-3">
          {sections.map(({ label, content }) => (
            <div key={label}>
              <p className="text-[#1E42AC] font-medium text-sm mb-1">{label}</p>
              <div className="bg-white border border-black/10 rounded-lg px-4 py-3">{content}</div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3">

          {/* Informasi Perusahaan */}
          <div>
            <p className="text-[#1E42AC] font-medium text-sm mb-1">Informasi Perusahaan</p>
            <div className="bg-[#122867] border border-[#0D1E4D] rounded-lg p-3.5">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-sm text-[#122867] shrink-0">
                  {companyInitials}
                </div>
                <span className="text-white font-semibold text-sm leading-tight">{companyDisplay}</span>
              </div>
              <p className="text-white text-xs leading-5 text-justify mb-3">
                TechVision Indonesia adalah perusahaan teknologi di Jakarta yang fokus pada solusi AI, cloud, dan aplikasi mobile.
              </p>
              <div className="flex justify-center">
                <button className="w-full h-8 bg-[#122867] border border-white rounded-lg text-white font-semibold text-xs cursor-pointer hover:bg-[#0d1e4d]">
                  Lihat Perusahaan
                </button>
              </div>
            </div>
          </div>

          {/* Lokasi Perusahaan */}
          <div>
            <p className="text-[#1E42AC] font-medium text-sm mb-1">Lokasi Perusahaan</p>
            <div className="bg-[#EAECF9] border border-[#F0F2FA] rounded-lg overflow-hidden">
              <svg viewBox="0 0 220 85" width="220" height="85" className="block">
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
              <div className="flex items-start gap-1.5 px-2.5 py-1.5">
                <MapPin size={13} className="text-[#34A853] shrink-0 mt-0.5" />
                <span className="text-xs text-black leading-[18px]">Sudirman Central Business Distric (SCBD), Jakarta</span>
              </div>
            </div>
          </div>

          {/* Benefit Perusahaan */}
          <div>
            <p className="text-[#1E42AC] font-medium text-sm mb-1">Benefit Perusahaan</p>
            <div className="bg-[#DDE3F3] border border-[#B9C4E5] rounded-lg px-4 py-3">
              <ul className="list-disc pl-3.5 space-y-0.5">
                {benefits.map(b => <li key={b} className="text-xs text-black leading-5">{b}</li>)}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailJobListing;
