import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../App/useToken';

/* 
 * FUNCTION: Get users for an event
 * Send a GET request to backend
 * This request should return info
 * for all the users that are participating
 * on an event, matching the eventId
 */
async function getUsersForEvent(eventId){
    try{
        const response = await fetch(`http://localhost:8080/publications/getParticipants?eventId=${eventId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok){
            return await response.json();
        }
        else{
            const errorData = await response.json();
            console.error("Erro ao obter dados!", errorData);
            return null;
        }
    }
    catch(error){
        console.error("[ERROR]: Fetching information", error);
        return null;
    }
}

/* 
 * FUNCTION: Display the participants list
 * Get and event id from props
 * Load the information for all the users that
 * have confirmed presence on the event
 * Display the username, university and bio
 * Make the display clickable to travel to the user profile
 */
export const ParticipantsList = (props) => {
    const id = props.eventId;

    const token = getToken();
    const navigate = useNavigate();

    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!token) {
            console.error("[ERROR]: No token identified");
            navigate("/");
        }
    }, [token, navigate]);

    /* 
     * FUNCTION: Get the list of participants
     * Everytime the id changes, load the list
     * Set the result list to the list
     * from the database
     */
    useEffect(() => {
        const getParticipantsList = async () => {
            const participants = await getUsersForEvent(id);
            if(participants){
                setResults(participants);
            }
            else{
                setResults([]);
            }
        };
        getParticipantsList();
    }, [id]);

    return (
        <div className="feed">
            <div className="results">
                {results.map(result => (
                    <Link to={`/profile/${result.id}`} className='searchLink' key={result.id}>
                        <div className="search_icon">
                            <img src={result.profileImagePath} alt="pfp" className="search_profile_picture"/>
                            <div className="text_container">
                                <p className="username">{result.username}</p>
                                <p className="university">{result.profileBio}</p>
                                <p className="university">{result.university}</p>
                            </div>
                        </div>
                    </Link> 
                ))}
            </div>
        </div>
    );
};
