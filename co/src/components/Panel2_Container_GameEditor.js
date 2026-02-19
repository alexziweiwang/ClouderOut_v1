import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';


import langDictionary from './_textDictionary';
import uiLangMap from './uiLangMap';
import { defaultScreenWidth, defaultScreenHeight } from './_dataStructure_DefaultObjects';


//level(-1)

import GameMaker from './Panel_2_0_GameMaker';
import ConversationNode_EditingPanel from './Panel_2_1_ConversationNode_EditingPanel';
import CardGameNode_EditingPanel from './CardGameNode_EditingPanel';

import Viewer_Entire_Screen from './Panel_2_2_Viewer_Entire_Screen';
import QuickView_AllPanels_ConvNode from './Panel_2_1_2_QuickView_AllPanels_ConvNode';


import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_GameDataManager from './Modal_GameDataManager';
import Modal_EmuManager from './Modal_EmuManager';

import { downloadObjectAsFile } from '../viewmodels/PrepAc_ProjectFileInOut';

import { checkProjectMetaData_vm } from '../viewmodels/PrepAc_ProjectFileInOut';



  import { prepare1Gdt_vm, prepare2Epp_vm, prepare3Epa_vm } from '../viewmodels/PrepAc_EmuData';
  import { prepareForNewChapterMapping_vm, triggerCreatedNewNode_Prep_vm } from '../viewmodels/PrepAc_Creations';
  
  import { saveConvNodeUiPlanVM, fetchConvNodeUiAllPlansVM } from '../viewmodels/ProjectManagerViewModel';
 
  

  import { 
    fetchAllNodes2VM
  } from '../viewmodels/NodeDataInPlayViewModel';

  import { fetchNodeByChapter2VM } from '../viewmodels/NodeDataInPlayViewModel'
  //TODO112: fetch node-contents here, and send into Viewer_Entire_Screen and its sub-component [DuringGameScreen_AllNodeTypeContainer]
  

//keep this
import { storeProjectResourceVarPairsToCloudVM } from '../viewmodels/ResourceManagerViewModel';


import { submitFileVM, fetchRmFileListVM, addToRmFileListVM, fetchUrlByFilenameVM, removeFromRmFileListVM } from '../viewmodels/ResourceManagerViewModel';




  //TODO ------------------------- new vm and model funcs for optimizations
import { fetchProjectAllMetadataVM, updateProjectMetadataSingleFieldVM, updateProjectAllMetadataVM } from '../viewmodels/ProjectMetadataViewModel'; //TODO60
import { generateNodeLongKeyString_vm, generateProjectOutputName_vm } from '../viewmodels/PrepAc_Conversion';
import { singleNodeWriteToCloudVM, createNewNodeFoldersVM, multipleNodeWriteToCloudVM } from '../viewmodels/NodeEditingViewModel';
import { dupObject, dupNestedObject, fromIndexedMapToList } from '../viewmodels/PrepAc_Conversion';

import { placeholderNameDefault } from './_dataStructure_DefaultObjects';





