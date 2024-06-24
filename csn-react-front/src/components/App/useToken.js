import { useState } from 'react';

// retornar o token do session storage
export const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    return tokenString ? JSON.parse(tokenString) : null;
}

export default function useToken() {

    const [token, setToken] = useState(getToken());

    // atribuir um token ao session storage, isso é feito na rota '/'.
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    // retornando um objeto
    return {
        setToken: saveToken,
        token
    }
}