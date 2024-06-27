import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../Profile/DisplayProfile';
import { getToken } from '../App/useToken';

export const DisplayRightMenu = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const id = getToken();

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
            }
        };
        fetchUser();
    }, [id, navigate]);

    return(
        <div className="rightMenu">
            <div className="img_and_user_right">
                {user && <img src={user.profileImagePath} alt="pfp"/>}
                <div className="text_container">
                    {user && <p className="username">{user.username}</p>}
                    {user && <p className="university">{user.university}</p>}
                </div>
            </div>
            <div className="followersTxt">
                <p className="username">Seguindo</p>
            </div>
            <div className="followersTxt">
                <p className="username">Seguidores</p>
            </div>
        </div>
    );
};