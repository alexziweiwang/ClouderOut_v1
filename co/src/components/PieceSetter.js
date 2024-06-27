import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { GiTrashCan } from "react-icons/gi";
import ResourceManagingModalWindow from './ResourceManagingModalWindow';
import { getProjectGameDataVM, updateGameDataVM, getChapterDataVM } from '../viewmodels/GameDataViewModel';


export default function PieceSetter({pieceNum, assignPreviewIndex, allPieceData, updatePieceData, getAllPieceData, backToList, gameDataList, openRm, openGameDataManager}) {
    const navigate = useNavigate();
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    const positionMaxX = 1200, positionMaxY = 1200, widthMax = 1200, heightMax = 1200;

    let name = "/gamenodeconvpiecedatasec";

    const [displayGameDataWindow, setDisplayGameDataWindow] = useState(false);
    const [displayGameDataButton, setDisplayGameDataButton] = useState(true);
    const [needCloudGameData, setNeedCloudGameData] = useState(true);
    const [gameDataLocal, setGameDataLocal] = useState({});

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

    const [charPicDataTable, setCharPicDataTable] = useState([]); //TODO1

    const [displayStndButtonAdd, setDisplayStndButtonAdd] = useState(false);
    const [stndButtonDataTable, setStndButtonDataTable] = useState([]);
    const [stndButtonSound, setStndButtonSound] = useState("default sound"); //TODO test
    const [stndButtonText, setStndButtonText] = useState(""); //TODO test
    const [stndButtonConsequenceArray, setStndButtonConsequenceArray] = useState([]);
    const [stndBtnConseqGDataItemSelected, setStndBtnConseqGDataItemSelected] = useState("");
    const [stndBtnConseqGDataTypeSelected, setStndBtnConseqGDataTypeSelected] = useState("");
    const [consequenceStndBtnIsPlus, setConsequenceStndBtnIsPlus] = useState("");
    const [stndBtnConseqIsAssignValue, setStndBtnConseqIsAssignValue] = useState(true);
    const [stndBtnConseqBecomeAmount, setStndBtnConseqBecomeAmount] = useState("");

    const [displayCstmClickableAdd, setDisplayCstmClickableAdd] = useState(false);
    const [cstmClkbDataTable, setCstmClkbDataTable] = useState([]);
    const [cstmClkbSound, setCstmClkbSound] = useState("default sound"); //TODO test
    const [cstmClkbText, setCstmClkbText] = useState(0);
    const [cstmClkbPosX, setCstmClkbPosX] = useState(0);
    const [cstmClkbPosY, setCstmClkbPosY] = useState(0);
    const [cstmClkbW, setCstmClkbW] = useState(0);
    const [cstmClkbH, setCstmClkbH] = useState(0);
    const [cstmClkbIsShape, setCstmIsShape] = useState(false);
    const [cstmClkbBgColor, setCstmClkbBgColor] = useState("#000000");
    const [cstmClkbPicVar, setCstmClkbPicVar] = useState("");

    const [cstmClkbConsequenceArray, setCstmClkbConsequenceArray] = useState([]);
    const [cstmClkbConseqGDataItemSelected, setCstmClkbConseqGDataItemSelected] = useState("");
    const [cstmClkbConseqGDataTypeSelected, setCstmClkbConseqGDataTypeSelected] = useState("");
    const [consequenceCstmClkbIsPlus, setConsequenceCstmClkbIsPlus] = useState("");
    const [cstmClkbConseqIsAssignValue, setCstmClkbConseqIsAssignValue] = useState(true);
    const [cstmClkbConseqBecomeAmount, setCstmClkbConseqBecomeAmount] = useState("");
    
    const [isStndBtnAddNewConsq, setIsStndBtnAddNewConsq] = useState(false);
    const [isCstmClkbAddNewConsq, setIsCstmClkbAddNewConsq] = useState(false);

    const [pieceAllDataLocal, setPieceAllDataLocal] = useState(allPieceData);

    const [currentPieceDetail, setCurrentPieceDetail] = useState(
        {"num": pieceNum, 
        "content": allPieceData[pieceNum-1]["content"], 
        "displayTextFrame": allPieceData[pieceNum-1]["displayTextFrame"],
        "speaker_name": allPieceData[pieceNum-1]["speaker_name"], 
        "bgp_source_varname": allPieceData[pieceNum-1]["bgp_source_varname"], 

        "bgp_source_pair" : allPieceData[pieceNum-1]["bgp_source_pair"], //TODO impl

        "bgp_pos_x": allPieceData[pieceNum-1]["bgp_pos_x"], 
        "bgp_pos_y": allPieceData[pieceNum-1]["bgp_pos_y"], 
        "bgp_width": allPieceData[pieceNum-1]["bgp_width"], 
        "bgp_height": allPieceData[pieceNum-1]["bgp_height"], 
        "bgp_action": allPieceData[pieceNum-1]["bgp_action"],

        "chp_arr": allPieceData[pieceNum-1]["chp_arr"], 
        "chp_curr": allPieceData[pieceNum-1]["chp_curr"],
        "chp_action": allPieceData[pieceNum-1]["chp_action"], 
        "stnd_btn_arr": allPieceData[pieceNum-1]["stnd_btn_arr"], 
        "clkb_arr": allPieceData[pieceNum-1]["clkb_arr"], 
        "clkb_previewing": allPieceData[pieceNum-1]["clkb_previewing"], 
        "bgm_source_varname": allPieceData[pieceNum-1]["bgm_source_varname"], 
        
        "bgm_source_pair" : allPieceData[pieceNum-1]["bgm_source_pair"], //TODO impl

        "bgm_action": allPieceData[pieceNum-1]["bgm_action"],
        "bgm_loop": allPieceData[pieceNum-1]["bgm_loop"], 
        "bgm_volume": allPieceData[pieceNum-1]["bgm_volume"], 
        "vl_source_link": allPieceData[pieceNum-1]["vl_source_link"], 
        "vl_volume": allPieceData[pieceNum-1]["vl_volume"],

        "vl_source_pair" : allPieceData[pieceNum-1]["vl_source_pair"], //TODO impl
    }

     

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

        setCharPicDataTable(currentPieceDetail["chp_arr"]);
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

    function handleSpeakerNameReset() {
        setCurrentPieceDetail({...currentPieceDetail,  "speaker_name": ""});
        let tempObj = currentPieceDetail;
        tempObj["speaker_name"] = "";

        updateToCaller(tempObj);
    }

    function handleBgpSwitchAction(event) {

            setCurrentPieceDetail({...currentPieceDetail,  "bgp_action": event.target.value});
            let tempObj = currentPieceDetail;
            tempObj["bgp_action"] = event.target.value;

            updateToCaller(tempObj);   
    }

    function handleCharPicArrSwitchAction(event) {

        setCurrentPieceDetail({...currentPieceDetail,  "chp_action": event.target.value});
        let tempObj = currentPieceDetail;
        tempObj["chp_action"] = event.target.value;

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
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": ["", 0, 0, 60, 120, 1]});
        setAnotherCharPic(!anotherCharpic);

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = ["", 0, 0, 60, 120, 1];
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
        let tempCharPicDataTable = charPicDataTable
            .filter((item) => (
                item !== charPicDataTable[index]));
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

    function onChangeCharPicDataScale(event) {
        let chp_curr_arr = currentPieceDetail["chp_curr"];
        let val =  event.target.value;
        chp_curr_arr[5] = val;
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": chp_curr_arr});

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = chp_curr_arr;
        updateToCaller(tempObj);        
    }

    function onChangeCharPicDataVar(event) {
        let chp_curr_arr = currentPieceDetail["chp_curr"];
        //store selected variable name
        chp_curr_arr[0] = event.target.value;
        
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": chp_curr_arr});

        let tempObj = currentPieceDetail;
        tempObj["chp_curr"] = chp_curr_arr;
        updateToCaller(tempObj);
    }

    async function fetchProjResourceLists() {
        console.log("piece-setter: fetchProjResourceLists()"); //TODO test
        /* fetch from cloud db */
        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
        // console.log("new render- piece setter: obj from cloud (resource list):"); //TODO test
        // console.log(obj); //TODO test
        setAudioList(obj.audio);
        setVisualList(obj.visual);
    }

    function setupBgpInfo(event) {
//TODO improve in future

        let varName = event.target.value;
        console.log("setupBgpInfo var = ", varName); //TODO test
             
        setCurrentPieceDetail({...currentPieceDetail,  "bgp_source_varname": varName});

        let tempObj = currentPieceDetail;
        tempObj["bgp_source_varname"] = varName;
        updateToCaller(tempObj);
        
    }

    function resetBgpInfo() {
        let tempObj = currentPieceDetail;
        tempObj["bgp_source_varname"] = "";
        tempObj["bgp_pos_x"] = "";
        tempObj["bgp_pos_y"] = "";
        tempObj["bgp_width"] = "";
        tempObj["bgp_height"] = "";
        updateToCaller(tempObj);


        setCurrentPieceDetail({...currentPieceDetail,  "bgp_source_varname": "", "bgp_pos_x": "", "bgp_pos_y": "", "bgp_width": "", "bgp_height": ""});
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
        let tempObj = currentPieceDetail;
        tempObj["bgm_source_varname"] = event.target.value;
        updateToCaller(tempObj);

        setCurrentPieceDetail({...currentPieceDetail, "bgm_source_varname": event.target.value});
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
        setCurrentPieceDetail({...currentPieceDetail,  "chp_curr": ["", 0, 0, 60, 120, 1]});
    }

    function updatePreviewingCstmClkb(obj) {

        let tempClkbPreviewing = [];
        tempClkbPreviewing.push(obj.text);
        tempClkbPreviewing.push(obj.posX);
        tempClkbPreviewing.push(obj.posY);
        tempClkbPreviewing.push(obj.w);
        tempClkbPreviewing.push(obj.h);
        tempClkbPreviewing.push(obj.isShape);
        tempClkbPreviewing.push(obj.bgColor);
        tempClkbPreviewing.push(obj.picVar);


        let tempObj = currentPieceDetail;
        tempObj["clkb_previewing"] = tempClkbPreviewing;
        updateToCaller(tempObj);

        setCurrentPieceDetail({...currentPieceDetail,  "clkb_previewing": tempClkbPreviewing});
    }
  

    function markNextNeedCloudGameData() {
        setNeedCloudGameData(true);
    }

    function handleGameDataManagerCancel() {
        setDisplayGameDataWindow(!displayGameDataWindow);
    }

    async function fetchGameDataFromCloud() {
        let projectName = projName;

        console.log("!!! This is for project: ", projectName);
        let project  = projectName;
        console.log("checking2 on project ... [", project, "]");
        if (project === undefined || project === null || project === "" || project.trim() === "") {
          return;
        }
        const isUpdated = true;
        let currUser = username; //TODO temp

        const gdataTestResult = await getProjectGameDataVM({projectName: project, uname: currUser, mostUpdated: isUpdated});
     
        if (gdataTestResult === undefined) {
          console.log("Error: no game_data in this project...");
          return;
        }
        console.log("*from cloud* game-data: gdataTestResult[game_data] ", gdataTestResult); //TODO fetched game-data!
        setGameDataLocal(gdataTestResult);
    }


    function updateGDataToCloud(gameDataLatest) {

        let project = "";
        project  = projName;
        if (project.trim() === "") {
        return;
        }

        let currUser = username; //TODO temp

        updateGameDataVM({projectName: project, uname: currUser, gameData: gameDataLatest});
    
    }

    async function displayGameDataFunc() {
        setDisplayGameDataButton(false);
    
        if (needCloudGameData === true) {
          await fetchGameDataFromCloud();
        } else {
          console.log("*from local* game-data: using existing data"); 
        }
        setDisplayGameDataWindow(!displayGameDataWindow);
        setDisplayGameDataButton(true);
    
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
            >Include Textframe Content</label>

            <br></br>
            <br></br>
            {!speakerNameAdd && <button className="collapseToggle" onClick={toggleSpeakerNameOption}> + Speaker Name for Text Setting </button>}
            {speakerNameAdd && <button className="collapseToggle" onClick={toggleSpeakerNameOption}> - Speaker Name for Text Setting </button>}

            {speakerNameAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{handleSpeakerNameReset()}}> reset </button>
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

                    <button className="buttonRight" onClick={() =>{resetBgpInfo()}}> reset </button>
                    <br></br>
                    <label>Operation: </label>
                    <select 
                        value={currentPieceDetail["bgp_action"]}
                        onChange={(event)=>{
                            handleBgpSwitchAction(event);
                        }}
                    >
                        <option key="bgpOperationDefaultMaintain" value="maintainBgp">-- Select Operation (default: maintain) --</option>
                        <option key="switchToNewBgp" value="switchToNewBgp">switchToNew</option>
                    </select>


                    {currentPieceDetail["bgp_action"] === "switchToNewBgp" && <div className="indentOne">
                        <label>Source:  </label>
                        <select value={currentPieceDetail["bgp_source_varname"]} onChange={(event)=>{setupBgpInfo(event);}}>
                            <option key="bgp01" value=""> -- Select picture name -- </option>
                            <option key="bgp_NoPic" value="">(no picture)</option>
                            {visualList.map((item, index) => {
                                let keyStr = "bgp-" + index + item["var"];
                                return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                            })}

                        </select>
                        <button onClick={() => {openRm()}}>+ new variable linking</button>   
                    </div>}
                </div>}
            {!bgpicAdd && <div className="textRight">------------(Collapsed)---------------</div>}

            {!charPicAdd && <button className="collapseToggle" onClick={toggleCharPicOption}> + Character Picture Setting </button>}
            {charPicAdd && <button className="collapseToggle" onClick={toggleCharPicOption}> - Character Picture Setting </button>}

            {charPicAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> reset </button>
                    <br></br>
                    <label>Operation:</label>
                    <select 
                        value={currentPieceDetail["chp_action"]}
                        onChange={(event)=>{
                            handleCharPicArrSwitchAction(event);
                        }}>
                            <option key="maintainCharPicArr" value="maintainCharPicArr">-- Select Operation (default: maintain) --</option>
                            <option key="changeCharPicArr" value="changeCharPicArr">Change Character-List</option>
                    </select>
                    <br></br>

    {currentPieceDetail["chp_action"] === "changeCharPicArr"  && <div>
            <table>
            <thead>        
                <tr>
                    <th>Source</th>
                    <th>Position x</th>
                    <th>Position y</th>
                    <th>Width</th>
                    <th>Height</th>
                    <th>Scale</th>

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
                            <td>{item[5]}x</td>
                                {(charPicDataTable.length > 0 && currentPieceDetail["chp_action"] === "changeCharPicArr") && 
                             <td>
                                <GiTrashCan onClick={()=>{removeRowInCharPicTable(index);}}  className="iconButtonSmall"/>
                                    </td>
                                }
                          
                        </tr>
                    );
                })}
            </tbody>

            </table>
            <br></br>
            
            {currentPieceDetail["chp_action"] === "changeCharPicArr" && <button onClick={()=>{
                if (anotherCharpic === true) { // going to be false (closed)
                    resetAddingCharPicRow();
                }
                changeAddAnotherCharPicOption();}}>Add a New Character Picture
            </button>}
    </div>}

    {(anotherCharpic === true && currentPieceDetail["chp_action"] === "changeCharPicArr") &&
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
    <label>Scale: </label>
    <input type="range" className="slider" min="1" max="10" step="1" value={currentPieceDetail["chp_curr"][5]}
        onChange={(event)=>{
            onChangeCharPicDataScale(event);
        }}></input><label>{currentPieceDetail["chp_curr"][5]}x</label>

    <br></br>
    <button onClick={()=>{
        if (currentPieceDetail["chp_curr"][0] === "") {
            console.log("warning: variable cannot be empty"); //TODO warning popping

        } else {
            /* update to cloud db for this field: character-pic */
            let tempTable = currentPieceDetail["chp_arr"];
            tempTable.push(currentPieceDetail["chp_curr"]);
            setCharPicDataTable(tempTable);

            let tempPieceDetail = currentPieceDetail;
            tempPieceDetail["chp_arr"] = tempTable;
            tempPieceDetail["chp_curr"] = ["", 0, 0, 60, 120, 1];

            setCurrentPieceDetail({...currentPieceDetail,  
                "chp_arr": tempTable, 
                "chp_curr": ["", 0, 0, 60, 120, 1]
            });
            
            updateToCaller(tempPieceDetail); //TODO test

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
           
                <button className="buttonRight" onClick={() =>{console.log("TODO reset...");}}> reset </button>

                    <div><label>1. Standard Button/Option Group</label>
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
                                {stndButtonDataTable.map((item, index) => {         
                                    return (
                                        <tr>
                                            <td>{index}</td>
                                            <td>{item["buttonText"]}</td>
                                            <td><p>{item.conseq.map((elem, i) => {
                                                let keyStr = "stnd-button-" + index + "-";
                                                let str = "[" + elem[0] + "] " + elem[1] + ": [" + elem[2] + "]";
                                                
                                                return (<label key={keyStr}>{str}<br></br></label>);
                                            })}
                                          
                                            </p></td>
                                            <td>
                                                <GiTrashCan 
                                                    className="cursor_pointer iconButtonSmall" 
                                                    onClick={()=>{
                                                        //TODO remove item of current index from stndButtonDataTable
                                                    }} />
                                            </td>
                                        </tr>
                                    
                                        );
                                })}
                                
                            </tbody>
                    
                        </table>
                        {!displayStndButtonAdd && <button onClick={()=>{
                            setDisplayStndButtonAdd(!displayStndButtonAdd);
                        }}>
                            Add a New Button
                        </button>}
                        {displayStndButtonAdd && <button onClick={()=>{
                            setDisplayStndButtonAdd(!displayStndButtonAdd);
                        }}>-- Collapse Adding New Button --
                        </button>}
                       


                        {displayStndButtonAdd && 
                        <div className="purpleArea">

                            <label>Button Text:</label>
                            <input value={stndButtonText} onChange={(event)=>{
                                setStndButtonText(event.target.value);
                            }}></input>TODO

                            <div>
                            Consequence(s)
                            <table>
                                <thead>
                                    <tr>
                                        <th>Object</th>
                                        <th>Action</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stndButtonConsequenceArray.map((item, index) => {  
                                        console.log("1standard button group: item = ", item);       
                                    return (
                                        <tr className="clickableListItem3">
                                            <td>{item[0]}</td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <GiTrashCan className="cursor_pointer iconButtonSmall" 
                                            onClick={()=>{
                                                //TODO remove item of current index from stndButtonConsequenceArray
                                            }}  
                                            />
                                        </tr>
  
                                );
                        })}
                                </tbody>

                            </table>
                            {!isStndBtnAddNewConsq && <button className="indentOne" onClick={()=>{
                                setIsStndBtnAddNewConsq(!isStndBtnAddNewConsq);
                                }}>Add a New Consequence</button>}
                            {isStndBtnAddNewConsq && 
                    <div className="orangeArea indentOne">

                    <label>Target of change: </label>

                    <br></br><label>1TEST: game-data-item-type: {stndBtnConseqGDataTypeSelected}:::</label><br></br>

                    <select onChange={(event)=>{
                                setStndBtnConseqGDataItemSelected(event.target.value);
console.log("selected game data (consq) = "); //TODO test
console.log(event.target.value); //TODO test
                                // if (event.target.value !== "nextNodePointer") {
                            
                                    if (event.target.value === "") {
                                        return;
                                    }
                                    setStndBtnConseqGDataTypeSelected(gameDataList[event.target.value]["data_type"]);
                              
                                // } else {
                                
                                //     setStndBtnConseqGDataTypeSelected("nodePointer");
                                // }
                            }} 
                            value={stndBtnConseqGDataItemSelected}>
                        <option value="" key=""> -- Select Game Data Item --</option>
                        {Object.keys(gameDataList).map((currKey) => {
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            let keyStr = "gameData" + gameDataList[currKey]["name"];
                            return (
                                
                                <option value={currKey} key={keyStr}>{currKey}</option>
                            );
                        })}
                    </select>
                    {displayGameDataButton && <button onClick={()=>{openGameDataManager()}}> + </button>}


                    <br></br><br></br>

                    <div>

                    {/* {stndBtnConseqGDataTypeSelected === "nodePointer" &&
                    <div>
                        TODO: target node list
                        TODO: impl plan -- from node INSIDE a this chapter; fetch node-list from convo-node-editor, from game-maker, from node manager
                        TODO: NodeManager components has parameter function that takes its current node list, and Game-Maker cathes that returned value, then pass this list into Convo-Editor to PieceSetter
                    </div>
                    } */}
                    
                    {stndBtnConseqGDataTypeSelected === "number" && 
                        <input type="radio" value={stndBtnConseqIsAssignValue} checked={stndBtnConseqIsAssignValue} onChange={()=>{setStndBtnConseqIsAssignValue(true);}}></input>} 
                    
                    {stndBtnConseqGDataItemSelected !== "" && <>
                            <label>Assign Value</label>
                            
                            <br></br>
  
                                <br></br>
                                <label>Set to</label>
                                
                                {stndBtnConseqGDataTypeSelected === "number" &&
                                <input type="number"
                                    onChange={(event)=>{
                                    setStndBtnConseqBecomeAmount(event.target.value);}}></input>}
                                   
                                                                
                                {stndBtnConseqGDataTypeSelected === "string" &&
                                <input onChange={(event)=>{
                                    setStndBtnConseqBecomeAmount(event.target.value);}}></input>}
                                
                                {stndBtnConseqGDataTypeSelected === "boolean" && 
                                <select 
                                    onChange={(event)=>{setStndBtnConseqBecomeAmount(event.target.value);}}>
                                        <option value="" key="becomeBoolDefault">-- True or False --</option>
                                        <option value="true" key="becomeTrue">True</option>
                                        <option value="false" key="becomeFalse">False</option>
                                </select>}

                                <br></br><p className="plans"> 1 TODO: consider validation or typed option for game data types </p>
                            
                        </>}
                    </div>



                    
                    {stndBtnConseqGDataTypeSelected === "number" &&
                    <div>
                
                {stndBtnConseqGDataTypeSelected === "number" && <input type="radio" value={stndBtnConseqIsAssignValue} checked={!stndBtnConseqIsAssignValue} onChange={()=>{setStndBtnConseqIsAssignValue(false);}}></input>}
                    <label>Change Value</label>
                    <br></br>
                    <label>Operation: </label>
                    <label>TODO</label>
                    <select value={consequenceStndBtnIsPlus} onChange={(event)=>{setConsequenceStndBtnIsPlus(event.target.value);}}>
                        <option value="" key=""> -- Select Operation -- </option>
                        <option value="plus" key="plus"> Plus </option>
                        <option value="minus" key="minus"> Minus </option>
                    </select>      
                    <label>TODO</label>
                        <input onChange={(event)=>{setStndBtnConseqBecomeAmount(event.target.value);}}></input>
                    </div>}

                    <br></br>

                    <button onClick={()=>{
                        setIsStndBtnAddNewConsq(false);
                    }}>Cancel</button>                    
                    <button className="buttonRight"
                        onClick={()=>{
                        //TODO save the change: target name + action(become/plus/minus) + magnitude(given value)
                        let obj = [];
                       
                        if (stndBtnConseqGDataItemSelected === "" || stndBtnConseqBecomeAmount === "") {
                            return;
                        }
                        obj.push(stndBtnConseqGDataItemSelected)
                        
                        if (stndBtnConseqIsAssignValue === false) { // plus or minus
                            if (consequenceStndBtnIsPlus !== "plus" && consequenceStndBtnIsPlus !== "minus") {
                                console.log("consequence-invalid action");
                                return;
                            } else {
                                obj.push(consequenceStndBtnIsPlus);
                            }
                        } else { // direct assign value 
                            
                            obj.push("becomes");
                        }
                        
                        obj.push(stndBtnConseqBecomeAmount); //TODO
                      
                        /* push to stndButtonConsequenceArray */
                        stndButtonConsequenceArray.push(obj);
                        
                        setIsStndBtnAddNewConsq(false);


                    }}>Add</button>

                    </div>}
                    </div>
                    <br></br>

                    <button className="buttonRight" onClick={()=>{
                        if (stndButtonText === "") {
                            return;
                        }
                        let obj = {};
                        
                        obj.buttonText = stndButtonText;
                        obj.conseq = stndButtonConsequenceArray;
                        
                        let tableTemp = stndButtonDataTable;
                        tableTemp.push(obj);
                        setStndButtonDataTable(tableTemp);

                        console.log("current standard-button group: "); //TODO test
                        console.log(tableTemp); //TODO test

                        setCurrentPieceDetail({...currentPieceDetail,  "stnd_btn_arr": tableTemp});
                        
                        let tempObj = currentPieceDetail;
                        tempObj["stnd_btn_arr"] = tableTemp;
                        updateToCaller(tempObj);


                        setStndButtonText("");
                        setStndButtonConsequenceArray([]);
                        setDisplayStndButtonAdd(false);
                        setStndBtnConseqGDataItemSelected("");
                        setStndBtnConseqGDataTypeSelected("");
                        setStndBtnConseqBecomeAmount("");
                    }}
                    >Confirm Add</button>
                        
                        </div>}


                        </div>
                    
                    </div>

                    <br></br>
                    <label>2. Custom Clickable(s)</label>
                    
                    <div className="indentOne">
                        <table>
                        <thead>
                        <tr>
                            <th>Index</th>
                            <th>Postiion</th>
                            <th>Size</th>
                            <th>Text</th>
                            <th>Shape/Picture-Base</th>
                            <th>Consequence</th>
        
                        </tr>
                        </thead>
                        <tbody>
                            {cstmClkbDataTable.map((item, index) => {
                                let keyStr = "clickable-table-row-" + index + "-";
                                return (<tr key={keyStr}>
                                    <td>{index}</td>
                                </tr>);
                            })}
                        </tbody>
                        TODO: cstmClkbDataTable

                        </table>
                        {displayCstmClickableAdd === false && <button onClick={()=>{setDisplayCstmClickableAdd(!displayCstmClickableAdd);}}>Add a New Clickable</button>}
                        {displayCstmClickableAdd === true && <button onClick={()=>{setDisplayCstmClickableAdd(!displayCstmClickableAdd);}}> -- Collapse Adding New Clickable -- </button>}
                        {displayCstmClickableAdd=== true && <div className="purpleArea">
                            <label>Button Text:</label>
                            <input onChange={(event)=>{
                                setCstmClkbText(event.target.value);
                            }}></input>
                            <br></br>
                            <label>Position x: </label>
                            <input type="number" value={cstmClkbPosX}
                                onChange={(event)=>{
                                    setCstmClkbPosX(event.target.value);
                                    let prvwObj = {
                                        "text": cstmClkbText,
                                        "posX": event.target.value,
                                        "posY": cstmClkbPosY,
                                        "w": cstmClkbW,
                                        "h": cstmClkbH,
                                        "isShape": cstmClkbIsShape,
                                        "bgColor": cstmClkbBgColor,
                                        "picVar": cstmClkbPicVar
                                    }
                                    updatePreviewingCstmClkb(prvwObj);

                                }}>
                            </input><input className="slider" type="range" value={cstmClkbPosX}
                                onChange={(event)=>{
                                    setCstmClkbPosX(event.target.value);
                                }}></input>
                            <br></br>
                            <label>Position y: </label>
                            <input type="number" value={cstmClkbPosY}
                                onChange={(event)=>{
                                    setCstmClkbPosY(event.target.value);
                                }}></input><input className="slider" type="range" value={cstmClkbPosY}
                                onChange={(event)=>{
                                    setCstmClkbPosY(event.target.value);
                                }}></input>
                            <br></br>
                            <label>Width: </label>
                            <input type="number" value={cstmClkbW}
                                onChange={(event)=>{
                                    setCstmClkbW(event.target.value);
                                }}></input><input className="slider" type="range" value={cstmClkbW}
                                onChange={(event)=>{
                                    setCstmClkbW(event.target.value);
                                }}></input>
                            <br></br>
                            <label>Height: </label>
                            <input type="number" value={cstmClkbH}
                                onChange={(event)=>{
                                    setCstmClkbH(event.target.value);
                                }}></input><input className="slider" type="range" value={cstmClkbH}
                                onChange={(event)=>{
                                    setCstmClkbH(event.target.value);
                                }}></input>                       
                            <br></br>
                            <input type="radio" value={cstmClkbIsShape} checked={cstmClkbIsShape} 
                                onChange={()=>{setCstmIsShape(true);}}
                            ></input><label onClick={()=>{setCstmIsShape(true);}}>Rectangle & Color Filled </label>
                                {cstmClkbIsShape && <><br></br><input type="color" value={cstmClkbBgColor}
                                    onChange={(event)=>{setCstmClkbBgColor(event.target.value);}}></input>
                                    <label>{cstmClkbBgColor}</label></>}
                            <br></br>
                            <input type="radio" value={cstmClkbIsShape} checked={!cstmClkbIsShape}
                                onChange={()=>{setCstmIsShape(false);}}
                            ></input><label onClick={()=>{setCstmIsShape(false);}}>Base Picture </label><br></br>
                            {!cstmClkbIsShape && <div className="indentOne">
                            <label>Shape/Picture Source:  </label>

                                <select value={cstmClkbPicVar} onChange={
                                    (event)=>{setCstmClkbPicVar(event.target.value);}
                                }>
                                    <option key="clck01" value=""> -- Select base-pic name -- </option>

                                    {visualList.map((item, index) => {
                                        let keyStr = "clickable-" + index + "-" + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select>
                                <button onClick={() => {openRm()}}>+ new variable linking</button>
                            </div>}
                            <br></br>
                            <label>Consequence Table</label>
                            <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Object</th>
                                        <th>Action</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {cstmClkbConsequenceArray.map((item, index) => {  
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
                            {!isCstmClkbAddNewConsq && <button className="indentOne" onClick={()=>{
                                setIsCstmClkbAddNewConsq(!isCstmClkbAddNewConsq);
                            }}>Add a New Consequence</button>}
                            {isCstmClkbAddNewConsq && 
                    <div className="orangeArea indentOne">

                    <label>Target of change: </label>

                    <br></br><label>2TEST: game-data-item-type: {cstmClkbConseqGDataTypeSelected}:::</label><br></br>

                    <select onChange={(event)=>{
                                setCstmClkbConseqGDataItemSelected(event.target.value);
                                console.log("selected game data (consq) = ");
                                console.log(event.target.value);
                                // if (event.target.value !== "nextNodePointer") {
                         
                                    if (event.target.value === "") {
                                        return;
                                    }
                                    setCstmClkbConseqGDataTypeSelected(gameDataList[event.target.value]["data_type"]);
                              
                                // } else {
                                
                                //     setCstmClkbConseqGDataTypeSelected("nodePointer");
                                // }
                            }} 
                            value={cstmClkbConseqGDataItemSelected}>
                        <option value="" key=""> -- Select Game Data Item --</option>
                        {Object.keys(gameDataList).map((currKey) => {
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            let keyStr = "gameData" + gameDataList[currKey]["name"];
                            return (
                                
                                <option value={currKey} key={keyStr}>{currKey}</option>
                            );
                        })}
                    </select>
                    {displayGameDataButton && <button onClick={()=>{openGameDataManager()}}> + </button>}

                    <br></br><br></br>

                    <div>

                    {/* {cstmClkbConseqGDataTypeSelected === "nodePointer" &&
                    <div>
                        TODO: target node list
                        TODO: impl plan -- from node INSIDE a this chapter; fetch node-list from convo-node-editor, from game-maker, from node manager
                        TODO: NodeManager components has parameter function that takes its current node list, and Game-Maker cathes that returned value, then pass this list into Convo-Editor to PieceSetter
                    </div>
                    } */}
                    
                    {cstmClkbConseqGDataTypeSelected === "number" && 
                        <input type="radio" value={cstmClkbConseqIsAssignValue} checked={cstmClkbConseqIsAssignValue} onChange={()=>{setCstmClkbConseqIsAssignValue(true);}}></input>} 
                    
                    {cstmClkbConseqGDataItemSelected !== "" && <>
                            <label>Assign Value</label>
                            
                            <br></br>
  
                                <br></br>
                                <label>Set to</label>
                                {cstmClkbConseqGDataTypeSelected === "number" &&
                                <input type="number"
                                    onChange={(event)=>{
                                    setCstmClkbConseqBecomeAmount(event.target.value);}}></input>}

                                {cstmClkbConseqGDataTypeSelected === "string" &&
                                <input onChange={(event)=>{
                                    setCstmClkbConseqBecomeAmount(event.target.value);}}></input>}
                                
                                {cstmClkbConseqGDataTypeSelected === "boolean" && 
                                <select 
                                    onChange={(event)=>{setCstmClkbConseqBecomeAmount(event.target.value);}}>
                                        <option value="" key="becomeBoolDefault">-- True or False --</option>
                                        <option value="true" key="becomeTrue">True</option>
                                        <option value="false" key="becomeFalse">False</option>
                                </select>}

                                <br></br><p className="plans"> 1 TODO: consider validation or typed option for game data types </p>
                            
                        </>}
                    </div>



                    
                    {cstmClkbConseqGDataTypeSelected === "number" &&
                    <div>
                
                {cstmClkbConseqGDataTypeSelected === "number" && <input type="radio" value={cstmClkbConseqIsAssignValue} checked={!cstmClkbConseqIsAssignValue} onChange={()=>{setCstmClkbConseqIsAssignValue(false);}}></input>}
                    <label>Change Value</label>
                    <br></br>
                    <label>Operation: </label>
                    <label>TODO</label>
                    <select value={consequenceCstmClkbIsPlus} onChange={(event)=>{setConsequenceCstmClkbIsPlus(event.target.value);}}>
                        <option value="" key=""> -- Select Operation -- </option>
                        <option value="plus" key="plus"> Plus </option>
                        <option value="minus" key="minus"> Minus </option>
                    </select>      
                    <label>TODO</label>
                        <input onChange={(event)=>{setCstmClkbConseqBecomeAmount(event.target.value);}}></input>
                    </div>}

                    <br></br>

                    <button onClick={()=>{setIsCstmClkbAddNewConsq(false);}}>Cancel</button>

                    <button className="buttonRight"
                        onClick={()=>{
                        //TODO save the change: target name + action(become/plus/minus) + magnitude(given value)
                        let obj = {};
                        obj.target = cstmClkbConseqGDataItemSelected;
                        if (cstmClkbConseqGDataItemSelected === "") {
                            return;
                        }
                        
                        if (cstmClkbConseqIsAssignValue === false) { // plus or minus
                            if (consequenceCstmClkbIsPlus !== "plus" && consequenceCstmClkbIsPlus !== "minus") {
                                console.log("consequence-invalid action");
                                return;
                            } else {
                                obj.action = consequenceCstmClkbIsPlus;
                            }
                        } else { // direct assign value 
                            obj.action = "becomes";
                        }

                        obj.amount = cstmClkbConseqBecomeAmount; //TODO

                        cstmClkbConsequenceArray.push(obj);
                        
                        setIsCstmClkbAddNewConsq(false);

                    }}>Add</button>
                    </div>}
                    </div>
                    <br></br>
                    <button className="buttonRight" onClick={()=>{
                        // add to cstmClkbDataTable
                        if (cstmClkbText === "") {
                            return;
                        }
                        let obj = {};
                        
                        obj.buttonText = cstmClkbText;
                        obj.conseq = cstmClkbConsequenceArray;
                        
                        let tableTemp = cstmClkbDataTable;
                        tableTemp.push(obj);
                        setCstmClkbDataTable(tableTemp);

                        console.log("current sutom-clickable group: "); //TODO test
                        console.log(tableTemp); //TODO test

                        setCurrentPieceDetail({...currentPieceDetail,  "cstm_clkb_arr": tableTemp});
                        
                        let tempObj = currentPieceDetail;
                        tempObj["cstm_clkb_arr"] = tableTemp;
                        updateToCaller(tempObj);


                        setCstmClkbText("");
                        setCstmClkbConsequenceArray([]);
                        setDisplayCstmClickableAdd(false);
                        setCstmClkbConseqGDataItemSelected("");
                        setCstmClkbConseqGDataTypeSelected("");
                        setCstmClkbConseqBecomeAmount("");


                    }}
                    >Confirm Add</button>
                                    
                        </div>}

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
                    <label>Operation: </label>
                    <select value={currentPieceDetail["bgm_action"]}
                        onChange={(event)=>{
                            setCurrentPieceDetail({...currentPieceDetail,  "bgm_action": event.target.value});
                            let tempObj = currentPieceDetail;
                            tempObj["bgm_action"] = event.target.value;
                            updateToCaller(tempObj);

                    }}>
                        <option key="maintainBgm" value="maintainBgm">-- Select Operation (default: maintain)--</option>
                        <option key="startNewBgm" value="startNewBgm">start new</option>
                        <option key="stopBgm" value="stopBgm">stop playing</option>
                    </select>

                    {currentPieceDetail["bgm_action"] === "startNewBgm" && <div className="indentOne">
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
        <button onClick={jumpToPrevPiece} className="pairGroup"> ← </button>
        <button onClick={jumpToNextpiece} className="pairGroup"> → </button>

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
