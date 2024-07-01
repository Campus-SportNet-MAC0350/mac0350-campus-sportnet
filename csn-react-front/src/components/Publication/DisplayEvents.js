import { Post } from "./Post";
import { getToken } from "../App/useToken";
import React, { useEffect, useState } from 'react';

/* 
 * FUNCTION: Get publications from followed users
 * Fetch the backend with GET method
 * Check if is able to get information
 * Returns the JSON response
 */
async function getUserEvents(id){
    try{
        const response = await fetch(`http://localhost:8080/publications/events/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.status === 200){
            console.log("Got events information!");
            return await response.json();
        }
        else{
            const errorData = await response.json();
            console.error("Unable to get feed information", errorData);
            return null
        }
    }
    catch(error){
        console.error("Unable to load feed information", error);
        return null
    }
}

/* 
 * FUNCTION: Display a publication
 * Receives the response from the above function
 * Checks if there are publications to be displayed
 * If so, set them to a list
 * List the posts in post-date order and call <Post>
 * Send props to publication informations
 */
export const DisplayEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const userId = getToken();
        const fetchFeedInfo = async () => {
            try {
                const feedInfo = await getUserEvents(userId);
                if (feedInfo) {
                    setEvents(feedInfo);
                    console.log("Events loaded!");
                } 
                else {
                    console.error("[ERROR]: loading events!");
                }
            } 
            catch (error) {
                console.error("Unable to load events information", error);
            }
        };
        fetchFeedInfo();
    }, []);

    const listEvents = events
        .sort((a, b) => new Date(b.publication.dateTime) - new Date(a.publication.dateTime))
        .map(p => (
        <Post
            key={p.publication.id}
            id={p.publication.id}
            publicationType={p.publication.publicationType}
            username={p.user.username}
            profileImage={p.user.profileImagePath}
            postText={p.publication.publicationText}
            imageUrl={p.publication.publicationImagePath}
            eventData={p.publication.eventDate}
            eventTime={p.publication.eventTime}
            confirmedUsers={p.publication.countParticipants}
        />
    ));

    return(
        <div className="feed">
            {listEvents}
        </div>
    );
};