import styled from "@emotion/styled"

const Contenedor = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Imagen = styled.img`
    display: block;
    width: 120px;
`
const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`
const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`
const Resultado = ({resultado}) => {
    //Desestructuramos el objeto de resultado para obtener la información a requerir.
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado;
    return (
        <Contenedor>
            {/* Styled componente de la imagen que recibe una url y un nombre */}
            <Imagen 
                src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto"
            />
            {/* Información de la cotizacion entre la moneda y la criptomoneda */}
            <div>
                <Precio>El Precio es de: <span>{PRICE}</span></Precio>
                <Texto>El Precio más alto del día: <span>{HIGHDAY}</span></Texto>
                <Texto>El Precio más bajo del día: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Última Actualizacion: <span>{LASTUPDATE}</span></Texto>
            </div>
        </Contenedor>
    )
}

export default Resultado
