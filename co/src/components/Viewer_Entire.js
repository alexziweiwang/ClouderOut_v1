import { useState, useEffect } from 'react';
import NavigationPreview from './NavigationPreview';
import DuringGameScreen_AllNodeTypeContainer from './DuringGameScreen_AllNodeTypeContainer';

import { configureGameProgress_vm } from '../viewmodels/CalcAc_ViewerEntireAc';
import { initializeGameDataTracker_vm } from '../viewmodels/PrepAc_ViewerEntireAc';
import { sizeLookupMap } from './_dataStructure_DefaultObjects';

import { resourceRawListToUsableMap_vm } from '../viewmodels/PrepAc_Conversion';

/* //TODO
  This component is a View/"screen" *holder* of game-play (both testing-entire and play-in-practice).

  keeps the following
1. game-progress (which chapter, which node, which step/piece, etc.)
    TODO consider separate situation for with-sl and withour-sl, 
    TODO    also with optional "chapter lock" for new players-first time playing
2. in-game-play-data
3. player data: profile, account, sl-records

    initialize/refresh every time when reopening this compo-window
 */


// procedure about game-data-tracker: 
//           when entering this compo, all the non-dynamic data (game-data, player-profile, etc.) version fixed
//           the only notification to outside is to display on the game-data-panel...
//           after closed this compo, all the data-states reset, and next time new viewer-entire still fetches the emu-data
//               that is, not saving anything for the emu-play!


//TODO100 each nav-page would provide option of bgm?? (maintain or start-new)

//level1 (receives static entry-data and starts running)

