import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import '../LoginPage/LoginPage.css'


import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase"; // ajusta si tu ruta es diferente

const usuarios = [
  { email: "chus@gmail.com", password: "123" },
  { email: "maria@correo.com", password: "mar123" },
  { email: "carlos@correo.com", password: "car123" },
  { email: "laura@correo.com", password: "lau123" },
  { email: "andres@correo.com", password: "and123" },
  { email: "camila@correo.com", password: "cam123" },
  { email: "david@correo.com", password: "dav123" },
  { email: "paula@correo.com", password: "Pau123" },
  { email: "jose@correo.com", password: "jos123" },
  { email: "valentina@correo.com", password: "val123" }
];

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Campos vacíos", "Por favor llena todos los campos.", "warning");
      return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(email)) {
      Swal.fire("Correo inválido", "Por favor escribe un correo válido.", "error");
      return;
    }

    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioValido) {
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate("/dashboard");
      });
    } else {
      Swal.fire("Error", "Correo o contraseña incorrectos.", "error");
    }
  };

  // 🔹 Inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      Swal.fire({
        title: `¡Bienvenido, ${user.displayName || user.email}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      Swal.fire("Error", "No se pudo iniciar sesión con Google.", "error");
    }
  };

  return (
    <div className="fondo">
    
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow-sm login-card" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-3">Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  required
                />
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberCheck"
                />
                <label className="form-check-label" htmlFor="rememberCheck">
                  Recuérdame
                </label>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">Entrar</button>
              </div>
            </form>

            <hr className="my-3" />

            {/* 🔹 Botón de Google */}
            <div className="text-center">
              <button type="button" className="btn btn-outline-secondary w-100" onClick={handleGoogleLogin}>
                <i className="bi bi-google text-primary me-2"></i> Iniciar sesión con Google
              </button>

            </div>

            <br />
            <div className="text-center">
              <small className="text-muted">
                ¿No tienes cuenta? <a href="/register">Regístrate</a>
              </small>
              <br />
              <a href="/forgot" className="fs-6">¿Olvidaste tu contraseña?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
