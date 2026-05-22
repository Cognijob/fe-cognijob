import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobDetail, updateJob } from "../../services/jobServices";
import { ChevronDown } from "lucide-react";

export default function EditJob() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    employmentType: "Full-time",
    salaryRange: "",
    status: "draft",
  });

  // Ambil data terbaru dari API 
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobDetail(id);
        const jobDataFromApi = response.data.data; 
        setJobData({
          title: jobDataFromApi.title || "",
          description: jobDataFromApi.description || "",
          requirements: jobDataFromApi.requirements || "",
          location: jobDataFromApi.location || "",
          employmentType: jobDataFromApi.employmentType || "Full-time",
          salaryRange: jobDataFromApi.salaryRange || "",
          status: jobDataFromApi.status || "draft",
        });
        } catch (err) {
          console.error("Gagal ambil data:", err);
      }
    };
    fetchJob();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      // update statusnya
      const updatedData = { ...jobData, status: newStatus };
      await updateJob(id, updatedData);
      navigate("/recruiter/jobs");
    } catch (err) {
      alert("Gagal memperbarui status");
    }
  };

  const handleSave = async () => {
    try {
      await updateJob(id, jobData);
      navigate("/recruiter/jobs");
    } catch (err) {
      alert("Gagal menyimpan perubahan");
    }
  };

  // Tombol utama (Publish / Tutup)
const handlePrimaryAction = () => {
  navigate("/recruiter/jobs");
};

  return (
    <div className="p-8">
      {/* Header Halaman */}
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-[#0B173D]">
          Edit Lowongan Pekerjaan
        </h1>
        <p className="text-[#8A95A5] text-[16px]">
          Perbarui informasi lowongan pekerjaan.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#E9EBF8] rounded-[20px] p-10 max-w-[850px] mx-auto">
        <h2 className="text-[20px] font-bold text-[#0B173D] mb-6">
          Informasi Lowongan Pekerjaan
        </h2>

        <div className="space-y-6">
          {/* Posisi Pekerjaan */}
          <div>
            <label className="block text-[14px] font-bold text-[#0B173D] mb-2">
              Posisi Pekerjaan
            </label>
            <input
              type="text"
              placeholder="Masukkan posisi pekerjaan"
              value={jobData.title}
              onChange={(e) =>
                setJobData({ ...jobData, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-white bg-white text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all"
            />
          </div>

          {/* Deskripsi Pekerjaan */}
          <div>
            <label className="block text-[14px] font-bold text-[#0B173D] mb-2">
              Deskripsi Pekerjaan
            </label>
            <textarea
              rows="4"
              value={jobData.description}
              onChange={(e) =>
                setJobData({ ...jobData, description: e.target.value })
              }
              placeholder="Penjelasan mengenai tanggung jawab, harapan, dan konteks pekerjaan..."
              className="w-full px-4 py-3 rounded-lg border border-white bg-white text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all resize-none"
            />
          </div>

          {/* Kualifikasi */}
          <div>
            <label className="block text-[14px] font-bold text-[#0B173D] mb-2">
              Kualifikasi/Requirements
            </label>
            <textarea
              rows="3"
              value={jobData.requirements}
              onChange={(e) =>
                setJobData({ ...jobData, requirements: e.target.value })
              }
              placeholder="Kualifikasi"
              className="w-full px-4 py-3 rounded-lg border border-white bg-white text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all resize-none"
            />
          </div>

          {/* Lokasi & Tipe */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[14px] font-bold text-[#0B173D] mb-2">
                Lokasi
              </label>
              <input
                type="text"
                value={jobData.location}
                onChange={(e) =>
                  setJobData({ ...jobData, location: e.target.value })
                }
                placeholder="Jakarta"
                className="w-full px-4 py-3 rounded-lg border border-white bg-white text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all"
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-[14px] font-bold text-[#0B173D] mb-2">
                Tipe pekerjaan
              </label>

              <div className="relative">
                <select
                  value={jobData.employmentType}
                  onChange={(e) =>
                    setJobData({ ...jobData, employmentType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-white bg-white text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all appearance-none cursor-pointer"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* Rentang Gaji */}
          <div className="w-1/2 pr-3">
            <label className="block text-[14px] font-bold text-[#0B173D] mb-2">
              Rentang Gaji (Opsional)
            </label>
            <input
              type="text"
              value={jobData.salaryRange}
              onChange={(e) =>
                setJobData({ ...jobData, salaryRange: e.target.value })
              }
              placeholder="Rp15-25 juta/bulan"
              className="w-full px-4 py-3 rounded-lg border border-white bg-white text-[#0B173D] focus:outline-none focus:ring-2 focus:ring-[#1E42AC]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => handleStatusChange(jobData.status === 'published' ? 'closed' : 'published')}
          className={`px-10 py-2 rounded-lg border font-bold bg-white transition-all duration-300 hover:text-white hover:shadow-lg ${
            jobData.status?.toLowerCase() === "published"
              ? "border-red-500 text-red-500 hover:bg-red-500" 
              : "border-[#1E42AC] text-[#1E42AC] hover:bg-[#1E42AC]" 
          }`}
        >
          {jobData.status?.toLowerCase() === "published"
            ? "Tutup Lowongan"
            : "Publikasikan Lowongan"}
        </button>

        <button
          onClick={handleSave}
          className="px-10 py-2 rounded-lg border border-[#1E42AC] text-[#1E42AC] font-bold bg-white transition-all duration-300 hover:bg-[#1E42AC] hover:text-white hover:shadow-lg"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}