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

export default function DuringGameScreen_AllNodeTypeContainer({
    getNodeType, 
    getChapterKey, 
    getNodeKey,
    getChapterTitle,
    getAllContent,

    initialNodeType, 
    initialChapterKey, 
    initialNodeKey,
    initialChapterTitle,

    notifyNodeWalk,
    triggerWalkToCurrChapter,

    getInitGameDataTracker,
    getCurrChapterAllNodeMapping,
    getAllChapterList,

    username,
    projectname,
    uiLanguage,

    visualMap, //TODO change to dynamic
    audioMap, //TODO change to dynamic

    mutedViewOption,
    fetchGameSettings,

    openSettingPage,

    sendOutBgmSettings,

    returnToStoryPage

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


    const [entireContainer, setEntireContainer] = useState({});
    const [focusedNodeData, setFocusedNodeData] = useState(-1);

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
 
        if (firstTimeEnter === true) {
            //TODO
            console.log("...................................");
            console.log("...................................");
            console.log("...................................");
                                                                console.log("!!!!!!!!!!!!! game-screen-all-node-container FIRST ENTER");
                                        

                let gDataTemp = getInitGameDataTracker();
                setCurrGameDataTracker(gDataTemp); //initialize
                                                           //     console.log("\t\tgame-data = ", gDataTemp);

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
                                                            //    console.log("use-effect, initial-chapter-key = ", initialChapterKey);
                fetchentireContainer(chapterKeyTemp);
                                                            //    console.log("ChapterAllNodeMapping = ", nodeMappingTemp);

                let chapterListTemp = getAllChapterList(); //entering-data only
                initializeChapterArray(chapterListTemp);

                setFirstTimeEnter(false);

        } else { 
            //after first-entry
            //in useEffect

            let chapterKeyTemp = getChapterKey();
            if (currChapterKey !== chapterKeyTemp
                || entireContainer === -1 
                ) {
                fetchentireContainer(chapterKeyTemp);
            }

            if (currNodeType === "LogicSplitter") {
                                                console.log("LogicSplitter");
                        
                atLogicSplitterBehaviour();
                walkToNextNode();
                resetJumpNodeSignalToFalse();
            
            } else if (currNodeType === "*chapterEnd*") {
                                                console.log("*chapterEnd*");

                walkToNextChapter();

            } else if (jumpNodeSignal == true) { //game-content-node
                                                console.log("game-content-node");

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
        //TODO50

             //   console.log("after init .. arr is ", arr, " type is ", typeof(arr));

        setAllChapterList(arr);

    }


    function setupScreenSizeByNodeKey(nodeKeyName) {
        //TODO fetch from cloud for this node's size data...?

        //setScreenWidth
        //setScreenHeight


    }

    //TODO21 refactor to VM
    function fetchentireContainer() {//TODO99999
 
        let anc = getAllContent();

        if (anc !== -1) {
            setEntireContainer(anc);
        }

  
    }

    //TODO21 refactor to VM
    function fetchOrFindNodeData(chapterKeyTemp, nodeKeyTemp) {
//entireContainer, setentireContainer
//getCurrChapterDataContainer!!!

        let keyStr = generateNodeLongKeyString_vm({
            chapterKey: chapterKeyTemp, 
            nodeKey:nodeKeyTemp
        });
                        console.log("%%% entireContainer: ", entireContainer);
                        console.log("keyStr", keyStr);
                        console.log("entireContainer[keyStr]", entireContainer[keyStr]);


        if (entireContainer[keyStr] !== undefined 
            && entireContainer[keyStr] !== null
        ) {
                                                                console.log(" \t\t... fetch-or-find-func: already in map, node-data = ", entireContainer[keyStr], "\n\t\t for key - ", keyStr);
      

            setFocusedNodeData(entireContainer[keyStr])
            
            return entireContainer[keyStr];


        } else {
                                                                console.log(" \t\t... fetch-or-find-func: node not found in ds");
            //cloud func
// use : chapterKeyTemp     nodeKeyTemp       

                                                                // let dataObj = await fetchNodeDataEachNodeVM({
                                                                //     projectName: projectname, 
                                                                //     uname: username, 
                                                                //     chapterKey: chapterKeyTemp, 
                                                                //     nodeKey: nodeKeyTemp,
                                                                //     bkOption: backendOption
                                                                // });
                                                                // let tempMap = entireContainer;
                                                                // tempMap[keyStr] = dataObj;
                                                                // setentireContainer(tempMap);
                                                                
                                                                // setFocusedNodeData(dataObj)
                                                    
                                                                // return dataObj;

        }

    }

    //TODO21 refactor to VM
    function locateHoldingNextNode(nodeKeyInfo, nodeTypeInfo) {//TODO35

                                                console.log("#locateHoldingNextNode start! [", nodeKeyInfo, "]");    
                                                console.log("\n\n\n\n\n\nlocate-Holding-NextNode(jump node)! \n\tchapterNodeMapping = ", chapterNodeMapping);

        let chapterDataTemp = chapterNodeMapping[currChapterKey];
                                    //            console.log("curr-chapter data = ", chapterDataTemp);

        let nodeDataTemp = chapterDataTemp[nodeKeyInfo];
                                                console.log("curr-node data = ", nodeDataTemp);
        if (nodeDataTemp === undefined || nodeDataTemp === null) {
            return;
        }

        let nextNodeKeyInfo = -1;

        if (nodeTypeInfo !== "LogicSplitter") { 
                                // all other nodes:
                                    // "*chapterStart*"
                                    // "*chapterEnd*"
                                    // "Conversation"
                                    // "CardGame"

            /* k-v Format
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
                nextNodeKeyInfo = nextNodeKey;
                                console.log("\t\tnext-node info:", nextNodeKeyInfo);
            } 
            
                                    if (nextNodeKey.length === 0) { //TODO remove later

                                        //TODO exit normally? 
                                        console.log("\tnon-ls: no next-node!!");
                                    }


        } else { //LogicSplitter

            let logicArr = nodeDataTemp["spltLogicPairs"]
                                                        console.log("logic-arr = ", logicArr);

            let resultKey = handleLogicSplitting(logicArr);


                                                        console.log("end of locateHolding... l-splitter_result = ", resultKey);

            nextNodeKeyInfo = resultKey;
        }

        setHoldingNextNodeKey(nextNodeKeyInfo);

        console.log("#locateHoldingNextNode finish! ");                                    console.log("\n\n\n\n\n\nlocate-Holding-NextNode(jump node)! \n\tchapterNodeMapping = ", chapterNodeMapping);

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
    function walkToNextNode() {
                                                    console.log("#chapterNodeMapping = ", chapterNodeMapping);
                                                    console.log("\t#holdingNextNode-Key = ", holdingNextNodeKey);

        if (holdingNextNodeKey == -1
            || chapterNodeMapping[currChapterKey] === undefined
            || chapterNodeMapping[currChapterKey][holdingNextNodeKey] === undefined

        ) {
            return;
        }
                                                    console.log("\tvalid 1!");


        // get nextNode's type
        let holdingNextNodeType = chapterNodeMapping[currChapterKey][holdingNextNodeKey]["nodeType"];

        if (holdingNextNodeType === undefined) {
            return;
        }
                                                    console.log("\tvalid 2!");


        // set new holding-next
        locateHoldingNextNode(holdingNextNodeKey, holdingNextNodeType);


        setCurrNodeType(holdingNextNodeType);
        setCurrNodeKey(holdingNextNodeKey);

        //set upcoming-node's actual data
        if (holdingNextNodeType !== "*chapterStart*" 
            && holdingNextNodeType !== "*chapterEnd*"
            && holdingNextNodeType !== "LogicSplitter"
        ){ // game-content-nodes

            fetchOrFindNodeData(currChapterKey, holdingNextNodeKey);

            //TODO700

        } else {
            //TODO non-data nodes
            setFocusedNodeData(-1);
        }
    
        notifyNodeWalk(holdingNextNodeKey, holdingNextNodeType);
        resetNextNodeSignal();
    }


    function prepNodeAfterStartNode() {
                                                    // let nextStartNodeKey = "chapterStart"; //"chapterStart"      "chapterEnd"
                                                    // setCurrNodeKey(nextStartNodeKey);
                                                    // setCurrNodeType("*chapterStart*");



        locateHoldingNextNode("chapterStart", "*chapterStart*");
        markJumpNodeSignalTrue();
    }


    //TODO21 refactor to VM
    function walkToNextChapter() {
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
                    returnToStoryPage();
                    
                    return;

                } else { // (i+1 < len): more chapters to go

                                                    console.log("\t\t more chapters to go");


                    let nextChapterItem = allChapterList[i+1];
                    setCurrChapterKey(nextChapterItem[0]);
                    setCurrChapterTitle(nextChapterItem[1]);


                    prepNodeAfterStartNode();

                    triggerWalkToCurrChapter(nextChapterItem[0], nextChapterItem[1]);



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

currNodeType === {currNodeType}, focusedNodeData is -1? {focusedNodeData === -1 ? "t" : "f"}

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
            press to continue (chapter-start-node)
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



    {(currNodeType === "Conversation" 
        && focusedNodeData !== -1) 
    && 
    <div 
        style={{
            "backgroundColor": "green", 
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
        {focusedNodeData !== -1 &&
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
                
                enteringEmuGameDataTracker={currGameDataTracker} //TODO change to dynamic fetching

                updatedGameDataTracker={receiveUpdatedGameDataTracker}

                visualMap={visualMap} //TODO change to dynamic fetching
                audioMap={audioMap} //TODO change to dynamic fetching

                mutedViewOption={mutedViewOption}
                fetchGameSettings={fetchGameSettings}

                openSettingPage={openSettingPage}
                
                sendOutBgmSettings={sendOutBgmSettings}

            />
       }

{/*
  entireContainer[currNodeKey]["nodeContent"]
  entireContainer[currNodeKey]["nodeUISettings"][]


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
