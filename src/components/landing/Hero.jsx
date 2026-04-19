import { useNavigate } from "react-router-dom";
import HeroImg from "/src/assets/LandingPages/Landing.png";

export default function Hero() {
  const navigate = useNavigate();

  const handleMulaiMelamar = () => {
    navigate("/login");
  }
  return (
    <section
      className="w-full h-screen flex flex-col overflow-hidden" 
      style={{
        background: 'linear-gradient(180deg, #E6CDEE 25.96%, #D6CDEE 50.48%, #CDD6EE 77.88%)',
        fontFamily: 'Poppins',
      }}
    >
      {/* Spacer untuk Navbar fixed */}
      <div className="h-[70px] shrink-0" />

      {/*  KONTEN HERO  */}
      <div className="flex-1 flex flex-col justify-between max-w-[1280px] mx-auto w-full px-16 overflow-hidden">

        {/* Baris atas: Teks + Ilustrasi */}
        <div className="flex-1 flex items-center justify-between gap-2 py-4 pl-4">

          {/* Kolom Kiri */}
          <div className="max-w-[520px] flex flex-col gap-5">

            {/* Badge */}
            <p className="font-extralight text-[18px] text-[#0B173D]/70 uppercase pb-3">
              Rekrutmen Tanpa Bias
            </p>

            {/* Heading */}
            <h1 className="text-[30px] font-bold leading-[1.3] text-[#0B173D] pb-3">
              Karier terbaik dimulai dari <br />
              kesempatan yang{' '}
              <span className="italic text-[#1E42AC]">setara</span>
            </h1>

            {/* Deskripsi */}
            <p className="text-[15px] font-normal leading-[1.6] text-[#000000] max-w-[460px]">
              CogniJob menyembunyikan identitas sensitif agar kamu dinilai dari
              kompetensi, bukan nama, foto, atau gender. Proses melamar yang
              transparan, adil, dan efisien — semuanya dalam satu platform.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-8 mt-1">
              <button
                onClick={handleMulaiMelamar}
                className="bg-[#0B173D] text-white px-8 py-3 rounded-full font-semibold text-[18px] hover:bg-[#1a2d5a] hover:scale-[1.03] transition-all duration-200 shadow-md"
              >
                Mulai Melamar ⭢
              </button>

             <a
                href="#cara-kerja" // ID section di bawa ini nanti harus punya id="cara-kerja"
                className="text-[18px] font-extralight text-[#0B173D] hover:opacity-60 transition-opacity duration-200"
              >
                Lihat cara kerjanya
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Gambar Landing */}
          <div className="w-[300px] h-[400px] flex items-center justify-center relative">
            <img
              src={HeroImg}
              alt="Hero Illustration"
              className="w-full h-full object-contain scale-170 mt-12 -ml-80" 
            />
          </div>
        </div>

{/*  STATS  */}
<div className="shrink-0 mt-3"> 
  
  <div className="absolute left-0 w-full h-px bg-[#000000]/50" style={{ bottom: '120px' }} /> 

  {/* Kontainer Grid Stats */}
  <div className="grid grid-cols-3 pb-15 pt-12">
    
    {/* Item 1 */}
    <div className="flex flex-col items-center text-center">
      <p className="text-[27px] font-semibold text-[#0B173D] leading-tight">99.7%</p>
      <p className="text-[14px] font-light text-[#0B173D]/80 mt-2 max-w-[200px] leading-[1.6]">
        Masyarakat Indonesia masih memiliki bias gender
      </p>
    </div>

    {/* Item 2 */}
    <div className="flex flex-col items-center text-center">
      <p className="text-[27px] font-semibold text-[#0B173D] leading-tight">53%</p>
      <p className="text-[14px] font-light text-[#0B173D]/80 mt-2 max-w-[200px] leading-[1.6]">
        Perempuan berpartisipasi dalam angkatan kerja
      </p>
    </div>

    {/* Item 3 */}
    <div className="flex flex-col items-center text-center">
      <p className="text-[27px] font-semibold text-[#0B173D] leading-tight">1 Platform</p>
      <p className="text-[14px] font-light text-[#0B173D]/80 mt-2 max-w-[210px] leading-[1.6]">
        Cari kerja, melamar, pantau, dan nilai perusahaan
      </p>
    </div>

  </div>
</div>

      </div>
    </section>
  )
}