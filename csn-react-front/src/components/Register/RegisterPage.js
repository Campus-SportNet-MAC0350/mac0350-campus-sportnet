import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        profileBio: '',
        university: '',
        userType: 'e',
        profileImagePath: '',
    });

    const navigate = useNavigate();

    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if(
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.profileBio ||
            !formData.profileImagePath ||
            formData.university === 'not_selected'
        ){
            console.error("Por favor, preencha todos os campos.");
            alert("Por favor, preencha todos os campos");
            return;
        }

        const data = new FormData();

        data.append('username', formData.username);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('profileBio', formData.profileBio);
        data.append('university', formData.university);
        data.append('userType', formData.userType);
        data.append('profileImagePath', formData.profileImagePath);

        try{
            const response = await axios.post('http://localhost:8080/users', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.status === 201){
                alert('Usuário registrado com sucesso');
                console.log('Usuário registrado com sucesso:', response.data);
                setRedirect(true);
            } 
            else{
                console.error('Erro ao registrar o usuário!');
                alert("Erro ao registrar o usuário!");
            }
        } 
        catch(error){
            console.error('Erro ao registrar o usuário!', error);
            alert("Erro ao registrar o usuário!");
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate('/');
        }
    }, [redirect, navigate]);

    return(
        <div className="containerLogin">
            <div className="Centro">
                <div className="loginDetails">
                    <img src="logo192.png" className="logo_login" alt="logo"/>
                    <b><p className="login_txt">Bem Vindo ao Campus SportNet!</p></b>
                    <p className="login_txt">Cadastre-se para continuar.</p>
                </div>
                <div className="login_form">
                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Username' name='username' onChange={handleChange}/>
                        <input type='text' placeholder='Email' name='email' onChange={handleChange} />
                        <input type='password' placeholder='Senha' name='password' onChange={handleChange} />
                        <input type='text' placeholder='Biografia' name='profileBio' onChange={handleChange} />
                        <input type='text' placeholder='URL Foto de Perfil' name='profileImagePath' onChange={handleChange} />

                        <select name="university" id="university" className="select_university" value={formData.university} onChange={handleChange}>
                            <option value="not_selected" />
                            <option value="Universidade de São Paulo - USP">Universidade de São Paulo - USP</option>
                            <option value="Universidade Estadual de Campinas - Unicamp">Universidade Estadual de Campinas - Unicamp</option>
                        </select>
                        
                        <div className="radio-container">
                            <div>
                                <input type="radio" name="userType" value="e" id="estudante" className="studentType" checked onChange={handleChange}/>
                                <label htmlFor="estudante">Estudante</label>
                            </div>
                            <div>
                                <input type="radio" name="userType" value="a" id="atletica" className="studentType" onChange={handleChange}/>
                                <label htmlFor="atletica">Atlética</label>
                            </div>
                         
                        </div>
                        <Link to='/' className="register_url">Já possui uma conta? Faça Login!</Link>
                        <button type="submit" className="btn">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};