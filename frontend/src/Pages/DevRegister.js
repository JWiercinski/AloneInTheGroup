import React, {useLayoutEffect} from "react";
import axios from "axios";
import ButtonsTop from "../Components/buttonsTop";
import {IdContext} from "../Providers/IdProvider";

function DevRegister(){
    const [username, setUsername] = React.useState("")
    const [name, setName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [account, setAccount] = React.useState("")
    const [city, setCity] =React.useState("")
    const [country, setCountry]=React.useState("")
    const[phone,setPhone]=React.useState("")
    const [info, setInfo] = React.useState("")
    const {id, setId} = React.useContext(IdContext)
    const sendonsubmit = async (event) =>{event.preventDefault();
        const data = {
            DEVUSERNAME: username,
            STUDIONAME: name,
            EMAIL: email,
            PASSWORD: password,
            BANKACCOUNT: account,
            CITY:city,
            COUNTRY:country,
            PHONE:phone
        }
        try {
            const response = await axios.post("http://localhost:3000/dev/register", data)
            if (response.data.success===true)
            {
                setInfo("Konto użytkownika utworzone. Przekierowanie na stronę logowania")
                window.location.replace("/account/hub/dev/login")
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
        <div className="DevRegister">
            <ButtonsTop/>
            <h1>Rejestracja konta deweloperskiego</h1>
            <form onSubmit={sendonsubmit}>
                <p>Nazwa użytkownika</p>
                <input type="text" value={username} minLength="5" maxLength="30" onChange={(e) => setUsername(e.target.value)}
                       placeholder="Nazwa użytkownika"
                       required></input>
                <p>Nazwa Studia:</p>
                <input type="text" value={name} minLength="1" onChange={(e) => setName(e.target.value)}
                       placeholder="Nazwa studia"
                       required></input>
                <p>E-mail:</p>
                <input type="text" value={email} minLength="5"
                       onChange={(e) => setEmail(e.target.value)} placeholder="E-mail"
                       required></input>
                <p>Hasło:</p>
                <input type="password" value={password} minLength="10" maxLength="50"
                       onChange={(e) => setPassword(e.target.value)} placeholder="Hasło"
                       required></input>
                <p>Numer telefonu:</p>
                <input type="text" value={phone} minLength="3" maxLength="15"
                       onChange={(e)=>setPhone(e.target.value)} placeholder="Numer telefonu" required/>
                <p>Miasto</p>
                <input type="text" value={city} minLength="1" onChange={(e) =>setCity(e.target.value)} placeholder="Miasto" required/>
                <p>Państwo</p>
                <input type="text" value={country} minLength="2" onChange={(e)=>setCountry(e.target.value)} placeholder="Państwo" required/>
                <p>Konto bankowe</p>
                <input type="text" value={account} minLength="8" maxLength="34" onChange={(e)=>setAccount(e.target.value)} placeholder="Konto bankowe" required/>
                <p></p>
                <button type="submit">Zarejestruj się</button>
            </form>
            <h2>{info}</h2>
        </div>
    )
}

export default DevRegister