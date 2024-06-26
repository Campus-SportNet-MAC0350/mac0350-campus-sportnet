import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from "../Publication/Post";
import { getToken } from '../App/useToken';

// request user data from database
export async function getUserData(id) {
    try {
        const response = await fetch(`http://localhost:8080/users/id?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.error('User not found!');
            } else {
                console.error('Error:', response.statusText);
            }
            return null;
        }

        console.log("Loading Profile!");
        return await response.json();
    } 
    catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// request user publications from database
export async function getUserPublications(id) {
    try {
        const response = await fetch(`http://localhost:8080/publications/userinfo/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if(response.status === 404){
                console.error('Publications not found!');
            } 
            else {
                console.error('Error:', response.statusText);
            }
            return null;
        }

        console.log("Loading Publications!");
        return await response.json();
    }
    catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export const DisplayProfile = (props) => {
    let [flag, setFlag] = useState(0);
    let [btnString, setBtnString] = useState("Seguir");
    let [followers, setFollowers] = useState(0);

    const [user, setUser] = useState(null);
    const [publications, setPublications] = useState([]);

    const navigate = useNavigate();

    const token = getToken();
    const id = typeof props.userId === 'string' ? parseInt(props.userId, 10) : props.userId;

    // load user data
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserData(id);
            if (!userData) {
                console.error("[ERROR]: User not identified");
                navigate("/");
            }
            else {
                setUser(userData);
                setFollowers(userData.followersCount);
            }
        };
        fetchUser();
    }, [id, navigate]);

    // load publications
    useEffect(() => {
        const fetchPublications = async () => {
            const publicationsData = await getUserPublications(id);
            if(publicationsData){
                setPublications(publicationsData);
            }
        };
        fetchPublications();
    }, [id]);

    // add a follower on the screen
    // atualizar no bd tambem!
    const changeFollow = () => {
        if (!flag) {
            setFollowers(followers + 1);
            setFlag(1);
            setBtnString("Deixar de seguir");
        } else {
            setFollowers(followers - 1);
            setFlag(0);
            setBtnString("Seguir");
        }
        console.log(followers);
    };

    // change button color
    const buttonStyle = {
        backgroundColor: flag ? '#990000' : '#007BFF', // Vermelho quando !flag, azul quando flag
    };

    // loading screen
    if (!user) {
        return <div>Loading...</div>;
    }

    return(
        <div className="feed">
            <div className="profileInfo">
                <div className="profilePic_and_Username">
                    <div className="profilePic">
                        <img src={user.profileImagePath} alt="a" />
                    </div>
                    <div className="usr_and_followers">
                        <p>{user.username}</p>
                        <h3>{followers ?? 0} seguidores</h3>
                    </div>
                    {token !== id && <div className="follow_btn">
                        <button onClick={changeFollow} style={buttonStyle} className="btn">{btnString}</button>
                    </div>}
                </div>
                <div className="bioDisplay">
                    <b><p>{user.university}</p></b>
                    <p>{user.profileBio}</p>
                </div>
            </div>
            {publications
                .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                .map((publication) => (
                    <Post
                        key={publication.id}
                        publicationType={publication.publicationType}
                        username={user.username}
                        profileImage={user.profileImagePath}
                        postText={publication.publicationText}
                        imageUrl={publication.publicationImagePath}
                    />
                ))
            }
        </div>
    )
}