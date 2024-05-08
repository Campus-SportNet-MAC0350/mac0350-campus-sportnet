import React from 'react';
import { Link } from 'react-router-dom';

export const DisplaySideMenu = (props) => {
    return (
        <div className="leftMenu">
            {/* Display Logo */}

            <Link to='/home' className="logo"><img className="logo" src="logo512.png" alt="logo"></img></Link>


            <input type='search' placeholder='Pesquisar'></input>

            {/* Display Items */}
            <Link to='/home' className="menuItem"><img src="homepage.png" alt="Icone" /> Página Inicial</Link>
            <Link to='/post' className="menuItem"><img src="newpost.png" alt="Icone" /> Publicar</Link>
            <Link to='/home' className="menuItem"><img src="config.png" alt="Icone" /> Opções</Link>
            <Link to='/profile' className="menuItem"><img src="user.png" alt="Icone" /> Perfil</Link>
            <Link to='/' className="menuItem"><img src="exit.png" alt="Icone" /> Sair</Link>

            <p>© 2024 Lucas Escobar, Rodrigo Michelassi.<br/>All rights reserved.</p>
        </div>
    );
};