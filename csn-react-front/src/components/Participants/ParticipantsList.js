import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../App/useToken';
import { Post } from '../Publication/Post';

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
 * FUNCTION: Get the publication
 * with a GET request to backend
 * returns the user and event
 */
async function getPublication(eventId){
    try{
        const response = await fetch(`http://localhost:8080/publications/event/${eventId}`, {
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
            console.error("Unable to get event", errorData);
            return null;
        }
    }
    catch(error){
        console.error("Unable to fetch event information!", error);
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

    const [pub, setPub] = useState();
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

    /* 
     * FUNCTION: Get the event on which
     * users are confirming participation
     */
    useEffect(() => {
        const getUserAndPublication = async () => {
            const publication = await getPublication(id);
            if(publication){
                setPub(publication);
            }
            else{
                setPub();
            }
        }
        getUserAndPublication();
    }, [id]);

    const post = pub && (
        <Post
            key={pub.publication.id}
            id={pub.publication.id}
            publicationType={pub.publication.publicationType}
            username={pub.user.username}
            profileImage={pub.user.profileImagePath}
            postText={pub.publication.publicationText}
            imageUrl={pub.publication.publicationImagePath}
            eventData={pub.publication.eventDate}
            eventTime={pub.publication.eventTime}
            confirmedUsers={pub.publication.countParticipants}
        />
    );

    return (
        <div className="feed">
            <div className="results">
                <p className="pageTitle">Participantes</p>
                {post}
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
