import React from "react";
import ButtonsTop from "../Components/buttonsTop";
import LoggedInBar from "../Components/LoggedInBar";
import {TypeContext} from "../Providers/TypeProvider";
import {IdContext} from "../Providers/IdProvider";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

function DevGame()
{
    const {type, setType} = React.useContext(TypeContext)
    const {id, setId} = React.useContext(IdContext)
    const [product, setProduct] = React.useState({})
    const [mess, setMess]=React.useState("")
    const [price, setPrice]=React.useState(0.0)
    const [tally, setTally]=React.useState(0)
    const {gid}=useParams()

    React.useEffect(()=>{
        const fetchGameData= async()=>
        {
            try
            {
                const standardData = await axios.get(`http://localhost:3000/dev/game/${id}/${gid}`)
                setProduct(standardData.data)
                const prices = await axios.get(`http://localhost:3000/dev/sales/${id}/${gid}`)
                setPrice(prices.data.VALUE)
                setTally(prices.data.TALLY)
            }
            catch
            {
                setMess("Nie udało się połączyć z serwerem. Przepraszamy za utrudnienia")
            }
        }
        if (type === "dev") {
            fetchGameData()
        }
        else{setMess("Ta strona dostępna jest tylko dla deweloperów aplikacji")}
    },[type, id, gid])

    const deleteGame=async () =>{
        const result = await axios.delete(`http://localhost:3000/dev/game/${id}/${gid}`)
        if (result.data.success === true)
        {
            setMess("Gra usunięta z dystrybucji")
        }
        else
        {
            setMess("Nie udało się usunąć gry")
        }
    }

    return(
        <div className="DevGame">
            <ButtonsTop></ButtonsTop>
            <LoggedInBar></LoggedInBar>
            <h1>{mess}</h1>
            <h2>{product.NAME}</h2>
            <p>Cena: {product.PRICE} PLN</p>
            <p>{product.DESCRIPTION}</p>
            <p>Data wydania: {product.RELEASEDATE}</p>
            <h2>Łączna wartość sprzedaży: {price} PLN</h2>
            <h2>Łączna ilość sprzedanych kopii: {tally}</h2>
            <Link to="modify"><button>Zmodyfikuj produkt</button></Link>
            <button style={{backgroundColor:"darkred", color:"white"}} onClick={() => deleteGame()}>Wycofaj grę z dystrybucji</button>
        </div>
    )
}

export default DevGame