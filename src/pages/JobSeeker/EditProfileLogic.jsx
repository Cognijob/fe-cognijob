import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditProfileForm from "./EditProfileForm";

// ─── API ─────────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const profileApi = {
  /** GET /profile – ambil data profile saat ini */
  getProfile: () => axios.get(`${BASE_URL}/profile`),

  /** PUT /profile – simpan perubahan profile */
  updateProfile: (payload) => axios.put(`${BASE_URL}/profile`, payload),

  /** POST /profile/photo – upload foto profil (multipart) */
  uploadPhoto: (file) => {
    const form = new FormData();
    form.append("photo", file);
    return axios.post(`${BASE_URL}/profile/photo`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  /** POST /profile/cv – upload CV (multipart) */
  uploadCV: (file) => {
    const form = new FormData();
    form.append("cv", file);
    return axios.post(`${BASE_URL}/profile/cv`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

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
  cvUrl: "https://example.com/CV_Rayanka_2026.pdf",
  cvFileName: "CV_Rayanka_2026.pdf",
  cvUploadedAt: "Diunggah 10 April 2026",
  skills: ["PostgreSQL"],
  interests: ["Arsitektur Sistem"],
  workExperiences: [
    {
      id: 1,
      position: "Backend Engineer",
      company: "TechCogni Indonesia",
      type: "Full Time",
      period: "Jan 2023 – Jan 2025",
      description:
        "Merancang dan mengimplementasikan pipeline pemrosesan data real-time...",
    },
  ],
  achievements: [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      year: "2023",
      organizer: "Amazon Web Services",
    },
  ],
  volunteering: [
    {
      id: 1,
      name: "Code For Good",
      role: "Mentor",
      description:
        "Mengajarkan pengembangan web kepada anak muda kurang mampu.",
    },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

export default function EditProfile() {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (USE_MOCK) {
          setInitialData(MOCK_PROFILE);
          return;
        }
        const { data } = await profileApi.getProfile();
        setInitialData(data);
      } catch (err) {
        console.error("Gagal fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (formData) => {
    try {
      setSaving(true);

      if (!USE_MOCK) {
        // Upload foto jika ada file baru
        if (formData.photoFile) {
          await profileApi.uploadPhoto(formData.photoFile);
        }
        // Upload CV jika ada file baru
        if (formData.cvFile) {
          await profileApi.uploadCV(formData.cvFile);
        }
        // Update data profile
        const payload = {
          fullName: formData.fullName,
          location: formData.location,
          currentPosition: formData.currentPosition,
          lastEducation: formData.lastEducation,
          email: formData.email,
          totalExperience: formData.totalExperience,
          skills: formData.skills,
          interests: formData.interests,
          workExperiences: formData.workExperiences,
          achievements: formData.achievements,
          volunteering: formData.volunteering,
        };
        await profileApi.updateProfile(payload);
      }

      setShowSuccess(true);
    } catch (err) {
      console.error("Gagal simpan profile:", err);
      alert("Terjadi kesalahan saat menyimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/job-seeker/profile");
  };

  const handleBatal = () => setShowCancelModal(true);
  const handleCancelConfirm = () => navigate("/job-seeker/profile");
  const handleCancelBack = () => setShowCancelModal(false);

  if (loading) {
    return (
      <div className="p-8 max-w-5xl animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-40 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-80 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <EditProfileForm
      initialData={initialData}
      saving={saving}
      showSuccess={showSuccess}
      showCancelModal={showCancelModal}
      onSave={handleSave}
      onBatal={handleBatal}
      onSuccessClose={handleSuccessClose}
      onCancelConfirm={handleCancelConfirm}
      onCancelBack={handleCancelBack}
    />
  );
}