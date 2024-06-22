import { Post } from "./Post";
import React from 'react';

// consumir apenas publicacoes de usuarios que o nosso usuario segue
const publications = [
    {
        id: 1,
        username: 'Pabli Escobas',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXj9LqCbHdU8tG2RVy8FutfLlDfF7kqwKcgaGkqYhkIA&s',
        postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin ante in odio tincidunt, commodo interdum ex luctus. Pellentesque porttitor urna vel turpis rhoncus, sed interdum ex lacinia. Nam non arcu dapibus, porttitor lacus nec, lacinia enim. Suspendisse cursus vitae magna vel commodo. Mauris dignissim sagittis arcu, in facilisis ex pretium sit amet. Morbi at tortor ac eros aliquet euismod eu a ante. Etiam bibendum maximus tellus aliquet fringilla. Etiam et mi ac risus bibendum vestibulum id blandit diam. Quisque quis libero suscipit, malesuada nisl quis, porttitor orci. Aliquam dapibus odio quis nisi condimentum imperdiet. Nullam at facilisis erat. Nulla facilisi. Fusce ut est quis velit eleifend ornare. Phasellus sit amet magna tortor. Curabitur a massa ut justo pretium efficitur vitae a augue. Praesent at interdum mi. Fusce ullamcorper felis augue. Sed lacinia dictum dui vel dapibus. Nulla cursus urna eget semper aliquet. Proin et lacus purus. Nunc efficitur massa efficitur augue dapibus, non cursus nisl lacinia.',
        imageUrl: 'https://www.ime.usp.br/~maratona/images/logo.png',
        publicationType: 'post',
        eventData: '',
        eventTime: '',
        confirmedUsers: ''
    },

    {
        id: 2,
        username: 'Bea Zika',
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRamm2Y7gFuOKj8Rd9AHmcu1Jh6hVF6XUjvgFjM9fLtg&s',
        postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis viverra nulla. Nunc vel varius justo, sed blandit nibh. Nunc sit amet volutpat nisi. Donec eget fringilla nunc. Duis suscipit quam non odio euismod tempor. Vestibulum tempor varius pulvinar. Morbi rutrum orci a odio eleifend, et consectetur lorem bibendum. Fusce sagittis nisl non ullamcorper condimentum. Integer egestas, nulla sit amet consectetur tempor, nulla augue consequat justo, porta sollicitudin metus neque at urna. Etiam tincidunt pharetra elit, fringilla semper magna cursus quis. Donec non mi lectus. Duis in efficitur ex, non dictum leo. Fusce sollicitudin porta nisi, non vehicula sem. Aliquam molestie, ligula at tincidunt blandit, enim velit efficitur orci, ac fermentum eros odio sit amet ex. Quisque egestas lacinia lectus, eget mattis augue ultricies in. Aliquam pulvinar accumsan interdum.',
        imageUrl: 'https://www.ime.usp.br/cea/resources/logo-ime-horizontal.png',
        publicationType: 'event',
        eventData: '12-01-2025',
        eventTime: '00:00',
        confirmedUsers: 12
    },

    {
        id: 3,
        username: 'May Desafios',
        profileImage: 'https://preview.redd.it/best-boy-and-best-girl-of-season-7-my-pfp-says-it-v0-6x9yfkhtlswa1.jpg?width=640&crop=smart&auto=webp&s=14c2b3e0dcb3a36e9744a8a14793ff0a9294eacf',
        postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis viverra nulla. Nunc vel varius justo, sed blandit nibh. Nunc sit amet volutpat nisi. Donec eget fringilla nunc. Duis suscipit quam non odio euismod tempor. Vestibulum tempor varius pulvinar. Morbi rutrum orci a odio eleifend, et consectetur lorem bibendum. Fusce sagittis nisl non ullamcorper condimentum. Integer egestas, nulla sit amet consectetur tempor, nulla augue consequat justo, porta sollicitudin metus neque at urna. Etiam tincidunt pharetra elit, fringilla semper magna cursus quis. Donec non mi lectus. Duis in efficitur ex, non dictum leo. Fusce sollicitudin porta nisi, non vehicula sem. Aliquam molestie, ligula at tincidunt blandit, enim velit efficitur orci, ac fermentum eros odio sit amet ex. Quisque egestas lacinia lectus, eget mattis augue ultricies in. Aliquam pulvinar accumsan interdum.',
        imageUrl: 'https://www.ime.usp.br/~maratona/images/logo.png',
        publicationType: 'post',
        eventData: '',
        eventTime: '',
        confirmedUsers: ''
    }
]


export const DisplayPublication = () => {
    const listPosts = publications.map(publication => (
        <Post
            key={publication.id}
            publicationType={publication.publicationType}
            username={publication.username}
            profileImage={publication.profileImage}
            postText={publication.postText}
            imageUrl={publication.imageUrl}
            eventData={publication.eventData}
            eventTime={publication.eventTime}
            confirmedUsers={publication.confirmedUsers}
        />
    ));
    return(
        <div className="feed">
            {listPosts}
        </div>
    );
};