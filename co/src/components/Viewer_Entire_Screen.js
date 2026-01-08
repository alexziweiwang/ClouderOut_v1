import { useState, useEffect } from 'react';
import NavigationPreview from './NavigationPreview';
import DuringGameScreen_AllNodeTypeContainer from './DuringGameScreen_AllNodeTypeContainer';

import { configureGameProgress_vm } from '../viewmodels/CalcAc_ViewerEntireAc';
import { initializeGameDataTracker_vm } from '../viewmodels/PrepAc_ViewerEntireAc';
import { defaultScreenWidth, defaultScreenHeight, sizeLookupMap } from './_dataStructure_DefaultObjects';
import { resourceRawListToUsableMap_vm } from '../viewmodels/PrepAc_Conversion';
import { replaceSpaceWithUnderline } from '../viewmodels/PrepAc_Conversion';
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

export default function Viewer_Entire_Screen({

//TODO99999 fetch static-metadata and static-all-node-contents from oute
    getAllChaptersContent,

    initialNavObj, //TODO remove
    initialChapterList,  //TODO remove

    initialGameProgress,

    initialCurrChapterAllNodeMapping, //single chapter
    
    firstChapterData,

    visualVarPairList,
    audioVarPairList, 

    initialPlayerGameDataTracker,  //TODO remove (emu or in-prac)
    initialPlayerProfile, //TODO remove (emu or in-prac)
    initialPlayerAccountSettings, //TODO remove (emu or in-prac)
    initialPlayerSlRecords, //TODO later (emu or in-prac)
    initialShopItemInfo,
    initialPlayerPurchaseInfo,



    notifyUpdateCurrentStanding, //game-progress related, send to outer-layer
    notifyNodeWalk, //game-progress related, send to outer-layer
    notifyChapterWalk, //game-progress related, send to outer-layer
    notifyCurrGdt,

    getOriginalGdtracker,
    slOption,
    slEntireObj,

    projectname,
    username,

    uiLangOption,
    
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

    const storyPageNameLocal = "Chapter Selection Page";
    const mainPageNameLocal = "Main Page";

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
        : defaultScreenWidth;

    const screenHeight = ((initialNavObj !== undefined && Object.keys(initialNavObj).length > 0) 
            &&
            (initialNavObj["screenSize"] === "16:9(horizonal)"
                || initialNavObj["screenSize"] === "16:9(vertical)"
                || initialNavObj["screenSize"] === "4:3(horizonal)"
                || initialNavObj["screenSize"] === "4:3(vertical)")) 
        ? sizeLookupMap[initialNavObj["screenSize"]][1] 
        : defaultScreenHeight;
    
    const [gameSettingsScaleObj, setGameSettingsScaleObj] = useState({});
    //"settingPage-playSpeed"
    //"settingPage-bgmVol"
    //"settingPage-seVol"
    //TODO109

    const [bgmSource, setBgmSource] = useState("");
    const [bgmLoopOption, setBgmLoopOption] = useState(true);
    const [bgmSingleVolume, setBgmSingleVolume] = useState(90);



    const [currChapterAllNodesContent, setCurrChapterAllNodesContent] = useState(firstChapterData); //TODO200
    const [allContent, setAllContent] = useState(-3);

    // const [chapterList, setChapterList] = useState(initialChapterList);  
        //TODO change chapter-list to non-dynamic-data later - directly from outer-layer is ok



    const [playerGameDataTracker, setPlayerGameDataTracker] = useState(initialPlayerGameDataTracker !== undefined ? initialPlayerGameDataTracker : {});
    const [playerProfile, setPlayerProfile] = useState(initialPlayerProfile); 
                            //TODO later: "setPlayerProfile" for local-ver(curr-test only) if player did change in player-profile nav-page...

    const [playerAccount, setPlayerAccount] = useState({});
    const [playerSLRecords, setPlayerSLRecords] = useState(initialPlayerSlRecords); //TODO changes to sl-page...


    //TODO implementation plan:
    //when doing this level of testing or game-in-practice, fetch player's above 4 data from cloud
    //for testing the entire game, use default-testing-player's data, otherwise use cloud-fetched data
    //consider topics about player authentication for game-in-practice


    

              




    //TODO (with "changing" during in-game actions)
    const [navPageStatus, setNavPageStatus] = useState(mainPageNameLocal); //This is tracked here (when "playing" starts)




//game-data tracker
//progress-tracker: current-chapter & current-node
//path deciding parts

//TODO settled/fixed data
//resource maps (visual & audio) [settled once started]
//node-inside-content: 
            // conv-node
            // card-game, or board-game, etc.
               






    const [currentGameStatusProgress, setCurrentGameStatusProgress] = useState(initialGameProgress); // important - for game-progress



    const [isOpenSettingsPage, setOpenSettingsPage] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        setAudioElem(document.getElementById(audioPlayerId));

        if (firstTimeEnter === true) {
                                                console.log("!!!!!!! viewer-entire: entered as first-time,  ");
                                                
                                                
                                                console.log("init-game-data = ", initialPlayerGameDataTracker); //for each test-run
                                                console.log("init-player-profile = ", initialPlayerProfile);
                                                console.log("init-player-account = ", initialPlayerAccountSettings);
                                                console.log("initial chapter list: ", initialChapterList);
                                                console.log("firstChapterData = ", firstChapterData);
            
            initializeGameDataTracker_local(initialPlayerGameDataTracker);

            let allCnt = getAllChaptersContent();
            setAllContent(allCnt);
                                                console.log("fetched(init) all-chapter-nodes: ", allCnt);
                               
            //chapterList[0]
            let chapterList = initialChapterList;
            if (chapterList.length > 1) {


                // let firstChapterInfo = chapterList[1]; // the first one is placeholder_chapter

                // let firstChapterKey = firstChapterInfo[0];
                // let firstChapterTitle = firstChapterInfo[1];

                // let chpContent = notifyChapterWalk(firstChapterKey, firstChapterTitle); // cloud related (outer layer)
                
                
                // setCurrChapterAllNodesContent(chpContent);

                //console.log("\t\tchapter-list not empty, FIRST CHAPTER = ", firstChapterInfo, "\t\tentering this chapter: ", chpContent, "\t\tnode mapping = ", initialCurrChapterAllNodeMapping);




                //TODO by node-mapping & start-node, get the very first node's name and type
                //initialCurrChapterAllNodeMapping

                
             //   let currChapterAllNodes = initialCurrChapterAllNodeMapping[firstChapterKey];
                //TODO900 change node-start and node-end key names when chapter being created...
                                                            // chapterStartKeyStr = "chapterStart";
                                                            // chapterStartTitleStr = "Chapter Start"
                                                        //nodeType:"*chapterStart*", 


                                                            // chapterEndKeyStr = "chapterEnd";
                                                            // chapterEndTitleStr = "Chapter End";
                                                        //nodeType:"*chapterEnd*", 

                notifyNodeWalkLocalViewer("chapterStart", "*chapterStart*")


            }

            //initialize all game-progress-items
            configureGameProgress_local("", "", "", mainPageNameLocal, "");             
            //TODO test




            setFirstTimeEnter(false);
        } else {


                //in useEffect
                if (currentGameStatusProgress["pageStatus"] === "During Game" 
                    && 
                    (currChapterAllNodesContent === -1)
                ) {
                    if (currentGameStatusProgress["chapterKey"].length > 0) {
                                                            console.log("\t\t non-empty currentGameStatusProgress chapter-key: ", currentGameStatusProgress);
                        let keyStrTemp = currentGameStatusProgress["chapterKey"];
                        let ftd = filterChapterNode(keyStrTemp);
                                                            console.log("allContent = ", allContent, "\n filtered: ", ftd);
                    
                    } else {
                                                            console.log("\t\t*** empty currentGameStatusProgress chapter-key: ", currentGameStatusProgress);

                    }
                    

                } else if (currentGameStatusProgress["pageStatus"] === mainPageNameLocal
                    || currentGameStatusProgress["pageStatus"] === storyPageNameLocal) {
                                                            console.log("@@@ reset all-nodes-content");
                    setCurrChapterAllNodesContent(-1);

                }
        }

 



//console.log("viewer-entire ... currentGameStatusProgress = ", currentGameStatusProgress);

    });

            
    // useEffect(()=>{
    //     console.log("changed currChapterAllNodesContent:", currChapterAllNodesContent, "\n at ", currentGameStatusProgress["pageStatus"]);
    // }, [
    //     currChapterAllNodesContent
    // ]);

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
        
        slOpChapListPageCheck(pageName);

        let obj = {};
        obj["pageStatus"] = pageName;
        obj["chapterKey"] = currentGameStatusProgress["chapterKey"];
        obj["nodeKey"] = currentGameStatusProgress["nodeKey"];
        obj["nodeType"] = currentGameStatusProgress["nodeType"];
        obj["chapterTitle"] = currentGameStatusProgress["chapterTitle"];

        notifyUpdateCurrentStanding(obj);
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

    function passInSlObj() {
        return slEntireObj;
    }

    function notifyNodeWalkLocalViewer(nodeKeyName, nodeTypeName) {
        let temp = currentGameStatusProgress;
        temp["nodeKey"] = nodeKeyName;
        temp["nodeType"] = nodeTypeName;
        setCurrentGameStatusProgress(temp);

        notifyNodeWalk(nodeKeyName, nodeTypeName);
    }

    function triggerWalkToCurrChapterLocalViewer(chapterKeyName, chapterTitleName) {

        // for Viewer_Entire_Screen's local data-records
        let temp = currentGameStatusProgress;
        temp["nodeKey"] = "chapterStart";
        temp["nodeType"] = "*chapterStart*";
        temp["chapterKey"] = chapterKeyName;
        temp["chapterTitle"] = chapterTitleName;
        setCurrentGameStatusProgress(temp);




        // trigger for actual progress-walking (by outer-layer)
        let chpContent = notifyChapterWalk(chapterKeyName, chapterTitleName); // cloud related (outer layer)


        //TODO900 fetch chapter-content?
                                console.log("@@@ view-entire level - triggerWalkToCurrChapterLocalViewer called... chpContent = ", chpContent);

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
        notifyUpdateCurrentStanding(obj);
    }

    function getGameSettingScaleObjFromSubCompoViewer(data) {

        let bgmVolScale = parseFloat(data["settingPage-bgmVol"]).toFixed(2) / 100;

        changeBgmVolume(bgmVolScale);
        
        
        setGameSettingsScaleObj(data);

    }

    function getGameDataTrackerFromSubCompo(gdtObj) {
                                            console.log("viewing: gdt now is : ", gdtObj);
        setPlayerGameDataTracker(gdtObj);
        notifyCurrGdt(gdtObj);
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

    function filterChapterNode(chapterKeyStr) {
        if (chapterKeyStr === undefined || chapterKeyStr.length === 0) {
            return -2;
        }

        let cntt = {};
        
        Object.keys(allContent).map((currKey) => {
            let item = allContent[currKey];
            if (item["chapterKey"] === chapterKeyStr) {
                cntt[currKey] = item;
            }

        }
        );

        if (cntt === undefined) {
            cntt = -1;

        }
        setCurrChapterAllNodesContent(cntt);

        return cntt;
   }

   function passInAllContent() {
       return allContent;
   }

   function slOpChapListPageCheck(pageNameTemp) { //TODO important
       if (pageNameTemp === storyPageNameLocal) {
            //todo check if sl-option is chapter-experience: if so, then reset gmdt-tracker
            if (slOption !== undefined) {
                if (slOption === "chapterExpr") {
                    let ogdt = getOriginalGdtracker();
                    setPlayerGameDataTracker(ogdt);

                    //TODO999999999999
                }
            }


       }
   }

   function returnToStoryPage() {
        setNavPageStatus(storyPageNameLocal);
        slOpChapListPageCheck(storyPageNameLocal);

        setCurrentGameStatusProgress({
            ...currentGameStatusProgress,
            
            "pageStatus": storyPageNameLocal,
            "chapterKey": "",
            "nodeKey": "",
            "nodeType": "",
            "chapterTitle": "",
       });
   }

   function triggerSlSlotWritePressed(slotSeqNum) {
    
        let timestampString = new Date();
        let titleString = currentGameStatusProgress["chapterTitle"] + replaceSpaceWithUnderline(timestampString);


        let objTemp = {
            "gameDataSet": playerGameDataTracker,
            "titleStr": titleString,
            "timestampStr": timestampString,
            "stepStanding": currentGameStatusProgress

        };

                    console.log("writing to sl-slot... ", slotSeqNum, "\n obj = ", objTemp);

        //change playing-emu-sl data: <slotSeqNum, objTemp>
        setPlayerSLRecords({...playerSLRecords, 
            slotSeqNum: objTemp
        })


        return objTemp;

   }

   function triggerSlSlotReadPressed(slotSeqNum) {
        let recordItem = playerSLRecords[slotSeqNum];

        //TODO trigger to change standing from recordItem["stepStanding"]

        //TODO change game-data-set from recordItem["gameDataSet"]



   }
    
   function triggerSLPageToSave_ve(slModeFlag) {
       // inside during-game-phase, need to pop sl-page window?

        //TODO change nav-preview first: from page-change to pop-window op
        //TODO then... open or close this window, with op to navigate if load... or save all info if save...

        
        if (slModeFlag === "write") {
            //enter save-page of sl
            //TODO

        } else if (slModeFlag === "read") {
            //enter load-page of sl
            //TODO

        } else {
            //TODO not doing sl-operations...

        }

   }
    



return ( 
/*{ <> 

<div>
    <div> }*/
      
        <div 
            style={{"position": "relative", "marginLeft": (screenWidth > screenHeight) ? "170px" : "320px"}}>
      


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

                                          <DuringGameScreen_AllNodeTypeContainer

                                                getNodeType={passInNodeType}
                                                getChapterKey={passInChapterKey} 
                                                getNodeKey={passInNodeKey}
                                                getChapterTitle={passInChapterTitle}
                                                getCurrChapterDataContainer={passInCurrChapterAllNodesContent}
                                                getAllContent={passInAllContent}

                                                notifyNodeWalk={notifyNodeWalkLocalViewer}     
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
                                                sendOutGdt={getGameDataTrackerFromSubCompo}
                                                
                                                returnToStoryPage={returnToStoryPage}

                                                triggerSLPageToSave={triggerSLPageToSave_ve}


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
                        onEditingSlPageTab={false}
                        triggerSlSlotWritePressed={triggerSlSlotWritePressed}
                        triggerSlSlotReadPressed={triggerSlSlotReadPressed}
                        isInPrac={true}

                        chapterData={initialChapterList} 
                        fetchPageName={passInNavPageName} 

                        triggerUpdateCurrPageName={updateNavPageName}
                        triggerUpdateCurrentStanding={updateCurrentStandingViewerLocal}

                        isEditing={false}

                        initialGameDataRefData={playerGameDataTracker}
                        initialPlayerProfileRefData={playerProfile}
                        initialPlayerAccountRefData={playerAccount}
                        initialSlSlotsData={initialPlayerSlRecords}

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


 

/*    </div>



</div>

    
 </> */
);

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