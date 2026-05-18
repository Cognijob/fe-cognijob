import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import page Publik
import LandingPage from './pages/LandingPage'
import RegisterSelection from './pages/RegisterSelection'
import Register from './pages/Register'
import Login from './pages/Login' 

// Import layout & page recruiter
import RecruiterLayout from './components/layout/RecruiterLayout'
import DashboardOverview from './pages/recruiter/DashboardOverview'
import JobDetail from './pages/recruiter/JobDetail'
import Settings from './pages/recruiter/Settings'
import CreateJob from './pages/recruiter/CreateJob'
import Jobs from './pages/recruiter/Jobs'
import EditJob from './pages/recruiter/EditJob'
import Messages from './pages/recruiter/Messages'
import ApplicantManagement from "./pages/recruiter/ApplicantManagement"
import CompanyProfile from "./pages/recruiter/CompanyProfile";

// Import Job Seeker
import JobseekerLayout from './components/layout/JobseekerLayout' 
import DashboardJobseeker from './pages/JobSeeker/DashboardJobseeker'
import Profile from './pages/JobSeeker/ProfileEmpty'
import ProfileEmpty from './pages/JobSeeker/ProfileEmpty'
import ProfileFilled from './pages/JobSeeker/ProfileFilled'
import EditProfileForm from './pages/JobSeeker/EditProfileForm'
import Notif from './pages/JobSeeker/Notif'
import MessagesJob from './pages/JobSeeker/MessagesJob'

const PlaceholderPage = ({ title }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/5 animate-fade-in">
    <h1 className="text-2xl font-bold text-[#0B173D]">{title}</h1>
    <p className="text-gray-500 mt-2">Halaman ini sedang dalam tahap dev.</p>
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
          {/* Menu manajemen lainnya*/}
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/job/:id" element={<JobDetail />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="edit-job/:id" element={<EditJob />} />
          <Route path="applicants" element={<ApplicantManagement />} />
          <Route path="messages" element={<Messages />} />
          <Route path="company-profile" element={<CompanyProfile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

          {/* RUTE DASHBOARD JOB SEEKER */}
          <Route path="/jobseeker" element={<JobseekerLayout />}>
          {/* Default page: /jobseeker/joblisting */}
          <Route path="joblisting" element={<DashboardJobseeker />} />
          {/* Placeholder untuk menu lainnya */}
          <Route path="companies" element={<PlaceholderPage title="Companies" />} />
          <Route path="messages" element={<MessagesJob />} />
          <Route path="status" element={<PlaceholderPage title="Applicant Status" />} />
          <Route path="notifications" element={<Notif />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profileform" element={<ProfileFilled />} />
          <Route path="profileempty" element={<ProfileEmpty />} />
          <Route path="editprofileform" element={<EditProfileForm />} />
          
        </Route>


        {/* jika user mengetik URL yang salah, 
             bisa tambahkan rute 404 di sini. 
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App