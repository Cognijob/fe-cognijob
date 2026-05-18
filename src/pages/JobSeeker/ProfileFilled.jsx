import React from 'react';
import { MapPin, Briefcase, Award, Users, Download, Edit } from "lucide-react";

// ─── Local UI helpers (kecil, hanya dipakai di file ini) ─────────────────────
function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#1e2d5a] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Chip({ label }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#eef0f8] text-[#1e2d5a] text-xs font-medium">
      {label}
    </span>
  );
}

function Empty({ text }) {
  return <p className="text-xs text-gray-400">{text}</p>;
}

// ─── Utility ─────────────────────────────────────────────────────────────────
function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// ─────────────────────────────────────────────────────────────────────────────
export default function ProfileFilled({ profile, onEdit }) {
  const initials = getInitials(profile.fullName);

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e2d5a]">Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola informasi profesionalmu agar rekruter mendapat gambaran lengkap
            mengenai kemampuan dan pengalamanmu.
          </p>
        </div>
        <button
          onClick={onEdit}
          className="shrink-0 flex items-center gap-2 border border-[#1e2d5a] text-[#1e2d5a] hover:bg-[#1e2d5a] hover:text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors duration-200"
        >
          <Edit size={14} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
        {/* ── LEFT ── */}
        <div className="flex flex-col gap-4">
          {/* Identity Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-3 shadow-sm">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={profile.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#1e2d5a] flex items-center justify-center text-white font-bold text-xl">
                {initials}
              </div>
            )}

            <div className="text-center">
              <p className="font-bold text-[#1e2d5a] text-base leading-snug">
                {profile.fullName}
              </p>
              {profile.currentPosition && (
                <p className="text-xs text-[#4f6af5] font-medium mt-0.5">
                  {profile.currentPosition}
                </p>
              )}
              {profile.location && (
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-1">
                  <MapPin size={11} />
                  {profile.location}
                </p>
              )}
            </div>

            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-[#1e2d5a] text-[#1e2d5a] text-xs font-semibold py-2 rounded-xl hover:bg-[#eef0f8] transition-colors"
              >
                <Download size={13} />
                Unduh CV
              </a>
            )}
          </div>

          {/* Skill Utama */}
          <Section title="Skill Utama">
            {profile.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <Chip key={i} label={skill} />
                ))}
              </div>
            ) : (
              <Empty text="Belum ada skill." />
            )}
          </Section>

          {/* Bidang Minat */}
          <Section title="Bidang Minat">
            {profile.interests?.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {profile.interests.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-[#4f6af5] font-bold">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <Empty text="Belum ada bidang minat." />
            )}
          </Section>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex flex-col gap-4">
          {/* Pengalaman Kerja */}
          <Section title="Pengalaman Kerja">
            {profile.workExperiences?.length > 0 ? (
              <div className="flex flex-col gap-5 divide-y divide-gray-50">
                {profile.workExperiences.map((exp, i) => (
                  <div key={i} className={`flex flex-col gap-1 ${i > 0 ? "pt-4" : ""}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-[#1e2d5a]">{exp.company}</p>
                        <p className="text-xs text-[#4f6af5] font-medium">{exp.position}</p>
                      </div>
                      <span className="shrink-0 text-[10px] bg-[#eef0f8] text-[#1e2d5a] font-medium px-2 py-0.5 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-gray-500 leading-relaxed mt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Empty text="Belum ada pengalaman kerja." />
            )}
          </Section>

          {/* Prestasi & Volunteering */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Section title="Prestasi & Penghargaan">
              {profile.achievements?.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {profile.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Award size={14} className="text-[#4f6af5] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-[#1e2d5a]">{ach.title}</p>
                        <p className="text-[10px] text-gray-400">
                          {ach.organizer} · {ach.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty text="Belum ada prestasi." />
              )}
            </Section>

            <Section title="Volunteering">
              {profile.volunteering?.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {profile.volunteering.map((vol, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Users size={14} className="text-[#4f6af5] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-[#1e2d5a]">
                          {vol.organization}
                        </p>
                        <p className="text-[10px] text-gray-400">{vol.role}</p>
                        {vol.description && (
                          <p className="text-[10px] text-gray-400 leading-relaxed mt-0.5">
                            {vol.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty text="Belum ada volunteering." />
              )}
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
