import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditProfileForm from "./EditProfileForm";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const profileApi = {
  getProfile: () => axios.get(`${BASE_URL}/profile`),
  updateProfile: (payload) => axios.put(`${BASE_URL}/profile`, payload),
  uploadPhoto: (file) => { /* logic upload... */ },
  uploadCV: (file) => { /* logic upload... */ },
};

const USE_MOCK = true;

// Data kosong untuk inisiasi
const EMPTY_PROFILE = {
  fullName: "", location: "", currentPosition: "", lastEducation: "",
  email: "", totalExperience: "", photoUrl: null, cvUrl: null,
  cvFileName: "", cvUploadedAt: "", skills: [], interests: [],
  workExperiences: [], achievements: [], volunteering: [],
};

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
          // Ambil data yang mungkin sudah diedit sebelumnya
          const savedProfile = localStorage.getItem("mock_jobseeker_profile");
          setInitialData(savedProfile ? JSON.parse(savedProfile) : EMPTY_PROFILE);
          setLoading(false);
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

      if (USE_MOCK) {
        // SIMULASI SIMPAN: Masukkan data baru ke localStorage
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
          
          photoUrl: formData.photoFile ? URL.createObjectURL(formData.photoFile) : initialData.photoUrl,
          
          // --- PERBAIKAN LOGIKA CV DI SINI ---
          // Jika cvFileName kosong (dihapus user), kosongkan semuanya.
          // Jika ada cvFileName, cek apakah ada file baru. Jika ada, buat URL baru. Jika tidak, pakai URL lama.
          cvUrl: formData.cvFileName 
                 ? (formData.cvFile ? URL.createObjectURL(formData.cvFile) : initialData.cvUrl) 
                 : null,
                 
          cvFileName: formData.cvFileName 
                 ? (formData.cvFile ? formData.cvFile.name : initialData.cvFileName) 
                 : "",
                 
          cvUploadedAt: formData.cvFileName 
                 ? (formData.cvFile ? `Diunggah ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}` : initialData.cvUploadedAt) 
                 : "",
        };
        
        localStorage.setItem("mock_jobseeker_profile", JSON.stringify(payload));
        
        // Jeda 1 detik agar animasi loading terasa
        setTimeout(() => {
          setSaving(false);
          setShowSuccess(true);
        }, 1000);

      } else {
        // --- REAL API CALLS DI SINI NANTINYA ---
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menyimpan. Coba lagi.");
      setSaving(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/jobseeker/profile"); // Kembali ke halaman profil
  };

  const handleBatal = () => setShowCancelModal(true);
  const handleCancelConfirm = () => navigate("/jobseeker/profile");
  const handleCancelBack = () => setShowCancelModal(false);

  if (loading) {
    return (
      <div className="p-8 max-w-5xl animate-pulse">
        <div className="h-7 bg-gray-200 rounded w-40 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-80 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-48 bg-gray-100 rounded-2xl" />)}
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
