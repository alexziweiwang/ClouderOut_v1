import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_GameDataManager from './Modal_GameDataManager';
import GameMaker from './GameMaker'

export default function Container_GameEditor_Outer() {

    const navigate = useNavigate();


    const {state} = useLocation();
    let projectName = "default-no-state projectname"; //TODO testing
    let username = "default-no-state username";
  
    if (state !== null) {
      projectName = state.selected_project_name;
      username = state.username;
    }


//TODO borderline between values and functions


return (<div>

    <GameMaker/>


  
</div>);


}