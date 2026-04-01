import { useState, useEffect } from 'react';


import Viewer_Entire_Screen from './Panel_2_2_Viewer_Entire_Screen';



//level0

//the outer-shell of Viewer_Entire_Screen for *** in-pracitce playing *** of a game-project
export default function IdvdWin_ViewingContainer({username, projectName}) {

    //feature-design: for each "published-version", saved separately from the "currently edit"? 
    //                      that is, players don't go through authero's db, but product-file db

    //actual-project db structure: project(game) - userlist (each user has their own records, etc.: game-data-tracker, or SL records)
    // for each doc of project(game), only author-on-file can edit, otherwise just read

    const [backendOption, setBackendOption] = useState("firebase");   
    //TODO2000


    //for in-prac playing: 
// import game or select game from online-db-list
// start game in place
// player record? (local and online)


// player: temp-local, or online player
// select game: from imported file or online-selection
// then actual play-view
// keep game-data and everything (sl reocrd, etc.)



    //TODO 1. project-selector page: import file & select project-on-cloud
    

    //TODO 2. parser for project-local-file

    
    //TODO fetch project navigation-ui settings [game-side]
    // cloud: vm-func
    // file-source: parse from file-content


    //TODO fetch project chapter list [game-side]

    //TODO fetch project first-chapter node-mapping [game-side]
    // for local-ver., they should consider file-name and file-path related, for node-accessing


    //TODO fetch player's game-data tracker [player-user-side]
    //TODO fetch player's player-profile [player-user-side]
    //TODO fetch player's player-account [player-user-side]
    //TODO fetch player's SL records [player-user-side]

    //TODO fetch UI-language option -- TODO900 design+


    
    //TODO function triggerChapterWalk (fetch project-data from cloud) [game-side]
                    // should regardless of specific things -- more general to just move-to-next-chapter for any chapter-list!

    

    //TODO fetch visual-map & audio-map of that author [project-side]

    // player's data fetching (if login); or from start (default init data sets)



//TODO hold "all chater contents" at this layer, and pass-in viewer-entire when needed

    function step1_playerEnter() {
        //TODO local-temp player, or online-player?

    }

    function step2_projGameSelect() {
        //TODO file-import or online-selection

    }

    function step3_gameStartPrep() {
        //TODO initialze all data-sets for this player, and start viewing...

        //setup this player's everything for the game
    }
   

    function notUsing() {
    //function triggerUpdateCurrentStanding (not doing anything)
    //function triggerNodeWalk (not doing anything)
        return "";
    }



    return (
        <div>
test test

          

        </div>
    )


}



//<Viewer_Entire_Screen

// initialNavObj={currentProjectNav}

// initialChapterList={chapterList}
// initialCurrChapterAllNodeMapping={chapterNodeMapAll}

// initialPlayerGameDataTracker={testPlayerGameDataTracker}
// initialPlayerProfile={testPlayerProfile}
// initialPlayerAccountSettings={testPlayerAccount}

// initialPlayerSlRecords={testPlayerSLRecords}

// uiLangOption={languageCodeTextOption}

// username={username}
// projectname={projectName}

// initialShopItemInfo={testShopProducts}
// initialPlayerPurchaseInfo={testPlayerPurchaseStatus}

// triggerNodeWalk={notUsing} //update things to this layer
// triggerChapterWalk={triggerChapterWalk} //update things to this layer
// triggerUpdateCurrentStanding={notUsing} //update things to this layer

// visualMap={visualMap}
// audioMap={audioMap}
// mutedViewOption={mutedViewOption}

// getCurrChapterContent={passInCurrChapterContent}
// backendOption={backendOption}


//       />









