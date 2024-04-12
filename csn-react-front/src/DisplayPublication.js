import { Post } from "./Post";

const user1 = {
    username: 'Pabli Escobas',
    profileImage: 'https://scontent.fcpq17-1.fna.fbcdn.net/v/t39.30808-6/245426783_191665246436265_6690932939322340490_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=KknKVW8pi8EAb7awekA&_nc_ht=scontent.fcpq17-1.fna&oh=00_AfBAleCfwjpGozRZWp6hZWlPaY79HCtjckpu1WoHgtsbBQ&oe=661F7942',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin ante in odio tincidunt, commodo interdum ex luctus. Pellentesque porttitor urna vel turpis rhoncus, sed interdum ex lacinia. Nam non arcu dapibus, porttitor lacus nec, lacinia enim. Suspendisse cursus vitae magna vel commodo. Mauris dignissim sagittis arcu, in facilisis ex pretium sit amet. Morbi at tortor ac eros aliquet euismod eu a ante. Etiam bibendum maximus tellus aliquet fringilla. Etiam et mi ac risus bibendum vestibulum id blandit diam. Quisque quis libero suscipit, malesuada nisl quis, porttitor orci. Aliquam dapibus odio quis nisi condimentum imperdiet. Nullam at facilisis erat. Nulla facilisi. Fusce ut est quis velit eleifend ornare. Phasellus sit amet magna tortor. Curabitur a massa ut justo pretium efficitur vitae a augue. Praesent at interdum mi. Fusce ullamcorper felis augue. Sed lacinia dictum dui vel dapibus. Nulla cursus urna eget semper aliquet. Proin et lacus purus. Nunc efficitur massa efficitur augue dapibus, non cursus nisl lacinia.',
    imageUrl: 'https://www.ime.usp.br/~maratona/images/logo.png'
}

const user2 = {
    username: 'Bea Zika',
    profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRamm2Y7gFuOKj8Rd9AHmcu1Jh6hVF6XUjvgFjM9fLtg&s',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis viverra nulla. Nunc vel varius justo, sed blandit nibh. Nunc sit amet volutpat nisi. Donec eget fringilla nunc. Duis suscipit quam non odio euismod tempor. Vestibulum tempor varius pulvinar. Morbi rutrum orci a odio eleifend, et consectetur lorem bibendum. Fusce sagittis nisl non ullamcorper condimentum. Integer egestas, nulla sit amet consectetur tempor, nulla augue consequat justo, porta sollicitudin metus neque at urna. Etiam tincidunt pharetra elit, fringilla semper magna cursus quis. Donec non mi lectus. Duis in efficitur ex, non dictum leo. Fusce sollicitudin porta nisi, non vehicula sem. Aliquam molestie, ligula at tincidunt blandit, enim velit efficitur orci, ac fermentum eros odio sit amet ex. Quisque egestas lacinia lectus, eget mattis augue ultricies in. Aliquam pulvinar accumsan interdum.',
    imageUrl: 'https://www.ime.usp.br/~maratona/images/logo.png'
}

const user3 = {
    username: 'May Desafios',
    profileImage: 'https://preview.redd.it/best-boy-and-best-girl-of-season-7-my-pfp-says-it-v0-6x9yfkhtlswa1.jpg?width=640&crop=smart&auto=webp&s=14c2b3e0dcb3a36e9744a8a14793ff0a9294eacf',
    postText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis viverra nulla. Nunc vel varius justo, sed blandit nibh. Nunc sit amet volutpat nisi. Donec eget fringilla nunc. Duis suscipit quam non odio euismod tempor. Vestibulum tempor varius pulvinar. Morbi rutrum orci a odio eleifend, et consectetur lorem bibendum. Fusce sagittis nisl non ullamcorper condimentum. Integer egestas, nulla sit amet consectetur tempor, nulla augue consequat justo, porta sollicitudin metus neque at urna. Etiam tincidunt pharetra elit, fringilla semper magna cursus quis. Donec non mi lectus. Duis in efficitur ex, non dictum leo. Fusce sollicitudin porta nisi, non vehicula sem. Aliquam molestie, ligula at tincidunt blandit, enim velit efficitur orci, ac fermentum eros odio sit amet ex. Quisque egestas lacinia lectus, eget mattis augue ultricies in. Aliquam pulvinar accumsan interdum.',
    imageUrl: 'https://www.ime.usp.br/~maratona/images/logo.png'
}

export const DisplayPublication = () => {
    return(
        <div className="feed">
            <Post username={user1.username} profileImage={user1.profileImage} postText={user1.postText} imageUrl={user1.imageUrl}/>
            <Post username={user2.username} profileImage={user2.profileImage} postText={user2.postText} imageUrl={user2.imageUrl}/>
            <Post username={user3.username} profileImage={user3.profileImage} postText={user3.postText} imageUrl={user3.imageUrl}/>
        </div>
    );
};