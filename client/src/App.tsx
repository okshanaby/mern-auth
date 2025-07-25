import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import ResetPasswordPage from "./pages/reset-password";
import SignupPage from "./pages/signup";
import VerifyAccountPage from "./pages/verify-account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-account" element={<VerifyAccountPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