export default function Panel2_Container_GameEditor() {


//TODO put modals here
//TODO put editor-switching here

//TODO screen-size-string improve formatting

    const navigate = useNavigate();


    const {state} = useLocation();
    let projectName = "default-no-state projectname"; //TODO testing
    let mode = "default-node-state mode";
    let projectContentProvided = "default-node-state provided-project-content";
    
    let backendOption = "firebase";

    let modalStyleName = "displayBlock modalBackboard";


    const [isPrepFinished, setPrepFinished] = useState(false);
    const [isSavedToCloud, setSavedToCloud] = useState(true);
    const [isSavedToCloud_metadata, setSavedToCloud_metadata] = useState(true);
    const [isSavedToCloud_nodedata, setSavedToCloud_nodedata] = useState(true);



    /* display option for this large container: which editor is displayed for user */
    const [focusingEditor, setFocusingEditor] = useState("gameMaker");
    const [currentEditingChapter, setCurrentEditingChapter] = useState("");
    const [currentEditingNode, setCurrentEditingNode] = useState("");
    const [currentEditingScreenSz, setCurrentEditingScreenSz] = useState("4:3(horizonal)");
    const [currentEditingNodeEntire, setCurrentEditingNodeEntire] = useState(-1);

    /* 
    entire project-object, ! important
    meta-data (managed by game-maker)
    node-content (managed by node-editor based on each node's: by chapter-key and node-key) */
    const [projectMetaData, setProjectMetaData] = useState(-1); //TODO99
    const [projectAllNodeContent, setProjectAllNodeContent] = useState(-1); //TODO99
    const [resourcePair, setResourcePair] = useState({
        "visual": [],
        "audio": []
    });

    /* display flags for modals: resource-manager, game-data-manager, emu-data-manager */
    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [isDisplayGdmBool, setDisplayGdmBool] = useState(false);
    const [isDisplayEmBool, setDisplayEmBool] = useState(false); 

    const [isDisplayViewingAny, setDisplayViewingAny] = useState(false);
    const [isDisplayEntireGameViewer, setDisplayEntireGameViewer] = useState(false);
    const [isDisplayQuickview, setDisplayQuickview] = useState(false);

    const [editorNeedRefresh, setEditorNeedRefresh] = useState(false);

/* todo30
                        metadata: format
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
      metadataObj["slInfo"]

*/

    const [pendingNewNodeList, setPendingNewNodeList] = useState([]);

    const [chapListNestedArr, setChapListNestedArr] = useState([]);

    /* testing-emu-data, for test-viewing and emu-manager */
    const [testPlayerGameDataTracker, setTestPlayerGameDataTracker] = useState({});   //TODO important for holder-in-practice
    const [testPlayerProfile, setTestPlayerProfile] = useState({});                                                       //TODO important for holder-in-practice
    const [testPlayerAccount, setTestPlayerAccount] = useState({});                                                       //TODO important for holder-in-practice
    const [testPlayerSLRecords, setTestPlayerSLRecords] = useState({
        "playername": "playerA",
        "itemStatus": [{}, {}, {}]
    });
    
    const [testShopProducts, setTestShopProducts] = useState({});
    const [testPlayerPurchaseStatus, setTestPlayerPurchaseStatus] = useState({});
  


//for entire-viewing test
    const [currTestingPageStatus, setCurrTestingPageStatus] = useState("Main Page"); //move to outer-layer
    const [currTestingChapterKey, setCurrTestingChapterKey] = useState(""); //move to outer-layer
    const [currTestingChapterTitle, setCurrTestingChapterTitle] = useState(""); //move to outer-layer
    const [currTestingNodeKey, setCurrTestingNodeKey] = useState(""); //move to outer-layer
    const [currTestingNodeType, setCurrTestingNodeType] = useState(""); //move to outer-layer
    
    const [currTestingPageName, setCurrTestingPageName] = useState("Main Page"); //move to outer-layer
    
    const [currTestingScrnW, setCcurrTestingScrnW] = useState(defaultScreenWidth);
    const [currTestingScrnH, setCcurrTestingScrnH] = useState(defaultScreenHeight);

    const [nodeViewingEntryNum, setNodeViewingEntryNum] = useState(0);

    const [viewerEntireGameProgressObj, setViewerEntireGameProgressObj] = useState({
        "pageStatus": "Main Page",
        "chapterKey": "",
        "nodeKey": "",
        "nodeType": "",
        "chapterTitle": "",
    });

    const [viewingFirstChapterKey, setViewingFirstChapterKey] = useState(-1);
    const [viewerEntireFirstChapterData, setViewerEntireFirstChapterData] = useState(-1);


    function handleCancelNodeTestViewer() {
//TODO reset things like:
console.log("handle Cancel NodeTest Viewer:", projectMetaData["emu4sets"]["gdt1"]);

        //initialPieceNum
        setTestPlayerGameDataTracker(projectMetaData["emu4sets"]["gdt1"]);

        setDisplayViewingAny(false);
        setDisplayQuickview(false);
    }

    function handleCancelEntireViewer() {
        // reset all game-progress
        setCurrTestingPageStatus("Main Page");
        setCurrTestingChapterKey("");
        setCurrTestingChapterTitle("");
        setCurrTestingNodeKey("");
        setCurrTestingNodeType("");

        setTestPlayerGameDataTracker(projectMetaData["emu4sets"]["gdt1"]);

        setDisplayEntireGameViewer(false);
        setDisplayViewingAny(false);
    }

    function passInOriginalGdtracker() {
        return projectMetaData["emu4sets"]["gdt1"];
    }

    function notifyUpdateCurrentStanding(obj) { //fetch from sub-compo
        setCurrTestingPageStatus(obj["pageStatus"]);
        setCurrTestingChapterKey(obj["chapterKey"]);
        setCurrTestingNodeKey(obj["nodeKey"]);
        setCurrTestingNodeType(obj["nodeType"]);
        setCurrTestingChapterTitle(obj["chapterTitle"]);
    }

    function notifyNodeWalk(nodeKeyName, nodeTypeName) { //important for viewing //from sub-compo
        setCurrTestingNodeKey(nodeKeyName);
        setCurrTestingNodeType(nodeTypeName);
    }

    function notifyCurrGdt(gdtObj) {
                   console.log("panel2-received gdt = ", gdtObj);
       setTestPlayerGameDataTracker(gdtObj);
    }



    if (state !== null && state !== undefined) {
      projectName = state.selected_project_name;
      mode = state.mode;
      projectContentProvided = state.providedImptProj;                                                         //   projectContentProvided = state.
                       //       console.log("init-container-panel2... \n mode = ", state.mode, "\n state = ", state);

    }

    const textDictItem = langDictionary[
            (projectMetaData === -1 
            || projectMetaData === undefined 
            || projectMetaData["ui_language"] === undefined) 
                    ? "en" 
                    : projectMetaData["ui_language"]
            ];

    const textDictItemDefault = langDictionary["en"];
  
    const resourceManagerButtonText = textDictItem.resourceManagerButtonText !== undefined ?
            textDictItem.resourceManagerButtonText
            : textDictItemDefault.resourceManagerButtonText;
  
    const gameDataManagerButtonText = textDictItem.gameDataManagerButtonText !== undefined ?
            textDictItem.gameDataManagerButtonText
            : textDictItemDefault.gameDataManagerButtonText;

    const emuManagerText = textDictItem.emuManagerText !== undefined ?
            textDictItem.emuManagerText
            : textDictItemDefault.emuManagerText;  
            
    const closeText = textDictItem.closeText !== undefined ?
            textDictItem.closeText
            : textDictItemDefault.closeText;

    function goToNotLoggedInPage() {
        navigate('/notloggedin', { replace: true });
    }


    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (state === undefined || state === null) {
            navigate('/mainpanel', { replace: true });
    
        } 


        if (firstTimeEnter === true) {
            setPendingNewNodeList([]);

            setFirstTimeEnter(false);
        }

        if (isSavedToCloud_metadata === false 
         || isSavedToCloud_nodedata === false
        ) {
                // remind user to check saving-status if ANY of these two unsaved

                                    // if (isSavedToCloud === false) {

        
            window.onbeforeunload = () => { // exit or refresh

                    return "show message";
            };
        } else {
            window.onbeforeunload = undefined;
        }
        
        let checkMetadataValid = checkProjectMetaData_vm(projectMetaData);

                                                        console.log("panel2 (render once) - mode = ", state.mode, 
                                                            // "... isPrepFinished = ", isPrepFinished, 
                                                            // "\n focusing on: ", focusingEditor, 
                                                            "\n username = ", authEmailName,
                                                            "\n\t metadata = ", projectMetaData,
                                                            // "\n\t ChapListNestedArr = ", chapListNestedArr,
                                                            // "\n\tmetadata valid ? ", checkMetadataValid,
                                                            // "\n\n\t all-node-content = ", projectAllNodeContent,

                                                            // "\nprojectMetaData[emu4sets][gdt1] = ", checkMetadataValid === true ? projectMetaData["emu4sets"].gdt1 : "invlid",
                                                            // "\ntestPlayerGameDataTracker = ", testPlayerGameDataTracker,
                                                            
                                                        );

 
        if (state === null && state.mode === "online_cloud") {
                                    console.log("!!! not logged in - going to -login_page......");
            goToNotLoggedInPage();
        }

        if (state === undefined) {
            goToNotLoggedInPage();
        }

                                                // if (authEmailName !== "_" && firstTimeEnter === true) {


                                                                        //TODO
                                                                        // if : condition of init-status of var...
                                                                        // setFirstTimeEnter(false);

                                            
                                                // }

        if (state.mode !== "online_cloud") {
            if (projectMetaData === -1 || projectAllNodeContent === -1) {
                loadEverythingFromLocalProjFile();
            } else {
                prepFirstViewingChapter();
            }
            
        } else if (state.mode === "online_cloud") {
            //TODO fetch from cloud...
          
            //prepare for project-content map, and fetch when user reached that chapter?
            if (authEmailName !== "_") {
          
                if ((projectMetaData === -1 || projectAllNodeContent === -1)) {
                    loadEverythingFromCloud();
                } else {
                    prepFirstViewingChapter();
                }
   
            }



        }



        if (authEmailName === "_" && state.mode === "online_cloud") { // get login info
            getAuthFirebase(
                {
                  goToNotLoggedInPageFunc: goToNotLoggedInPage,
                  sendOutEmailName: setAuthEmailName
                }
            );
        } else if (state.mode !== "online_cloud") {
            setAuthEmailName("localUser###");
        }

    //    console.log("\n\n\n\n\n\npanel2 state = ", state);


  //      console.log("isSavedToCloud = ", isSavedToCloud);
    });


        
    useEffect(()=>{ //track if metadata changed
        setSavedToCloud(false); //both-flag
        setSavedToCloud_metadata(false); 

        let varPairObj = {
            "visual": projectMetaData["proj_resource_visual"],
            "audio": projectMetaData["proj_resource_audio"]
        }
        setResourcePair(varPairObj);


                        console.log("\n$$$$$$ projectMetaData[emu4sets][gdt1] = ", 
                        projectMetaData["emu4sets"] !== undefined ? projectMetaData["emu4sets"].gdt1 : "invalid",);
        
    }, [
        projectMetaData
    ]);
        
    useEffect(()=>{ //track if node-content changed
        setSavedToCloud(false); //both-flag
        setSavedToCloud_nodedata(false); 
                
    }, [
        projectAllNodeContent
    ]);


    useEffect(()=>{ 
        console.log("$$$ testPlayerGameDataTracker changed: ", testPlayerGameDataTracker);
                
    }, [
        testPlayerGameDataTracker
    ]);


  


    function switchEditor(visitInfoObj) {
        let longKey = generateNodeLongKeyString_vm({chapterKey: visitInfoObj["chapterKey"], nodeKey: visitInfoObj["nodeKey"]});

        if (projectAllNodeContent === undefined 
                || projectAllNodeContent[longKey] === undefined
                || projectAllNodeContent[longKey] === null  
                || projectAllNodeContent[longKey].nodeContent === undefined
                || projectAllNodeContent[longKey].nodeUISettings === undefined            
       
    
            //TODO20
            ) {
                                        console.log("projectAllNodeContent not ready: undefined (for [", longKey, "], \n", projectAllNodeContent);
            return;
        }

        // object format: 
        // {      
        //     "nodeType": "",
        //     "nodeKey": clickedNodeKey, 
        //     "projectName": projectName, 
        //     "username": userName, 
        //     "screenSizeStr": screenSizeStr, 
        //     "uiLang": uiLang, 
        //     "chapterKey": chapterKey,
        //     "editorMode": editorMode,
        //     "nodeType": currNodeType
        // }
        //TODO99999
        if (visitInfoObj === undefined) {
            return;
        }

        //TODO compare project name
            // visitInfoObj["projectName"] 

        //TODO compare username
            // visitInfoObj["username"]

        //TODO check editorMode - mode name
            // visitInfoObj["editorMode"]


        //TODO details for this node
            // visitInfoObj["screenSizeStr"] 
            // visitInfoObj["uiLang"] 
            // visitInfoObj["chapterKey"]
            
        //TODO check if this node exists in the ds !!!

     
        setCurrentEditingChapter(visitInfoObj["chapterKey"]);
        setCurrentEditingNode(visitInfoObj["nodeKey"]);
        setCurrentEditingScreenSz(visitInfoObj["screenSizeStr"]);
        setCurrentEditingNodeEntire(projectAllNodeContent[longKey]);

        console.log("switch-editor:  node-data-obj = ", projectAllNodeContent);
        

        switch (visitInfoObj["nodeType"]){
        
                case "Conversation":
                    setFocusingEditor("Conversation");
                    break;
                case "Card Game":
                    setFocusingEditor("CardGame");
                    break;
              
                default:
                    console.log("default in switch-editor");
        }

    }

    function loadEverythingFromLocalProjFile() {
                                                console.log("\t\t!!! func: load-EverythingFrom_LocalProjFile = ", state.projectFile);

        let projectFile = state.projectFile;
        let metadataTemp = projectFile["meta_data"];
        let chapterContentTemp = projectFile["chapter_content"];
    
    
        if (metadataTemp === undefined || chapterContentTemp === undefined) {
          return;
        }
    
        let res = checkProjectMetaData_vm(metadataTemp);
        if (res === true) {

            setProjectMetaData(metadataTemp);
            //TODO99999 setup visual-var-pair and audio-var-pair maps

            chapterListConversionPrep(metadataTemp["chapterList"]);
  
            setProjectAllNodeContent(chapterContentTemp);
        } else {
            alert("Data for this project file is broken.");

        }

        setPrepFinished(true);
        
    }

    async function loadEverythingFromCloud() {
                    console.log("load everything from cloud (At panel2): ", authEmailName, "...", state.selected_project_name);

        if (authEmailName === "_" 
        || state.selected_project_name === undefined
        ) {            
            return;
        }

   
        await loadMetadataFromCloud()
        .then(async()=>{
            await loadProjectAllNodeContentFromCloud();
        })
        .then(()=>{
                        console.log("metadata-prep finished!");
            setPrepFinished(true);
        });

 
    }

    async function loadMetadataFromCloud() {
        await fetchProjectAllMetadataVM({
            projectName: state.selected_project_name, 
            currUser: authEmailName,
            bkOption: backendOption
        }).then((metadataTemp)=>{

                                        console.log("panel2-everything from cloud: metadata = ", metadataTemp); 
        
            if (metadataTemp !== undefined) {
                let res = checkProjectMetaData_vm(metadataTemp);
                if (res === true) {
                    chapterListConversionPrep(metadataTemp["chapterList"]);

                    //!important
                    setProjectMetaData(metadataTemp);

                } else {
                    alert("Data for this project file is broken.");
                }
            }

        })


   

        //TODO99999

                        //example obj(for metadata): 
                                // author_info:  ""
                                // chapterList: {0: Array(4), 1: Array(4), 2: Array(4)}
                                // chapterNodeMapping:  {placeholder: {…}, chapter1: {…}, chapter2: {…}}
                                // convNodeUiPlanMap:  {}
                                // emu4sets:  {shp5: {…}, ess4: {…}, epp2: {…}, gdt1: {…}, epa3: {…}}
                                // game_data:  {health: {…}}
                                // nav_ui_settings:  {outWindow-Btn-textColor: '#FFFFFF', mainPage-playerProfile-posX: 300, shopPage-bConfWindow-confirmText: 'Confirm', settingPage-sliderColor: '#0373fc', mainPage-shop-isShape: false, …}
                                // proj_resource_audio:  [] //array
                                // proj_resource_visual:  [{…}] //array
                                // project_description:  ""
                                // project_name:  "a6_p2"
                                // project_title:  "a6_p2"
                                // sizeDirection:  "16:9(horizonal)"
                                // trashed:  false
                                // type:  "project"
                                // ui_language: "chn"

    }

    async function loadProjectAllNodeContentFromCloud() {
        await fetchAllNodes2VM({
            projectName: state.selected_project_name, 
            uname: authEmailName,
            bkOption: backendOption
        }).then((chapterContentTemp)=>{
//TODO improve here
                        console.log("panel2-everything from cloud: all-node-contents = ", chapterContentTemp); 

            
            setProjectAllNodeContent(chapterContentTemp);

        }); 
        //TODO99999 fetch from cloud --- path: user-projects-<project key>-folder
     
    }

    function chapterListConversionPrep(clistmap) {
        let listTemp = fromIndexedMapToList(clistmap);
        setChapListNestedArr(listTemp);
    }

    function updateLargeMetadataObjForChanges() {
        // based on local hooks, update the "projectMetadata" large-object here for the version-control...?
        
            //local hooks:
        //gameDataDesignList
        //languageCodeTextOption
        //currentProjectNav
        //chapterList
        //chapterNodeMapAll
        //visualVarPairs
        //audioVarPairs


         // author_info:  ""
                                // chapterList: {0: Array(4), 1: Array(4), 2: Array(4)}
                                // chapterNodeMapping:  {placeholder: {…}, chapter1: {…}, chapter2: {…}}
                                // convNodeUiPlanMap:  {}
                                // emu4sets:  {shp5: {…}, ess4: {…}, epp2: {…}, gdt1: {…}, epa3: {…}}
                                // game_data:  {health: {…}}
                                // nav_ui_settings:  {outWindow-Btn-textColor: '#FFFFFF', mainPage-playerProfile-posX: 300, shopPage-bConfWindow-confirmText: 'Confirm', settingPage-sliderColor: '#0373fc', mainPage-shop-isShape: false, …}
                                // proj_resource_audio:  [] //array
                                // proj_resource_visual:  [{…}] //array
                                // project_description:  ""
                                // project_name:  "a6_p2"
                                // project_title:  "a6_p2"
                                // sizeDirection:  "16:9(horizonal)"
                                // trashed:  false
                                // type:  "project"
                                // ui_language: "chn"

    }

    async function updateSingleFieldToCloud(fieldName, contentValue, ) { //TODO100
        await updateProjectMetadataSingleFieldVM({
            projectName: state.selected_project_name,
            currUser: authEmailName, 
            fieldName: fieldName, 
            contentValue: contentValue, 
            bkOption: backendOption,
        });
    }

    function prepareTestEmuDup() {
        //setup 
        let emuObj = projectMetaData["emu4sets"];
        let dup1 = dupNestedObject(emuObj["gdt1"]);
        setTestPlayerGameDataTracker(dup1);

        console.log("when starting viewing -- gdt1 = ", dup1, "\nemuObj = ", emuObj);

        let dup2 = dupObject(emuObj["epp2"]);
        setTestPlayerProfile(dup2);

        let dup3 = dupObject(emuObj["epa3"]);
        setTestPlayerAccount(dup3);

        //"ess4"
        //"shp5"
        //TODO
        // setTestPlayerSLRecords();
        // setTestShopProducts();
        // setTestPlayerPurchaseStatus();
    }



    function updateResourcePairFromMgr(varPairObj) {

        setEditorNeedRefresh(true);

        if (varPairObj !== "default") {
        
            setResourcePair(varPairObj);
            setProjectMetaData({...projectMetaData,
                "proj_resource_visual": varPairObj.visual,
                "proj_resource_audio": varPairObj.audio
            });
            //TODO test
        }


    }
    

    function goToGameMakerResetNodeFocus() {
        setFocusingEditor("gameMaker");
        setCurrentEditingChapter("");
        setCurrentEditingNode("");
  
    }



    function startViewerEntireTest() {
        
        
                                    console.log("startViewerEntireTest ! ");

        //TODO when all emu-set-data ready
        
        //TODO prep: either emu-set-data or in-prac-user data?

        //TODO99999

        //TODO intialize first-chapter!


        setViewerEntireGameProgressObj({
            "pageStatus": "Main Page",
            "chapterKey": "",
            "nodeKey": "",
            "nodeType": "",
            "chapterTitle": "",
        });
        
        setCurrTestingPageStatus("Main Page");

        prepareTestEmuDup();

        setDisplayEntireGameViewer(true);
        setDisplayViewingAny(true);
    
    }

    function startViewerSingleNodeTest(obj) {
                            console.log("starting viewer-node-test!", obj);

//TODO999999
//obj includes: node-type, and detailed info:
        let typeVal = obj.nodeType;
        let nodeKeyName = obj.nodeKey;


        prepareTestEmuDup();

        setCurrTestingPageStatus("During Game"); 
        setCurrTestingPageName("During Game");

        setCurrTestingChapterKey(currentEditingChapter); 
        setCurrTestingChapterTitle(""); //TODO

        setCurrTestingNodeKey(nodeKeyName); 
        setCurrTestingNodeType(typeVal);


        //projectAllNodeContent[currTestingNodeKey]
        let testingNodeEvrt= projectAllNodeContent[nodeKeyName];
        if (testingNodeEvrt === undefined) {
                            console.log("unnable to find the view-testing node");
            return;
        }

                            console.log("view-testing node: ", testingNodeEvrt);


                        //TODO99999 prepare for < QuickView_AllPanels_ConvNode />
                            // allPieceContent={projectAllNodeContent[currTestingNodeKey].nodeContent}  //from node's obj (data-structure)

                            // uiData1_textframe={projectAllNodeContent[currTestingNodeKey]["nodeUISettings"].textFrame}  //from node's obj (data-structure)
                            // uiData2_defaultButtonOption={projectAllNodeContent[currTestingNodeKey]["nodeUISettings"].defaultButton}  //from node's obj (data-structure) 
                            // uiData3_ConvNavigation={projectAllNodeContent[currTestingNodeKey]["nodeUISettings"].convNav}  //from node's obj (data-structure)
                            // uiData4_logPageSettings={projectAllNodeContent[currTestingNodeKey]["nodeUISettings"].logPage}  //from node's obj (data-structure)
                            // initialEmuGameDataTracker={testPlayerGameDataTracker}




        switch (typeVal){
        
            case "Conversation":
//TODO-------------------------
//TODO100

                //TODO assign previewingIndex with:    obj.entryPointNum
                setNodeViewingEntryNum(obj.entryPointNum);


                // setCcurrTestingScrnW(?) //TODO set from node's info: testingNodeEvrt
                // setCcurrTestingScrnH(?) //TODO set from node's info: testingNodeEvrt
                 
                //TODO fetch GameDataTracker from emu-mgr

                //TODO reset-func

//TODO-------------------------
                break;
            case "Card Game":

                //TODO
                break;
          
            default:
                console.log("default in startViewerSingleNodeTest");
    }


        setDisplayViewingAny(true);
        setDisplayQuickview(true);
    }

    function updateUserConfigFromEmuManager1Gdt(data1) {
        setEditorNeedRefresh(true);

        //update data1 to be the new Game-Data-Tracker
        //TODO  //recreate emu data object
        let entireEmuD = projectMetaData["emu4sets"];
        entireEmuD["gdt1"] = data1;
        setProjectMetaData({...projectMetaData,
            "emu4sets": entireEmuD
        });

    //1    setTestPlayerGameDataTracker(data1); //prep before start-viewing
    }

    function updateUserConfigFromEmuManager2Epp(data2) {
        setEditorNeedRefresh(true);


        //update data2 to be the new Emu-Player-Profile
        //TODO  //recreate emu data object
        let entireEmuD = projectMetaData["emu4sets"];
        entireEmuD["epp2"] = data2;
        setProjectMetaData({...projectMetaData,
            "emu4sets": entireEmuD
        });

    //1    setTestPlayerProfile(data2);  //prep before start-viewing
    }

    function updateUserConfigFromEmuManager3Epa(data3) {
        setEditorNeedRefresh(true);


        //update data3 to be the new Emu Player Account
        //TODO  //recreate emu data object

        let entireEmuD = projectMetaData["emu4sets"];
        entireEmuD["epa3"] = data3;
        setProjectMetaData({...projectMetaData,
            "emu4sets": entireEmuD
        });

    //1    setTestPlayerAccount(data3);  //prep before start-viewing
    }

    function updateUserConfigFromEmuManager4Ess(data4) {
        setEditorNeedRefresh(true);


        //TODO update data4 to be the new Emu SL slots
        //TODO  //recreate emu data object
        let entireEmuD = projectMetaData["emu4sets"];
        entireEmuD["ess4"] = data4;
        setProjectMetaData({...projectMetaData,
            "emu4sets": entireEmuD
        });
        
        //TODO temp: not using
    }

    function updateUserConfigFromEmuManager5Shp(data5) {
        setEditorNeedRefresh(true);

        //TODO update data5 to be emu-shop-product-list data
        //TODO  //recreate emu data object
        let entireEmuD = projectMetaData["emu4sets"];
        entireEmuD["shp5"] = data5;
        setProjectMetaData({...projectMetaData,
            "emu4sets": entireEmuD
        });
        
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

   //1     setTestShopProducts(shopStock);
   //1     setTestPlayerPurchaseStatus(playerPurchase);
        
    }  



    function passInProjectMetaData(source) {
        if ((state.mode === "online_cloud" && authEmailName !== "_") || authEmailName === "localUser###") {
       
             //                   console.log("passing in panel2 - metadata = (requested by ", source ,")", projectMetaData);
            return projectMetaData;
        } else {
            return -1;
        }

    }

    function passInProjecAllNodeContent() {
        return projectAllNodeContent;
    }

    function passInNavObj() {
        return projectMetaData["nav_ui_settings"];
    }

    function passInProjecCurrNodeObject(nodeKeyTemp) {
        console.log("...passIn:ProjecCurrNodeObject", nodeKeyTemp, "...", projectAllNodeContent, "\n", projectAllNodeContent[nodeKeyTemp]);

        if (nodeKeyTemp === undefined || projectAllNodeContent === undefined || projectAllNodeContent[nodeKeyTemp] === undefined) {
            goToGameMakerResetNodeFocus();
            alert("Unable to go to editor for node [", nodeKeyTemp, "] !");
            return;
        }

        let nodeObject = projectAllNodeContent[nodeKeyTemp];

        return nodeObject;
    }

    function passInVisualPairs() {
        let visualVarPairs = projectMetaData["proj_resource_visual"];

        return visualVarPairs !== undefined ? visualVarPairs : {};

    }

    function passInVisualMap() {
        let visualVarPairs = projectMetaData["proj_resource_visual"];

        let resMap = {};

        if (visualVarPairs !== undefined && visualVarPairs !== null) {
            visualVarPairs.map((item, index) => {  
                let varName = item["var"];
                let urlName = item["url"];
                resMap[varName] = urlName;
            });
        }

        return resMap;

    }

    function passInAudioMap() {
        let audioVarPairs =  projectMetaData["proj_resource_audio"];

        let resMap = {};

        if (audioVarPairs !== undefined && audioVarPairs !== null) {
            audioVarPairs.map((item, index) => {  
                let varName = item["var"];
                let urlName = item["url"];
                resMap[varName] = urlName;
            });
        }

        return resMap;

    }

    function receiveUpdateForCurrNodeObject(nodeKeyTemp, nodeObjectUpdated) {
        let allNodeTemp = projectAllNodeContent;
        allNodeTemp[nodeKeyTemp] = nodeObjectUpdated;
        setProjectAllNodeContent(allNodeTemp);
    }

    function passInAuthEmailName() {
        return authEmailName;
    }

    async function saveSingleNodeContentToCloud(triggerFinishFlag) {
        //chapter is from currchapter
        //nodekey is from currndoe
        //nodeInfoObj is fetched from the large-obj: projectAllNodeContet[longKey]
                        //TODO50: for node-editing of a newly-created node: if the cloud does not have it ... write with setDoc() for it
        //currentEditingChapter
        //currentEditingNode
        //projectAllNodeContent
        let longKey = generateNodeLongKeyString_vm({chapterKey: currentEditingChapter, nodeKey: currentEditingNode});

                        console.log("saving a node... ", currentEditingChapter, " - ", currentEditingNode, " \n", projectAllNodeContent, "\n", projectAllNodeContent[longKey]);

        let obj = projectAllNodeContent[longKey];

        // save this to cloud
        await singleNodeWriteToCloudVM({
            project: state.selected_project_name, 
            username: authEmailName, 
            chapterKey: currentEditingChapter, 
            nodeKey: currentEditingNode, 
            dataObj: obj,
            bkOption: backendOption 
        }).then(()=>{
            triggerFinishFlag();

            setSavedToCloud(true); // save single node to cloud
            setSavedToCloud_nodedata(true);

                            alert("node saved!");
        });

    }

    function handleBannerGoBack() {

        // according to current focusing panel, go to different panels

        if (focusingEditor === "gameMaker") { // from game-maker to main-panel(panel1 or lo-out)
            let askStr = "Are you sure to exit?";

            let resp = window.confirm(askStr);

            if (resp) {
                    if (state.mode === "online_cloud") {
                        navigate('/mainpanel', { replace: true }); //go to panel1

                    } else {
                        navigate('/projectNonCloud', { replace: true });

                    }
            }
        } else { 
            //any node-editor


            if (isSavedToCloud_nodedata === false) {
                let askStr = "Are you sure to exit without saving the progress?";

                let ans = window.confirm(askStr);
                if (ans) {
                    goToGameMakerResetNodeFocus();
    
                }

            } else { // already saved the node-data
                goToGameMakerResetNodeFocus();

            }

            prepFirstViewingChapter();


        }

    }

    function receiveMetaDataFromSubCompo(obj) { // from game-maker //!important
        if (obj !== undefined) {
            let checkRes = checkProjectMetaData_vm(obj);
            if (checkRes === true) {
                setProjectMetaData(obj);

            }
        }
    }

    function fetchUpdatedNodeContentFromSubCompo(addingNodeKey, oneNodeContent) { //!important
        //TODO add this one-node into current content-obj, then check if valid to add

    }

    function updateUserConfigFromDataMgr1Gdt(gameDataDesignList) {
        //when game-data-design-list updates, the emu-data prepares with its default value

        let emuGdt1Temp = projectMetaData["emu4sets"]["gdt1"]; //TODO99999
      
        Object.keys(gameDataDesignList).map((currKey) => {
                                                                        // if (currKey === "p laceholder123456789___###___###___##") {
                                                                        //   return;
                                                                        // }
            if (currKey === placeholderNameDefault) {
                return;
            }
          
            if (emuGdt1Temp[currKey] !== undefined) {
    
                if (emuGdt1Temp[currKey]["current_value"] === undefined) {
                    emuGdt1Temp[currKey]["current_value"] = 
                    gameDataDesignList[currKey]["default_value"] !== undefined ? 
                        gameDataDesignList[currKey]["default_value"] 
                        : 0;
                }
               
            } else { //emuGdt1Temp[currKey] is undefined
                emuGdt1Temp[currKey] = gameDataDesignList[currKey];
                emuGdt1Temp[currKey]["current_value"] = gameDataDesignList[currKey]["default_value"];
                
            }
    
    
        });
        
        let resObj = {};
        resObj["gdt1"] = emuGdt1Temp;
        resObj["epp2"] = projectMetaData["emu4sets"]["epp2"];
        resObj["epa3"] = projectMetaData["emu4sets"]["epa3"];
        resObj["ess4"] = {"placeholder": "placerholder"};
        resObj["shp5"] = {"placeholder": "placerholder"};
    
                                                    // await updateAllSetsVM({
                                                    //     projectName: state.selected_project_name, 
                                                    //     currUser: authEmailName, 
                                                    //     dataObj: resObj,
                                                    //     bkOption: backendOption
                                                    // });

        // await updateProjectMetadataSingleFieldVM({
        //     projectName: state.selected_project_name, 
        //     currUser: authEmailName, 
        //     fieldName: "emu4sets", 
        //     contentValue: resObj, 
        //     bkOption: backendOption 
        // });

//TODO300
    
    }

    async function userChangeEditorUILang(val) {
    
        if (val.length === 0 || uiLangMap[val] === undefined) {
          return;
        }
    
        //TODO add to dictionary later
        let askStr = "Are you sure to change the editor language to: " + uiLangMap[val] + " ?";
    
    
        let resp = window.confirm(askStr);
        
        if (resp) {          
          setProjectMetaData({...projectMetaData,
                "ui_language": val
          });
  
                                                //   await updateProjectUILangVM({
                                                //     projectName: state.selected_project_name, 
                                                //     currUser: authEmailName, 
                                                //     selectedUILang: val,
                                                //     bkOption: backendOption //TODO999
                                                //   });
console.log("ui-langauge changed to: ", val);

          await updateProjectMetadataSingleFieldVM({
            projectName: state.selected_project_name, 
            currUser: authEmailName, 
            fieldName: "ui_language", 
            contentValue: val, 
            bkOption: backendOption 
          })


        }
    }
    

    function passInLocalProjectData_RsrcMgr() {

        //TODO return var-pairs
        //formatting of "fetchProjectResourceVarPairsVM"
    }

    function passInUiLanguageOption() {
        return projectMetaData["ui_language"];
    }

    function passInProjectResourceVarPairs() {
//TODO20
        let visualVarPairs = projectMetaData["proj_resource_visual"];
        let audioVarPairs = projectMetaData["proj_resource_audio]"]; 


        let obj = {
            "visual": visualVarPairs !== undefined ? visualVarPairs : {},
            "audio": audioVarPairs !== undefined ? audioVarPairs : {}
        }

                                console.log("panel2-passInProjectResourceVarPairs = ", obj);

        return obj;
    }

    function passInGameDataDesignList() {
        if (projectMetaData === undefined || projectMetaData["game_data"] === undefined) {
            return -1;

        } else {
            return projectMetaData["game_data"];

        }

    }

    function passInTestPlayerGameDataTracker() {
        return projectMetaData["emu4sets"]["gdt1"];
    }

    function passInTestPlayerProfile() {
        return projectMetaData["emu4sets"]["epp2"];
    }

    function passInTestPlayerAccount() {
        return projectMetaData["emu4sets"]["epa3"];
    }

    function passInTestPlayerSLRecords() {
        return projectMetaData["emu4sets"]["ess4"];
    }

    function passInTestShopProducts() {
        return projectMetaData["emu4sets"]["shp5"]["shopStock"];
    }

    function passInTestPlayerPurchaseStatus() {
        return projectMetaData["emu4sets"]["shp5"]["playerPurchaseStatus"];
    }

    function passInEditorFetchFlag() {
                                console.log("\tpassedin editor-fetch-flag: ", editorNeedRefresh);
        return editorNeedRefresh;
    }

    function notifySubEditorFetchFinish() {
                                console.log("\t\t @@@ fetch finished!");

        setEditorNeedRefresh(false);
    }
    

    function handleResourceManagerOpen() {
        setDisplayRmModal(true);
                                console.log("\t\t !!!@@@ resource-manager opened!");

        setEditorNeedRefresh(false);
    }   
    
    function handleGameDataManagerOpen() {
        setDisplayGdmBool(true);
        console.log("\t\t !!!@@@ game-data-manager opened!");

        setEditorNeedRefresh(false);
    }    

    function handleEmuManagerOpen() {
        setDisplayEmBool(true);

        setEditorNeedRefresh(false);
    }


    function handleResourceManagerCancel() {
                console.log("closed rm-window");
        setDisplayRmModal(false);
    }

    function handleGameDataManagerCancel() {
        console.log("closed gdm-window");

        setDisplayGdmBool(false);
    }

    function handleEmuManagerCancel() {
        console.log("closed emm-window");

        setDisplayEmBool(false);
    }



    function triggerGameDataDesignListChange(data, emuAction, singleObj) {
        //TODO999 update game-data-design-list


            if (singleObj === undefined
            || singleObj["name"] === undefined
            || singleObj["data_type"] === undefined
            || singleObj["default_value"] === undefined
            ) {
                                    console.log("!!! can't add this to game-data-design!!", singleObj);
                return;
            }

            setEditorNeedRefresh(true);

            let emu4SetsEntireTemp = projectMetaData["emu4sets"];
            let emu4SetsGdtTemp = projectMetaData["emu4sets"]["gdt1"];
                     
            let keyStr = singleObj["name"];

            if (emuAction === "addNewVar" || emuAction === "editVarDftVal") {
                emu4SetsGdtTemp[keyStr] = {
                    "current_value": singleObj["default_value"],
                    "data_type": singleObj["data_type"],
                    "default_value": singleObj["default_value"],
                    "name": keyStr,
                };       
            } else if (emuAction === "removeVar") {
                let emu4SetsGdtTemp2 = {};
                Object.keys(emu4SetsGdtTemp).map((currKey) => {
                    if (currKey !== keyStr) {
                        emu4SetsGdtTemp2[currKey] = emu4SetsGdtTemp[currKey];
                    }
                });

                emu4SetsGdtTemp = emu4SetsGdtTemp2;
            }

            emu4SetsEntireTemp["gdt1"] = emu4SetsGdtTemp;

            setProjectMetaData({...projectMetaData, 
                "game_data": data,
                "emu4sets": emu4SetsEntireTemp
            });   

    }

    function triggerCreatedNewNode_panel2(nodeKey, nodeChapter, nodeType, currChapMap) {
        
                                    console.log("called triggerCreatedNewNode_panel2 once");

        if (projectAllNodeContent === -1) {
                                    console.log("projectAllNodeContent -1");
            return;
        }

        // add this node's content into the project-all-node-content ds

        let genObjBothParts = triggerCreatedNewNode_Prep_vm(nodeType);
        // now a new node's obj is prepared

        genObjBothParts["nodeKey"] = nodeKey;
        genObjBothParts["chapterKey"] = nodeChapter;

                                console.log("trigger crated node: ", genObjBothParts);


                                    //format:
                                        // chapterKey
                                        // nodeContent
                                        // nodeKey
                                        // nodeType
                                        // nodeUISettings
        let longKey = generateNodeLongKeyString_vm({chapterKey: nodeChapter, nodeKey: nodeKey});


        let projAllNodeContentTemp = projectAllNodeContent;
        projAllNodeContentTemp[longKey] = genObjBothParts;
        setProjectAllNodeContent(projAllNodeContentTemp);
                
        //add to  pendingNewNodeList - for on-cloud-folder-creations
        let listTemp = pendingNewNodeList;
        let pair = {
            "longKey": longKey,
            "objContent": genObjBothParts
        }
        listTemp.push(pair);
        setPendingNewNodeList(listTemp);
        
        
        
                    console.log(" finally... added a new node, now proj-all-node-content is : ", projAllNodeContentTemp);


        // update metadata - node-mapping as well
        let currAllChaptersMapping = projectMetaData["chapterNodeMapping"];
        currAllChaptersMapping[nodeChapter] = currChapMap;
        setProjectMetaData({...projectMetaData, 
            "chapterNodeMapping": currAllChaptersMapping
        });
    }

    function passInCurrNodeEntire(longKey) {
        
        console.log("longKey = ", longKey, ", projectAllNodeContent[longKey] = ", projectAllNodeContent[longKey], "\n", projectAllNodeContent);

        if (projectAllNodeContent === undefined         
            ) {
            goToGameMakerResetNodeFocus();
        // } else if (projectAllNodeContent[longKey] === undefined
        //     || projectAllNodeContent[longKey] === null  
        //     || projectAllNodeContent[longKey].nodeContent === undefined
        //     || projectAllNodeContent[longKey].nodeUISettings === undefined
        // ) {
        //     //TODO369 fetch from cloud?
        //     //this node (by longKey)

        //     await fetchAllNodes2VM({
        //         projectName: state.selected_project_name, 
        //         uname: authEmailName,
        //         bkOption: backendOption
        //     }).then((chapterContentTemp)=>{
    
        //                     console.log("panel2-everything from cloud: all-node-contents = ", chapterContentTemp); 
    
                
        //         setProjectAllNodeContent(chapterContentTemp);
    
        //     }); 
        } else {
            return projectAllNodeContent[longKey];
        }

    }

    function passInAllChaptersContent() {
        return projectAllNodeContent;
    }

    function passInCurrChapterContent(chapterKeyStr) {
                            console.log("panel2__pass-in-curr-chapter-content, for [", chapterKeyStr, "]");

        if (chapterKeyStr === undefined || chapterKeyStr.length === 0) {
            return -2;
        }

        let cntt = {};
        
        Object.keys(projectAllNodeContent).map((currKey) => {
            let item = projectAllNodeContent[currKey];
            if (item["chapterKey"] === chapterKeyStr) {
                cntt[currKey] = item;
            }

        }
        );
        
                       console.log("projectAllNodeContent = ", projectAllNodeContent);
                       console.log("filtered all nodes of this chapter: [", chapterKeyStr , "] are: ", cntt);

        if (cntt === undefined) {
            //TODO369 fetch from cloud?
            //this chapter...
                        console.log("can't find curr-chapter - ", chapterKeyStr, " ... checking on-cloud");


            // await fetchNodeByChapter2VM(
            //     {
            //         projectName: state.selected_project_name,
            //         uname: authEmailName, 
            //         chapterKey: chapterKeyStr, 
            //         bkOption: backendOption
            //     }
            // ).then((updatedChapterAllNodes) => {
            //                         console.log("from cloud: ", updatedChapterAllNodes);
                
            //     let restOfMap = projectAllNodeContent.filter(e => e.chapterKey !== chapterKeyStr);

            //     Object.keys(updatedChapterAllNodes).map((currKey) => {
            //         restOfMap[currKey] = updatedChapterAllNodes[currKey];
            //     });

            //     setProjectAllNodeContent(restOfMap);

            // });

            return -2;
        } else {

            return cntt;
        }
    }
  
  

    function saveCurrNodeEntireFromSubEditor(dataObj, longKey) {
        if (projectAllNodeContent === undefined) {
            return;
        }
        //TODO99999 check node-data valid before saving to the large-node-content?


        let allNodeContentTemp = projectAllNodeContent;

        allNodeContentTemp[longKey] = dataObj;
        setProjectAllNodeContent(allNodeContentTemp);
        
    }

    function passInCurrChapAllNodes(chapterKeyName) {

    }

    function downloadAllInOne() {
        let largeObj = {
            "meta_data": projectMetaData,
            "chapter_content": projectAllNodeContent
        };
      let filename = generateProjectOutputName_vm(state.selected_project_name, authEmailName);

      // "project#" + state.selected_project_name +  "#by#" + authEmailName + "_";

      downloadObjectAsFile(largeObj, filename);

    }


    function notifyChapterWalk(chapterKeyName, chapterTitleName) { //important for viewing //from sub-compo
        // as a container outside of viewer-entire, here it uses cloud functions and ds-container for all-chapters' data

        console.log("trigger chapter walk ... [", chapterKeyName, "] with [", chapterTitleName, "]");

        // --- update displayed info ---
        setCurrTestingNodeKey("chapterStart");
        setCurrTestingNodeType("*chapterStart*");
        setCurrTestingChapterKey(chapterKeyName);
        setCurrTestingChapterTitle(chapterTitleName);

                                // let allChaptersContents = projectAllNodeContent; //TODO add later!! all nodes


        // --- data-fetching as outer-layer container of viewer-entire ---

        let chapterContentTemp = passInCurrChapterContent(chapterKeyName); //TODO add later!! all nodes

        if (chapterContentTemp === -1) {

            console.log("!!! chapter-walk: need to fetch from cloud! for chapter - ", chapterKeyName);

                                        //allChaptersContents, setAllChaptersContents
        }

        //setCurrChapterContent(chapterContentTemp); //TODO add later
                            console.log("walking into chapter [", chapterKeyName, "]: ", chapterContentTemp);
        return chapterContentTemp;
  }

  async function saveBothObjToCloud() {
    //
    if (isSavedToCloud_metadata === false) {
        await saveMetadataToCloud_panel2();
        //multipleNodeWriteToCloud-related for projectAllNodeContent

    }

    if (isSavedToCloud_nodedata === false) {
        await saveAllNodeDataToCloud_panel2();
       
    }

   // prepFirstViewingChapter();
   //TODO then: para-func for loading screen...

  }

  async function saveBothObjToCloud_release(releaseFunc) {

    if (isSavedToCloud_metadata === false && isSavedToCloud_nodedata === false) {

        await saveMetadataToCloud_panel2()
        .then(async()=>{
            await saveAllNodeDataToCloud_panel2()
            .then(() => {
                releaseFunc();
            });
        })

    } else {
        if (isSavedToCloud_metadata === false && isSavedToCloud_nodedata === true) {
            await saveMetadataToCloud_panel2()
            .then(()=>{
                releaseFunc();
            });
            //multipleNodeWriteToCloud-related for projectAllNodeContent
    
        } else if (isSavedToCloud_metadata === true && isSavedToCloud_nodedata === false) {
            await saveAllNodeDataToCloud_panel2()
            .then(()=>{
                releaseFunc();
            });

        } else { //both flags true
            releaseFunc();
        }
   

    }



   // prepFirstViewingChapter();
   //TODO then: para-func for loading screen...

  }



  async function saveAllNodeDataToCloud_panel2() {
    if (projectAllNodeContent !== -1) {
        await multipleNodeWriteToCloudVM({
            project: state.selected_project_name, 
            username: authEmailName, 
            nodeCollection: projectAllNodeContent, 
            bkOption: backendOption
        });


        setSavedToCloud(true); // save metadata to cloud
        setSavedToCloud_nodedata(true);

    }
  }

  async function saveMetadataToCloud_panel2() {

    let res = checkProjectMetaData_vm(projectMetaData);

    if (res === true) {
        await updateProjectAllMetadataVM({
            projectName: state.selected_project_name, 
            currUser: authEmailName, 
            dataObj: projectMetaData, 
            bkOption: backendOption
        });

        if (pendingNewNodeList.length > 0) {
            await createNewNodeFoldersVM({
                project: state.selected_project_name, 
                username: authEmailName, 
                nodeList: pendingNewNodeList,
                bkOption: backendOption
            });

            setPendingNewNodeList([]);
        }

        setSavedToCloud(true); // save metadata to cloud
        setSavedToCloud_metadata(true);

    }
  }

  function triggerNodeLookChange_panel2(nodeMapAll) {
    setProjectMetaData({...projectMetaData,
        "chapterNodeMapping": nodeMapAll
    });
  }

  function triggerChapterListChange_panel2(chapterListArrs, chapMapProvided) {

    setProjectMetaData({...projectMetaData,
        "chapterList": chapMapProvided
    });

    setChapListNestedArr(chapterListArrs);
  }

  function saveConvNodeUiPlanFunc(dataObj) {  
    setProjectMetaData({...projectMetaData,
        "convNodeUiPlanMap": dataObj,
    })

  }
  
  function fetchConvNodeUiAllPlansFunc() {
    
    return projectMetaData["convNodeUiPlanMap"];
  }

  function prepFirstViewingChapter() { 
      if (projectMetaData === -1) {
          return;
      }

                                //   console.log("prep FirstViewingChapter: ", projectMetaData); 
                //TODO: also, return from game-maker, if chapter-deletion happens...

      let firstChapItem = projectMetaData["chapterList"].length > 0 ? projectMetaData["chapterList"][1] : "";
      if (projectMetaData["chapterList"].length > 0) {
        let firstChapKey = firstChapItem[0];
      
        if (firstChapKey !== viewingFirstChapterKey) {
                          console.log("prep first chapter for viewer-entire... "); 
  
                          console.log("\tupdating: ", firstChapKey);
  
              let filteredMap = {};
              Object.keys(projectAllNodeContent).map((currKey) => {
                  let item = projectAllNodeContent[currKey];
                  if (item["chapterKey"] === firstChapKey) {
                      filteredMap[currKey] = item;
                  }
              }
              );
                          console.log("\tfilteredMap: ", filteredMap);
  
              setViewerEntireFirstChapterData(filteredMap);
  
              setViewingFirstChapterKey(firstChapKey);
        }

      }



  
  }


  function openTestWindow() {
    if (focusingEditor === "gameMaker") {
        
        startViewerEntireTest(); 
    } 

  }

  function hintNodeEditorOnly() {
        window.alert("This button pops the \"Settings Page\" during an actual game-play.");
  }

  

  function notUsing() {
      console.log();
  }


  function passInSLInfoOption() {
    return projectMetaData["slInfo"];
  }


  function updateSLAllInfoOption_gmk(infoObj) {
    //TODO validate infoObj

    setProjectMetaData({
        ...projectMetaData,
        "slInfo": infoObj
    });
        console.log("sl-info updated");
  }


