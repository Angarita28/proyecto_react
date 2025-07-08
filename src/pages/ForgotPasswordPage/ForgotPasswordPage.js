function ForgotPasswordPage() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-3">Contraseña Olvidada</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Ingrese su correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Correo@ejemplo.com"
                required
              />
            </div>

            <br />

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Enviar al correo
              </button>
            </div>

            <br />

            <div className="text-center">
              <a href="/" className="btn btn-light w-100">
                Volver al Log-in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
