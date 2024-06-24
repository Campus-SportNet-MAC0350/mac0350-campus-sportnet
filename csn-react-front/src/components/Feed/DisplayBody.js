import { DisplayPublication } from "../Publication/DisplayPublication";
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayRightMenu } from "../Menus/DisplayRightMenu";
import React from 'react';

export const DisplayBody = () => {
    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <DisplayPublication />
            <DisplayRightMenu />
        </div>  
    );
};