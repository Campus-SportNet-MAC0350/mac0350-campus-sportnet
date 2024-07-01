import { LoadFollowing } from "./LoadFollowing";
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayRightMenu } from "../Menus/DisplayRightMenu";
import React from 'react';

/* 
 * FUNCTION: Display following list
 * Display left and right menu
 * And load following list
 */
export const DisplayFollowing = () => {
    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <LoadFollowing />
            <DisplayRightMenu/>
        </div>  
    );
};