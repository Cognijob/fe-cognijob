import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileEmpty from "./ProfileEmpty";
import ProfileFilled from "./ProfileFilled";
import { fetchUserProfile } from "../../services/userServices";

// Helper untuk memastikan data yang diambil (bisa array, string CSV, atau JSON String) ter-parse dengan aman
const safeParse = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try {
    return JSON.parse(data);
  } catch (e) {
    // Jika formatnya comma-separated string (biasa terjadi pada skills/interests)
    if (typeof data === 'string') {
      return data.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  }
};

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

export default function ProfileLogic() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await fetchUserProfile();
        
        if (res.data && res.data.success) {
          const userData = res.data.data;
          const profileData = userData.profile || {};

          // Mapping data backend ke format UI ProfileFilled
          const mappedProfile = {
            fullName: userData.name || "",
            location: userData.location || "",
            email: userData.email || "",
            photoUrl: userData.photoUrl || null,
            cvUrl: profileData.cvUrl || null,
            
            // Menggunakan helper agar string JSON diparse ke Array
            skills: safeParse(profileData.skills),
            interests: safeParse(profileData.interests),
            workExperiences: safeParse(profileData.workExperience),
            achievements: safeParse(profileData.awards), // mapping awards -> achievements
            volunteering: safeParse(profileData.organizationExperience), // mapping org -> volunteering
          };

          // Ambil current position dari pekerjaan terakhir (elemen pertama di array workExperiences)
          if (mappedProfile.workExperiences.length > 0) {
            mappedProfile.currentPosition = mappedProfile.workExperiences[0].position || "";
          } else {
            mappedProfile.currentPosition = "";
          }

          setProfile(mappedProfile);
        }
      } catch (err) {
        console.error("Gagal memuat data profil:", err);
        setError("Gagal memuat data profil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleEdit = () => navigate("/jobseeker/editprofile");

  if (loading) return <ProfileSkeleton />;

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center gap-3 text-center min-h-[50vh]">
        <p className="text-red-500 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-[#1e2d5a] underline font-bold">
          Coba lagi
        </button>
      </div>
    );
  }

  // Kriteria tampilan Profile Empty:
  // Jika Jobseeker belum mengisi skill, pengalaman kerja, CV, dan pendidikan/awards.
  const isEmpty = 
    !profile?.skills?.length && 
    !profile?.workExperiences?.length && 
    !profile?.cvUrl &&
    !profile?.achievements?.length;

  return isEmpty ? (
    <ProfileEmpty onEdit={handleEdit} />
  ) : (
    <ProfileFilled profile={profile} onEdit={handleEdit} />
  );
}