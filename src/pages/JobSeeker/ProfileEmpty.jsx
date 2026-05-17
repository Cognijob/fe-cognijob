import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, Award, Heart, Users, Star } from "lucide-react";

import EditProfileForm from './EditProfileForm'

function EmptyCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center gap-2 min-h-[130px] shadow-sm">
      <div className="text-gray-300 mb-1">
        <Icon size={36} strokeWidth={1.4} />
      </div>
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <p className="text-xs text-gray-400 text-center leading-relaxed">{description}</p>
    </div>
  );
}

export default function ProfileEmpty({ onEdit }) {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1e2d5a]">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola informasi profesionalmu agar rekruter mendapat gambaran lengkap
          mengenai kemampuan dan pengalamanmu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Data Diri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center gap-2 min-h-[160px] shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#eef0f8] flex items-center justify-center text-[#1e2d5a] font-bold text-lg mb-1">
            JS
          </div>
          <p className="text-sm font-semibold text-gray-500">Belum ada data diri</p>
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Tambahkan nama, lokasi, pendidikan, dan informasi dasar lainnya agar
            rekruter dapat mengenalimu.
          </p>
        </div>

        <EmptyCard
          icon={Users}
          title="Belum ada volunteering"
          description="Kegiatan sosial atau kontribusi komunitasmu."
        />
        <EmptyCard
          icon={Star}
          title="Belum ada skill"
          description="Tambahkan skill teknis yang kamu kuasai."
        />
        <EmptyCard
          icon={Briefcase}
          title="Belum ada pengalaman kerja"
          description="Cantumkan riwayat pekerjaanmu."
        />
        <EmptyCard
          icon={Heart}
          title="Belum ada bidang minat"
          description="Tunjukkan bidang yang paling kamu minati."
        />
        <EmptyCard
          icon={FileText}
          title="Belum ada CV"
          description="Masukkan CVmu."
        />
        <EmptyCard
          icon={Award}
          title="Belum ada prestasi"
          description="Tambahkan sertifikat, award, atau pencapaian lainnya."
        />
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate(`/jobseeker/EditProfileForm`)}
          className="bg-[#1e2d5a] hover:bg-[#162247] text-white text-sm font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
        >
          Isi Data Profile Sekarang
        </button>
      </div>
    </div>
  );
}
