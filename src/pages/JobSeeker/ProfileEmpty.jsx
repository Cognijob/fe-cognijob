import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, Trophy, Heart, Users, Lightbulb } from "lucide-react";

// Komponen Card - Menggunakan skala p-5 dan rounded-2xl agar selaras dengan Edit Profile
function EmptyCard({ title, emptyTitle, description, icon: Icon, bgColor, borderColor, isAvatar }) {
  return (
    <div 
      className="rounded-2xl border p-5 flex justify-between items-center shadow-sm"
      style={{ backgroundColor: bgColor, borderColor: borderColor }}
    >
      <div className="flex flex-col flex-1 pr-4">
        {/* Judul Section - Selaras dengan text-sm font-bold */}
        <h3 className="text-sm font-bold text-[#1E42AC] mb-3">{title}</h3>
        <div>
          {/* Status Kosong */}
          <p className="text-sm font-semibold text-gray-700 mb-0.5">{emptyTitle}</p>
          {/* Deskripsi Teks Pembantu - Menggunakan text-xs text-gray-400 */}
          <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Ikon / Lingkaran Ilustrasi (Dibuat w-12 h-12 agar pas dengan grid) */}
      <div className="shrink-0 flex items-center justify-center">
        {isAvatar ? (
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm font-bold text-sm text-[#0B173D]">
            JS
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center border border-gray-100/50">
            <Icon size={22} className="text-gray-500" strokeWidth={1.5} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfileEmpty({ onEdit }) {
  return (
    <div className="p-8 max-w-5xl mx-auto font-poppins animate-fade-in">
      
      {/* Header Utama - Menggunakan skala text-2xl dan text-sm */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1e2d5a]">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola informasi profesionalmu agar rekruter mendapat gambaran lengkap
          mengenai kemampuan dan pengalamanmu.
        </p>
      </div>

      {/* Grid Layout - Menggunakan gap-4 agar kerapatannya sama dengan Form Edit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* === KOLOM KIRI === */}
        <div className="flex flex-col gap-4">
          <EmptyCard
            title="Data Diri"
            emptyTitle="Belum ada data diri"
            description="Tambahkan nama, lokasi, pendidikan, dan informasi dasar lainnya agar rekruter dapat mengenalimu."
            bgColor="#EAECF9"
            borderColor="#CFD6F0"
            isAvatar={true}
          />
          
          <EmptyCard
            title="Skill Utama"
            emptyTitle="Belum ada skill"
            description="Tambahkan skill teknis yang kamu kuasai."
            icon={Lightbulb}
            bgColor="#F6EEF8"
            borderColor="#CFD6F0"
          />
          
          <EmptyCard
            title="Bidang Minat"
            emptyTitle="Belum ada bidang minat"
            description="Tunjukkan bidang yang paling kamu minati."
            icon={Heart}
            bgColor="#EAECF9"
            borderColor="#F3F0FA"
          />
          
          <EmptyCard
            title="Prestasi & Penghargaan"
            emptyTitle="Belum ada prestasi"
            description="Tambahkan sertifikat, award, atau pencapaian lainmu."
            icon={Trophy}
            bgColor="#EAECF9"
            borderColor="#F3F0FA"
          />
        </div>

        {/* === KOLOM KANAN === */}
        <div className="flex flex-col gap-4">
          <EmptyCard
            title="Volunteering"
            emptyTitle="Belum ada volunteering"
            description="Kegiatan sosial atau kontribusi komunitasmu."
            icon={Users}
            bgColor="#F6EEF8"
            borderColor="#CFD6F0"
          />
          
          <EmptyCard
            title="Pengalaman Kerja"
            emptyTitle="Belum ada pengalaman kerja"
            description="Cantumkan riwayat pekerjaanmu."
            icon={Briefcase}
            bgColor="#FFFFFF"
            borderColor="#CFD6F0"
          />
          
          <EmptyCard
            title="CV"
            emptyTitle="Belum ada CV"
            description="Masukkan CVmu."
            icon={FileText}
            bgColor="#F3F0FA"
            borderColor="#CFD6F0"
          />

          {/* Tombol Aksi - Menggunakan padding py-2.5 dan rounded-xl agar ukurannya identik dengan tombol simpan */}
          <div className="mt-2 flex">
            <button
              onClick={onEdit}
              className="bg-[#1E42AC] hover:bg-[#153285] text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm transition-all duration-200 w-full md:max-w-[260px] flex justify-center items-center active:scale-[0.98]"
            >
              Isi Data Profile Sekarang
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
