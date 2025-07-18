import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/Register";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Usestate from "./pages/Playground/usestate";
import Useffect from "./pages/Playground/useEffect";
import Hijo from "./pages/Playground/useContext";
import Useref from "./pages/Playground/useRef";
import Usememo from "./pages/Playground/useMemo";
import NotFoundPage from './pages/components/NotFoundPage';
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";

// Protege rutas con autenticación Firebase
import ProtectedRoute from './pages/components/ProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta publicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />

        {/* Ruta publica con Firebase Auth */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Ruta protegida con Firebase Auth */}
        <Route path="/dashboard" element={<ProtectedRoute> <DashboardPage /> </ProtectedRoute>} />

        {/* Ruta genérica para páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
        {/* Rutas Hooks */}
        <Route path="/useState" element={<Usestate />} />
        <Route path="/useEffect" element={<Useffect />} />
        <Route path="/useContext" element={<Hijo />} />
        <Route path="/useRef" element={<Useref />} />
        <Route path="/useMemo" element={<Usememo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

