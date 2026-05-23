import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import page Publik
import LandingPage from "./pages/LandingPage";
import RegisterSelection from "./pages/RegisterSelection";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Import layout & page recruiter
import RecruiterLayout from "./components/layout/RecruiterLayout";
import DashboardOverview from "./pages/recruiter/DashboardOverview";
import JobDetail from "./pages/recruiter/JobDetail";
import Settings from "./pages/recruiter/Settings";
import CreateJob from "./pages/recruiter/CreateJob";
import Jobs from "./pages/recruiter/Jobs";
import EditJob from "./pages/recruiter/EditJob";
import Messages from "./pages/recruiter/Messages";
import ApplicantManagement from "./pages/recruiter/ApplicantManagement";
import ApplicantList from "./pages/recruiter/ApplicantList";
import ApplicantDetail from "./pages/recruiter/ApplicantDetail";
import CompanyProfile from "./pages/recruiter/CompanyProfile";

// Import Job Seeker
import JobseekerLayout from "./components/layout/JobseekerLayout";
import DashboardJobseeker from "./pages/JobSeeker/DashboardJobseeker";
import ProfileLogic from "./pages/JobSeeker/ProfileLogic";
import EditProfileLogic from "./pages/JobSeeker/EditProfileLogic";
import Notif from "./pages/JobSeeker/Notif";
import MessagesJob from "./pages/JobSeeker/MessagesJob";
import Companies from "./pages/JobSeeker/Companies";
import ApplicantStatus from "./pages/JobSeeker/ApplicantStatus";
import DetailJobListing from "./pages/JobSeeker/DetailJobListing";
import LamarJob from "./pages/JobSeeker/LamarJob";

const PlaceholderPage = ({ title }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border border-black/5 animate-fade-in">
    <h1 className="text-2xl font-bold text-[#0B173D]">{title}</h1>
    <p className="text-gray-500 mt-2">
      Halaman ini sedang dalam tahap dev.
    </p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= RUTE PUBLIK ================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterSelection />} />
        <Route path="/register/:role" element={<Register />} />

        {/* ================= RUTE DASHBOARD RECRUITER ================= */}
        <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}>
          <Route path="/recruiter" element={<RecruiterLayout />}>
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/job/:id" element={<JobDetail />} />
            <Route path="create-job" element={<CreateJob />} />
            <Route path="edit-job/:id" element={<EditJob />} />
            <Route path="applicants" element={<ApplicantManagement />} />
            <Route
              path="applicants/list/:jobId"
              element={<ApplicantList />}
            />
            <Route
              path="applicant/detail/:id"
              element={<ApplicantDetail />}
            />
            <Route path="messages" element={<Messages />} />
            <Route
              path="company-profile"
              element={<CompanyProfile />}
            />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* ================= RUTE DASHBOARD JOB SEEKER ================= */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={["job_seeker", "jobseeker"]}
            />
          }
        >
          <Route
            path="/jobseeker"
            element={<JobseekerLayout />}
          >
            <Route
              path="joblisting"
              element={<DashboardJobseeker />}
            />

            <Route
              path="companies"
              element={<Companies />}
            />

            <Route
              path="messages"
              element={<MessagesJob />}
            />

            <Route
              path="applicant-status"
              element={<ApplicantStatus />}
            />

            <Route
              path="notifications"
              element={<Notif />}
            />

            <Route
              path="profile"
              element={<ProfileLogic />}
            />

            <Route
              path="editprofile"
              element={<EditProfileLogic />}
            />

            <Route
              path="joblisting/:id"
              element={<DetailJobListing />}
            />

            <Route
              path="joblisting/:id/lamar"
              element={<LamarJob />}
            />
          </Route>
        </Route>

        {/* jika user mengetik URL yang salah, bisa tambahkan rute 404 di sini. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;