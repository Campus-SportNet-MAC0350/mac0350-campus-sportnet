import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../App/useToken';

/* 
 * FUNCTION: Create a new event post
 * This page is available only for users registered as "ATLETICA"
 * Send POST requests to back-end to create an event publication
 * This publication takes date, time, and users can confirm if they are attending
 * (OPTIONAL LATER): add the list of users attending an event?
 */
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

    // get current time
    const currentTime = new Date();
    const formattedDateTime = currentTime.toISOString().split('.')[0];

    const [formData, setFormData] = useState({
        userId: token,
        publicationType: 'e',
        publicationText: '',
        countParticipants: 0,
        dateTime: formattedDateTime,
        eventDate: '',
        eventTime: '',
        publicationImagePath: '',
    });

    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    /* 
     * FUNCTION: Handle the submitted data from inputs
     * Get the input values and send a POST request to backend
     * If the post was created, return an OK message
     * Navigate back to "/home" route (feed)
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if(!formData.publicationText || 
            !formData.publicationImagePath || 
            !formData.eventDate || 
            !formData.eventTime
        ){
            console.error("Por favor, preencha todos os campos.");
            alert("Por favor, preencha todos os campos");
            return;
        }

        try{
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
                        <input type="date" name="eventDate" onChange={handleChange} />
                        <input type="time" name="eventTime" onChange={handleChange} />
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
