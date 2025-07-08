function RegisterPage() {
  return (
    <div className="container mt-4 mb-4 p-4 border rounded bg-light">
      <h1 className="text-center text-info">Formulario</h1>

      <div className="row g-3 align-items-center">
        <label htmlFor="inputNombre" className="form-label">Nombres</label>
        <input
          type="text"
          id="inputNombre"
          className="form-control"
          aria-describedby="nombredHelpBlock"
          placeholder="Ingrese sus nombres"
          required
        />
      </div>

      <br />

      <div className="row g-3 align-items-center">
        <label htmlFor="inputApellidos" className="form-label">Apellidos</label>
        <input
          type="text"
          id="inputApellidos"
          className="form-control"
          placeholder="Ingrese sus apellidos"
          required
        />
      </div>

      <br />

      <div className="row g-3 align-items-center">
        <label htmlFor="inputFechanacimiento" className="form-label">Fecha de Nacimiento</label>
        <input
          type="date"
          id="inputFechanacimiento"
          className="form-control"
          required
        />
      </div>

      <br />

      <label htmlFor="inputPassword" className="form-label">Contraseña</label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        aria-describedby="passwordHelpBlock"
      />
      <div id="passwordHelpBlock" className="form-text">
        Su contraseña debe tener entre 8 y 20 caracteres, contener letras y números, y no debe contener espacios,
        caracteres especiales ni emojis.
      </div>

      <br />

      <label htmlFor="inputPassword5" className="form-label">Repita su Contraseña</label>
      <input
        type="password"
        id="inputPassword5"
        className="form-control"
        aria-describedby="passwordHelpBlock"
      />
      <div id="passwordHelpBlock" className="form-text"></div>

      <br />

      <div className="row g-3 align-items-center">
        <label htmlFor="inputEmail" className="form-label">Correo</label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Ingrese su Email"
          required
        />
      </div>

      <br />

      <div className="row g-3 align-items-center">
        <label htmlFor="inputTelefono" className="form-label">Teléfono</label>
        <input
          type="number"
          id="inputTelefono"
          className="form-control"
          placeholder="Ingrese su teléfono"
          required
        />
      </div>

      <br />

      <label htmlFor="inputSexo" className="form-label">Sexo</label>
      <select className="form-select" required>
        <option defaultValue="">Seleccione su Sexo</option>
        <option value="1">Masculino</option>
        <option value="2">Femenino</option>
      </select>

      <br />

      <label htmlFor="inputNacionalidad" className="form-label">Nacionalidad</label>
      <select className="form-select" required>
        <option defaultValue="">Seleccione su Nacionalidad</option>
        <option value="CO">Colombia</option>
        <option value="MX">México</option>
        <option value="AR">Argentina</option>
        {/* Puedes seguir agregando más países si deseas */}
      </select>

      <br />

      <div className="row g-3 align-items-center">
        <button type="submit" id="submitButton" className="btn btn-info">
          Enviar Formulario
        </button>
      </div>

      <div className="text-center mt-3">
        <a href="/">¿Ya tienes cuenta? Inicia sesión</a>
      </div>
    </div>
  );
}

export default RegisterPage;
