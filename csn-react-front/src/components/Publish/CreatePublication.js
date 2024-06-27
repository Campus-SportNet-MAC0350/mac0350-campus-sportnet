import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../App/useToken';

/* 
 * FUNCTION: Create a new publication
 * This function publishs a normal-type publication
 * Make POST requests to backend saving the publication data
 * Redirects user to "/home" route (feed page)
 */
export const CreatePublication = () =>  {
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

    // pegar a hora atual
    const currentTime = new Date();
    const formattedDateTime = currentTime.toISOString().split('.')[0];

    const [formData, setFormData] = useState({
        userId: token,
        publicationType: 'p',
        publicationText: '',
        countParticipants: 0,
        dateTime: formattedDateTime,
        eventDate: '',
        eventTime: '',
        publicationImagePath: '',
    });

    const [redirect, setRedirect] = useState(false);

    const handleChange = (e) => {
        const {name, value, type, files} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value,
        });
    };

    /* 
     * FUNCTION: Handle inputs submit
     * Make a POST to backend
     * Create a new publication for the logged user
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(
            !formData.publicationText ||
            !formData.publicationImagePath
        ){
            console.error("Por favor, preencha todos os campos.");
            alert("Por favor, preencha todos os campos");
            return;
        }

        const data = new FormData();

        data.append('publicationText', formData.publicationText);
        data.append('publicationImagePath', formData.publicationImagePath);

        try{
            const response = await axios.post('http://localhost:8080/publications', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(response.status === 201){
                alert('Publicado!');
                console.log('Publicado:', response.data);
                setRedirect(true);
            }
            else{
                console.error('Erro ao publicar!');
                alert("Erro ao publicar!");
            }
        }
        catch(error){
            console.error('Erro ao publicar!');
            alert("Erro ao publicar!");
        }
    };

    useEffect(() => {
        if (redirect) {
            navigate('/home');
        }
    }, [redirect, navigate]);

    return(
        <div className="containerPub">
            <div className="centroPub">
                <div className="centerTitle">
                    <form onSubmit={handleSubmit}>
                        <p><b>Publicar</b></p>
                        <textarea placeholder="O que você está pensando?" name='publicationText' onChange={handleChange}/>
                        <input placeholder='URL da imagem' name='publicationImagePath' onChange={handleChange}/>
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