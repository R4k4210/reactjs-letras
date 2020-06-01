import React, { useState } from 'react';

const Formulario = ({guardarBusquedaLetra}) => {

    const [busqueda, guardarBusqueda] = useState({
        artista: '',
        cancion: ''
    });

    const [error, guardarError] = useState(false);

    const actualizarState = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const {artista, cancion} = busqueda;

    const buscarInformacion = e => {
        e.preventDefault();
        //validamos los input
        if(artista === '' || cancion === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //Pasamos al componente principal
        guardarBusquedaLetra(busqueda);
    }

    return ( 
        <div className='bg-info'>
            {error ? <p className='alert alert-danger text-center p-2'>Todos los campos son requeridos</p> : null}
            <div className='container'>
                <div className='row'>
                    <form 
                        className='col card text-white bg-transparent mb-5 pt-5 pb-2'
                        onSubmit={buscarInformacion}
                    >
                        <fieldset>
                            <legend className='text-center'>
                                Buscador de Letras de Canciones
                            </legend>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>Artista</label>
                                        <input 
                                            type='text'
                                            className='form-control'
                                            name='artista'
                                            placeholder='Nombre del Artista'
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label>Canción</label>
                                        <input 
                                            type='text'
                                            className='form-control'
                                            name='cancion'
                                            placeholder='Nombre de la Cancion'
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className='btn-primary float-right'
                            >Buscar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Formulario;