import React from 'react';
import {Link} from "react-router-dom";
import {BasketContext} from "../Providers/BasketProvider";
import ButtonsTop from "../Components/buttonsTop";
import LoggedInBar from "../Components/LoggedInBar";
function Basket () {
    const { basket } = React.useContext(BasketContext);
    const clearBasket = () => {
        localStorage.removeItem("basket")
        window.location.reload()
    }
    const total = basket.reduce((accumulator, item) => {
        return accumulator + (item.product.PRICE * item.quantity);
    }, 0);

    return (
        <div>
            <ButtonsTop/>
            <LoggedInBar/>
            <h1>Twój koszyk:</h1>
            {basket.map((item, index) => (
                <div key={index}>
                    <h2>{item.product.NAME}</h2>
                    <p>Cena jednostkowa: {item.product.PRICE} PLN</p>
                    <p>Ilość: {item.quantity}</p>
                </div>
            ))}
            <h2>Podsuma: {total} PLN</h2>
            <button style={{backgroundColor:"darkred", color:"white"}} onClick={() => clearBasket()}>Wyczyść koszyk</button>
            <Link to="/store/payment"><button>Przejdź do płatności</button></Link>
            <p></p>
        </div>
    );
};

export default Basket