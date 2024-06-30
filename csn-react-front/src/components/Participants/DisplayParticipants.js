import { ParticipantsList } from "../Participants/ParticipantsList";
import { DisplaySideMenu } from "../Menus/DisplayLeftMenu";
import { DisplayRightMenu } from "../Menus/DisplayRightMenu";
import React from 'react';
import { useParams } from "react-router-dom";

/* 
 * FUNCTION: Display Participants from an event
 * Display left menu
 * Display list of participants that have confirmed presence
 * Display right menu
 */
export const DisplayParticipants = () => {
    const { id } = useParams();

    return(
        <div className="publication-body">
            <DisplaySideMenu />
            <ParticipantsList eventId={id} />
            <DisplayRightMenu />
        </div>  
    );
};