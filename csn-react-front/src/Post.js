import React from 'react';

export const Post = (props) => {
    if(props.publicationType == "post"){
        return (
            <div className="publication">
                <div className="img_and_user">
                    <img src={props.profileImage} alt="pfp" className="profile_picture"/>
                    <p className="user">{props.username}</p>
                </div>
                <div className="text_and_picture">
                    <p className="postText">{props.postText}</p>
                    <img src={props.imageUrl} alt="pub" />
                </div>
            </div>
        );
    };
    if(props.publicationType == "event"){
        return (
            <div className="publication">
                <div className="img_and_user">
                    <img src={props.profileImage} alt="pfp" className="profile_picture"/>
                    <p className="user">{props.username}</p>
                </div>
                <div className="text_and_picture">
                    <p className="postText">{props.postText}</p>
                    <img src={props.imageUrl} alt="pub" />
                </div>
                <div className="eventInfo">
                    <div className="info"> 
                        <p>{props.eventData}</p>
                        <p>{props.eventTime}</p>
                        <p>Usuários confirmados: {props.membersConfirmed}</p>
                    </div>
                    <div className="confirmPart">
                        <p>Confirmar participação nesse evento?</p>
                        <button id="participate" className="btn">Participar</button>
                    </div>
                </div>
            </div>
        );
    };
};
// AQUI COLOCAR: APERTOU BOTAO, SOMA 1 NO DISPLAY DE QUANTOS PARTICIPANTES
// MUDA A COR DO BOTAO E O TEXTO DO BOTAO, PARA "REMOVER PARTICIPACAO"
// SE APERTAR AGORA, DEVE SER SUBTRAIR 1 