return (
<div>


{(state !== undefined && state !== null)
&&
<div style={{"backgroundColor": "#b5b2b0"}}
    className={state.mode === "online_cloud" ? "" : "colorInvert"}
>

{(state !== undefined
&&
    ((state.mode === "online_cloud" && authEmailName !== "_" && isPrepFinished === true)
        || authEmailName === "localUser###"
    )
)
   &&
<>


{/* top banner area */}
<div>
<div className="returning_buttons_cloud_mode">
      
      {<button 
          className="button2" 
          onClick={()=>{
              //chapterChangingOrExiting(); goToDashboard();
              handleBannerGoBack();
            }}>
             ←
        </button>}


      {state.mode === "online_cloud" && <div style={{"textAlign": "start"}}>
              <label>{projectName}</label>
              <br></br>
              <label>{authEmailName}</label>
              <br></br>
              <label>Cloud Mode</label>
      </div>}



      <div
        style={{"minWidth": "150px"}}
      >

      </div>
            {focusingEditor === "gameMaker"
            && <button
                onClick={()=>{

                    openTestWindow();
                    
                }}
                className="button testEntire"
                >Test ▶︎ </button>}       


                <div className="parallelFrame buttonRight30px" style={{"width": "600px"}}>
               

                    {authEmailName !== "" && 
                    <>
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                      
                      handleResourceManagerOpen();
                        }}> 
                    {resourceManagerButtonText} </button>
                    
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                        handleGameDataManagerOpen();

                        
                        }}>
                    {gameDataManagerButtonText}</button>
                    
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                       handleEmuManagerOpen();
                        }}>
                        {emuManagerText}
                    </button>
                    </>}
                

                        <div>
                            <label>Editor Language</label><br></br>
                            <select value={projectMetaData["ui_language"]}
                            onChange={(event)=>{
                             userChangeEditorUILang(event.target.value);
                        //TODO99999
                            }}
                            >
                            <option key="lang-Eng" value="en">English</option>
                            <option key="lang-chn" value="chn">简体中文</option> 
                            {/* //TODO16 */}
                            </select>
                        </div>

                </div>

    </div>
