import React from "react";
import axios from "axios";
import {BasketContext} from "../Providers/BasketProvider"
import {Link} from "react-router-dom";
import ButtonsTop from "../Components/buttonsTop";
import {IdContext} from "../Providers/IdProvider";
import {LoginContext} from "../Providers/LoginProvider";
import {TypeContext} from "../Providers/TypeProvider";
function Payment(){
    const [method, setMethod] = React.useState("")
    const [info, setInfo]=React.useState("")
    const [isUser, setIsUser]=React.useState(false)
    const { basket} = React.useContext(BasketContext);
    const {id} = React.useContext(IdContext)
    const {login} = React.useContext(LoginContext)
    const {type} = React.useContext(TypeContext)
    const total = basket.reduce((accumulator, item) => {
        return accumulator + (item.product.PRICE * item.quantity);
    }, 0);

    React.useEffect(() => {
        if (type === "user") {
            setIsUser(true)
        }
    },[isUser, type])
    const sendonsubmit = async (event) => {
        event.preventDefault();
        if (!method) {
            alert('Wybierz właściwą metodę płatności');
            return;
        }

        const data2Array = []
        for (let i = 0; i < basket.length; i++) {
            const item = basket[i];
            const data2 = {
                GAMEID: item.product.id,
                QUANTITY: item.quantity,
                SINGLEPRICE: item.product.PRICE
            };
            data2Array.push(data2)
        }
        const data = {
            USERId: id,
            METHOD: method,
            AMOUNT: total,
            PURCHASE: data2Array
        };
        try {
            var response = await axios.post("http://localhost:3000/user/purchase", data);
            if (response.problems === undefined) {
                setInfo(`Sukces!`);
                localStorage.removeItem("basket");
                window.location.reload();
            }
            else{setInfo(response.problems)}
        } catch (error){
            setInfo(`Nastąpił problem z połączeniem z serwerem`)
        }
    }
    return (
        <div className="Payments">
            <ButtonsTop></ButtonsTop>
            <Link to="/store/basket">
                <button>Wróć do koszyka</button>
            </Link>
            <h1 hidden={!isUser}>Dokonaj płatności</h1>
            <form hidden={!isUser} onSubmit={sendonsubmit}>
                <p>Nazwa użytkownika: {login}</p>
                <p>Metoda Płatności</p>
                <select value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="" disabled>Wybierz metodę</option>
                    <option value="CARD">Karta płatnicza</option>
                    <option value="BLIK">Blik</option>
                    <option value="PAYPAL">PayPal</option>
                </select>
                <h3>Kwota: {total} PLN</h3>
                <button type="submit" hidden={!isUser}>Kontynuuj</button>
            </form>
            <h1 hidden={isUser}>Aby móc dokonać zakupu, konieczne jest zalogowanie jako użytkownik klasyczny.</h1>
            <h2>{info}</h2>
        </div>
    )
}

export default Payment