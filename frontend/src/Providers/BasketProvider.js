import React from 'react';
export const BasketContext = React.createContext();
export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = React.useState(() => {
        const savedBasket = localStorage.getItem('basket');
        if (savedBasket) {
            return JSON.parse(savedBasket);
        }
        return [];
    });
    React.useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);
    return (
        <BasketContext.Provider value={{ basket, setBasket }}>
            {children}
        </BasketContext.Provider>
    );
};

export default BasketProvider