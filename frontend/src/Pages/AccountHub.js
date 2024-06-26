import ButtonsTop from "../Components/buttonsTop";
import React from "react";
import {Link} from "react-router-dom";
import {LoginContext} from "../Providers/LoginProvider";
import {TypeContext} from "../Providers/TypeProvider";
import {IdContext} from "../Providers/IdProvider";
import LoggedInBar from "../Components/LoggedInBar";

function AccountHub() {
        const {login, setLogin} = React.useContext(LoginContext)
        const {type, setType} = React.useContext(TypeContext)
        const {id, setId} = React.useContext(IdContext)
        const [userLoggedIn, setUserLoggedIn]= React.useState(false)
        const [devLoggedIn, setDevLoggedIn] = React.useState(false)
        const [isLoggedIn, setIsLoggedIn] = React.useState(false)

        React.useEffect(() => {
                // Check conditions and update state variables
                if (login === null || type === null || id === null || login === undefined || type === undefined || id === undefined) {
                        setUserLoggedIn(false);
                        setDevLoggedIn(false);
                } else if (type === "dev") {
                        setDevLoggedIn(true);
                        setUserLoggedIn(false);
                } else if (type === "user") {
                        setDevLoggedIn(false);
                        setUserLoggedIn(true);
                }
                if (devLoggedIn === true || userLoggedIn === true)
                {
                        setIsLoggedIn(true)
                }
        }, [login, type, id, isLoggedIn, devLoggedIn, userLoggedIn]);
    return (
        <div className="AccountHub">
                <ButtonsTop/>
                <LoggedInBar></LoggedInBar>
            <h1>Portal Użytkownika</h1>
            <p>Wybierz odpowiedni do swoich potrzeb element</p>
            <h2 hidden={devLoggedIn}>Konto użytkownika klasycznego</h2>
            <Link to="user/register"><button hidden={isLoggedIn}>Zarejestruj się</button></Link>
            <Link to="user/login"><button hidden={isLoggedIn}>Zaloguj się</button></Link>
                <h2 hidden={userLoggedIn}>Konto deweloperskie</h2>
            <Link to="dev/register"><button hidden={isLoggedIn}>Zarejestruj się</button></Link>
            <Link to="dev/login"><button hidden={isLoggedIn}>Zaloguj się</button></Link>
        </div>
)
    ;
}

export default AccountHub

//hidden = {true} pozwala na ukrywanie rozmaitych fragmentów - przyda się z wykorzystaniem loginów