import {Link} from "react-router-dom";
import React from "react";

function ButtonsTop (){
    return (
        <div>
            <Link to="/"><button>Strona Główna</button></Link>
            <Link to="/store"><button>Sklep</button></Link>
        </div>
    )
}

export default ButtonsTop