// src/components/PrivateRoute.js
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"; // ajusta si es necesario

const PrivateRoute = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  if (cargando) return <p className="text-center mt-5">Cargando...</p>;

  return usuario ? children : <Navigate to="/" />;
};

export default PrivateRoute;
