import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiTrashCan } from "react-icons/gi";


import langDictionary from './textDictionary';


export default function NodeManager({projectName, currUser, 
  initialChapterKey, getNodeMapOfChapter, 
  getCurrChapterKey, getGridBlocks,
  initialNodeMap, initialGridBlock,
  updateNodeMapOfChapter, updateGridBlockOfChapter,
  displayGameDataPanel, getGameData, getGdmUpdatedSignal, resetGdmUpdateSignal,
  loadChapterInfoFromCaller,
  triggerCreatedNewNode,
  triggerNodeMappingsChange,

  getUILanguage,

}) {

  const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

    // console.log("Node Manager ?? "); //TODO testing
    // console.log(initialNodeMap); //TODO testing
    // console.log(initialGridBlock); //TODO testing
  const verticalOffset = 8;
  const horizontalOffset = 3;
  const nodeGap = 10;
  
  const [chapterKey, setChapterKey] = useState(initialChapterKey);

  const [newGridActionCreate, setNewGridActionCreate] = useState(true);

  const [toRevertNodeKey, setToRevertNodeKey] = useState("");


  let textDictItem = langDictionary[languageCodeTextOption];
  let textDictItemDefault = langDictionary["en"];

  let createText = textDictItem.createText !== undefined ?
    textDictItem.createText
    : textDictItemDefault.createText;

  let cancelText = textDictItem.cancelText !== undefined ?
    textDictItem.cancelText
    : textDictItemDefault.cancelText;

  let enterEditorText = textDictItem.enterEditorText !== undefined ?
    textDictItem.enterEditorText
    : textDictItemDefault.enterEditorText;

  let updateText = textDictItem.updateText !== undefined ?
    textDictItem.updateText
    : textDictItemDefault.updateText;

  let confirmText = textDictItem.confirmText !== undefined ?
    textDictItem.confirmText
    : textDictItemDefault.confirmText;

  let detachLinkingText = textDictItem.detachLinkingText !== undefined ?
    textDictItem.detachLinkingText
    : textDictItemDefault.detachLinkingText;  
    
  let addNewConditionTargetText = textDictItem.addNewConditionTargetText !== undefined ?
    textDictItem.addNewConditionTargetText
    : textDictItemDefault.addNewConditionTargetText;

  let addConditionText = textDictItem.addConditionText !== undefined ?
    textDictItem.addConditionText
    : textDictItemDefault.addConditionText;

  let revertText = textDictItem.revertText !== undefined ?
    textDictItem.revertText
    : textDictItemDefault.revertText;
  
  let saveToMyProjectText = textDictItem.saveToMyProjectText !== undefined ?
    textDictItem.saveToMyProjectText
    : textDictItemDefault.saveToMyProjectText;


  let listOfNodesText = textDictItem.listOfNodesText !== undefined ? 
    textDictItem.listOfNodesText
    : textDictItemDefault.listOfNodesText;
    

  let nodeInfoText = textDictItem.nodeInfoText !== undefined ?
    textDictItem.nodeInfoText
    : textDictItemDefault.nodeInfoText;

  let nodeOperationsText = textDictItem.nodeOperationsText !== undefined ?
    textDictItem.nodeOperationsText
    : textDictItemDefault.nodeOperationsText;
    
  let targetNodesText = textDictItem.targetNodesText !== undefined ?
    textDictItem.targetNodesText
    : textDictItemDefault.targetNodesText;
  
  let nextNodeText = textDictItem.nextNodeText !== undefined ?
    textDictItem.nextNodeText
    : textDictItemDefault.nextNodeText;

  let nextNodeTitleText = textDictItem.nextNodeTitleText !== undefined ?
    textDictItem.nextNodeTitleText
    : textDictItemDefault.nextNodeTitleText;

  let nodeUniqueIDText = textDictItem.nodeUniqueIDText !== undefined ?
    textDictItem.nodeUniqueIDText
    : textDictItemDefault.nodeUniqueIDText;

  let nodeTitleText = textDictItem.nodeTitleText !== undefined ? 
    textDictItem.nodeTitleText
    : textDictItemDefault.nodeTitleText;

  let noteText = textDictItem.noteText !== undefined ?
    textDictItem.noteText
    : textDictItemDefault.noteText;

  let nodeTypeText = textDictItem.nodeTypeText !== undefined ?
    textDictItem.nodeTypeText
    : textDictItemDefault.nodeTypeText;

  let changeSText = textDictItem.changeSText !== undefined ?
    textDictItem.changeSText
    : textDictItemDefault.changeSText;

  let emptyNotePlaceHolder = textDictItem.emptyNotePlaceHolder !== undefined ?
    textDictItem.emptyNotePlaceHolder
    : textDictItemDefault.emptyNotePlaceHolder;
  
  let nodeText = textDictItem.nodeText !== undefined ?
    textDictItem.nodeText
    : textDictItemDefault.nodeText;
  
  let deleteSText = textDictItem.deleteSText !== undefined ?
    textDictItem.deleteSText
    : textDictItemDefault.deleteSText;

  let deleteText = textDictItem.deleteText !== undefined ?
    textDictItem.deleteText
    : textDictItemDefault.deleteText;

  let addANewNodeHereText = textDictItem.addANewNodeHereText !== undefined ?
    textDictItem.addANewNodeHereText
    : textDictItemDefault.addANewNodeHereText;

  let titleText = textDictItem.titleText !== undefined ?
    textDictItem.titleText
    : textDictItemDefault.titleText;

  let screenSizeText = textDictItem.screenSizeText !== undefined ?
    textDictItem.screenSizeText
    : textDictItemDefault.screenSizeText;

  let revertADeletedNodeHereText = textDictItem.revertADeletedNodeHereText !== undefined ?
    textDictItem.revertADeletedNodeHereText
    : textDictItemDefault.revertADeletedNodeHereText;

  let nodeGameType = textDictItem.nodeGameType !== undefined ?
    textDictItem.nodeGameType
    : textDictItemDefault.nodeGameType;

  let selectTheNextNodeText = textDictItem.selectTheNextNodeText !== undefined ?
    textDictItem.selectTheNextNodeText
    : textDictItemDefault.selectTheNextNodeText;

  let selectNodeGameTypeText = textDictItem.selectNodeGameTypeText !== undefined ?
    textDictItem.selectNodeGameTypeText
    : textDictItemDefault.selectNodeGameTypeText;

  let selectSizeDirectionText = textDictItem.selectSizeDirectionText !== undefined ? 
    textDictItem.selectSizeDirectionText
    : textDictItemDefault.selectSizeDirectionText;
  
  let selectNodeText = textDictItem.selectNodeText !== undefined ?
    textDictItem.selectNodeText
    : textDictItemDefault.selectNodeText;

  let pleaseSelectOrSetupChaptersInChapterMngText = textDictItem.pleaseSelectOrSetupChaptersInChapterMngText !== undefined ?
    textDictItem.pleaseSelectOrSetupChaptersInChapterMngText
    : textDictItemDefault.pleaseSelectOrSetupChaptersInChapterMngText;


    //TODO12


//TODO important note: node data is operated in this component (and level).
//TODO node-data from and to cloud db: later the specific node-editing page might need screen-size fixing, this can be through cloud

  let nodeWidth = 152;
  let nodeHeight = 52;


  //TODO node data from cloud: fetch by username + project_name + chapter_key  
  const chStartName = "chapterStart-key";
  const chEndName = "chapterEnd-"+chapterKey;

  const [nodeRelationshipMap, setNodeRelationshipMap] = useState(initialNodeMap !== undefined ? initialNodeMap : {});
  const [gridBlocks, setGridBlocks] = useState(initialGridBlock !== undefined ? initialGridBlock: []); //stores node-keys
  //TODO31
  //triggerNodeMappingsChange

  //TODO updating-signal


  const [renderCounter, setRenderCounter] = useState(0);
 
  //TODO functionality design:
  //TODO1 always create default "chapterStart" and "chapterEnd" node, named as "chapterStart-[chapterKey]" and "chapterEnd-[chapterKey]"


   /* variable area */
   const navigate = useNavigate();

   const [clickedNode, setClickedNode] = useState("");
   const [clickedNode2, setClickedNode2] = useState(-1); //TODO using for new data structure
   const [clickedNodeKey, setClickedNodeKey] = useState(""); //TODO using for new data structure
   const [selectedNextNode, setSelectedNextNode] = useState("");
   const [lscElseSelected, setLscElseSelected] = useState("");
   const [lscCurrSelected, setLscCurrSelected] = useState("");


   const [createNewNodeName, setCreateNewNodeName] = useState('');
   const [createNewNodeGameType, setCreateNewNodeGameType] = useState("");
   const [createdNewNodeScreenSize, setCreatedNewNodeScreenSize] = useState("16:9(horizonal)");
   const [deletingNodeName, setDeletingNodeName] = useState("");
   const [isLinkNewNode, setIsLinkNewNode] = useState(false);
   const [needCloudGameData, setNeedCloudGameData] = useState(true);

   const [nodeToRevert, setToRevert] = useState("");
   const [gameDataLocal, setGameDataLocal] = useState({});

   const [logicSplitter_gameDataVar1, setLsGdataVar1] = useState("");
   const [logicSplitter_gameDataVar2, setLsGdataVar2] = useState("");
   const [logicSplitterVar2IsGData, setLsV2IsGData] = useState(true);
   const [var2NumCompare, setVar2NumCompare] = useState("");
   const [condtVar1Type, setCondtVar1Type] = useState("");
   const [var1StringEq, setVar1StringEq] = useState(true);
   const [var1BoolTrue, setVar1BoolTrue] = useState(true);
   const [currNodeSplittedNum, setCurrNodeSplitterNum] = useState(0);

   const [displayAddNewTargetCondt, setDisplayAddNewTargetCondt] = useState(false);

   const [displayRevertArea, setDisplayRevertArea] = useState(false);
   
   const [addedGameScreenSize, setAddedGameScreenSize] = useState("");

   const [displayGameDataButton, setDisplayGameDataButton] = useState(true);

   const [tempNewName, setTempNewName] = useState("");
   const [tempNewNote, setTempNewNote] = useState("");

   const [addNewNodeAreaDisplay, setAddNewNodeAreaDisplay] = useState(false);

   const [styleArrHook, setStyleArrHook] = useState([]);

  
   const [firstTimeEnter, setFirstTimeEnter] = useState(true);
   useEffect(() => {

  

      console.log("Node Manager ........."); //TODO testing
      console.log("nodemap = ", initialNodeMap); //TODO testing
      console.log("grid = ", initialGridBlock); //TODO testing
      console.log("local ds:"); //TODO testing
      console.log(nodeRelationshipMap); //TODO testing
      console.log(gridBlocks); //TODO testing

      let UILang = getUILanguage();
      setLanguageCodeTextOption(UILang);
  

      let gameDataTemp = getGameData();
      setGameDataLocal(gameDataTemp);
      let gameDataUpdatedSignal = getGdmUpdatedSignal();
      if (gameDataUpdatedSignal === true) {
        //TODO refresh...
        resetGdmUpdateSignal();
      }


      //TODO fetch this chapter's all node data
          let chapterKeyTemp = getCurrChapterKey();
          if (chapterKeyTemp !== chapterKey) { // means the chapter-clicked changed!
            
            let tempMap = getNodeMapOfChapter();
          
            let gridTemp = getGridBlocks(chapterKeyTemp);
  
                                            // console.log("::: getters........... for chapter: ", chapterKeyTemp);
                                            // console.log("nodemap = ", tempMap); //TODO testing
                                            // console.log("grid = ", gridTemp); //TODO testing
                                          
            setNodeRelationshipMap(tempMap); //input-side
            setGridBlocks(gridTemp); //input-side
            setChapterKey(chapterKeyTemp);
            if (firstTimeEnter == false) {
              updateNodeLinkingsOnce(tempMap, gridTemp);
            }
            setClickedNodeKey("");
            setClickedNode2(-1);
          } 


          if (firstTimeEnter === true) {
            // let chapterData = getChapterDataFromCloud(chapter); //TODO: call in later stage
            //updateNodeDataActions(chapterData);
                    //    setNodeData(chapterData);
            // console.log("First enter node data: ");
            // console.log(nodeData);
      //      fetchGameDataFromCloud(); //TODO remove later
            updateNodeLinkingsOnce(initialNodeMap, initialGridBlock);
      //      console.log("\t\tFirst Enter - NodeManager: current user is ", currUser); //TODO testing
    
            setFirstTimeEnter(false);
          }

    });



  // function updateNodeDataActions(data) {
  //      setNodeData(data);
  //      //TODO calculate needed scale
  //      console.log("new node data:");
  //      console.log(data); //TODO test

  //      //TODO later: update to cloud db
  // }

  async function updateNodeRelationship() {
    //TODO update current node-data to cloud db
    //TODO cloud node-data design:
      //TODO each node is a collection
      //TODO each node-collection contains many documents
        //TODO for board-game/card-game node, each document is an element?
        //TODO for conversational node, each document is a piece?        

  }

  function enterNodeEditor2() {
    if (nodeRelationshipMap[clickedNodeKey] === undefined) {
      return;
    }

    let currNodeType = nodeRelationshipMap[clickedNodeKey].nodeType;
    let userName = currUser;

    let screenSizeStr = nodeRelationshipMap[clickedNodeKey].screenSize; //TODO5

    let uiLang = languageCodeTextOption;

    console.log("enter editor2:", clickedNodeKey, projectName, userName, uiLang);
    if (currNodeType === "Card Game") {
      navigate('/cardgamenode', { replace: true, state: { clickedNodeKey, projectName, userName, screenSizeStr, uiLang } });
    } else if (currNodeType === "Conversation") {
      
      navigate('/conversationnode', { replace: true, state: { clickedNodeKey, projectName, userName, screenSizeStr, uiLang, chapterKey} });
    } 


    //TODO29
        //TODO later add conditions for board game and tower defense
  }

  // function updateGDataDesignToCloud(gameDataLatest) {

  //       let project = "";
  //       project  = projectName;
  //       if (project.trim() === "") {
  //         return;
  //       }
  //       updateGameDataDesignVM({projectName: project, uname: currUser, gameData: gameDataLatest});
     
  // } //TODO remove later

  function addNewNode2() { //TODO for new data structure
    let tempNodeMap = nodeRelationshipMap;
    if (createNewNodeGameType === "") {
      console.log("Game type is required.") //TODO test
      return;
    }

    if (createNewNodeName.length > 0) {

      if (tempNodeMap[createNewNodeName] !== undefined || tempNodeMap[createNewNodeName] !== "") {
        console.log("2create-node submitted:" + createNewNodeName + ", " + createNewNodeGameType); // TODO temp

        //clickedNode2: ir * 10000 + ic;
        let clickedCol = clickedNode2 % 10000;
        let clickedRow = (clickedNode2 - clickedCol) / 10000;
        
        let newDataItem = {};

        if (createNewNodeGameType === "LogicSplitter") {
          newDataItem = { 
            nodeName: `${createNewNodeName}`, 
            nodeType:`${createNewNodeGameType}`,
            screenSize: createdNewNodeScreenSize,
            row: clickedRow,
            col: clickedCol,
            spltLogicPairs: [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],  //TODO32 test
            display: true,     
          }; //TODO temp
        } else {
          newDataItem = { 
            nodeName: `${createNewNodeName}`, 
            nodeType:`${createNewNodeGameType}`,
            screenSize: createdNewNodeScreenSize,
            row: clickedRow,
            col: clickedCol,
            nextNode: "",
            display: true,     
          }; //TODO temp
        }



        tempNodeMap[createNewNodeName] = newDataItem;
        
        

        let tempGrid = gridBlocks;
        gridBlocks[clickedRow][clickedCol] = createNewNodeName;
        

        /* update all node-mappings */
        setGridBlocks(tempGrid);
        setNodeRelationshipMap(tempNodeMap);
        updateNodeLinkingsOnce(tempNodeMap, tempGrid);
        triggerNodeMappingsChange(tempNodeMap, tempGrid);


        // reset the creation layout
        setCreateNewNodeName("");
        setCreateNewNodeGameType("");
        setCreatedNewNodeScreenSize("4:3(horizonal)");
        setClickedNode2(-1);
      } else {
        console.log("2Invalid node name: duplicate"); //TODO test

      }
 
    } else {
      console.log("warning: invalid empty node name"); //TODO test
    }

    triggerCreatedNewNode(createNewNodeName, chapterKey);
  }


  function addNewNodeGameType(event) {
    setCreateNewNodeGameType(event.target.value); //TODO later update to cloud db
    console.log("changed selection of new game type : " + event.target.value);
  }


  function changeLsVar2ToGameData() {
    setLsV2IsGData(true);
  }

  function changeLsVar2ToValue() {
    setLsV2IsGData(false);
  }

  // async function displayGameDataFunc() { //TODO changed; remove later
  //   setDisplayGameDataButton(false);

  //   if (needCloudGameData === true) {
  //     await fetchGameDataFromCloud();
  //   } else {
  //     console.log("*from local* game-data: using existing data"); 
  //   }
  //   setDisplayGameDataWindow(!displayGameDataWindow);
  //   setDisplayGameDataButton(true);
  // }

  function changeGameScreenSize(event) {
    const input = event.target.value;
    if (event != null && event.target != null && event.target.value!= null) {
      
      if (input === "16:9(horizonal)"
        || input === "16:9(vertical)"
        || input === "4:3(horizonal)"
        ||input === "4:3(vertical)") {
        setAddedGameScreenSize(event.target.value);
        //TODO pass into cloud: node info
      } else {
        console.log("not selected!");
        setAddedGameScreenSize("");
      }   
    }
  }

  function markNextNeedCloudGameData() {
    setNeedCloudGameData(true);
  }

  function updateNodeToNewName2() {
    let tempNodeData = nodeRelationshipMap;

    if (tempNodeData[clickedNodeKey] === undefined) {
      return;
    }

    tempNodeData[clickedNodeKey].nodeName = tempNewName;
    setNodeRelationshipMap(tempNodeData);
    triggerNodeMappingsChange(tempNodeData, gridBlocks);
  
    setTempNewName("");
  }

  function updateNodeWithNewNote() {
    let tempNodeData = nodeRelationshipMap;

    if (tempNodeData[clickedNodeKey] === undefined) {
      return;
    }

    tempNodeData[clickedNodeKey].notes = tempNewNote;
    setNodeRelationshipMap(tempNodeData);
    triggerNodeMappingsChange(tempNodeData, gridBlocks);

    setTempNewNote("");
  }

  function deleteNode2() {
    let tempNodeMap = nodeRelationshipMap;
    let tempGridBlocks = gridBlocks;
    // now the node is tempNodeMap[clickedNodeKey]


    if (tempNodeMap[clickedNodeKey] === undefined) {
      return;
    }
    
    // mark this node to "not display"
    tempNodeMap[clickedNodeKey].display = false;

    // delete in grid-blocks
    let r =  tempNodeMap[clickedNodeKey].row;
    let c =  tempNodeMap[clickedNodeKey].col;
    tempGridBlocks[r][c] = "";

    // delete the parent-node's next-node
    Object.keys(tempNodeMap).map((nodeKey) => {             
      if (tempNodeMap[nodeKey].nodeType === "LogicSplitter") {
        //traverse spltLogicPairs
        let arr = tempNodeMap[nodeKey].spltLogicPairs;      //TODO32 test    deleteNode2()
        let i = 0;
        let len = arr.length;
        let updatedArr = [];
        for(; i < len; i++) {
          let item = arr[i];
          //{"internalStmt":"else", "nextNode": "", "displayStmt": "else"}

          if (item["nextNode"] !== clickedNodeKey) {
            //add to new array if not this to-be-deleted node
            updatedArr.push(item);
          }
        }
        tempNodeMap[nodeKey].spltLogicPairs = updatedArr; //deleteNode2() 
       
      } else {
        let nextNodeName = tempNodeMap[nodeKey].nextNode;
        if (nextNodeName !== "" && nextNodeName === clickedNodeKey) {
          tempNodeMap[nodeKey].nextNode = "";
        } 
      }
    });


    /* update all node-mappings */
    setNodeRelationshipMap(tempNodeMap);
    setGridBlocks(tempGridBlocks);
    updateNodeLinkingsOnce(tempNodeMap, tempGridBlocks);
    triggerNodeMappingsChange(tempNodeMap, tempGridBlocks);

    //update both data structures to outer layer
    updateNodeMapOfChapter(tempNodeMap);
    updateGridBlockOfChapter(tempGridBlocks);
    //TODO updateNodeLinkingsOnce(nodeRelationshipMap, gridBlocks);
  }

  function updateRenderCounter() {
    console.log("updateRenderCounter!");
    setRenderCounter((renderCounter+1) % 100);
  }

  function updateTableCondt() {
    let pairsArr = nodeRelationshipMap[clickedNodeKey].spltLogicPairs; //TODO32 test updateTableCondt()
    if (pairsArr === undefined) {
      return;
    }
    let len = pairsArr.length;
    
      if (len === 0) {
        //{"internalStmt":"else", "nextNode": "", "displayStmt": "else"}
        let pairItem = {"internalStmt":"else", "nextNode": "", "displayStmt": "else"}; //TODO32 test updateTableCondt() change this to an object
        pairsArr.push(pairItem);
      } else {
        pairsArr[0]["nextNode"] = lscElseSelected; // update the first element's target node
        //TODO32 test updateTableCondt()
      }
 

    //TODO update for grid-node-visualization
                        
    let tempNodeRelMap = nodeRelationshipMap;
    tempNodeRelMap[clickedNodeKey].spltLogicPairs = pairsArr; //TODO32 test updateTableCondt()

    setNodeRelationshipMap(tempNodeRelMap);
    updateNodeLinkingsOnce(tempNodeRelMap, gridBlocks);
    triggerNodeMappingsChange(tempNodeRelMap, gridBlocks);

  }

  function deleteFromCondtTable(index) {
    //nodeRelationshipMap[clickedNodeKey].spltLogicPairs
    let tempPairs = [];
    let i = 0;
    let len = nodeRelationshipMap[clickedNodeKey].spltLogicPairs.length;
    for (; i < len; i++) {
      if (i !== index) {
        tempPairs.push(nodeRelationshipMap[clickedNodeKey].spltLogicPairs[i]); 
      }
    }

    let tempNodeRelMap = nodeRelationshipMap;
    tempNodeRelMap[clickedNodeKey].spltLogicPairs = tempPairs; 

    setNodeRelationshipMap(tempNodeRelMap);
    updateNodeLinkingsOnce(tempNodeRelMap, gridBlocks);
    triggerNodeMappingsChange(tempNodeRelMap, gridBlocks);

    updateRenderCounter();
  }

  function highlightGridByKey(keyName) {
    let num = -1;
    let i = 0, j = 0;
    for(; i < gridBlocks.length; i++) {
      j = 0;
      for (; j < gridBlocks[0].length; j++) {
        if (gridBlocks[i][j] == keyName) {
          num = i * 10000 + j;
        }
      }
    }
    return num;
  }

  function addOneNodeLinks(
    givenR, givenC, givenArray, ir, ic,
    sourceRightLineVStart, sourceRightLineHStart, sourceRightLineHEnd) {

    let styleArray = givenArray;

                          let nextR = givenR;
                          let nextC = givenC;

                          let destLeftLineVStart = 0;
                          let destLeftLineHStart = 0;

                          let betweenNodeVerticalUnit = nodeHeight + nodeGap;
                          let betweenNodesVerticalLink = 0;

                          let betweenNodeHorizontalUnit = nodeWidth + nodeGap * 2 + 2;
                          let betweenNodesHorizontalLink = 0;

                          let unitDiffVert = 0;
                          let unitDiffHori = 0;

                          let srcNodeHigher = true; 
                          let srcNodeAtLeft= true; 



                          destLeftLineVStart = verticalOffset + 1 + (nodeHeight / 2) + (nodeHeight + nodeGap) * (nextR);
                          destLeftLineHStart = nodeGap + (nodeGap + nodeWidth + nodeGap + 2) * (nextC);

                          unitDiffVert = nextR - ir;
                          if (unitDiffVert > 0) {
                            srcNodeHigher = false;
                          } else if (unitDiffVert < 0) {
                            unitDiffVert = unitDiffVert * -1;
                          }
                          betweenNodesVerticalLink = unitDiffVert * betweenNodeVerticalUnit + 1;

                          unitDiffHori = nextC - ic;
                          if (unitDiffHori <= 0) { //source-node at right, dest-node at left
                            betweenNodesHorizontalLink = ((unitDiffHori * (-1))+1) * betweenNodeHorizontalUnit;
                            srcNodeAtLeft = false;
                          } else {
                            betweenNodesHorizontalLink = unitDiffHori * betweenNodeHorizontalUnit - betweenNodeHorizontalUnit;
                          }


                          let obj1 = {
                                  "position": "absolute",
                                  "top": `${sourceRightLineVStart}px`, 
                                  "left": `${sourceRightLineHStart}px`, 
                                  "height": `1px`, 
                                  "width": `10px`, 
                                  "backgroundColor": "#000000", //#000000
                                  "borderRadius": `0px`};
                                 // source-node outward-line  
                          styleArray.push(obj1); 

                          let obj2 = {
                                  "position": "absolute",
                                  "top": `${destLeftLineVStart}px`, 
                                  "left": `${destLeftLineHStart}px`, 
                                  "height": `1px`, 
                                  "width": `10px`, 
                                  "backgroundColor": "#000000", //#000000
                                  "borderRadius": `0px`}
                                  // destination-node inward-line  
                          styleArray.push(obj2);    

                          let obj3 = {
                                  "position": "absolute",
                                  "top": (srcNodeHigher === false ? `${sourceRightLineVStart}px` : `${destLeftLineVStart}px`), 
                                  "left": `${sourceRightLineHStart+nodeGap}px`, 
                                  "height": `${betweenNodesVerticalLink}px`, 
                                  "width": `1px`, 
                                  "backgroundColor": "#000000", //#000000
                                  "borderRadius": `0px`};
                                // the vertical line, right after the source-node-outward-horizontal-line 
                                    // always associates with source-node 
                          styleArray.push(obj3);

                          if (unitDiffHori > 0) {
                              let obj4 = {
                                  "position": "absolute",
                                  "top": (srcNodeAtLeft === false ? `${sourceRightLineVStart}px` : `${destLeftLineVStart}px`), 
                                  "left": (srcNodeAtLeft === false ? `${sourceRightLineHStart}px` : `${sourceRightLineHEnd}px`), 
                                  "height": `1px`, 
                                  "width": `${betweenNodesHorizontalLink}px`, 
                                  "backgroundColor": "#000000", //#000000
                                  "borderRadius": `0px`}
                                  // horizontal line from source-node to dest-node, if source-left & dest-right
                          
                              styleArray.push(obj4);
                          }
        
                          
                          // only add obj if ((unitDiffHori <= 0) && (srcNodeAtLeft === false))
                          if ((unitDiffHori <= 0) && (srcNodeAtLeft === false)) {
                              let obj5 = {
                                   "position": "absolute",
                                   "top": `${destLeftLineVStart}px`, 
                                   "left": `${destLeftLineHStart}px`, 
                                   "height": `2px`, 
                                   "width": `${betweenNodesHorizontalLink}px`, 
                                   "backgroundColor": "blue", //blue
                                   "borderRadius": `0px`};
                              styleArray.push(obj5);
                              // horizontal line from source-node to dest-node
                              //  when dest-node is at the same col or to the left of source-node 

                              let obj6 = {
                                    "position": "absolute",
                                    "top": `${destLeftLineVStart-nodeGap}px`, 
                                    "left": `${destLeftLineHStart}px`, 
                                    "height": `10px`, 
                                    "width": `1px`, 
                                    "backgroundColor": "#000000", //#000000
                                    "borderRadius": `0px`}
                              styleArray.push(obj6);      
                              // vertical "turning" part for dest-node, 
                              //  when dest-node is at the same col or to the left of source-node 

                              let obj7 = {
                                    "position": "absolute",
                                    "top": `${destLeftLineVStart-nodeGap}px`, 
                                    "left": `${destLeftLineHStart}px`, 
                                    "height": `1px`, 
                                    "width": `10px`, 
                                    "backgroundColor": "#000000", //#000000
                                    "borderRadius": `0px`}
                              styleArray.push(obj7);
                              // horizontal "turning" part for dest-node, 
                              //  when dest-node is on the same col or to the left of source-node
                          }
                                      
                          if (unitDiffVert === 0  && srcNodeAtLeft === false) {
                              let obj8 = {
                                    "position": "absolute",
                                    "top": `${sourceRightLineVStart}px`, 
                                    "left": `${sourceRightLineHStart+nodeGap}px`, 
                                    "height": `10px`, 
                                    "width": `1px`, 
                                    "backgroundColor": "#000000", //#000000
                                    "borderRadius": `0px`};
                              styleArray.push(obj8);

                          }
                          // vertical part out of source-node if both node on same row 

                          if (unitDiffVert === 0 && srcNodeAtLeft === false) {
                            let obj9 = {
                                    "position": "absolute",
                                    "top": `${sourceRightLineVStart+nodeGap}px`, 
                                    "left": `${sourceRightLineHStart}px`, 
                                    "height": `1px`, 
                                    "width": `10px`, 
                                    "backgroundColor": "#000000", //#000000
                                    "borderRadius": `0px`};
                            styleArray.push(obj9);        
                          }
                          // horizontal part out of source-node if both node on same row && dest-node at left

                return styleArray;
  }

  function updateNodeLinkingsOnce(nodeMap, grid) { //TODO15
  
    let styleArray = [];

    grid.map((rowItem, ir) => {
      rowItem.map((col,ic) => {
        let currNodeKey = grid[ir][ic];
        if (currNodeKey !== "" 
            && nodeMap[currNodeKey] !== undefined
            && nodeMap[currNodeKey].nodeType === "LogicSplitter") 
        {
          
            let sourceRightLineVStart = verticalOffset + 1 + (nodeHeight / 2) + (nodeHeight + nodeGap) * (ir);
            let sourceRightLineHStart = (nodeGap + nodeWidth + nodeGap + 2) * (ic + 1);
            let sourceRightLineHEnd = sourceRightLineHStart + 10;

     
            nodeMap[currNodeKey].spltLogicPairs.map((item, itemIndex) => { //TODO32 update-node-linkings
                    
                    if (item["nextNode"] !== "") {
                        addOneNodeLinks(
                          nodeMap[item["nextNode"]].row, 
                          nodeMap[item["nextNode"]].col, 
                          styleArray, 
                          ir, 
                          ic,
                          sourceRightLineVStart, 
                          sourceRightLineHStart, 
                          sourceRightLineHEnd);
                    }

            })

        } else if (currNodeKey !== "" 
            && nodeMap[currNodeKey] !== undefined
            && nodeMap[currNodeKey].nodeType !== "LogicSplitter") {

              let sourceRightLineVStart = verticalOffset + 1 + (nodeHeight / 2) + (nodeHeight + nodeGap) * (ir);
              let sourceRightLineHStart = (nodeGap + nodeWidth + nodeGap + 2) * (ic + 1);
              let sourceRightLineHEnd = sourceRightLineHStart + 10;

              let destLeftLineVStart = 0;
              let destLeftLineHStart = 0;
              
              let betweenNodeVerticalUnit = nodeHeight + nodeGap;
              let betweenNodesVerticalLink = 0;

              let betweenNodeHorizontalUnit = nodeWidth + nodeGap * 2 + 2;
              let betweenNodesHorizontalLink = 0;

              let unitDiffVert = 0;
              let unitDiffHori = 0;

              let nextNodeKey = "";

              let hasNextNode = false;
              let srcNodeHigher = true; 
              let srcNodeAtLeft= true; 


              if (currNodeKey !== "" && nodeMap[currNodeKey] !== undefined) {
                //such a node exists
                if(nodeMap[currNodeKey].nextNode !== "" 
                && nodeMap[currNodeKey].nextNode !== "-") {
                  // not logic-splitter & has next-node
                  hasNextNode = true;
                  nextNodeKey = nodeMap[currNodeKey].nextNode;


                  if (nodeMap[nextNodeKey] === undefined || nodeMap[nextNodeKey] === "") {
                    return;
                  }
                 
                  let nextR = nodeMap[nextNodeKey].row;
                  let nextC = nodeMap[nextNodeKey].col;

                  destLeftLineVStart = verticalOffset + 1 + (nodeHeight / 2) + (nodeHeight + nodeGap) * (nextR);
                  destLeftLineHStart = nodeGap + (nodeGap + nodeWidth + nodeGap + 2) * (nextC);

                  unitDiffVert = nextR - ir;
                  if (unitDiffVert > 0) {
                    srcNodeHigher = false;
                  } else if (unitDiffVert < 0) {
                    unitDiffVert = unitDiffVert * -1;
                  }
                  betweenNodesVerticalLink = unitDiffVert * betweenNodeVerticalUnit + 1;

                  unitDiffHori = nextC - ic;
                  if (unitDiffHori <= 0) { //source-node at right, dest-node at left
                    betweenNodesHorizontalLink = ((unitDiffHori * (-1))+1) * betweenNodeHorizontalUnit;
                    srcNodeAtLeft = false;
                  } else {
                    betweenNodesHorizontalLink = unitDiffHori * betweenNodeHorizontalUnit - betweenNodeHorizontalUnit;
                  }

                  addOneNodeLinks(
                    nextR, 
                    nextC, 
                    styleArray, 
                    ir, 
                    ic,
                    sourceRightLineVStart, 
                    sourceRightLineHStart, 
                    sourceRightLineHEnd);

                }
          }  
        }

      })
    })
        
    console.log("updateNodeLinkingsOnce - func: styleArray = ", styleArray);
    setStyleArrHook(styleArray);
  }

  function saveNodeInfoToCloud() {
    // TODO saves nodeRelationshipMap to cloud db...
    //TODO35

  }

//TODO page content 
    return (      
        <div>


        {chapterKey!== "" && <div className="setting_area"> 
      

        {/* //TODO testing panel area */}
        {/* <div style={{"backgroundColor": "orange"}}>
            <label>Chapter Key: {chapterKey}</label>
            <button>Test this chapter</button>
            <label>{nodeManageMentText}</label>

            <button onClick={()=>{
              let chapterNodeMapTemp = loadChapterInfoFromCaller();
              setNodeRelationshipMap(chapterNodeMapTemp);
            }}> TESTing: Fetch chapter data </button>
        </div> */}
        {/* //TODO testing panel area */}


<div style={{"display": "flex", "width": "77%"}}> 




{/* Node-list */}
    <div>
          <div style={{
            "height": "250px", 
            "marginRight": "20px",      
          }}>

                {listOfNodesText}:<br></br>
          
            <ul style={{"width": "320px", "marginLeft": "-25px"}}>
                  {Object.keys(nodeRelationshipMap).map((currKey) => {

                      let item = nodeRelationshipMap[currKey];
                      let liKey = "li" + currKey;
                      let crdCal = highlightGridByKey(currKey);

                      if (item["display"] === true) {
                          return (
                 
                            <li 
                                  key={liKey} 
                                  className={(clickedNode2 === crdCal) ? "clickableListItem2Clicked": "clickableListItem2"}
                                  style={{"marginBottom": "3px"}}
                                  onClick={()=>{
                                    
                                    if (clickedNode2 === crdCal) {
                                      setClickedNode2(-1); //cancel if already clicked on this node
                                    } else {
                                      setClickedNode2(crdCal);

                                      // crdCal = ir * 10000 + ic;
                                      let ic = crdCal % 10000;
                                      let ir = (crdCal-ic) / 10000;
                                      let content = gridBlocks[ir][ic]; 
                                      setClickedNodeKey(content);
                                    } 
                                  }}
                                >
                                  {currKey}: {item["nodeName"]}
                            </li>
                        );
                      }
                      

                  })}
            </ul>
          </div>  
          {/* <div
            style={{"height": "100px"}}
          >
            <button 
              className="setting_item"
              style={{"height": "30px",  "width": "100px"}}
              onClick={()=>{enterNodeEditor2();}}>
                {enterEditorText}
            </button>

          </div> */}
    </div>

{/* parallel-shell */}
<div style={{"display": "flex", "overflowX": "scroll"}}>


    {/* node-map-all-elements */}
    {<div style={{
            "overflowX": "scroll",
            "position": "relative"}}>




          {/* link-drawing */}
          <div style={{"position": "absolute"}}>                                                                                    
                    {styleArrHook.map((item, index)=>{
                      let keyStr = "StyleArrObj-" + index;
                      return (<div key={keyStr}
                        style={item}
                      ></div>)
                    })}
          </div>

          
          {/* Node-grid-blocks */}
          <div>
          {gridBlocks.map((rowItem, ir) => {
            let rowKeyStr = "grid" + ir;
              return (<div key={rowKeyStr} className="parallelFrame gridRow">
                    {rowItem.map((col,ic) => {
                      let content = gridBlocks[ir][ic];
            
                      let crd = ir * 10000 + ic;
                      let keyStr = "grid" + +ic+ "=" + content;
                      return (
                        <div key={keyStr} className="parallelFrame gridNodeGroup textNoSelect">
                          <div 
                                style={{"width": `${nodeWidth}px`, "height": `${nodeHeight}px`}}
                                className={
                                  crd === clickedNode2 ? "gridNodeClicked" : (content === "" ? "gridNodeEmpty" : "gridNodeOccupied")}
                                  
                                onClick={()=>{       
                          
                                  if (crd === clickedNode2) { //cancel if already clicked
                                    setClickedNode2(-1);
                                  } else {//setup clicked node
                                    setClickedNode2(crd);
                                  }       
                            
                                  if (clickedNode2 !== "" && content === "") {//get clicked & grid not empty
                                    setAddNewNodeAreaDisplay(true);
                                  }

                                  if (clickedNode2 !== "" && clickedNode2 == crd) {//get clicked & was clicked last time: cancel
                                    setAddNewNodeAreaDisplay(false);
                                  }

                                  if (clickedNode2 !== "" && content !== "") {// clicked on a non-empty grid
                                    setAddNewNodeAreaDisplay(false);
                                  }

                                  setClickedNodeKey(content);
                            
                              }}
                                >
                                  {content !== "" && nodeRelationshipMap[content] !== undefined
                                  && 
                                    <label className="cursor_pointer">{nodeRelationshipMap[content].nodeName}</label>}
                                  {(content === "" && crd !== clickedNode2) && <label className="cursor_pointer" style={{"color": "#eee8ec"}}>+<br></br>Put Node Here</label>}
                                  {(content === "" && crd === clickedNode2) && <label className="cursor_pointer" > Adding ... </label>}
                                
                          </div>

                          <div></div>
                
                        </div>)
                    })}
              


                      </div>);
              })

          }      
          </div>




    </div>}

    


    {/* scrollable-implication bar */}
    <div style={{"backgroundColor": "grey", "fontSize": "25px", "width": "35px", "display": "flex", "justifyContent": "center", "alignItems": "center"}}> <label>⇉</label> </div>


</div>



</div>
   
          {addNewNodeAreaDisplay && 
          <>
          <input type="radio" value={newGridActionCreate} checked={newGridActionCreate}
            onChange={()=>{
              setNewGridActionCreate(true);
            }}
          ></input><label className="cursor_pointer" onClick={()=>{
            setNewGridActionCreate(true);
          }}>{addANewNodeHereText}</label>
          {newGridActionCreate && <div className="section">
               
              <label>{nodeUniqueIDText} & {titleText}: </label>
              <input 
                className="setting_item"
                type="text" value={createNewNodeName} 
                onChange={e => {setCreateNewNodeName(e.target.value)}}  
              />
              <br></br>
              <label>{nodeGameType}: </label>
              <select className="setting_item" onChange={(event)=>{addNewNodeGameType(event);}} value={createNewNodeGameType}>
                <option value="" key=""> -- {selectNodeGameTypeText} -- </option>
                {/* <option value="Card Game" key="Card Game">Card Game</option>
                <option value="Board Game" key="Board Game">Board Game</option>
                <option value="Tower Defense" key="Tower Defense">Tower Defense</option> */} // TODO temp
                <option value="LogicSplitter" key="LogicSplitter">*Logic Splitter</option>
                <option value="Conversation" key="Conversation">Conversation</option>
              </select>
              <br></br>
              {createNewNodeGameType !== "LogicSplitter" && <><label>{screenSizeText}: </label>
              <select value={addedGameScreenSize} onChange={changeGameScreenSize}>
                    <option value="" key=""> ----- {selectSizeDirectionText} ----- </option>
                    {/* <option value="16:9(horizonal)" key="node-mgr-16:9(horizonal)"> 16:9 (horizontal) </option>
                    <option value="16:9(vertical)" key="node-mgr-16:9(vertical)"> 16:9 (vertical) </option> */}
                    {/* <option value="4:3(vertical)" key="node-mgr-4:3(vertical)"> 4:3 (vertical) </option> */} // TODO temp
                    <option value="4:3(horizonal)" key="node-mgr-4:3(horizonal)"> 4:3 (horizontal) </option>
                  </select>
              <br></br></>}
              <button 
                className="setting_item buttonRight"
                onClick={()=>{
                                                       //    addNewNode(); //TODO remove later
                  addNewNode2();
                  setClickedNodeKey("");
                  setAddNewNodeAreaDisplay(false);
                  }}>
                  {createText}
              </button>
              <button
                onClick={()=>{
                  setAddNewNodeAreaDisplay(false);
                  setClickedNode2(-1);}}
              >{cancelText}</button>
            
            </div>
          } 
            
          <br></br>
          <input type="radio" value={newGridActionCreate} checked={!newGridActionCreate}
            onChange={()=>{
              setNewGridActionCreate(false);
            }}></input><label className="cursor_pointer" onClick={()=>{
              setNewGridActionCreate(false);
            }}>{revertADeletedNodeHereText}</label>
          {!newGridActionCreate && <div className="section">
                  <select value={toRevertNodeKey} onChange={(event)=>{
                    setToRevertNodeKey(event.target.value);
                  }}>
                    <option>-- {selectNodeText} --</option>
                  {Object.keys(nodeRelationshipMap).map((currKey) => {
                    if (nodeRelationshipMap[currKey].display === false) {
                      let keyStr = "revertOption" + currKey
                      return (<option value={currKey} key={keyStr}>
                        {nodeRelationshipMap[currKey].nodeName}
                      </option>)
                    }
                  })}
                  </select>
                  
                  <button onClick={()=>{
                    let askStr = "Are you sure to revert node" + "" + "?";
                    let response = window.confirm(askStr);
                    if (response) {
                      // update gridBlocks on this grid
                      // update node-map for this node's row and col info, and display info
                      let crd = clickedNode2;
                      let ic = crd % 10000;
                      let ir = (crd-ic) / 10000;
                      
                      let nodeMapTemp = nodeRelationshipMap;
                      nodeMapTemp[toRevertNodeKey].row = ir;
                      nodeMapTemp[toRevertNodeKey].col= ic;
                      nodeMapTemp[toRevertNodeKey].display = true;

                      let gridBlocksTemp = gridBlocks;
                      gridBlocksTemp[ir][ic] = toRevertNodeKey;

                      /* update all node-mappings */
                      setNodeRelationshipMap(nodeMapTemp);
                      setGridBlocks(gridBlocksTemp);
                      updateNodeLinkingsOnce(nodeMapTemp, gridBlocksTemp);
                      triggerNodeMappingsChange(nodeMapTemp, gridBlocksTemp);

                      updateNodeMapOfChapter(nodeMapTemp);
                      updateGridBlockOfChapter(gridBlocksTemp);

                      setClickedNode2(-1);

                    }
                  }}>{revertText}</button>

          </div>
          }
          </>
            }




        <div>


        </div>

     

{/* node info and operation area */}

        {(clickedNode2 !== -1 && clickedNodeKey !== "") && <div>


<div style={{"display": "flex"}}>
    <div style={{"width": "900px"}}> 
    {/* node-info-area */}
        
                  
<div style={{"display": "flex"}}> 

              <div style={{"flex": "1"}}>
                
                              <p className="sectionHeader"> {nodeInfoText} </p>

                                  <label>{nodeUniqueIDText}: </label>
                                    <div className="indentOne">
                                      {clickedNodeKey}
                                  </div>

                                  <label>{nodeTitleText}: </label>
                                  <div className="indentOne">                      
                                    <label>{nodeRelationshipMap[clickedNodeKey].nodeName}</label>
                                  </div>

                                  <label>{nodeTypeText}: </label>
                                  <div className="indentOne">
                                    <label>{nodeRelationshipMap[clickedNodeKey].nodeType}</label>
                                  </div>

                                  <label>{noteText}: </label>
                                  <div className="indentOne">
                                    <label>{(nodeRelationshipMap[clickedNodeKey].notes !== undefined && nodeRelationshipMap[clickedNodeKey].notes.length > 0) ? nodeRelationshipMap[clickedNodeKey].notes : emptyNotePlaceHolder}</label>
                                  </div>
                                
                                {nodeRelationshipMap[clickedNodeKey] !== undefined 
                                && nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter" 
                                && <>
                                  <label>{screenSizeText}: </label>
                                  <div className="indentOne">
                                    <label>{nodeRelationshipMap[clickedNodeKey].screenSize}</label>
                                  </div>
                                </>}
                         

                          <p className="sectionHeader"> {nodeOperationsText} </p>
                  

                      <div>
                          <label>{changeSText}{nodeTitleText}: </label>
                          <div className="indentOne">
                            <input onChange={(event) =>{setTempNewName(event.target.value);}} value={tempNewName}></input>
                            <br></br><button onClick={()=>{updateNodeToNewName2();}}>{updateText}</button>
                          </div>
                          <label>{changeSText}{noteText}: </label>
                          <div className="indentOne">
                            <input onChange={(event) =>{setTempNewNote(event.target.value);}} value={tempNewNote}></input>
                            <br></br>
                            <button onClick={()=>{setTempNewNote("");}}>{cancelText}</button>
                            <button onClick={()=>{updateNodeWithNewNote();}}>{updateText}</button>
                          </div>
                          <br></br>
                          <br></br>
                          <label>{deleteSText}{nodeText}: </label>
                          <div className="indentOne">
                              <button onClick={()=>{
                                let askStr = "Are you sure to remove this Node [" + nodeRelationshipMap[clickedNodeKey].nodeName + "] ?";
                                let response = window.confirm(askStr);
                                if (response) {
                                  deleteNode2();
                                  setClickedNodeKey("");
                                  setClickedNode2(-1);
                                }
                              }}>{deleteText}</button>
                          </div>
                      </div>
               
              </div>   




{/* Next-Node setting section */}
    <div style={{"flex": "1", "marginLeft": "20px"}}>


              {nodeRelationshipMap[clickedNodeKey] !== undefined
              && nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter" 
              && nodeRelationshipMap[clickedNodeKey].nodeType !== "*chapterEnd*" 
              && <div>
                <p className="sectionHeader"> 
                {nextNodeText} </p>
                {(nodeRelationshipMap[clickedNodeKey].nextNode !== "" 
                  && nodeRelationshipMap[clickedNodeKey].nextNode !== "-") && <>
                    {nextNodeTitleText}: <label>{nodeRelationshipMap[nodeRelationshipMap[clickedNodeKey].nextNode]["nodeName"]}</label><br></br>
                  </>}
              
                <label>{updateText}: </label>
                <select onChange={(event)=>{
                    setSelectedNextNode(event.target.value);
                }}
                  value={selectedNextNode}
                >
                  <option key="defaultNextNodeEmpty" value="">-- {selectTheNextNodeText} --</option>
                  {Object.keys(nodeRelationshipMap).map((currKey) => {
                    
                            let item = nodeRelationshipMap[currKey];
                            if (item === undefined) {
                              return;
                            }
                            let nodeType = item["nodeType"];
                            let boolVal = true;
                            if (nodeType === "*chapterStart*") {
                              boolVal = false;
                            }
                            
                            let opKey = "opnextnode-" + currKey;
                            if (nodeType !== "*chapterStart*") {
                                return (
                                  <option key={opKey} value={currKey}>{item["nodeName"]}</option>
                                );
                            }
                        })}
                </select>
                <button onClick={()=>{
                    if (selectedNextNode !== "") {
                      let tempMap = nodeRelationshipMap;
                      tempMap[clickedNodeKey].nextNode = selectedNextNode;

                      setNodeRelationshipMap(tempMap);
                      updateNodeLinkingsOnce(tempMap, gridBlocks);
                      triggerNodeMappingsChange(tempMap, gridBlocks);

                      setSelectedNextNode("");
                      updateRenderCounter();
                    }
                }}>{confirmText}</button>
                <br></br>
                
                {(nodeRelationshipMap[clickedNodeKey]["nodeType"] !== "*chapterStart*" 
                  && 
                  ((nodeRelationshipMap[clickedNodeKey]["nodeType"] !== "LogicSplitter" && nodeRelationshipMap[clickedNodeKey]["nextNode"] !== "")
                  || (nodeRelationshipMap[clickedNodeKey]["nodeType"] === "LogicSplitter" 
                      && 
                      (nodeRelationshipMap[clickedNodeKey]["spltLogicPairs"].length > 1 
                        || nodeRelationshipMap[clickedNodeKey]["spltLogicPairs"][0]["nextNode"] !== "")) //TODO32
                  )
                )
                &&  
                <button
                  onClick={()=>{

                    let tempMap2 = nodeRelationshipMap;
                    if (tempMap2[clickedNodeKey] === undefined) {
                      return;
                    }

                    let confirmStr = 
                      "Are you sure to detach the linking between " 
                      + tempMap2[clickedNodeKey].nodeName + " and " 
                      + tempMap2[clickedNodeKey].nextNode + " ?";

                    let resp = window.confirm(confirmStr);
                    if (resp) {
                      tempMap2[clickedNodeKey].nextNode = "";
                      
                      setNodeRelationshipMap(tempMap2);
                      updateNodeLinkingsOnce(tempMap2, gridBlocks);
                      triggerNodeMappingsChange(tempMap2, gridBlocks);

                      updateRenderCounter();
                    }
                    
                  }}
                >{detachLinkingText}</button>}
             


              </div>}


              {nodeRelationshipMap[clickedNodeKey] !== undefined
              && nodeRelationshipMap[clickedNodeKey].nodeType === "LogicSplitter" && <div>
                <p className="sectionHeader"> {targetNodesText} </p>
                  Path-deciding
                  <br></br>
                  <table>
                    <thead>
                      <tr>
                        <th style={{"minWidth": "450px"}}>Condition</th>
                        <th>Target Node</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      
                     
                      {nodeRelationshipMap[clickedNodeKey].spltLogicPairs
                      .map((item, index) => {   
                        
                        {/* //TODO32 
                          each item looks like:

                            ['type[number]^hp_001^equal(pureValue)^0', 'D1-key', '[hp_001](type: number) \n equal- \n(value) 0']
                            
                            
                            {"internalStmt":"else", "nextNode": "", "displayStmt": "else"}
                        
                          */}
 

                          if (item["internalStmt"] === "else") {
                            return;
                          }
                          let keyStr = "tableLogicSplitter" + item[1];
                          return (
                          <tr key={keyStr}>
                              <td>{item["displayStmt"]}</td>
                              <td>{item["nextNode"]}</td>
                              <td>
                                <GiTrashCan onClick={()=>{
                                    deleteFromCondtTable(index);
                                  }}  
                                    className="iconButtonSmall"/>
                              </td>
                          
                          </tr>
                          );
                        
                      })}

                      {/* //TODO refactor */}
                      <tr>
                        <td>(All other cases / "Else")</td>         
                        <td>
                          {nodeRelationshipMap[clickedNodeKey].spltLogicPairs.length > 0 
                            && 
                            <label>{nodeRelationshipMap[clickedNodeKey].spltLogicPairs[0]["nextNode"]}
                              {/* //TODO32 changed to obj */}
                            
                            </label>}
                        </td> 
                        <td>
                            <select 
                                style={{"maxWidth": "100px"}}
                                value={lscElseSelected} 
                                onChange={(event)=>{
                                  setLscElseSelected(event.target.value);
                                }}>
                                <option key="lscElse" value="">-- Select --</option>
                                {Object.keys(nodeRelationshipMap).map((currKey) => {                  
                                    let item = nodeRelationshipMap[currKey];
                                    if (item === undefined) {
                                      return;
                                    }
                                    let lscElseKey = "lscSettingElse" + currKey;
                                    return (
                                <option 
                                  key={lscElseKey}
                                  value={currKey}
                                  >
                                  
                                        {currKey}:{item["nodeName"]}
                                    

                                    </option>);
                                })}          
                            </select>
                          
                          <button 
                            onClick={()=>{
                              updateTableCondt();
                              setLscElseSelected("");
                            }}
                          >{updateText}</button>

                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <button onClick={()=>{
                    setDisplayAddNewTargetCondt(!displayAddNewTargetCondt);
                  }}>{addNewConditionTargetText}</button>
                  {displayAddNewTargetCondt && <div>

                    <div className="areaFrame" style={{"width": "420px"}}>
                      <label>If</label><br></br>
                      
                      <div>
                          <label> Variable 1: </label>
                          
                          <select 
                                onChange={(event)=>{
                                  setLsGdataVar1(event.target.value);
                                  setCondtVar1Type(gameDataLocal[event.target.value]["data_type"]);
                                  console.log("var1 selected type = ", gameDataLocal[event.target.value]["data_type"]);
                                }} 
                                value={logicSplitter_gameDataVar1}>
                              
                              <option value="" key="">--Game Data--</option>
                              {Object.keys(gameDataLocal).map((currKey) => {

                                  return (
                                  <option value={currKey} key={gameDataLocal[currKey]["name"]}>{currKey}</option>
                                  );
                              })}
                          </select>
                          {displayGameDataButton && <button onClick={()=>{displayGameDataPanel()}}> + </button>}
                      </div>

                      <div>
                          <label>Comparison: </label>
                          
                          {(condtVar1Type === "number") && 
                            <select onChange={(event)=>{setVar2NumCompare(event.target.value);}}>
                                <option key="" value="-"> -- Operator -- </option>
                                <option key="larger" value="larger"> larger than </option>
                                <option key="smaller" value="smaller"> smaller than </option>
                                <option key="equal" value="equal"> equals to </option>
                                <option key="largerequal" value="largerequal"> larger than or equals to </option>
                                <option key="smallerequal" value="smallerequal"> smaller than or equals to </option>
                            </select>}
                      </div>
                    <div> 
                        {(condtVar1Type === "number") && <div>
                          <label> Variable 2: </label>
                          <br></br>

                          <input type="radio" value={logicSplitterVar2IsGData} checked={logicSplitterVar2IsGData} onChange={()=>{changeLsVar2ToGameData();setLsGdataVar2("");}}/> Game Data Item: 
                          {/* //TODO33 conditional: if same type */}

                          <select onChange={(event)=>{
                              let selectedV2 = event.target.value;

                              let selectedV2Type = gameDataLocal[selectedV2]["data_type"];

                              if (selectedV2Type !== "number") {
                                alert("Please select a number type data item.");
                              } else {
                                setLsGdataVar2(selectedV2);
                              }
                              
                            }} value={logicSplitter_gameDataVar2}>
                                  <option value="" key="">--Select Game Data--</option>
                                  
                            {Object.keys(gameDataLocal).map((key) => {
                                let currItem2 = gameDataLocal[key];
                                if (currItem2["data_type"] === "number" && currItem2["name"] !== logicSplitter_gameDataVar1) {
                                    return (
                                        <option value={gameDataLocal[key]["name"]} key={gameDataLocal[key]["name"]}>{key}</option>
                                    );
                                }
                              })}
                              
                          </select>
                        {displayGameDataButton && <button onClick={()=>{displayGameDataPanel()}}> + </button>}

                        <br></br>
                        <input type="radio" value={logicSplitterVar2IsGData} checked={!logicSplitterVar2IsGData} onChange={()=>{changeLsVar2ToValue();setLsGdataVar2("");}}/> Value:
                            <input type="number" min="-100000000" max="100000000" step="1" value={logicSplitter_gameDataVar2} onChange={(event)=>{setLsGdataVar2(event.target.value);}}></input>    
                        </div>}

                        {(condtVar1Type === "string") && <div>          
                          <input type="radio" value={var1StringEq} onChange={()=>{setVar1StringEq(true);}} checked={var1StringEq}></input>
                          <label> Is </label>
                          <input value={logicSplitter_gameDataVar2} onChange={(event)=>{
                            setLsGdataVar2(event.target.value);
                          }}></input>
                        <br></br>                         
                        <input type="radio" value={var1StringEq} onChange={()=>{setVar1StringEq(false);}} checked={!var1StringEq}></input>
                          <label> Is Not </label>
                          <input value={logicSplitter_gameDataVar2} onChange={(event)=>{
                            setLsGdataVar2(event.target.value);
                          }}></input>       
                        
                        </div>}

                        {(condtVar1Type === "boolean") && <div>
                  
                        <input type="radio" value={var1BoolTrue} onChange={()=>{setVar1BoolTrue(true);console.log("going to set: Var1-boolean-true");}} checked={var1BoolTrue}></input>
                          <label> Is True</label>
                        <br></br>                   
                        <input type="radio" value={var1BoolTrue} onChange={()=>{setVar1BoolTrue(false);console.log("going to set: Var1-boolean-false");}} checked={!var1BoolTrue}></input>
                          <label> Is False</label>  
                        </div>}

                </div>

                <br></br>
                    Target Node:
                    <select value={lscCurrSelected}
                      onChange={(event)=>{
                        setLscCurrSelected(event.target.value);
                      }}>
                      <option key="lscCurrDefault" value="">-- Select --</option>
                              {Object.keys(nodeRelationshipMap).map((currKey) => {                  
                                  let item = nodeRelationshipMap[currKey];
                                  if (item === undefined) {
                                    return;
                                  }
                                  let lscCurrKey = "lscSettingCurr" + currKey;
                                  return (<option 
                                    key={lscCurrKey}
                                    value={currKey}
                                    >{currKey}: {item["nodeName"]}
                                    </option>);
                      })} 
                    </select>


                    <br></br><br></br>
                    <button onClick={()=>{
                        if (lscCurrSelected === undefined || lscCurrSelected === "") {
                          alert("Please choose a target node.");
                          return;
                        }

                      let stmtStr = "type[" + condtVar1Type + "]^" + logicSplitter_gameDataVar1 + "^";
                      let displayStr = "[" + logicSplitter_gameDataVar1 + "](type: " + condtVar1Type + ") \n ";
                      if (condtVar1Type === "number") {
                        if (var2NumCompare === "") {
                          alert("Please select the comparison");
                          return;
                        }
                        if (logicSplitterVar2IsGData === true) {
                          stmtStr = stmtStr + var2NumCompare + "(gameData)^" + logicSplitter_gameDataVar2;
                          displayStr = displayStr + var2NumCompare + " - \n" + "[" + logicSplitter_gameDataVar2 + "]";
                        } else {
                          stmtStr = stmtStr + var2NumCompare + "(pureValue)^" + logicSplitter_gameDataVar2;
                          displayStr = displayStr + var2NumCompare + "- \n(value) " + logicSplitter_gameDataVar2;

                        }
                      } else if (condtVar1Type === "boolean") {
                        if (var1BoolTrue === true) {
                          stmtStr = stmtStr + "isTrue";
                          displayStr = displayStr + "- \nis true";
                        } else {
                          stmtStr = stmtStr + "isFalse";
                          displayStr = displayStr + "- \nis false";
                        }
                      } else if (condtVar1Type === "string"){
                        if (var1StringEq === true) {
                          stmtStr = stmtStr + "equalsTo^" + logicSplitter_gameDataVar2;
                          displayStr = displayStr + "- \nequals to " + logicSplitter_gameDataVar2;
                        } else {
                          stmtStr = stmtStr + "notEqualTo^" + logicSplitter_gameDataVar2;
                          displayStr = displayStr + "- \nnot equals to " + logicSplitter_gameDataVar2;

                        }
                      }

                      setLsGdataVar1("");
                      setLsGdataVar2("");
                      setVar2NumCompare("");
                      setCondtVar1Type("");
                      setVar1StringEq(true);
                      setVar1BoolTrue(true);
                      setLsV2IsGData(true);
                      setLscCurrSelected("");
      console.log("statement: ", stmtStr); // TODO test
                    //{"internalStmt":stmtStr, "nextNode": lscCurrSelected, "displayStmt": displayStr}
                      let currStmtArr = {"internalStmt": stmtStr, "nextNode": lscCurrSelected, "displayStmt": displayStr};
                                          //previous: [stmtStr, lscCurrSelected, displayStr]; //TODO32 change to obj!!!

                      let tempLogicPairs = nodeRelationshipMap[clickedNodeKey].spltLogicPairs;
                      tempLogicPairs.push(currStmtArr);

                      let tempNodeRelMap = nodeRelationshipMap;
                      tempNodeRelMap[clickedNodeKey].spltLogicPairs = tempLogicPairs; //TODO change to map

                      setNodeRelationshipMap(tempNodeRelMap);
                      updateNodeLinkingsOnce(tempNodeRelMap, gridBlocks);
                      triggerNodeMappingsChange(tempNodeRelMap, gridBlocks);

      console.log("new node-rel-map = ", tempNodeRelMap); //TODO test
                      
                      setDisplayAddNewTargetCondt(false);
                    }}>{addConditionText}</button>

                          </div>




                  </div>}

              </div>}

    </div>

</div>


    {/* node-info-area ends */}
    </div> 

    <div style={{"marginLeft": "20px"}}>


<div>
{clickedNode2 !== -1 && <div className="parallelFrame">
{/* node-moving */}
          <div>
            <button
              onClick={()=>{
              let node = nodeRelationshipMap[clickedNodeKey];
              let targetR = node.row;
              let targetC = node.col-1;
              if (targetC >= 0 && gridBlocks[targetR][targetC] === "") {
                let tempGrid = gridBlocks;
                tempGrid[node.row][node.col] = "";
                tempGrid[targetR][targetC] = clickedNodeKey;
                

                let tempMap = nodeRelationshipMap;
                tempMap[clickedNodeKey].col = targetC;
                
                let crd = targetR * 10000 + targetC;
                setClickedNode2(crd);

                /* update all node-mappings */
                setGridBlocks(tempGrid);
                setNodeRelationshipMap(tempMap);
                updateNodeLinkingsOnce(tempMap, tempGrid); //TODO
                triggerNodeMappingsChange(tempMap, tempGrid);
              }
              
            }}>←</button>
          </div>
          <div>
            <div className="centered"><button
            onClick={()=>{
              let node = nodeRelationshipMap[clickedNodeKey];
              let targetR = node.row-1;
              let targetC = node.col;

              if (targetR >= 0 && gridBlocks[targetR][targetC] === "") {
                let tempGrid = gridBlocks;
                tempGrid[node.row][node.col] = "";
                tempGrid[targetR][targetC] = clickedNodeKey;
                

                let tempMap = nodeRelationshipMap;
                tempMap[clickedNodeKey].row = targetR;
                
                let crd = targetR * 10000 + targetC;
                setClickedNode2(crd);

                /* update all node-mappings */
                setGridBlocks(tempGrid);
                setNodeRelationshipMap(tempMap);
                updateNodeLinkingsOnce(tempMap, tempGrid); //TODO
                triggerNodeMappingsChange(tempMap, tempGrid);
              }
            }}>↑</button></div>
            <div><button
                onClick={()=>{
                let node = nodeRelationshipMap[clickedNodeKey];
                let targetR = node.row+1;
                let targetC = node.col;
                let len = gridBlocks.length;

                if (targetR < len && gridBlocks[targetR][targetC] === "") {
                  let tempGrid = gridBlocks;
                  tempGrid[node.row][node.col] = "";
                  tempGrid[targetR][targetC] = clickedNodeKey;
                  

                  let tempMap = nodeRelationshipMap;
                  tempMap[clickedNodeKey].row = targetR;
                  
                  let crd = targetR * 10000 + targetC;
                  setClickedNode2(crd);

                  /* update all node-mappings */
                  setGridBlocks(tempGrid);
                  setNodeRelationshipMap(tempMap);
                  updateNodeLinkingsOnce(tempMap, tempGrid); //TODO
                  triggerNodeMappingsChange(tempMap, tempGrid);
                }
            }}>↓</button></div>
          </div>
          <div style={{"alignItems": "end"}}>
            <button
              onClick={()=>{
              let node = nodeRelationshipMap[clickedNodeKey];
              let targetR = node.row;
              let targetC = node.col+1;
              let len = gridBlocks[0].length;

              if (targetC < len && gridBlocks[targetR][targetC] === "") {
                let tempGrid = gridBlocks;
                tempGrid[node.row][node.col] = "";
                tempGrid[targetR][targetC] = clickedNodeKey;
                
                let tempMap = nodeRelationshipMap;
                tempMap[clickedNodeKey].col = targetC;
                
                let crd = targetR * 10000 + targetC;
                setClickedNode2(crd);

                /* update all node-mappings */
                setGridBlocks(tempGrid);
                setNodeRelationshipMap(tempMap);
                updateNodeLinkingsOnce(tempMap, tempGrid); //TODO
                triggerNodeMappingsChange(tempMap, tempGrid);
              }
            }}>→</button>            
          </div>

</div>}


        </div>



        {(clickedNode2 !== -1 
          && nodeRelationshipMap[clickedNodeKey] !== undefined
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "LogicSplitter"
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "*chapterStart*"
          && nodeRelationshipMap[clickedNodeKey].nodeType !== "*chapterEnd*") && 
 <div>
            <button 
              className="setting_item"
              style={{"height": "30px",  "width": "100px"}}
              onClick={()=>{enterNodeEditor2();}}>
                {enterEditorText}
            </button>
        
        
  </div>}
    </div>
</div>
          </div>}







{/* //TODO plan */}
          {/* <p className="plans">TODO: 
              <br></br>user can also add column or row for new grids 
              <br></br>TODO: consider adjustment of node-place
              <br></br>other settings (next-node condition, etc.) are the same 
          -------------------------------------------------------------         
          </p> */}
{/* //TODO plan */}

          {/* {(clickedNode !== "") && 
        <div>
        <button 
          className="setting_item"
          onClick={enterNodeEditor}>
            Enter Editor for [{clickedNode}]
        </button>
    
      
        </div>
        } */} 
    
   
      

      <br></br><br></br><br></br><br></br><br></br>
        <div className="trashNodeArea">
       
    
{/* //TODO plans */}
{/* 
<p className="plans"> TODO:
            <br></br>
  
            <br></br> idea: logic organizer depends heavily on the game-data specified by author.
            <br></br> the game maker should provide entry for CRUD operations on game-data, in inside-node layer
            <br></br> frontend aspect, game-data manager is needed (CRUD); backend aspect, game-data's data structure on cloud is needed
            <br></br> for game-data, in the node-managing layer, it can only display/check, and only inside node can it alter game-data value via logic-organzer related system
            <br></br> [ ** first, implement and test simple logical conditions, then improve to combos (with parenthesis) ]
        
        </p> 
    
       */}
{/* //TODO plans */}



        </div>
    
    
        <button 
          className="setting_item"
          onClick={() => {
            saveNodeInfoToCloud();
          }}>
            {saveToMyProjectText}
        </button>
    
        </div>
        }

        {chapterKey === "" && <div>
          {pleaseSelectOrSetupChaptersInChapterMngText}...
          
        </div>}
     

      </div>
    );
}







//TODO for one LSC, nodeRelationshipMap[clickedNodeKey].spltLogicPairs stores needed data for links and path-decising instructions.
//TODO for functionality of LSC, consider tracking component
//TODO consider data structure parsing for node-tracking when viewing/gameplaying

/* example
nodeRelationshipMap[clickedNodeKey].spltLogicPairs


  0:  ['else', '', 'else']
  1:  ['type[boolean]^true1^isFalse', 'node2', '[true1](type: boolean) \n - \nis false']
  2:  ['type[number]^number7^smaller(pureValue)^2', 'a', '[number7](type: number) \n smaller- \n(value) 2']

*/