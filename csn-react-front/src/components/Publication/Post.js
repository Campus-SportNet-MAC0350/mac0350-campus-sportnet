import React, { useState, useEffect } from 'react';
import { getToken } from '../App/useToken';
import { Link } from 'react-router-dom';

/* 
 * FUNCTION: Check if the logged user is participating on event
 * Receives the id for the logged user and the event
 * Request response from database
 * Returns true if the user has confirmed participation
 * Returns false otherwise
 */
async function checkIfParticipating(userId, eventId){
    const eventParticipation = {
        userId: userId,
        eventId: eventId,
    };

    try {
        const response = await fetch(`http://localhost:8080/publications/checkIfParticipating?userId=${eventParticipation.userId}&eventId=${eventParticipation.eventId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            return true;
        } 
        else{
            return false;
        }
    }
    catch(error){
        console.error("[ERROR]: Parsing backend response: ", error);
        return false;
    }
}

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

    const eventParticipation = {
        userId: token,
        eventId: props.id,
    };

    // Check if user is participating when page is loaded
    useEffect(() => {
        const isParticipatingCheck = async () => {
            if(props.publicationType === 'e'){
                const isParticipating = await checkIfParticipating(eventParticipation.userId, eventParticipation.eventId);
                if (isParticipating) {
                    setFlag(1);
                    setBtnString('Cancelar Participação');
                    setParticipacao("Cancelar participação nesse evento?");
                } 
                else {
                    setFlag(0);
                    setBtnString('Participar');
                    setParticipacao("Confirmar participação nesse evento?");
                }
            }
        };

        isParticipatingCheck();
    }, [props.publicationType, eventParticipation.userId, eventParticipation.eventId]);

    /* 
     * FUNCTION: Handle event participants
     * If the user is not participating and clicks the button
     * Saves user participation into database
     * Otherwise, removes user participation from database
     * Update visual features
     */
    const handleEventParticipants = async () => {
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
                    console.log("Participation added: ", data);
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
                console.error("[ERROR]: Unable to participate! Problem parsing JSON response", error);
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
                    <Link to={`/participants/${props.id}`} ><button className="btn">Participantes confirmados</button></Link>
                </div>
            </div>}
        </div>
    );
};