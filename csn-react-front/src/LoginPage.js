import React from 'react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    return (
        <div className="containerLogin">
            <div className="Centro">
                <div className="loginDetails">
                    <img src="logo192.png" className="logo_login" alt="logo"/>
                    <b><p className="login_txt">Bem Vindo ao Campus SportNet!</p></b>
                    <p className="login_txt">Faça login para continuar.</p>
                </div>
                <div className="login_form">
                    <form>
                        <input type='text' placeholder='Email' />
                        <input type='password' placeholder='Senha' />
                        <Link to="/register" className="register_url">Não possui uma conta? Cadastre-se!</Link>
                        <Link to="/home"><button type="button">Entrar</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
};