import React from 'react';
import { Link } from 'react-router-dom';

export const CreatePublication = () =>  {
    const buttonStyle = {
        backgroundColor: '#990000',
    };
    return(
        <div className="containerPub">
            <div className="centroPub">
                <div className="centerTitle">
                    <form>
                        <p><b>Publicar</b></p>
                        <textarea placeholder="O que você está pensando?" />
                        <label for="file-upload" class="custom-file-upload">
                            <input id="file-upload" type="file"/>
                            <h3>Escolha uma imagem</h3>
                        </label>
                        <div className='buttonsPub'>
                        <Link to="/home"><button className='btn'>Publicar</button></Link>
                            <Link to="/home"><button className='btn' style={buttonStyle}>Cancelar</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};