import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../App/useToken';

/* 
 * FUNCTION: Load followers from logged user
 * send a GET request to backend to return
 * all the users that follows the logged user
 * and return JSON response
 */
async function getFollowers(){
    const userId = getToken();
    try{
        const response = await fetch(`http://localhost:8080/users/followers/${userId}`, {
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
 * FUNCTION: Load the followers list
 */
export const LoadFollowers = () => {
    const [results, setResults] = useState([]);

    /* 
     * FUNCTION: Get the followers list
     * call for the getFollowers()
     * If found results, set them to variable
     */
    useEffect(() => {
        const getFollowersList = async () => {
            const followers = await getFollowers();
            if(followers){
                setResults(followers);
            }
            else{
                setResults([]);
            }
        };
        getFollowersList();
    }, []);

    return (
        <div className="feed">
            <div className="results">
                <p className="pageTitle">Seguidores</p>
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
