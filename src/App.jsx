import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'


//Styled component para el h1
const Heading = styled.h1`
  font-family: 'Lato' , sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {
  //useState que almacena que moneda y criptomoneda seleccionó el usuario, se va a llenar con los datos del formulario.
  const [monedas, setMonedas] = useState({});
  //useState que almacenará la cotización obtenida entre la moneda y la criptomoneda, así como la función para cambiar su valor.
  const [resultado, setResultado] = useState({});
  //useState que mostrará el Spinner de cargando, asi como una función para modificar su valor.
  const [cargando, setCargando] = useState(false);
  //useEffect que se ejecutará cuando haya un cambio en monedas, escuchará los cambios que haya en monedas. Se ejecutará unicamente cuando monedas tenga algo.
  useEffect(()=>{
    //Prevenimos la ejecución en donde si la longitud del Objeto es mayor a 0, es que hay algo en dicho objeto.
    if(Object.keys(monedas).length > 0){
      const contizarCripto = async() => {
        //Cambiamos el valor de cargando mostrando el spinner
        setCargando(true);
        //Desesctructuramos el objeto de monedas en moneda y criptomoneda
        const {moneda, criptomoneda} = monedas;
        //URL de la api, que recibe la moneda y criptomoneda
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        //Respuesta de la api enviando un fetch con la url de la api, se extraen los datos de la api.
        const respuesta = await fetch(url);
        //Resultado que retorna un JSON con la informacion de la cotización entre la moneda y la criptomoneda
        const resultado = await respuesta.json();
        //Cambiamos el valor de resultado por la cotización obtenida entre la moneda y criptomoneda
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        //Cambiamos el valor de cargando para dejar de mostrar el spinner
        setCargando(false);
      }
      //Llamamos a la función que cotizará el valor de la criptomoneda en base a la moneda seleccionada.
      contizarCripto();
    }
  }, [monedas])
  return (
    //Contenedor que almacena todos los componentes
    <Contenedor>
      {/*Componente imagen que recibe la url de la imagen y el nombre*/}
      <Imagen 
        src={ImagenCripto}
        alt="imagenes criptomonedas"
      />
      <div>
        {/* Styled componente aplicado para volver el texto en un h1 */}
        <Heading>Cotiza Criptomonedas al instante</Heading>
        {/*Componente formulario que muestra los selects y el boton*/}
        <Formulario 
          //Enviamos al formulario, la función que cambiará el valor de monedas
          setMonedas={setMonedas}
        />
        {/* Si cargando es verdadero, mostraremos el Spinner */}
        {cargando && <Spinner />}
        {/* Si PRICE tiene valor, quiere decir que hay una cotización, por lo tanto mostrará el resultado de la cotización, sino, no mostrará nada */}
        {resultado.PRICE && <Resultado 
                              //Enviamos el resultado de la cotización
                              resultado={resultado} 
                            />
        }
      </div>
    </Contenedor>
  )
}

export default App
