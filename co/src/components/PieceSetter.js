import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';
import ResourceSelector from './ResourceSelector';

export default function PieceSetter({pieceNum, pieceData, updatePieceData}) {
    const navigate = useNavigate();

    let name = "/gamenodeconvpiecedatasec";
    const [pieceNumber, setPieceNumber] = useState(pieceNum);
    
    const [textContent, setTextContent] = useState(pieceData[pieceNum-1]["content"]); //TODO temp

    const [bgpicAdd, setBgPicAdd] = useState(false);
    const [charPicAdd, setCharPicAdd] = useState(false);
    const [speakerNameAdd, setSpeakerNameAdd] = useState(false);
    const [clickableAdd, setClickableAdd] = useState(false);
    const [bgMusicAdd, setBgMusicAdd] = useState(false);
    const [voicelineAdd, setVoicelineAdd] = useState(false);
    const [rmSelectorOpen, setRmSelectorOpen] = useState(false);
    const [isLooping, setIsLooping] = useState(true);
    const [anotherCharpic, setAnotherCharPic] = useState(false);

    const [displayClickableAdd, setDisplayClickableAdd] = useState(false);

    function changeLoopingSetting() {
        setIsLooping(!isLooping); //TODO later update to cloud db: use "!isLooping" if inside this function, not waiting for re-rendering
        console.log("looping? ", !isLooping); //TODO test
    }

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

    function changeAddAnotherCharPicOption() {
        setAnotherCharPic(!anotherCharpic);
    }


    function jumpToPrevPiece() {
        console.log("TOOD: jump to previous piece..."); //TODO testing
        if (pieceNumber > 1) {
            setPieceNumber(pieceNumber-1);
            //TODO change *all* form content here in display...
            setTextContent(pieceData[pieceNumber-2]["content"]);


        } else {
            setPieceNumber(1);
        }
    }

    function jumpToNextpiece() {
        console.log("TOOD: jump to next piece..."); //TODO testing
        if (pieceNumber < pieceData.length) {
            setPieceNumber(pieceNumber+1);
            //TODO change *all* form content here in display...
            setTextContent(pieceData[pieceNumber]["content"]);

        } else {
            setPieceNumber(pieceData.length);
        }
    }

    function updateToCaller() {
        //TODO later: conclude all the current info in this piece, update to the caller's update-function

        let newPieceData = [];

        let i = 0;
        console.log("before changing and updateing to caller..", pieceData); //TODO test
        for (; i < pieceData.length; i++) {
            if (i+1 != pieceNumber) {
                newPieceData.push(pieceData[i]);
            } else {
                const updatedObj = {"num": i+1, "content": textContent};
                newPieceData.push(updatedObj); // important: new content updated
            }
        }
        updatePieceData(newPieceData);
    }
  

    return (
      

    <div className="pieceSetterArea">
        <button onClick={jumpToPrevPiece} className="pairGroup"> ← </button>
        <button onClick={jumpToNextpiece} className="pairGroup"> → </button>


        <div className="buttonRight">
            <button onClick={collapseAllOptions}> Collapse All </button>
            <button onClick={expandAllOptions}> Expand All </button>
        </div>

        <p className="plans"> according to "pieceNumber", fetch this set of data from *local*
        <br></br>TODO: implement cloud-local data fetching/updating control
        </p>

        <br></br>
        <br></br>

            {rmSelectorOpen && 
                <ResourceSelector 
                    handleRsCancel={handleResourceSelectorCancel} 
                    handleRsSaveChanges={handleResourceSelectorSave} 
                    isDisplay={rmSelectorOpen}/>
            }
            <label>Piece: {pieceNumber}</label>
            <br></br>
            <label> Text to display: </label>
            <br></br>
            <textarea
                value={textContent}
                onChange={handleTextContentEnter}
            >
                {textContent}
            </textarea>

            <br></br>
            <br></br>
            {!speakerNameAdd && <button className="collapseToggle" onClick={toggleSpeakerNameOption}> + Speaker Name for Text Setting </button>}
            {speakerNameAdd && <button className="collapseToggle" onClick={toggleSpeakerNameOption}> - Speaker Name for Text Setting </button>}

            {speakerNameAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Speaker Name:  </label>
                    <input defaultValue=""></input>
                </div>
                
            }
            {!speakerNameAdd && <div className="textRight">------------(Collapsed)---------------</div>}
            
            {!bgpicAdd
            && <button className="collapseToggle" onClick={toggleBgPicOption}> + Background Picture Setting {bgpicAdd}</button>}
            {bgpicAdd
            && <button className="collapseToggle" onClick={toggleBgPicOption}> - Background Picture Setting {bgpicAdd}</button>}
            
            {bgpicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
                    <br></br>
                    <label>Position x:      </label>
                    <input type="number" min="0" max="9000" step="1" defaultValue="0"></input>
                    <br></br>
                    <label>Position y:      </label>
                    <input type="number" min="0" max="9000" step="1" defaultValue="0"></input>
                    <br></br>
                    <label>Width:         </label>
                    <input type="number" min="0" max="9000" step="1" defaultValue="800"></input>
                    <br></br>
                    <label>Height:        </label>
                    <input type="number" min="0" max="9000" step="1" defaultValue="450"></input>
                </div>}
            {!bgpicAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            {!charPicAdd && <button className="collapseToggle" onClick={toggleCharPicOption}> + Character Picture Setting </button>}
            {charPicAdd && <button className="collapseToggle" onClick={toggleCharPicOption}> - Character Picture Setting </button>}

            {charPicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <p className="plans"> Idea on design: keep a "table" here, for each char-pic, and provide "edit" and "delete" option for each row </p>
    <table>
    <thead>        
        <tr>
            <th>Source</th>
            <th>Position x</th>
            <th>Position y</th>
            <th>Width</th>
            <th>Height</th>
            <th>[Operation]</th>

        </tr>
    </thead>
        {}
    </table>
    <br></br>
    <button onClick={changeAddAnotherCharPicOption}>Add Another Character Picture</button>
    {anotherCharpic &&
    <>
        <br></br>
    <label>Source Link:  </label>
    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
    <br></br>
    <label>Position x:      </label>
    <input type="number" min="0" max="9000" step="1" defaultValue="0"></input>
    <br></br>
    <label>Position y:      </label>
    <input type="number" min="0" max="9000" step="1" defaultValue="0"></input>
    <br></br>
    <label>Width:         </label>
    <input type="number" min="0" max="9000" step="1" defaultValue="60"></input>
    <br></br>
    <label>Height:        </label>
    <input type="number" min="0" max="9000" step="1" defaultValue="210"></input>
    <br></br>
    <button>Confirm Add</button>        {/* //TODO later */}
    </>}

            
            
            </div>}
            {!charPicAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            {!clickableAdd && <button className="collapseToggle" onClick={toggleclickableAddOption}> + Clickable(customizable button) Setting </button>}
            {clickableAdd && <button className="collapseToggle" onClick={toggleclickableAddOption}> - Clickable(customizable button) Setting </button>}

            {clickableAdd && 
                <div>
                    <p className="plans"> (modularizable: multiple items allowed) 
                    <br></br> TODO: add data structure of clickable-setting records!
                    </p>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...");}}> reset </button>
                    
                    <br></br>
                   
                    <table>
                    <thead>
                    <tr>
                        <th>Shape/Picture Source</th>
                        <th>Sound Effect</th>
                        <th>Consequence</th>
                        <th>[Operation]</th>
    
                    </tr>
                    </thead>
                    
                    <tbody>
                        {
                        <tr className="clickableListItem3">
                            <td>[button shape/pic]</td>
                            <td>[sound effect resource url]</td>
                            <td>[consequence logic]</td>
                            <td>
                                <button className="cursor_pointer">Edit</button>
                                <button className="cursor_pointer">Remove</button>
                            </td>
                        </tr>}
                    </tbody>
                    
                    </table>
                    <br></br>
                    <button onClick={()=>{setDisplayClickableAdd(!displayClickableAdd);}}>Add Another Clickable</button>
                    <br></br>
                     {displayClickableAdd && <div>
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
                    <button>Confirm Add</button>
                    </div>
                    }
                </div>}
            {!clickableAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            {!bgMusicAdd && <button className="collapseToggle" onClick={toggleBgMusicAddOption}> + Background Music Setting </button>}
            {bgMusicAdd && <button className="collapseToggle" onClick={toggleBgMusicAddOption}> - Background Music Setting </button>}

            {bgMusicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
                    <br></br>
                    <label>Loop:  </label>
                    <input type="checkbox" checked={isLooping} onChange={changeLoopingSetting}/>
                    
                    <br></br>
                    <label>Volume:         </label>
                    <input type="number" min="0" max="200" step="1" defaultValue="100"></input>
                </div>}
            {!bgMusicAdd && <div className="textRight">------------(Collapsed)---------------</div>}
                
            {!voicelineAdd && <button className="collapseToggle" onClick={toggleVoicelineAddOption}> + Voiceline Setting </button>}
            {voicelineAdd && <button className="collapseToggle" onClick={toggleVoicelineAddOption}> - Voiceline Setting </button>}

            {voicelineAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
                    <br></br>
                    <label>Volume:         </label>
                    <input type="number" min="0" max="200" step="1" defaultValue="100"></input>
                </div>}
            {!voicelineAdd && <div className="textRight">------------(Collapsed)---------------</div>}
        
        <br></br>
        <button onClick={updateToCaller}>Save</button>

        <br></br>
        <br></br>
        <div className="buttonRight">
            <button onClick={collapseAllOptions}> Collapse All </button>
            <button onClick={expandAllOptions}> Expand All </button>
        </div>
  </div>
 
    );
}
