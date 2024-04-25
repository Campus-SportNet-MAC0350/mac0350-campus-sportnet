import React from 'react';
import { Link } from 'react-router-dom';
import { UniversityOption } from './UniversityOpt';

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

                        <select name="Universidade" id="Universidade" className="select_university">
                            <option value="not_selected" disabled selected>Selecione sua Universidade</option>
                            <UniversityOption uni_name="Universidade de São Paulo - USP"/>
                            <UniversityOption uni_name="Universidade Estadual de Campinas - Unicamp"/>
                        </select>
                        
                        <div class="radio-container">
                            <div>
                                <input type="radio" name="userT" value="estudante" id="estudante" class="studentType" checked/>
                                <label for="estudante">Estudante</label>
                            </div>
                            <div>
                                <input type="radio" name="userT" value="atletica" id="atletica" class="studentType"/>
                                <label for="atletica">Atlética</label>
                            </div>
                        </div>

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