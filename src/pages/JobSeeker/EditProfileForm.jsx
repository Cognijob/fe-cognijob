import { useState, useRef, useEffect } from "react";
import { Trash2, Plus, Paperclip, X, CheckCircle, AlertCircle } from "lucide-react";

// ─── UI Helpers ───────────────────────────────────────────────────────────────

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#4f6af5] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function InputField({ label, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-gray-500">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#4f6af5] transition-colors"
      />
    </div>
  );
}

function TextAreaField({ label, placeholder, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-xs font-medium text-gray-500">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#4f6af5] transition-colors resize-none"
      />
    </div>
  );
}

function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef0f8] text-[#1e2d5a] text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-red-500 transition-colors">
        <X size={11} />
      </button>
    </span>
  );
}

// ─── Modal Sukses ─────────────────────────────────────────────────────────────
function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
        <div className="flex justify-center mb-4">
          <CheckCircle size={56} className="text-green-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-bold text-[#1e2d5a] mb-2">
          Profil Berhasil Diperbarui!
        </h2>
        <p className="text-sm text-gray-500">
          Perubahanmu berhasil disimpan. Profilmu sudah diperbarui.
        </p>
      </div>
    </div>
  );
}

// ─── Modal Konfirmasi Batal ───────────────────────────────────────────────────
function CancelModal({ onBack, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl text-center">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle size={32} className="text-red-500" strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-lg font-bold text-red-500 mb-2">Batalkan Perubahan?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Perubahan yang belum disimpan akan hilang.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Kembali
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Batalkan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN FORM ────────────────────────────────────────────────────────────────
export default function EditProfileForm({
  initialData,
  saving,
  showSuccess,
  showCancelModal,
  onSave,
  onBatal,
  onSuccessClose,
  onCancelConfirm,
  onCancelBack,
}) {
  // ── Data Diri
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [lastEducation, setLastEducation] = useState("");
  const [email, setEmail] = useState("");
  const [totalExperience, setTotalExperience] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const photoInputRef = useRef(null);

  // ── Skill
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // ── Bidang Minat
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState("");

  // ── Prestasi
  const [achievements, setAchievements] = useState([]);

  // ── Volunteering
  const [volunteering, setVolunteering] = useState([]);

  // ── Pengalaman Kerja
  const [workExperiences, setWorkExperiences] = useState([]);

  // ── CV
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState("");
  const [cvUploadedAt, setCvUploadedAt] = useState("");
  const [cvDragging, setCvDragging] = useState(false);
  const cvInputRef = useRef(null);

  // Populate form dari initialData
  useEffect(() => {
    if (!initialData) return;
    setFullName(initialData.fullName || "");
    setLocation(initialData.location || "");
    setCurrentPosition(initialData.currentPosition || "");
    setLastEducation(initialData.lastEducation || "");
    setEmail(initialData.email || "");
    setTotalExperience(initialData.totalExperience || "");
    setPhotoPreview(initialData.photoUrl || null);
    setSkills(initialData.skills || []);
    setInterests(initialData.interests || []);
    setAchievements(
      (initialData.achievements || []).map((a) => ({ ...a, _id: a.id || Date.now() + Math.random() }))
    );
    setVolunteering(
      (initialData.volunteering || []).map((v) => ({ ...v, _id: v.id || Date.now() + Math.random() }))
    );
    setWorkExperiences(
      (initialData.workExperiences || []).map((w) => ({ ...w, _id: w.id || Date.now() + Math.random() }))
    );
    setCvFileName(initialData.cvFileName || "");
    setCvUploadedAt(initialData.cvUploadedAt || "");
  }, [initialData]);

  // ── Handlers: Foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  // ── Handlers: Skill
  const addSkill = () => {
    const val = skillInput.trim();
    if (!val || skills.includes(val)) return;
    setSkills([...skills, val]);
    setSkillInput("");
  };
  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  // ── Handlers: Bidang Minat
  const addInterest = () => {
    const val = interestInput.trim();
    if (!val || interests.includes(val)) return;
    setInterests([...interests, val]);
    setInterestInput("");
  };
  const removeInterest = (item) => setInterests(interests.filter((i) => i !== item));

  // ── Handlers: Prestasi
  const addAchievement = () =>
    setAchievements([...achievements, { _id: Date.now(), title: "", year: "", organizer: "" }]);
  const removeAchievement = (_id) =>
    setAchievements(achievements.filter((a) => a._id !== _id));
  const updateAchievement = (_id, field, value) =>
    setAchievements(achievements.map((a) => (a._id === _id ? { ...a, [field]: value } : a)));

  // ── Handlers: Volunteering
  const addVolunteering = () =>
    setVolunteering([...volunteering, { _id: Date.now(), name: "", role: "", description: "" }]);
  const removeVolunteering = (_id) =>
    setVolunteering(volunteering.filter((v) => v._id !== _id));
  const updateVolunteering = (_id, field, value) =>
    setVolunteering(volunteering.map((v) => (v._id === _id ? { ...v, [field]: value } : v)));

  // ── Handlers: Pengalaman Kerja
  const addWorkExperience = () =>
    setWorkExperiences([
      ...workExperiences,
      { _id: Date.now(), position: "", company: "", type: "", period: "", description: "" },
    ]);
  const removeWorkExperience = (_id) =>
    setWorkExperiences(workExperiences.filter((w) => w._id !== _id));
  const updateWorkExperience = (_id, field, value) =>
    setWorkExperiences(workExperiences.map((w) => (w._id === _id ? { ...w, [field]: value } : w)));

  // ── Handlers: CV
  const handleCvFile = (file) => {
    if (!file || file.type !== "application/pdf") return;
    setCvFile(file);
    setCvFileName(file.name);
    setCvUploadedAt(`Diunggah ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`);
  };
  const handleCvDrop = (e) => {
    e.preventDefault();
    setCvDragging(false);
    handleCvFile(e.dataTransfer.files[0]);
  };
  const removeCV = () => {
    setCvFile(null);
    setCvFileName("");
    setCvUploadedAt("");
  };

  // ── Submit
  const handleSubmit = () => {
    onSave({
      fullName, location, currentPosition, lastEducation,
      email, totalExperience, photoFile,
      skills, interests, workExperiences, achievements, volunteering,
      cvFile,
    });
  };

  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "RS";

  return (
    <>
      {showSuccess && <SuccessModal onClose={onSuccessClose} />}
      {showCancelModal && (
        <CancelModal onBack={onCancelBack} onConfirm={onCancelConfirm} />
      )}

      <div className="p-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1e2d5a]">Edit Profile</h1>
          <p className="text-sm text-gray-500 mt-1">
            Perbarui informasi profilmu agar rekruter mendapat data yang akurat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* ── KIRI ── */}
          <div className="flex flex-col gap-4">
            {/* Data Diri */}
            <SectionCard title="Data Diri">
              {/* Foto */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#1e2d5a] flex items-center justify-center text-white font-bold text-lg overflow-hidden shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} alt="foto" className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/jpg,image/png"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  <button
                    onClick={() => photoInputRef.current?.click()}
                    className="border border-gray-300 text-gray-600 text-xs font-medium px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {photoPreview ? "Ganti foto" : "Input Foto"}
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1">JPG/PNG maks 2 MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <InputField label="Nama Lengkap" placeholder="Nama Lengkap" value={fullName} onChange={setFullName} />
                <InputField label="Lokasi" placeholder="Kota, Negara" value={location} onChange={setLocation} />
                <InputField label="Posisi/Jabatan Saat Ini" placeholder="Posisi/Jabatan" value={currentPosition} onChange={setCurrentPosition} />
                <InputField label="Pendidikan Terakhir" placeholder="Pendidikan Terakhir" value={lastEducation} onChange={setLastEducation} />
                <InputField label="Email" placeholder="Nama@gmail.com" value={email} onChange={setEmail} type="email" />
                <InputField label="Pengalaman Total" placeholder="X Tahun" value={totalExperience} onChange={setTotalExperience} />
              </div>
            </SectionCard>

            {/* Skill Utama */}
            <SectionCard title="Skill Utama">
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Tambah Skill</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Contoh: Python"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-300 focus:outline-none focus:border-[#4f6af5] transition-colors"
                />
                <button
                  onClick={addSkill}
                  className="flex items-center gap-1 border border-[#4f6af5] text-[#4f6af5] text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#eef0f8] transition-colors whitespace-nowrap"
                >
                  <Plus size={13} /> Tambah
                </button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Chip key={skill} label={skill} onRemove={() => removeSkill(skill)} />
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Bidang Minat */}
            <SectionCard title="Bidang Minat">
              <label className="text-xs font-medium text-gray-500 block mb-1.5">Tambah Bidang Minat</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Contoh: Machine Learning"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addInterest()}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-300 focus:outline-none focus:border-[#4f6af5] transition-colors"
                />
                <button
                  onClick={addInterest}
                  className="flex items-center gap-1 border border-[#4f6af5] text-[#4f6af5] text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#eef0f8] transition-colors whitespace-nowrap"
                >
                  <Plus size={13} /> Tambah
                </button>
              </div>
              {interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {interests.map((item) => (
                    <Chip key={item} label={item} onRemove={() => removeInterest(item)} />
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Prestasi & Penghargaan */}
            <SectionCard title="Prestasi & Penghargaan">
              <div className="flex flex-col gap-4">
                {achievements.map((ach, i) => (
                  <div key={ach._id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">Prestasi {i + 1}</span>
                      <button onClick={() => removeAchievement(ach._id)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="grid grid-cols-[1fr_100px] gap-2">
                      <InputField placeholder="Prestasi" value={ach.title} onChange={(v) => updateAchievement(ach._id, "title", v)} />
                      <InputField placeholder="Tahun" value={ach.year} onChange={(v) => updateAchievement(ach._id, "year", v)} />
                    </div>
                    <InputField placeholder="Institusi/Penyelenggara" value={ach.organizer} onChange={(v) => updateAchievement(ach._id, "organizer", v)} />
                  </div>
                ))}
              </div>
              <button
                onClick={addAchievement}
                className="mt-4 flex items-center gap-1 text-[#4f6af5] text-xs font-semibold hover:underline"
              >
                <Plus size={13} /> Tambah
              </button>
            </SectionCard>
          </div>

          {/* ── KANAN ── */}
          <div className="flex flex-col gap-4">
            {/* Volunteering */}
            <SectionCard title="Volunteering">
              <div className="flex flex-col gap-4">
                {volunteering.map((vol, i) => (
                  <div key={vol._id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">Volunteering {i + 1}</span>
                      <button onClick={() => removeVolunteering(vol._id)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <InputField placeholder="Nama Volunteer" value={vol.name} onChange={(v) => updateVolunteering(vol._id, "name", v)} />
                      <InputField placeholder="Peran" value={vol.role} onChange={(v) => updateVolunteering(vol._id, "role", v)} />
                    </div>
                    <TextAreaField placeholder="Deskripsi kegiatan" value={vol.description} onChange={(v) => updateVolunteering(vol._id, "description", v)} />
                  </div>
                ))}
              </div>
              <button
                onClick={addVolunteering}
                className="mt-4 flex items-center gap-1 text-[#4f6af5] text-xs font-semibold hover:underline"
              >
                <Plus size={13} /> Tambah
              </button>
            </SectionCard>

            {/* Pengalaman Kerja */}
            <SectionCard title="Pengalaman Kerja">
              <div className="flex flex-col gap-5">
                {workExperiences.map((exp, i) => (
                  <div key={exp._id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600">Pengalaman {i + 1}</span>
                      <button onClick={() => removeWorkExperience(exp._id)} className="text-gray-300 hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <InputField placeholder="Nama Posisi" value={exp.position} onChange={(v) => updateWorkExperience(exp._id, "position", v)} />
                      <InputField placeholder="Perusahaan" value={exp.company} onChange={(v) => updateWorkExperience(exp._id, "company", v)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <InputField placeholder="Tipe Kerja" value={exp.type} onChange={(v) => updateWorkExperience(exp._id, "type", v)} />
                      <InputField placeholder="Month (Year) - Month (Year)" value={exp.period} onChange={(v) => updateWorkExperience(exp._id, "period", v)} />
                    </div>
                    <TextAreaField placeholder="Deskripsi kegiatan kerja" value={exp.description} onChange={(v) => updateWorkExperience(exp._id, "description", v)} />
                  </div>
                ))}
              </div>
              <button
                onClick={addWorkExperience}
                className="mt-4 flex items-center gap-1 text-[#4f6af5] text-xs font-semibold hover:underline"
              >
                <Plus size={13} /> Tambah
              </button>
            </SectionCard>

            {/* CV */}
            <SectionCard title="CV">
              {cvFileName ? (
                <div className="flex items-center justify-between bg-[#f7f8ff] border border-[#e0e4ff] rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Paperclip size={16} className="text-[#4f6af5]" />
                    <div>
                      <p className="text-xs font-semibold text-[#1e2d5a]">{cvFileName}</p>
                      {cvUploadedAt && (
                        <p className="text-[10px] text-gray-400">{cvUploadedAt}</p>
                      )}
                    </div>
                  </div>
                  <button onClick={removeCV} className="text-gray-300 hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => cvInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setCvDragging(true); }}
                  onDragLeave={() => setCvDragging(false)}
                  onDrop={handleCvDrop}
                  className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                    cvDragging ? "border-[#4f6af5] bg-[#eef0f8]" : "border-gray-200 hover:border-[#4f6af5] hover:bg-[#f7f8ff]"
                  }`}
                >
                  <Paperclip size={22} className="text-gray-300" />
                  <p className="text-xs text-gray-400 text-center">
                    Klik atau drag file ke sini
                    <br />
                    <span className="text-[10px]">PDF maks 5 MB</span>
                  </p>
                </div>
              )}
              <input
                ref={cvInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleCvFile(e.target.files[0])}
              />
            </SectionCard>

            {/* Actions */}
            <div className="flex gap-3 justify-end mt-2">
              <button
                onClick={onBatal}
                className="border border-gray-200 text-gray-600 text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-[#1e2d5a] hover:bg-[#162247] disabled:opacity-60 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}