import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUserData } from '../Profile/DisplayProfile';
import { getToken } from '../App/useToken';

/* 
 * FUNCTION: Display right menu
 * Redirect to profile and pages to
 * check followers and following users
 */
export const DisplayRightMenu = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const id = getToken();

    /* 
     * FUNCTION: Fetch logged user
     * Load the logged user information
     * based on the id.
     */
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
            <Link to={`/profile/${id}`} className='linkDef'>
                <div className="img_and_user_right">
                    {user && <img src={user.profileImagePath} alt="pfp"/>}
                    <div className="text_container">
                        {user && <p className="username">{user.username}</p>}
                        {user && <p className="university">{user.university}</p>}
                    </div>
                </div>
            </Link>
            <Link to={'/following'} className='linkDef'>
                <div className="followersTxt">
                    <p className="username">Seguindo</p>
                </div>
            </Link>
            <Link to={'/followers'} className='linkDef'>
                <div className="followersTxt">
                    <p className="username">Seguidores</p>
                </div>
            </Link>
        </div>
    );
};