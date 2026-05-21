import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileEmpty from "./ProfileEmpty";
import ProfileFilled from "./ProfileFilled";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const profileApi = {
  getProfile: () => axios.get(`${BASE_URL}/profile`),
};

const USE_MOCK = true;

// 1. KITA BUAT DATA BAWAANNYA KOSONG TOTAL
const EMPTY_PROFILE = {
  fullName: "",
  location: "",
  currentPosition: "",
  lastEducation: "",
  email: "",
  totalExperience: "",
  photoUrl: null,
  cvUrl: null,
  skills: [],
  interests: [],
  workExperiences: [],
  achievements: [],
  volunteering: [],
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
          // 2. CEK LOCALSTORAGE: Jika ada data tersimpan, pakai itu. Jika tidak, pakai data kosong.
          const savedProfile = localStorage.getItem("mock_jobseeker_profile");
          if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
          } else {
            setProfile(EMPTY_PROFILE);
          }
          setLoading(false);
          return;
        }
        
        const { data } = await profileApi.getProfile();
        setProfile(data);
      } catch (err) {
        setError("Gagal memuat data profil.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => navigate("/jobseeker/editprofile");

  // Jika nama, skill, dan pengalaman kosong, maka dianggap benar-benar kosong
  const isEmpty = !profile?.fullName && !profile?.skills?.length && !profile?.workExperiences?.length;

  if (loading) return <ProfileSkeleton />;

  if (error) {
    return (
      <div className="p-8 flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <button onClick={() => window.location.reload()} className="text-sm text-[#1e2d5a] underline">Coba lagi</button>
      </div>
    );
  }

  // Jika kosong, tampilkan gambar 1 (ProfileEmpty), jika terisi tampilkan gambar 2 (ProfileFilled)
  return isEmpty ? (
    <ProfileEmpty onEdit={handleEdit} />
  ) : (
    <ProfileFilled profile={profile} onEdit={handleEdit} />
  );
}
