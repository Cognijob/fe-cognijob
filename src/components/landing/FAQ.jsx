import { useState } from 'react'

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0) // Default kebuka yang pertama

  const faqs = [
    {
      q: 'What is anonymous apply?',
      a: 'Fitur unggulan dari CogniJob yang menyembunyikan identitas bersifat privat seperti nama, foto, dan gender saat melamar. Sehingga, recruiter hanya menilai kemampuan dan pengalamanmu.'
    },
    {
      q: 'How does it work?',
      a: '1. Cari pekerjaan yang sesuai dengan preferensimu,\n2. Lamar secara anonim,\n3. Pantau status lamaranmu secara real-time melalui dashboard.'
    },
    {
      q: 'Is my data safe?',
      a: 'Ya, data kamu akan terlindungi sepenuhnya. Identitasmu hanya dibuka ke recruiter setelah kamu lolos seleksi dan sudah memberikan persetujuan.'
    }
  ]

  return (
    <section 
      id="faq" 
      className="w-full flex flex-col items-center py-20" 
      style={{ 
        background: 'linear-gradient(180deg, #E6CDEE 25.96%, #D6CDEE 50.48%, #CDD6EE 77.88%)', 
        fontFamily: 'Poppins' 
      }}
    >
      <div className="w-full max-w-[800px] px-4">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#000000] mb-2">FAQs</h2>
          <p className="text-[14px] text-[#000000]">Temukan jawaban mengenai pertanyaan yang sering ditanyakan pada CogniJob.</p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-[#F4F5F8] rounded-[20px] overflow-hidden shadow-sm transition-all duration-300 border border-black/5"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-8 py-5 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[#1E42AC] font-bold text-[18px] w-4">{idx + 1}</span>
                  <span className={`font-bold text-[18px] ${openIdx === idx ? 'text-[#1E42AC]' : 'text-[#0B173D]'}`}>
                    {faq.q.split(' ').map((word, i, arr) => 
                      i >= arr.length - 2 ? <span key={i} className="text-[#1E42AC] ml-1">{word}</span> : word + ' '
                    )}
                  </span>
                </div>
                <svg 
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                  className={`transform transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-[200px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="pl-10 text-[14px] text-[#000000] leading-[1.6] whitespace-pre-line">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}