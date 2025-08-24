import { Routes, Route } from "react-router-dom";
import LoginPage from "./authentication/LoginPage";
import RegisterPage from "./authentication/RegisterPage";
import LandingPage from "./UserPanel/LandingPage";
import { Toaster } from "sonner";
import SuperAdminPage from "./SuperAdminPanel/Admin-SuperAdminPage";
import AdminPage from "./AdminPanel/AdminLandingPage";
import VerifyEmailPage from "./authentication/VerifyEmailPage";
import BusinessApplication from "./UserPanel/MyApplication/BusinessApplication";
import EntryPage from "./EntryPanel/EntryPage";

const App = () => {
  return (
    <>
      {/* Sonner Toaster (root-level). Position and props can be adjusted. */}
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<EntryPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user-dashboard" element={<LandingPage />} />
        <Route path="/superadmin" element={<SuperAdminPage />} />
        <Route path="/admin-dashboard" element={<AdminPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/business-application" element={<BusinessApplication />} />
      </Routes>
    </>
  );
};

export default App;
