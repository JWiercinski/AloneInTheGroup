import React from "react";
import {LoginContext} from "../Providers/LoginProvider";
import {TypeContext} from "../Providers/TypeProvider";

function LoggedInBar()
{
    const {login, setLogin} = React.useContext(LoginContext)
    const {type, setType} = React.useContext(TypeContext)
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
    return (
        <div>
            <p style={{display: anyoneLoggedIn ? 'inline-block' : 'none'}}>Zalogowano jako {login}-</p>
            <p style={{display: devLoggedIn ? 'inline-block' : 'none'}}>DEWELOPER</p>
            <p style={{display: userLoggedIn ? 'inline-block' : 'none'}}>UŻYTKOWNIK KLASYCZNY</p>
        </div>
    )
}

export default LoggedInBar