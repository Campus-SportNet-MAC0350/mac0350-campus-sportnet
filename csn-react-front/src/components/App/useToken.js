import { useState } from 'react';

/* 
 * FUNCTION: get token from session storage
 * Return a JSON format token from session storage
 */
export const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    return tokenString ? JSON.parse(tokenString) : null;
}

/* 
 * FUNCTION: save a token to session storage
 * return to app.js a object containing the token
 * and a return to setToken
 */
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