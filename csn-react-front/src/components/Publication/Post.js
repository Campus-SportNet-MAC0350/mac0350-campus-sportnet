import React, { useState } from 'react';
import { getToken } from '../App/useToken';

/* 
 * FUNCTION: Display a publication
 * Receives the publication data on props
 * This data is supposed to be pre-obtained on another js file
 * Display username, publication text and image
 * If it is an event, shows date and time
 */
export const Post = (props) => {
    const token = getToken();

    let [flag, setFlag] = useState(0);
    let [participacao, setParticipacao] = useState("Confirmar participação nesse evento?");
    let [btnString, setBtnString] = useState("Participar");
    let [confirmedUsers, setConfirmedUsers] = useState(+props.confirmedUsers);

    const handleEventParticipants = async () => {
        const eventParticipation = {
            userId: token,
            eventId: props.id,
        };

        // add participation
        if(!flag){
            try{
                const response = await fetch('http://localhost:8080/publications/participateInEvent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventParticipation),
                })

                if(response.status === 201){
                    const data = await response.json();
                    console.log("Pariticipation added: ", data);
                    setConfirmedUsers(confirmedUsers + 1);
                    setFlag(1);
                    setParticipacao("Cancelar participação nesse evento?");
                    setBtnString("Cancelar");
                }
                else{
                    const errorData = await response.json();
                    console.error("[ERROR]: Participating in event!", errorData);
                    return;
                }
            }
            catch(error){
                console.error("[ERROR]: Unable to participate!", error);
                return;
            }
        } 
        // cancel participation
        else{
            try{
                const response = await fetch('http://localhost:8080/publications/stopParticipating', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventParticipation),                
                });

                const d = await response.json();
                if(response.ok){
                    console.log("Stopped participating: ", d);
                    setConfirmedUsers(confirmedUsers - 1);
                    setFlag(0);
                    setParticipacao("Confirmar participação nesse evento?");
                    setBtnString("Participar");
                }
                else{
                    console.error("[ERROR]: Cancel participation: ", d);
                    return;
                }
            }
            catch(error){
                console.error("[ERROR]: Unable to cancel participation: ", error);
            }   
        }
        console.log(confirmedUsers);
    };

    const buttonStyle = {
        backgroundColor: flag ? '#990000' : '#007BFF', // Vermelho quando !flag, azul quando flag
    };

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
            {props.publicationType === "e" && <div className="eventInfo">
                <div className="info"> 
                    <p>{props.eventData}</p>
                    <p>{props.eventTime}</p>
                    <p>Usuários confirmados: {confirmedUsers}</p> {/* usar props.membersConfirmed? */}
                </div>
                <div className="confirmPart">
                    <p>{participacao}</p>
                    <button onClick={handleEventParticipants} style={buttonStyle} id="participate" className="btn">{btnString}</button>
                </div>
            </div>}
        </div>
    );
};