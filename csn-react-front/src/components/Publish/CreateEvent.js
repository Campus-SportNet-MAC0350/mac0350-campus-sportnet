import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../App/useToken';

export const CreateEvent = () => {
    const token = getToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            console.error("[ERROR]: No token identified");
            navigate("/");
        }
    }, [token, navigate]);

    const buttonStyle = {
        backgroundColor: '#990000',
    };

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        userId: token,
        publicationType: 'e',
        publicationText: '',
        countParticipants: 0,
        dateTime: '', // Vazio inicialmente, será definido mais abaixo
        publicationImagePath: '',
    });

    const [redirect, setRedirect] = useState(false);

    // Função para lidar com mudanças nos inputs do formulário
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        // Se for input de data ou hora, ajusta o estado formData.dateTime
        if (type === 'date' || type === 'time') {
            const newDateTime = `${formData.dateTime || new Date().toISOString().split('T')[0]}${type === 'date' ? 'T00:00:00' : ''}`
            setFormData({
                ...formData,
                dateTime: newDateTime,
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'file' ? files[0] : value,
            });
        }
    };

    // Função para enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obrigatórios
        if (!formData.publicationText || !formData.publicationImagePath || !formData.dateTime) {
            console.error("Por favor, preencha todos os campos.");
            alert("Por favor, preencha todos os campos");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/publications', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                alert('Publicado!');
                console.log('Publicado:', response.data);
                setRedirect(true);
            } else {
                console.error('Erro ao publicar!');
                alert("Erro ao publicar!");
            }
        } catch (error) {
            console.error('Erro ao publicar!', error);
            alert("Erro ao publicar!");
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate('/home');
        }
    }, [redirect, navigate]);

    return (
        <div className="containerPub">
            <div className="centroPub">
                <div className="centerTitle">
                    <form onSubmit={handleSubmit}>
                        <p><b>Publicar</b></p>
                        <textarea placeholder="O que você está pensando?" name='publicationText' onChange={handleChange} />
                        <input placeholder='URL da imagem' name='publicationImagePath' onChange={handleChange} />
                        <input type="date" onChange={handleChange} />
                        <input type="time" onChange={handleChange} />
                        <div className='buttonsPub'>
                            <button type='submit' className='btn'>Publicar</button>
                            <Link to="/home"><button className='btn' style={buttonStyle}>Cancelar</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
