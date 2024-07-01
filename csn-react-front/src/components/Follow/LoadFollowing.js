import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../App/useToken';

/* 
 * FUNCTION: Load following from logged user
 * send a GET request to backend to return
 * all the users that follows the logged user
 * and return JSON response
 */
async function getFollowing(){
    const userId = getToken();
    try{
        const response = await fetch(`http://localhost:8080/users/following/${userId}`, {
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
 * FUNCTION: Load the following list
 */
export const LoadFollowing = () => {
    const [results, setResults] = useState([]);

    /* 
     * FUNCTION: Get the following list
     * call for the getfollowing()
     * If found results, set them to variable
     */
    useEffect(() => {
        const getFollowingList = async () => {
            const following = await getFollowing();
            if(following){
                setResults(following);
            }
            else{
                setResults([]);
            }
        };
        getFollowingList();
    }, []);

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
