import Viewer_Entire from './Viewer_Entire';

//the outer-shell of viewer_entire for in-pracitce playing of a game-project
export default function ViewingContainer({username, projectName}) {


    //TODO fetch project navigation-ui settings [game-side]

    //TODO fetch project chapter list [game-side]

    //TODO fetch project first-chapter node-mapping [game-side]
    //TODO fetch player's game-data tracker [player-user-side]
    //TODO fetch player's player-profile [player-user-side]
    //TODO fetch player's player-account [player-user-side]
    //TODO fetch player's SL records [player-user-side]

    //TODO fetch UI-language option -- TODO900 design+


    //TODO function triggerNodeWalk (not doing anything)
    //TODO function triggerChapterWalk (fetch project-data from cloud) [game-side]
    //TODO function triggerUpdateCurrentStanding (not doing anything)

    //TODO fetch visual-map & audio-map

//TODO hold "all chater contents" at this layer, and pass-in viewer-entire when needed






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

                    triggerNodeWalk={triggerNodeWalk} //update things to this layer
                    triggerChapterWalk={triggerChapterWalk} //update things to this layer
                    triggerUpdateCurrentStanding={triggerUpdateCurrentStanding} //update things to this layer

                    visualMap={visualMap}
                    audioMap={audioMap}
                    mutedViewOption={mutedViewOption}

                    getCurrChapterContent={passInCurrChapterContent}

                    />


        </div>
    )


}