</div>
   
   
   
   
{/* editor area */}
    {
    (
    (
        (state.mode === "online_cloud" && authEmailName !== "_") 
        || (authEmailName === "localUser###")
    )
    
    )
    && 
    <>
   

{/* Game-Maker for metadata */}
    {(focusingEditor === "gameMaker" && isPrepFinished === true)
    &&
 
    
    <>
 
    <GameMaker
        projectName={state.selected_project_name}
        editorMode={state.mode}
        switchEditor={switchEditor}
        getAuthEmailName={passInAuthEmailName} 

        initialMetadata={projectMetaData}
        getProjectMetaData={passInProjectMetaData}
        updateMetaDataToOuter={receiveMetaDataFromSubCompo}

        backendOption={backendOption}

        getUiLangOption={passInUiLanguageOption}
        getProjectResourceVarPairs={passInProjectResourceVarPairs}

        getTestPlayerGameDataTracker={passInTestPlayerGameDataTracker} //TODO change to: using metadata, also trigger changes from sub-compo
        getTestPlayerProfile={passInTestPlayerProfile} //TODO change to: using metadata, also trigger changes from sub-compo
        getTestPlayerAccount={passInTestPlayerAccount} //TODO change to: using metadata, also trigger changes from sub-compo
        getTestPlayerSLRecords={passInTestPlayerSLRecords} //TODO change to: using metadata, also trigger changes from sub-compo
        getTestShopProducts={passInTestShopProducts} //TODO change to: using metadata, also trigger changes from sub-compo
        getTestPlayerPurchaseStatus={passInTestPlayerPurchaseStatus} //TODO change to: using metadata, also trigger changes from sub-compo

        triggerCreatedNewNode_panel2={triggerCreatedNewNode_panel2}
        saveBothObjToCloud={saveBothObjToCloud}
        loadMetadataFromCloud_panel2={loadMetadataFromCloud}
        triggerNodeLookChange_panel2={triggerNodeLookChange_panel2}
        triggerChapterListChange_panel2={triggerChapterListChange_panel2}

        notifyUpdateCurrentStanding_panel2={notifyUpdateCurrentStanding}

        fetchSLInfoOption={passInSLInfoOption}
        updateSLAllInfoOption={updateSLAllInfoOption_gmk}

        handleResourceManagerOpen={handleResourceManagerOpen}
        handleGameDataManagerOpen={handleGameDataManagerOpen}
        handleEmuManagerOpen={handleEmuManagerOpen}

        getFetchFlag={passInEditorFetchFlag} //important!
        notifySubEditorFetchFinish={notifySubEditorFetchFinish} //important!
    /> 

    </>}



{/* Node Editors */}
<>
    {focusingEditor === "Conversation"
    &&

    
        <ConversationNode_EditingPanel
            
            getUiLanguageOption={passInUiLanguageOption}
            getProjectResourceVarPairs={passInProjectResourceVarPairs}
            getGameDataDesignList={passInGameDataDesignList}
            fetchConvNodeUiAllPlansFunc={fetchConvNodeUiAllPlansFunc}
            
            saveConvNodeUiPlanFunc={saveConvNodeUiPlanFunc}

            clickedNodeKey={currentEditingNode}
            projectName={state.selected_project_name}
            userName={authEmailName}
            screenSizeStr={currentEditingScreenSz}
            chapterKey={currentEditingChapter}
            editorMode={state.mode}
            
            getUiLangOption={passInUiLanguageOption}

            handleResourceManagerOpen={handleResourceManagerOpen}
            handleGameDataManagerOpen={handleGameDataManagerOpen}

            backToGameMaker={goToGameMakerResetNodeFocus}

            initialCurrNodeEverything={currentEditingNodeEntire}
            saveCurrNodeEntire={saveCurrNodeEntireFromSubEditor}

            saveBothObjToCloud_release={saveBothObjToCloud_release}

            startQuickView_panel2={startViewerSingleNodeTest}
            getFetchFlag={passInEditorFetchFlag} //important!
            notifySubEditorFetchFinish={notifySubEditorFetchFinish} //important!
        />


    }

    {/* //TODO card-node-editers, etc. */}

</>






    </>}



