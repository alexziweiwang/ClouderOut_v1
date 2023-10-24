import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';
import { serverTimestamp } from 'firebase/firestore';
import GameNodeConvPieceEditing from './GameNodeConvPieceEditing';
import ResourceManagingModalWindow from './ResourceManagingModalWindow';
import PreviewWindow from './PreviewWindow';
import PieceManager from './PieceManager';

export default function ConversationNodeEditingPanel() {

 
    const navigate = useNavigate();

    const {state} = useLocation();
    let nodeName = "";
    if (state != null && state.selectedNode != null) {
        nodeName = state.selectedNode;
    }
    console.log("this node is : [" + nodeName + "] in conversation-node editing page."); //TODO

    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [browseList, setBrowseList] = useState(true);

    const returnGameMakerButtonText = ["Return To GameMaker!"];
    const showResourceManagerButtonText = ["Resource Manager"]; 


    function handleResourceManagerCancel() {
        setDisplayRmModal(false);
      }
    
    function handleResourceManagerSaveChanges() {
        console.log("modal save changes!");
        //TODO update to cloud db
        setDisplayRmModal(false);
    
    }

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true });
    }

    return (

        <div>
            <div className="returning_buttons"><button className="button" onClick={goToGameMaker}> {returnGameMakerButtonText[0]} </button></div>
            
            {isDisplayRmBool && <ResourceManagingModalWindow isDisplay = {isDisplayRmBool} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>}
            <button onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> {showResourceManagerButtonText[0]} </button>

            <p className="plans">This is conversation-node editing panel
            <br></br> users can do tutorials, or "conversational-like" displaying (As so far planned)
            </p>

            <p className="plans">
                TODO: Add a list for scrolling/switching between slides/pieces for this node
                <br></br> - TODO: add testing data
                <br></br> - when entering this node-editing page, pull once from cloud db for list of pieces/slides
                <br></br> - each list item is clickable, and then the editing options provided to the user
                <br></br>
                <br></br> - "Save" button *after* all editing finished (to update to cloud-db)
            </p>



            <p className="plans">
                TODO: think about "switching"/"moving rows" feature 
            </p>

            <p className="plans">
                *** db updating consideration: only call db-updating when user press "save" button to update the project data.
                <br></br> for list of pieces in conversation-game-node, when entering this editing-panel, pull once from db, then save and present whatever changed locally
                <br></br> then ask the user to save the changes when exiting or only save when requested.
            </p>

            <p className="plans">
                After fetching the data above, previewer should reflect the adjustment and present this piece
                <br></br> also, save and update to db if requested by user.
            </p>

            <p className="plans"> *** place of "GameNodeConvPieceEditing"? <br></br> either editing for a sinlgle piece + left/right button, or a list of all pieces: switch? </p>
            <button onClick={()=>{setBrowseList(!browseList)}}>List/Editing</button>
            <div className="parallelFrame">
            {browseList == false && <GameNodeConvPieceEditing/>}
            {browseList == true && <PieceManager/>}

            <PreviewWindow/>
            </div>
        
        </div>
    );
}
