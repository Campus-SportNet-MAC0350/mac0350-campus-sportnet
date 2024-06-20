import React from 'react';
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayProfile } from './DisplayProfile';

export const ProfilePage = () =>  {
    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <DisplayProfile profilePic="https://noticiasdatv.uol.com.br/media/_versions/artigos_2021/instagram-zeca-pagodinho-reproducao-19-8_fixed_large.jpg" username="pabli escobas" bio="Ola meu nome é escobar e eu gosto de sorvete de morango!" followers="1450" atletica="AAAMAT" university="USP"/>
            <div className="rightMenu"></div>
        </div> 
    );
};