import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData } from '../Profile/DisplayProfile';
import { getToken } from '../App/useToken';

export const DisplaySideMenu = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const id = getToken();

    // load user data
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserData();
            if (!userData) {
                console.error("[ERROR]: User not identified");
                navigate("/");
            }
            else {
                setUser(userData);
            }
        };
        fetchUser();
    }, [navigate]);

    return (
        <div className="leftMenu">
            {/* Display Logo */}

            <Link to='/home' className="logo"><img className="logo" src="/logo512.png" alt="logo"></img></Link>

            {/* Display Items */}
            <Link to='/home' className="menuItem"><img src="/homepage.png" alt="Icone" /> Página Inicial</Link>
            <Link to='/search' className="menuItem"><img src="/search-icon.png" alt="Icone" /> Pesquisar</Link>
            <Link to='/events' className="menuItem"><img src="/checklist.png" alt="Icone" /> Meus Eventos</Link>
            <Link to='/post' className="menuItem"><img src="/newpost.png" alt="Icone" /> Publicar</Link>
            {user && user.userType === 'a' && (
                <Link to='/postevent' className="menuItem"><img src="/publish-event.png" alt="Icone" /> Novo Evento</Link>
            )}
            <Link to='/home' className="menuItem"><img src="/config.png" alt="Icone" /> Opções</Link>
            <Link to={`/profile/${id}`} className="menuItem"><img src="/user.png" alt="Icone" /> Perfil</Link>
            <Link to='/' className="menuItem"><img src="/exit.png" alt="Icone" /> Sair</Link>

            <p>© 2024 Lucas Escobar, Rodrigo Michelassi.<br/>All rights reserved.</p>
        </div>
    );
};