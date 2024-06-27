import React from "react";
import ButtonsTop from "../Components/buttonsTop";
import LoggedInBar from "../Components/LoggedInBar";
import axios from "axios";
import {IdContext} from "../Providers/IdProvider";
import {TypeContext} from "../Providers/TypeProvider";

function NewGame(){
    const [name, setName]=React.useState("")
    const [desc, setDesc]=React.useState("")
    const [price, setPrice]=React.useState(0)
    const {id, setId}=React.useContext(IdContext)
    const {type, setType} = React.useContext(TypeContext)
    const [mess, setMess]=React.useState("")
    const [dev, setDev]=React.useState(false)

    React.useEffect(() => {
        if (type === "dev") {
            setDev(true)
        }
    },[type,dev])

    const sendonsubmit = async (event) => {
        event.preventDefault()
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const sequelizeFormattedDate = `${year}-${month}-${day}`;
        const data ={
            DEVELOPERId: id,
            NAME: name,
            DESCRIPTION: desc,
            PRICE: price,
            RELEASEDATE: sequelizeFormattedDate}
        try{
            const response = await axios.post("http://localhost:3000/dev/game/new", data)
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
            <h1>Opublikuj grę</h1>
            <p>Nazwa gry</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nazwa gry" required></input>
            <p>Cena gry</p>
            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Cena do zapłaty" required></input>
            <p>Opis gry</p>
            <textarea value={desc} required placeholder="Opis gry" onChange={(e) => setDesc(e.target.value)}/>
            <p></p>
            <button type="submit">Kontynuuj</button>
        </form>
        <h1>{mess}</h1>
    </div>
    )

}

export default NewGame