import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiTrashCan } from "react-icons/gi";
import langDictionary from './_textDictionary';
import { characterPictureCurrTemplate } from './_dataStructure_DefaultObjects';

import { resourceVarToUrl_vm } from '../viewmodels/CalcAc_PieceSetting';

//TODO refactor: stnd_btn_arr


export default function PieceSetter({
    pieceNum, assignPreviewIndex, 
    allPieceData, updatePieceData, getAllPieceData, 
    backToList, gameDataList, 
    openRm, openGameDataManager, 
    setIsClickedOnSetters, 
    fetchClickedIsOnSetter, getCurrentPieceNum, 
    fetchRmUpdatedSignal, respondUpdatedRm, 

    getVisualList,
    getAudioList,
    getGameDataDesignList,

    getUILanguage,
    username, projName,
    sendOutBgmVol,

    sendOutPrvwCharaPic


}) {
    const audioPlayerId = "audio-player";
    let audioElem = document.getElementById(audioPlayerId);

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');


    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    const listText = textDictItem.listText !== undefined ?
        textDictItem.listText
        : textDictItemDefault.listText;
    
    const collapseAllText = textDictItem.collapseAllText !== undefined ?
        textDictItem.collapseAllText
        : textDictItemDefault.collapseAllText;
    
    const expandAllText = textDictItem.expandAllText !== undefined ?
        textDictItem.expandAllText
        : textDictItemDefault.expandAllText;
    
    const textContentSettingText = textDictItem.textContentSettingText !== undefined ?
        textDictItem.textContentSettingText
        : textDictItemDefault.textContentSettingText;
    
    const resetText = textDictItem.resetText !== undefined ?
        textDictItem.resetText
        : textDictItemDefault.resetText;

    const bgpSettingText = textDictItem.bgpSettingText !== undefined ?
        textDictItem.bgpSettingText
        : textDictItemDefault.bgpSettingText;
    
    const manageResourceText = textDictItem.manageResourceText !== undefined ?
        textDictItem.manageResourceText
        : textDictItemDefault.manageResourceText;
    
    const manageGameData = textDictItem.manageGameData !== undefined ?
        textDictItem.manageGameData
        : textDictItemDefault.manageGameData;
        
    const charPicSettingText = textDictItem.charPicSettingText !== undefined ?
        textDictItem.charPicSettingText
        : textDictItemDefault.charPicSettingText;

    const addAnewCharPicText = textDictItem.addAnewCharPicText !== undefined ?
        textDictItem.addAnewCharPicText
        : textDictItemDefault.addAnewCharPicText;

    const confirmAddText = textDictItem.confirmAddText !== undefined ?
        textDictItem.confirmAddText
        : textDictItemDefault.confirmAddText;  
    
    const clkbSettingText = textDictItem.clkbSettingText !== undefined ?
        textDictItem.clkbSettingText
        : textDictItemDefault.clkbSettingText;    
    
    const addAnewButtonText = textDictItem.addAnewButtonText !== undefined ?
        textDictItem.addAnewButtonText
        : textDictItemDefault.addAnewButtonText;

    const addAnewConsequenceText = textDictItem.addAnewConsequenceText !== undefined ?
        textDictItem.addAnewConsequenceText
        : textDictItemDefault.addAnewConsequenceText;
    
    const cancelText = textDictItem.cancelText !== undefined ?
        textDictItem.cancelText
        : textDictItemDefault.cancelText;
    
    const addText = textDictItem.addText !== undefined ?
        textDictItem.addText
        : textDictItemDefault.addText;
    
    const bgmSettingText = textDictItem.bgmSettingText !== undefined ?
        textDictItem.bgmSettingText
        : textDictItemDefault.bgmSettingText;

    const collapseText = textDictItem.collapseText !== undefined ?
        textDictItem.collapseText
        : textDictItemDefault.collapseText;

    const textContentText = textDictItem.textContentText !== undefined ?
        textDictItem.textContentText
        : textDictItemDefault.textContentText;
    
    const speakerNameText = textDictItem.speakerNameText !== undefined ?
        textDictItem.speakerNameText
        : textDictItemDefault.speakerNameText;

    const withTextFrameText = textDictItem.withTextFrameText !== undefined ?
        textDictItem.withTextFrameText
        : textDictItemDefault.withTextFrameText;

    const selectOperationDefaultMaintain = textDictItem.selectOperationDefaultMaintain !== undefined ?
        textDictItem.selectOperationDefaultMaintain
        : textDictItemDefault.selectOperationDefaultMaintain;


//TODO15




    const positionMaxX = 1200, positionMaxY = 1200, widthMax = 1200, heightMax = 1200;

    let name = "/gamenodeconvpiecedatasec";

    const [displayGameDataButton, setDisplayGameDataButton] = useState(true);
    const [gameDataListLocal, setGameDataListLocal] = useState(gameDataList === undefined ? {} : gameDataList);

    const [lookingPieceNumber, setLookingPieceNumber] = useState(pieceNum);

    const [hintTextAreaOverflow, setHintTextAreaOverflow] = useState(false);

    const [bgpicAdd, setBgPicAdd] = useState(true);
    const [charPicAdd, setCharPicAdd] = useState(true);
    const [textContentInfoAdd, setTextContentInfoAdd] = useState(true);
    const [clickableAdd, setClickableAdd] = useState(true);
    const [bgMusicAdd, setBgMusicAdd] = useState(true);
    const [voicelineAdd, setVoicelineAdd] = useState(true);
    const [rmSelectorOpen, setRmSelectorOpen] = useState(false);
    const [isLooping, setIsLooping] = useState(true);
    const [anotherCharpic, setAnotherCharPicOpen] = useState(false);

    const [charPicDataTable, setCharPicDataTable] = useState([]);

    const [userSelectedTextContentToEdit, setUserSelectedTextContentToEdit] = useState(((pieceNum-1) >= 0 && allPieceData[pieceNum-1]["content"]) === "" ? false : true);

    const [displayStndButtonAdd, setDisplayStndButtonAdd] = useState(false);
    const [stndButtonDataTable, setStndButtonDataTable] = useState([]);
    const [stndButtonSound, setStndButtonSound] = useState("default sound"); //TODO test
    const [stndButtonText, setStndButtonText] = useState(""); //TODO test

    const [stndButtonConsequenceArrayLocal, setStndButtonConsequenceArrayLocal] = useState([]); //TODO refactor
    const [stndButtonConsequenceMap, setStndButtonConsequenceMap] = useState([]); //TODO refactor

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

    const [allPiecesDataLocal, setAllPiecesDataLocal] = useState(allPieceData);


    //TODO200
    const [currentSinglePieceDetail, setCurrentSinglePieceDetail] = useState(
        allPieceData.length > 0 ?
        ({
        "num": pieceNum, 
        "isContentNotClkb": allPieceData[pieceNum-1]["isContentNotClkb"],
        "content": allPieceData[pieceNum-1]["content"], 
        "displayTextFrame": allPieceData[pieceNum-1]["displayTextFrame"],
        "speaker_name": allPieceData[pieceNum-1]["speaker_name"], 
        "bgp_source_varname": allPieceData[pieceNum-1]["bgp_source_varname"], 
        "bgp_pos_x": allPieceData[pieceNum-1]["bgp_pos_x"], 
        "bgp_pos_y": allPieceData[pieceNum-1]["bgp_pos_y"], 
        "bgp_width": allPieceData[pieceNum-1]["bgp_width"], 
        "bgp_height": allPieceData[pieceNum-1]["bgp_height"], 
        "bgp_action": allPieceData[pieceNum-1]["bgp_action"],
        "chp_map": allPieceData[pieceNum-1]["chp_map"], 
        "chp_action": allPieceData[pieceNum-1]["chp_action"], 
        "stnd_btn_arr": allPieceData[pieceNum-1]["stnd_btn_arr"], // fetch/in side
        "bgm_source_varname": allPieceData[pieceNum-1]["bgm_source_varname"], 
        "bgm_action": allPieceData[pieceNum-1]["bgm_action"],
        "bgm_loop": allPieceData[pieceNum-1]["bgm_loop"], 


   
    }) : 
        {
            "num": 1, 
            "isContentNotClkb": true,
            "content": "", 
            "speaker_name": "", 
            "bgp_pos_x": 0, 
            "bgp_pos_y": 0, 
            "bgp_width": 800, 
            "bgp_height": 600, 
            "bgp_source_varname": "",
            "chp_map": [], 
            "stnd_btn_arr": [], 
            "bgm_loop": true, 
            "bgm_source_varname": "",
            "displayTextFrame": true,
            "bgp_action": "maintainBgp", 
            "chp_action": "maintainCharPicArr",
            "bgm_action": "maintainBgm", 
    }, 


    );

    const [audioList, setAudioList] = useState([]);
    const [visualList, setVisualList] = useState([]); 

    const [setterPreviewBgmSource, setSetterPreviewBgmSource] = useState("");
    const [setterPreviewBgmPause, setSetterPreviewBgmPause] = useState(false);

    const [charaPreviewing, setCharaPreviewing] = useState({});


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
    //    const allPiece = getAllPieceData();
    //    if (allPiece === undefined || allPiece === null || allPiece.length === 0) {
    //        setAllPiecesDataLocal([]);  
     //   } else if (allPiece !== allPiecesDataLocal) {
 //           setAllPiecesDataLocal(allPiece);  
    //    }
                            console.log("piece-setter render once! \n\t*** useEffect ... allPiecesDataLocal is ", allPiecesDataLocal);
console.log("audiolist = ", audioList);


        let uiLangTemp = getUILanguage();
        setLanguageCodeTextOption(uiLangTemp);

        if (firstTimeEnter === true) {
            /* initialization of project-resource-list in drop-down list */
                                                                            // fetchProjResourceLists(); //TODO remove later
            // TODO fetch visualList and audioList from cloud-db to setup the local lists
            //TODO1: fetch game data for the first time

            getGameDataDesignListFromOuterLayer();

            // const allPiece = getAllPieceData();
            setAllPiecesDataLocal(allPieceData);  


            let receivedPieceNum = getCurrentPieceNum();
            setCurrentSinglePieceDetail(allPieceData[receivedPieceNum]);
            setLookingPieceNumber(receivedPieceNum+1);
            setStndButtonDataTable(allPieceData[receivedPieceNum]["stnd_btn_arr"] === undefined ? [] : allPieceData[receivedPieceNum]["stnd_btn_arr"]);
            
            
            const item = initializeCharaPreviewingFromTemplate();
            setCharaPreviewing(item);




            setFirstTimeEnter(false);
        }

        getGameDataDesignListFromOuterLayer();

        let bgmSourceUrlTemp = resourceVarToUrl_local(audioList, allPieceData[lookingPieceNumber-1]["bgm_source_varname"]);
        setSetterPreviewBgmSource(bgmSourceUrlTemp);

     //   console.log("0bgm now is ...", bgmSourceUrlTemp);

                                                                    //TODO prev-strategy for resource-updating
                                                                    // let isUdpateResource = fetch Rm UpdatedSignal(); 
                                                                    // if (isUdpateResource === true) {
                                                                    //     console.log("isUdpateResource???");
                                                                    //     fetch Proj Resource Lists();
                                                                    //     respondUpdatedRm();
                                                                    // } //TODO prev-strategy for resource-updating

        let visList = getVisualList();
        setVisualList(visList);
        let auList = getAudioList();
        setAudioList(auList);

        //console.log("\t\tin piece-setter... resource = ", visList, " ... \n\t\t\t", auList);

       // console.log("currentSinglePieceDetail = ", currentSinglePieceDetail);
        
        console.log("piece-setter - charPicDataTable = ", charPicDataTable);


    });

    // function stndBtnFromMapToArr(map1) {
    //     let arrTemp = [];
    //     Object.keys(map1).
    //map((currKey) => {
    //         arrTemp.push(map1[currKey]);
    //     })

    //     arrTemp.sort((a,b) => a.seq - b.seq);

    //     setStndButtonDataTable(arrTemp);

    //                             console.log("conversion -- from map = ", map1, " to Arr ... ", arrTemp);

    //     return arrTemp;
    // }

    // function stndBtnFromArrToMap(arr) {
    //     let map1 = {};

    //     arr.
    //map((item, index)=>{
    //         let obj = item;
    //         obj["seq"] = index;
    //         map1[index] = obj;
    //     })

    //                             console.log("conversion -- from arr. ", arr, " to map = ", map1);


    //     return map1;
    // }


    function getGameDataDesignListFromOuterLayer() {
        let tempObj = getGameDataDesignList();
        setGameDataListLocal(tempObj);
        
        
                                                        console.log("!!! piece-setter. getGameDataDesignListFromOuterLayer : ", tempObj);

    }

    function changeLoopingSetting() {
        let tempObj = currentSinglePieceDetail;
        tempObj["bgm_loop"] = !isLooping;
        updateToCaller(tempObj);

        setIsLooping(!isLooping);
    }

    function handleTextContentEnter(event) {
        let contentStr = event.target.value;
        let checkRes = checkRowLengthOverflow(contentStr);
        setHintTextAreaOverflow(checkRes);

        
        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "content": contentStr});
        let tempObj = currentSinglePieceDetail;
        tempObj["content"] = contentStr;
        updateToCaller(tempObj);
    }

    function checkRowLengthOverflow(content) {
        let boolVal = false;
        let arr = content.match(/[^\r\n]+/g);
        arr.forEach(
            (element) => {
                if (element.length > 36) {
                    boolVal = true;
                }          
            }
        );

        return boolVal;
    }

    function handleSpeakerNameEnter(event) {
        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "speaker_name": event.target.value});
        let tempObj = currentSinglePieceDetail;
        tempObj["speaker_name"] = event.target.value;

        updateToCaller(tempObj);
    }

    function handleStndBtnReset() {
     
       // let emptyMap = {}; //TODO test later
        let emptyArr = []
   //     setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "stnd_btn_map": emptyMap, "stnd_btn_arr": emptyArr}); //TODO test later
        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "stnd_btn_arr": emptyArr});

        let tempObj = currentSinglePieceDetail;
    //    tempObj["stnd_btn_map"] = emptyMap;
        tempObj["stnd_btn_arr"] = emptyArr;
        updateToCaller(tempObj);

        setStndButtonDataTable([]);

        setStndButtonText("");
        setStndButtonConsequenceArrayLocal([]);
        setStndButtonConsequenceMap({});

        setDisplayStndButtonAdd(false);
        setStndBtnConseqGDataItemSelected("");
        setStndBtnConseqGDataTypeSelected("");
        setStndBtnConseqBecomeAmount("");

    }

    function handleTextContentReset() {
        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "speaker_name": "", "content": ""});
        let tempObj = currentSinglePieceDetail;
        tempObj["speaker_name"] = "";
        tempObj["content"] = "";


        updateToCaller(tempObj); 
    }

    function handleBgpSwitchAction(event) {

            setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgp_action": event.target.value});
            let tempObj = currentSinglePieceDetail;
            tempObj["bgp_action"] = event.target.value;

            updateToCaller(tempObj);   
    }

    function handleCharPicArrSwitchAction(event) {

        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "chp_action": event.target.value});
        let tempObj = currentSinglePieceDetail;
        tempObj["chp_action"] = event.target.value;

        updateToCaller(tempObj);   
}


    function toggleBgPicOption() {
        setBgPicAdd(!bgpicAdd);
    }

    function toggleCharPicOption() {
        setCharPicAdd(!charPicAdd);
    }

    function toggleContentInfoOption() {
        setTextContentInfoAdd(!textContentInfoAdd);
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

        setTextContentInfoAdd(false);
        setClickableAdd(false);

        setBgMusicAdd(false);
        setVoicelineAdd(false);
    }

    function expandAllOptions() {
        setBgPicAdd(true);
        setCharPicAdd(true);

        setTextContentInfoAdd(true);
        setClickableAdd(true);
        
        setBgMusicAdd(true);
        setVoicelineAdd(true);
    }

    function initializeCharaPreviewingFromTemplate() {
        const item = {};
        Object.keys(characterPictureCurrTemplate).map((currKey) => {
            item[currKey] = characterPictureCurrTemplate[currKey];
        });

        return item;
    }



    function changeAddAnotherCharPicOption() { 
                             
        if (anotherCharpic === true) { // now true (open)
            setAnotherCharPicOpen(false); // to collapse the "add-new" panel
            sendOutPrvwCharaPic(-1); // not previewing anything


        } else { //anotherCharpic now false(closed) -> to expand the "add-new" panel
            setAnotherCharPicOpen(true);
                                                   
            let previewObj = initializeCharaPreviewingFromTemplate();
            setCharaPreviewing(previewObj);

            //TODO500 notify outer-layer!!!
            sendOutPrvwCharaPic(previewObj);
        }

    }

    function confirmAddingAnotherCharPicToTable() {

            // update to cloud db for this field: character-pic 
           let tempTable = charPicDataTable;

           let tempArrPreviewing = {};
           Object.keys(charaPreviewing).map((currKey) => {
               tempArrPreviewing[currKey] = charaPreviewing[currKey];            
           });

           tempTable.push(tempArrPreviewing);
           setCharPicDataTable(tempTable);


           let tempPieceDetail = currentSinglePieceDetail;

           let tempTableMap = {};
           tempTable.map((item, index) => {
               tempTableMap[index] = item;
           });


           tempPieceDetail["chp_map"] = tempTableMap;
           tempPieceDetail["chp_preview"] = tempArrPreviewing;

           setCurrentSinglePieceDetail({...currentSinglePieceDetail,  
               "chp_map": tempTableMap, 
               "chp_preview": tempArrPreviewing
           });
           
           updateToCaller(tempPieceDetail); //TODO test

           changeAddAnotherCharPicOption();
    }


    function jumpToPrevPiece() {
        if (lookingPieceNumber > 1) {
            setLookingPieceNumber(lookingPieceNumber-1);
            //TODO change *all* form content here in display...

            //TODO: fetch "lookingPieceNumber-2"'s data            
            //TODO temp
            setCurrentSinglePieceDetail(allPiecesDataLocal[lookingPieceNumber-2]);
            console.log("\t\tjump-prev -> ", allPiecesDataLocal[lookingPieceNumber-2]);

            
            // let bgmSourceUrlTemp = resourceVarToUrl_local(audioList, allPieceData[lookingPieceNumber-2]["bgm_source_varname"]);
            // setSetterPreviewBgmSource(bgmSourceUrlTemp);

            setStndButtonDataTable(allPiecesDataLocal[lookingPieceNumber-2]["stnd_btn_arr"] !== undefined ? allPiecesDataLocal[lookingPieceNumber-2]["stnd_btn_arr"] : []);
            
            let boolVal = allPiecesDataLocal[lookingPieceNumber-2]["content"] !== undefined ? (allPiecesDataLocal[lookingPieceNumber-2]["content"] == "") : false;
            setUserSelectedTextContentToEdit(!boolVal);
            


            let charMapTemp = allPiecesDataLocal[lookingPieceNumber-2]["chp_map"];
            let charArr = [];
            Object.keys(charMapTemp).map((currKey) => {
                charArr.push(charMapTemp[currKey]);
            })

            setCharPicDataTable(
                charMapTemp !== undefined 
                ? charArr 
                : []
            );

             
            assignPreviewIndex(lookingPieceNumber-2); // TODO note : number = index+1, index = num-1
            sendOutPrvwCharaPic(-1);

        } 


    }

    function jumpToNextpiece() {
        if (lookingPieceNumber < allPiecesDataLocal.length) {
            setLookingPieceNumber(lookingPieceNumber+1);
            //TODO change *all* form content here in display...
            
            setCurrentSinglePieceDetail(allPiecesDataLocal[lookingPieceNumber]);
            console.log("\t\tjump-prev -> ", allPiecesDataLocal[lookingPieceNumber]);

            // let bgmSourceUrlTemp = resourceVarToUrl_local(audioList, allPieceData[lookingPieceNumber]["bgm_source_varname"]);
            // setSetterPreviewBgmSource(bgmSourceUrlTemp);

         
            setStndButtonDataTable(allPiecesDataLocal[lookingPieceNumber]["stnd_btn_arr"] !== undefined ? allPiecesDataLocal[lookingPieceNumber]["stnd_btn_arr"] : []);

            let boolVal = allPiecesDataLocal[lookingPieceNumber]["content"] !== undefined ? (allPiecesDataLocal[lookingPieceNumber]["content"] == "") : false;
            setUserSelectedTextContentToEdit(!boolVal);
            
            let charMapTemp = allPiecesDataLocal[lookingPieceNumber]["chp_map"];
            let charArr = [];
            Object.keys(charMapTemp).map((currKey) => {
                charArr.push(charMapTemp[currKey]);
            })

            setCharPicDataTable(
                charArr !== undefined 
                ? charArr 
                : []);

            assignPreviewIndex(lookingPieceNumber); // TODO note : number = index+1, index = num-1
            sendOutPrvwCharaPic(-1);
        } 

    }


    function updateToCaller(obj) {
        //TODO later: conclude all the current info in this piece, update to the caller's update-function

        let newPieceData = [];

        let i = 0;
        console.log("before changing and updateing to caller..", allPiecesDataLocal); //TODO test
        for (; i < allPiecesDataLocal.length; i++) {
            if (i+1 !== lookingPieceNumber) {
                newPieceData.push(allPiecesDataLocal[i]);
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
        let tempObj = currentSinglePieceDetail;
        tempObj["chp_map"] = tempCharPicDataTable;

        updateToCaller(tempObj);
        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "chp_map": tempCharPicDataTable});
    }


    function onChangeCharPicDataPosX(event) {
 

        setCharaPreviewing({...charaPreviewing, "posX": event.target.value});

        let objTemp = charaPreviewing;
        objTemp["posX"] = event.target.value;

        //TODO500 notify outer-layer
        sendOutPrvwCharaPic(objTemp);

    }

    function onChangeCharPicDataPosY(event) {

        setCharaPreviewing({...charaPreviewing, "posY": event.target.value});

        let objTemp = charaPreviewing;
        objTemp["posY"] = event.target.value;

        //TODO500 notify outer-layer
        sendOutPrvwCharaPic(objTemp);

    }

    function onChangeCharPicDataW(event) {

        setCharaPreviewing({...charaPreviewing, "width": event.target.value});

        let objTemp = charaPreviewing;
        objTemp["width"] = event.target.value;

        //TODO500 notify outer-layer
        sendOutPrvwCharaPic(objTemp);

    }

    function onChangeCharPicDataH(event) {

        setCharaPreviewing({...charaPreviewing, "height": event.target.value});

        let objTemp = charaPreviewing;
        objTemp["height"] = event.target.value;

        //TODO500 notify outer-layer
        sendOutPrvwCharaPic(objTemp);

    }

    function onChangeCharPicDataScale(event) {     

        setCharaPreviewing({...charaPreviewing, "scale": event.target.value});

        let objTemp = charaPreviewing;
        objTemp["scale"] = event.target.value;

        //TODO500 notify outer-layer
        sendOutPrvwCharaPic(objTemp);

    }

    function onChangeCharPicDataVar(event) {

        setCharaPreviewing({...charaPreviewing, "picVar": event.target.value});

        let objTemp = charaPreviewing;
        objTemp["picVar"] = event.target.value;

        //TODO500 notify outer-layer
        sendOutPrvwCharaPic(objTemp);

    }


    function setupBgpInfo(event) {
//TODO improve in future

        let varName = event.target.value;
        console.log("setupBgpInfo var = ", varName); //TODO test
             
        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgp_source_varname": varName});

        let tempObj = currentSinglePieceDetail;
        tempObj["bgp_source_varname"] = varName;
        updateToCaller(tempObj);
        
    }

    function resetBgpInfo() {
        let tempObj = currentSinglePieceDetail;
        tempObj["bgp_source_varname"] = "";
        tempObj["bgp_pos_x"] = "";
        tempObj["bgp_pos_y"] = "";
        tempObj["bgp_width"] = "";
        tempObj["bgp_height"] = "";
        updateToCaller(tempObj);


        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgp_source_varname": "", "bgp_pos_x": "", "bgp_pos_y": "", "bgp_width": "", "bgp_height": ""});
    }
    

    function setupDisplayTextFrame(boolVar) {
        let isDisplay = boolVar;
                                                            console.log("isDisplay???" , isDisplay); //TODO test
        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "displayTextFrame": isDisplay});
        let tempObj = currentSinglePieceDetail;
        tempObj["displayTextFrame"] = isDisplay;
        updateToCaller(tempObj);

    }

    function setupBgmInfo(event) {
        let val = event.target.value
        let tempObj = currentSinglePieceDetail;
        tempObj["bgm_source_varname"] = val;
        updateToCaller(tempObj);

        let urlTemp = resourceVarToUrl_local(audioList, val);
        setSetterPreviewBgmSource(urlTemp);

        setCurrentSinglePieceDetail({...currentSinglePieceDetail, "bgm_source_varname": event.target.value});
    }

    function resourceVarToUrl_local(list, varName) {
        return resourceVarToUrl_vm(list, varName);
    }


    function setupVoicelineInfo(event) {
        let varName = event.target.value;
        let urlArr = audioList.filter((e)=>(e["var"] === varName));
        let tempObj = currentSinglePieceDetail;

        if (urlArr.length == 0) {
            tempObj["vl_source_link"] = "default-none";
            setCurrentSinglePieceDetail({...currentSinglePieceDetail, "vl_source_link": "default-none", "vl_source_varname": varName});
        } else {
            let url =  urlArr[0]["url"];
            tempObj["vl_source_link"] = url;
            setCurrentSinglePieceDetail({...currentSinglePieceDetail, "vl_source_link": url, "vl_source_varname": varName});
        }
        tempObj["vl_source_varname"] = varName;

        updateToCaller(tempObj);        
    }


    function resetAddingCharPicRow() {
        let previewObj = initializeCharaPreviewingFromTemplate();
        setCharaPreviewing(previewObj);
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


        let tempObj = currentSinglePieceDetail;
        tempObj["clkb_previewing"] = tempClkbPreviewing;
        updateToCaller(tempObj);

        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "clkb_previewing": tempClkbPreviewing});
    }
  
    function removeRowInStndButtonTable(index) {
        let tempStndButtonTb = stndButtonDataTable.filter((item) =>(item !== stndButtonDataTable[index]));
        setStndButtonDataTable(tempStndButtonTb);

    //    let updatedMap = stndBtnFromArrToMap(tempStndButtonTb);

        let tempObj = currentSinglePieceDetail;
     //   tempObj["stnd_btn_map"] = updatedMap; //TODO change to map
        tempObj["stnd_btn_arr"] = tempStndButtonTb;
        updateToCaller(tempObj);


    //    setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "stnd_btn_map": updatedMap, "stnd_btn_arr": tempStndButtonTb}); // TODO test later
        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "stnd_btn_arr": tempStndButtonTb}); // TODO test later

    }

    function removeFromStndButtonConseqList(index) {
        let tempConseq = stndButtonConsequenceArrayLocal.filter((item) =>(item !== stndButtonConsequenceArrayLocal[index]));
        setStndButtonConsequenceArrayLocal(tempConseq);
    }

    function putConseqArrToMap() {
        let currMap = {};

        stndButtonConsequenceArrayLocal.map((item, index) => {
            let obj = {
                "name": item[0],
                "action": item[1],
                "newVal": item[2],
                "type": item[3]
            }
            currMap["name"] = obj;
        })

        setStndButtonConsequenceMap(currMap);
        return currMap;
    }


