import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';


//level(-1)

import GameMaker from './GameMaker'

export default function Panel2_Container_GameEditor() {
//TODO handle project-creator's authorization here?

    const navigate = useNavigate();


    const {state} = useLocation();
    let projectName = "default-no-state projectname"; //TODO testing
    let mode = "default-node-state mode";
    let projectContentProvided = "default-node-state provided-project-content";
  

    if (state !== null && state !== undefined) {
      projectName = state.selected_project_name;
      mode = state.mode;
      projectContentProvided = state.providedImptProj;                                                         //   projectContentProvided = state.
                              console.log("container... \n mode = ", state.mode, "\n state = ", state);

    }

    function goToNotLoggedInPage() {
        navigate('/notloggedin', { replace: true });
    }


    


    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (state === null && state.mode === "online_cloud") {
                                    console.log("!!! not logged in - going to -login_page......");
            goToNotLoggedInPage();
        }

        if (authEmailName !== "_" && firstTimeEnter === true) {


                                //TODO
                                // if : condition of init-status of var...
                                // setFirstTimeEnter(false);
        }


        if (authEmailName === "_" && state.mode === "online_cloud") { // get login info
            getAuthFirebase(
                {
                  goToNotLoggedInPageFunc: goToNotLoggedInPage,
                  sendOutEmailName: setAuthEmailName
                }
            );
        }

        console.log("\n\n\n\n\n\npanel2 state = ", state);

    });


return (<div style={{"backgroundColor": "#b5b2b0"}}>
    {(
    (authEmailName !== "_" && state.mode === "online_cloud") 
    || (state.mode !== "online_cloud")
    )
    && 
    <>
    <GameMaker
        projectName={state.selected_project_name}
        editorMode={state.mode}
        projectFile={state.projectContentProvided}
    />


    </>}
</div>);


}



// "offline_half"
// "offline_full"
// "online_cloud"