import { useState, useEffect } from 'react';

import langDictionary from './textDictionary';

import GameScreen_InPracShell_ConvNode from './GameScreen_InPracShell_ConvNode';
//TODO fetch-and-updte data for conv-node-game-screen

//TODO20 cloud-func
import { fetchNodeDataEachNodeVM, fetchNodeDataEachChapterVM } from '../viewmodels/NodeDataInPlayViewModel';
//TODO100 check efficiency

export default function GameScreen_AllNodeTypeContainer({
    getNodeType, 
    getChapterKey, 
    getNodeKey,
    getChapterTitle,
    initialNodeType, 
    initialChapterKey, 
    initialNodeKey,
    initialChapterTitle,

    triggerWalkToCurrNode,
    triggerWalkToCurrChapter,

    getCurrentGameDataTracker,
    getCurrChapterAllNodeMapping,
    getAllChapterList,

    username,
    projectname,
    uiLanguage,


    visualMap,
    audioMap,

}) {


    const [screenWidth, setScreenWidth] = useState(800); //TODO /* according to current node's size */
    const [screenHeight, setScreenHeight] = useState(600); //TODO /* according to current node's size */


    const [currNodeType, setCurrNodeType] = useState(initialNodeType);
    const [currNodeKey, setCurrNodeKey] = useState(initialNodeKey);
    const [currChapterKey, setCurrChapterKey] = useState(initialChapterKey);
    const [currChapterTitle, setCurrChapterTitle] = useState(initialChapterTitle);


    const [holdingNextNodeKey, setHoldingNextNodeKey] = useState("");
    const [currentNodeFinishedSignal, setCurrentNodeFinishedSignal] = useState(false);

    const [chapterNodeMapping, setChapterNodeMapping] = useState({});

    const [allChapterList, setAllChapterList] = useState([]);

    const [jumpNodeSignal, setJumpNodeSignal] = useState(false);

    const[currGameDataTracker, setCurrGameDataTracker] = useState({});

                                                // const [audioMap, setAudioMap] = useState({});
                                                // const [visualMap, setVisualMap] = useState({}); 
                                                // const [audioMapSize, setAudioMapSize] = useState(0);
                                                // const [visualMapSize, setVisualMapSize] = useState(0);


    const [allNodeDataContainer, setAllNodeDataContainer] = useState({});
    const [focusedNodeData, setFocusedNodeData] = useState([]);

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
        console.log("anct___game-data-tracker.. ", currGameDataTracker);
 
        if (firstTimeEnter === true) {
            //TODO
                                                                console.log("!!!!!!!!!!!!! game-screen-all-node-container FIRST ENTER , ");
                                        


                let gDataTemp = getCurrentGameDataTracker();
                setCurrGameDataTracker(gDataTemp);

                let nodeTypeTemp = getNodeType(); //entering-data only
                setCurrNodeType(nodeTypeTemp); 

                let chapterKeyTemp = getChapterKey(); //entering-data only
                setCurrChapterKey(chapterKeyTemp);

                let nodeKeyTemp = getNodeKey(); //entering-data only
                if (nodeKeyTemp !== currNodeKey) {
                    setCurrNodeKey(nodeKeyTemp);
                    setupScreenSizeByNodeKey(nodeKeyTemp);            
                }

                let chapterTitleTemp = getChapterTitle(); //entering-data only
                setCurrChapterTitle(chapterTitleTemp);

                let nodeMappingTemp = getCurrChapterAllNodeMapping(); //entering-data only
                setChapterNodeMapping(nodeMappingTemp);
                                                                console.log("use-effect, initial-chapter-key = ", initialChapterKey);
                initializeAllNodeDataContainer(chapterKeyTemp);
                                                                console.log("ChapterAllNodeMapping = ", nodeMappingTemp);

                let chapterListTemp = getAllChapterList(); //entering-data only
                initializeChapterArray(chapterListTemp);

                setFirstTimeEnter(false);

        } else {

            if (currNodeType === "LogicSplitter") {
                atLogicSplitterBehaviour();
                walkToNextNode();
                resetJumpNodeSignalToFalse();
            
            } else if (currNodeType === "*chapterEnd*") {
                walkToNextChapter();

            } else if (jumpNodeSignal == true) { //game-content-node
                walkToNextNode();
                                                
                resetJumpNodeSignalToFalse();
            }
        }

        //TODO

   
       

        //TODO screen-width and screen-height

        

    }); //-- useEffect --

    function initializeChapterArray(list) {
        let arr = [];
                console.log("initializeChapterArray-func, input list = ", list);

        let limit = Object.keys(list).length;
        let i = 0;
        while (i < limit) {
            arr.push(list[i]);

            i++;
        }

             //   console.log("after init .. arr is ", arr, " type is ", typeof(arr));

        setAllChapterList(arr);

    }


    function setupScreenSizeByNodeKey(nodeKeyName) {
        //TODO fetch from cloud for this node's size data...?

        //setScreenWidth
        //setScreenHeight


    }

    //TODO21 refactor to VM
    async function initializeAllNodeDataContainer(chapterKeyTemp) {
        if (chapterKeyTemp.length === 0) {
            return;
        }

        //TODO51 by node-list, pre-fetch node(s) data and store into allNodeDataContainer
        let containerTemp = {};
                                console.log("%%% chpterKey is [", chapterKeyTemp , "]");


     //   Object.keys(nodeMappingTemp).map(async (chapterKey) => {
 
            let docCollection = await fetchNodeDataEachChapterVM({
                projectName: projectname, 
                uname: username, 
                chapterKey: chapterKeyTemp
            });

                                console.log("### ", chapterKeyTemp, ": node-data by each chapter: ", docCollection);


            Object.keys(docCollection).map((nodeKey) => {
               let keyStr = chapterKeyTemp + "--" + nodeKey;
               containerTemp[keyStr] = docCollection[nodeKey];

            });
        
     //   });


                                console.log("!!!!! initialized all-container: ", containerTemp);


        setAllNodeDataContainer(containerTemp);
        

                        

    }

    //TODO21 refactor to VM
    async function fetchOrFindNodeData(chapterKeyTemp, nodeKeyTemp) {
//allNodeDataContainer, setAllNodeDataContainer
        let keyStr = chapterKeyTemp + "--" + nodeKeyTemp;

        if (allNodeDataContainer[keyStr] !== undefined && allNodeDataContainer[keyStr] !== null) {
                                                                console.log(" \t\t... already in map, node-data = ", allNodeDataContainer[keyStr], "\n\t\t for key - ", keyStr);
            setFocusedNodeData(allNodeDataContainer[keyStr])
            
            return allNodeDataContainer[keyStr];


        } else {
            //cloud func
            let dataObj = await fetchNodeDataEachNodeVM({
                projectName: projectname, 
                uname: username, 
                chapterKey: chapterKeyTemp, 
                nodeKey: nodeKeyTemp
            });
            let tempMap = allNodeDataContainer;
            tempMap[keyStr] = dataObj;
            setAllNodeDataContainer(tempMap);
            
            setFocusedNodeData(dataObj)
  
            return dataObj;

        }

    }

    //TODO21 refactor to VM
    function locateHoldingNextNode(nodeKeyInfo, nodeTypeInfo) {//TODO35

                                                  console.log("locateHoldingNextNode(jump node)! \nchapterNodeMapping = ", chapterNodeMapping);

        let chapterDataTemp = chapterNodeMapping[currChapterKey];
                                    //            console.log("curr-chapter data = ", chapterDataTemp);

        let nodeDataTemp = chapterDataTemp[nodeKeyInfo];
                                                console.log("curr-node data = ", nodeDataTemp);
        if (nodeDataTemp === undefined || nodeDataTemp === null) {
            return;
        }

        if (nodeTypeInfo !== "LogicSplitter") { // all other nodes
            /*
                col: 0
                display: true
                nextNode: "A1-key"
                nodeName: "chapterStart1-title"
                nodeType: "*chapterStart*"
                notes: ""
                row: 2
                screenSize: "4:3(horizonal)"
            */

            let nextNodeKey = nodeDataTemp["nextNode"];

                                console.log("\tnext-node-key is ...", nextNodeKey);


            if (nextNodeKey.length > 0) {
                setHoldingNextNodeKey(nextNodeKey);

            } else {

                //TODO show user-in-game-warning... and exit normally?
                
                                                        console.log("no next-node!!");
            }


        } else { //LogicSplitter

            let logicArr = nodeDataTemp["spltLogicPairs"]
                                    console.log("logic-arr = ", logicArr);

            let resultKey = handleLogicSplitting(logicArr);


                                                        console.log("end of locateHolding... l-splitter_result = ", resultKey);

            setHoldingNextNodeKey(resultKey);
        }
    }


    //TODO21 refactor to VM
    function handleLogicSplitting(arr) {
            // example: 
            //              spltLogicPairs: 
            // [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],
            
            let len = arr.length;
            let i = len-1;
            let stopBool = false;
            let targetNode = "[default-none]";

                            console.log("\t\t!!! handleLogicSplitting-func, arr = ", arr);

            while (i >= 0 && stopBool === false) {
                let item = arr[i];
                let stmt = item["internalStmt"];
                                            console.log("\tinternal statement = ", stmt);


                targetNode = item["nextNode"];

                if (stmt !== "else") {
  
                //                              var1, action, isVar2GivenValue, var2, currTargetNodeKey
//type[number]^hp_001^smaller(pureValue)^70
                let stmtArr = stmt.split("^");


                let var1 = stmtArr[1]; 

                let actionChunk = stmtArr[2].split("(");
                let action = actionChunk[0];

                let isVar2GivenValue = actionChunk[1].includes("pureValue") ? true : false; 
                let var2 = stmtArr[3]; 

                let currTargetNodeKey = item["nextNode"]; 
                
                if (currGameDataTracker[var1] === undefined) {
                    i--;
                    continue;
                }
                if (isVar2GivenValue === false && currGameDataTracker[var2] === undefined) {
                    i--;
                    continue;
                }


                let var1_value = currGameDataTracker[var1]["current_value"]; //TODO use game-data if applies
                let var2_value = isVar2GivenValue ? var2 : currGameDataTracker[var2]; //TODO

                                            console.log("\t\t\tvar1-value =  ", var1_value);
                                            console.log("\t\t\tvar2-value =  ", var2_value);

                switch (action){
                    case "equal":
                        if (var1_value == var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    case "!=":
                        if (var1_value != var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    case "larger":
                        if (var1_value > var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    case "largerequal": 
                        if (var1_value >= var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    case "smaller": 
                        if (var1_value < var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    case "smallerequal": 
                        if (var1_value <= var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    default:
                        i--;
                        continue; //not a standard "action", so ignore this
                }
                }
                i--;

            }
            
            return targetNode;
    }

    //TODO21 refactor to VM
    function atLogicSplitterBehaviour() {
        locateHoldingNextNode(currNodeKey, currNodeType);
        
        markJumpNodeSignalTrue();   
    }

    function markNextNodeSignalTrue() {
        setCurrentNodeFinishedSignal(true);
    }

    function resetNextNodeSignal() {
        setCurrentNodeFinishedSignal(false);
    }

    function markJumpNodeSignalTrue() {
        setJumpNodeSignal(true);
    }

    function resetJumpNodeSignalToFalse() {
        setJumpNodeSignal(false);
    }


    //TODO21 refactor to VM 
    function walkToNextNode() {
                                                    console.log("#chapterNodeMapping = ", chapterNodeMapping);
                                                    console.log("\t#holdingNextNodeKey = ", holdingNextNodeKey);
        if (chapterNodeMapping[currChapterKey][holdingNextNodeKey] === undefined) {
            return;
        }

        // get nextNode's type
        let upcomingNodeType = chapterNodeMapping[currChapterKey][holdingNextNodeKey]["nodeType"];

        // set new holding-next
        locateHoldingNextNode(holdingNextNodeKey, upcomingNodeType);


        setCurrNodeType(upcomingNodeType);
        setCurrNodeKey(holdingNextNodeKey);

        //set upcoming-node's actual data
        if (upcomingNodeType !== "*chapterStart*" 
            && upcomingNodeType !== "*chapterEnd*"
            && upcomingNodeType !== "LogicSplitter"
        ){ // game-content-nodes
            fetchOrFindNodeData(currChapterKey, holdingNextNodeKey);
        
        } 
    
        triggerWalkToCurrNode(holdingNextNodeKey, upcomingNodeType);
        resetNextNodeSignal();
    }


    //TODO21 refactor to VM
    function walkToNextChapter() {
        console.log("current chapter = ", currChapterKey);

        let i = 0;
        let len = allChapterList.length;
        while (i < len) {
            let item = allChapterList[i];
                               console.log("allChapterList[i] = ", item);
            if (item[0] === currChapterKey) {
                //next chapter is the next key
                if (i+1 < len) {
                    let nextChapterItem = allChapterList[i+1];
                    setCurrChapterKey(nextChapterItem[0]);
                    setCurrChapterTitle(nextChapterItem[1]);

                    // reset all node info
                    let nextStartNodeKey = nextChapterItem[0] + "_start";
                    setCurrNodeKey(nextStartNodeKey);
                    setCurrNodeType("*chapterStart*");

                    triggerWalkToCurrChapter(nextChapterItem[0], nextChapterItem[1]);

                    console.log("next chapter!! \n", nextChapterItem);
                    break;
                } else { 
                    // TODO end of the entire game / spot of unfinished project end. ask if return ?
                    //later: if SL-system, go to nav-to-SL hint
                    //later: if non-SL-system, go to story-page(chapter list page)?


                }
            }
            i++;
        }
    }

    function receiveUpdatedGameDataTracker(data) {
        setCurrGameDataTracker(data);
    }







return (<div 
    style={{
        "backgroundColor": "blue", 
        "borderRadius": "0px",
        "userSelect": "none",
        "cursor": "pointer",
        "position": "relative",
    }}
>


    {currNodeType === "*chapterStart*" && <div 
        style={{
            "backgroundColor": "#000000", 
            "borderRadius": "0px", 
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`,
            "color": "#FFFFFF"
        }}
        onClick={()=>{
            locateHoldingNextNode(currNodeKey, currNodeType);
            markJumpNodeSignalTrue();
        }}
    >

    {currChapterTitle} 
        
    </div>}


    {/* 
    //TODO can remove later, here for testing only
    {currNodeType === "*chapterEnd*" && 
    <div style={{
        "backgroundColor": "#000000", 
        "borderRadius": "0px", 
        "width": `${screenWidth}px`, 
        "height": `${screenHeight}px`,
        "color": "pink"
    }}
        o n C l i ck ={()=>{

            //TODO switch to next chapter!
            walkToNextChapter();
        }}
    >
    *chapterEnd*<br></br>
    chapter = {currChapterKey}, node-key = {currNodeKey}        
    </div>} 
    //TODO can remove later, here for testing only
    */}


    {/* just for transition - no content for logic-splitter */}
    {currNodeType === "LogicSplitter" && 
    <div
        style={{
            "backgroundColor": "#000000", 
            "borderRadius": "0px", 
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`
        }}
    >
    </div>}



    {currNodeType === "Conversation" && 
    <div 
        style={{
            "backgroundColor": "blue", 
            "borderRadius": "0px", 
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`,
            "position": "absolute",
        }}
        onClick={()=>{
            //--- works perfectly ok with temp conv-area (without logic-splitter so far)---
          
          if (currentNodeFinishedSignal === true) {
                locateHoldingNextNode(currNodeKey, currNodeType); //TODO for game-data-referencing, only do locating at node's last move!

                    //TODO for in-practice-node-viewing, only walk to nextt node at node's last move!
                markJumpNodeSignalTrue();
          }



            //--- works perfectly ok with temp conv-area (without logic-splitter so far)---
        }}
    >

        <GameScreen_InPracShell_ConvNode
            allPieceData={focusedNodeData["nodeContent"]}
            nodeUIConvNav={focusedNodeData["nodeUISettings"]["convNav"]}
            nodeUIDefaultButton={focusedNodeData["nodeUISettings"]["defaultButton"]}
            nodeUILogPage={focusedNodeData["nodeUISettings"]["logPage"]}
            nodeUITextFrame={focusedNodeData["nodeUISettings"]["textFrame"]}

            notifyNodeFinish={markNextNodeSignalTrue}
            
            screenWidth={screenWidth}
            screenHeight={screenHeight}
                
            uiLanguage={uiLanguage}
            
            username={username}
            projectname={projectname}
            
            enteringEmuGameDataTracker={currGameDataTracker}
            updatedGameDataTracker={receiveUpdatedGameDataTracker}

            visualMap={visualMap} //TODO empty so far
            audioMap={audioMap} //TODO empty so far
       />

{/*
  allNodeDataContainer[currNodeKey]["nodeContent"]
  allNodeDataContainer[currNodeKey]["nodeUISettings"][]


      nodeContent  // array
      nodeUISettings
        -convNav
        -defaultButton
        -logPage
        -textFrame

       */}


        
    </div>}

    




</div>);


}
