export const DisplaySideMenu = (props) => {
    return (
        <div className="leftMenu">
            {/* Display Logo */}
            <a class="logo" href="/index.html">
                <img src="logo512.png" alt="logo"></img>
            </a>

            <input type='search' placeholder='Pesquisar'></input>

            {/* Display Items */}
            <a href="index.html" className="menuItem"><img src="homepage.png" alt="Icone" /> Página Inicial</a>
            <a href="index.html" className="menuItem"><img src="newpost.png" alt="Icone" /> Publicar</a>
            <a href="index.html" className="menuItem"><img src="config.png" alt="Icone" /> Opções</a>
            <a href="index.html" className="menuItem"><img src="user.png" alt="Icone" /> Perfil</a>
            <a href="index.html" className="menuItem"><img src="exit.png" alt="Icone" /> Sair</a>

            <p>© 2024 Lucas Escobar, Rodrigo Michelassi.<br/>All rights reserved.</p>
        </div>
    );
};