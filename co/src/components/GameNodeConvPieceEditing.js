import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';

export default function GameNodeConvPieceEditing() {
    const navigate = useNavigate();

    console.log("re-rendering: game node conv section ... @piece editing");

    let name = "/gamenodeconvpiecedatasec";
    const [textContent, setTextContent] = useState("");
    const [bgpicAdd, setBgPicAdd] = useState(false);
    const [charPicAdd, setCharPicAdd] = useState(false);
    const [speakerNameAdd, setSpeakerNameAdd] = useState(false);
    const [clickableAdd, setClickableAdd] = useState(false);
    const [bgMusicAdd, setBgMusicAdd] = useState(false);
    const [voicelineAdd, setVoicelineAdd] = useState(false);


    function handleTextContentEnter(event) {
        console.log("In textarea: " + event.target.value); //TODO
        setTextContent(event.target.value);
      
      }

    function toggleBgPicOption() {
        setBgPicAdd(!bgpicAdd);
    }

    function toggleCharPicOption() {
        setCharPicAdd(!charPicAdd);
    }

    function toggleSpeakerNameOption() {
        setSpeakerNameAdd(!speakerNameAdd);
    }

    function toggleclickableAddOption() {
        setClickableAdd(!clickableAdd);
    }

    function toggleBgMusicAddOption() {
        setBgMusicAdd(!bgMusicAdd);
    }

    function toggleVoicelineAddOption() {
        setVoicelineAdd(!voicelineAdd);
    }

    function collapseAllOptions() {
        setBgPicAdd(false);
        setCharPicAdd(false);
        setSpeakerNameAdd(false);
        setClickableAdd(false);
        setBgMusicAdd(false);
        setVoicelineAdd(false);
    }

    function expandAllOptions() {
        setBgPicAdd(true);
        setCharPicAdd(true);
        setSpeakerNameAdd(true);
        setClickableAdd(true);
        setBgMusicAdd(true);
        setVoicelineAdd(true);
    }

  

    return (
        <div>
  <button onClick={expandAllOptions}> Expand All </button>
  <button onClick={collapseAllOptions}> Collapse All </button>

    <div className="userChoice">
            <label> Text to display: </label>
            <br></br>
            <textarea
                value={textContent}
                onChange={handleTextContentEnter}
            />

            <br></br>
            <br></br>
            <button className="collapseToggle" onClick={toggleSpeakerNameOption}> + Speaker Name for Text Setting </button>

            {speakerNameAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Speaker Name:  </label>
                    <input defaultValue="..."></input>
                </div>
                
            }
            {!speakerNameAdd && <div className="textRight">-------------------(None)--------</div>}
            
            <button className="collapseToggle" onClick={toggleBgPicOption}> + Background Picture Setting {bgpicAdd}</button>
            {bgpicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Position:      </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Width:         </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Height:        </label>
                    <input defaultValue="..."></input>
                </div>}
            {!bgpicAdd && <div className="textRight">-------------------(None)--------</div>}

            <button className="collapseToggle" onClick={toggleCharPicOption}> + Character Picture Setting </button>
            {charPicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Position:      </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Width:         </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Height:        </label>
                    <input defaultValue="..."></input>
                </div>}
            {!charPicAdd && <div className="textRight">-------------------(None)--------</div>}

            <button className="collapseToggle" onClick={toggleclickableAddOption}> + Clickable(customizable button) Setting </button>
            {clickableAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Shape/Picture Source:  </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Sound Effect:      </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Consequence:         </label>
                    <input defaultValue="..."></input>
                </div>}
            {!clickableAdd && <div className="textRight">-------------------(None)--------</div>}

            <button className="collapseToggle" onClick={toggleBgMusicAddOption}> + Background Music Setting </button>
            {bgMusicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Is looping:      </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Volume:         </label>
                    <input defaultValue="..."></input>
                </div>}
            {!bgMusicAdd && <div className="textRight">-------------------(None)--------</div>}
                
            <button className="collapseToggle" onClick={toggleVoicelineAddOption}> + Voiceline Setting </button>
            {voicelineAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <input defaultValue="..."></input>
                    <br></br>
                    <label>Volume:         </label>
                    <input defaultValue="..."></input>
                </div>}
            {!voicelineAdd && <div className="textRight">-------------------(None)--------</div>}


  </div>
  <button onClick={expandAllOptions}> Expand All </button>
  <button onClick={collapseAllOptions}> Collapse All </button>

 </div>
    );
}
