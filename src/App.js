import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './componentes/Formulario';
import Cancion from './componentes/Cancion';
import Info from './componentes/Info';


function App() {

  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    if(Object.keys(busquedaletra).length === 0) return;

    
    const callAPILetra = async () => {
      const {artista, cancion} = busquedaletra;
      const urlLetra = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const urlInformaBanda = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letracancion, informacion] = await Promise.all([
        axios.get(urlLetra),
        axios.get(urlInformaBanda)
      ]);

      guardarLetra(letracancion.data.lyrics);
      guardarInfo(informacion.data.artists[0]);

      // CON ESTA LINEA EVITAMOS LOOP
      guardarBusquedaLetra({});
    }
    callAPILetra();
  }, [busquedaletra, info]);

  return (
    <Fragment>
        <Formulario
          guardarBusquedaLetra={guardarBusquedaLetra}
        />

        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-6'>
              <Info
                info={info}
              />
            </div>
            <div className='col-md-6'>
              <Cancion
                letra={letra}
              />
            </div>
          </div>
        </div>
    </Fragment>
  );
}

export default App;
