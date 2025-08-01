import { useState, useEffect } from 'react';

import langDictionary from './_textDictionary';

import GameScreen_InPracShell_ConvNode from './GameScreen_InPracShell_ConvNode';
//TODO fetch-and-updte data for conv-node-game-screen

//TODO1090 cloud-db related
import { generateNodeLongKeyString_vm } from '../viewmodels/PrepAc_ProjectOperation';

//TODO6000 offline mode prep


//TODO700 get chapter-list
//TODO according to chapter-key, fetch one chapter of data
//TODO redo when walking to another chapter??



//level2 (includes all types of nodes)

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

    getInitGameDataTracker,
    getCurrChapterAllNodeMapping,
    getAllChapterList,

    username,
    projectname,
    uiLanguage,


    visualMap,
    audioMap,
    mutedViewOption,
    fetchGameSettings,

    getCurrChapterDataContainer,
    openSettingPage,

    sendOutBgmSettings,
    backendOption

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
     //   console.log("### game-screen-all-node-type-container...\n\tanct___game-data-tracker.. ", currGameDataTracker);
 
        if (firstTimeEnter === true) {
            //TODO
            console.log("...................................");
            console.log("...................................");
            console.log("...................................");
                                                                console.log("!!!!!!!!!!!!! game-screen-all-node-container FIRST ENTER , ");
                                        

                let gDataTemp = getInitGameDataTracker();
                setCurrGameDataTracker(gDataTemp); //initialize
                                                                console.log("\t\tgame-data = ", gDataTemp);

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
                walkToNextNode(holdingNextNodeKey);
                resetJumpNodeSignalToFalse();
            
            } else if (currNodeType === "*chapterEnd*") {
                walkToNextChapter();

            } else if (jumpNodeSignal == true) { //game-content-node
                walkToNextNode(holdingNextNodeKey);
                                                
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
    async function initializeAllNodeDataContainer(chapterKeyTemp) {//TODO99999
        if (chapterKeyTemp.length === 0) {
            return;
        }

        //TODO51 by node-list, pre-fetch node(s) data and store into allNodeDataContainer
        let containerTemp = {};
                                console.log("%%% chpterKey is [", chapterKeyTemp , "]");


     //   Object.keys(nodeMappingTemp).map(async (chapterKey) => {
 
            let docCollection = {};
            //TODO99999 use all-node-content data object from panel2 !!!
                                    // await fetchNodeDataEachChapterVM({
                                    //     projectName: projectname, 
                                    //     uname: username, 
                                    //     chapterKey: chapterKeyTemp,
                                    //     bkOption: backendOption
                                    // });

                                console.log("### ", chapterKeyTemp, ": node-data by each chapter: ", docCollection);


            Object.keys(docCollection).map((nodeKey) => {
               let keyStr = generateNodeLongKeyString_vm({
                    chapterKey: chapterKeyTemp, 
                    nodeKey: nodeKey
                });


               containerTemp[keyStr] = docCollection[nodeKey];

            });
        
     //   });


                                console.log("!!!!! initialized all-container: ", containerTemp);


        setAllNodeDataContainer(containerTemp);
        

                        

    }

    //TODO21 refactor to VM
    async function fetchOrFindNodeData(chapterKeyTemp, nodeKeyTemp) {
//allNodeDataContainer, setAllNodeDataContainer
//getCurrChapterDataContainer!!!

        let keyStr = generateNodeLongKeyString_vm({
            chapterKey: chapterKeyTemp, 
            nodeKey:nodeKeyTemp
        });
        

        if (allNodeDataContainer[keyStr] !== undefined && allNodeDataContainer[keyStr] !== null) {
                                                                console.log(" \t\t... already in map, node-data = ", allNodeDataContainer[keyStr], "\n\t\t for key - ", keyStr);
      

            setFocusedNodeData(allNodeDataContainer[keyStr])
            
            return allNodeDataContainer[keyStr];


        } else {
            //cloud func

                                                                // let dataObj = await fetchNodeDataEachNodeVM({
                                                                //     projectName: projectname, 
                                                                //     uname: username, 
                                                                //     chapterKey: chapterKeyTemp, 
                                                                //     nodeKey: nodeKeyTemp,
                                                                //     bkOption: backendOption
                                                                // });
                                                                // let tempMap = allNodeDataContainer;
                                                                // tempMap[keyStr] = dataObj;
                                                                // setAllNodeDataContainer(tempMap);
                                                                
                                                                // setFocusedNodeData(dataObj)
                                                    
                                                                // return dataObj;

        }

    }

    //TODO21 refactor to VM
    function locateHoldingNextNode(nodeKeyInfo, nodeTypeInfo) {//TODO35

                                                  console.log("\n\n\n\n\n\nlocateHoldingNextNode(jump node)! \nchapterNodeMapping = ", chapterNodeMapping);

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

                                console.log("\tnon-ls: next-node-key is ...", nextNodeKey);


            if (nextNodeKey.length > 0) {
                setHoldingNextNodeKey(nextNodeKey);

            } else {

                //TODO show user-in-game-warning... and exit normally?
                
                                                        console.log("\tnon-ls: no next-node!!");
            }


        } else { //LogicSplitter

            let logicArr = nodeDataTemp["spltLogicPairs"]
                                                        console.log("logic-arr = ", logicArr);

            let resultKey = handleLogicSplitting(logicArr);


                                                        console.log("end of locateHolding... l-splitter_result = ", resultKey);

            setHoldingNextNodeKey(resultKey);
        }

        console.log("\n\n\n\n\n\n");
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
                let typeIsNumberFlag = stmt.includes("type[number]");

                                                        console.log("item = ", item);

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

                if (typeIsNumberFlag === true) {
                    var1_value = var1_value * 1;
                    var2_value = var2_value * 1;
                }

                                            console.log("\t\t\tvar1-value =  ", var1_value);
                                            console.log("\t\t\tvar2-value =  ", var2_value);


                                            console.log("\t\taction: ", action);
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
            console.log("~~~ logic-splitter result: target node is ", targetNode);
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
    function walkToNextNode(targetNextKey) {
                                                    console.log("#chapterNodeMapping = ", chapterNodeMapping);
                                                    console.log("\t#holdingNextNode-Key targetNextKey = ", targetNextKey);

        if (chapterNodeMapping[currChapterKey][targetNextKey] === undefined) {
            return;
        }

        // get nextNode's type
        let upcomingNodeType = chapterNodeMapping[currChapterKey][targetNextKey]["nodeType"];

        // set new holding-next
        locateHoldingNextNode(targetNextKey, upcomingNodeType);


        setCurrNodeType(upcomingNodeType);
        setCurrNodeKey(targetNextKey);

        //set upcoming-node's actual data
        if (upcomingNodeType !== "*chapterStart*" 
            && upcomingNodeType !== "*chapterEnd*"
            && upcomingNodeType !== "LogicSplitter"
        ){ // game-content-nodes

            fetchOrFindNodeData(currChapterKey, targetNextKey);

        //TODO700


        } 
    
        triggerWalkToCurrNode(targetNextKey, upcomingNodeType);
        resetNextNodeSignal();
    }


    function walkToNodeAfterStartNode() {
                                                    // let nextStartNodeKey = "chapterStart"; //"chapterStart"      "chapterEnd"
                                                    // setCurrNodeKey(nextStartNodeKey);
                                                    // setCurrNodeType("*chapterStart*");



        locateHoldingNextNode("chapterStart", "*chapterStart*");
        markJumpNodeSignalTrue();
    }


    //TODO21 refactor to VM
    async function walkToNextChapter() {
        console.log("walk-to-next-chapter:     current chapter = ", currChapterKey);

        let i = 1;
        let len = allChapterList.length;
        while (i < len) {
            let item = allChapterList[i];
                               console.log("allChapterList[",i,"] = ", item);

            if (item[0] === currChapterKey) {
                //next chapter is the next key

                if (i+1 === len) {
                    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nlast chapter")
                    return;

                } else { // (i+1 < len): more chapters to go

                                                    console.log("\t\t more chapters to go");


                    let nextChapterItem = allChapterList[i+1];
                    setCurrChapterKey(nextChapterItem[0]);
                    setCurrChapterTitle(nextChapterItem[1]);


                    walkToNodeAfterStartNode();

                    await triggerWalkToCurrChapter(nextChapterItem[0], nextChapterItem[1]);



                    console.log("next chapter!! \n", nextChapterItem);
                    break;
                }
            }
            i++;
        }

        //when i === len
        // TODO end of the entire game / spot of unfinished project end. ask if return ?
        //later: if SL-system, go to nav-to-SL hint
        //later: if non-SL-system, go to story-page(chapter list page)?
                                                                                    console.log("flag1");

    }

    function receiveUpdatedGameDataTracker(data) {
        console.log("\t\t\t\t\t current game-data: ", data);
        setCurrGameDataTracker(data); //updating during the game
    }





//TODO109 fetchGameSettings()

return (

<div 
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
            "color": "#FFFFFF",
            "justifyContent": "center",
            "alignItems": "center",
            "display": "flex"
        }}
        onClick={()=>{
            locateHoldingNextNode(currNodeKey, currNodeType);
            markJumpNodeSignalTrue();
        }}
    >

        <div>
            <label style={{"fontSize": "20px"}}>{currChapterTitle}</label>
            <br></br>
            press to continue
        </div>
        
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
        {/* //TODO change to bgm for each node's piece... */}

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
            
            enteringEmuGameDataTracker={currGameDataTracker} //TODO change to dynamic fetching?

            updatedGameDataTracker={receiveUpdatedGameDataTracker}

            visualMap={visualMap} //TODO empty so far
            audioMap={audioMap} //TODO empty so far
            mutedViewOption={mutedViewOption}
            fetchGameSettings={fetchGameSettings}

            openSettingPage={openSettingPage}
            sendOutBgmSettings={sendOutBgmSettings}

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
