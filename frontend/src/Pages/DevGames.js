import React from "react";
import {LoginContext} from "../Providers/LoginProvider";
import {TypeContext} from "../Providers/TypeProvider";
import {IdContext} from "../Providers/IdProvider";
import axios from "axios";
import ButtonsTop from "../Components/buttonsTop";
import LoggedInBar from "../Components/LoggedInBar";

function DevGames() {
    const {type, setType} = React.useContext(TypeContext)
    const {id, setId} = React.useContext(IdContext)
    const [products, setProducts] = React.useState([])
    const [mess, setMess]=React.useState("")
    const [total, setTotal]=React.useState(0.0)
    const [number, setNumber]=React.useState(0)

    React.useEffect(() => {
        const fetchGames= async()=>
        {
            try
            {
                const response=await axios.get(`http://localhost:3000/dev/game/${id}`)
                setProducts(response.data)
                const moneh = await axios.get(`http://localhost:3000/dev/sales/${id}`)
                setTotal(moneh.data.TOTAL)
                setNumber(moneh.data.NUMBER)
            }
            catch
            {
                setMess("Nie udało się połączyć z serwerem. Przepraszamy za utrudnienia")
            }
        }

        if (type === "dev") {
            fetchGames()
        }
        else{setMess("Ta strona dostępna jest tylko dla deweloperów aplikacji")}
    },[type, id])

    return(
        <div className="DevGames">
            <ButtonsTop></ButtonsTop>
            <LoggedInBar></LoggedInBar>
            <h1>{mess}</h1>
            <h1>Łączna wartość sprzedaży: {total}</h1>
            <h1>Łączna liczba sprzedanych kopii: {number}</h1>
            <h1>Wydane gry:</h1>
            {products && products.map((product, index) => (
                <div key={index}>
                    <h2>{product.NAME}</h2>
                    <p>Cena: {product.PRICE} PLN</p>
                    <button>Szczegóły</button>
                </div>
            ))}
        </div>)
}

export default DevGames