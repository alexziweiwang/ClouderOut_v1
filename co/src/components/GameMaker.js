import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChapterManager from './ChapterManager';
import NodeManager from './NodeManager';


import NavigationSetter from './NavigationSetter';
import NavigationPreview from './NavigationPreview';


//level0

import { 
  prepareForNewChapterMapping_vm 
} from '../viewmodels/PrepAc_Creations';

//node key rule: generateNodeLongKeyString_vm({chapterKey, nodeKey})
//TODO112: fetch node-contents here, and send into Viewer_Entire_Screen and its sub-component [DuringGameScreen_AllNodeTypeContainer]
import { checkProjectMetaData_vm } from '../viewmodels/PrepAc_ProjectFileInOut';
import { resourceRawListToUsableMap_vm,
  fromListToIndexedMap,
  fromIndexedMapToList

} from '../viewmodels/PrepAc_Conversion';

import { defaultScreenWidth, defaultScreenHeight, sizeLookupMap } from './_dataStructure_DefaultObjects';

import langDictionary from './_textDictionary';


/* note:  
    when contents updated in these managers -- the metadata would change.
        how to make the updates on display-side for game-maker (node-manager & navigation-setter)
        -- when making change on managers, trigger re-render of game-maker/conv-node-editor part?




*/





/*
              metadata format


      metadataObj["game_data"]
    
      metadataObj["proj_resource_visual"]
      metadataObj["proj_resource_audio"]
      metadataObj["ui_language"]
    
      metadataObj["nav_ui_settings"]
      metadataObj["chapterList"]
      metadataObj["chapterNodeMapping"]
    
      metadataObj["emu4sets"]
      metadataObj["convNodeUiPlanMap"]

      metadataObj["sizeDirection"]
    
*/ 







export default function GameMaker({
      projectName, 
      editorMode, 
      backendOption,
      
      getUiLangOption,      
      getAuthEmailName,

      getProjectMetaData,
      initialMetadata,
      updateMetaDataToOuter,

      switchEditor,

      getProjectResourceVarPairs,
      
      getTestPlayerGameDataTracker,
      getTestPlayerProfile,
      getTestPlayerAccount,
      getTestPlayerSLRecords,
      getTestShopProducts,
      getTestPlayerPurchaseStatus,

      triggerCreatedNewNode_panel2,
      downloadAllInOne,
      saveBothObjToCloud,
      loadMetadataFromCloud_panel2,

      triggerNodeLookChange_panel2,
      triggerChapterListChange_panel2,

      notifyUpdateCurrentStanding_panel2,

      handleResourceManagerOpen, //TODO99999 add in panel2
      handleGameDataManagerOpen,  //TODO add in panel2
      handleEmuManagerOpen, //TODO add in panel2

    //TODO func: fetch sl-info from metadata: "slInfo" - "format"
      fetchSLInfoOption,

    //TODO func: update sl-info of metadata: "slInfo" - "format"
      updateSLAllInfoOption
    
    }) {
  const navigate = useNavigate();


  const [isMtdtLoaded, setIsMtdtLoaded] = useState(false);
   //    "offline_half"       "offline_full"        "online_cloud"  
                      //          console.log("game maker, mode = ", editorMode, "\n ... project meta-data = ", projectMetaData);


/**
used data structures:

GameDataDesign <map>
ProjectResourceVarPairs_audio  <map>   
ProjectResourceVarPairs_visual  <map>   
ProjectUILang <string>
NavigationSettings <map>

AllChapterList (used in chapter-manager) <map/2d_array>
ChapterNodeMapping (used in node-manager) <map>

Node-Data (multiple, content + ui_setting) [chapter_key, node_key]  <map of maps>

*/



  const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); // receive

  const [screenHeight, setScreenHeight] = useState(defaultScreenHeight); // receive
  const [screenWidth, setScreenWidth] = useState(defaultScreenWidth); // receive

  const [cloudDbConnOk, setCloudDbConnOk] = useState(true);

  let textDictItem = langDictionary[languageCodeTextOption];
  let textDictItemDefault = langDictionary["en"];

  
  const contentChaptersTabText = textDictItem.contentChaptersTabText !== undefined ?
        textDictItem.contentChaptersTabText
        : textDictItemDefault.contentChaptersTabText;
  
  const menuNavigationsTabText = textDictItem.menuNavigationsTabText !== undefined ?
        textDictItem.menuNavigationsTabText
        : textDictItemDefault.menuNavigationsTabText;

  const screenSizeForAllNavPageText = textDictItem.screenSizeForAllNavPageText !== undefined ?
        textDictItem.screenSizeForAllNavPageText
        : textDictItemDefault.screenSizeForAllNavPageText;

  const horizontalMarkText = textDictItem.horizontalMarkText !== undefined ?
        textDictItem.horizontalMarkText
        : textDictItemDefault.horizontalMarkText;

  const verticalMarkText = textDictItem.verticalMarkText !== undefined ?
        textDictItem.verticalMarkText
        : textDictItemDefault.verticalMarkText;

  const selectSizeDirectionText = textDictItem.selectSizeDirectionText !== undefined ?
        textDictItem.selectSizeDirectionText
        : textDictItemDefault.selectSizeDirectionText;

  const projectNameText = textDictItem.projectNameText !== undefined ?
        textDictItem.projectNameText
        : textDictItemDefault.projectNameText;

    
//TODO15

/* Important data structure in this level: Game-Maker
  -hook chapterList: array of all chapters' info: key, title, display-boolean)
    fetch from cloud when first entering Game-Maker
  -hook chapterNodeMapAll: relationship-map (key is chapter-key; value is each node's name, position, nextNode, display-boolean, etc.),
    fetch from cloud when first entering Game-Maker
    (for each node, if outside/not entering this node's editor, the specific content of this node would not be fetched from cloud?)
    important for both game-maker and game-viewer
    -hook gridBlocksAll: map (key is chapter-key; value is this chapter's node-visualization position matrix) 
    fetch from cloud when first entering Game-Maker
    for visualization on node-manager component; more for the game-maker (not game-viewer)
  -hook currentProjectNav: UI-settings for navigation-system of the [entire game]
  -chapter and node brief intro

*/

  const [renderCounter, setRenderCounter] = useState(0);


  const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);
  const [gdmUpdatedSignal, setGdmUpdatedSignal] = useState(false);

  const [isDisplayEntireGameViewer, setDisplayEntireGameViewer] = useState(false);
  
  const [mutedViewOption, setMutedViewOption] = useState(false);




  /* variable area */
  const name = "/gamemaker";

  const [currChapterKey, setCurrChapterKey] = useState(""); // local-use


  //TODO6 move to panel2
  const [currTestingPageStatus, setCurrTestingPageStatus] = useState("Main Page"); //move to outer-layer
  const [currTestingChapterKey, setCurrTestingChapterKey] = useState(""); //move to outer-layer
  const [currTestingChapterTitle, setCurrTestingChapterTitle] = useState(""); //move to outer-layer
  const [currTestingNodeKey, setCurrTestingNodeKey] = useState(""); //move to outer-layer
  const [currTestingNodeType, setCurrTestingNodeType] = useState(""); //move to outer-layer
  const [currPageName, setCurrPageName] = useState("Main Page"); //move to outer-layer




  const [chapterList, setChapterList] = useState([]); //receive & send-out

              // const [isDisplayRmBool, setDisplayRmModal] = useState(false); //TODO remove
              // const [isDisplayGdmBool, setDisplayGdmBool] = useState(false); //TODO remove
              // const [isDisplayEmBool, setDisplayEmBool] = useState(false); //TODO remove


  const [showChapterMaker, setShowChapterMaker] = useState(true); // local-use
  const [showSlTab, setShowSLTab] = useState(false);


  const [createNodeFolderSignal, setCreateNodeFolderSignal] = useState(false); // local-use
  const [createdNewNodeWaitlist, setCreatedNewNodeWaitlist] = useState([]); // local-use
  const [createdNewNodeWaitListPending, setCreatedNewNodeWaitListPending] = useState(false); // local-use

  const [visualMap, setVisualMap] = useState([]); // receive
  const [audioMap, setAudioMap] = useState([]); // receive

  const [currChapterContent, setCurrChapterContent] = useState([]); //TODO200


  const [testPlayerGameDataTracker, setTestPlayerGameDataTracker] = useState({}); //move to outer-layer
  const [testPlayerProfile, setTestPlayerProfile] = useState({}); //move to outer-layer                                                       //TODO important for holder-in-practice
  const [testPlayerAccount, setTestPlayerAccount] = useState({}); //move to outer-layer                                                       //TODO important for holder-in-practice
  const [testPlayerSLRecords, setTestPlayerSLRecords] = useState({
      "playername": "playerA",
      "itemStatus": [{}, {}, {}]
  }); //move to outer-layer
  const [testShopProducts, setTestShopProducts] = useState({}); //move to outer-layer
  const [testPlayerPurchaseStatus, setTestPlayerPurchaseStatus] = useState({}); //move to outer-layer


