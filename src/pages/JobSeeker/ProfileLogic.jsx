import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileEmpty from "./ProfileEmpty";
import ProfileFilled from "./ProfileFilled";

// ─── API ─────────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const profileApi = {
  /** GET /profile – fetch current user's profile */
  getProfile: () => axios.get(`${BASE_URL}/profile`),
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── MOCK (hapus setelah BE siap) ────────────────────────────────────────────
const USE_MOCK = true;

const MOCK_PROFILE = {
  fullName: "Rayanka Sadira Jiwita",
  location: "Jakarta Timur, Indonesia",
  currentPosition: "Fresh Graduate",
  lastEducation: "SI Sistem Informasi",
  email: "rayanka@email.com",
  totalExperience: "1 Tahun",
  photoUrl: null,
  cvUrl: "https://example.com/cv.pdf",
  skills: ["Python", "Django", "Docker", "REST API", "PostgreSQL", "Git"],
  interests: ["Arsitektur Sistem", "Skalabilitas & Performa", "Keamanan & Keandalan"],
  workExperiences: [
    {
      company: "TechCogni Indonesia",
      position: "Backend Engineer",
      type: "Full Time",
      period: "Jan 2023 – Sekarang",
      description:
        "Merancang dan mengimplementasikan pipeline pemrosesan data real-time yang menangani lebih dari 100 juta event per hari.",
    },
    {
      company: "TechVision Indonesia",
      position: "Junior Developer",
      type: "Full Time",
      period: "Jun 2022 – Des 2022",
      description:
        "Bertanggung jawab membantu pengembangan dan pemeliharaan aplikasi, memperbaiki bug.",
    },
  ],
  achievements: [
    { title: "AWS Certified Solutions Architect", organizer: "Amazon Web Services", year: "2023" },
    { title: "Top Innovator Award", organizer: "TechVision Indonesia", year: "2023" },
  ],
  volunteering: [
    {
      organization: "Code For Good",
      role: "Mentor & Open Source Contributor",
      description: "Mengajarkan pengembangan web kepada anak muda kurang mampu.",
    },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="p-8 max-w-5xl animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-32 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-72 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);

      if (USE_MOCK) {
        setProfile(MOCK_PROFILE);
        setLoading(false); // ← tambah ini
        return;
      }

      const { data } = await profileApi.getProfile();
      setProfile(data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError("Gagal memuat data profil.");
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, []);

  const handleEdit = () => navigate("/job-seeker/profile/edit");

  const isEmpty =
    !profile?.fullName &&
    !profile?.skills?.length &&
    !profile?.workExperiences?.length;

  if (loading) return <ProfileSkeleton />;

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-[#1e2d5a] underline"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return isEmpty ? (
    <ProfileEmpty onEdit={handleEdit} />
  ) : (
    <ProfileFilled profile={profile} onEdit={handleEdit} />
  );
}
