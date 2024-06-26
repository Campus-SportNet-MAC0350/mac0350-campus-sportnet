import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from "../Publication/Post";
import { getToken } from '../App/useToken';

/* 
 * FUNCTION: Request user data from database
 * Send a GET request to back-end
 * If a user matching the ID is found
 * returns a object with the user data
 * this data is printed on the profile page
 */
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

/* 
 * FUNCTION: Request user publications from database
 * Send a GET request to back-end
 * If a publication by the user matching the ID is found
 * attach the object concerning the publication to a list
 * the publications are shown on the screen, ordered by post-data
 */
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

/* 
 * FUNCTION: Check if the logged user follows the profile user
 * Send a GET request to back-end
 * If a user matching the followerId and a user matching the followedId
 * are found on the follow table on the database
 * returns true, else returns false
 * note: console error is printed when a user don't follow another
 * because the back-end was unable to find the data requested
 */
async function checkIfFollowing(followerId, followedId) {

    const followData = {
        followerId: followerId,
        followedId: followedId,
    };

    try {
        const response = await fetch(`http://localhost:8080/users/follow?followerId=${followData.followerId}&followedId=${followData.followedId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log("You follow this profile!", data);
            return true;
        } 
        else {
            console.log("You don't follow this profile!");
            return false;
        }
    } catch(error){
        console.error('[ERROR]: Unable to fetch follow', error);
        return false;
    }
}

/* 
 * FUNCTION: Show user profile
 * Use the functions above and display the user profile
 * This may be called from logged user profile or a search profile
 */
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

    // check if current user follows the profile user
    useEffect(() => {
        const checkFollowingStatus = async () => {
            if (token !== id) {
                const isFollowing = await checkIfFollowing(token, id);
                if (isFollowing) {
                    setFlag(1);
                    setBtnString('Deixar de Seguir');
                } 
                else {
                    setFlag(0);
                    setBtnString('Seguir')
                }
            }
        };

        checkFollowingStatus();
    }, [id, token]);

    /* 
     * FUNCTION: Follow/Unfollow user
     * Send a POST request to back-end
     * If the user is followed, unfollow the user
     * If the user is not followed, start following
     * Set the follow display on the page to +1 or -1
     * Change the button text and color
     */
    const changeFollow = async () => {
        const followData = {
            followerId: token,
            followedId: id,
        };

        // follow another profile
        if(!flag){
            if(!followData.followedId || !followData.followerId){
                console.error("[ERRO]: fazer login");
                return;
            }

            try{
                const response = await fetch('http://localhost:8080/users/follow', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(followData),
                });

                if (response.status === 201) {
                    const data = await response.json();
                    console.log('User followed:', data);
                } 
                else{
                    const errorData = await response.json();
                    console.error('[ERROR]: Following user!', errorData);
                    return;
                }
            } 
            catch (error) {
                console.error('[ERROR]: Unable to follow user', error);
            }

            setFollowers(followers + 1);
            setFlag(1);
            setBtnString("Deixar de seguir");
        } 

        // unfollow another profile
        else{
            if(!followData.followedId || !followData.followerId){
                console.error("[ERRO]: fazer login");
                return;
            }

            try{
                const response = await fetch('http://localhost:8080/users/unfollow', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(followData),
                });

                if(response.ok){
                    const data = await response.json();
                    console.log('User unfollowed:', data);
                } 
                else{
                    const errorData = await response.json();
                    console.error('[ERROR]: Unfollowing user!', errorData);
                }
            }
            catch(error){
                console.error("[ERROR]: Unable to unfollow user!", error);
            }

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