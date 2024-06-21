import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    const { email, password } = credentials;
    const response = await fetch(`http://localhost:8080/users/login?email=${email}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        alert("Usuário ou senha inválido(s)");
        console.error('User not found. Register first!');
    }
    else{
        console.log("User found!");
    }
    return response.json();
}

export const LoginPage = ( { setToken } ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({ email, password });
        setToken(token);
        console.log("UID: ", token);
    }

    return (
        <div className="containerLogin">
            <div className="Centro">
                <div className="loginDetails">
                    <img src="logo192.png" className="logo_login" alt="logo"/>
                    <b><p className="login_txt">Bem Vindo ao Campus SportNet!</p></b>
                    <p className="login_txt">Faça login para continuar.</p>
                </div>
                <div className="login_form">
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Email' onChange={e => setEmail(e.target.value) }/>
                        <input type='password' placeholder='Senha' onChange={e => setPassword(e.target.value) }/>
                        <a href="/register" className="register_url">Não possui uma conta? Cadastre-se!</a>
                        <button className="btn" type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
};