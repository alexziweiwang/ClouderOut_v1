import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';
import { serverTimestamp } from 'firebase/firestore';


export default function ConversationNodeEditingPanel() {

 
    const navigate = useNavigate();

    const {state} = useLocation();
    let nodeName = "";
    if (state != null && state.selectedNode != null) {
        nodeName = state.selectedNode;
    }
    console.log("this node is : " + nodeName); //TODO

    const [bgpicAdd, setBgPicAdd] = useState(false);
    const [charPicAdd, setCharPicAdd] = useState(false);
    const [speakerNameAdd, setSpeakerNameAdd] = useState(false);
    const [buttonAdd, setButtonAdd] = useState(false);
    const [bgMusicAdd, setBgMusicAdd] = useState(false);
    const [voicelineAdd, setVoicelineAdd] = useState(false);

    function toggleBgPicOption() {
        setBgPicAdd(!bgpicAdd);
    }

    function toggleCharPicOption() {
        setCharPicAdd(!charPicAdd);
    }

    function toggleSpeakerNameOption() {
        setSpeakerNameAdd(!speakerNameAdd);
    }

    function toggleButtonAddOption() {
        setButtonAdd(!buttonAdd);
    }

    function toggleBgMusicAddOption() {
        setBgMusicAdd(!bgMusicAdd);
    }

    function toggleVoicelineAddOption() {
        setVoicelineAdd(!voicelineAdd);
    }

    function goToGameMaker() {
        navigate('/gamemaker', { replace: true });
    }

    return (

        <div>
            <div className="returning_buttons"><button className="button" onClick={goToGameMaker}> Return To GameMaker! </button></div>
            
            
            <p className="plans">This is conversation-node editing panel
            <br></br> users can do tutorials, or "conversational-like" displaying (As so far planned)
            </p>

            <p className="plans">
                TODO: Add table-like or other solutions for scrolling/switching between slides/pieces for this node
                <br></br>add "clickable table-like browsing list, and the chosen row get editable"
                <br></br>"Save" button *after* editing finished
            </p>

            <p className="plans">
                TODO: think about "switching"/"moving rows" feature 
            </p>

            <br></br>  
            <br></br>
            <br></br>


            <button onClick={toggleBgPicOption}>Add Background Picture</button>
            {bgpicAdd && <div>TODO: bg pic setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleCharPicOption}>Add Character Picture</button>
            {charPicAdd && <div>TODO: character pic setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleSpeakerNameOption}>Add Speaker Name for Text</button>
            {speakerNameAdd && <div> TODO: speaker name setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleButtonAddOption}>Add Button</button>
            {buttonAdd && <div>TODO: button/clickable-option setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleBgMusicAddOption}>Add bgm</button>
            {bgMusicAdd && <div>TODO: bgm setting area</div>}
            <br></br>
            <br></br>
            <button onClick={toggleVoicelineAddOption}>Add voiceline</button>
            {voicelineAdd && <div>TODO: voiceline setting area</div>}


            <p className="plans">
                required input data: "Edit on Piece"

                <br></br> - [optional] background picture [0..1]: source link, position, width, height
                <br></br> - [optional] character picture [0..n]: source link, position, width, height

                <br></br> - text content (on UI) [0..1]: content
                <br></br> - [optional] test speaker name [0..1]: content

                <br></br> - [optional] button/clickable item [0..n]: shape/pic_source, sound effect, pressed_consequence on game data

                <br></br> - [optional] background music [0..1]: source link, loop or not, volumne
                <br></br> - [optional] voiceline [0..1]: source link, volumne

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
