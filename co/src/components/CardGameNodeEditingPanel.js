import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CardGameNodeEditingPanel() {
    const navigate = useNavigate();

    const {state} = useLocation();
    let nodeName = "";
    if (state != null && state.selectedNode != null) {
        nodeName = state.selectedNode;
    }
    console.log("this node is : " + nodeName); //TODO
    const returnGameMakerButtonText = ["Return To GameMaker!"];

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true });
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
