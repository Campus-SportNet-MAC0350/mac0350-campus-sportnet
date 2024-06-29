import { Post } from "./Post";
import React, { useEffect, useState } from 'react';
import { getToken } from "../App/useToken";

async function getFollowedPublications(id){
    try{
        const response = await fetch(`http://localhost:8080/publications/followedinfo/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.status === 200){
            console.log("Got feed information!");
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


export const DisplayPublication = () => {
    const token = getToken();
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        const fetchFeedInfo = async () => {
            try{
                const feedInfo = await getFollowedPublications(token);
                if(feedInfo){
                    setPublications(feedInfo);
                    // console.log(feedInfo);
                    console.log("Publications loaded!");
                } 
                else {
                    console.error("[ERROR]: loading publications!");
                }
            } 
            catch(error){
                console.error("Unable to load feed information", error);
            }
        };
        fetchFeedInfo();
    }, [token]);

    const listPosts = publications
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
            {listPosts}
        </div>
    );
};