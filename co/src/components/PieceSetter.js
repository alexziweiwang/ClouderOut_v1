import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';
import ResourceSelector from './ResourceSelector';

export default function PieceSetter() {
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
    const [rmSelectorOpen, setRmSelectorOpen] = useState(false);

    function handleResourceSelectorCancel() {
        setRmSelectorOpen(false);
    }

    function handleResourceSelectorSave() {
        console.log("saving for handleResourceSelectorSave ... "); //TODO
    }

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
      

    <div className="userChoice">
        <div className="buttonRight">
            <button onClick={collapseAllOptions}> Collapse All </button>
            <button onClick={expandAllOptions}> Expand All </button>
        </div>

        <br></br>
        <br></br>

            {rmSelectorOpen && 
                <ResourceSelector 
                    handleRsCancel={handleResourceSelectorCancel} 
                    handleRsSaveChanges={handleResourceSelectorSave} 
                    isDisplay={rmSelectorOpen}/>
            }
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
            {!speakerNameAdd && <div className="textRight">------------(Collapsed)---------------</div>}
            
            <button className="collapseToggle" onClick={toggleBgPicOption}> + Background Picture Setting {bgpicAdd}</button>
            {bgpicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
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
            {!bgpicAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            <button className="collapseToggle" onClick={toggleCharPicOption}> + Character Picture Setting </button>
            {charPicAdd && 
                <div>
                    <p className="plans"> (modularizable: multiple items allowed) </p>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
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
            {!charPicAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            <button className="collapseToggle" onClick={toggleclickableAddOption}> + Clickable(customizable button) Setting </button>
            {clickableAdd && 
                <div>
                    <p className="plans"> (modularizable: multiple items allowed) </p>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Shape/Picture Source:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
                    <br></br>
                    <label>Sound Effect:      </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
                    <br></br>
                    <label>Consequence:         </label>
                    <p className="plans"> Consequence: (logic organizer-related) 
                    <br></br> - option1: assign a value to variable in game-data
                    <br></br> - option2: increase/decrease some value of variable in game-data
                    <br></br> - (can contain multiple consequences)
                    </p>

                </div>}
            {!clickableAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            <button className="collapseToggle" onClick={toggleBgMusicAddOption}> + Background Music Setting </button>
            {bgMusicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
                    <br></br>
                    <label>Is looping:      </label>
                    <select>
                        <option value="t" key="t">True</option>
                        <option value="f" key="f">False</option>


                    </select>
                    <br></br>
                    <label>Volume:         </label>
                    <input defaultValue="..."></input>
                </div>}
            {!bgMusicAdd && <div className="textRight">------------(Collapsed)---------------</div>}
                
            <button className="collapseToggle" onClick={toggleVoicelineAddOption}> + Voiceline Setting </button>
            {voicelineAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
                    <br></br>
                    <label>Volume:         </label>
                    <input defaultValue="..."></input>
                </div>}
            {!voicelineAdd && <div className="textRight">------------(Collapsed)---------------</div>}
  
        <br></br>
        <br></br>
        <div className="buttonRight">
            <button onClick={collapseAllOptions}> Collapse All </button>
            <button onClick={expandAllOptions}> Expand All </button>
        </div>
  </div>
 
    );
}
