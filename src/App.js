import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Register";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";  
import Usestate from "./pages/Playground/usestate";
import Useffect from "./pages/Playground/useEffect";
import Hijo from "./pages/Playground/useContext";
import Useref from "./pages/Playground/useRef";
import Usememo from "./pages/Playground/useMemo";


function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<LoginPage/>}/>
      <Route path="/register" element ={<RegisterPage/>}/>
      <Route path="/forgot" element ={<ForgotPasswordPage/>}/>
      <Route path="/dashboard" element ={<DashboardPage/>}/>
      {/* Rutas Hooks */}
      <Route path="/useState" element ={<Usestate/>}/>
      <Route path="/useEffect" element ={<Useffect/>}/>
      <Route path="/useContext" element ={<Hijo/>}/>
      <Route path="/useRef" element ={<Useref/>}/>
       <Route path="/useMemo" element ={<Usememo/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

