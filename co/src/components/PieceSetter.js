import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { GiTrashCan } from "react-icons/gi";
import ResourceManagingModalWindow from './ResourceManagingModalWindow';


export default function PieceSetter({pieceNum, assignPreviewIndex, allPieceData, updatePieceData, getAllPieceData, backToList, gameDataList, openRm}) {
    const navigate = useNavigate();
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    const positionMaxX = 1200, positionMaxY = 1200, widthMax = 1200, heightMax = 1200;

    let name = "/gamenodeconvpiecedatasec";

    const [lookingPieceNumber, setLookingPieceNumber] = useState(pieceNum);

    const [bgpicAdd, setBgPicAdd] = useState(true);
    const [charPicAdd, setCharPicAdd] = useState(true);
    const [speakerNameAdd, setSpeakerNameAdd] = useState(true);
    const [clickableAdd, setClickableAdd] = useState(true);
    const [bgMusicAdd, setBgMusicAdd] = useState(true);
    const [voicelineAdd, setVoicelineAdd] = useState(true);
    const [rmSelectorOpen, setRmSelectorOpen] = useState(false);
    const [isLooping, setIsLooping] = useState(true);
    const [anotherCharpic, setAnotherCharPic] = useState(false);

    const [charPicDataTable, setCharPicDataTable] = useState([]);

    const [displayClickableAdd, setDisplayClickableAdd] = useState(false);
    const [displayStndButtonAdd, setDisplayStndButtonAdd] = useState(false);
    const [clickableDataTable, setClickableDataPart] = useState([]);
    const [clickableSource, setClickableSource] = useState("default source"); //TODO test
    const [clickableSound, setClickableSound] = useState("default sound"); //TODO test
    const [clickableConsequenceArray, setClickableConsequenceArray] = useState([]);
    const [clickableConsequenceSelectedGameDataItem, setClickableConsequenceSelectedGameDataItem] = useState("");
    const [clickableConsequenceSelectedGameDataItemType, setClickableConsequenceSelectedGameDataItemType] = useState("");
    const [consequenceIsPlus, setConsequenceIsPlus] = useState("");
    const [clickableConsequenceIsAssignValue, setClickableConsequenceIsAssignValue] = useState(true);
    const [clickableConsequenceBecomeAmount, setClickableConsequenceBecomeAmount] = useState("");

    const [isClickableAddNewConsq, setIsClickableAddNewConsq] = useState(false);
    
    const [pieceAllDataLocal, setPieceAllDataLocal] = useState(allPieceData);

    const [currentPieceDetail, setCurrentPieceDetail] = useState(
        {"num": pieceNum, 
        "content": allPieceData[pieceNum-1]["content"], 
        "displayTextFrame": allPieceData[pieceNum-1]["displayTextFrame"],
        "speaker_name": allPieceData[pieceNum-1]["speaker_name"], 
        "bgp_source_varname": allPieceData[pieceNum-1]["bgp_source_varname"], 
        "bgp_pos_x": allPieceData[pieceNum-1]["bgp_pos_x"], 
        "bgp_pos_y": allPieceData[pieceNum-1]["bgp_pos_y"], 
        "bgp_width": allPieceData[pieceNum-1]["bgp_width"], 
        "bgp_height": allPieceData[pieceNum-1]["bgp_height"], 
        "chp_arr": allPieceData[pieceNum-1]["chp_arr"], 
        "chp_curr": allPieceData[pieceNum-1]["chp_curr"],
        "btn_arr": allPieceData[pieceNum-1]["btn_arr"], 
        "bgm_source_varname": allPieceData[pieceNum-1]["bgm_source_varname"], 
        "bgm_source_link":allPieceData[pieceNum-1]["bgm_source_link"],
        "bgm_action": allPieceData[pieceNum-1]["bgm_action"],
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
        setPieceAllDataLocal(allPiece);  

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
        let contentStr = event.target.value;
        setCurrentPieceDetail({...currentPieceDetail,  "content": contentStr});
        let tempObj = currentPieceDetail;
        tempObj["content"] = contentStr;
        updateToCaller(tempObj);
    }

    function handleSpeakerNameEnter(event) {
        setCurrentPieceDetail({...currentPieceDetail,  "speaker_name": event.target.value});
        let tempObj = currentPieceDetail;
        tempObj["speaker_name"] = event.target.value;
        updateToCaller(tempObj);
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
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": ["", 0, 0, 60, 120, "default-none"]});
        setAnotherCharPic(!anotherCharpic);

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = ["", 0, 0, 60, 120, "default-none"];
        updateToCaller(tempObj);

    }


    function jumpToPrevPiece() {
        console.log("TOOD: jump to previous piece..."); //TODO testing
        if (lookingPieceNumber > 1) {
            setLookingPieceNumber(lookingPieceNumber-1);
            //TODO change *all* form content here in display...

            //TODO: fetch "lookingPieceNumber-2"'s data            
            //TODO temp
            setCurrentPieceDetail(pieceAllDataLocal[lookingPieceNumber-2]);
            assignPreviewIndex(lookingPieceNumber-2); // TODO note : number = index+1, index = num-1
        } else {
            setLookingPieceNumber(1);
            assignPreviewIndex(0); // TODO note : number = index+1, index = num-1
        }
    }

    function jumpToNextpiece() {
        console.log("TOOD: jump to next piece..."); //TODO testing
        if (lookingPieceNumber < pieceAllDataLocal.length) {
            setLookingPieceNumber(lookingPieceNumber+1);
            //TODO change *all* form content here in display...
            
            setCurrentPieceDetail(pieceAllDataLocal[lookingPieceNumber]);
            assignPreviewIndex(lookingPieceNumber); // TODO note : number = index+1, index = num-1

        } else {
            setLookingPieceNumber(pieceAllDataLocal.length);
            assignPreviewIndex(pieceAllDataLocal.length-1); // TODO note : number = index+1, index = num-1
        }
    }


    function updateToCaller(obj) {
        //TODO later: conclude all the current info in this piece, update to the caller's update-function

        let newPieceData = [];

        let i = 0;
        console.log("before changing and updateing to caller..", pieceAllDataLocal); //TODO test
        for (; i < pieceAllDataLocal.length; i++) {
            if (i+1 !== lookingPieceNumber) {
                newPieceData.push(pieceAllDataLocal[i]);
            } else {
                
                console.log("Saving...", obj); //TODO test
                newPieceData.push(obj); // important: new content updated
            }
        }

        updatePieceData(newPieceData);
    }

    function removeRowInCharPicTable(index) {
        let tempCharPicDataTable = charPicDataTable.filter((item) => (item !== charPicDataTable[index]));
        setCharPicDataTable(tempCharPicDataTable);
        let tempObj = currentPieceDetail;
        tempObj["chp_arr"] = tempCharPicDataTable;

        updateToCaller(tempObj);
        setCurrentPieceDetail({...currentPieceDetail,  "chp_arr": tempCharPicDataTable});

    }

    function onChangeCharPicDataPosX(event) {
        let chp_curr_arr = currentPieceDetail["chp_curr"];
        chp_curr_arr[1] = event.target.value;        
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": chp_curr_arr});

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = chp_curr_arr;
        updateToCaller(tempObj);
    }

    function onChangeCharPicDataPosY(event) {
        let chp_curr_arr = currentPieceDetail["chp_curr"];
        chp_curr_arr[2] = event.target.value;
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": chp_curr_arr});

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = chp_curr_arr;
        updateToCaller(tempObj);
    }

    function onChangeCharPicDataW(event) {
        let chp_curr_arr = currentPieceDetail["chp_curr"];
        chp_curr_arr[3] = event.target.value;
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": chp_curr_arr});

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = chp_curr_arr;
        updateToCaller(tempObj);
    }

    function onChangeCharPicDataH(event) {
        let chp_curr_arr = currentPieceDetail["chp_curr"];
        chp_curr_arr[4] = event.target.value;
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": chp_curr_arr});

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = chp_curr_arr;
        updateToCaller(tempObj);
    }

    function onChangeCharPicDataVar(event) {
        let chp_curr_arr = currentPieceDetail["chp_curr"];
        //store selected variable name
        chp_curr_arr[0] = event.target.value;
        
        //also store the url
        let urlList = visualList.filter((e) => (e["var"] === event.target.value));
        
        if (urlList.length === 0) {
            chp_curr_arr[5] = "default-none";        
        } else {
            let url = urlList[0]["url"];
            chp_curr_arr[5] = url;        
        }
    
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": chp_curr_arr});

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = chp_curr_arr;
        updateToCaller(tempObj);
    }

    async function fetchProjResourceLists() {
        console.log("piece-setter: fetchProjResourceLists()"); //TODO test
        /* fetch from cloud db */
        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
        console.log("new render- piece setter: obj from cloud (resource list):"); //TODO test
        console.log(obj); //TODO test
        setAudioList(obj.audio);
        setVisualList(obj.visual);
    }

    function setupBgpInfo(event) {
    
        let varName = event.target.value;
        console.log("setupBgpInfo var = ", varName); //TODO test
        
        let urlList = visualList.filter((e) => (e["var"] === varName));
        if (urlList.length === 0) {

            setCurrentPieceDetail({...currentPieceDetail,  "bgp_source_varname": "", "bgp_source_link": "default-none"});
            let tempObj = currentPieceDetail;
            tempObj["bgp_source_varname"] = "";
            tempObj["bgp_source_link"] = "default-none";
    
            updateToCaller(tempObj);
        } else {
            let url = urlList[0]["url"];
                
            setCurrentPieceDetail({...currentPieceDetail,  "bgp_source_varname": varName, "bgp_source_link": url});
            let tempObj = currentPieceDetail;
            tempObj["bgp_source_varname"] = varName;
            tempObj["bgp_source_link"] = url;
    
            updateToCaller(tempObj);
        }

    }

    function setupHideTextFrame(boolVar) {
        let isDisplay = boolVar;
        console.log("isDisplay???" , isDisplay);
        setCurrentPieceDetail({...currentPieceDetail,  "displayTextFrame": isDisplay});
        let tempObj = currentPieceDetail;
        tempObj["displayTextFrame"] = isDisplay;
        updateToCaller(tempObj);

    }

    function setupBgmInfo(event) {
        let varName = event.target.value;
        let urlArr = audioList.filter((e)=>(e["var"] === varName));
        let tempObj = currentPieceDetail;

        if (urlArr.length == 0) {
            tempObj["bgm_source_link"] = "defualt-none";
            setCurrentPieceDetail({...currentPieceDetail, "bgm_source_link": "defualt-none", "bgm_source_varname": varName});
        } else {
            let url =  urlArr[0]["url"];
            tempObj["bgm_source_link"] = url;
            setCurrentPieceDetail({...currentPieceDetail, "bgm_source_link": url, "bgm_source_varname": varName});
        }
        tempObj["bgm_source_varname"] = varName;

        updateToCaller(tempObj);

    }


    function setupVoicelineInfo(event) {
        let varName = event.target.value;
        let urlArr = audioList.filter((e)=>(e["var"] === varName));
        let tempObj = currentPieceDetail;

        if (urlArr.length == 0) {
            tempObj["vl_source_link"] = "defualt-none";
            setCurrentPieceDetail({...currentPieceDetail, "vl_source_link": "defualt-none", "vl_source_varname": varName});
        } else {
            let url =  urlArr[0]["url"];
            tempObj["vl_source_link"] = url;
            setCurrentPieceDetail({...currentPieceDetail, "vl_source_link": url, "vl_source_varname": varName});
        }
        tempObj["vl_source_varname"] = varName;

        updateToCaller(tempObj);        
    }
 
    function handleResourceManagerSaveChanges() {
        console.log("handleResourceManagerSaveChanges: TODO :change in cloud-db"); //TODO
    }

    function resetAddingCharPicRow() {
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": ["", 0, 0, 60, 120, "default-none"]});
    }
  
    return (
      
    <div>

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

            <label>Piece: {lookingPieceNumber}</label>
            <br></br>
            <label> Text to display: </label>
            <br></br>
            <textarea
                value={currentPieceDetail["content"]}
                onChange={(event)=>{handleTextContentEnter(event);}}
            >
                {currentPieceDetail["content"]}
            </textarea>
            <input type="checkbox" value={currentPieceDetail["displayTextFrame"]} 
            checked={currentPieceDetail["displayTextFrame"]} 
            onChange={()=>{
                if (currentPieceDetail["displayTextFrame"] === false) { // going to be true
                    setupHideTextFrame(true);
                } else { //currentPieceDetail["displayTextFrame"] === true, going to be false
                    setupHideTextFrame(false);
                }                
            }}
    
            ></input>
            <label
            style={{"userSelect": "none"}}
            onClick={()=>{
                if (currentPieceDetail["displayTextFrame"] === false) { // going to be true
                    setupHideTextFrame(true);
                } else { //currentPieceDetail["displayTextFrame"] === true, going to be false
                    setupHideTextFrame(false);
                }                   
            }}
            >Display Textframe</label>

            <br></br>
            <br></br>
            {!speakerNameAdd && <button className="collapseToggle" onClick={toggleSpeakerNameOption}> + Speaker Name for Text Setting </button>}
            {speakerNameAdd && <button className="collapseToggle" onClick={toggleSpeakerNameOption}> - Speaker Name for Text Setting </button>}

            {speakerNameAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "speaker_name": ""});}}> reset </button>
                    <br></br>
                    <label>Speaker Name:  </label>

                    <input value={currentPieceDetail["speaker_name"]} onChange={(event)=>{handleSpeakerNameEnter(event);}}></input>
                </div>   
            }
            {!speakerNameAdd && <div className="textRight">------------(Collapsed)---------------</div>}
            
            {!bgpicAdd
            && <button className="collapseToggle" onClick={toggleBgPicOption}> + Background Picture Setting {bgpicAdd}</button>}
            {bgpicAdd
            && <button className="collapseToggle" onClick={toggleBgPicOption}> - Background Picture Setting {bgpicAdd}</button>}
            
            {bgpicAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "bgp_source_varname": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_pos_x": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_pos_y": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_width": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgp_height": ""});}}> reset </button>
                    <br></br>
                    <label>Source:  </label>
                    <select value={currentPieceDetail["bgp_source_varname"]} onChange={(event)=>{setupBgpInfo(event);}}>
                        <option key="bgp01" value=""> -- Select picture name -- </option>
                        {visualList.map((item, index) => {
                            let keyStr = "bgp-" + index + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}

                    </select>
                    <button onClick={() => {openRm()}}>+ new variable linking</button>   
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
        {charPicDataTable.map((item, index) => {
            
            return (
                <tr key={index}>
                    {charPicDataTable.length > 0 && <td>{item[0]}</td>}
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>                    
                        {charPicDataTable.length > 0 && 
                        <td><GiTrashCan onClick={()=>{removeRowInCharPicTable(index);}}  className="iconButtonSmall"/></td>
                        }
                </tr>
            );
        })}
    </tbody>

    </table>
    <br></br>
    <button onClick={()=>{
        if (anotherCharpic === true) { // going to be false (closed)
            resetAddingCharPicRow();
        }
        changeAddAnotherCharPicOption();}}>Add Another Character Picture</button>
    {anotherCharpic &&
    <>
        <br></br>

    <label>Source:  </label>
    <select value={currentPieceDetail["chp_curr"][0]} onChange={(event)=>{onChangeCharPicDataVar(event);}}>
        <option key="charp01" value=""> -- Select picture name -- </option>

        {visualList.map((item, index) => {
            let keyStr = "charpic" + index + item["var"];
            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
        })}
    </select >

    <button onClick={() => {openRm()}}>+ new variable linking</button>
    <br></br>
    <label>Position x:      </label>
    <input type="number" min="0" max={positionMaxX} step="1" 
        value={currentPieceDetail["chp_curr"][1]}
        onChange={(event)=>{onChangeCharPicDataPosX(event);}}></input>
    <input className="slider" type="range" min="0" max={positionMaxX} value={currentPieceDetail["chp_curr"][1]} onChange={(event)=>{onChangeCharPicDataPosX(event);}}></input>
    <br></br>
    <label>Position y:      </label>
    <input type="number" min="0" max={positionMaxY} step="1" value={currentPieceDetail["chp_curr"][2]} onChange={(event)=>{onChangeCharPicDataPosY(event);}}></input>
    <input className="slider" type="range" min="0" max={positionMaxY} value={currentPieceDetail["chp_curr"][2]} onChange={(event)=>{onChangeCharPicDataPosY(event);}}></input>
    <br></br>
    <label>Width:         </label>
    <input type="number" min="0" max={widthMax} step="1" value={currentPieceDetail["chp_curr"][3]} onChange={(event)=>{onChangeCharPicDataW(event);}}></input>
    <input className="slider" type="range" min="0" max={widthMax} value={currentPieceDetail["chp_curr"][3]} onChange={(event)=>{onChangeCharPicDataW(event);}}></input>
    <br></br>
    <label>Height:        </label>
    <input type="number" min="0" max={heightMax} step="1" value={currentPieceDetail["chp_curr"][4]} onChange={(event)=>{onChangeCharPicDataH(event);}}></input>
    <input className="slider" type="range" min="0" max={heightMax} value={currentPieceDetail["chp_curr"][4]} onChange={(event)=>{onChangeCharPicDataH(event);}}></input>
    <br></br>
    <button onClick={()=>{
        if (currentPieceDetail["chp_curr"][5] === "default-none") {
            console.log("warning: variable cannot be empty"); //TODO warning popping

        } else {
            /* update to cloud db for this field: character-pic */
            let tempTable = currentPieceDetail["chp_arr"];
            tempTable.push(currentPieceDetail["chp_curr"]);
            setCharPicDataTable(tempTable);

            setCurrentPieceDetail({...currentPieceDetail,  "chp_arr": tempTable, "chp_curr": ["", 0, 0, 60, 120, "default-none"]});
            
            updateToCaller(currentPieceDetail); //TODO test

            changeAddAnotherCharPicOption();
        }
    
       
   
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
                    <div><label>1. Standard Button (option) Group</label>
                        <div className="indentOne">

                        <table>
                            <thead>
                            <tr>
                                <th>Index</th>
                                <th>Button Text</th>
                                <th>Consequence</th>
            
                            </tr>
                            </thead>
                            
                            <tbody>
                                {clickableDataTable.map((item, index) => {         
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
                        <button onClick={()=>{
                            setDisplayStndButtonAdd(!displayStndButtonAdd);
                        }}>
                            Add Another Button
                        </button>
                        {displayStndButtonAdd && <div className="purpleArea">
                            consequence table
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
                                        console.log("1standard button group: item = ", item);       
                                    return (
                                        <tr className="clickableListItem3">
                                            <td>{item["target"]}</td>
                                            <td>{item["action"]}</td>
                                            <td>{item["amount"]}</td>
                                        </tr>
  
                                );
                        })}
                                </tbody>

                            </table>
                            <button className="indentOne" onClick={()=>{
                                setIsClickableAddNewConsq(!isClickableAddNewConsq);
                                }}>Add Another Consequence</button>
                            {isClickableAddNewConsq && 
                    <div className="orangeArea indentOne">

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
                            let keyStr = "gameData" + gameDataList[currKey]["name"];
                            return (
                                
                                <option value={currKey} key={keyStr}>{currKey}</option>
                            );
                        })}
                    </select>

                    <br></br><br></br>

                    <div>
                    
                    {clickableConsequenceSelectedGameDataItemType === "number" && 
                        <input type="radio" value={clickableConsequenceIsAssignValue} checked={clickableConsequenceIsAssignValue} onChange={()=>{setClickableConsequenceIsAssignValue(true);}}></input>} 
                    <label>Assign Value</label>
                    
                    <br></br>
                    <label>TODO: get current selected game-data-item & get type of it & respond accordingly </label>
                    
                        <label>TODO</label>
                        <br></br>
                        <label>Set </label>
                        
                        <label> to </label>
                        
                        {(clickableConsequenceSelectedGameDataItemType === "number" || clickableConsequenceSelectedGameDataItemType === "string") &&
                        <input onChange={(event)=>{
                            setClickableConsequenceBecomeAmount(event.target.value);}}></input>}
                        
                        {clickableConsequenceSelectedGameDataItemType === "boolean" && 
                        <select 
                            onChange={(event)=>{setClickableConsequenceBecomeAmount(event.target.value);}}>
                                <option value="" key="becomeBoolDefault">-- True or False --</option>
                                <option value="true" key="becomeTrue">True</option>
                                <option value="false" key="becomeFalse">False</option>
                        </select>}

                        <br></br><p className="plans"> 1 TODO: consider validation or typed option for game data types </p>
                    </div>



                    
                    { clickableConsequenceSelectedGameDataItemType === "number" &&
                    <div>
                
                {clickableConsequenceSelectedGameDataItemType === "number" && <input type="radio" value={clickableConsequenceIsAssignValue} checked={!clickableConsequenceIsAssignValue} onChange={()=>{setClickableConsequenceIsAssignValue(false);}}></input>}
                    <label>Change Value</label>
                    <br></br>
                    <label>Operation: </label>
                    <label>TODO</label>
                    <select value={consequenceIsPlus} onChange={(event)=>{setConsequenceIsPlus(event.target.value);}}>
                        <option value="" key=""> -- Select Operation -- </option>
                        <option value="plus" key="plus"> Plus </option>
                        <option value="minus" key="minus"> Minus </option>
                    </select>      
                    <label>TODO</label>
                        <input onChange={(event)=>{setClickableConsequenceBecomeAmount(event.target.value);}}></input>
                    </div>}

                    <br></br>
                    <button 
                        onClick={()=>{
                        //TODO save the change: target name + action(become/plus/minus) + magnitude(given value)
                        let obj = {};
                        obj.target = clickableConsequenceSelectedGameDataItem;
                        
                        if (clickableConsequenceIsAssignValue === false) { // plus or minus
                            if (consequenceIsPlus !== "plus" && consequenceIsPlus !== "minus") {
                                console.log("consequence-invalid action");
                                return;
                            } else {
                                obj.action = consequenceIsPlus;
                            }
                        } else { // direct assign value 
                            obj.action = "becomes";
                        }

                        obj.amount = clickableConsequenceBecomeAmount; //TODO

                        /* push to clickableConsequenceArray */
                        clickableConsequenceArray.push(obj);
                        
                        setIsClickableAddNewConsq(false);

                    }}>Add</button>
                    </div>}

                        </div>}


                        </div>
                    
                    </div>



                    <p className="plans"> (modularizable: multiple items allowed) 
                    <br></br> TODO: add data structure of clickable-setting records!
                    </p>
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...");}}> reset </button>
                    
                    <br></br>
                   
                    <table>
                    <thead>
                    <tr>
                        <th>Shape/Picture Source</th>
                        <th>Consequence</th>
    
                    </tr>
                    </thead>
                    
                    <tbody>
                        {clickableDataTable.map((item, index) => {         
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
                        <option key="clck01" value=""> -- Select base-pic name -- </option>

                        {visualList.map((item, index) => {
                            let keyStr = "clickable-" + index + "-" + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select>
       
                    <button onClick={() => {openRm()}}>+ new variable linking</button>
                    <br></br>
                    {/* <label>Sound Effect:      </label> //TODO future feature
                    <label>TODO</label>
                    <select>
                        {audioList.map((item, index) => {
                            return (<option key={index} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select> */}
                    {/* <button onClick={() => {openRm()}}>+ new variable linking</button> */}
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
                    {isClickableAddNewConsq && 
                    <div className="orangeArea">

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
                            let keyStr = "gameData" + gameDataList[currKey]["name"];
                            return (
                                
                                <option value={currKey} key={keyStr}>{currKey}</option>
                            );
                        })}
                    </select>

                    <br></br><br></br>

                    <div>
                    
                    {clickableConsequenceSelectedGameDataItemType === "number" && 
                        <input type="radio" value={clickableConsequenceIsAssignValue} checked={clickableConsequenceIsAssignValue} onChange={()=>{setClickableConsequenceIsAssignValue(true);}}></input>} 
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

                        <br></br><p className="plans"> 2 TODO: consider validation or typed option for game data types </p>
                    </div>



                    
                    { clickableConsequenceSelectedGameDataItemType === "number" &&
                    <div>
                
                {clickableConsequenceSelectedGameDataItemType === "number" && <input type="radio" value={clickableConsequenceIsAssignValue} checked={!clickableConsequenceIsAssignValue} onChange={()=>{setClickableConsequenceIsAssignValue(false);}}></input>}
                    <label>Change Value</label>
                    <br></br>
                    <label>Operation: </label>
                    <label>TODO</label>
                    <select value={consequenceIsPlus} onChange={(event)=>{setConsequenceIsPlus(event.target.value);}}>
                        <option value="" key="selectConseq"> -- Select Operation -- </option>
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
                        if (clickableConsequenceIsAssignValue === false) { // plus or minus
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

                        console.log("just added a new conseuquence, now: ", clickableConsequenceArray);

                    }}>Add</button>
                    </div>}

                    <p className="plans"> Consequence: (logic organizer-related) 
                    <br></br> TODO: keep the *action* of updating game-data!! (not immediately, but when action triggered)
                   
                    <br></br>
                    <select></select>


                    </p>
                    <button  onClick={()=>{
                        let newlickableData = clickableDataTable;
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
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "bgm_loop": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgm_volume": ""});setCurrentPieceDetail({...currentPieceDetail,  "bgm_source_varname": ""});}}> reset </button>
                    <br></br>
                    <label>Action: </label>
                    <select value={currentPieceDetail["bgm_action"]}
                        onChange={(event)=>{
                            setCurrentPieceDetail({...currentPieceDetail,  "bgm_action": event.target.value});
                            let tempObj = currentPieceDetail;
                            tempObj["bgm_action"] = event.target.value;
                            updateToCaller(tempObj);

                    }}>
                        <option key="maintainBgm" value="maintainBgm">-- Select Action (default: maintain)--</option>
                        <option key="startNewBgm" value="startNewBgm">start new</option>
                        <option key="stopBgm" value="stopBgm">stop playing</option>
                    </select>

                    {currentPieceDetail["bgm_action"] === "startNewBgm" && <div>
                        <label>Source:  </label>
                        
                        <select value={currentPieceDetail["bgm_source_varname"]} onChange={(event)=>{
                                setupBgmInfo(event);
                            }}>
                            <option key="bgm01" value=""> -- Select music name -- </option>

                            {audioList.map((item, index) => {
                                let keyStr = "bgmusic-" + index + item["var"];
                                return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                            })}
                        </select>
                        <button onClick={() => {openRm()}}>+ new variable linking</button>
                        <br></br>
                        <label>Loop:  </label>
                        <input type="checkbox" checked={isLooping} onChange={changeLoopingSetting}/>
                        
                        <br></br>
                        <label>Volume:         </label>
                        <label>TODO</label>
                        <input type="number" min="0" max="200" step="1" defaultValue="100"></input>
                        </div>}
                </div>}
            {!bgMusicAdd && <div className="textRight">------------(Collapsed)---------------</div>}
                





            {/* {!voicelineAdd && <button className="collapseToggle" onClick={toggleVoicelineAddOption}> + Voiceline Setting </button>}
            {voicelineAdd && <button className="collapseToggle" onClick={toggleVoicelineAddOption}> - Voiceline Setting </button>}

            {voicelineAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{setCurrentPieceDetail({...currentPieceDetail,  "vl_source_link": ""});setCurrentPieceDetail({...currentPieceDetail,  "vl_volume": ""});}}> reset </button>
                    <br></br>
                    <label>Source:  </label>
                    <select value={currentPieceDetail["vl_source_varname"]}
                    onChange={(event)=>{setupVoicelineInfo(event);}}
                    >
                        <option key="vl" value=""> -- Select voiceline name -- </option>
   
                        {audioList.map((item, index) => {
                            return (<option key={index} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select>
                    <button onClick={() => {openRm()}}>+ new variable linking</button>
                    <br></br>
                    <label>Volume:         </label>
                    <label>TODO</label>
                    <input type="number" min="0" max="200" step="1" defaultValue="100"></input>
                </div>}
            {!voicelineAdd && <div className="textRight">------------(Collapsed)---------------</div>}
         */}

        <button >Save</button>

        <br></br>
        <br></br>
        <div className="buttonRight">
            <button onClick={collapseAllOptions}> Collapse All </button>
            <button onClick={expandAllOptions}> Expand All </button>
        </div>
  </div>

  {rmSelectorOpen && 
        <ResourceManagingModalWindow isDisplay={rmSelectorOpen} handleRmCancel={handleResourceSelectorCancel} handleRmSaveChanges={handleResourceManagerSaveChanges}/>
    }

  </div>
 
    );
}
