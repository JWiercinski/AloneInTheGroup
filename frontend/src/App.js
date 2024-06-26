import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Hub from "./Pages/Hub"
import Store from "./Pages/Store"
import LoginProvider from "./Providers/LoginProvider";
import AccountHub from "./Pages/AccountHub";
import {TypeProvider} from "./Providers/TypeProvider";
import IdProvider from "./Providers/IdProvider";
import UserLogin from "./Pages/UserLogin";
import DevLogin from "./Pages/DevLogin";
import UserRegister from "./Pages/UserRegister";
import DevRegister from "./Pages/DevRegister";
import BasketProvider from "./Providers/BasketProvider";
import Basket from "./Pages/Basket";
import Payment from "./Pages/Payment";

function App()
{
    return(
    <div className="App" style={{ textAlign: 'center' }}>
        <div className="Content">
            <LoginProvider>
                <TypeProvider>
                    <IdProvider>
                        <BasketProvider>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<Hub/>}></Route>
                                    <Route path="/store" element={<Store/>}></Route>
                                    <Route path="/account/hub" element={<AccountHub/>}></Route>
                                    <Route path="/account/hub/user/login" element={<UserLogin/>}></Route>
                                    <Route path="/account/hub/dev/login" element={<DevLogin/>}></Route>
                                    <Route path="/account/hub/user/register" element={<UserRegister/>}></Route>
                                    <Route path="/account/hub/dev/register" element={<DevRegister/>}></Route>
                                    <Route path="/store/basket" element={<Basket/>}></Route>
                                    <Route path="/store/payment" element={<Payment/>}></Route>
                                </Routes>
                            </BrowserRouter>
                        </BasketProvider>
                    </IdProvider>
                </TypeProvider>
            </LoginProvider>
        </div>
    </div>
    )
}

export default App;