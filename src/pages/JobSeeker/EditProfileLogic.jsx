import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditProfileForm from "./EditProfileForm";
import { 
  fetchUserProfile, 
  updateUserProfile, 
  uploadUserPhoto, 
  uploadUserCV 
} from "../../services/userServices";

// Helper untuk parse string JSON dari backend
const safeParse = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try {
    return JSON.parse(data);
  } catch (e) {
    if (typeof data === 'string') return data.split(',').map(s => s.trim()).filter(Boolean);
    return [];
  }
};

const EMPTY_PROFILE = {
  fullName: "", location: "", currentPosition: "", lastEducation: "",
  email: "", totalExperience: "", photoUrl: null, cvUrl: null,
  cvFileName: "", cvUploadedAt: "", skills: [], interests: [],
  workExperiences: [], achievements: [], volunteering: [],
};

export default function EditProfileLogic() {
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await fetchUserProfile();
        
        if (res.data && res.data.success) {
          const userData = res.data.data;
          const profileData = userData.profile || {};
          
          const workExps = safeParse(profileData.workExperience);

          setInitialData({
            fullName: userData.name || "",
            location: userData.location || "",
            email: userData.email || "",
            photoUrl: userData.photoUrl || null,
            
            // Format CV
            cvUrl: profileData.cvUrl || null,
            cvFileName: profileData.cvFileName || "",
            cvUploadedAt: profileData.cvUploadedAt 
              ? `Diunggah ${new Date(profileData.cvUploadedAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}` 
              : "",

            // Posisi saat ini diambil dari pengalaman kerja pertama
            currentPosition: workExps.length > 0 ? workExps[0].position || "" : "",
            
            skills: safeParse(profileData.skills),
            interests: safeParse(profileData.interests),
            workExperiences: workExps,
            achievements: safeParse(profileData.awards),
            volunteering: safeParse(profileData.organizationExperience),
          });
        } else {
          setInitialData(EMPTY_PROFILE);
        }
      } catch (err) {
        console.error("Gagal fetch profile:", err);
        setInitialData(EMPTY_PROFILE);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async (formData) => {
    try {
      setSaving(true);

      // 1. Persiapkan payload untuk data teks (PUT /users/profile)
      // Backend menerima firstName dan lastName secara terpisah
      const nameParts = formData.fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Kita stringify data array/object agar aman disimpan ke backend database
      const textPayload = {
        firstName,
        lastName,
        location: formData.location,
        skills: JSON.stringify(formData.skills),
        interests: JSON.stringify(formData.interests),
        workExperience: JSON.stringify(formData.workExperiences),
        awards: JSON.stringify(formData.achievements),
        organizationExperience: JSON.stringify(formData.volunteering)
      };

      // Siapkan array promises agar request bisa berjalan paralel (lebih cepat)
      const apiCalls = [];

      // Masukkan request update teks
      apiCalls.push(updateUserProfile(textPayload));

      // 2. Jika ada file foto baru, tambahkan ke request (POST /users/photo)
      if (formData.photoFile) {
        const photoData = new FormData();
        photoData.append("photo", formData.photoFile);
        apiCalls.push(uploadUserPhoto(photoData));
      }

      // 3. Jika ada file CV baru, tambahkan ke request (POST /users/cv)
      if (formData.cvFile) {
        const cvData = new FormData();
        cvData.append("cv", formData.cvFile);
        apiCalls.push(uploadUserCV(cvData));
      }

      // Eksekusi semua API calls secara bersamaan
      await Promise.all(apiCalls);

      // Jika berhasil semua, tampilkan modal sukses
      setShowSuccess(true);
      
    } catch (err) {
      console.error("Gagal menyimpan profil:", err);
      alert("Terjadi kesalahan saat menyimpan data. Coba lagi nanti.");
    } finally {
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
