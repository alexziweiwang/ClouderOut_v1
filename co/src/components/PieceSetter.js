import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';
import ResourceSelector from './ResourceSelector';

export default function PieceSetter({pieceNum, allPieceData, updatePieceData, getAllPieceData}) {
    const navigate = useNavigate();

    let name = "/gamenodeconvpiecedatasec";
    const [pieceNumber, setPieceNumber] = useState(pieceNum);

    const [pieceDataLocal, setPieceDataLocal] = useState(allPieceData);

    const [bgpicAdd, setBgPicAdd] = useState(true);
    const [charPicAdd, setCharPicAdd] = useState(true);
    const [speakerNameAdd, setSpeakerNameAdd] = useState(true);
    const [clickableAdd, setClickableAdd] = useState(true);
    const [bgMusicAdd, setBgMusicAdd] = useState(true);
    const [voicelineAdd, setVoicelineAdd] = useState(true);
    const [rmSelectorOpen, setRmSelectorOpen] = useState(false);
    const [isLooping, setIsLooping] = useState(true);
    const [anotherCharpic, setAnotherCharPic] = useState(false);

    const [charPicDataPart, setCharPicDataPart] = useState([]);
    const [charPicDataPosX, setCharPicDataPosX] = useState(0);
    const [charPicDataPosY, setCharPicDataPosY] = useState(0);
    const [charPicDataWidth, setCharPicDataWidth] = useState(60);
    const [charPicDataHeight, setCharPicDataHeight] = useState(210);

    const [displayClickableAdd, setDisplayClickableAdd] = useState(false);
    const [clickableDataPart, setClickableDataPart] = useState([]);
    const [clickableSource, setClickableSource] = useState("default source"); //TODO test
    const [clickableSound, setClickableSound] = useState("default sound"); //TODO test
    const [clickableConsequenceArray, setClickableConsequenceArray] = useState(["consq1", "consq"]);
    const [isClickableAddNewConsq, setIsClickableAddNEwConsq] = useState(false);
    const [currentPieceDetail, setCurrentPieceDetail] = useState(
        {"num": pieceNum, 
        "content": allPieceData[pieceNum-1]["content"], 
        "speaker_name": allPieceData[pieceNum-1]["speaker_name"], 
        "bgp_source_link": allPieceData[pieceNum-1]["bgp_source_link"], 
        "bgp_pos_x": allPieceData[pieceNum-1]["bgp_pos_x"], 
        "bgp_pos_y": allPieceData[pieceNum-1]["bgp_pos_y"], 
        "bgp_width": allPieceData[pieceNum-1]["bgp_width"], 
        "bgp_height": allPieceData[pieceNum-1]["bgp_height"], 
        "chp_arr": allPieceData[pieceNum-1]["chp_arr"], 
        "btn_arr": allPieceData[pieceNum-1]["btn_arr"], 
        "bgm_source_link": allPieceData[pieceNum-1]["bgm_source_link"], 
        "bgm_loop": allPieceData[pieceNum-1]["bgm_loop"], 
        "bgm_volume": allPieceData[pieceNum-1]["bgm_volume"], 
        "vl_source_link": allPieceData[pieceNum-1]["vl_source_link"], 
        "vl_volume": allPieceData[pieceNum-1]["vl_volume"]}
    );

    useEffect(() => {
        const allPiece = getAllPieceData();
        setPieceDataLocal(allPiece);       
    });


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
        setCurrentPieceDetail({...currentPieceDetail,  "content": event.target.value});
    }

    function handleSpeakerNameEnter(event) {
        setCurrentPieceDetail({...currentPieceDetail,  "speaker_name": event.target.value});
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

            //TODO: fetch "pieceNumber-2"'s data            
            //TODO temp
            setCurrentPieceDetail(pieceDataLocal[pieceNumber-2]);

        } else {
            setPieceNumber(1);
        }
    }

    function jumpToNextpiece() {
        console.log("TOOD: jump to next piece..."); //TODO testing
        if (pieceNumber < pieceDataLocal.length) {
            setPieceNumber(pieceNumber+1);
            //TODO change *all* form content here in display...
            
            setCurrentPieceDetail(pieceDataLocal[pieceNumber]);


        } else {
            setPieceNumber(pieceDataLocal.length);
        }
    }

    function updateToCaller() {
        //TODO later: conclude all the current info in this piece, update to the caller's update-function

        let newPieceData = [];

        let i = 0;
        console.log("before changing and updateing to caller..", pieceDataLocal); //TODO test
        for (; i < pieceDataLocal.length; i++) {
            if (i+1 !== pieceNumber) {
                newPieceData.push(pieceDataLocal[i]);
            } else {
                
                console.log("Saving...", currentPieceDetail); //TODO test
                newPieceData.push(currentPieceDetail); // important: new content updated
            }
        }
        updatePieceData(newPieceData);
    }

    function removeRowInCharPicTable(index) {
        let tempCharPicDataPart = charPicDataPart.filter((item) => (item != charPicDataPart[index]));
        setCharPicDataPart(tempCharPicDataPart);
    }

    function onChangeCharPicDataPosX(event) {
        setCharPicDataPosX(event.target.value);
    }

    function onChangeCharPicDataPosY(event) {
        setCharPicDataPosY(event.target.value);
    }

    function onChangeCharPicDataW(event) {
        setCharPicDataWidth(event.target.value);
    }

    function onChangeCharPicDataH(event) {
        setCharPicDataHeight(event.target.value);
    }
  

    return (
      

    <div className="pieceSetterArea">
        <button onClick={jumpToPrevPiece} className="pairGroup"> ← </button>
        <button onClick={jumpToNextpiece} className="pairGroup"> → </button>


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
            <label>Piece: {pieceNumber}</label>
            <br></br>
            <label> Text to display: </label>
            <br></br>
            <textarea
                value={currentPieceDetail["content"]}
                onChange={handleTextContentEnter}
            >
                {currentPieceDetail["content"]}
            </textarea>

            <br></br>
            <br></br>
            {!speakerNameAdd && <button className="collapseToggle" onClick={toggleSpeakerNameOption}> + Speaker Name for Text Setting </button>}
            {speakerNameAdd && <button className="collapseToggle" onClick={toggleSpeakerNameOption}> - Speaker Name for Text Setting </button>}

            {speakerNameAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "speaker_name": ""});}}> reset </button>
                    <br></br>
                    <label>Speaker Name:  </label>

                    <input value={currentPieceDetail["speaker_name"]} onChange={handleSpeakerNameEnter}></input>
                </div>
                
            }
            {!speakerNameAdd && <div className="textRight">------------(Collapsed)---------------</div>}
            
            {!bgpicAdd
            && <button className="collapseToggle" onClick={toggleBgPicOption}> + Background Picture Setting {bgpicAdd}</button>}
            {bgpicAdd
            && <button className="collapseToggle" onClick={toggleBgPicOption}> - Background Picture Setting {bgpicAdd}</button>}
            
            {bgpicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "bgp_source_link": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_pos_x": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_pos_y": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_width": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_height": ""});}}> reset </button>
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
    <tbody>
        {charPicDataPart.map((item, index) => {
            
            return (
                <tr key={index}>
                    {charPicDataPart.length > 0 && <td>(source link)</td>}
                    <td>{item["posX"]}</td>
                    <td>{item["posY"]}</td>
                    <td>{item["w"]}</td>
                    <td>{item["h"]}</td>
                    {charPicDataPart.length > 0 && <td>
                        <button onClick={()=>{removeRowInCharPicTable(index);}}>Remove</button>
                    </td>}

                </tr>
            );
        })}
    </tbody>

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
    <input type="number" min="0" max="9000" step="1" defaultValue="0" value={charPicDataPosX} onChange={onChangeCharPicDataPosX}></input>
    <br></br>
    <label>Position y:      </label>
    <input type="number" min="0" max="9000" step="1" defaultValue="0" value={charPicDataPosY} onChange={onChangeCharPicDataPosY}></input>
    <br></br>
    <label>Width:         </label>
    <input type="number" min="0" max="9000" step="1" defaultValue="60" value={charPicDataWidth} onChange={onChangeCharPicDataW}></input>
    <br></br>
    <label>Height:        </label>
    <input type="number" min="0" max="9000" step="1" defaultValue="210" value={charPicDataHeight} onChange={onChangeCharPicDataH}></input>
    <br></br>
    <button onClick={()=>{
        let newcharPicData = charPicDataPart;
        const newRow = {posX: charPicDataPosX, posY: charPicDataPosY, w: charPicDataWidth, h: charPicDataHeight}; //TODO fill in data from fields    
        newcharPicData.push(newRow);
        changeAddAnotherCharPicOption();
        setCharPicDataPart(newcharPicData);
        /* update to cloud db for this field: character-pic */
        let tempArr = currentPieceDetail["chp_arr"];
        tempArr.push(newcharPicData);
        setCurrentPieceDetail({...currentPieceDetail,  "chp_arr": tempArr});
        setCharPicDataPosX(0);
        setCharPicDataPosY(0);
        setCharPicDataWidth(60);
        setCharPicDataHeight(210);
    }}>
        Confirm Add
    </button>        {/* //TODO later */}
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
                        {clickableDataPart.map((item, index) => {

                            
                            return (
                                <tr className="clickableListItem3">
                                <td>{item["shape"]}</td>
                                <td>{item["sound"]}</td>
                                <td>
                                    {<>
                                        {item["consequence"].map((row, rowIndex)=>{
                                            return(<>{row[rowIndex]}</>);
                                        })}
                                    </>}
                                </td>
                                <td>
                                    <button className="cursor_pointer" onClick={()=>{console.log("remove a clickable-item")}}>Remove</button>
                                </td>
                            </tr>
                            
                                );
                        })}
                        
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
                    <button onClick={()=>{setIsClickableAddNEwConsq(!isClickableAddNewConsq);}}>Add a new consequence</button>
                    {isClickableAddNewConsq && <><br></br>
                    new row info
                    <br></br>
                    <button>Add</button>
                    </>}
                    <table>
                        <thead></thead>
                            <tr>
                                <th>Object</th>
                                <th>Action</th>
                                <th>Amount</th>
                                <th>[Operation]</th>
                            </tr>
                        <tbody>
                            {<tr>
                                <td>(obj1)</td>
                                <td>(action1)</td>
                                <td>(amount1)</td>
                                <td>
                                    <button>x</button>

                                </td>
                            </tr>}
                        </tbody>
                    </table>
                    <p className="plans"> Consequence: (logic organizer-related) 
                    <br></br> - option1: assign a value to variable in game-data
                    <br></br> - option2: increase/decrease some value of variable in game-data
                    <br></br> - (can contain multiple consequences)
                    <br></br> TODO: add table for this feature (with operation options)
                    <br></br> TODO: load game-data items for selection
                    <br></br> TODO: keep the *action* of updating game-data!! (not immediately, but when action triggered)
                   
                    <br></br>
                    <select></select>


                    </p>
                    <button  onClick={()=>{
                        let newlickableData = clickableDataPart;
                        const newRow = ""; //TODO fill in data from fields
                        newlickableData.push(newRow);
                        setClickableDataPart(newlickableData);
                    }}>
                        Confirm Add</button>
                    </div>
                    }
                </div>}
            {!clickableAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            {!bgMusicAdd && <button className="collapseToggle" onClick={toggleBgMusicAddOption}> + Background Music Setting </button>}
            {bgMusicAdd && <button className="collapseToggle" onClick={toggleBgMusicAddOption}> - Background Music Setting </button>}

            {bgMusicAdd && 
                <div>
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "bgm_loop": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgm_volume": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgm_source_link": ""});}}> reset </button>
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
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "vl_source_link": ""});setCurrentPieceDetail({...currentPieceDetail,  "vl_volume": ""});}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <button onClick={() => {setRmSelectorOpen(true)}}> select resource </button>
                    <br></br>
                    <label>Volume:         </label>
                    <input type="number" min="0" max="200" step="1" defaultValue="100"></input>
                </div>}
            {!voicelineAdd && <div className="textRight">------------(Collapsed)---------------</div>}
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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
