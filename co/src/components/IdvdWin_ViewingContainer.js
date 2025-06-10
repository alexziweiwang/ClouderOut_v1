import Viewer_Entire from './Viewer_Entire';

//level0

//the outer-shell of viewer_entire for *** in-pracitce playing *** of a game-project
export default function IdvdWin_ViewingContainer({username, projectName}) {

    //feature-design: for each "published-version", saved separately from the "currently edit"? 
    //                      that is, players don't go through authero's db, but product-file db

    //actual-project db structure: project(game) - userlist (each user has their own records, etc.: game-data-tracker, or SL records)
    // for each doc of project(game), only author-on-file can edit, otherwise just read

    const backendOption = "firebase";   
    //TODO2000

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




//TODO hold "all chater contents" at this layer, and pass-in viewer-entire when needed

   

    function notUsing() {
    //function triggerUpdateCurrentStanding (not doing anything)
    //function triggerNodeWalk (not doing anything)
        return "";
    }



    return (
        <div>


             <Viewer_Entire

                    initialNavObj={currentProjectNav}

                    initialChapterList={chapterList}
                    initialCurrChapterAllNodeMapping={chapterNodeMapAll}

                    initialPlayerGameDataTracker={testPlayerGameDataTracker}
                    initialPlayerProfile={testPlayerProfile}
                    initialPlayerAccountSettings={testPlayerAccount}

                    initialPlayerSlRecords={testPlayerSLRecords}


                                                


                    uiLangOption={languageCodeTextOption}

                    username={username}
                    projectname={projectName}

                    initialShopItemInfo={testShopProducts}
                    initialPlayerPurchaseInfo={testPlayerPurchaseStatus}

                    triggerNodeWalk={notUsing} //update things to this layer
                    triggerChapterWalk={triggerChapterWalk} //update things to this layer
                    triggerUpdateCurrentStanding={notUsing} //update things to this layer

                    visualMap={visualMap}
                    audioMap={audioMap}
                    mutedViewOption={mutedViewOption}

                    getCurrChapterContent={passInCurrChapterContent}
                    backendOption={backendOption}
                    />


        </div>
    )


}












