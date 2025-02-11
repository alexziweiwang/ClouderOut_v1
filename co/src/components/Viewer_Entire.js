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

export default function Viewer_Entire({
    fetchNavObj, 

    initialChapterList, getChapterList, getUILanguage,
   
    getPlayerGameData,
    updatePlayingGameData,
    initialPlayerGameData,

    getPlayerProfile,
    updatePlayerProfile,

    getPlayerAccountSettings, 
    updatePlayerAccountSettings,

    getPlayerSlRecords, 
    updatePlayerSlRecords,

    getCurrChapterAllNodeMapping,
    
    getNodeType, 
    getChapterKey, 
    getNodeKey,
    getPageName,
    getChapterTitle,

    updateCurrentStanding,

    notifyPageStatus,
    triggerNodeChange,
    triggerChapterChange,

    username,
    projectname,

    getShopItemInfo,
    getPlayerPurchaseInfo,

    visualMap,
    audioMap,
    
    
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


    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

    const [screenWidth, setScreenWidth] = useState(800); //TODO
    const [screenHeight, setScreenHeight] = useState(600); //TODO


    const sizeLookupMap = { "16:9(horizonal)": [800, 450],
        "16:9(vertical)": [450, 800],
        "4:3(horizonal)": [800, 600],
        "4:3(vertical)": [600, 800]};
        


    const [playerGameData, setPlayerGameData] = useState(initialPlayerGameData);
    const [playerProfile, setPlayerProfile] = useState({});
    const [playerAccount, setPlayerAccount] = useState({});
    const [playerSLRecords, setPlayerSLRecords] = useState({});


    //TODO implementation plan:
    //when doing this level of testing or game-in-practice, fetch player's above 4 data from cloud
    //for testing the entire game, use default-testing-player's data, otherwise use cloud-fetched data
    //consider topics about player authentication for game-in-practice


    //TODO6
    const [currChapterKey, setCurrChapterKey] = useState("");

    const [currNodeKey, setCurrNodeKey] = useState("");
    const [currNodeType, setCurrNodeType] = useState(""); //TODO according to node-type, display the correct node's viewer?

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
               


    const [chapterList, setChapterList] = useState(initialChapterList); 

    const [currentGameStatusProgress, setCurrentGameStatusProgress] = useState({});

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {

        if (firstTimeEnter === true) {
            initializeGameDataTracker();

            //TODO
            
            setFirstTimeEnter(false);
        }
  
        let navigationObj = fetchNavObj();


                                            console.log("viewer-entire .. nav-obj = ", navigationObj);


        if (navigationObj !== undefined && Object.keys(navigationObj).length > 0) {
                if (navigationObj["screenSize"] === "16:9(horizonal)"
                || navigationObj["screenSize"] === "16:9(vertical)"
                || navigationObj["screenSize"] === "4:3(horizonal)"
                || navigationObj["screenSize"] === "4:3(vertical)"
                ) {
                    let w = sizeLookupMap[navigationObj["screenSize"]][0];
                    let h = sizeLookupMap[navigationObj["screenSize"]][1];
                    setScreenWidth(w); // according to navigationObj's size 
                    setScreenHeight(h); // according to navigationObj's size 
                }
        }


        let UILang = getUILanguage();
        setLanguageCodeTextOption(UILang);

        let nodeTypeTemp = getNodeType();
        let chapterKeyTemp = getChapterKey();
        let nodeKeyTemp = getNodeKey();
        let pageNameTemp = getPageName();
        let chapterTitleTemp = getChapterTitle();
        configureGameProgress(nodeTypeTemp, chapterKeyTemp, nodeKeyTemp, pageNameTemp, chapterTitleTemp);


        let chapterListTemp = getChapterList();
        setChapterList(chapterListTemp);

        let pp = getPlayerProfile();
        setPlayerProfile(pp);

        let ua = getPlayerAccountSettings();
        setPlayerAccount(ua);


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
                                                                //     setPlayerGameData(data);
                                                                // }


    //TODO21 refactor to VM
    function initializeGameDataTracker() {
                                                            console.log("viewer-entire... initializeGameDataTracker");
        let objTemp = {};
        Object.keys(initialPlayerGameData).map((currKey) => {
            let item = initialPlayerGameData[currKey];
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

        setPlayerGameData(objTemp);

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
        notifyPageStatus(pageName);// notify outer layer
    }

    
    //TODO21 refactor to VM
    function passInPlayerInfoSets() {
        let obj = {};
        let pp = getPlayerProfile();
        let ua = getPlayerAccountSettings();
    
        //TODO for testing only, pass-in test-data
        obj["playerProfile"] = pp;
        obj["userAccount"] = ua;
    
    
        //TODO: later, non-emu data, pass-in non-emu data
    
        return obj;
      }


    function passInCurrentGameDataList() { //non-emu data
        return playerGameData;
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
    function triggerChangeToCurrNode(nodeKeyName, nodeTypeName) {
        let temp = currentGameStatusProgress;
        temp["nodeKey"] = nodeKeyName;
        temp["nodeType"] = nodeTypeName;

        setCurrentGameStatusProgress(temp);

        triggerNodeChange(nodeKeyName, nodeTypeName);
    }

    //TODO21 refactor to VM
    function triggerChangeToCurrChapter(chapterKeyName, chapterTitleName) {
        let temp = currentGameStatusProgress;
        temp["nodeKey"] = chapterKeyName + "_start"; //TODO
        temp["nodeType"] = "*chapterStart*";
        temp["chapterKey"] = chapterKeyName;
        temp["chapterTitle"] = chapterTitleName;

        setCurrentGameStatusProgress(temp);

        triggerChapterChange(chapterKeyName, chapterTitleName);

    }
    

return( <>

<div>
    <div>

      
        <div style={{"position": "relative", "marginLeft": (screenWidth > screenHeight) ? "170px" : "320px"}}>
      


{/* game-screen (specific node) layer */}
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
                                                    // updatePlayingGameData(data)
                                                    // updateCurrentStanding (track by nav-buttons & in-game changes: 
                                                    //              page-status + chapter-key + node-type + node-key) 

                                                    //important: setup entry-gameData-set (if multiple) 
                                                    //important: return or to next chapter when reaching the "<chapter-key>_end" node
                                          */}

                                          <GameScreen_AllNodeTypeContainer
                                                getNodeType={passInNodeType}
                                                getChapterKey={passInChapterKey} 
                                                getNodeKey={passInNodeKey}
                                                getChapterTitle={passInChapterTitle}

                                                triggerChangeToCurrNode={triggerChangeToCurrNode}     
                                                triggerChangeToCurrChapter={triggerChangeToCurrChapter}

//TODO31
                                                initialNodeType={currentGameStatusProgress["nodeType"]}
                                                initialChapterKey={currentGameStatusProgress["chapterKey"]}
                                                initialNodeKey={currentGameStatusProgress["nodeKey"]}
                                                initialChapterTitle={currentGameStatusProgress["chapterTitle"]}

                                                getCurrentGameDataTracker={getPlayerGameData}
                                                getCurrChapterAllNodeMapping={getCurrChapterAllNodeMapping}
                                                getAllChapterList={getChapterList}

                                                username={username}
                                                projectname={projectname}
                                                uiLanguage={languageCodeTextOption} 
                                                
                                                visualMap={visualMap}
                                                audioMap={audioMap}
                                          />

                                
                    </div>
                }




{/* navigation layer */}
                <div style={{
                    "position": "absolute", 
                    "top": "0px", 
                    "left": "0px",
                    "backgroundColor": "purple",
                }}>
                    <NavigationPreview 
                        fetchNavObj={fetchNavObj} 

                        chapterData={chapterList} 
                        fetchPageName={passInNavPageName} 

                        updateCurrentPageName={updateNavPageName}
                        updateCurrentStanding={updateCurrentStanding}

                        isEditing={false}

                        initialGameDataRefData={playerGameData}
                        initialPlayerProfileRefData={playerProfile}
                        initialPlayerAccountRefData={playerAccount}

                        fetchPlayerInfoSets={passInPlayerInfoSets}
                        fetchCurrentGameData={passInCurrentGameDataList}

                        getUILanguage={passInUiLanguageOption}  //TODO20 languageOption

                        fetchShopItemInfo={getShopItemInfo}
                        fetchPlayerPurchaseInfo={getPlayerPurchaseInfo}

                        visualMap={visualMap}
                        audioMap={audioMap}

                    /> 
                                                                                {/* //TODO16
                    {/* //updatePlayerProfile (by player input)
                    //updatePlayerAccountSettings (by player input)
                    //updatePlayerSlRecords (by nav-buttons)
                    //updateCurrentStanding (track by nav-buttons: page-status + chapter-key + node-type + node-key)  */}

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