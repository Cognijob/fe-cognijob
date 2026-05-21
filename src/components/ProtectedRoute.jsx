import { Navigate, Outlet } from 'react-router-dom';
import { getToken, getUser } from '../utils/storage';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = getToken();
  const user = getUser();
  
  // Debugging log untuk memastikan data terbaca
  console.log("ProtectedRoute Debug - Token:", token);
  console.log("ProtectedRoute Debug - User:", user);

  // Jika tidak ada token, paksa ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Cek apakah role user ada dalam daftar allowedRoles
  const userRole = user?.role;
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Jika semua lolos, tampilkan halaman 
  return <Outlet />;
}; 

export default ProtectedRoute;