//receive & send-out
    function getResourceVarPairsLocal() {
  
      //TODO999: if half-offline, and imported-file, use the data structure from file
      // if half-offline, and new-project, use the initial data structure


      /* fetch from cloud db */
      //TODO900     
      let obj = {};

      obj = getProjectResourceVarPairs();
      if (obj === undefined || obj.visual === undefined || obj.audio === undefined) {
        return;
      }
 
      resetVisualMapFromList(obj.visual);
      resetAudioMapFromList(obj.audio);

      return obj;
    }


    function updateRenderCounter() {
      console.log("updateRenderCounter called! (not doing anything now as func)");
    //  setRenderCounter((renderCounter+1) % 100);
    }

    function resetVisualMapFromList(visualList) {
      resourceRawListToUsableMap_vm(visualList, setVisualMap);

                 //               console.log("visual list = ", visualList);
                  // if (visualList === undefined) {
                  //   setVisualMap({});
                  // } else {
                  //   let tempMap = {};
                  //   let len = visualList.length;
                  //   let i = 0;
                  //   tempMap[''] = ''; // if empty key - give empty value to prevent undefined issue (temp)
                  //   tempMap[""] = '';
                  //   while (i < len) {
                  //       let item = visualList[i];
                  //       tempMap[item["var"]] = item["url"];
                  //       i++;
                  //   }
                 //                       console.log("initialized visual map = ", tempMap); //TODO test

                  //setVisualMap(tempMap);

                  //}

      
    }


    function resetAudioMapFromList(audioList) { //TODO9999

      resourceRawListToUsableMap_vm(audioList, setAudioMap);

                           //               console.log("audio list = ", audioList);
                  // if (audioList === undefined) {
                  //   setAudioMap({});
                  // } else {
                  //   let tempMap = {};

                  //   //TODO
                  //   let len = audioList.length;
                  //   let i = 0;
                  //   tempMap[''] = ''; // if empty key - give empty value to prevent undefined issue (temp)
                  //   tempMap[""] = '';
                  //   while (i < len) {
                  //       let item = audioList[i];
                  //       tempMap[item["var"]] = item["url"];
                  //       i++;
                  //   }

                  //         //                          console.log("initialized audio map = ", tempMap); //TODO test
                    

                  //   setAudioMap(tempMap);

                  // }


       
    }


//TODO ------------------------------------------------------ testing data area

  const [chapterNodeMapAll, setChapterNodeMapAll] = useState(-1); // receive & send-out
  const [gridBlocksAll, setGridBlocksAll] = useState(-1); //stores node-keys

  const [nodeMapUpdatedSignal , setNodeMapUpdatedSignal] = useState(false);
  const [gridBlocksUpdatedSignal, setGridBlocksUpdatedSignal] = useState(false);

  //TODO501 node-ui template...


  const [isChapMgrCollapsed, setChapMgrCollapsed] = useState(false); // local-use
  const [nodeMgrDelSignal, setNodeMgrDelSignal] = useState(false);
  
//TODO23 update to and fetch from cloud for this project !!!

  const [currentProjectNav, setCurrentProjectNav] = useState({}); // receive & send-out


  const [isEmuMgrOpenedOnce, setIsEmuMgrOpenedOnce] = useState(false); //TODO remove





                                                           //TODO important for holder-in-practice
//TODO ------------------------------------------------------ testing data area

  const [selectedGameDataPanelBetween2, setSelectedGameDataPanelBetween2] = useState(true);

  const [gameDataDesignList, setGameDataDesignList] = useState({}); //TODO90 receive only
  const [gameDataArray, setGameDataArray] = useState([]);


  const [slAreSlots, setSlAreSlots] = useState(false); //"chapterExpr"(f) or "slSlots"(t)
  const [slAllInfo, setSlAllInfo] = useState(-1); //including "format" and "slPage"-obj
  //TODO9001 in use


  const [needCloudGameData, setNeedCloudGameData] = useState(true); //TODO remove


  function markNextNeedCloudGameData() {
    setNeedCloudGameData(true);
  }


  function passInGdmUpdatedSignal() {
    return gdmUpdatedSignal;
  }

  function resetGdmUpdateSignal() {
    console.log("... func: resetGdmUpdateSignal");
  }

  function passInGameDataDesignList() {
    return gameDataDesignList;
  }

  function passInSelectedChapterInfo_Cloud() {
    //TODO fetch cloud-info !


    return chapterNodeMapAll[currChapterKey]; //temporary
  }


 
  const [authEmailName, setAuthEmailName] = useState("_");

  const [firstTimeSwitchTabNavPanel, setFirstTimeSwitchTabNavPanel] = useState(true);

  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {

  

                  //               console.log("gridBlocksUpdatedSignal = ", gridBlocksUpdatedSignal);
                      
                      
                  //                console.log("curr chapter-key = ? ", currChapterKey, " data = ", chapterNodeMapAll[currChapterKey], "  from  ", chapterNodeMapAll);



                    
           console.log("\t\t\tgame-maker rendered once.      project = ", projectName, "  usename = ", authEmailName);

        if (authEmailName === "_") {
          let authName = getAuthEmailName();
          setAuthEmailName(authName);
        }


        
        //load from outer-layer (panel2), regardless of mode
        if (
          (authEmailName !== "_" && editorMode === "online_cloud") 
          || authEmailName === "localUser###"
        ) {
            //valid username, or local-mode


          if (isMtdtLoaded === false) {
         //   let metadataTemp = getProjectMetaData("gameMaker");
            let metadataTemp = initialMetadata;
            if (metadataTemp === -1) {
              console.log("...unable to load proejct metadata from panel2.");
            } else {
              loadEverythingFromProvidedMetadata(metadataTemp);
            }
            
            
  
          }

        }
                                            // if (authEmailName !== "_" && editorMode === "online_cloud") {

                                            //     //TODO5000 check returned data from cloud-db
                                            //     if (gridBlocksAll === -1 || chapterNodeMapAll === -1) {
                                            //       fetchChapterNodeMappingFromOuter();

                                            //     }

                                            //     if (gridBlocksAll !== undefined && chapterNodeMapAll !== undefined) {

                                            //       setCloudDbConnOk(true);
                                            //     }

                                            //     // if (Object.keys(gameDataDesignList).length === 0) { //TODO999
                                            //     //     triggerRefreshFetchCloudData();
                                            //     // }

                                            //     setOfflineHalfMode(false);
                                            //     setOfflineFullMode(false);

                                            // } else if (editorMode === "offline_half" || editorMode === "offline_full") { //auth-email-name is "_"
                                            //                 //TODO6000 offline mode prep
                                                                    
                                            //                         //save: download current data-sets
                                            //                         //import: upload and parse formatted file ...
                                            //                         //resource-pair: half-offline: use online-drive link; full-offline: desktop with file path
                                            //   if (gridBlocksAll === -1 || chapterNodeMapAll === -1) {
                                            //     loadEverythingFromLocalProjFile();
                                            //   }

                                            // }

        if (authEmailName !== "_") {
          let langOp = getUiLangOption();
          setLanguageCodeTextOption(langOp);
  
  
          if (firstTimeEnter === true) {
  
              if (authEmailName !== "_") {
                
                
                //console.log("!!! First Enter - GameMaker:   mode =  ", editorMode, " ... proejct = ", projectName);//TODO testing
  
                //TODO !important: the actual node-content is on cloud, and only fetched when enter the specific node-editing-page
                
                
    
                setFirstTimeEnter(false);

              }

          }

        }
    
   

        // if (currChapterKey !== undefined && currChapterKey !== "") {
        //   setCurrentChapterNodeMap(chapterNodeMapAll[currChapterKey]);
        //   setGridBlocks(gridBlocksAll[currChapterKey]);
        // }
        let pairByMap = sizeLookupMap[currentProjectNav["screenSize"]];
        if (pairByMap !== undefined) {
          let heightByMap = pairByMap[1];
          if (heightByMap !== undefined) {
            setScreenHeight(heightByMap);                          
                          // if (currentProjectNav["screenSize"] === "16:9(horizonal)") {
                          //   setScreenHeight(4 5 0);
                          // } else if (currentProjectNav["screenSize"] === "16:9(vertical)" 
                          //   || currentProjectNav["screenSize"] === "4:3(vertical)") {
                          //   setScreenHeight(8 0 0);
                          // } else if (currentProjectNav["screenSize"] === "4:3(horizonal)") {
                          //   setScreenHeight(6 0 0);
                          // }
          }
          
        }
        
        setTestPlayerGameDataTracker(getTestPlayerGameDataTracker());
        setTestPlayerProfile(getTestPlayerProfile());
        setTestPlayerAccount(getTestPlayerAccount());
        setTestPlayerSLRecords(getTestPlayerSLRecords());
        setTestShopProducts(getTestShopProducts());
        setTestPlayerPurchaseStatus(getTestPlayerPurchaseStatus());

  

  });

  // useEffect(()=>{
  //   update3InObj();
  //                           console.log("sending out for these of metadat: currentProjectNav, chapterList, chapterNodeMapAll");
  // }, [currentProjectNav, chapterList, chapterNodeMapAll]);


  function goToNotLoggedInPage() {
   // navigate('/notloggedin', { replace: true });

  }

  function pureNavigateToProjectManagingPanel() {
    navigate('/mainpanel', { replace: true });

  }

  async function goToDashboard() {
    if (cloudDbConnOk === false) {
      pureNavigateToProjectManagingPanel();

    } else {

       
      let exitYes = window.confirm("Exit?"); //TODO1001
      if (exitYes) {
            pureNavigateToProjectManagingPanel();
      }
    }


  }



  function updateChapterNodeData() {
    // TODO fetch currChapterKey
    // TODO update nodeRelationshipMap by chapter title
    // TODO strategy: from cloud? local?
    // TODO consider data structure to store, balance efficiency and cloud traffic
  }



  // function fetchCurrChapterNodeList(chapterKey) {
  //   // with chapter key, return the node list from cloud(?)
  //   console.log("fetchCurrChapterNodeList - key is: ", chapterKey); //TODO
  //   if (chapterKey === -1) {
  //     setCurrChapterKey("");
  //   }
  
  //   //TODO when testing, use nodeMapAll...

  // }


  function updateCurrProjectNavObj(obj) {
    setCurrentProjectNav(obj);
    updateRenderCounter();
  }

  function passInNavObj() {
    return currentProjectNav;
  }
  
  function notifyCurrPageName(name) {
    setCurrPageName(name);
  }

  function passInCurrSelectedPage() {
    return currPageName;
  }

  function passInSLPageName() {
    return "SL Records";
  }

  function triggerRefreshFetchCloudData() {
    getResourceVarPairsLocal();
    
    //TODO get game-data-design local

  }

  // function resetRmUpdatedSignal() {
  //   setRmUpdatedSignal(false);
  // } //TODO remove unused later

  // function passInRmUpdatedSignal() {
  //     let val = rmUpdatedSignal;
  //     return val;
  // } //TODO remove unused later


  const [developOnCloudData, setDevelopOnCloudData] = useState(false);

                                  // function closeEntireGameViewer() {
                                  //   // reset all game-progress
                                  //   setCurrTestingPageStatus("Main Page");
                                  //   setCurrTestingChapterKey("");
                                  //   setCurrTestingChapterTitle("");
                                  //   setCurrTestingNodeKey("");
                                  //   setCurrTestingNodeType("");

                                  //   setDisplayEntireGameViewer(false);
                                  // }

  function passInCurrentChapterNodeMap() {
    let nodeMap = currChapterKey !== "" ? chapterNodeMapAll[currChapterKey] : {"invalid_map": "invalid_map"};
    return nodeMap;
  }

  function passInCurrentChapterKey() {
    return currChapterKey;
  }

  function passInCurrentGridBlocks(givenChapterKey) {
                                  console.log("\t\tpassing-in grid, ", givenChapterKey);
                                  console.log("\t\t", gridBlocksAll);


    let grid = (givenChapterKey !== "" && gridBlocksAll[givenChapterKey] !== undefined) ? gridBlocksAll[givenChapterKey] : [];
                                  console.log("\t\tfinally passing in: ", grid);


    return grid;
  }


  function prepareForNewChapterMapping_GameMaker(newKey) {

      prepareForNewChapterMapping_vm (
          newKey, 
          chapterNodeMapAll, 
          setChapterNodeMapAll, 
          setNodeMapUpdatedSignal, 
          convertNodeMapToGridBlocks, 
          setGridBlocksAll, 
          setGridBlocksUpdatedSignal
      );
  }

  function passInScreenHeight() {
    return screenHeight;
  }

  function passInScreenWidth() {
    return screenWidth;
  }

  function updateNodeMapOfChapter(mapObj) {
    let nodeMapAllTemp = chapterNodeMapAll;
    nodeMapAllTemp[currChapterKey] = mapObj;
    setChapterNodeMapAll(nodeMapAllTemp);
    setNodeMapUpdatedSignal(true);
                        console.log("node-mapping updated.");
  }
  
  function updateGridBlockOfChapter(gridArr) {
    let gridBlocksAllTemp = gridBlocksAll;
    gridBlocksAllTemp[currChapterKey] = gridArr;

    setGridBlocksAll(gridBlocksAllTemp);
    setGridBlocksUpdatedSignal(true);
                        console.log("grid-blocks updated.");
  }



