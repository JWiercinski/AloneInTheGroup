import React from 'react';
export const IdContext = React.createContext();
export const IdProvider = ({ children }) => {
    const getInitialId = () => {
        const savedId = localStorage.getItem('id');
        return savedId !== null ? JSON.parse(savedId) : null;
    };

    const [id, setId] = React.useState(getInitialId);

    React.useEffect(() => {
        localStorage.setItem('id', JSON.stringify(id));
    }, [id]);

    return (
        <IdContext.Provider value={{ id, setId }}>
            {children}
        </IdContext.Provider>
    );
};

export default IdProvider