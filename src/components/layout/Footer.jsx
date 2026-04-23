export default function Footer() {
  return (
    <footer className="w-full bg-[#0B173D] pt-12 pb-16 px-16 flex justify-center" style={{ fontFamily: 'Poppins' }}>
      <div className="max-w-[1280px] w-full flex justify-between items-start gap-10">
        
        {/* Kolom Kiri */}
        <div className="max-w-[300px]">
          <div className="bg-white rounded-lg px-4 py-2 w-fit mb-4 font-bold text-xl flex">
            <span className="text-[#0B173D]">Cogni</span>
            <span className="text-[#1E42AC]">Job</span>
          </div>
          <p className="text-[#B9C4E5] text-[13px] leading-[1.6]">
            Platform pencarian kerja anonim yang adil, transparan, dan bebas bias untuk semua.
          </p>
        </div>

        {/* Kolom Links */}
        <div className="flex gap-20">
          <div>
            <h4 className="text-white font-semibold mb-4 text-[14px] tracking-wide">COMPANY</h4>
            <ul className="flex flex-col gap-3 text-[#B9C4E5] text-[13px]">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#cara-kerja" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[14px] tracking-wide">SUPPORT</h4>
            <ul className="flex flex-col gap-3 text-[#B9C4E5] text-[13px]">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-[14px] tracking-wide">CONTACT</h4>
            <ul className="flex flex-col gap-3 text-[#B9C4E5] text-[13px]">
              <li className="flex items-center gap-2">
                <span>📞</span> +62 1887 9091 0004
              </li>
              <li className="flex items-center gap-2">
                <span>📸</span> @cognijob
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> cognijob@gmail.com
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  )
}