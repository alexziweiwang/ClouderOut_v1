import { useState, useEffect } from 'react';
import NavigationPreview from './NavigationPreview';

/* //TODO
  This component is a View/"screen" of game-play (both testing-entire and play-in-practice).

  Outside of this component, there should be an "outer" component that holds/handles the following:
1. game-progress (which chapter, which node, which step/piece, etc.)
    TODO consider separate situation for with-sl and withour-sl, 
    TODO    also with optional "chapter lock" for new players-first time playing
2. player data (from outer compo): in-game-play-data, profile, account, sl-records

 */
export default function Viewer_Entire({isDisplay, 
    makeNotDisplay, navigationObj, fetchNavigationObj,
    initialChapterList, getChapterList,
   
    isLocal,

    getPlayerGameData,
    updatePlayingGameData,

    getPlayerProfile,
    updatePlayerProfile,

    getPlayerAccountSettings, 
    updatePlayerAccountSettings,

    getPlayerSlRecords, 
    updatePlayerSlRecords,
    
    getCurrentGameProgress,
    updateCurrentGameProgress,

    notifyPageStatus,
    
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



    const [screenWidth, setScreenWidth] = useState(800); //TODO
    const [screenHeight, setScreenHeight] = useState(450); //TODO
    const sizeLookupMap = { "16:9(horizonal)": [800, 450],
        "16:9(vertical)": [450, 800],
        "4:3(horizonal)": [800, 600],
        "4:3(vertical)": [600, 800]};
        


    const [playerGameData, setPlayerGameData] = useState({});
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
            // conv-node: <GameScreen_QuickView_ConvNode/>
            // card-game, or board-game, etc.
               


    const [chapterList, setChapterList] = useState(initialChapterList); 



    useEffect(() => {

        if (navigationObj["screenSize"] === "16:9(horizonal)"
                || navigationObj["screenSize"] === "16:9(vertical)"
                || navigationObj["screenSize"] === "4:3(horizonal)"
                || navigationObj["screenSize"] === "4:3(vertical)"
        ) {
            let w = sizeLookupMap[navigationObj["screenSize"]][0];
            let h = sizeLookupMap[navigationObj["screenSize"]][1];
            setScreenWidth(w);
            setScreenHeight(h);
        }

    

        let chapterListTemp = getChapterList();
        setChapterList(chapterListTemp);

        let gameDataTrackerTemp = getPlayerGameData(); //TODO refactoring
        setPlayerGameData(gameDataTrackerTemp);

        let pp = getPlayerProfile();
        setPlayerProfile(pp);

        let ua = getPlayerAccountSettings();
        setPlayerAccount(ua);


    });





    // function updateGameData(data) { // model's functionality     //TODO refactoring
    //     setPlayerGameData(data);
    // }



    function passInNavObj() {
        return navigationObj;
    }

    function notUsing() {
        console.log();
    }

    function passInNavPageName() {
        return navPageStatus;
    }

    function updateNavPageName(pageName) {
        setNavPageStatus(pageName);        
        notifyPageStatus(pageName);// notify outer layer
    }

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


return(<>

<div>
    <div>

      
        <div style={{"position": "relative", "marginLeft": (screenWidth > screenHeight) ? "170px" : "320px"}}>
      


{/* game-screen layer */}
                {navPageStatus === "During Game" && 
                    <div style={{
                        "position": "absolute", 
                        "backgroundColor": "orange", 
                        "top": "0px", 
                        "left": "0px",
                        "width": `${screenWidth}px`, 
                        "height": `${screenHeight}px`,
                
                    }}>
                        !!! placeholder: game node (content+UI)
                        <br></br>2
                        <br></br>3
                        <br></br>TODO: according to currNodeType, display the component


                    </div>
                }





{/* navigation layer */}
                <div style={{
                    "position": "absolute", 
                    "top": "0px", 
                    "left": "0px",
                    "width": `${screenWidth}px`, 
                    "height": `${screenHeight}px`,
                }}>
                    <NavigationPreview 
                        initialNavObj={navigationObj} 
                        fetchNavObj={fetchNavigationObj} 
                        chapterData={chapterList} 
                        fetchPageName={passInNavPageName} 
                        updateCurrentPageName={updateNavPageName}
                        isEditing={false}
                        initialGameDataRefData={playerGameData}
                        initialPlayerProfileRefData={playerProfile}
                        initialPlayerAccountRefData={playerAccount}

                        fetchPlayerInfoSets={passInPlayerInfoSets}


                    />
                </div>
        </div>


         

    </div>



</div>

    
</>);

}