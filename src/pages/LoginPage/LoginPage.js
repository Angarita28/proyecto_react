function LoginPage() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-3">Iniciar Sesión</h3>
          <form id="loginForm" action="">
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
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
            <br />
            <div className="text-center">
              <small className="text-muted">
                ¿No tienes cuenta? <a href="./html/form.html">Regístrate</a>
              </small>
              <br />
              <a href="./html/recuperar.html" className="fs-6">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
