import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import Halaman Publik
import LandingPage from './pages/LandingPage'
import RegisterSelection from './pages/RegisterSelection'
import Register from './pages/Register'
import Login from './pages/Login' 

// Import Layout dan Halaman Recruiter
import RecruiterLayout from './components/layout/RecruiterLayout'
import DashboardOverview from './pages/recruiter/DashboardOverview'
import JobDetail from './pages/recruiter/JobDetail'
import Settings from './pages/recruiter/Settings'
import CreateJob from './pages/recruiter/CreateJob'


/**
 * PlaceholderPage digunakan sementara untuk menu yang belum memiliki file halaman sendiri.
 * Ini mencegah aplikasi error saat kamu menekan menu di Sidebar.
 */
const PlaceholderPage = ({ title }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/5 animate-fade-in">
    <h1 className="text-2xl font-bold text-[#0B173D]">{title}</h1>
    <p className="text-gray-500 mt-2">Halaman ini sedang dalam tahap pengembangan.</p>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= RUTE PUBLIK ================= */}
        {/* Halaman utama atau Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Alur Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Alur Registrasi */}
        <Route path="/register" element={<RegisterSelection />} />
        <Route path="/register/:role" element={<Register />} />


        {/* ================= RUTE DASHBOARD RECRUITER ================= */}
        {/* Semua rute di dalam grup ini akan dibungkus oleh RecruiterLayout 
            yang berisi Sidebar statis di sebelah kiri.
        */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          
          {/* Default landing page untuk recruiter: /recruiter/dashboard */}
          <Route path="dashboard" element={<DashboardOverview />} />
          
          {/* Detail spesifik lowongan berdasarkan ID: /recruiter/dashboard/job/:id */}
          <Route path="dashboard/job/:id" element={<JobDetail />} />
          
          {/* Menu manajemen lainnya sesuai PRD */}
          <Route path="jobs" element={<PlaceholderPage title="Job Management" />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="applicants" element={<PlaceholderPage title="Applicant Management" />} />
          <Route path="messages" element={<PlaceholderPage title="Messages" />} />
          <Route path="company-profile" element={<PlaceholderPage title="Company Profile" />} />
          <Route path="settings" element={<Settings />} />
          
          
        </Route>

        {/* Catatan: Jika user mengetik URL yang salah, 
            kamu bisa menambahkan rute 404 di sini nantinya. 
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App