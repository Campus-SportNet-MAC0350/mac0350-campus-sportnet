import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
    return (
        <div className="containerLogin">
            <div className="Centro">
                <div className="loginDetails">
                    <img src="logo192.png" className="logo_login" alt="logo"/>
                    <b><p className="login_txt">Bem Vindo ao Campus SportNet!</p></b>
                    <p className="login_txt">Cadastre-se para continuar.</p>
                </div>
                <div className="login_form">
                    <form>
                        <input type='text' placeholder='Email' />
                        <input type='text' placeholder='Username' />
                        <input type='password' placeholder='Senha' />
                        {/* <label for="avatar">Escolha uma foto de perfil!</label>
                        <input type='file' id="avatar" name="avatar" accept="image/png, image/jpeg"/> */}
                        <Link to='/' className="register_url">Já possui uma conta? Faça Login!</Link>
                        <Link to="/home"><button type="button">Cadastrar</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
};