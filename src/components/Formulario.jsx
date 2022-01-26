import {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`
const Formulario = ({setMonedas}) => {
    //UseState que almacena la informacion sobre las criptomonedas y cuenta con una función para cambiar el valor de criptos.
    const [criptos, setCriptos] = useState([]);
    //UseState que se encargar del error
    const [error, setError] = useState(false);
    //Custom Hook que es un select para las monedas
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    //Custom Hook que es un select para las criptomonedas
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu criptomoneda', criptos);
    //UseEffect para cargar las criptomonedas
    useEffect(() => {
        //Funcion para consultar en la API
        const consultarAPI = async () =>{
            //URL de la api
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
            //Respuesta de la api enviando un fetch con la url de la api
            const respuesta = await fetch(url);
            //Resultado que retorna un JSON con la informacion de las criptomonedas
            const resultado = await respuesta.json();
            //Arreglo que almacenará el nombre de las criptomonedas y su código
            const arrayCriptos = resultado.Data.map(cripto =>{
                //Objeto que almacenará el nombre de la criptomoneda y su código
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                //Retornamos el objeto con la información de las criptomonedas
                return objeto;
            })
            //Modificamos el valor de criptos
            setCriptos(arrayCriptos);
        }
        //Llamamos a la funcion para consultar en la API
        consultarAPI();
    }, [])
    //Funcion para enviar la informacion del formulario, recibiendo un evento.
    const handleSubmit = e => {
        //Prevenimos que se recargue la pagina
        e.preventDefault();
        //Si moneda y criptomoneda incluye un espacio vacio, se despliega un error y se evita que se ejecuten las siguientes lineas de código en caso de que se cumpla la condición.
        if([moneda,criptomoneda].includes('')){
            //Cambiamos el valor de error a true
            setError(true);
            //Evitamos que se ejecuten las siguientes lineas de código.
            return;
        }
        //Cambiamos el valor de error a falso
        setError(false);
        //Cambiamos el valor de monedas llenandolo con un objeto que cuenta con la moneda y criptomoneda almacenada por el usuario.
        setMonedas({
            moneda,
            criptomoneda
        })
    }
    return (
        <>
            {/* Si error es verdadero, desplegará el componente error*/}
            {error && <Error>Todos los campos son obligatorios</Error>}
            {/* Formulario para enviar la información de las monedas y criptomonedas */}
            <form
                onSubmit={handleSubmit}
            >
                {/* Custom Hook que muestra el titulo y un select para elegir las monedas */}
                <SelectMonedas />
                {/* Custom Hook que muestra el titulo y un select para elegir las criptomonedas */}
                <SelectCriptomoneda />
                {/*Syled component aplicado al input siendo de tipo submit y con el valor cotizar*/}
                <InputSubmit 
                    type="submit" 
                    value="Cotizar" 
                />
            </form>
        </>
    )
}
export default Formulario
