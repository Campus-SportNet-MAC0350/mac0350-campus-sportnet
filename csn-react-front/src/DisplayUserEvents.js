import { DisplayPublication } from "./DisplayPublication";
import { DisplaySideMenu } from "./DisplayLeftMenu";
import { DisplayRightMenu } from "./DisplayRightMenu";
import React from 'react';

export const DisplayUserEvents = () => {
    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <DisplayPublication />
            <DisplayRightMenu profileImage="https://i.pinimg.com/736x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg" username="username"/>
        </div>  
    );
};