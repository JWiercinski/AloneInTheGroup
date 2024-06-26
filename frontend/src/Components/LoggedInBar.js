import React from "react";
import {LoginContext} from "../Providers/LoginProvider";
import {TypeContext} from "../Providers/TypeProvider";
import {Link} from "react-router-dom";
import {IdContext} from "../Providers/IdProvider";

function LoggedInBar()
{
    const {login, setLogin} = React.useContext(LoginContext)
    const {type, setType} = React.useContext(TypeContext)
    const {id, setId}=React.useContext(IdContext)
    const [userLoggedIn, setUserLoggedIn]=React.useState(false)
    const [devLoggedIn, setDevLoggedIn]=React.useState(false)
    const [anyoneLoggedIn, setAnyoneLoggedIn]=React.useState(false)
    React.useEffect(() => {
        if (type==="dev")
        {
            setDevLoggedIn(true)
            setAnyoneLoggedIn(true)
        }
        else if (type==="user")
        {
            setUserLoggedIn(true)
            setAnyoneLoggedIn(true)
        }
    },[login, type, userLoggedIn, devLoggedIn, anyoneLoggedIn])
    const logout = async (event) =>{event.preventDefault()
        setLogin(null)
        setType(null)
        setId(null)
        setUserLoggedIn(false)
        setDevLoggedIn(false)
        window.location.reload()
    }
    return (
        <div>
            <Link to="/store/basket"><button hidden={!userLoggedIn}>Koszyk</button></Link>
            <button hidden={!anyoneLoggedIn} onClick={logout}>Wyloguj się</button>
            <p></p>
            <p style={{display: anyoneLoggedIn ? 'inline-block' : 'none'}}>Zalogowano jako {login}-</p>
            <p style={{display: devLoggedIn ? 'inline-block' : 'none'}}>DEWELOPER</p>
            <p style={{display: userLoggedIn ? 'inline-block' : 'none'}}>UŻYTKOWNIK KLASYCZNY</p>
        </div>
    )
}

export default LoggedInBar