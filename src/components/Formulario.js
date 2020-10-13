import React, { useState } from "react";
import PropTypes from "prop-types";
import Error from "./Error";

const Formulario = ({ busqueda, guardarBusqueda, guardarConsulta }) => {
  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;

  const handleChange = (evento) => {
    guardarBusqueda({
      ...busqueda,
      [evento.target.name]: evento.target.value,
    });
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (ciudad.trim() === "" || pais.trim() === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    guardarConsulta(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">Seleccione un pais</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">Pais: </label>
      </div>
      <div className="input-field col s12">
        <button
          className="waves-effect waves-light btn-block btn-large green accent-4 col s12"
          type="submit"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsulta: PropTypes.func.isRequired,
};

export default Formulario;