export default function Viewer_Entire({

//TODO99999 fetch static-metadata and static-all-node-contents from outer!

    initialMetadata,
    initialChapterContent,
    getCurrChapterContent,

    initialNavObj, //TODO remove
    initialChapterList,  //TODO remove
    
    initialCurrChapterAllNodeMapping,

    initialCurrChapterAllNodeMapping, //single chapter

    visualVarPairList,
    audioVarPairList, 

    initialPlayerGameDataTracker,  //TODO remove (emu or in-prac)
    initialPlayerProfile, //TODO remove (emu or in-prac)
    initialPlayerAccountSettings, //TODO remove (emu or in-prac)
    initialPlayerSlRecords, //TODO later (emu or in-prac)
    initialShopItemInfo,
    initialPlayerPurchaseInfo,



    triggerUpdateCurrentStanding, //game-progress related, send to outer-layer
    triggerNodeWalk, //game-progress related, send to outer-layer
    triggerChapterWalk, //game-progress related, send to outer-layer


    projectname,
    username,

    uiLangOption,

    backendOption,
    
}) { //notes: "initialGameData" is this player's cloud-game-data, 
    // and when updating in this compo, it also updates to outside layer

//  "isLocal": the sign for either testing-entire or play-in-practice.
// if isLocal === true, then use this author's emu-player account
// if isLocal === false, then load cloud db for the actual player's info?

    let mutedViewOption = false;

// getCurrChapterKey
// getCurrNodeKey
// getCurrNodeType //TODO


//currentGameProgress names:
// "pageStatus"
// "chapterKey"
// "nodeKey"
// "nodeType"

    function notUsingV(e) {
        return;
    }

    let visualMap = resourceRawListToUsableMap_vm(visualVarPairList, notUsingV);
    let audioMap = resourceRawListToUsableMap_vm(audioVarPairList, notUsingV);

//TODO: for emu, allow the author to setup entering status (game-data) for [each] try of view-testing
//TODO: for emu, allow the author to "add" one or several "emu-player" for long-term testing (not resetting for every view testing)?

    const audioPlayerId = "audio-player";
    let [audioElem, setAudioElem] = useState(document.getElementById(audioPlayerId));

    const languageCodeTextOption = uiLangOption;

    const screenWidth = ((initialNavObj !== undefined && Object.keys(initialNavObj).length > 0) 
            &&
            (initialNavObj["screenSize"] === "16:9(horizonal)"
                || initialNavObj["screenSize"] === "16:9(vertical)"
                || initialNavObj["screenSize"] === "4:3(horizonal)"
                || initialNavObj["screenSize"] === "4:3(vertical)")) 
        ? sizeLookupMap[initialNavObj["screenSize"]][0] 
        : 800;

    const screenHeight = ((initialNavObj !== undefined && Object.keys(initialNavObj).length > 0) 
            &&
            (initialNavObj["screenSize"] === "16:9(horizonal)"
                || initialNavObj["screenSize"] === "16:9(vertical)"
                || initialNavObj["screenSize"] === "4:3(horizonal)"
                || initialNavObj["screenSize"] === "4:3(vertical)")) 
        ? sizeLookupMap[initialNavObj["screenSize"]][1] 
        : 600;
    
    const [gameSettingsScaleObj, setGameSettingsScaleObj] = useState({});
    //"settingPage-playSpeed"
    //"settingPage-bgmVol"
    //"settingPage-seVol"
    //TODO109

    const [bgmSource, setBgmSource] = useState("");
    const [bgmLoopOption, setBgmLoopOption] = useState(true);
    const [bgmSingleVolume, setBgmSingleVolume] = useState(90);



    const [currChapterAllNodesContent, setCurrChapterAllNodesContent] = useState(-1); //TODO200


    const [chapterList, setChapterList] = useState(initialChapterList);  
        //TODO change chapter-list to non-dynamic-data later - directly from outer-layer is ok



    const [playerGameDataTracker, setPlayerGameDataTracker] = useState(initialPlayerGameDataTracker !== undefined ? initialPlayerGameDataTracker : {});
    const [playerProfile, setPlayerProfile] = useState(initialPlayerProfile); 
                            //TODO later: "setPlayerProfile" for local-ver(curr-test only) if player did change in player-profile nav-page...

    const [playerAccount, setPlayerAccount] = useState({});
    const [playerSLRecords, setPlayerSLRecords] = useState({}); //TODO changes to sl-page...


    //TODO implementation plan:
    //when doing this level of testing or game-in-practice, fetch player's above 4 data from cloud
    //for testing the entire game, use default-testing-player's data, otherwise use cloud-fetched data
    //consider topics about player authentication for game-in-practice


    

              




    //TODO (with "changing" during in-game actions)
    const [navPageStatus, setNavPageStatus] = useState("Main Page"); //This is tracked here (when "playing" starts)




//game-data tracker
//progress-tracker: current-chapter & current-node
//path deciding parts

//TODO settled/fixed data
//resource maps (visual & audio) [settled once started]
//node-inside-content: 
            // conv-node
            // card-game, or board-game, etc.
               






    const [currentGameStatusProgress, setCurrentGameStatusProgress] = useState(initialCurrChapterAllNodeMapping); // important - for game-progress



    const [isOpenSettingsPage, setOpenSettingsPage] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        setAudioElem(document.getElementById(audioPlayerId));

        if (firstTimeEnter === true) {
                                                console.log("!!!!!!! viewer-entire: entered as first-time,  ");
                                                
                                                
                                                console.log("init-game-data = ", initialPlayerGameDataTracker); //for each test-run
                                                console.log("init-player-profile = ", initialPlayerProfile);
                                                console.log("init-player-account = ", initialPlayerAccountSettings);
                    
                                                
            
            initializeGameDataTracker_local(initialPlayerGameDataTracker);

                               
            //chapterList[0]
            if (chapterList.length > 0) {


                let firstChapterInfo = chapterList[1]; // the first one is placeholder_chapter


                let firstChapterKey = firstChapterInfo[0];
                let firstChapterTitle = firstChapterInfo[1];

                let chpContent = triggerChapterWalk(firstChapterKey, firstChapterTitle); // cloud related (outer layer)
                
                
                setCurrChapterAllNodesContent(chpContent);

                console.log("\t\tchapter-list not empty, FIRST CHAPTER = ", firstChapterInfo, "\t\tentering this chapter: ", chpContent, "\t\tnode mapping = ", initialCurrChapterAllNodeMapping);




                //TODO by node-mapping & start-node, get the very first node's name and type
                //initialCurrChapterAllNodeMapping

                
                let currChapterAllNodes = initialCurrChapterAllNodeMapping[firstChapterKey];
                //TODO900 change node-start and node-end key names when chapter being created...
                                                            // chapterStartKeyStr = "chapterStart";
                                                            // chapterStartTitleStr = "Chapter Start"
                                                        //nodeType:"*chapterStart*", 


                                                            // chapterEndKeyStr = "chapterEnd";
                                                            // chapterEndTitleStr = "Chapter End";
                                                        //nodeType:"*chapterEnd*", 

                triggerWalkToCurrNodeLocalViewer("chapterStart", "*chapterStart*")


            }

            //initialize all game-progress-items
            configureGameProgress_local("", "", "", "Main Page", "");             
            //TODO test




            setFirstTimeEnter(false);
        }

        if (currChapterAllNodesContent === -1 && currentGameStatusProgress["nodeType"] !== "LogicSplitter") {
            if (currentGameStatusProgress["chapterKey"].length > 0) {
                let anc = getCurrChapterContent(currentGameStatusProgress["chapterKey"]); //TODO369
                setCurrChapterAllNodesContent(anc);

                                                    console.log("\t\t*** Viewer-Entire: currChapterAllNodesContent = ", anc, " with chap-key: ", currentGameStatusProgress["chapterKey"]);
            
            } else {

                                                    console.log("\t\t empty currentGameStatusProgress chapter-key: ", currentGameStatusProgress);

            }
            

        } else {
            setCurrChapterAllNodesContent(-1);

        }
 



//console.log("viewer-entire ... currentGameStatusProgress = ", currentGameStatusProgress);

    });

    function changeBgmVolume(volumeValue) {
        if (audioElem !== null && audioElem !== undefined) {
            console.log("\t\t 300 volume changed! ", volumeValue);
            audioElem.volume = volumeValue;
            
        } else {
            console.log("\t\t 300 volume not changed");
        }
    }

    function getBgmSettingsFromSubCompo(sourceTemp, loopOptionTemp, singleVolumeTemp) {
                                    // console.log(
                                    // "viewer-entire!!! ",
                                    // "fetched from subcompo:  bgm\n sourceTemp = ", sourceTemp,
                                    // ", loopOptionTemp = " ,loopOptionTemp , 
                                    // ",  singleVolumeTemp = ", singleVolumeTemp
                                    // ); //TODO test

        setBgmSource(sourceTemp);
        setBgmLoopOption(loopOptionTemp);
       // setBgmSingleVolume(singleVolumeTemp)
    }

  
    function configureGameProgress_local(nodeTypeVal, chapterKeyVal, nodeKeyVal, pageNameVal, chapterTitleVal) {
        configureGameProgress_vm (
            nodeTypeVal, 
            chapterKeyVal, 
            nodeKeyVal, 
            pageNameVal, 
            chapterTitleVal, 
            currentGameStatusProgress, 
            setCurrentGameStatusProgress
        );
    }




                                                                // function updateGameData(data) { // model's functionality     //TODO refactoring
                                                                //     setPlayerGameDataTracker(data);
                                                                // }


    
    function initializeGameDataTracker_local(dataObj) {
        initializeGameDataTracker_vm(dataObj, setPlayerGameDataTracker);
    }

    

    function notUsing() {
        console.log();
    }

    function passInUiLanguageOption() {
        return languageCodeTextOption;
    }

    function passInNavPageName() {
        return navPageStatus;
    }

    function updateNavPageName(pageName) {
        setNavPageStatus(pageName);        

        let obj = {};
        obj["pageStatus"] = pageName;
        obj["chapterKey"] = currentGameStatusProgress["chapterKey"];
        obj["nodeKey"] = currentGameStatusProgress["nodeKey"];
        obj["nodeType"] = currentGameStatusProgress["nodeType"];
        obj["chapterTitle"] = currentGameStatusProgress["chapterTitle"];

        triggerUpdateCurrentStanding(obj);
    }

    
    function passInPlayerInfoSets() {
        let obj = {};
        let pp = initialPlayerProfile === undefined ? {} : initialPlayerProfile;
        let ua = initialPlayerAccountSettings === undefined ? {} : initialPlayerAccountSettings;
    
        obj["playerProfile"] = pp;
        obj["userAccount"] = ua;
        
        return obj;
      }


    function passInCurrentGameDataList() { //non-emu data
        return playerGameDataTracker;
    }

    function passInNodeType() {
        return currentGameStatusProgress["nodeType"];
    }

    function passInNodeKey() {
        return currentGameStatusProgress["nodeKey"];
    }

    function passInChapterKey() {
        return currentGameStatusProgress["chapterKey"];
    }

    // function p assInShopItemInfo() { //TODO remove later
    //     return g etShopItemInfo();
    // } //TODO remove later

    function passInChapterTitle() {
        return currentGameStatusProgress["chapterTitle"];

    }

    function triggerWalkToCurrNodeLocalViewer(nodeKeyName, nodeTypeName) {
        let temp = currentGameStatusProgress;
        temp["nodeKey"] = nodeKeyName;
        temp["nodeType"] = nodeTypeName;

        setCurrentGameStatusProgress(temp);

        triggerNodeWalk(nodeKeyName, nodeTypeName);
    }

    function triggerWalkToCurrChapterLocalViewer(chapterKeyName, chapterTitleName) {

        // for viewer_entire's local data-records
        let temp = currentGameStatusProgress;
        temp["nodeKey"] = "chapterStart";
        temp["nodeType"] = "*chapterStart*";
        temp["chapterKey"] = chapterKeyName;
        temp["chapterTitle"] = chapterTitleName;
        setCurrentGameStatusProgress(temp);




        // trigger for actual progress-walking (by outer-layer)
        let chpContent = triggerChapterWalk(chapterKeyName, chapterTitleName); // cloud related (outer layer)


        //TODO900 fetch chapter-content?
                                console.log("view-entire level - triggerWalkToCurrChapterLocalViewer called... chpContent = ", chpContent);

        setCurrChapterAllNodesContent(chpContent);

    }

    function passInViewerContainerGameDataTracker() {
        return playerGameDataTracker;
    }

    //TODO if anything in game-data-tracker changes... would notify outer layers?
    function notifyOuterLayerDisplayGameDataTracker() { //TODO temp(before refactor-to-vm for functionalities)
        conveyDisplayGameDataTracker(playerGameDataTracker);


    }

    //TODO21 refactor to VM
    function conveyDisplayGameDataTracker(localData) {
        //TODO 

        
    }

    function passInCurrChapterAllNodeMapping() {
        return initialCurrChapterAllNodeMapping;
    }

    function passInChapterList() {
        return initialChapterList;
    }

    function passInNavObj() {
        return initialNavObj;
    }

    function passInShopItemInfo() {
        return initialShopItemInfo
    }

    function passInPlayerPurchaseInfo() {
        return initialPlayerPurchaseInfo;
    }

    function updateCurrentStandingViewerLocal(obj) {

        // update local standing-obj
        configureGameProgress_local(
            obj["nodeType"], 
            obj["chapterKey"], 
            obj["nodeKey"], 
            obj["pageStatus"], 
            obj["chapterTitle"]
        );

        // send to outer-layer
        triggerUpdateCurrentStanding(obj);
    }

    function getGameSettingScaleObjFromSubCompoViewer(data) {

        let bgmVolScale = parseFloat(data["settingPage-bgmVol"]).toFixed(2) / 100;

        changeBgmVolume(bgmVolScale);
        
        
        setGameSettingsScaleObj(data);

    }

    function passInGameSettingsScaleObj() {
        return gameSettingsScaleObj;
    }


    function passInCurrChapterAllNodesContent() {
        return currChapterAllNodesContent;
    }

    function passInOpenSettingsPage() {
        return isOpenSettingsPage;
    }

    function setOpenSettingsPageSignalTrue() {
        setOpenSettingsPage(true);
    }

    function setOpenSettingsPageSignalFalse() {
        setOpenSettingsPage(false);
    }

    
    



