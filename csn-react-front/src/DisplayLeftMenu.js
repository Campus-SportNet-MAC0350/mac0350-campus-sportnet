import React from 'react';
import { Link } from 'react-router-dom';

export const DisplaySideMenu = (props) => {
    return (
        <div className="leftMenu">
            {/* Display Logo */}
            <a class="logo" href="#">
                <Link to='/home'><img class="logo" src="logo512.png" alt="logo"></img></Link>
            </a>

            <input type='search' placeholder='Pesquisar'></input>

            {/* Display Items */}
            <Link to='/home' className="menuItem"><img src="homepage.png" alt="Icone" /> Página Inicial</Link>
            <a href="index.html" className="menuItem"><img src="newpost.png" alt="Icone" /> Publicar</a>
            <a href="index.html" className="menuItem"><img src="config.png" alt="Icone" /> Opções</a>
            <a href="index.html" className="menuItem"><img src="user.png" alt="Icone" /> Perfil</a>
            <Link to='/' className="menuItem"><img src="exit.png" alt="Icone" /> Sair</Link>

            <p>© 2024 Lucas Escobar, Rodrigo Michelassi.<br/>All rights reserved.</p>
        </div>
    );
};