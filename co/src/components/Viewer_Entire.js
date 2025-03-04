import { useState, useEffect } from 'react';
import NavigationPreview from './NavigationPreview';
import GameScreen_AllNodeTypeContainer from './GameScreen_AllNodeTypeContainer';



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


//TODO200
// procedure about game-data-tracker: 
//           when entering this compo, all the non-dynamic data (game-data, player-profile, etc.) version fixed
//           the only notification to outside is to display on the game-data-panel...
//           after closed this compo, all the data-states reset, and next time new viewer-entire still fetches the emu-data
//               that is, not saving anything for the emu-play!


//TODO100 each nav-page would provide option of bgm?? (maintain or start-new)


export default function Viewer_Entire({


    initialNavObj,
    initialChapterList, 

    uiLangOption,

    initialPlayerGameDataTracker,
    initialPlayerProfile,
    initialPlayerAccountSettings,
    initialPlayerSlRecords, //TODO later

    initialCurrChapterAllNodeMapping,

    triggerUpdateCurrentStanding, //game-progress related, to outer-layer
    triggerNodeWalk, //game-progress related, to outer-layer
    triggerChapterWalk, //game-progress related, to outer-layer


    username,
    projectname,

    initialShopItemInfo,
    initialPlayerPurchaseInfo,

    visualMap,
    audioMap,
    mutedViewOption,


    allNodesContainer



                                //TODO test before removing
                                            // getNodeType, 
                                            // getChapterKey, 
                                            // getNodeKey,
                                            // getPageName,
                                            // getChapterTitle,
                                //TODO test before removing
    
    
}) { //notes: "initialGameData" is this player's cloud-game-data, 
    // and when updating in this compo, it also updates to outside layer

//  "isLocal": the sign for either testing-entire or play-in-practice.
// if isLocal === true, then use this author's emu-player account
// if isLocal === false, then load cloud db for the actual player's info?



// getCurrChapterKey
// getCurrNodeKey
// getCurrNodeType //TODO


//currentGameProgress names:
// "pageStatus"
// "chapterKey"
// "nodeKey"
// "nodeType"

//TODO: for emu, allow the author to setup entering status (game-data) for [each] try of view-testing
//TODO: for emu, allow the author to "add" one or several "emu-player" for long-term testing (not resetting for every view testing)?


    const languageCodeTextOption = uiLangOption;

    const sizeLookupMap = { "16:9(horizonal)": [800, 450],
        "16:9(vertical)": [450, 800],
        "4:3(horizonal)": [800, 600],
        "4:3(vertical)": [600, 800]};
    
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
    //TODO109

//prev-ver. //TODO remove after test
                                        // const [screenWidth, setScreenWidth] = useState(800); //TODO
                                        // const [screenHeight, setScreenHeight] = useState(600); //TODO
                                    
                                                                // then in use Effect...
                                                                    //     if (navigationObj !== undefined && Object.keys(navigationObj).length > 0) { //TODO change to non-dynamic?

                                                                            // if 
                                                                            // (navigationObj["screenSize"] === "16:9(horizonal)"
                                                                            // || navigationObj["screenSize"] === "16:9(vertical)"
                                                                            // || navigationObj["screenSize"] === "4:3(horizonal)"
                                                                            // || navigationObj["screenSize"] === "4:3(vertical)"
                                                                            // ) 
                                                                    //{
                                                                    //             let w = sizeLookupMap[navigationObj["screenSize"]][0];
                                                                    //             let h = sizeLookupMap[navigationObj["screenSize"]][1];
                                                                    //             setScreenWidth(w); // according to navigationObj's size 
                                                                    //             setScreenHeight(h); // according to navigationObj's size 
                                                                    //         }
                                                                    // }
//prev-ver. //TODO remove after test




    const [chapterList, setChapterList] = useState(initialChapterList);  
        //TODO change chapter-list to non-dynamic-data later - directly from outer-layer is ok



    const [playerGameDataTracker, setPlayerGameDataTracker] = useState({});
    const [playerProfile, setPlayerProfile] = useState(initialPlayerProfile); 
                            //TODO later: "setPlayerProfile" for local-ver(curr-test only) if player did change in player-profile nav-page...

    const [playerAccount, setPlayerAccount] = useState({});
    const [playerSLRecords, setPlayerSLRecords] = useState({}); //TODO changes to sl-page...


    //TODO implementation plan:
    //when doing this level of testing or game-in-practice, fetch player's above 4 data from cloud
    //for testing the entire game, use default-testing-player's data, otherwise use cloud-fetched data
    //consider topics about player authentication for game-in-practice


    

                                                                        //TODO remove later
                                                                                            // const [currChapterKey, setCurrChapterKey] = useState("");
                                                                                            // const [currNodeKey, setCurrNodeKey] = useState("");
                                                                                            // const [currNodeType, setCurrNodeType] = useState("");
                                                                        //TODO remove later







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
               






    const [currentGameStatusProgress, setCurrentGameStatusProgress] = useState({

    }); // important - for game-progress






    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {

        if (firstTimeEnter === true) {
                                                console.log("!!!!!!! viewer-entire: entered as first-time");
            initializeGameDataTracker(initialPlayerGameDataTracker);





            //initialize all game-progress-items
            configureGameProgress("", "", "", "Main Page", "");             
            //TODO test




            setFirstTimeEnter(false);
        }



                                        //TODO test before removing...
                                                // let nodeTypeTemp = getNodeType(); //important here!! dont move around
                                                // let chapterKeyTemp = getChapterKey(); //important here!! dont move around
                                                // let nodeKeyTemp = getNodeKey(); //important here!! dont move around
                                                // let pageNameTemp = getPageName(); //important here!! dont move around
                                                // let chapterTitleTemp = getChapterTitle(); //important here!! dont move around
                                                // configureGameProgress(nodeTypeTemp, chapterKeyTemp, nodeKeyTemp, pageNameTemp, chapterTitleTemp); //important here!! dont move around
                                        //TODO test before removing...



console.log("viewer-entire ... currentGameStatusProgress = ", currentGameStatusProgress);

    });

  
    //TODO21 refactor to VM
    function configureGameProgress(nodeTypeVal, chapterKeyVal, nodeKeyVal, pageNameVal, chapterTitleVal) {
        let nodeTypeTemp = nodeTypeVal;
        let chapterKeyTemp = chapterKeyVal;
        let nodeKeyTemp = nodeKeyVal;
        let pageNameTemp = pageNameVal;
        let chapterTitleTemp = chapterTitleVal;

        let progressObj = currentGameStatusProgress;

        if (nodeTypeTemp === progressObj["nodeType"]
            && chapterKeyTemp === progressObj["chapterKey"]
            && pageNameTemp === progressObj["pageStatus"]
            && nodeKeyTemp !== progressObj["nodeKey"]
        ) {
            return;
        } else {
            if (nodeTypeTemp !== progressObj["nodeType"]) {
                progressObj["nodeType"] = nodeTypeTemp;
            }
            if (chapterKeyTemp !== progressObj["chapterKey"]) {
                progressObj["chapterKey"] = chapterKeyTemp;
            }
            if (chapterTitleTemp !== progressObj["chapterTitle"]) {
                progressObj["chapterTitle"] = chapterTitleTemp;
            }
            if (pageNameTemp !== progressObj["pageStatus"]) {
                progressObj["pageStatus"] = pageNameTemp;
            }
            if (nodeKeyTemp !== progressObj["nodeKey"]) {
                progressObj["nodeKey"] = nodeKeyTemp;
            }

                                         //           console.log("resetting currentGameStatusProgress! progressObj = ", progressObj);
       
       
       
            setCurrentGameStatusProgress(progressObj);
        }

      

    }




                                                                // function updateGameData(data) { // model's functionality     //TODO refactoring
                                                                //     setPlayerGameDataTracker(data);
                                                                // }


    //TODO21 refactor to VM
    
    function initializeGameDataTracker(dataObj) {
                                                            console.log("viewer-entire... initialize_GameDataTracker");

        //TODO105 if need to fetch from game-maker with the most fresh-ver.

        //TODO

        let objTemp = {};
        Object.keys(dataObj).map((currKey) => {
            let item = dataObj[currKey];
            let currVal = item["current_value"];
            let dataType = item["data_type"];
            let defaultVal = item["default_value"];
            let nameVal = item["name"];
            
            let objNewItem = {
                "current_value": currVal,
                "data_type": dataType,
                "default_value": defaultVal,
                "name": nameVal           
            }
            objTemp[nameVal] = objNewItem;
        });

        setPlayerGameDataTracker(objTemp);

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

    
    //TODO21 refactor to VM
    function passInPlayerInfoSets() {
        let obj = {};
        let pp = initialPlayerProfile;
        let ua = initialPlayerAccountSettings;
    
        //TODO for testing only, pass-in test-data
        obj["playerProfile"] = pp;
        obj["userAccount"] = ua;
    
    
        //TODO: later, non-emu data, pass-in non-emu data
    
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

    //TODO21 refactor to VM
    function triggerWalkToCurrNodeLocalViewer(nodeKeyName, nodeTypeName) {
        let temp = currentGameStatusProgress;
        temp["nodeKey"] = nodeKeyName;
        temp["nodeType"] = nodeTypeName;

        setCurrentGameStatusProgress(temp);

        triggerNodeWalk(nodeKeyName, nodeTypeName);
    }

    //TODO21 refactor to VM
    function triggerWalkToCurrChapterLocalViewer(chapterKeyName, chapterTitleName) {
        let temp = currentGameStatusProgress;
        temp["nodeKey"] = chapterKeyName + "_start"; //TODO
        temp["nodeType"] = "*chapterStart*";
        temp["chapterKey"] = chapterKeyName;
        temp["chapterTitle"] = chapterTitleName;

        setCurrentGameStatusProgress(temp);

        triggerChapterWalk(chapterKeyName, chapterTitleName);
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
        configureGameProgress(
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
        //get the actual-game-settings from sub-compo ...
        //TODO107
    //saves data-structure here, and pass-in to playing-related-compo
        setGameSettingsScaleObj(data);

    }

    function passInGameSettingsScaleObj() {
        return gameSettingsScaleObj;
    }


    function passInAllNodesContainer() {
        return allNodesContainer;
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

                                          <GameScreen_AllNodeTypeContainer
                                                getNodeType={passInNodeType}
                                                getChapterKey={passInChapterKey} 
                                                getNodeKey={passInNodeKey}
                                                getChapterTitle={passInChapterTitle}

                                                triggerWalkToCurrNode={triggerWalkToCurrNodeLocalViewer}     
                                                triggerWalkToCurrChapter={triggerWalkToCurrChapterLocalViewer}

//TODO31
                                                initialNodeType={currentGameStatusProgress["nodeType"]}
                                                initialChapterKey={currentGameStatusProgress["chapterKey"]}
                                                initialNodeKey={currentGameStatusProgress["nodeKey"]}
                                                initialChapterTitle={currentGameStatusProgress["chapterTitle"]}

                                                getCurrentGameDataTracker={passInViewerContainerGameDataTracker}
                                                getCurrChapterAllNodeMapping={passInCurrChapterAllNodeMapping}
                                                getAllChapterList={passInChapterList}

                                                username={username}
                                                projectname={projectname}
                                                uiLanguage={languageCodeTextOption} 
                                                
                                                visualMap={visualMap}
                                                audioMap={audioMap}
                                                mutedViewOption={mutedViewOption}
                                                fetchGameSettings={passInGameSettingsScaleObj}
                                          
                                                getAllNodesDataContainer={passInAllNodesContainer}
                                          />

                                
                    </div>
                }

                {/* //TODO300 
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

                    /> 
                                                                                {/* //TODO16
                    {/* 
                    //update-PlayerProfile (by player input)
                    //update-PlayerAccountSettings (by player input)
                    //update-PlayerSlRecords (by nav-buttons)
                    //update-CurrentStanding (track by nav-buttons: page-status + chapter-key + node-type + node-key)  */}

                </div>
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