//   async function saveToCloudNewNodeList(waitlist) {
// //TODO600

//     if (createdNewNodeWaitlist.length === 0) {
//       return;
//     }

//     if (createNodeFolderSignal === true) {
//           //by signal, add a new document at /"nodes"
//           //TODO199: change sturcture: chapters-level should be the last collection-level: 

//                           console.log("updating to cloud: func-step1-node-folders node-waitlist = ", createdNewNodeWaitlist);
// //TODO600
//           await addNewNodeFoldersVM(
//             { 
//                 project: projectName,
//                 username: authEmailName,
//                 nodeList: waitlist, 
//                 chapterKey: currChapterKey,
//                 bkOption: backendOption //TODO999
//             }
//           );
//           //TODO36

//           setCreatedNewNodeWaitlist([]);
//           setCreatedNewNodeWaitListPending(false);

//           //reset create-node-signal to false here
//           setCreateNodeFolderSignal(false);
//     }
//   }
 
  async function switchChosenChapterItem(chapterKey) {
 
                                            console.log("clicked on chapter-key: ", chapterKey); //TODO testing

        if (chapterKey !== "") {
          setCurrChapterKey(chapterKey);
        } else {
          setCurrChapterKey("");
        }
  } 
  
  function updateChapterList_local(chapterListTemp) { // game-maker local
    genChapterListAndMapOuter(chapterListTemp);

    setChapterList(chapterListTemp);
  }

  

  function notUsing() {
    //not doing anything
    console.log();
  }

  function notUsingReturnFalse() {
    return false;
  }

  function notUsingReturnTrue() {
    return true;
  }


  function viewerSourceGameDataUpdate() {
    return {"default": "impl for Viewer_Entire_Screen later"}; //TODO5 later
  }

  function passInPlayerGameDataTracker() {//used in panel-game-data
    return testPlayerGameDataTracker;
  }

  function passInPlayerProfile() { //used in Navigation-Setter 
    return testPlayerProfile;
  }

  function passInPlayerAccountInfo() {
    return testPlayerAccount;
  }

  function passInPlayerSlRecords() {
    return testPlayerSLRecords;
  }


                                                                                // function passInCurrentGameProgress() {
                                                                                //   let obj = {};
                                                                                //   obj["pageStatus"] = currTestingPageStatus;
                                                                                //   obj["chapterKey"] = currTestingChapterKey;
                                                                                //   obj["nodeKey"] = currTestingNodeKey;
                                                                                //   obj["nodeType"] = currTestingNodeType;

                                                                                //   return obj;
                                                                                // }

  function passInNodeType() {
    return currTestingNodeType;
  }

  function passInChapterKey() {
    return currTestingChapterKey;
  } 

  function passInNodeKey() {
    return currTestingNodeKey;
  }

  function passInPageName() {
    return currTestingPageStatus;
  }

  function passInChapterTitle() {
    return currTestingChapterTitle;
  }

  function notifyUpdateCurrentStanding_gm(obj) { //fetch from sub-compo
    notifyUpdateCurrentStanding_panel2(obj)
  }

  



                    // function receiveUpdateOnPageStatus(pageName) {
                                                                              //fetch from sub-compo 
                                                                              //TODO important, needed in holder-in-practice 
                    //   setCurrTestingPageStatus(pageName);
                    // }

  function updatePlayerInfoSets(playerProfileData, userAccountData) {
    
    //TODO for testing only, update test-data here
    setTestPlayerProfile(playerProfileData);
    setTestPlayerAccount(userAccountData);

    //TODO: later, update non-emu data here

  }

  function passInPlayerInfoSets() {
    let obj = {};

    //TODO for testing only, pass-in test-data
    obj["playerProfile"] = testPlayerProfile;
    obj["userAccount"] = testPlayerAccount;


    //TODO: later, non-emu data, pass-in non-emu data

    return obj;
  }


  const emptyValue = {};


  function updateEmuPlayerProfile(data) {
    console.log("game-maker: updateEmuPlayerProfile = ", data); //TODO test
    setTestPlayerProfile(data);
  }

  function passInEmuPlayerInfo() {
    return testPlayerProfile;
  }

  function passInCurrentGameDataList() { // emu-data
  

    //TODO for new-emu-strategy

    // let objTemp = {}; //TODO too much rerendering
    // Object.keys(testPlayerGameDataTracker).map((currKey) => {
    //   let item = testPlayerGameDataTracker[currKey];
    //   let currVal = item["current_value"];
    //   let dataType = item["data_type"];
    //   let defaultVal = item["default_value"];
    //   let nameVal = item["name"];
      
    //   let objNewItem = {
    //       "current_value": currVal,
    //       "data_type": dataType,
    //       "default_value": defaultVal,
    //       "name": nameVal           
    //   }

    //   objTemp[nameVal] = objNewItem;

    // })  //TODO too much rerendering



    return testPlayerGameDataTracker;

  }

  function passInUILanguage() {
    return languageCodeTextOption;
  }


  function updateGameDataDesignList(data) {
    //TODO999 update game-data-design-list
    setGameDataDesignList(data);
  }


  function getUserConfigFromEmuManager1Gdt(data1) {
    //update data1 to be the new Game-Data-Tracker
    //TODO  //recreate emu data object
    setTestPlayerGameDataTracker(data1);
  }

  function getUserConfigFromEmuManager2Epp(data2) {
    //update data2 to be the new Emu-Player-Profile
    //TODO  //recreate emu data object

    setTestPlayerProfile(data2);
  }

  function getUserConfigFromEmuManager3Epa(data3) {
    //update data3 to be the new Emu Player Account
    //TODO  //recreate emu data object

    setTestPlayerAccount(data3);
  }

  function getUserConfigFromEmuManager4Ess(data4) {
    //TODO update data4 to be the new Emu SL slots
    //TODO  //recreate emu data object
    
    //TODO temp: not using
  }

  function getUserConfigFromEmuManager5Shp(data5) {
    //TODO update data5 to be emu-shop-product-list data
    //TODO  //recreate emu data object

    let obj5 = data5;
                              //console.log("game-maker recevied 5 shp = " , data5);
    if (obj5 === undefined) {
      return;
    }

    let shopStock = obj5["shopStock"];
    let playerPurchase = obj5["playerPurchaseStatus"];

    if (shopStock === undefined || playerPurchase === undefined) {
      return;
    }
                              // console.log("game-maker recevied 5 shp - stock = " , shopStock);
                              // console.log("game-maker recevied 5 shp - player-purchase = " , playerPurchase);

    setTestShopProducts(shopStock);
    setTestPlayerPurchaseStatus(playerPurchase);
    
  }  

  function passInShopItemInfo() {
  //  console.log("game-maker shop product info", testShopProducts);
    return testShopProducts;
  }

  function passInPlayerPurchaseStatus() {
    return testPlayerPurchaseStatus;
  }



  function triggerCreatedNewNode_gmLayer(newNodeKey, chapterKeyTemp, nodeTypeTemp, currChapMap) {
    triggerCreatedNewNode_panel2(newNodeKey, chapterKeyTemp, nodeTypeTemp, currChapMap);
  }



  async function triggerCreatedNewChapter(chapterInfo) {

                        // await addNewOneChapterFolderVM({
                        //   project: projectName,
                        //   username: authEmailName,
                        //   chapterKey: chapterInfo[0],
                        //   bkOption: backendOption //TODO999
                        // });
            //TODO adjustign for optimization
    //trigger "chapterList" change


  }



  function convertNodeMapToGridBlocks(nodeMapTemp) {
    
    // make grid-blocks from node-map

    let gridEntireTemp = [];

    // make conversion(format of stored grid blocks) of grid-blocks
    let j = 0;
    let gridTempMap = {};
    let gridTempArr = [];

                                                      // console.log("convertNodeMap-To-GridBlocks with ", nodeMapTemp);

    let rowMax = 0;
    let colMax = 0;

    Object.keys(nodeMapTemp).map((chapterKey) => {  
      rowMax = 0;
      colMax = 0; //reset for each chapter

      let currChapter = nodeMapTemp[chapterKey];
                                                    //    console.log("nodeMapTemp[chapterKey] = ", nodeMapTemp[chapterKey]);

      Object.keys(currChapter).map((nodeKeyTemp) => {  
        let currNode = currChapter[nodeKeyTemp];
                                                    //     console.log("\tcurrChapter[nodeKeyTemp] = ", currChapter[nodeKeyTemp]);
        let currRow = currNode["row"];
        if (currRow > rowMax) {
          rowMax = currRow;
        }
        let currCol = currNode["col"];
        if (currCol > colMax) {
          colMax = currCol;
        }
      });

      colMax = colMax + 5;
      rowMax = rowMax + 2;


      let w = 0;
      let q = 0;
      let maxGrid = [];
      for(; w < rowMax; w++) {
        let createdRow = [];
        for(q = 0; q < colMax; q++) {
          createdRow.push("");
        }
        maxGrid.push(createdRow);
      }

      Object.keys(currChapter).map((nodeKeyTemp) => {  
        let currNode = currChapter[nodeKeyTemp];
        let currRow = currNode["row"];
        let currCol = currNode["col"];
        if (currNode["display"] === true) { // only for undeleted nodes
                            //    console.log("r = ", currRow, " ... col = ", currCol, " ....... node = ", nodeKeyTemp);
      
          maxGrid[currRow][currCol] = nodeKeyTemp;
        }

      });
      gridEntireTemp[chapterKey] = maxGrid;


    });   
    


//rowMax, colMax
    //TODO draw grid with the height and width above
  

    //now maxGrid is an ideal empty grid to be filled

 


    //TODO add according to the nodeMapTemp's actual content for all node's positions


    return gridEntireTemp;
  }

  function passInChapterNodeMapping() {
    return chapterNodeMapAll;
  }



  async function genChapterListAndMapOuter(chapterListArr) {

                                                //convert the nested array into map
                                  // let chapterListMap = {};
                                  // let i = 0;
                                  // let len = chapterListArr.length;

                                  // while (i < len) {
                                  //   chapterListMap[i] = chapterListArr[i];
                                  //   i++;
                                  // }

    let chapterListMap = fromListToIndexedMap(chapterListArr);
    //TODo50 conversion, to test?


    //update this to panel2
    triggerChapterListChange_panel2(chapterListArr, chapterListMap);
    
  }


  function passInChapterList() {
    if (authEmailName === "_") {
            console.log("not fetching-chapter-list:  user = ", authEmailName);
      return;
    }

    return chapterList;
  }

  function passInVisualMap() {
    return visualMap;
  }

  function passInAudioMap() {
    return audioMap;
  }

  function triggerNodeMappingsChange(nodeMapThisChapter, gridBlocksThisChapter) {
    let gridAll = gridBlocksAll;
    gridAll[currChapterKey] = gridBlocksThisChapter;

    let nodeMapAll = chapterNodeMapAll;
    nodeMapAll[currChapterKey] = nodeMapThisChapter;

    setGridBlocksAll(gridAll);
    setChapterNodeMapAll(nodeMapAll);

    setNodeMapUpdatedSignal(true);
    setGridBlocksUpdatedSignal(true);

    triggerNodeLookChange_panel2(nodeMapAll);


    return nodeMapAll;

  }



  function triggerNodeWalk(nodeKeyName, nodeTypeName) { //important for viewing //from sub-compo
    setCurrTestingNodeKey(nodeKeyName);
    setCurrTestingNodeType(nodeTypeName);
  }



  function notifyRmUpdated(data) {
                                                      console.log("rm updated... (game-maker) ",  data);
                                                  //TODO100 update the visual+audio maps here?
                                                        //rm-mapping-required: 
                                                        // <NavigationSetter> [//TODO105 refactored, to test]

                                                        // <NavigationPreview> *** non-dynamic resource-maps so far...


      let audioListTemp = data.audio === undefined ? {} : data.audio;
      let visualListTemp = data.visual === undefined ? {} : data.visual;

      resetVisualMapFromList(visualListTemp);
      resetAudioMapFromList(audioListTemp); 
  }

  function fromNodeMapToChapterNodeKeyDs() {
    //TODO200

    let chapNodeKeyDs = {};

    Object.keys(chapterNodeMapAll).map((chapKey) => {
      let nodeKeyMap = chapterNodeMapAll[chapKey];
      let nodeKeyArr = [];
      Object.keys(nodeKeyMap).map((nodeKey) => {
        nodeKeyArr.push(nodeKey);
      });

      chapNodeKeyDs[chapKey] = nodeKeyArr
    });

    console.log("\t\t\t chapNodeKeyDs = ", chapNodeKeyDs);
    return chapNodeKeyDs;
  }

