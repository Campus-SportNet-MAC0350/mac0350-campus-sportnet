import React from 'react';

export const DisplayRightMenu = (props) => {
    return(
        <div className="rightMenu">
            <div className="img_and_user_right">
                <img src={props.profileImage} alt="pfp" className="profile_picture"/>
                <p className="user">{props.username}</p>
            </div>
        </div>
    );
};