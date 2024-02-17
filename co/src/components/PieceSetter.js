import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { GiTrashCan } from "react-icons/gi";
import ResourceManagingModalWindow from './ResourceManagingModalWindow';


export default function PieceSetter({pieceNum, allPieceData, updatePieceData, getAllPieceData, backToList, gameDataList}) {
    const navigate = useNavigate();
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    const positionMaxX = 1200, positionMaxY = 1200, widthMax = 1200, heightMax = 1200;

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

    const [bgPicDataPart, setBgPicDataPart] = useState([]);
    const [bgPicDataPosX, setBgPicDataPosX] = useState(0);
    const [bgPicDataPosY, setBgPicDataPosY] = useState(0);
    const [bgPicDataWidth, setBgPicDataWidth] = useState(800);
    const [bgPicDataHeight, setBgPicDataHeight] = useState(600);

    const [displayClickableAdd, setDisplayClickableAdd] = useState(false);
    const [clickableDataPart, setClickableDataPart] = useState([]);
    const [clickableSource, setClickableSource] = useState("default source"); //TODO test
    const [clickableSound, setClickableSound] = useState("default sound"); //TODO test
    const [clickableConsequenceArray, setClickableConsequenceArray] = useState(["consq1", "consq"]);
    const [clickableConsequenceSelectedGameDataItem, setClickableConsequenceSelectedGameDataItem] = useState("");
    const [clickableConsequenceSelectedGameDataItemType, setClickableConsequenceSelectedGameDataItemType] = useState("");
    const [consequenceIsPlus, setConsequenceIsPlus] = useState("");
    const [clickableConsequenceAssignValue, setClickableConsequenceAssignValue] = useState(true);
    const [isClickableAddNewConsq, setIsClickableAddNewConsq] = useState(false);
    const [currentPieceDetail, setCurrentPieceDetail] = useState(
        {"num": pieceNum, 
        "content": allPieceData[pieceNum-1]["content"], 
        "speaker_name": allPieceData[pieceNum-1]["speaker_name"], 
        "bgp_source_filename": allPieceData[pieceNum-1]["bgp_source_filename"], 
        "bgp_pos_x": allPieceData[pieceNum-1]["bgp_pos_x"], 
        "bgp_pos_y": allPieceData[pieceNum-1]["bgp_pos_y"], 
        "bgp_width": allPieceData[pieceNum-1]["bgp_width"], 
        "bgp_height": allPieceData[pieceNum-1]["bgp_height"], 
        "chp_arr": allPieceData[pieceNum-1]["chp_arr"], 
        "btn_arr": allPieceData[pieceNum-1]["btn_arr"], 
        "bgm_source_filename": allPieceData[pieceNum-1]["bgm_source_filename"], 
        "bgm_loop": allPieceData[pieceNum-1]["bgm_loop"], 
        "bgm_volume": allPieceData[pieceNum-1]["bgm_volume"], 
        "vl_source_link": allPieceData[pieceNum-1]["vl_source_link"], 
        "vl_volume": allPieceData[pieceNum-1]["vl_volume"]}
    );

    const [audioList, setAudioList] = useState([]);
    const [visualList, setVisualList] = useState([]); 


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        const allPiece = getAllPieceData();
        setPieceDataLocal(allPiece);       
        if (firstTimeEnter === true) {
            /* initialization of project-resource-list in drop-down list */
            fetchProjResourceLists();
            // TODO fetch visualList and audioList from cloud-db to setup the local lists
            setFirstTimeEnter(false);
        }
    });

    function changeLoopingSetting() {
        setIsLooping(!isLooping); //TODO later update to cloud db: use "!isLooping" if inside this function, not waiting for re-rendering
        console.log("looping? ", !isLooping); //TODO test
    }

    function handleResourceSelectorCancel() {
        setRmSelectorOpen(false);
    }

    function handleVisualRsrcSelectorSave(updatedList) {
        //TODO update visualList
        setVisualList(updatedList);

    }

    function handleAudioRsrcSelectorSave(updatedList) {
        //TODO update audioList
        console.log("!! Piece Setter, from Resource Selector: [audio]");
        console.log(updatedList);
        setAudioList(updatedList);
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
        let tempCharPicDataPart = charPicDataPart.filter((item) => (item !== charPicDataPart[index]));
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

    async function fetchProjResourceLists() {
        console.log("piece-setter: fetchProjResourceLists()"); //TODO test
        /* fetch from cloud db */
        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
        console.log("new render- piece setter: obj from cloud (resource list):");
        console.log(obj);
        setAudioList(obj.audio);
        setVisualList(obj.visual);
    }

    function setBgpFilenameByVar(event) {
        let varName = event.target.value;
        let filename = "";
        // TODO fetch actual filename from list, by varName
        setCurrentPieceDetail({...currentPieceDetail,  "bgp_source_filename": filename});
    }
    function handleResourceManagerSaveChanges() {
        console.log("handleResourceManagerSaveChanges: TODO :change in cloud-db"); //TODO
    }
  
    return (
      

    <div className="pieceSetterArea userChoice">
        <button onClick={()=>{backToList();}}>← List</button><br></br>
        <br></br>
        <button onClick={jumpToPrevPiece} className="pairGroup"> ← </button>
        <button onClick={jumpToNextpiece} className="pairGroup"> → </button>


        <div className="buttonRight">
            <button onClick={collapseAllOptions}> Collapse All </button>
            <button onClick={expandAllOptions}> Expand All </button>
        </div>
        <br></br>
        <br></br>

            {rmSelectorOpen && 
                <ResourceManagingModalWindow  isDisplay={rmSelectorOpen} handleRsCancel={handleResourceSelectorCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>

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
                <div className="optionAreaSelected2">
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
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "bgp_source_filename": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_pos_x": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_pos_y": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_width": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_height": ""});}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <select value={currentPieceDetail["bgp_source_filename"]} onChange={(event)=>{setBgpFilenameByVar(event);}}>
                        <option key="bgp01" value=""> -- Select picture name -- </option>
                        {visualList.map((item, index) => {
                            return (<option key={item["var"]} value={item["var"]}>{item["var"]}</option>);
                        })}

                    </select>
                    <button onClick={() => {setRmSelectorOpen(true)}}> add resource name-pair </button>
                    
                    <br></br>
                    <label>Position x:      </label>
                    <input type="number" min="0" max="1200" step="1" defaultValue="0" value={bgPicDataPosX} onChange={(event)=>{setBgPicDataPosX(event.target.value);}}></input>
                    <input className="slider" type="range" min="0" max="1200" step="1" defaultValue="0" value={bgPicDataPosX} onChange={(event)=>{setBgPicDataPosX(event.target.value);}}></input>
                    <label>{bgPicDataPosX}</label>
                    <br></br>
                    <label>Position y:      </label>
                    <input type="number" min="0" max="900" step="1" defaultValue="0" value={bgPicDataPosY} onChange={(event)=>{setBgPicDataPosY(event.target.value);}}></input>
                    <input className="slider" type="range" min="0" max="900" step="1" defaultValue="0" value={bgPicDataPosY} onChange={(event)=>{setBgPicDataPosY(event.target.value);}}></input>
                    <label>{bgPicDataPosY}</label>
                    <br></br>
                    <label>Width:         </label>
                    <input type="number" min="0" max="1200" step="1" defaultValue="800" value={bgPicDataWidth} onChange={(event)=>{setBgPicDataWidth(event.target.value);}}></input>
                    <input className="slider" type="range" min="0" max="1200" step="1" defaultValue="800" value={bgPicDataWidth} onChange={(event)=>{setBgPicDataWidth(event.target.value);}}></input>
                    <br></br>
                    <label>Height:        </label>
                    <input type="number" min="0" max="900" step="1" defaultValue="450" value={bgPicDataHeight} onChange={(event)=>{setBgPicDataHeight(event.target.value);}}></input>
                    <input className="slider" type="range" min="0" max="900" step="1" defaultValue="450" value={bgPicDataHeight} onChange={(event)=>{setBgPicDataHeight(event.target.value);}}></input>
                </div>}
            {!bgpicAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            {!charPicAdd && <button className="collapseToggle" onClick={toggleCharPicOption}> + Character Picture Setting </button>}
            {charPicAdd && <button className="collapseToggle" onClick={toggleCharPicOption}> - Character Picture Setting </button>}

            {charPicAdd && 
                <div className="optionAreaSelected2">
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
                        {charPicDataPart.length > 0 && 
                        <td><GiTrashCan onClick={()=>{removeRowInCharPicTable(index);}}  className="iconButtonSmall"/></td>
                        }
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
    <select>
        {visualList.map((item, index) => {
            return (<option key={item["var"]} value={item["var"]}>{item["var"]}</option>);
        })}
    </select>
    <button onClick={() => {setRmSelectorOpen(true)}}> add resource name-pair </button>
    <br></br>
    <label>Position x:      </label>
    <input type="number" min="0" max={positionMaxX} step="1" value={charPicDataPosX} onChange={onChangeCharPicDataPosX}></input>
    <input className="slider" type="range" min="0" max={positionMaxX} value={charPicDataPosX} onChange={onChangeCharPicDataPosX}></input>
    <br></br>
    <label>Position y:      </label>
    <input type="number" min="0" max={positionMaxY} step="1" value={charPicDataPosY} onChange={onChangeCharPicDataPosY}></input>
    <input className="slider" type="range" min="0" max={positionMaxY} value={charPicDataPosY} onChange={onChangeCharPicDataPosY}></input>
    <br></br>
    <label>Width:         </label>
    <input type="number" min="0" max={widthMax} step="1" value={charPicDataWidth} onChange={onChangeCharPicDataW}></input>
    <input className="slider" type="range" min="0" max={widthMax} value={charPicDataWidth} onChange={onChangeCharPicDataW}></input>
    <br></br>
    <label>Height:        </label>
    <input type="number" min="0" max={heightMax} step="1" value={charPicDataHeight} onChange={onChangeCharPicDataH}></input>
    <input className="slider" type="range" min="0" max={heightMax} value={charPicDataHeight} onChange={onChangeCharPicDataH}></input>
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
                <div className="optionAreaSelected2">
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
                    <p className="plans"> area of working </p>

                    {displayClickableAdd === false && <button onClick={()=>{setDisplayClickableAdd(!displayClickableAdd);}}>Add a New Clickable</button>}
                    {displayClickableAdd === true && <button onClick={()=>{setDisplayClickableAdd(!displayClickableAdd);}}> -- Collapse Adding New Clickable -- </button>}
  
                <div className="purpleArea">
                     {displayClickableAdd && 
            <div>
                    <label>Shape/Picture Source:  </label>
                    <select>
                        {visualList.map((item, index) => {
                            return (<option key={item["var"]} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select>
       
                    <button onClick={() => {setRmSelectorOpen(true)}}> add resource name-pair </button>
                    <br></br>
                    {/* <label>Sound Effect:      </label> //TODO future feature
                    <label>TODO</label>
                    <select>
                        {audioList.map((item, index) => {
                            return (<option key={index} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select> */}
                    {/* <button onClick={() => {setRmSelectorOpen(true)}}> add resource name-pair </button> */}
                    <br></br>
                    <p className="plans"> TODO: add basic info for buttons: posx, posy, width, height</p>
                    <label>Position x: </label>
                    <label>TODO</label><input type="number"></input><input className="slider" type="range"></input>
                    <br></br>
                    <label>Position y: </label>
                    <label>TODO</label><input type="number"></input><input className="slider" type="range"></input>
                    <br></br>
                    <label>Width: </label>
                    <label>TODO</label><input type="number"></input><input className="slider" type="range"></input>
                    <br></br>
                    <label>Height: </label>
                    <label>TODO</label><input type="number"></input><input className="slider" type="range"></input>
                    <br></br>
                    <br></br>
                    <label>Consequence:         </label>
                    <table>
                        <thead>
                            <tr>
                                <th>Object</th>
                                <th>Action</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {clickableConsequenceArray.map((item, index) => {         
                            return (
                                <tr className="clickableListItem3" key={item.toString()}>
                                    <td>(obj1)</td>
                                    <td>(action1)</td>
                                    <td>(amount1)</td>
                                    <td><GiTrashCan 
                                        onClick={()=>{
                                        //TODO remove from consequence table
                                    }}  className="iconButtonSmall"/></td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button onClick={()=>{setIsClickableAddNewConsq(!isClickableAddNewConsq);}}>Add a new consequence</button>
                    {isClickableAddNewConsq && <div className="orangeArea">

                    <label>Target of change: </label>

                    <br></br><label>TEST: game-data-item-type: {clickableConsequenceSelectedGameDataItemType}:::</label><br></br>

                    <select onChange={(event)=>{
                                setClickableConsequenceSelectedGameDataItem(event.target.value);
                                console.log("selected game data (consq) = ");
                                console.log(event.target.value);
                                setClickableConsequenceSelectedGameDataItemType(gameDataList[event.target.value]["data_type"]);
                            }} 
                            value={clickableConsequenceSelectedGameDataItem}>
                        <option value="" key=""> -- Select Game Data Item --</option>
                        {Object.keys(gameDataList).map((currKey) => {
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            return (
                                <option value={currKey} key={gameDataList[currKey]["name"]}>{currKey}</option>
                            );
                        })}
                    </select>

                    <br></br><br></br>

                    <div>
                    
                    {clickableConsequenceSelectedGameDataItemType === "number" && 
                        <input type="radio" value={clickableConsequenceAssignValue} checked={clickableConsequenceAssignValue} onChange={()=>{setClickableConsequenceAssignValue(true);}}></input>} 
                    <label>Assign Value</label>
                    
                    <br></br>
                    <label>TODO: get current selected game-data-item & get type of it & respond accordingly </label>
                    
                        <label>TODO</label>
                        <br></br>
                        <label>Set </label>
                        
                        <label> to </label>
                        
                        { (clickableConsequenceSelectedGameDataItemType === "number" || clickableConsequenceSelectedGameDataItemType === "string") &&
                        <input></input>}
                        {clickableConsequenceSelectedGameDataItemType === "boolean" && 
                        <select>
                            <option>True</option>
                            <option>False</option>
                        </select>}

                        <br></br><p className="plans"> TODO: consider validation or typed option for game data types </p>
                    </div>



                    
                    { clickableConsequenceSelectedGameDataItemType === "number" &&
                    <div>
                
                {clickableConsequenceSelectedGameDataItemType === "number" && <input type="radio" value={clickableConsequenceAssignValue} checked={!clickableConsequenceAssignValue} onChange={()=>{setClickableConsequenceAssignValue(false);}}></input>}
                    <label>Change Value</label>
                    <br></br>
                    <label>Operation: </label>
                    <label>TODO</label>
                    <select value={consequenceIsPlus} onChange={(event)=>{setConsequenceIsPlus(event.target.value);}}>
                        <option value="" key=""> -- Select Operation -- </option>
                        <option value="plus" key="plus"> Plus </option>
                        <option value="minus" key="minus"> Minus </option>
                    </select>      
                    <label>TODO</label><input></input>
                    </div>}

                    <br></br>
                    <button onClick={()=>{
                        setIsClickableAddNewConsq(false);
                        //TODO save the change: target name + action(become/plus/minus) + magnitude(given value)
                        let obj = {};
                        obj.target = clickableConsequenceSelectedGameDataItem;
                        if (clickableConsequenceAssignValue === false) { // plus or minus
                            if (consequenceIsPlus !== "plus" && consequenceIsPlus !== "minus") {
                                console.log("consequence-invalid action");
                                return;
                            } else {
                                obj.action = consequenceIsPlus;
                            }
                        } else { // direct assign value 
                            obj.action = "becomes";
                        }

                        // obj.amount = ; //TODO

                        /* push to clickableConsequenceArray */
                        clickableConsequenceArray.push(obj);

                    }}>Add</button>
                    </div>}

                    <p className="plans"> Consequence: (logic organizer-related) 
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

        </div>
                </div>
                
                
                }
            {!clickableAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            {!bgMusicAdd && <button className="collapseToggle" onClick={toggleBgMusicAddOption}> + Background Music Setting </button>}
            {bgMusicAdd && <button className="collapseToggle" onClick={toggleBgMusicAddOption}> - Background Music Setting </button>}

            {bgMusicAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "bgm_loop": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgm_volume": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgm_source_filename": ""});}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <select>
                        {audioList.map((item, index) => {
                            return (<option key={item["var"]} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select>
                    <button onClick={() => {setRmSelectorOpen(true)}}> add resource name-pair </button>
                    <br></br>
                    <label>Loop:  </label>
                    <input type="checkbox" checked={isLooping} onChange={changeLoopingSetting}/>
                    
                    <br></br>
                    <label>Volume:         </label>
                    <label>TODO</label>
                    <input type="number" min="0" max="200" step="1" defaultValue="100"></input>
                </div>}
            {!bgMusicAdd && <div className="textRight">------------(Collapsed)---------------</div>}
                
            {/* {!voicelineAdd && <button className="collapseToggle" onClick={toggleVoicelineAddOption}> + Voiceline Setting </button>}
            {voicelineAdd && <button className="collapseToggle" onClick={toggleVoicelineAddOption}> - Voiceline Setting </button>} */}

            {/* {voicelineAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "vl_source_link": ""});setCurrentPieceDetail({...currentPieceDetail,  "vl_volume": ""});}}> reset </button>
                    <br></br>
                    <label>Source Link:  </label>
                    <select>
                        {audioList.map((item, index) => {
                            return (<option key={index} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select>
                    <button onClick={() => {setRmSelectorOpen(true)}}> add resource name-pair </button>
                    <br></br>
                    <label>Volume:         </label>
                    <label>TODO</label>
                    <input type="number" min="0" max="200" step="1" defaultValue="100"></input>
                </div>}
            {!voicelineAdd && <div className="textRight">------------(Collapsed)---------------</div>}
         */}
        {/* <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br> */} //TODO add voiceline feature later
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
