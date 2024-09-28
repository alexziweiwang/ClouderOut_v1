import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CardGameNodeEditingPanel() {
    const navigate = useNavigate();

    const {state} = useLocation();
    let nodeName = "";
    let uname = "default-no-state username";
    let projectName = "default-no-state projectName";
    if (state != null) {
        nodeName = state.selectedNode;
        uname = state.userName;
        projectName = state.selected_project_name;
    } 
    console.log("CardGameNodeEditingPanel-state: ", state);//TODO test

    const returnGameMakerButtonText = [" ← Game Maker"];

    function goToGameMaker() {
        const username = uname;
        const selected_project_name = projectName;
        navigate('/gamemaker', { replace: true, state: { selected_project_name, username } });
    //TODO9 gamemaker refactor
    
    }

    return (

        <div>
            <div className="returning_buttons"><button className="button" onClick={goToGameMaker}> {returnGameMakerButtonText[0]} </button></div>
            
            <p className="plans">This is card game editing panel
            <br></br> users can create one level of card game here
            </p>


        </div>
    );
}
