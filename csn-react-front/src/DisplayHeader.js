import React from 'react';
import logo from './images/logo512.png';

export const DisplayHeader = () => {
  return (
    <div class="header">
        <div class="header-left">
            <a class="logo" href="/index.html">
                <img src={logo} alt="logo"></img>
            </a>
        </div>
        <div class="header-center">
            <input type='search' placeholder='Pesquisar'></input>
        </div>
        <div class="header-right">
            {/* podemos fazer esses itens do menu em um component */}
            <a class="active" href="/index.html">Página Inicial</a>
            <a href="/index.html">Opções</a>
            <a href="/index.html">Perfil</a>
            <a href="/index.html">Sair</a>
        </div>
    </div>
  );
};