import React from "react";
import ButtonsTop from "../Components/buttonsTop";
import LoggedInBar from "../Components/LoggedInBar";
import axios from "axios";
import {IdContext} from "../Providers/IdProvider";
import {TypeContext} from "../Providers/TypeProvider";
import {useParams} from "react-router-dom";

function ModifyGame(
){
    const [name, setName]=React.useState("")
    const [desc, setDesc]=React.useState("")
    const [price, setPrice]=React.useState(0)
    const {id, setId}=React.useContext(IdContext)
    const {type, setType} = React.useContext(TypeContext)
    const [mess, setMess]=React.useState("")
    const [dev, setDev]=React.useState(false)
    const {gid}=useParams()
    const [product, setProduct]=React.useState({})

    React.useEffect(()=>{
        const fetchGameData= async()=>
        {
            try
            {
                const standardData = await axios.get(`http://localhost:3000/dev/game/${id}/${gid}`)
                setProduct(standardData.data)
            }
            catch
            {
                setMess("Nie udało się połączyć z serwerem. Przepraszamy za utrudnienia")
            }
        }
        if (type === "dev") {
            setDev(true)
            fetchGameData()
        }
        else{setMess("Ta strona dostępna jest tylko dla deweloperów aplikacji")}
    },[type, id, gid])

    const sendonsubmit = async (event) => {
        event.preventDefault()
        const data ={
            DEVELOPERId: id,
            NAME: name,
            DESCRIPTION: desc,
            PRICE: price}
        try{
            const response = await axios.put(`http://localhost:3000/dev/game/${id}/${gid}`, data)
            if (response.data.problems !== undefined)
            {
                setMess(response.data.problems)
            }
            else
            {
                setMess("Udało się opublikować grę")
                window.location.reload()
            }
        }
        catch
        {
            setMess("Nie uzyskano połączenia z serwerem. Przepraszamy za niedogodności.")
        }
    }

    return (
        <div className="NewGame">
            <ButtonsTop></ButtonsTop>
            <LoggedInBar/>
            <form hidden={!dev} onSubmit={sendonsubmit}>
                <h1>Zmodyfikuj grę</h1>
                <h2>Nazwa gry</h2>
                <p>OBECNIE: {product.NAME}</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nazwa gry"></input>
                <h2>Cena gry</h2>
                <p>OBECNIE: {product.PRICE}</p>
                <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Cena do zapłaty"></input>
                <h2>Opis gry</h2>
                <p>OBECNIE: {product.DESCRIPTION}</p>
                <textarea value={desc} placeholder="Opis gry" onChange={(e) => setDesc(e.target.value)}/>
                <p></p>
                <button type="submit">Kontynuuj</button>
            </form>
            <h1>{mess}</h1>
        </div>
    )
}

export default ModifyGame