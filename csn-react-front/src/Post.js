import React from 'react';

export const Post = (props) => {
    return (
        <div className="publication">
            <div className="img_and_user">
                <img src={props.profileImage} alt="pfp" className="profile_picture"/>
                <p className="user">{props.username}</p>
            </div>
            <div className="text_and_picture">
                <p className="postText">{props.postText}</p>
                <img src={props.imageUrl} alt="pub" />
            </div>
        </div>
    );
};