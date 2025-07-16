import { useState } from 'react';
import Swal from 'sweetalert2';
import { auth, provider, db } from '../../firebase';
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Campos vacíos", "Por favor llena todos los campos.", "warning");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.estado === "Inactivo") {
          Swal.fire("Acceso denegado", "Tu cuenta está inactiva. Contacta al administrador.", "error");
          return;
        }
      }

      Swal.fire({
        title: "¡Bienvenido!",
        text: `Sesión iniciada como ${user.email}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "/dashboard";
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Credenciales incorrectas o usuario no existe.", "error");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleResult = await signInWithPopup(auth, provider);
      const user = googleResult.user;

      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

      if (signInMethods.includes('password')) {
        const password = await solicitarPassword();
        if (!password) {
          Swal.fire("Cancelado", "Operación cancelada.", "info");
          return;
        }

        const credential = EmailAuthProvider.credential(user.email, password);
        await linkWithCredential(user, credential);
      }

      Swal.fire({
        title: "¡Bienvenido!",
        text: `Sesión iniciada con Google: ${user.email}`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "/dashboard";
      });

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo iniciar sesión con Google.", "error");
    }
  };

  const solicitarPassword = async () => {
    const result = await Swal.fire({
      title: "Contraseña requerida",
      input: "password",
      inputLabel: "Introduce tu contraseña para vincular cuentas",
      inputPlaceholder: "Tu contraseña",
      showCancelButton: true,
      confirmButtonText: "Vincular",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed && result.value) {
      return result.value;
    }
    return null;
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
