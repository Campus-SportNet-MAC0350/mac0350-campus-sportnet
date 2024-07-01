import { LoadFollowers } from "./LoadFollowers";
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayRightMenu } from "../Menus/DisplayRightMenu";
import React from 'react';

/* 
 * FUNCTION: Display followers list
 * Display left and right menu
 * And load followers list
 */
export const DisplayFollowers = () => {
    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <LoadFollowers />
            <DisplayRightMenu/>
        </div>  
    );
};