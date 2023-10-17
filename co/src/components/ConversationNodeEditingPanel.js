import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './webpage.css';


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

    function switchBgPicOption() {
        setBgPicAdd(!bgpicAdd);
    }

    function switchCharPicOption() {
        setCharPicAdd(!charPicAdd);
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


            <button onClick={switchBgPicOption}>Add Background Picture</button>
            {bgpicAdd && <div>TODO: bg pic setting area</div>}
            <br></br>
            <button onClick={switchCharPicOption}>Add Character Picture</button>
            {charPicAdd && <div>TODO: character pic setting area</div>}

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
                After fetching the data above, previewer should reflect the adjustment and present this piece
                <br></br> also, save and update to db if requested by user.
            </p>

        </div>
    );
}
