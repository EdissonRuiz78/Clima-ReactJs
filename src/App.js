import React, { Fragment, useState, useEffect } from "react";
import Clima from "./components/Clima";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Error from "./components/Error";

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const [consulta, guardarConsulta] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultaApi = async () => {
      if (consulta) {
        const apiKey = "TU API KEY";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsulta(false);
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultaApi();
    // eslint-disable-next-line
  }, [consulta]);

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
            <div className="col m6 s12">
              {error ? (
                <Error mensaje="No hay resultados" />
              ) : (
                <Clima resultado={resultado} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
