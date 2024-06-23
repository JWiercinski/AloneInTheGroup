import React from "react";
import ButtonsTop from "../Components/buttonsTop";
import axios from "axios";
import {LoginContext} from "../Providers/LoginProvider";
import {TypeContext} from "../Providers/TypeProvider";
import {IdContext} from "../Providers/IdProvider";

function UserLogin(){
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const {login, setLogin} = React.useContext(LoginContext)
    const {type, setType} = React.useContext(TypeContext)
    const {id, setId} = React.useContext(IdContext)
    const [info, setInfo] = React.useState("")

    const sendonsubmit = async (event) =>{event.preventDefault();
        const data = {
            USERNAME: username,
            PASSWORD: password
        }
        try {
            const response = await axios.post("http://localhost:3000/user/login", data)
            if (response.data.success === true && response.data.id !== undefined )
            {
                setLogin(data.USERNAME)
                setType("user")
                setId(response.data.id)
                window.location.replace("/account/hub")
            }
            else {setInfo("Dane uwierzytelnienia nie są poprawne")}
        }
        catch (e){
            setInfo('Wystąpił problem z połączeniem z serwerem');
        }
    }
    return(
        <div className="ClassicLogin">
            <ButtonsTop></ButtonsTop>
            <h1>Zaloguj się jako użytkownik klasyczny</h1>
            <form onSubmit={sendonsubmit}>
                <input type="text" value={username} minLength="5" maxLength="30" onChange={(e) => setUsername(e.target.value)}
                       placeholder="Nazwa użytkownika"
                       required></input>
                <input type="password" value={password} minLength="10" maxLength="50"
                       onChange={(e) => setPassword(e.target.value)} placeholder="Hasło"
                       required></input>
                <button type="submit">Zaloguj się</button>
            </form>
            <h2>{info}</h2>
        </div>
    )

}

export default UserLogin