import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';
import { serverTimestamp } from 'firebase/firestore';
import GameNodeConvPieceEditing from './GameNodeConvPieceEditing';
import ResourceManagingModal from './ResourceManagingModal';

export default function ConversationNodeEditingPanel() {

 
    const navigate = useNavigate();

    const {state} = useLocation();
    let nodeName = "";
    if (state != null && state.selectedNode != null) {
        nodeName = state.selectedNode;
    }
    console.log("this node is : [" + nodeName + "] in conversation-node editing page."); //TODO

    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
   
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
            <div className="returning_buttons"><button className="button" onClick={goToGameMaker}> Return To GameMaker! </button></div>
            
            {isDisplayRmBool && <ResourceManagingModal isDisplay = {isDisplayRmBool} handleRmCancel={handleResourceManagerCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>}
            <button onClick={() => {setDisplayRmModal(!isDisplayRmBool)}}> Show Resource Manager </button>

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

            <GameNodeConvPieceEditing/>
           

            <p className="plans">
                required input data: "Edit on Piece"

                <br></br> - [optional] background picture [0..1]: source link, position, width, height
                <br></br> - [optional] character picture [0..n]: source link, position, width, height

                <br></br> - text content (on UI) [0..1]: content
                <br></br> - [optional] test speaker name [0..1]: content

                <br></br> - [optional] button/clickable item [0..n]: shape/pic_source, sound effect, pressed_consequence on game data

                <br></br> - [optional] background music [0..1]: source link, loop or not, volume
                <br></br> - [optional] voiceline [0..1]: source link, volume

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

        </div>
    );
}
