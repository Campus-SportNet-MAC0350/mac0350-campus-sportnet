import { Post } from "../Publication/Post";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../App/useToken';

// request user data from database
async function getUserData() {
    const id = getToken();

    try{
        const response = await fetch(`http://localhost:8080/users/id?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                alert("[ERROR]: User not found");
                console.error('User not found!');
            } else {
                alert(`[ERROR]: ${response.statusText}`);
                console.error('Error:', response.statusText);
            }
            return null;
        }

        console.log("Loading Profile!");
        return await response.json();
    } 
    catch (error){
        console.error('Fetch error:', error);
        alert("[ERROR]: Unable to fetch user data");
        return null;
    }
}

// request user publications from database
async function getUserPublications(){
    const id = getToken();

    try{
        const response = await fetch(`http://localhost:8080/publications/userinfo/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if(response.status === 404){
                // alert("[ERROR]: Publications not found");
                console.error('Publications not found!');
            } 
            else{
                alert(`[ERROR]: ${response.statusText}`);
                console.error('Error:', response.statusText);
            }
            return null;
        }

        console.log("Loading Publications!");
        return await response.json();
    }
    catch (error){
        console.error('Fetch error:', error);
        alert("[ERROR]: Unable to fetch user data");
        return null;
    }
}

export const DisplayProfile = (props) => {
    let [flag, setFlag] = useState(0);
    let [btnString, setBtnString] = useState("Seguir");
    let [followers, setFollowers] = useState(+0);

    const [user, setUser] = useState(null);
    const [publications, setPublications] = useState([]);

    const navigate = useNavigate();

    // load user data
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserData();
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
    }, [navigate]);

    // load publications
    useEffect(() => {
        const fetchPublications = async () => {
            const publicationsData = await getUserPublications();
            if(publicationsData){
                setPublications(publicationsData);
            }
        };
        fetchPublications();
    }, []);

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
                    <div className="follow_btn">
                        <button onClick={changeFollow} style={buttonStyle} className="btn">{btnString}</button>
                    </div>
                </div>
                <div className="bioDisplay">
                    <p>{user.university}</p>
                </div>
                <div className="bioDisplay">
                    <b><p>{user.profileBio}</p></b>
                </div>
            </div>
            {publications.map((publication) => (
                <Post
                    key={publication.id}
                    publicationType={publication.publicationType}
                    username={user.username}
                    profileImage={user.profileImagePath}
                    postText={publication.publicationText}
                    imageUrl={publication.publicationImagePath}
                />
            ))}
        </div>
    )
}