{/* modal floating window - manager area */}
<div>


          
          {isDisplayRmBool === true && <div>

              <Modal_ResourceManagingWindow 

                handleRmCancel={handleResourceManagerCancel} 
                editorMode={state.mode}

                initialProjectResourceVarPairs={resourcePair}


                projName={state.selected_project_name}   
                username={authEmailName}

                backendOption={backendOption}

                getLocalProjectDataRsrcMgr={passInLocalProjectData_RsrcMgr}


                languageCodeTextOption={projectMetaData["ui_language"]} //TODO change
                getUiLanguageOption={passInUiLanguageOption} //TODO to add

                updateVarPairToPanel2={updateResourcePairFromMgr}
              />
          
          </div>}


     
          {isDisplayGdmBool === true && <div>
       
              <Modal_GameDataManager 
                handleGdmCancel={handleGameDataManagerCancel} 

                initialGameDataDesign={projectMetaData["game_data"]}

                updateForEmuGdt1={updateUserConfigFromDataMgr1Gdt}

                updateGameDataDesignListToOuterLayer={triggerGameDataDesignListChange}
                
                languageCodeTextOption={projectMetaData[["ui_language"]]} //TODO change
              />
              

          </div>}



          {isDisplayEmBool === true && <div>

            <Modal_EmuManager
              handleEmCancel={handleEmuManagerCancel}
              languageCodeTextOption={projectMetaData[["ui_language"]]} //TODO change

              projName={state.selected_project_name}   
              username={authEmailName}
                                //   backendOption={backendOption}
                                //   editorMode={state.mode}

              isForGameMaker={true}

            //   getVisualPairs={passInVisualPairs}
              getVisualMap={passInVisualMap}
              gameDataDesign={projectMetaData["game_data"]}
              emuDataSets={projectMetaData["emu4sets"]}

              getNavObj={passInNavObj}
              initNavObj={projectMetaData["nav_ui_settings"]}

              update1Gdt={updateUserConfigFromEmuManager1Gdt}
              update2Epp={updateUserConfigFromEmuManager2Epp}
              update3Epa={updateUserConfigFromEmuManager3Epa}
              update4Ess={updateUserConfigFromEmuManager4Ess}
              update5Shp={updateUserConfigFromEmuManager5Shp}

            />
          </div>}






