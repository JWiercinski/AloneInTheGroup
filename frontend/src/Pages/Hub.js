import React from "react";
import ButtonsTop from "../Components/buttonsTop";
import LoggedInBar from "../Components/LoggedInBar";

function Hub() {
    return (
        <div className="Hub">
            <ButtonsTop/>
            <LoggedInBar/>
            <h1>UltraShop</h1>
            <p>Witamy w naszym sklepie! Tylko tutaj third-party vendor jest rozwiązaniem wspierającym</p>
            <h2>ZARÓWNO TWÓRCÓW, JAK I GRACZY!</h2>
        </div>
    );
}

export default Hub