//   async function fetchcurrChapterContentFromCloud() {
//     //TODO201 strategy: load chapter data for each chapter (optional)?


//     // console.log("...fetchcurrChapterContentFromCloud - chapterNodeMapAll = ", chapterNodeMapAll);


//     // let chapNodeKeyDs = fromNodeMapToChapterNodeKeyDs();
//     // console.log("...fetchcurrChapterContentFromCloud - chapNodeKeyDs = ", chapNodeKeyDs);


// //TODO700 important!





//     //TODO100
  
//   }

  function passInCurrChapterContent() {
    return currChapterContent;
  }

  function passInFalseBool() {
    return false;
  }

  function getChapMgrCollapsed(val) {
    //TODO201

    setChapMgrCollapsed(val);
  }

  function passInChapMgrCollapsed() {
    return isChapMgrCollapsed;
  }

  function passInCreatedNewNodeWaitListPending() {
    return createdNewNodeWaitListPending;
  }



  function loadEverythingFromProvidedMetadata(metaDataTemp) { //read-only from the fetched object
                           console.log("game-maker :  prep metadata... ", metaDataTemp);

    setIsMtdtLoaded(true);              

    if (metaDataTemp === undefined || metaDataTemp === -1) {
      return;
    }

    let slObj = metaDataTemp["slInfo"];
    setSlAllInfo(slObj);
    console.log("load!!!", slObj);

    if (slObj["format"] === "slSlots") {
      setSlAreSlots(true);
    } else {
      setSlAreSlots(false);
    }

//GameDataDesign <map>
    setGameDataDesignList(metaDataTemp["game_data"]);
            

// ProjectResourceVarPairs_audio  <map>   
    let auList = metaDataTemp["proj_resource_audio"];
    resetAudioMapFromList(auList);
       

// ProjectResourceVarPairs_visual  <map>   
    let visList = metaDataTemp["proj_resource_visual"];
    resetVisualMapFromList(visList);

// ProjectUILang <string>
    setLanguageCodeTextOption(metaDataTemp["ui_language"]);
          

// NavigationSettings <map>
    setCurrentProjectNav(metaDataTemp["nav_ui_settings"]);
          
// AllChapterList (used in chapter-manager) <map/2d_array>
    let chapMap = metaDataTemp["chapterList"];
    
    let chapterArr = fromIndexedMapToList(chapMap);

                            // Object.keys(chapMap).map((currKey) => {
                            //     let item = chapMap[currKey];
                            //     chapterArr.push(item);
                            // }); //todo50 conversion, to test


    setChapterList(chapterArr);

// ChapterNodeMapping (used in node-manager) <map>
    setChapterNodeMapAll(metaDataTemp["chapterNodeMapping"]);
    let gridTemp = convertNodeMapToGridBlocks(metaDataTemp["chapterNodeMapping"]);
    setGridBlocksAll(gridTemp);


  }

  function triggerNodeDeleted() {
    setNodeMgrDelSignal(true);
  }


  function passInAuthEmailName() {
    return authEmailName;
  }


  function passInLocalProjectData_Emu() {
    return {}; //TODO1000
  }
     
  function passInLocalProjectData_RsrcMgr() {
    return {}; //TODO1000
  }


  function passInLocalProjectData_GameDataDesign() {
    return {}; //TODO1000
  }

  function switchEditorLocal(visitInfoObj) {
    switchEditor(visitInfoObj);
  }

  function update3InObj() {
    // 3+1 fields: currentProjectNav, chapterList->chapListMap, chapterNodeMapAll

    let metadataObj = getProjectMetaData();
    let resBool = checkProjectMetaData_vm(metadataObj);
    if (resBool === true) {

        metadataObj["nav_ui_settings"] = currentProjectNav;

        let chapListMap = {};
        chapterList.map((item, index) => {
            chapListMap[index] = item;
        }) 
        metadataObj["chapterList"] = chapListMap;

        metadataObj["chapterNodeMapping"] = chapterNodeMapAll;

        metadataObj["sizeDirection"] = currentProjectNav["screenSize"];


        updateMetaDataToOuter(metadataObj);

    }
    

  }

  function updateSlRelated(boolVal) {

    let outObj = {
      "slPage": slAllInfo,
      "format": boolVal === true ? "slSlots" : "chapterExpr"
    };

    setSlAllInfo(outObj); //for local
  
    updateSLAllInfoOption(outObj); // out outer (panel2)
    //TODO9001 ask when switching tab or exit?
    console.log("!!! updated sl-obj: ", outObj);

  }


