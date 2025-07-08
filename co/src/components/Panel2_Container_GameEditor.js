import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


//level(-1)

import GameMaker from './GameMaker'

export default function Panel2_Container_GameEditor() {
//TODO handle project-creator's authorization here?

    const navigate = useNavigate();


    const {state} = useLocation();
    let projectName = "default-no-state projectname"; //TODO testing
    let mode = "default-node-state mode";
  

    if (state !== null && state !== undefined) {
      projectName = state.selected_project_name;
      mode = state.mode;
    }

    
    console.log("container... \n mode = ", state.mode, "\n state = ", state);


return (<div style={{"backgroundColor": "orange"}}>

    <GameMaker
        projectName={state.selected_project_name}
        editorMode={state.mode}
        projectFile={state.projectFile}
    />


  
</div>);


}



// "offline_half"
// "offline_full"
// "online_cloud"