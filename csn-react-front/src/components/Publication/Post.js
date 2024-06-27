import React, { useState } from 'react';

/* 
 * FUNCTION: Display a publication
 * Receives the publication data on props
 * This data is supposed to be pre-obtained on another js file
 * Display username, publication text and image
 * If it is an event, shows date and time
 */
export const Post = (props) => {
    let [flag, setFlag] = useState(0);
    let [participacao, setParticipacao] = useState("Confirmar participação nesse evento?");
    let [btnString, setBtnString] = useState("Participar");
    let [confirmedUsers, setConfirmedUsers] = useState(+props.confirmedUsers);

    const changeUsersCount = () => {
        if (!flag) {
            setConfirmedUsers(confirmedUsers + 1);
            setFlag(1);
            setParticipacao("Cancelar participação nesse evento?");
            setBtnString("Cancelar");
        } else {
            setConfirmedUsers(confirmedUsers - 1);
            setFlag(0);
            setParticipacao("Confirmar participação nesse evento?");
            setBtnString("Participar");
        }
        console.log(confirmedUsers);
    };

    const buttonStyle = {
        backgroundColor: flag ? '#990000' : '#007BFF', // Vermelho quando !flag, azul quando flag
    };

    // normal publication
    if(props.publicationType === "p"){
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

    // event publication
    if(props.publicationType === "e"){
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
                        <p>Usuários confirmados: {confirmedUsers}</p> {/* usar props.membersConfirmed? */}
                    </div>
                    <div className="confirmPart">
                        <p>{participacao}</p>
                        <button onClick={changeUsersCount} style={buttonStyle} id="participate" className="btn">{btnString}</button>
                    </div>
                </div>
            </div>
        );
    };
};