{/* //components
      
      1. editors - [ChapterManager> +  <NodeManager> 
      2. editors - [NavigationSetter> + <NavigationPreview>
      3. entire_view - [Viewer_Entire_Screen>
      4. modal_resource_manager - [Modal_ResourceManagingWindow>
      5. modal_game_data_manager - [Modal_GameDataManager >
      6. modal_emu_manager - [Modal_EmuManager>
*/}   
//TODO90 page content                         return (


  return(
  <div className="textNoSelect">


{cloudDbConnOk === false &&

<>
            
      <div> Unable to connect to database for user: [{authEmailName}] </div>

</>

}

{(
(
(cloudDbConnOk === true 
  && editorMode === "online_cloud" && authEmailName !== "_") 
|| (authEmailName === "localUser###")
)
&& isMtdtLoaded === true
&& gridBlocksAll !== undefined 
&& chapterNodeMapAll !== undefined
) 

&& <>
<div>
    

    <div>

    
      {editorMode === "online_cloud" && <>
      <button onClick={()=>{
        let ans = window.confirm("Are you sure to load from cloud and cover the project on local?");
        if (ans) {
          loadMetadataFromCloud_panel2();
        }

      }}
      >Load From Cloud</button>

      <button onClick={()=>{
        let ans = window.confirm("Are you sure to save and cover the project on cloud?");
        if (ans) {
          saveBothObjToCloud();
          
        }

      }}
      >Save To Cloud</button>

      </>}


      <button
        onClick={()=>{
          downloadAllInOne();

        }}
      >Download Project File</button>


          {/* tab */}
      <button 
        className={(showChapterMaker&&!showSlTab) ? "tabBarGMSelected" : "tabBarGM"} 
        onClick={()=>{
          setShowChapterMaker(true);

          setShowSLTab(false);

        }}>
          {contentChaptersTabText}</button>


          {/* tab */}
      <button 
        className={(!showChapterMaker&&!showSlTab) ? "tabBarGMSelected" : "tabBarGM"} 
        onClick={()=>{
          setShowChapterMaker(false);
          
          if (firstTimeSwitchTabNavPanel === true) {
            setFirstTimeSwitchTabNavPanel(false);
          }

          setShowSLTab(false);

        }}>
          {menuNavigationsTabText}</button>
    


          {/* tab */}
      <button 
        className={showSlTab ? "tabBarGMSelected" : "tabBarGM"} 
        onClick={()=>{

              setShowSLTab(true);

        }}>
          Save & Load System
          
      </button>
    





        

    
    </div>
    


{/* chapter-and-node setting tab */}
    {((showChapterMaker === true && showSlTab === false) 
      && authEmailName !== "_") && 
      
    <div className="parallelFrame sectionArea">

        { 
        <ChapterManager 

          getChapterList={passInChapterList}
          
          chosenChapter={currChapterKey} 
          updateChosenChapterItem={switchChosenChapterItem} 
          
          prepareForNewChapterMapping={prepareForNewChapterMapping_GameMaker}             
          getUILanguage={passInUILanguage}
          sendOutIsCollapsed={getChapMgrCollapsed}

          
          triggerCreatedNewChapter={triggerCreatedNewChapter}
          updateChapterList_gm={updateChapterList_local} 
             
        />}

        {currChapterKey !== "" && 
        <NodeManager 
          currUser={authEmailName}  //TODO
          projectName={projectName} 
          initialChapterKey={currChapterKey}
          getNodeMapOfChapter={passInCurrentChapterNodeMap}
          getCurrChapterKey={passInCurrentChapterKey}
          getGridBlocks={passInCurrentGridBlocks}
          initialNodeMap={(currChapterKey !== "" && chapterNodeMapAll[currChapterKey] !== undefined) ? chapterNodeMapAll[currChapterKey] : {}}
          initialGridBlock={(currChapterKey !== "" && gridBlocksAll[currChapterKey] !== undefined) ? gridBlocksAll[currChapterKey] : []}
          updateNodeMapOfChapter={updateNodeMapOfChapter}
          updateGridBlockOfChapter={updateGridBlockOfChapter}
          getGameData={passInGameDataDesignList}
          displayGameDataPanel={handleGameDataManagerOpen} //TODO99999 remove
          loadChapterInfoFromCaller={passInSelectedChapterInfo_Cloud}
          getGdmUpdatedSignal={passInGdmUpdatedSignal}
          resetGdmUpdateSignal={resetGdmUpdateSignal}
          triggerCreatedNewNode={triggerCreatedNewNode_gmLayer}
          triggerNodeMappingsChange={triggerNodeMappingsChange}

          getChapMgrCollapsed={passInChapMgrCollapsed}
           
          getUILanguage={passInUILanguage}

          getCreatedNewNodeWaitListPending={passInCreatedNewNodeWaitListPending}

          triggerNodeDeleted={triggerNodeDeleted}

          editorMode={editorMode}
          switchEditor={switchEditorLocal}
          //TODO500
        />}


        {/* Note: later - select according data structure (as initial ds) for this chapter */}

    </div>}



{/* project-nagivation setting tab */}
    {(showChapterMaker === false && showSlTab === false)
    
    && 
    <>
      

        <div className="sectionArea"> 

          <div>
            {screenSizeForAllNavPageText}: 
            <select
                value={currentProjectNav["screenSize"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["screenSize"] = event.target.value;

                  setCurrentProjectNav({...currentProjectNav, "screenSize": event.target.value});
                }}
                >
                          <option value="" key=""> ----- {selectSizeDirectionText} ----- </option>
                          <option value="16:9(horizonal)" key="nav-setter-16:9(horizonal)"> 16:9 {horizontalMarkText} </option>
                          <option value="16:9(vertical)" key="nav-setter-16:9(vertical)"> 16:9 {verticalMarkText} </option>
                          <option value="4:3(horizonal)" key="nav-setter-4:3(horizonal)"> 4:3 {horizontalMarkText} </option>
                          <option value="4:3(vertical)" key="nav-setter-4:3(vertical)"> 4:3 {verticalMarkText} </option>
            </select>

          </div>

          <div className="parallelFrame">
                     
              <div style={{"marginTop": "15px", "marginLeft": "10px", "marginBottom": "10px"}}>
                <NavigationSetter 
                  initialNavObj={currentProjectNav} 
                  updateNavObj={updateCurrProjectNavObj} 
                  openRm={handleResourceManagerOpen}  //TODO99999 remove
                  triggerUpdateCurrPageName={notifyCurrPageName} 
                  fetchPageName={passInCurrSelectedPage}
                  initialScreenHeight={screenHeight}
                  getScreenheight={passInScreenHeight}

                  userName={authEmailName} 
                  projName={projectName} 

                  getUsername={passInAuthEmailName}


                  intialEmuPlayerProfile={testPlayerProfile}
                  openEmuManager={handleEmuManagerOpen} //TODO99999 remove?
                  fetchEmuPlayerProfile={passInPlayerProfile}
                   
                  getUILanguage={passInUILanguage}

                  getVisualMap={passInVisualMap}
                  getAudioMap={passInAudioMap}

                  getGameDataDesign={passInGameDataDesignList}
          
                />
              </div>


              <div style={{"marginTop": "15px", "marginLeft": "15px"}}>
                <NavigationPreview
                  fetchNavObj={passInNavObj} 

                  fetchPageName={passInCurrSelectedPage} 
                  chapterData={chapterList} 

                  triggerUpdateCurrPageName={notifyCurrPageName}
                  triggerUpdateCurrentStanding={notifyUpdateCurrentStanding_gm}

                  isEditing={true}
                  initialGameDataRefData={emptyValue}
                  initialPlayerProfileRefData={testPlayerProfile}
                  initialPlayerAccountRefData={testPlayerAccount}

                  fetchPlayerInfoSets={passInPlayerInfoSets}
                  fetchCurrentGameData={passInCurrentGameDataList}

 
                  getUILanguage={passInUILanguage}
                  initialUILanguage={languageCodeTextOption}

                  fetchShopItemInfo={passInShopItemInfo}
                  fetchPlayerPurchaseInfo={passInPlayerPurchaseStatus}

                  visualMap={visualMap}
                  audioMap={audioMap}
                  sendOutGameSettingScaleObjFromSubCompo={notUsing}

                  getOpenSettingSignal={passInFalseBool}
                  closeSettingsPage={notUsing} 
                  //TODO later: change to page-changing func for nav-setter

                  />
              </div>
          </div>
    </div>
    
    
    </>
    }


                            {/* sl tab */}
    {/* project-sl-tab */}
    {showSlTab === true
    && <div>
      sl settings
      
      <div style={{"textAlign": "left"}}>
          SL mode:

                            <div className="indentOne">
                                <input 
                                    className="cursor_pointer"
                                    type="radio"
                                    value={slAreSlots}
                                    checked={!slAreSlots}
                                    onChange={()=>{
                                      if (slAreSlots === true) {
                                        //TODO ask confirm

                                        updateSlRelated(false);
                                      }
                                      setSlAreSlots(false);
                                    }}
                                ></input>
                                <label
                                    className="cursor_pointer"
                                    onClick={()=>{
                                      if (slAreSlots === true) {
                                        //TODO ask confirm
                                        updateSlRelated(false);
                                      }
                                      setSlAreSlots(false);
                                    }}
                                >Chapter Experience (data resets after a chapter ends)</label>

                                <br></br>

                                <input 
                                    className="cursor_pointer"
                                    type="radio"
                                    value={slAreSlots}
                                    checked={slAreSlots}
                                    onChange={()=>{
                                      if (slAreSlots === false) {
                                        //TODO ask confirm
                                        updateSlRelated(true);
                                      }
                                      setSlAreSlots(true);
                                    }}
                                ></input>
                                <label
                                    className="cursor_pointer"
                                    onClick={()=>{
                                      if (slAreSlots === false) {
                                        //TODO ask confirm
                                        updateSlRelated(true);
                                      }
                                      setSlAreSlots(true);
                                    }}
                                >SL Slots (data does not reset in chapter transition, with SL slots)</label>
                            </div> 

              
          <div style={{"display": "flex"}}>    
                <div style={{"backgroundColor": "orange", "marginRight": "10px"}} className="guiSettings">
                    Settings???
                   {/*  slAllInfo= {slAllInfo}
                    slAllInfo = [{slAllInfo}] */}



                    {slAllInfo !== undefined && 
                    <div>
                    {/* //TODO: apply metadata-["slInfo"] for sl slots */}
                            <label>row</label>
                            <input
                              type="range"
                              value={slAllInfo["row"]}
                              onChange={(event)=>{
                                setSlAllInfo({
                                  ...slAllInfo,
                                  "row": event.target.value
                                })
                              }}
                              //TODO max min

                            ></input>
                            <input
                              type="number"
                              value={slAllInfo["row"]}
                              onChange={(event)=>{
                                setSlAllInfo({
                                  ...slAllInfo,
                                  "row": event.target.value
                                })
                              }}
                              //TODO max min

                            ></input>

                            <br></br>

                            <label>col</label>
                            <input
                              type="range"
                              value={slAllInfo["col"]}
                              onChange={(event)=>{
                                setSlAllInfo({
                                  ...slAllInfo,
                                  "col": event.target.value
                                })
                              }}

                              //TODO max min

                            ></input>
                            <input
                              type="number"
                              value={slAllInfo["col"]}
                              onChange={(event)=>{
                                setSlAllInfo({
                                  ...slAllInfo,
                                  "col": event.target.value
                                })
                              }}
                              //TODO max min

                            ></input>
                            <br></br>

                            <label>page</label>
                            <input
                              type="range"
                              value={slAllInfo["pageCount"]}
                              onChange={(event)=>{
                                setSlAllInfo({
                                  ...slAllInfo,
                                  "pageCount": event.target.value
                                })
                              }}
                              //TODO max min

                            ></input>
                            <input
                              type="number"
                              value={slAllInfo["pageCount"]}
                              onChange={(event)=>{
                                setSlAllInfo({
                                  ...slAllInfo,
                                  "pageCount": event.target.value
                                })
                              }}
                              //TODO max min

                            ></input>                            
                            <br></br>                         

                            <label>Item Width</label>
                            <input
                                type="range"
                                value={slAllInfo["item_w"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "item_w": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>
                            <input
                                type="number"
                                value={slAllInfo["item_w"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "item_w": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>
                            <br></br>

                            <label>Item Height</label>
                            <input
                                type="range"
                                value={slAllInfo["item_h"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "item_h": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>
                            <input
                                type="number"
                                value={slAllInfo["item_h"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "item_h": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>
                            <br></br>

                            <label>Item Label</label>
                            {/* slAllInfo["itemTitleStamp"] */}
                            <select
                              value={slAllInfo["itemTitleStamp"]}
                              onChange={(event)=>{
                                setSlAllInfo({
                                  ...slAllInfo,
                                  "itemTitleStamp": event.target.value
                                })
                              }}
                            >
                              <option
                                value={false}
                              >hide title/stamp</option>

                              <option
                                value={true}
                              >show title/stamp</option>

                            </select>
                            <br></br>

                            <label>Background Picture</label>
                            <select
                                value={slAllInfo["bgPicName"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "bgPicName": event.target.value
                                  })
                                }}                              
                            >
                              {Object.keys(visualMap).map((currKey) => {
                                let keyStr = "slPage-bgPic-" + currKey;
                                
                                  return (
                                    <option key={keyStr} value={currKey}>{currKey}</option>);
                              })}
                             
                            </select>

                  

                            <br></br>

                            <label>Group Position X</label>
                            <input
                                type="range"
                                value={slAllInfo["groupPosX"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "groupPosX": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>
                            <input
                                type="number"
                                value={slAllInfo["groupPosX"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "groupPosX": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>
                            <br></br>

                            <label>Group Position Y</label>
                            <input
                                type="range"
                                value={slAllInfo["groupPosY"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "groupPosY": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>
                            <input
                                type="number"
                                value={slAllInfo["groupPosY"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "groupPosY": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>                            
                            <br></br>

                            <label>Group Gap Horizontal</label>
                            <input
                                type="range"
                                value={slAllInfo["groupItemGapX"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "groupItemGapX": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>
                            <input
                                type="number"
                                value={slAllInfo["groupItemGapX"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "groupItemGapX": event.target.value
                                  })
                                }}
                              //TODO max min

                            ></input>                            
                            <br></br>

                            <label>Group Gap Vertical</label>
                            <input
                                type="range"
                                value={slAllInfo["groupItemGapY"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "groupItemGapY": event.target.value
                                  })
                                }}
                            ></input>
                            <input
                                type="number"
                                value={slAllInfo["groupItemGapY"]}
                                onChange={(event)=>{
                                  setSlAllInfo({
                                    ...slAllInfo,
                                    "groupItemGapY": event.target.value
                                  })
                                }}
                            ></input>                            
                            <br></br>
            "row": 2,
            "col": 3,
            "pageCount": 3,
            "item_w": 100,
            "item_h": 70,
            "itemTitleStamp": true,
            "bgPicName": "",
            "groupPosX": 0,
            "groupPoxY": 0,
            "groupItemGapX": 5,
            "groupItemGapY": 5,
                    </div>
                    }            
                </div>


                <div>
          



                  <NavigationPreview
                    fetchNavObj={passInNavObj} 

                    fetchPageName={passInSLPageName}  //special
                    chapterData={chapterList} 

                    triggerUpdateCurrPageName={notUsing}  //special
                    triggerUpdateCurrentStanding={notUsing}  //special

                    isEditing={true}
                    initialGameDataRefData={emptyValue}
                    initialPlayerProfileRefData={testPlayerProfile}
                    initialPlayerAccountRefData={testPlayerAccount}

                    fetchPlayerInfoSets={passInPlayerInfoSets}
                    fetchCurrentGameData={passInCurrentGameDataList}

  
                    getUILanguage={passInUILanguage}
                    initialUILanguage={languageCodeTextOption}

                    fetchShopItemInfo={passInShopItemInfo}
                    fetchPlayerPurchaseInfo={passInPlayerPurchaseStatus}

                    visualMap={visualMap}
                    audioMap={audioMap}
                    sendOutGameSettingScaleObjFromSubCompo={notUsing}

                    getOpenSettingSignal={passInFalseBool}
                    closeSettingsPage={notUsing} 

                  />






                </div>
          
          </div>
          </div>


      </div>}

{/*  Entire Viewing -- all parts NOT-USING */}
    {false && 

<div>

        <button
          className="testEntire" 
          onClick={()=>{
              setMutedViewOption(!mutedViewOption);
          }}
        >
          {mutedViewOption === true && <label>Unmute</label>}
          {mutedViewOption === false && <label>Mute</label>}

        </button>
    

<div style={{"display": "flex"}}>
    {/* entire-viewer-screen */}
      <div
        style={{
          "height": `${screenHeight+2}px`,
          "width": `${screenWidth+2}px`,
        }}

      >



      </div>



</div>

      </div>}
{/*  Entire Viewing -- all parts NOT-USING */}















</div>








</>} 



{/* cloudDbConnOk */}



  </div>


  








); //end of entire component
}
























































































//default -     current Project Nav
    /*
    "screenSize": "4:3(horizonal)",
    "defaultCornerRadius": 0,
    
    "isWithSL": false,
    "fontFamilyForAll": "serif",

    "mainPage-story": true,
    "mainPage-shop": true,
    "mainPage-setting": true,
    "mainPage-playerProfile": true,
    "mainPage-entriesHorizontal": false,
    "mainPage-entriesCustom": false,

    "mainPage-isBackgroundShape": false,
    "mainPage-bgShadeName": "rgb(222, 222, 235)",
    "mainPage-bgPicName": "",
    "mainPage-isListItemShape": true,
    "mainPage-listItemShadeName": "#c0cfe2",
    "mainPage-listItemPicName": "",
    "mainPage-listItemGroupX": 600,
    "mainPage-listItemGroupY": 150,
    "mainPage-listItemGroupWidth": 120,
    "mainPage-listItemGroupHeight": 60,
    "mainPage-listItemGap": 3,
    "mainPage-listItemGroupFontColor": "",
    "mainPage-listItemGroupFontSize": 10,
    "mainPage-listItemGroupCornerRadius": 0, //TODO
    "mainPage-listItemTextFont": "serif", //TODO

    "mainPage-story-isShape": false,
    "mainPage-story-shadeName": "#c0cfe2",
    "mainPage-story-picName": "",
    "mainPage-setting-isShape": false,
    "mainPage-setting-shadeName": "#c0cfe2",
    "mainPage-setting-picName": "",
    "mainPage-playerProfile-isShape": false,
    "mainPage-playerProfile-shadeName": "#c0cfe2",
    "mainPage-playerProfiley-picName": "",
    "mainPage-shop-isShape": false,
    "mainPage-shop-shadeName": "#c0cfe2",
    "mainPage-shop-picName": "",

    "mainPage-story-posX": 300,
    "mainPage-story-posY": 100,
    "mainPage-story-width": 100,
    "mainPage-story-height": 60,
    "mainPage-story-fontSize": 10,
    "mainPage-story-fontColor": "",
    "mainPage-setting-posX": 300,
    "mainPage-setting-posY": 220,
    "mainPage-setting-width": 100,
    "mainPage-setting-height": 60,
    "mainPage-setting-fontSize": 10,
    "mainPage-setting-fontColor": "",
    "mainPage-playerProfile-posX": 300,
    "mainPage-playerProfile-posY": 160,
    "mainPage-playerProfile-width": 100,
    "mainPage-playerProfile-height": 60,
    "mainPage-playerProfile-fontSize": 10,
    "mainPage-playerProfile-fontColor": "",
    "mainPage-shop-posX": 300,
    "mainPage-shop-posY": 280,
    "mainPage-shop-width": 100,
    "mainPage-shop-height": 60,
    "mainPage-shop-fontSize": 10,
    "mainPage-shop-fontColor": "",

    "mainPage-story-name": "Story",
    "mainPage-setting-name": "Settings",
    "mainPage-playerProfile-name": "Player Profile",
    "mainPage-shop-name": "shop",

    "saveloadPage-isBackgroundShape": false,
    "saveloadPage-bgShadeName": "rgb(222, 222, 235)",
    "saveloadPage-bgPicName": "",
    "saveloadPage-isSlotShape": false,
    "saveloadPage-slotShadeName": "#c0cfe2",
    "saveloadPage-slotPicName": "",
    "saveloadPage-slotListIsHorizontal": false,
    "saveloadPage-slotPerPage": 3,
    "saveloadPage-slotRowCount": 2,
    "saveloadPage-slotColCount": 3,
    "saveloadPage-slotPageCount": 10,
    "saveloadPage-slotWidth": 500,
    "saveloadPage-slotHeight": 75,
    "saveloadPage-slotGap": 3, 
    "saveloadPage-groupPosX": 150,
    "saveloadPage-groupPosY": 100,
    
    "settingPage-playSpeed": true,
    "settingPage-bgmVol": true,
    "settingPage-seVol": true,
    "settingPage-entriesHorizontal": false,
    "settingPage-entriesCustom": false,

    "settingPage-isBackgroundShape": false,
    "settingPage-bgShadeName": "rgb(222, 222, 235)",
    "settingPage-bgPicName": "",
    "settingPage-isListItemShape": false,
    "settingPage-listItemShadeName": "#c0cfe2",
    "settingPage-listItemPicName": "",
    "settingPage-listItemGroupX": 130,
    "settingPage-listItemGroupY": 60,
    "settingPage-listItemGroupWidth": 550,
    "settingPage-listItemGroupHeight": 75,
    "settingPage-listItemFontSize": 20,
    "settingPage-listItemFontColor": "",
    "settingPage-listItemGap": 30,
    "settingPage-playSpeedName":"Play Speed",
    "settingPage-bgmVolName": "Background Music Volume",
    "settingPage-seVolName": "Sound Effect Volume",
    "settingPage-sliderWidth": 350,
    "settingPage-sliderHeight": 50,
    "settingPage-sliderColor": "#0373fc",

    "playerProfilePage-isBackgroundShape": false,
    "playerProfilePage-bgShadeName": "rgb(222, 222, 235)",
    "playerProfilePage-bgPicName": "",
    "playerProfilePage-itemMap": [],

    "playerProfilePage-previewingTextObj-isPreviewing": false,
    "playerProfilePage-previewingTextObj-textContent": "",
    "playerProfilePage-previewingTextObj-textItalic": false,
    "playerProfilePage-previewingTextObj-textFontSize": 12,
    "playerProfilePage-previewingTextObj-textFont": "serif",
    "playerProfilePage-previewingTextObj-textColor": "#000000",
    "playerProfilePage-previewingTextObj-posX": 30,
    "playerProfilePage-previewingTextObj-posY": 50,

    "playerProfilePage-previewingValueObj-isPreviewing": false,
    "playerProfilePage-previewingValueObj-labelText": "",
    "playerProfilePage-previewingValueObj-valueItemType": "Game Data",
    "playerProfilePage-previewingValueObj-valueItemName": "",
    "playerProfilePage-previewingValueObj-posX": 30,
    "playerProfilePage-previewingValueObj-posY": 70,
    "playerProfilePage-previewingValueObj-textFontSize": 12,
    "playerProfilePage-previewingValueObj-textFont": "serif",
    "playerProfilePage-previewingValueObj-textColor": "#000000",

    "playerProfilePage-previewingPicObj-isPreviewing": false,
    "playerProfilePage-previewingPicObj-posX": 50,
    "playerProfilePage-previewingPicObj-posY": 50,
    "playerProfilePage-previewingPicObj-picName": "",
    "playerProfilePage-previewingPicObj-width": 200,
    "playerProfilePage-previewingPicObj-height": 200,

    "playerProfilePage-playerProfileNickNameItem-adding": true,
    "playerProfilePage-playerProfileNickNameItem-nicknameLabel": "",
    "playerProfilePage-playerProfileNickNameItem-textContent": "",
    "playerProfilePage-playerProfileNickNameItem-textItalic": false,
    "playerProfilePage-playerProfileNickNameItem-textFontSize": 12,
    "playerProfilePage-playerProfileNickNameItem-textFont": "serif",
    "playerProfilePage-playerProfileNickNameItem-textColor": "#000000",
    "playerProfilePage-playerProfileNickNameItem-posX": 357,
    "playerProfilePage-playerProfileNickNameItem-posY": 300,

    "playerProfilePage-playerProfileIconPicItem-adding": true,
    "playerProfilePage-playerProfileIconPicItem-posX": 275,
    "playerProfilePage-playerProfileIconPicItem-posY": 50,
    "playerProfilePage-playerProfileIconPicItem-width": 200,
    "playerProfilePage-playerProfileIconPicItem-height": 200,
    "playerProfilePage-playerProfileIconPicItem-scale": 1,



    "shopPage-isBackgroundShape": false,
    "shopPage-bgShadeName": "rgb(222, 222, 235)",
    "shopPage-bgPicName": "",
    
    "shopPage-listItem-isBackgroundShape": false,
    "shopPage-listItem-bgShadeName": "rgb(222, 222, 235)",
    "shopPage-listItem-bgPicName": "",
    "shopPage-listItem-width": 150,
    "shopPage-listItem-height": 200,
    "shopPage-listItem-gap": 15,
    "shopPage-listItem-groupX": 0,
    "shopPage-listItem-groupY": 30,
    "shopPage-listItem-cornerRadius": 0,
    "shopPage-listItem-buyText": "Buy",   
    "shopPage-listItem-infoText": "Info",

    "shopPage-bConfWindow-width": 500,
    "shopPage-bConfWindow-height": 200,
    "shopPage-bConfWindow-textColor": "#000000",
    "shopPage-bConfWindow-bgColor": "pink",
    "shopPage-bConfWindow-cornerRadius": 0,
    "shopPage-bConfWindow-cancelText": "Cancel",    
    "shopPage-bConfWindow-confirmText": "Confirm",    
        

    "storyPage-chapterListHorizontal": false,
    "storyPage-isBackgroundShape": false,
    "storyPage-bgShadeName": "rgb(222, 222, 235)",
    "storyPage-bgPicName": "",
    "storyPage-isListItemShape": true,
    "storyPage-listItemShadeName": "#c0cfe2",
    "storyPage-listItemPicName": "",
    "storyPage-listItemGroupX": 120,
    "storyPage-listItemGroupY": 182,
    "storyPage-listItemGroupWidth": 560,
    "storyPage-listItemGroupHeight": 45,
    "storyPage-listItemGap": 25,
    "storyPage-listItemGroupFontColor": "",
    "storyPage-listItemGroupFontSize": 22,

    "gsdPage-isBackgroundShape": false,
    "gsdPage-bgShadeName": "rgb(222, 222, 235)",
    "gsdPage-bgPicName": "",

    "backButton-width": 50,
    "backButton-height": 50,
    "backButton-isShape": false,
    "backButton-shapeColor": "#c0cfe2",
    "backButton-picName": "",
    "backButton-displayText": "←",
    "backButton-fontSize": 15,

    "outWindow-askContent": "Are you sure to quit the story?",
    "outWindow-width": 200,
    "outWindow-height": 90,
    "outWindow-Btn-cornerRadius": 0,
    "outWindow-Btn-color": "grey",
    "outWindow-Btn-textColor": "#FFFFFF",
    "outWindow-Btn-confirmingText": "confirm",
    "outWindow-Btn-cancellingText": "cancel",
    "outWindow-horizontalCentred": true,
    "outWindow-verticalCentred": true,
    "outWindow-windowCornerRadius": 0,
    "outWindow-posX": 200,
    "outWindow-posY": 230,
    "outWindow-isShape": false,
    "outWindow-color": "pink",
    "outWindow-picName": "",
  */  


    /*  sample of gridBlocksAll
     "chp-key1": 
      [
        ["","","","","","","","","",""], 
        ["","","","","","","","","",""],
        ["chapterStart","A1-key","","","D1-key","E1-key","","","",""], 
        ["","","","","","","","","",""],
        ["C1-key","","","B1-key","","","chapterEnd","","",""]
      ]
    ,
      "chp-key2": [
          ["","","","","","","","","",""], 
          ["","","","","","","","","",""],
          ["chapterStart","A2-key","","","D2-key","E2-key","","","",""], 
          ["","","","","","","","","",""],
          ["C2-key","","","B2-key","","","chapterEnd","","",""]
      ],  
    
    */
/* sample of node-map-all
  "chp-key1": {"chapterStart": {
              nodeName: "chapterStart1-title", 
              row: 2, 
              col: 0, 
              nextNode:"A1-key", 
              display: true, 
              nodeType:"*chapterStart*", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "A1-key": {
              nodeName: "A1-title", 
              row: 2, 
              col: 1, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "B1-key": {
              nodeName: "B1-title", 
              row: 4, 
              col: 3, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "C1-key": {
              nodeName: "C1-title", 
              row: 4, 
              col: 0, 
              spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],  
              display: true, 
              nodeType:"LogicSplitter",
              notes: "",
          },
          "D1-key": {
              nodeName: "D1-title", 
              row: 2, 
              col: 4, 
              nextNode:"", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "E1-key": {
              nodeName: "E1-title", 
              row: 2, 
              col: 5, 
              nextNode: "chapterEnd", 
              display: true, 
              nodeType:"Conversation", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
          "chapterEnd": {
              nodeName: "chapterEnd1-title", 
              row: 4, 
              col: 6, 
              nextNode: "", 
              display: true, 
              nodeType:"*chapterEnd*", 
              screenSize:"4:3(horizonal)",
              notes: "",
          },
  },
  "chp-key2": {"chapterStart": {
            nodeName: "chapterStart2-title", 
            row: 2, 
            col: 0, 
            nextNode:"A2-key", 
            display: true, 
            nodeType:"*chapterStart*", 
            screenSize:"4:3(horizonal)",
            notes: "",
        },
        "A2-key": {
            nodeName: "A2-title", 
            row: 2, 
            col: 1, 
            nextNode:"", 
            display: true, 
            nodeType:"Conversation", 
            screenSize:"4:3(horizonal)",
            notes: "",
        },
        "B2-key": {
            nodeName: "B2-title", 
            row: 4, 
            col: 3, 
            nextNode:"", 
            display: true, 
            nodeType:"Conversation", 
            screenSize:"4:3(horizonal)",
            notes: "",
        },
        "C2-key": {
            nodeName: "C2-title", 
            row: 4, 
            col: 0, 
            spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],    //TODO refactor 
            display: true, 
            nodeType:"LogicSplitter",
            notes: "",
        },
        "D2-key": {
          nodeName: "D2-title", 
          row: 2, 
          col: 4, 
          nextNode: "", 
          display: true, 
          nodeType:"Conversation", 
          screenSize:"4:3(horizonal)",
          notes: "",
        },
        "E2-key": {
          nodeName: "E2-title", 
          row: 2, 
          col: 5, 
          nextNode: "chapterEnd", 
          display: true, 
          nodeType:"Conversation", 
          screenSize:"4:3(horizonal)",
          notes: "",
        },
        "chapterEnd": {
          nodeName: "chapterEnd2-title", 
          row: 4, 
          col: 6, 
          nextNode:"", 
          display: true, 
          nodeType:"*chapterEnd*", 
          screenSize:"4:3(horizonal)",
          notes: "",
        },
},
*/   







    {/*//TODO TESTING */}
                    {/* <div>
                      <input type="checkbox" value={developOnCloudData} checked={developOnCloudData}
                        onChange={()=>{
                          setDevelopOnCloudData(!developOnCloudData);
                        }}
                      ></input><label>TEST toggle: Use Cloud Data</label>
                      <label>Status: {developOnCloudData === true ? "true" : "false"}</label>
                        <button
                          style={{"backgroundColor": "pink"}}
                          onClick={()=>{manuallyResetWithSampleData();}}
                        >reset ds for chapters&nodes</button>
                    </div> */}
    {/*//TODO TESTING */}



    /*
    
    
    
    
  function manuallyResetWithSampleData() {

  setChapterNodeMapAll({
    "chp-key1": {
  "chapterStart": {
      nodeName: "chapterStart1-title", 
      row: 2, 
      col: 0, 
      nextNode:"A1-key", 
      display: true, 
      nodeType:"*chapterStart*", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "A1-key": {
      nodeName: "A1-title", 
      row: 2, 
      col: 1, 
      nextNode:"", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "B1-key": {
      nodeName: "B1-title", 
      row: 4, 
      col: 3, 
      nextNode:"", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "C1-key": {
      nodeName: "C1-title", 
      row: 4, 
      col: 0, 
      spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],  
      display: true, 
      nodeType:"LogicSplitter",
      notes: "",
  },
  "D1-key": {
      nodeName: "D1-title", 
      row: 2, 
      col: 4, 
      nextNode:"", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "E1-key": {
      nodeName: "E1-title", 
      row: 2, 
      col: 5, 
      nextNode: "chapterEnd", 
      display: true, 
      nodeType:"Conversation", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
  "chapterEnd": {
      nodeName: "chapterEnd1-title", 
      row: 4, 
      col: 6, 
      nextNode: "", 
      display: true, 
      nodeType:"*chapterEnd*", 
      screenSize:"4:3(horizonal)",
      notes: "",
  },
},
"chp-key2": {
"chapterStart": {
    nodeName: "chapterStart2-title", 
    row: 2, 
    col: 0, 
    nextNode:"A2-key", 
    display: true, 
    nodeType:"*chapterStart*", 
    screenSize:"4:3(horizonal)",
    notes: "",
},
"A2-key": {
    nodeName: "A2-title", 
    row: 2, 
    col: 1, 
    nextNode:"", 
    display: true, 
    nodeType:"Conversation", 
    screenSize:"4:3(horizonal)",
    notes: "",
},
"B2-key": {
    nodeName: "B2-title", 
    row: 4, 
    col: 3, 
    nextNode:"", 
    display: true, 
    nodeType:"Conversation", 
    screenSize:"4:3(horizonal)",
    notes: "",
},
"C2-key": {
    nodeName: "C2-title", 
    row: 4, 
    col: 0, 
    spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],    //TODO refactor 
    display: true, 
    nodeType:"LogicSplitter",
    notes: "",
},
"D2-key": {
  nodeName: "D2-title", 
  row: 2, 
  col: 4, 
  nextNode: "", 
  display: true, 
  nodeType:"Conversation", 
  screenSize:"4:3(horizonal)",
  notes: "",
},
"E2-key": {
  nodeName: "E2-title", 
  row: 2, 
  col: 5, 
  nextNode: "chapterEnd", 
  display: true, 
  nodeType:"Conversation", 
  screenSize:"4:3(horizonal)",
  notes: "",
},
"chapterEnd": {
  nodeName: "chapterEnd2-title", 
  row: 4, 
  col: 6, 
  nextNode:"", 
  display: true, 
  nodeType:"*chapterEnd*", 
  screenSize:"4:3(horizonal)",
  notes: "",
},
},
  });
  setGridBlocksAll({
    "chp-key1": 
    [
      ["","","","","","","","","",""], 
      ["","","","","","","","","",""],
      ["chapterStart","A1-key","","","D1-key","E1-key","","","",""], 
      ["","","","","","","","","",""],
      ["C1-key","","","B1-key","","","chapterEnd","","",""]
    ]
  ,
    "chp-key2": [
        ["","","","","","","","","",""], 
        ["","","","","","","","","",""],
        ["chapterStart","A2-key","","","D2-key","E2-key","","","",""], 
        ["","","","","","","","","",""],
        ["C2-key","","","B2-key","","","chapterEnd","","",""]
    ],  

  }); //stores node-keys


  }
    
    
    
    
    
    
    
    
    
    */