import React from 'react';

export default function Notif() {
  const notifications = [
    {
      id: 1,
      title: "Status lamaran diperbarui",
      desc: "Lamaranmu untuk posisi Senior Backend Engineer di TechCogni telah berubah ke tahap Screening.",
      tag: "Status Update",
      tagColor: "bg-[#D7CDEF] text-[#6B5BAE]",
      time: "2 Jam Lalu",
      category: "Hari Ini"
    },
    {
      id: 2,
      title: "Pesan baru dari recruiter",
      desc: "Kamu mendapat pesan baru dari recruiter TechCogni terkait lamaran Senior Backend Engineer.",
      tag: "Pesan Baru",
      tagColor: "bg-[#D0E4FF] text-[#1E42AC]",
      time: "2 Jam Lalu",
      category: "Hari Ini"
    },
    {
      id: 3,
      title: "Rekomendasi lowongan untukmu",
      desc: "Ada 3 lowongan baru yang cocok dengan profilmu. Senior Backend Engineer di TechCogni.",
      tag: "Rekomendasi",
      tagColor: "bg-[#D1FAE5] text-[#328C4A]",
      time: "1 Hari Lalu",
      category: "Kemarin"
    },
    {
      id: 4,
      title: "Reminder deadline lamaran",
      desc: "Lowongan Senior Backend Engineer di TechCogni akan ditutup 3 hari lagi. Segera kirim lamaranmu.",
      tag: "Deadline",
      tagColor: "bg-[#FEE2E2] text-[#EF4444]",
      time: "1 Hari Lalu",
      category: "Kemarin"
    }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-8 py-10 animate-fade-in font-poppins">
      {/* Header Tetap di Kiri Atas */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[#0B173D] mb-2">Notifications</h1>
        <p className="text-gray-500 text-[15px] max-w-2xl">
          Lihat semua pemberitahuan penting tentang lowongan kerja dan aktivitas akunmu di sini.
        </p>
      </div>

      {/* Body Notification dibuat lebih ramping (Center focus) */}
      <div className="max-w-[800px] mx-auto flex flex-col gap-10">
        {["Hari Ini", "Kemarin"].map((cat) => (
          <div key={cat} className="flex flex-col gap-5">
            {/* Label Kategori - Biru Navy/Aksen */}
            <h2 className="text-[#1E42AC] font-bold text-[18px] ml-2">{cat}</h2>
            
            <div className="flex flex-col gap-4">
              {notifications
                .filter((n) => n.category === cat)
                .map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white border-2 border-[#CDD6EE] rounded-[24px] p-8 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-[17px] text-[#0B173D]">{item.title}</h3>
                    </div>
                    
                    <p className="text-gray-500 text-[14px] leading-relaxed mb-6">
                      {item.desc}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <span className={`${item.tagColor} px-4 py-1.5 rounded-full text-[11px] font-bold border border-black/5`}>
                        {item.tag}
                      </span>
                      <span className="text-gray-400 text-[12px] font-medium">{item.time}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}