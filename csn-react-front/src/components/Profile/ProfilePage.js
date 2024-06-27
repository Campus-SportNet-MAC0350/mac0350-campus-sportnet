import React from 'react';
import { useParams } from 'react-router-dom';
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayProfile } from './DisplayProfile';

/* 
 * FUNCTION: Display profile page
 * Receives the ID via URL
 * This is the ID of the profile being shown
 * Display the left menu, right menu, and the profile on the center
 */
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