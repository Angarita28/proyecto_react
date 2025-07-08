import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/Register";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";  


function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element ={<LoginPage/>}/>
      <Route path="/register" element ={<RegisterPage/>}/>
      <Route path="/forgot" element ={<ForgotPasswordPage/>}/>
      <Route path="/dashboard" element ={<DashboardPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