return ( <>

<div>
    <div>

      
        <div style={{"position": "relative", "marginLeft": (screenWidth > screenHeight) ? "170px" : "320px"}}>
      


{/* 
game-screen (specific node) layer */}

                {navPageStatus === "During Game" && 
                    <div style={{
                        "position": "absolute", 
                        "backgroundColor": "orange", 
                        "top": "0px", 
                        "left": "0px",
                        "width": `${screenWidth}px`, 
                        "height": `${screenHeight}px`,
                    }}
                    >

                                          {/*      
                                                    //important: setup entry-gameData-set (if multiple) 
                                          */}

//TODO30: for fetching single-node-data from cloud - when doing the play-view
                                          <DuringGameScreen_AllNodeTypeContainer

                                                getNodeType={passInNodeType}
                                                getChapterKey={passInChapterKey} 
                                                getNodeKey={passInNodeKey}
                                                getChapterTitle={passInChapterTitle}
                                                getCurrChapterDataContainer={passInCurrChapterAllNodesContent}


                                                triggerWalkToCurrNode={triggerWalkToCurrNodeLocalViewer}     
                                                triggerWalkToCurrChapter={triggerWalkToCurrChapterLocalViewer}

//TODO31
                                                initialNodeType={currentGameStatusProgress["nodeType"]}
                                                initialChapterKey={currentGameStatusProgress["chapterKey"]}
                                                initialNodeKey={currentGameStatusProgress["nodeKey"]}
                                                initialChapterTitle={currentGameStatusProgress["chapterTitle"]}

                                                getInitGameDataTracker={passInViewerContainerGameDataTracker}
                                                getCurrChapterAllNodeMapping={passInCurrChapterAllNodeMapping}
                                                getAllChapterList={passInChapterList}

                                                username={username}
                                                projectname={projectname}
                                                uiLanguage={languageCodeTextOption} 
                                                
                                                visualMap={visualMap}
                                                audioMap={audioMap}
                                                mutedViewOption={mutedViewOption}
                                                fetchGameSettings={passInGameSettingsScaleObj}

                                          
                                                openSettingPage={setOpenSettingsPageSignalTrue}
                                                sendOutBgmSettings={getBgmSettingsFromSubCompo}
                                                backendOption={backendOption}
                                />

                                
                    </div>
                }

                {/* //TODO100 
shop layer
                future: shop content div...
                (also able to change game-data-tracker) */}

        


{/* navigation layer */}
                <div style={{
                    "position": "absolute", 
                    "top": "0px", 
                    "left": "0px",
                    "backgroundColor": "purple",
                }}>
                    <NavigationPreview 
                        fetchNavObj={passInNavObj} 

                        chapterData={chapterList} 
                        fetchPageName={passInNavPageName} 

                        triggerUpdateCurrPageName={updateNavPageName}
                        triggerUpdateCurrentStanding={updateCurrentStandingViewerLocal}

                        isEditing={false}

                        initialGameDataRefData={playerGameDataTracker}
                        initialPlayerProfileRefData={playerProfile}
                        initialPlayerAccountRefData={playerAccount}

                        fetchPlayerInfoSets={passInPlayerInfoSets}
                        fetchCurrentGameData={passInViewerContainerGameDataTracker}

                        getUILanguage={passInUiLanguageOption}  //TODO20 languageOption

                        fetchShopItemInfo={passInShopItemInfo}
                        fetchPlayerPurchaseInfo={passInPlayerPurchaseInfo}

                        visualMap={visualMap}
                        audioMap={audioMap}
                        sendOutGameSettingScaleObjFromSubCompo={getGameSettingScaleObjFromSubCompoViewer}

                        getOpenSettingSignal={passInOpenSettingsPage}
                        closeSettingsPage={setOpenSettingsPageSignalFalse}
                    /> 

                    
                    
                    
                                                                {/* //TODO16
                    {/* 
                    //update-PlayerProfile (by player input)
                    //update-PlayerAccountSettings (by player input)
                    //update-PlayerSlRecords (by nav-buttons)
                    //update-CurrentStanding (track by nav-buttons: page-status + chapter-key + node-type + node-key)  */}

                </div>

                <audio 
                    id={audioPlayerId}
                    src={bgmSource} 
                    autoPlay="autoPlay" 
                    controls 
                    loop={bgmLoopOption}
                    style={{
                        "display": "none",
                    }}
                />
        </div>


 

    </div>



</div>

    
</>);

}

// game-running... data parts needed from outer-layer:
    // navigation-obj for the entire game
    // chapter-list
    // UI-language
    // player-game-data
    // player-profile
    // player-account-settings
    // chapter-all-node-mapping
    // first node's node-type, chapter-key, node-key (tracking)
    // current page-name, current chapter-title (tracking)
    // (for the project-locating) user-name + project-name  (+ version code ??)
    // shop-system-related
    // resource(visual+audio) data ...