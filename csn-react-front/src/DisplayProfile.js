import { Post } from "./Post";
import React, { useState } from 'react';

const user1 = {
    username: 'Pabli Escobas',
    profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXj9LqCbHdU8tG2RVy8FutfLlDfF7kqwKcgaGkqYhkIA&s',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin ante in odio tincidunt, commodo interdum ex luctus. Pellentesque porttitor urna vel turpis rhoncus, sed interdum ex lacinia. Nam non arcu dapibus, porttitor lacus nec, lacinia enim. Suspendisse cursus vitae magna vel commodo. Mauris dignissim sagittis arcu, in facilisis ex pretium sit amet. Morbi at tortor ac eros aliquet euismod eu a ante. Etiam bibendum maximus tellus aliquet fringilla. Etiam et mi ac risus bibendum vestibulum id blandit diam. Quisque quis libero suscipit, malesuada nisl quis, porttitor orci. Aliquam dapibus odio quis nisi condimentum imperdiet. Nullam at facilisis erat. Nulla facilisi. Fusce ut est quis velit eleifend ornare. Phasellus sit amet magna tortor. Curabitur a massa ut justo pretium efficitur vitae a augue. Praesent at interdum mi. Fusce ullamcorper felis augue. Sed lacinia dictum dui vel dapibus. Nulla cursus urna eget semper aliquet. Proin et lacus purus. Nunc efficitur massa efficitur augue dapibus, non cursus nisl lacinia.',
    imageUrl: 'https://www.ime.usp.br/~maratona/images/logo.png'
}

export const DisplayProfile = (props) => {
    let [flag, setFlag] = useState(0);
    let [btnString, setBtnString] = useState("Seguir");
    let [followers, setFollowers] = useState(+props.followers);

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

    const buttonStyle = {
        backgroundColor: flag ? '#990000' : '#007BFF', // Vermelho quando !flag, azul quando flag
    };

    return(
        <div className="feed">
            <div className="profileInfo">
                <div className="profilePic_and_Username">
                    <div className="profilePic">
                        <img src={props.profilePic} alt="a" />
                    </div>
                    <div className="usr_and_followers">
                        <p>{props.username}</p>
                        <h3>{followers} seguidores</h3>
                    </div>
                    <div className="follow_btn">
                        <button onClick={changeFollow} style={buttonStyle} className="btn">{btnString}</button>
                    </div>
                </div>
                <div className="bioDisplay">
                    <p>Universidade: {props.university}</p>
                    <p>Atlética: {props.atletica}</p>
                </div>
                <div className="bioDisplay">
                    <b><p>{props.bio}</p></b>
                </div>
            </div>
            <Post publicationType="post" username={props.username} profileImage={props.profilePic} postText={user1.postText} imageUrl={user1.imageUrl}/>
            <Post publicationType="post" username={props.username} profileImage={props.profilePic} postText={user1.postText} imageUrl={user1.imageUrl}/>
        </div>
    )
}