//TODO0
  return (
      
    <div 
    >



    <div className="pieceSetterArea userChoice pieceEditingLeftArea"         
        style={{
            "userSelect": "none"
        }}>        
        

{/* piece-changing panel starts here */}

        <button onClick={()=>{backToList();}}>← {listText}</button><br></br>
        <br></br>

        <div className="buttonRight90">
            {(lookingPieceNumber > 1) &&
                <button onClick={()=>{
                    jumpToPrevPiece();
                }} className="pairGroup"> ↑ </button>}
            {(lookingPieceNumber === 1) &&
                <button className="pairGroup unclickableButton"> ↑ </button>}

            {(lookingPieceNumber < allPiecesDataLocal.length) &&
            <><br></br>
            <button onClick={()=>{
                jumpToNextpiece();    
            }} className="pairGroup"> ↓ </button>
            </>}    
            {(lookingPieceNumber >= allPiecesDataLocal.length) &&
            <><br></br>
            <button className="pairGroup unclickableButton"> ↓ </button>
            </>}
                         

        </div>



        <div className="buttonRight50">
            <button onClick={collapseAllOptions}> {collapseAllText} </button>
            <button onClick={expandAllOptions}> {expandAllText} </button>
        </div>
        <br></br>
        <br></br>
{/* piece-changing panel end here */}

            <label>Piece: {lookingPieceNumber}</label>
            <br></br>

    {/* selection1-text_content */}
            <input type="radio"
                value={userSelectedTextContentToEdit}
                checked={userSelectedTextContentToEdit}
                onChange={()=>{
                    if (!userSelectedTextContentToEdit === true) {
                        let response = window.confirm("Are you sure to switch to Text Content? (The settings for Clickables / Buttons will reset.)")
                        if (response === true) {
                            setUserSelectedTextContentToEdit(true);
                            setTextContentInfoAdd(true);
                            setClickableAdd(false); 
                            handleStndBtnReset();
                        }
                        }
                    
                }}
            ></input><label className="textNoSelect"
                onClick={()=>{
                    if (!userSelectedTextContentToEdit === true) {
                        let response = window.confirm("Are you sure to switch to Text Content? (The settings for Clickables / Buttons will reset.)")
                        if (response === true) {
                            setUserSelectedTextContentToEdit(true);
                            setTextContentInfoAdd(true);
                            setClickableAdd(false); 
                            handleStndBtnReset();
                        }
                    }
                }}
            >Text Content</label><br></br>
            <div className="indentOne">

            </div>


    {/* selection2-clickables/buttons */}
            <input type="radio"
                value={userSelectedTextContentToEdit}
                checked={!userSelectedTextContentToEdit}
                onChange={()=>{
                    if (userSelectedTextContentToEdit === true) {
                      //  let response = window.confirm("Are you sure to switch to Clickables / Buttons? (The settings for Text Content will reset.)")
                      //  if (response === true) {
                            setUserSelectedTextContentToEdit(false);
                            setTextContentInfoAdd(false);
                            setClickableAdd(true);
                            handleTextContentReset();
                            setupDisplayTextFrame(false);
                       // }
                    }

                }}
            ></input><label className="textNoSelect"
                onClick={()=>{
                    if (!userSelectedTextContentToEdit === false) {
                       let response = window.confirm("Are you sure to switch to Clickables / Buttons? (The settings for Text Content will reset.)")
                       if (response === true) {
                            setUserSelectedTextContentToEdit(false);
                            setTextContentInfoAdd(false);
                            setClickableAdd(true);
                            handleTextContentReset();
                            setupDisplayTextFrame(false);
                       }
                    }
                }}
            >Clickables / Buttons</label><br></br>
            <div className="indentOne">

            </div>
            <br></br><br></br><br></br><br></br>


           

            <br></br>
            <br></br>
            {(textContentInfoAdd && userSelectedTextContentToEdit) && <>
            <button className="collapseToggle" onClick={toggleContentInfoOption}>{textContentSettingText}  ︽</button>
            <br></br>
            </>
            }
            
            {(!textContentInfoAdd && userSelectedTextContentToEdit) && <>
            <button className="collapseToggle" onClick={toggleContentInfoOption}>{textContentSettingText}  ︾
            </button>
            <br></br>
            </>}

            {(!userSelectedTextContentToEdit) && 
            <><button className="collapseToggleGrey">{textContentSettingText} - </button>
            <br></br></>}


            {/* text-content edit area */}
            {(textContentInfoAdd && userSelectedTextContentToEdit) && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" 
                        onClick={() =>{handleTextContentReset()}}> 
                            {resetText} 
                    </button>
                    
                    <br></br>

                    <label> {textContentText }: </label>
                    <br></br>
                    <div className="indentOne">
                        <textarea
                            wrap="off"
                            maxLength="160"
                            rows="4" cols="36"
                            value={currentSinglePieceDetail["content"]}
                            onChange={(event)=>{
                                handleTextContentEnter(event);
                            }}
                            onBlur={()=>{
                                if (hintTextAreaOverflow === true) {
                                    alert("Please adjust content -- one or multiple line(s) too long");
                                }
                            }}
                        >
                        {currentSinglePieceDetail["content"]}
                        </textarea>
                        <input type="checkbox" value={currentSinglePieceDetail["displayTextFrame"]} 
                        checked={currentSinglePieceDetail["displayTextFrame"]} 
                        onChange={()=>{
                            if (currentSinglePieceDetail["displayTextFrame"] === false) { // going to be true
                                setupDisplayTextFrame(true);
                            } else { //currentSinglePieceDetail["displayTextFrame"] === true, going to be false
                                setupDisplayTextFrame(false);
                            }                
                        }}
                
                        ></input>
                        <label
                        style={{"userSelect": "none"}}
                        onClick={()=>{
                            if (currentSinglePieceDetail["displayTextFrame"] === false) { // going to be true
                                setupDisplayTextFrame(true);
                            } else { //currentSinglePieceDetail["displayTextFrame"] === true, going to be false
                                setupDisplayTextFrame(false);
                            }                   
                        }}
                        >{withTextFrameText}</label>

                    </div>

                    <br></br>
                    <label>{speakerNameText}:  </label>

                    <input value={currentSinglePieceDetail["speaker_name"]} onChange={(event)=>{handleSpeakerNameEnter(event);}}></input>
                </div>   
            }


            {(clickableAdd && !userSelectedTextContentToEdit) && 
            <><button className="collapseToggle" onClick={toggleclickableAddOption}>{clkbSettingText}  ︽</button>
            <br></br>
            </>}
            {(!clickableAdd && !userSelectedTextContentToEdit) && 
            <><button className="collapseToggle" onClick={toggleclickableAddOption}>{clkbSettingText}  ︾</button>
            <br></br>
            </>}


            {(userSelectedTextContentToEdit) &&
            <><button className="collapseToggleGrey">{clkbSettingText}  - </button>
            <br></br>
            </>}



            {/* button/clickables edit area */}
            {(clickableAdd && !userSelectedTextContentToEdit) && 
                <div className="optionAreaSelected2">
           
                <button className="buttonRight" onClick={() =>{
                    console.log("TODO reset...");
                    //TODO
                    
                    }}> {resetText} </button>

                    {/* sub-section: standard-button */}
                    <div><label>Standard Button/Option Group</label>
                        <div className="indentOne">

                        <table style={{"width": "400px"}}>
                            <thead>
                            <tr>
                                <th style={{"width": "70px"}}>Index</th>
                                <th style={{"width": "110px"}}>Button Text</th>
                                <th style={{"width": "160px"}}>Consequence</th>
            
                            </tr>
                            </thead>
                            
                            <tbody>

                                {/* TODO problematic here... */}
                             
                                {stndButtonDataTable.map((item, index) => {  
                                   let keyStr = "stndButtonTable-" + index;  
                                   let conseqItem = item["conseq"];
                                   
                                     if (item === undefined || item === null || conseqItem === undefined || conseqItem === null) {
                                       return;
                                   } else {

                                   
                                        
                                        console.log("stnd-button-table... item[conseq] = ", item["conseq"]);

                                        return (
                                                <tr key={keyStr}>
                                                    <td>{index}</td>
                                                    <td>{item["buttonText"]}</td>
                                                   
                                                {item !== undefined && item["conseq"] !== undefined &&  
                                                    <td>
                                                        {Object.keys(item["conseq"]).map((currKey)=>{
                                                            let elem = item["conseq"][currKey];
                                                            let str = "[" + elem["name"] + "], " + elem["action"] + " => [" + elem["newVal"] + "]";
                                                            return (<label key={keyStr}>{str}<br></br></label>);
                                                        })}
                                                    </td>
                                                    } 

                                                 
                                                    <td>
                                                        <GiTrashCan 
                                                            className="cursor_pointer iconButtonSmall" 
                                                            onClick={()=>{
                                                                //TODO1 remove item of current index from stndButtonDataTable
                                                                removeRowInStndButtonTable(index);
                                                            }} />
                                                    </td>
                                                </tr>
                                            
                                                );
                                    
                                    }
                                }
                                )
                            } 
                                
                            </tbody>
                    
                        </table>
                        {!displayStndButtonAdd && <button onClick={()=>{
                            setDisplayStndButtonAdd(!displayStndButtonAdd);
                        }}>
                            {addAnewButtonText}
                        </button>}
                        {displayStndButtonAdd && <button onClick={()=>{
                            setDisplayStndButtonAdd(!displayStndButtonAdd);
                        }}>-- {collapseText} --
                        </button>}
                       


                        {displayStndButtonAdd && 
                        <div className="purpleArea">

                            <label>Button Text:</label>
                            <input value={stndButtonText} onChange={(event)=>{
                                setStndButtonText(event.target.value);
                            }}></input>

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
                                    {stndButtonConsequenceArrayLocal.map((item, index) => {  
                                        let keyStr = "stndButton-" + index+ "-conseq-";  
                                    return (
                                        <tr className="clickableListItem3" key={keyStr}>
                                            <td>{item[0]}</td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>
                                                <GiTrashCan className="cursor_pointer iconButtonSmall" 
                                                    onClick={()=>{
                                                        removeFromStndButtonConseqList(index);
                                                    }}  
                                                />
                                            </td>
                                        </tr>
                                );
                        })}
                                </tbody>

                            </table>
                            {!isStndBtnAddNewConsq && <button className="indentOne" onClick={()=>{
                                setIsStndBtnAddNewConsq(!isStndBtnAddNewConsq);
                                }}>{addAnewConsequenceText}</button>}
                            {isStndBtnAddNewConsq && 
                    <div className="orangeArea indentOne">

                    <label>Target of change: </label>

                    <br></br><label>Game-data Item Type: {stndBtnConseqGDataTypeSelected}</label><br></br>

                    <select onChange={(event)=>{
                                setStndBtnConseqGDataItemSelected(event.target.value);
                            
                                    if (event.target.value === "") {
                                        return;
                                    }
                                    setStndBtnConseqGDataTypeSelected(gameDataListLocal[event.target.value]["data_type"]);
                            }} 
                            value={stndBtnConseqGDataItemSelected}>
                        <option value="" key="defaultGameDataItem"> -- Select Game Data Item --</option>
                        {/* //TODO1000 */}
                        {Object.keys(gameDataListLocal).map((currKey) => {
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            let keyStr = "gameData" + gameDataListLocal[currKey]["name"];
                            return (
                                
                                <option value={currKey} key={keyStr}>{currKey}</option>
                            );
                        })}
                    </select>
                    {displayGameDataButton && <button onClick={()=>{openGameDataManager()}}> {manageGameData} </button>}


                    <br></br><br></br>

                    <div>

                    
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
                        </>}
                    </div>



                    
                    {stndBtnConseqGDataTypeSelected === "number" &&
                    <div>
                
                {stndBtnConseqGDataTypeSelected === "number" && <input type="radio" value={stndBtnConseqIsAssignValue} checked={!stndBtnConseqIsAssignValue} onChange={()=>{setStndBtnConseqIsAssignValue(false);}}></input>}
                    <label>Change Value</label>
                    <br></br>
                    <label>Operation: </label>
                    <select value={consequenceStndBtnIsPlus} onChange={(event)=>{setConsequenceStndBtnIsPlus(event.target.value);}}>
                        <option value="" key="defaultOperation"> -- Select Operation -- </option>
                        <option value="plus" key="plus"> Plus </option>
                        <option value="minus" key="minus"> Minus </option>
                    </select>      
                    <label>TODO</label>
                        <input onChange={(event)=>{setStndBtnConseqBecomeAmount(event.target.value);}}></input>
                    </div>}

                    <br></br>

                    <button onClick={()=>{
                        setIsStndBtnAddNewConsq(false);
                        setStndBtnConseqGDataItemSelected("");
                        setStndBtnConseqGDataTypeSelected("");
                    
                    }}>{cancelText}</button> 

                    <button className="buttonRight"
                        onClick={()=>{
                         //note: it is acceptable if the game-designer makes no consequence for this button ... (e.g. just for player UX, etc.)
                         


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
                        obj.push(stndBtnConseqGDataTypeSelected); //TODO add data-type! //[3] "number", "boolean", "string"
                      
                        /* push to stndButtonConsequenceArrayLocal */
                        let arrTemp = stndButtonConsequenceArrayLocal;
                        arrTemp.push(obj);
                        setStndButtonConsequenceArrayLocal(arrTemp);
                        setIsStndBtnAddNewConsq(false);



                    }}>{addText}</button>

                    </div>}
                    </div>
                    <br></br>

                    <button className="buttonRight" onClick={()=>{
                        if (stndButtonText === "") {
                            return;
                        }

                        let tableTemp = stndButtonDataTable;


                        let obj = {};
                        obj.buttonText = stndButtonText;

                        let conseqMap = putConseqArrToMap(); //TODO29
                        obj.conseq = conseqMap;
                        
                        tableTemp.push(obj);


                        setStndButtonDataTable(tableTemp);

                        let tempObj = currentSinglePieceDetail;
                        
                                            // let updatedMap = stndBtnFromArrToMap(tableTemp);
                                            // tempObj["stnd_btn_map"] = updatedMap;
                        tempObj["stnd_btn_arr"] = tableTemp;

                        updateToCaller(tempObj);

                        // console.log("current standard-button group: "); //TODO test
                        // console.log(tableTemp); //TODO test

                    //    setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "stnd_btn_map": updatedMap, "stnd_btn_arr": tableTemp}); //TODO test later
                        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "stnd_btn_arr": tableTemp});


                        setStndButtonText("");
                        setStndButtonConsequenceArrayLocal([]);
                        setDisplayStndButtonAdd(false);
                        setStndBtnConseqGDataItemSelected("");
                        setStndBtnConseqGDataTypeSelected("");
                        setStndBtnConseqBecomeAmount("");
                    }}
                    >{confirmAddText}</button>
                        
                        </div>}


                        </div>
                    
                    </div>

                    {/* <br></br>
                    <label>2. Custom Clickable(s)</label> */} 
                    {/* //TODO2 future */}
{/*                     
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
                            {cstmClkbDataTable.
                                map((item, index) => {
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
                                    </>}
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

                                    {visual List.
                                        map((item, index) => {
                                        let keyStr = "clickable-" + index + "-" + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select>
                                <button onClick={() => {openRm()}}>Manage Resource</button>
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

                                    {cstmClkbConsequenceArray.
                                        map((item, index) => {  
                                    //    console.log("2clickable: item = ", item);       
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

                    <br></br><label>Game-data Item Type: {cstmClkbConseqGDataTypeSelected}</label><br></br>

                    <select onChange={(event)=>{
                                setCstmClkbConseqGDataItemSelected(event.target.value);
                                console.log("selected game data (consq) = ");
                                console.log(event.target.value);
                                // if (event.target.value !== "nextNodePointer") {
                         
                                    if (event.target.value === "") {
                                        return;
                                    }
                                    setCstmClkbConseqGDataTypeSelected(gameDataListLocal[event.target.value]["data_type"]);
                              
                                // } else {
                                
                                //     setCstmClkbConseqGDataTypeSelected("nodePointer");
                                // }
                            }} 
                            value={cstmClkbConseqGDataItemSelected}>
                        <option value="" key=""> -- Select Game Data Item --</option>
                        {Object.keys(gameDataListLocal).
                            map((currKey) => {
                            // format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'}
                            let keyStr = "gameData" + gameDataListLocal[currKey]["name"];
                            return (
                                
                                <option value={currKey} key={keyStr}>{currKey}</option>
                            );
                        })}
                    </select>
                    {displayGameDataButton && <button onClick={()=>{openGameDataManager()}}>  ︾</button>}

                    <br></br><br></br>

                    <div>

                  
                    
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

                        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "cstm_clkb_arr": tableTemp});
                        
                        let tempObj = currentSinglePieceDetail;
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
  
        */}
               
                </div>
                              
                }
            
            {!bgpicAdd
            && <button className="collapseToggle" onClick={toggleBgPicOption}>{bgpSettingText}  ︾</button>}
            {bgpicAdd
            && <button className="collapseToggle" onClick={toggleBgPicOption}>{bgpSettingText}  ︽</button>}
            <br></br>


            {/* background picture edit area */}
            {bgpicAdd && 
                <div className="optionAreaSelected2">

                    <button className="buttonRight" onClick={() =>{resetBgpInfo()}}> {resetText} </button>
                    <br></br>
                    <label>Operation: </label>
                    <select 
                        value={currentSinglePieceDetail["bgp_action"]}
                        onChange={(event)=>{
                            handleBgpSwitchAction(event);
                        }}
                    >
                        <option key="bgpOperationDefaultMaintain" value="maintainBgp">-- {selectOperationDefaultMaintain} --</option>
                        <option key="switchToNewBgp" value="switchToNewBgp">switchToNew</option>
                    </select>


                    {currentSinglePieceDetail["bgp_action"] === "switchToNewBgp" && <div className="indentOne">
                        <label>Source:  </label>
                        <select value={currentSinglePieceDetail["bgp_source_varname"]} onChange={(event)=>{setupBgpInfo(event);}}>
                            <option key="bgp01" value=""> -- Select picture name -- </option>
                            <option key="bgp_NoPic" value="">(no picture)</option>
                            {visualList.map((item, index) => {
                                let keyStr = "bgp-" + index + item["var"];
                                return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                            })}

                        </select>
                        <button onClick={() => {openRm()}}>{manageResourceText}</button>  

{/* //TODO600 */}
                        <br></br>  
                        <label>This one Fading in: </label>
                        <select>
                            <option>No (default)</option>
                            <option>Yes</option>
                        </select>

                        <br></br>

                        <label>Previous Fading Out: </label>
                        <select>
                            <option>No (default)</option>
                            <option>Yes</option>
                        </select>

                    </div>}
                            
                
                </div>}

            {!charPicAdd && <button className="collapseToggle" onClick={toggleCharPicOption}>{charPicSettingText}  ︾</button>}
            {charPicAdd && <button className="collapseToggle" onClick={toggleCharPicOption}>{charPicSettingText}  ︽</button>}
            <br></br>


            {/* character picture(s) edit area */}
            {charPicAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{console.log("TODO reset...")}}> {resetText} </button>
                    <br></br>
                    <label>Operation: </label>
                    <select 
                        value={currentSinglePieceDetail["chp_action"]}
                        onChange={(event)=>{
                            handleCharPicArrSwitchAction(event);
                        }}>
                            <option key="maintainCharPicArr" value="maintainCharPicArr">-- {selectOperationDefaultMaintain} --</option>
                            <option key="changeCharPicArr" value="changeCharPicArr">Change Character-List</option>
                    </select>
                    <br></br>


                    {/* currentSinglePieceDetail["chp_action"] === "changeCharPicArr" */}
            {true  && 
            <div>
            <table style={{"width": " 500px"}}>
            <thead>        
                <tr>
                    <th style={{"width": "30px"}}>Source</th>
                    <th style={{"width": "20px"}}>X</th>
                    <th style={{"width": "20px"}}>Y</th>
                    <th style={{"width": "20px"}}>W</th>
                    <th style={{"width": "20px"}}>H</th>
                    <th style={{"width": "20px"}}>Scale</th>
                    <th style={{"width": "30px"}}>Fade In</th>
                    <th style={{"width": "30px"}}>Move</th>
                    <th style={{"width": "30px"}}>Delete</th>
{/* //TODO500 */}


                </tr>
            </thead>
            <tbody>
                {charPicDataTable.map((item, index) => {
               //     console.log("!!! charPicDataTable - item = ", item);

                    let keyStr = "charPicDataTable-" + index;
                    return (
                        <tr key={keyStr}>
                            {charPicDataTable.length > 0 && 
                            <td>{item["picVar"]}</td>}
                            <td>{item["posX"]}</td>
                            <td>{item["posY"]}</td>
                            <td>{item["width"]}</td>
                            <td>{item["height"]}</td>                    
                            <td>{item["scale"]}x</td>
                            <td>(true or false TODO)</td>
                            <td>(true or false TODO)</td>

                                {(charPicDataTable.length > 0 && currentSinglePieceDetail["chp_action"] === "changeCharPicArr") && 
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
            
            {currentSinglePieceDetail["chp_action"] === "changeCharPicArr" && 
            <>
                <button onClick={()=>{
                        changeAddAnotherCharPicOption();
                    }}
                >
                    {anotherCharpic === true ? "Cancel" : addAnewCharPicText}
                </button>
            
            </>}

    </div>
    }




{/* new-character-picture adding area */}
     {(anotherCharpic === true && currentSinglePieceDetail["chp_action"] === "changeCharPicArr") &&
    <>
        <br></br>

    <label>Source:  </label>
    <select 
        value={charaPreviewing["picVar"]} 
        onChange={(event)=>{onChangeCharPicDataVar(event);}}

    >
        <option key="charp01" value=""> -- Select picture name -- </option>

        {visualList.map((item, index) => {
            let keyStr = "charpic" + index + item["var"];
            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
        })}
    </select >

    <button onClick={() => {openRm()}}>{manageResourceText}</button>
    <br></br>
    <label>Position x:      </label>
    <input type="number" min="0" max={positionMaxX} step="1" 
        value={charaPreviewing["posX"]}
        onChange={(event)=>{onChangeCharPicDataPosX(event);}}></input>
    <input className="slider" type="range" min="0" max={positionMaxX} value={charaPreviewing["posX"]} onChange={(event)=>{onChangeCharPicDataPosX(event);}}></input>
    <br></br>
    <label>Position y:      </label>
    <input type="number" min="0" max={positionMaxY} step="1" value={charaPreviewing["posY"]} onChange={(event)=>{onChangeCharPicDataPosY(event);}}></input>
    <input className="slider" type="range" min="0" max={positionMaxY} value={charaPreviewing["posY"]} onChange={(event)=>{onChangeCharPicDataPosY(event);}}></input>
    <br></br>
    <label>Width:         </label>
    <input type="number" min="0" max={widthMax} step="1" value={charaPreviewing["width"]} onChange={(event)=>{onChangeCharPicDataW(event);}}></input>
    <input className="slider" type="range" min="0" max={widthMax} value={charaPreviewing["width"]} onChange={(event)=>{onChangeCharPicDataW(event);}}></input>
    <br></br>
    <label>Height:        </label>
    <input type="number" min="0" max={heightMax} step="1" value={charaPreviewing["height"]} onChange={(event)=>{onChangeCharPicDataH(event);}}></input>
    <input className="slider" type="range" min="0" max={heightMax} value={charaPreviewing["height"]} onChange={(event)=>{onChangeCharPicDataH(event);}}></input>
    <br></br>
    <label>Scale: </label>
    <input type="range" className="slider" min="1" max="10" step="1" value={charaPreviewing["scale"]}
        onChange={(event)=>{
            onChangeCharPicDataScale(event);
        }}></input><label>{charaPreviewing["scale"]}x</label>

    <br></br>
    <button 
    onClick={()=>{ // confirm add to character-pic-list

        if (charaPreviewing["picVar"] === "") {
            console.log("warning: variable cannot be empty"); //TODO warning popping

        } else {
            // update to cloud db for this field: character-pic 
            confirmAddingAnotherCharPicToTable();

        }
    

    }}>
        {confirmAddText}
    </button>       
    
</>}


{/* END of :     new-character-picture adding area */}

            
            
            </div>}

            {!bgMusicAdd && <button className="collapseToggle" onClick={toggleBgMusicAddOption}>{bgmSettingText}  ︾</button>}
            {bgMusicAdd && <button className="collapseToggle" onClick={toggleBgMusicAddOption}>{bgmSettingText}  ︽</button>}
            <br></br>

            {/* background music edit area */}
            {bgMusicAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{
                        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgm_loop": ""});
                        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgm_volume": ""});
                        setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgm_source_varname": ""});}}> {resetText} </button>
                    <br></br>
                    <label>Operation: </label>
                    <select value={currentSinglePieceDetail["bgm_action"]}
                        onChange={(event)=>{
                            if (event.target.value === "naturalStopBgm") {
                                let tempObj = currentSinglePieceDetail;
                                tempObj["bgm_loop"] = false;
                                tempObj["bgm_action"] = event.target.value;
                                updateToCaller(tempObj);

                                setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgm_action": event.target.value, "bgm_loop": false});
                                setIsLooping(false);
                            } else {
                                let tempObj = currentSinglePieceDetail;
                                tempObj["bgm_action"] = event.target.value;
                                updateToCaller(tempObj);

                                setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgm_action": event.target.value});
                            }
                    }}>
                        <option key="maintainBgm" value="maintainBgm">-- {selectOperationDefaultMaintain}--</option>
                        <option key="startNewBgm" value="startNewBgm">start new</option>
                        <option key="stopBgm" value="stopBgm">stop playing (immediately)</option>
                        <option key="naturalStop" value="naturalStopBgm">naturally stop looping (after finish)</option>
                    </select>

                    {currentSinglePieceDetail["bgm_action"] === "startNewBgm" && <div>
                        <label>Source:  </label>
                        
                        <select value={currentSinglePieceDetail["bgm_source_varname"]} 
                            onChange={(event)=>{
                                setupBgmInfo(event);
                            }}>
                            <option key="bgm01" value=""> -- Select music name -- </option>

                            {audioList.map((item, index) => {
                                let keyStr = "bgmusic-" + index + item["var"];
                                return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                            })}
                        </select>
                        <button onClick={() => {openRm()}}>{manageResourceText}</button>
             
                        <label>Preview Music</label>  

                        <div className="indentOne">

                            <audio
                                id={audioPlayerId}
                                src={setterPreviewBgmSource} 
                                loop={isLooping}
                                style={{
                                    "height": "30px",
                                }}  
                                controls
                            />
       
                            {/* {setterPreviewBgmPause === false && <button
                                onClick={()=>{
                                    setSetterPreviewBgmPause(true);
                                    audioElem.pause();

                                }}
                            >Pause</button>}
                            {setterPreviewBgmPause === true && <button
                                onClick={()=>{
                                    if (audioElem.src === undefined || audioElem.src === null || audioElem.src.length == 0) {
                                        audioElem.src = setterPreviewBgmSource;
                                    }
                                    setSetterPreviewBgmPause(false);
                                    audioElem.play();
                                }}
                            >Play</button>} */}

                        </div>
        
{/* //not used in current design -- simplified

                        <br></br>
                        <label>Volume:         </label>
                        <input type="range" min="0" max="100" step="1"
                            value={currentSinglePieceDetail["bgm_volume"]}
                            onChange={(event)=>{
                                let val = event.target.value;

                                sendOutBgmVol(val); //TODO107 send-out to editor and preview compo

                                let tempObj = currentSinglePieceDetail;
                                tempObj["bgm_volume"] = val;
                                updateToCaller(tempObj);

                                setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgm_volume": val});
                            }}
                        ></input>
                        <input type="number" min="0" max="100" step="1"
                            value={currentSinglePieceDetail["bgm_volume"]}
                            onChange={(event)=>{
                                let val = event.target.value;
                                
                                sendOutBgmVol(val); //TODO107 send-out to editor and preview compo

                                let tempObj = currentSinglePieceDetail;
                                tempObj["bgm_volume"] = val;
                                updateToCaller(tempObj);

                                setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "bgm_volume": val});
                            }}                        
                        
                        ></input> 
//not used in current design -- simplified                        
                        */}

                        {/* {currentSinglePieceDetail["bgm_action"] === "startNewBgm" && <div>
                            <label>Loop:  </label>
                            <input type="checkbox" checked={isLooping} onChange={()=>{changeLoopingSetting()}}/>
                        </div>}
                        <br></br> 
//not used in current design -- simplified
                        */}

                        </div>}
                </div>}
                





            {/* {!voicelineAdd && <button className="collapseToggle" onClick={toggleVoicelineAddOption}>Voiceline Setting  ︾</button>}
            {voicelineAdd && <button className="collapseToggle" onClick={toggleVoicelineAddOption}>Voiceline Setting  ︽</button>}

            {voicelineAdd && 
                <div className="optionAreaSelected2">
                    <button className="buttonRight" onClick={() =>{setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "vl_source_link": ""});setCurrentSinglePieceDetail({...currentSinglePieceDetail,  "vl_volume": ""});}}> reset </button>
                    <br></br>
                    <label>Source:  </label>
                    <select value={currentSinglePieceDetail["vl_source_varname"]}
                    onChange={(event)=>{setupVoicelineInfo(event);}}
                    >
                        <option key="vl" value=""> -- Select voiceline name -- </option>
   
                        {audioList.
                            map((item, index) => {
                            return (<option key={index} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select>
                    <button onClick={() => {openRm()}}>Manage Resource</button>
                    <br></br>
                    <label>Volume:         </label>
                    <label>TODO</label>
                    <input type="number" min="0" max="200" step="1"></input>
                </div>}
         */}

        <br></br>

        <br></br>
        <br></br>
        <br></br>


    {/* bottom changing panel starts here */}
        <div className="buttonRight90">
            {(lookingPieceNumber > 1) &&
                <button onClick={()=>{
                    jumpToPrevPiece();
                }} className="pairGroup"> ↑ </button>}
            {(lookingPieceNumber === 1) &&
                <button className="pairGroup unclickableButton"> ↑ </button>}

            {(lookingPieceNumber < allPiecesDataLocal.length) &&
            <><br></br>
            <button onClick={()=>{
                jumpToNextpiece();    
            }} className="pairGroup"> ↓ </button>
            </>}    
            {(lookingPieceNumber >= allPiecesDataLocal.length) &&
            <><br></br>
            <button className="pairGroup unclickableButton"> ↓ </button>
            </>}              

        </div>

        <br></br>
        <br></br>
        <div className="buttonRight50">
            <button onClick={()=>{collapseAllOptions()}}> {collapseAllText} </button>
            <button onClick={()=>{expandAllOptions()}}> {expandAllText} </button>
        </div>

    {/* bottom changing panel ends here */}

  </div>

  </div>
 
    );
}
