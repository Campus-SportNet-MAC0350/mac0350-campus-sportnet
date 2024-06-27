import { DisplayPublication } from "../Publication/DisplayPublication";
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayRightMenu } from "../Menus/DisplayRightMenu";
import React from 'react';

/* 
 * FUNCTION: Display feed body
 * Display left menu
 * Display publications feed
 * Display right menu
 */
export const DisplayBody = () => {
    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <DisplayPublication />
            <DisplayRightMenu />
        </div>  
    );
};