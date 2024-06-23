import React from "react";
import axios from "axios";
import ButtonsTop from "../Components/buttonsTop";

function UserRegister(){
    const [username, setUsername] = React.useState("")
    const [name, setName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [info, setInfo] = React.useState("")
    const sendonsubmit = async (event) =>{event.preventDefault();
        const data = {
            USERNAME: username,
            FULLNAME: name,
            EMAIL: email,
            PASSWORD: password
        }
        try {
            const response = await axios.post("http://localhost:3000/user/register", data)
            if (response.data.success===true)
            {
                setInfo("Konto użytkownika utworzone. Przekierowanie na stronę logowania")
                window.location.replace("/account/hub/user/login")
            }
            else{
                setInfo("Nastąpił błąd podczas próby rejestracji - sprawdź czy adres e-mail jest poprawny lub zmień nazwę użytkownika.")
            }
        }
        catch (e){
            setInfo("Wystąpił problem z połączeniem z serwerem");
        }
    }

    return(
        <div className="UserRegister">
            <ButtonsTop/>
            <h1>Rejestracja konta użytkownika</h1>
            <form onSubmit={sendonsubmit}>
                <input type="text" value={username} minLength="5" maxLength="30" onChange={(e) => setUsername(e.target.value)}
                       placeholder="Nazwa użytkownika"
                       required></input>
                <input type="text" value={name} minLength="1" onChange={(e) => setName(e.target.value)}
                       placeholder="Imię i nazwisko"
                       required></input>
                <input type="text" value={email} minLength="5"
                       onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"
                       required></input>
                <input type="password" value={password} minLength="10" maxLength="50"
                       onChange={(e) => setPassword(e.target.value)} placeholder="Hasło"
                       required></input>
                <button type="submit">Zarejestruj się</button>
            </form>
            <h2>{info}</h2>
        </div>
    )
}

export default UserRegister