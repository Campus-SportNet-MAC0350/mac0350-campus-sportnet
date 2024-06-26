import React from 'react';
import { useParams } from 'react-router-dom';
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayProfile } from './DisplayProfile';

export const ProfilePage = () =>  {
    const { id } = useParams();

    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <DisplayProfile userId={id} />
            <div className="rightMenu"></div>
        </div> 
    );
};