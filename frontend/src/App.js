import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Hub from "./Pages/Hub"
import Store from "./Pages/Store"

function App()
{
    return(
    <div className="App" style={{ textAlign: 'center' }}>
        <div className="Content">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Hub/>}></Route>
                    <Route path="/store" element={<Store/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    </div>
    )
}

export default App;