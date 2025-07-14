import React from "react";
import '../DashboardPage/DashboardPage.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export default function HeadersExample() {
    const navigate = useNavigate();
   
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesion: ", error);
          
        }
    };
    return (
        <>

            <header className="p-3 text-bg-dark border-bottom">

                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                                <use xlinkHref="#bootstrap" />
                            </svg>
                        </a>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="/" className="nav-link px-2 text-primary"> Bienvenido </a></li>
                        </ul>
                        <div className="text-end">
                            <button onClick={handleLogout} className="btn btn-primary">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
                <p className="fs-1 text-primary fw-bold">Bienvenido a la interfaz</p>
            </div>


        </>
    );
}
