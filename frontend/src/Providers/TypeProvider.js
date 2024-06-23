import React from 'react';
export const TypeContext = React.createContext();
export const TypeProvider = ({ children }) => {
    const getInitialType = () => {
        const savedType = localStorage.getItem('type');
        return savedType !== null ? JSON.parse(savedType) : null;
    };

    const [type, setType] = React.useState(getInitialType);

    React.useEffect(() => {
        localStorage.setItem('type', JSON.stringify(type));
    }, [type]);

    return (
        <TypeContext.Provider value={{ type, setType }}>
            {children}
        </TypeContext.Provider>
    );
};

export default TypeProvider