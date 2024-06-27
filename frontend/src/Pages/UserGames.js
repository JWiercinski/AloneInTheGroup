import React from "react";
import {TypeContext} from "../Providers/TypeProvider";
import {IdContext} from "../Providers/IdProvider";
import axios from "axios";
import ButtonsTop from "../Components/buttonsTop";
import LoggedInBar from "../Components/LoggedInBar";

function UserGames() {
    const {type, setType} = React.useContext(TypeContext)
    const {id, setId} = React.useContext(IdContext)
    const [keys, setKeys] = React.useState([])
    const [mess, setMess]=React.useState("")
    const [keyVisibility, setKeyVisibility] = React.useState({});

    const toggleKeyVisibility = (keyId) => {
        setKeyVisibility((prevState) => ({
            ...prevState,
            [keyId]: !prevState[keyId],
        }));
    };

    React.useEffect(() => {
        const fetchKeys= async()=>
        {
            try
            {
                const response=await axios.get(`http://localhost:3000/user/${id}/games`)
                setKeys(response.data)
            }
            catch
            {
                setMess("Nie udało się połączyć z serwerem. Przepraszamy za utrudnienia")
            }
        }

        if (type === "user") {
            fetchKeys()
        }
        else{setMess("Ta strona dostępna jest tylko dla użytkowników klasycznych")}
    },[type, id])

    return(
        <div className="UserGames">
            <ButtonsTop></ButtonsTop>
            <LoggedInBar></LoggedInBar>
            <h1>{mess}</h1>
            <h1>Zakupione klucze:</h1>
            {keys && keys.map((key, index) => (
                <div key={index}>
                    <h2>{key.GAME.NAME}</h2>
                    <p>
                        Kod:{' '}
                        {keyVisibility[key.GAMEKEY] ? key.GAMEKEY : 'Kliknij poniższy przycisk aby wyświetlić'}
                    </p>
                    <button onClick={() => toggleKeyVisibility(key.GAMEKEY)}>
                        {keyVisibility[key.GAMEKEY] ? 'Hide Key' : 'Show Key'}
                    </button>
                </div>
            ))}
        </div>)
}

export default UserGames