</div>



{/* 00 . test-viewing floating window */}
<div>
{isDisplayViewingAny === true
    && 
<div className={modalStyleName}>


        <button
            onClick={()=>{
                if (focusingEditor === "gameMaker") {
                    handleCancelEntireViewer(); 
                } else { //any node-editor
                    handleCancelNodeTestViewer();
                }                
            }}
        > {closeText} </button>


         
    {isDisplayEntireGameViewer === true 
    &&<>
    {/* 01 . Entire-Viewing */}
    <div>
                                            {/* <div className={modalStyleName}> */}

                                            {/* <button
                                                    onClick={()=>{
                                                        handleCancelEntireViewer();
                                                    }}
                                            > {closeText} </button> */}


        {/* this layer of div is important! do not simplify */}
        <div         
            style={{"display": "flex"}}
        >
            

                <Viewer_Entire_Screen

                    initialNavObj={projectMetaData["nav_ui_settings"]}

                    initialChapterList={chapListNestedArr}
                    initialCurrChapterAllNodeMapping={projectMetaData["chapterNodeMapping"]}
                    firstChapterData={viewerEntireFirstChapterData}

                    initialGameProgress={viewerEntireGameProgressObj}
                    
                    initialPlayerGameDataTracker={projectMetaData["emu4sets"]["gdt1"]} //TODo emu-4sets
                    initialPlayerProfile={projectMetaData["emu4sets"]["epp2"]} //TODo emu-4sets
                    initialPlayerAccountSettings={projectMetaData["emu4sets"]["epa3"]} //TODo emu-4sets
                
                    initialPlayerSlRecords={projectMetaData["emu4sets"]["ess4"]} //TODO emu-4sets

                    initialShopItemInfo={projectMetaData["emu4sets"]["shp5"]["shopStock"]} //TODO emu-4sets
                    initialPlayerPurchaseInfo={projectMetaData["emu4sets"]["shp5"]["playerPurchaseStatus"]} //TODO emu-4sets


                    uiLangOption={projectMetaData["ui_language"]}

                    username={authEmailName}
                    projectname={state.selected_project_name}

                    visualVarPairList={projectMetaData["proj_resource_visual"]}
                    audioVarPairList={projectMetaData["proj_resource_audio"]}

                    notifyNodeWalk={notifyNodeWalk} //TODO should be inside Viewer_Entire_Screen when viewing?
                    notifyChapterWalk={notifyChapterWalk}  //TODO should be inside Viewer_Entire_Screen when viewing?
                    notifyUpdateCurrentStanding={notifyUpdateCurrentStanding}  //TODO should be inside Viewer_Entire_Screen when viewing?
                    notifyCurrGdt={notifyCurrGdt}

                    getCurrChapterContent={passInCurrChapterContent}
                    getAllChaptersContent={passInAllChaptersContent}

                    getOriginalGdtracker={passInOriginalGdtracker}
                    slOption={projectMetaData["slInfo"]["format"]}
                    slEntireObj={projectMetaData["slInfo"]}
                /> 

            
                {/* status table for entire-viewing*/}
                <table style={{
                    "width": `${currTestingScrnW}px`, 
                    "marginTop": `${currTestingScrnH+100}px`, 
                    "marginLeft": "170px","position": "absolute"
                }}
                >
                    <thead>
                        <tr>
                        <th>Current Page Status</th>
                        <th>Current Chapter-Key</th>
                        <th>Current Node-Key</th>
                        <th>Current Node-Type</th>
                        </tr>
                    </thead>

                    <tbody> 
                        <tr>
                        <td>{currTestingPageStatus}</td>
                        <td>{currTestingChapterKey}</td>
                        <td>{currTestingNodeKey}</td>
                        <td>{currTestingNodeType}</td>         
                        </tr>
            

                    </tbody>

                    </table>
            
            
        </div>{/* this layer of div is important! do not simplify */}
    

    </div>
    </>}


    {isDisplayQuickview === true && 
    <>
    <div>

        
    {/* 02 . Quick-View for Conversation-Node */}    
        {focusingEditor === "Conversation"
        &&
            <QuickView_AllPanels_ConvNode

                    initialPieceNum={nodeViewingEntryNum} //from conv-node-editor-triggering

                    handleQViewCancel={handleCancelNodeTestViewer}

                    allPieceContent={projectAllNodeContent[currTestingNodeKey].nodeContent}  //from node's obj (data-structure) //TODO change

                    initialEmuGameDataTracker={projectMetaData["emu4sets"]["gdt1"]} //TODO change

                    uiData1_textframe={projectAllNodeContent[currTestingNodeKey]["nodeUISettings"].textFrame}  //from node's obj (data-structure) //TODO change
                    uiData2_defaultButtonOption={projectAllNodeContent[currTestingNodeKey]["nodeUISettings"].defaultButton}  //from node's obj (data-structure)  //TODO change
                    uiData3_ConvNavigation={projectAllNodeContent[currTestingNodeKey]["nodeUISettings"].convNav}  //from node's obj (data-structure) //TODO change
                    uiData4_logPageSettings={projectAllNodeContent[currTestingNodeKey]["nodeUISettings"].logPage}  //from node's obj (data-structure) //TODO change

                    screenWidth={currTestingScrnW}  //from node's obj (data-structure)
                    screenHeight={currTestingScrnH}  //from node's obj (data-structure)

                    getAudioMap={passInAudioMap}
                    getVisualMap={passInVisualMap}
                            
                    getUILanguage={passInUiLanguageOption}
                                        
                    // resetViewing={resetQuickView}
                    openSettingPage={hintNodeEditorOnly}
                    // notifyCurrGdt={notifyCurrGdt}
            /> 
        }
    
    </div>


    
    </>
    }


{/* game-data-tracker table */}

{focusingEditor === "gameMaker" &&
    <div style={{
                "backgroundColor": "grey",
                "marginLeft": "1000px",
                "width": "350px"
         //       "height": `${screenHeight}px`, 
                 
              }}>
    Game Data Status [{focusingEditor}]
        <table>
                            <thead className="textNoSelect">
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Default Value</th>
                                </tr>
                            </thead>  
            
            <tbody> 
{/* //TODO: list all emu-game-data-status here */}

                        {Object.keys(testPlayerGameDataTracker).map((currKey) => {
                            let keyName = "gmdt" + currKey;
                            let val = testPlayerGameDataTracker[currKey]["data_type"] === "boolean" ? 
                                    ((testPlayerGameDataTracker[currKey]["current_value"] === true 
                                        || testPlayerGameDataTracker[currKey]["current_value"] === "true") ? 
                                        "true" : "false") 
                                : testPlayerGameDataTracker[currKey]["current_value"];

                            let inputId = keyName+"-input";

                            return (
                                <tr value={currKey} key={keyName} id={inputId}>
                                    <td>{testPlayerGameDataTracker[currKey]["name"]}</td>
                                    
                                    <td>
                                        <label>{testPlayerGameDataTracker[currKey]["data_type"] !== "boolean" ? 
                                            testPlayerGameDataTracker[currKey]["current_value"] 
                                            : (testPlayerGameDataTracker[currKey]["current_value"] === true ? 
                                                "True" 
                                                : "False")}</label><br></br>

                                    </td>   

                                    <td>
                                    <label>{testPlayerGameDataTracker[currKey]["data_type"] !== "boolean" 
                                    ? testPlayerGameDataTracker[currKey]["default_value"] 
                                    : (testPlayerGameDataTracker[currKey]["default_value"] == "true" ? "True" : "False")}</label>
                                    
                                    </td>            
                                </tr>
                            
                            );
                        })}


                        
            </tbody>  
        </table>
        
        {/* also : 

                note: for test-viewing: keep these: for the [status table]
                currTestingPageStatus("Main Page");
                currTestingChapterKey("");
                currTestingChapterTitle("");
                currTestingNodeKey("");
                currTestingNodeType("");
        */}
            {/* game data info */}
            {/* screenWidth > screenHeight means horizontal game-screen */}
            {/* //TODO current: when testing, "localTest" is temporarily true; later change to "false" */}
            {/* {(isDisplayEntireGameViewer && showGameDataPanel) */}
            {/* {isDisplayEntireGameViewer */}
            {/* //TODO700 recover this later */}


    </div>
}    

</div>

}
</div>

{/* end of test-viewing floating window */}

</>}
</div>}
</div>

);










}



// "offline_half"
// "offline_full"
// "online_cloud"