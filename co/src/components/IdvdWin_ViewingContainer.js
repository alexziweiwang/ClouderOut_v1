import Viewer_Entire from './Viewer_Entire';

import { 
    fetchChapterNodeMappingVM, 
    fetchAllChapterListVM, 
} from '../viewmodels/ChapterInfoViewModel';

//the outer-shell of viewer_entire for in-pracitce playing of a game-project
export default function IdvdWin_ViewingContainer({username, projectName}) {

    const backendOption = "firebase";

    //TODO fetch project navigation-ui settings [game-side]


    //TODO fetch project chapter list [game-side]

    //TODO fetch project first-chapter node-mapping [game-side]
    //TODO fetch player's game-data tracker [player-user-side]
    //TODO fetch player's player-profile [player-user-side]
    //TODO fetch player's player-account [player-user-side]
    //TODO fetch player's SL records [player-user-side]

    //TODO fetch UI-language option -- TODO900 design+


    
    //TODO function triggerChapterWalk (fetch project-data from cloud) [game-side]
    

    //TODO fetch visual-map & audio-map

//TODO hold "all chater contents" at this layer, and pass-in viewer-entire when needed

    function getAllChapterNodeMapping() {
        let data = await fetchChapterNodeMappingVM({   
            projectName: projectName, 
            currUser: username,
            bkOption: backendOption
        });
    
        if (data === undefined || data === null) {
          return;
        }
    
              
        let gridChapterMap = convertNodeMapToGridBlocks(data.chapterNodeMapping);
      
    }

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

                    />


        </div>
    )


}












