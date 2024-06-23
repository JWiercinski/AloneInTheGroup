import React from "react";
import ButtonsTop from "../Components/buttonsTop";
import axios from "axios";
import LoggedInBar from "../Components/LoggedInBar";

function Store() {
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="Store">
            <LoggedInBar/>
            <ButtonsTop/>
            <h1>Produkty:</h1>
            <p></p>
            {products.map((product, index) => (
            <div key={index}>
                <h2>{product.NAME}</h2>
                <p>{product.DESC}</p>
                <p>Twórca: {product.DEV}</p>
                <p>Cena: {product.PRICE} PLN</p>
                <p></p>
            </div>))}
        </div>
    )
}

export default Store