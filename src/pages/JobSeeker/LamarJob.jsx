import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Paperclip, Plus, Trash2, X, CheckCircle, AlertCircle } from 'lucide-react';

const LamarJob = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // STATE
  const [cvOption, setCvOption] = useState('profil'); // 'profil' atau 'baru'
  const [showBatalModal, setShowBatalModal] = useState(false);
  const [showSuksesModal, setShowSuksesModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Data Diri state
  const [pengalamanTotal, setPengalamanTotal] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [pendidikan, setPendidikan] = useState('');

  // Skills state
  const [skills, setSkills] = useState(['PostgreSQL']);
  const [skillInput, setSkillInput] = useState('');

  // Pengalaman Kerja state
  const [pengalamanList, setPengalamanList] = useState([
    { id: 1, namaPosit: 'Backend Engineer', perusahaan: 'Tech Startup A', tipeKerja: 'Full-time', periode: 'Jan 2023-Jan 2025' }
  ]);

  const jobTitle = location.state?.jobTitle || "Senior BackEnd Engineer";
  const jobLocation = location.state?.location || "Jakarta";
  const jobType = location.state?.jobType || "Full-time";
  const salary = location.state?.salary || "Rp 15-25 Juta/Bulan";

  // Handlers
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddPengalaman = () => {
    const newId = pengalamanList.length + 1;
    setPengalamanList([...pengalamanList, { id: newId, namaPosit: '', perusahaan: '', tipeKerja: '', periode: '' }]);
  };

  const handleRemovePengalaman = (id) => {
    setPengalamanList(pengalamanList.filter(p => p.id !== id));
  };

  const handlePengalamanChange = (id, field, value) => {
    setPengalamanList(pengalamanList.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleFileUpload = (file) => {
    if (file && file.type === 'application/pdf' && file.size <= 5 * 1024 * 1024) {
      setUploadedFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleKirimLamaran = () => {
    setShowSuksesModal(true);
  };

  const handleBatal = () => {
    setShowBatalModal(true);
  };

  const handleBatalkanLamaran = () => {
    setShowBatalModal(false);
    navigate(-1);
  };

  const handleSuksesTutup = () => {
    setShowSuksesModal(false);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#FBFAFF] font-poppins">
      <div className="max-w-[700px] mx-auto px-4 py-8">

        {/* Judul */}
        <h1 className="text-[28px] font-bold text-black mb-1">Lamar Pekerjaan</h1>
        <p className="text-gray-500 mb-8 text-[15px]">
          Ajukan lamaranmu dengan mudah dengan hanya mengirim CV berisi data yang dibutuhkan untuk melamar.
        </p>

        {/* Card Info Pekerjaan */}
        <div className="bg-white border border-[#0B173D] rounded-[20px] px-6 py-5 mb-5 flex items-center gap-5 shadow-sm">
          <div className="w-[60px] h-[60px] bg-[#112664] rounded-[10px] flex items-center justify-center text-white font-bold text-[22px] shrink-0">
            TN
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-black leading-tight">{jobTitle}</h2>
            <p className="text-[#B4B2A9] text-[15px] font-semibold mt-0.5">
              {jobLocation} &nbsp; {jobType}
            </p>
            <p className="text-[#B4B2A9] text-[14px] font-semibold">{salary}</p>
          </div>
        </div>

        {/* Banner Lamaran Anonim */}
        <div className="bg-[#EEF2FF] border border-[#1E42AC] rounded-[20px] px-6 py-4 mb-5">
          <p className="text-[#1E42AC] font-bold text-[15px] mb-1">Lamaran Anonim Aktif</p>
          <p className="text-[#1E42AC] text-[13px] font-medium leading-snug">
            Identitas sensitif kamu akan disembunyikan dari recruiter pada tahap awal seleksi. Kamu akan dinilai berdasarkan kemampuan, bukan identitas.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#1E42AC] rounded-[20px] shadow-md overflow-hidden">

          {/* Header Form - Tidak ikut scroll */}
          <div className="px-8 pt-7 pb-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[20px] font-bold text-[#1E42AC]">Kirim Lamaran</h3>
              <span className="text-gray-500 text-[13px]">*Wajib diisi</span>
            </div>

            <p className="text-[#B4B2A9] font-semibold text-[14px] mb-4 tracking-wider uppercase">CV / PROFIL</p>

            {/* Radio Buttons */}
            <div className="space-y-3 mb-2">
              {/* Opsi 1 */}
              <label
                className={`flex items-center gap-3 px-5 py-4 border rounded-[20px] cursor-pointer transition-all ${
                  cvOption === 'profil'
                    ? 'border-[#1E42AC] bg-[#CDD6EE]'
                    : 'border-[#CDD6EE] bg-white'
                }`}
              >
                <div
                  className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    cvOption === 'profil' ? 'border-[#1E42AC] bg-[#1E42AC]' : 'border-[#1E42AC] bg-white'
                  }`}
                  onClick={() => setCvOption('profil')}
                >
                  {cvOption === 'profil' && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span
                  className="text-[#09090B] font-semibold text-[15px]"
                  onClick={() => setCvOption('profil')}
                >
                  Gunakan CV dari profil saya
                </span>
              </label>

              {/* Opsi 2 */}
              <label
                className={`flex items-center gap-3 px-5 py-4 border rounded-[20px] cursor-pointer transition-all ${
                  cvOption === 'baru'
                    ? 'border-[#1E42AC] bg-[#CDD6EE]'
                    : 'border-[#CDD6EE] bg-white'
                }`}
              >
                <div
                  className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    cvOption === 'baru' ? 'border-[#1E42AC] bg-[#1E42AC]' : 'border-[#1E42AC] bg-white'
                  }`}
                  onClick={() => setCvOption('baru')}
                >
                  {cvOption === 'baru' && (
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span
                  className="text-[#09090B] font-semibold text-[15px]"
                  onClick={() => setCvOption('baru')}
                >
                  Upload CV baru
                </span>
              </label>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="px-8 pb-6">

            {/* Upload Area (tampil di kedua opsi) */}
            <div
              className={`border-2 border-dashed rounded-[20px] p-8 flex flex-col items-center justify-center transition-all cursor-pointer mb-6 ${
                isDragging ? 'border-[#1E42AC] bg-[#EEF2FF]' : 'border-gray-300 bg-[rgba(217,217,217,0.2)]'
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('cv-file-input').click()}
            >
              <input
                id="cv-file-input"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" className="mb-2 text-gray-400">
                <path d="M24.79 13.56A8.75 8.75 0 1 0 10.5 21.875" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.25 22.75L17.5 17.5l5.25 5.25" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 17.5V30.625" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {uploadedFile ? (
                <p className="text-[13px] font-semibold text-[#1E42AC]">{uploadedFile.name}</p>
              ) : (
                <>
                  <p className="text-[13px] font-semibold text-[#09090B]">Klik atau drag file ke sini</p>
                  <p className="text-[12px] text-gray-500">PDF maks 5 MB</p>
                </>
              )}
            </div>

            {/* Konten Tambahan hanya untuk "Upload CV baru" */}
            {cvOption === 'baru' && (
              <div className="space-y-7">

                {/* Warning Banner */}
                <div className="bg-[#F6EFCF] border border-[#AC7F1E] rounded-[20px] px-5 py-3">
                  <p className="text-[#AC7F1E] font-semibold text-[13px] leading-snug">
                    Karena kamu mengupload CV baru, lengkapi data berikut agar rekruter bisa menilai lamaranmu dengan benar.
                  </p>
                </div>

                {/* Data Diri */}
                <section>
                  <h4 className="font-bold text-[#09090B] text-[16px] mb-4">Data Diri</h4>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[14px] font-semibold text-black mb-2">Pengalaman Total</label>
                      <input
                        type="text"
                        placeholder="5 Tahun"
                        value={pengalamanTotal}
                        onChange={(e) => setPengalamanTotal(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-[14px] text-[#464555] outline-none border-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-semibold text-black mb-2">Lokasi</label>
                      <input
                        type="text"
                        placeholder="Jakarta, Indonesia"
                        value={lokasi}
                        onChange={(e) => setLokasi(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-[14px] text-[#464555] outline-none border-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-semibold text-black mb-2">Pendidikan Terakhir</label>
                    <input
                      type="text"
                      placeholder="S1 Sistem Informasi"
                      value={pendidikan}
                      onChange={(e) => setPendidikan(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-[14px] text-[#464555] outline-none border-none"
                    />
                  </div>
                </section>

                {/* Skill Utama */}
                <section>
                  <h4 className="font-bold text-[#09090B] text-[16px] mb-3">Skill Utama</h4>

                  <div className="flex gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Contoh: Python"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                      className="flex-1 px-4 py-2.5 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-[14px] text-[#464555] outline-none border-none"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="flex items-center gap-1.5 px-4 py-2 border border-[#1E42AC] bg-white text-[#1E42AC] font-semibold text-[13px] rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#EEF2FF] transition-colors"
                    >
                      <Plus size={15} />
                      Tambah
                    </button>
                  </div>

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="flex items-center gap-1.5 bg-[#CDD6EE] border border-[#1E42AC] text-[#1E42AC] px-3 py-1 rounded-[10px] text-[12px] font-semibold shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                        >
                          {skill}
                          <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500 transition-colors">
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </section>

                {/* Pengalaman Kerja */}
                <section>
                  <h4 className="font-bold text-[#09090B] text-[16px] mb-3">Pengalaman Kerja</h4>

                  <div className="space-y-4">
                    {pengalamanList.map((exp, index) => (
                      <div key={exp.id} className="border border-[#1E42AC] rounded-[10px] p-5 bg-white">
                        <div className="flex justify-between items-center mb-4">
                          <p className="font-bold text-black text-[15px]">Pengalaman {index + 1}</p>
                          {pengalamanList.length > 1 && (
                            <button
                              onClick={() => handleRemovePengalaman(exp.id)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-[13px] font-semibold text-black mb-1.5">Nama Posisi</label>
                            <input
                              type="text"
                              placeholder="Backend Engineer"
                              value={exp.namaPosit}
                              onChange={(e) => handlePengalamanChange(exp.id, 'namaPosit', e.target.value)}
                              className="w-full px-3 py-2 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-[13px] text-[#464555] outline-none border-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-black mb-1.5">Perusahaan</label>
                            <input
                              type="text"
                              placeholder="Tech Startup A"
                              value={exp.perusahaan}
                              onChange={(e) => handlePengalamanChange(exp.id, 'perusahaan', e.target.value)}
                              className="w-full px-3 py-2 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-[13px] text-[#464555] outline-none border-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[13px] font-semibold text-black mb-1.5">Tipe Kerja</label>
                            <input
                              type="text"
                              placeholder="Full-time"
                              value={exp.tipeKerja}
                              onChange={(e) => handlePengalamanChange(exp.id, 'tipeKerja', e.target.value)}
                              className="w-full px-3 py-2 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-[13px] text-[#464555] outline-none border-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-semibold text-black mb-1.5">Periode</label>
                            <input
                              type="text"
                              placeholder="Jan 2023-Jan 2025"
                              value={exp.periode}
                              onChange={(e) => handlePengalamanChange(exp.id, 'periode', e.target.value)}
                              className="w-full px-3 py-2 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] text-[13px] text-[#464555] outline-none border-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleAddPengalaman}
                    className="flex items-center gap-1.5 mt-3 border border-[#1E42AC] bg-white text-[#1E42AC] font-semibold text-[13px] rounded-[10px] px-4 py-2 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#EEF2FF] transition-colors"
                  >
                    <Plus size={15} />
                    Tambah
                  </button>
                </section>
              </div>
            )}
          </div>

          {/* Footer Buttons - Tidak ikut scroll */}
          <div className="px-8 py-5 border-t border-gray-100 flex gap-4 bg-white">
            <button
              onClick={handleBatal}
              className="flex-1 py-3 border border-[#1E42AC] text-black font-semibold rounded-[10px] text-[15px] hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleKirimLamaran}
              className="flex-1 py-3 bg-[#1E42AC] text-white font-semibold rounded-[10px] text-[15px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#1735a0] transition-colors"
            >
              Kirim Lamaran
            </button>
          </div>
        </div>
      </div>

      {/* ===== MODAL BATALKAN LAMARAN ===== */}
      {showBatalModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[420px] p-8 flex flex-col items-center text-center">
            {/* Icon */}
            <div className="w-[70px] h-[70px] rounded-full bg-red-100 flex items-center justify-center mb-5">
              <AlertCircle className="text-red-600" size={38} />
            </div>

            <h2 className="text-[20px] font-bold text-red-600 mb-2">Batalkan Lamaran?</h2>
            <p className="text-gray-500 text-[14px] mb-8">Data yang sudah kamu isi akan hilang.</p>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowBatalModal(false)}
                className="flex-1 py-3 border border-[#1E42AC] text-black font-semibold rounded-[10px] text-[14px] hover:bg-gray-50 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleBatalkanLamaran}
                className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-[10px] text-[14px] hover:bg-red-700 transition-colors"
              >
                Batalkan Lamaran
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL SUKSES TERKIRIM ===== */}
      {showSuksesModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-[420px] p-8 relative">
            {/* Close button */}
            <button
              onClick={handleSuksesTutup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="w-[70px] h-[70px] rounded-full bg-green-100 flex items-center justify-center mb-5">
                <CheckCircle className="text-green-600" size={40} />
              </div>

              <h2 className="text-[20px] font-bold text-green-600 mb-3">Lamaranmu Berhasil Terkirim!</h2>

              <p className="text-gray-600 text-[14px] text-justify leading-relaxed mb-4">
                Lamaranmu dikirim secara anonim. Rekruter akan menilaimu berdasarkan kemampuanmu. Pantau statusnya di halaman Applicant Status.
              </p>

              <p className="text-[#1E42AC] font-bold italic text-[14px]">Semoga Berhasil!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LamarJob;
