import { DisplayEvents } from "../Publication/DisplayEvents";
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayRightMenu } from "../Menus/DisplayRightMenu";
import React from 'react';

/* 
 * FUNCTION: Display events feed
 * Display publications
 */
export const DisplayUserEvents = () => {
    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <DisplayEvents />
            <DisplayRightMenu/>
        </div>  
    );
};