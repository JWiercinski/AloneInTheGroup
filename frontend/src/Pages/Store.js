import React from "react";
import ButtonsTop from "../Components/buttonsTop";
import axios from "axios";
import LoggedInBar from "../Components/LoggedInBar";
import {BasketContext} from "../Providers/BasketProvider";
import {Link} from "react-router-dom";

function Store() {
    const [products, setProducts] = React.useState([]);
    const { basket, setBasket } = React.useContext(BasketContext);
    const [mess, setMess] = React.useState("")

    const addToBasket = (product) => {
        const existingProductIndex = basket.findIndex(item => item.product.id === product.id);

        if (existingProductIndex !== -1) {
            const updatedBasket = [...basket];
            updatedBasket[existingProductIndex] = {
                ...updatedBasket[existingProductIndex],
                quantity: updatedBasket[existingProductIndex].quantity + 1
            };
            setBasket(updatedBasket);
        } else {
            setBasket([...basket, { product, quantity: 1 }]);
        }
    };
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
            } catch (error) {
                setMess("Nie udało się połączyć z serwerem. Przepraszamy za utrudnienia.")
            }
        };
        fetchData();
    }, []);
    return (
                <div className="Store">
                    <ButtonsTop/>
                    <LoggedInBar/>
                <h1>Produkty</h1>
                    <h1>{mess}</h1>
                    {products && products.map((product, index) => (
                    <div key={index}>
                        <h2>{product.NAME}</h2>
                        <p>{product.DESCRIPTION}</p>
                        <p>Twórca: {product.DEVELOPER.STUDIONAME}</p>
                        <p>Cena: {product.PRICE} PLN</p>
                        <p>Data wydania: {product.RELEASEDATE}</p>
                        <button onClick={()=> addToBasket(product)}>Dodaj do koszyka</button>
                        <p></p>
                    </div>
                ))}

                    <Link to="/store/basket"><button>Koszyk</button></Link>
                </div>
    )
}

export default Store