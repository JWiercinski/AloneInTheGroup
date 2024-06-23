import React from 'react';
export const LoginContext = React.createContext();
export const LoginProvider = ({ children }) => {
    const getInitialLoginState = () => {
        const savedLogin = localStorage.getItem('login');
        return savedLogin !== null ? JSON.parse(savedLogin) : null;
    };

    const [login, setLogin] = React.useState(getInitialLoginState);

    React.useEffect(() => {
        localStorage.setItem('login', JSON.stringify(login));
    }, [login]);

    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider