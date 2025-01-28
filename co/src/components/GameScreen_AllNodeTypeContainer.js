import { useState, useEffect } from 'react';

import langDictionary from './textDictionary';

import GameScreen_InPracShell_ConvNode from './GameScreen_QuickView_ConvNode';
//TODO fetch-and-updte data for conv-node-game-screen

import { fetchNodeDataEachNodeVM, fetchNodeDataEachChapterVM } from '../viewmodels/NodeDataInPlayViewModel';


export default function GameScreen_AllNodeTypeContainer({
    getNodeType, 
    getChapterKey, 
    getNodeKey,
    getChapterTitle,
    initialNodeType, 
    initialChapterKey, 
    initialNodeKey,
    initialChapterTitle,

    triggerChangeToCurrNode,
    triggerChangeToCurrChapter,

    getCurrentGameDataTracker,
    getCurrChapterAllNodeMapping,
    getAllChapterList,

    username,
    projectname,
    uiLanguage

}) {


    const [screenWidth, setScreenWidth] = useState(800); //TODO /* according to current node's size */
    const [screenHeight, setScreenHeight] = useState(450); //TODO /* according to current node's size */


    const [currNodeType, setCurrNodeType] = useState(initialNodeType);
    const [currNodeKey, setCurrNodeKey] = useState(initialNodeKey);
    const [currChapterKey, setCurrChapterKey] = useState(initialChapterKey);
    const [currChapterTitle, setCurrChapterTitle] = useState(initialChapterTitle);


    const [holdingNextNode, setHoldingNextNode] = useState("");

    const [gameDataTracker, setGameDataTracker] = useState({});

    const [chapterNodeMapping, setChapterNodeMapping] = useState({});

    const [allChapterList, setAllChapterList] = useState([]);

    const [jumpNodeSignal, setJumpNodeSignal] = useState(false);

    const[currGameDataTracker, setCurrGameDataTracker] = useState({});

    const[visualList, setVisualList] = useState({});
    const[audioList, setAudioList] = useState({});

    const [audioMap, setAudioMap] = useState({});
    const [visualMap, setVisualMap] = useState({}); 
    const [audioMapSize, setAudioMapSize] = useState(0);
    const [visualMapSize, setVisualMapSize] = useState(0);


    const [allNodeDataContainer, setAllNodeDataContainer] = useState({});

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
 
        if (firstTimeEnter === true) {
            //TODO
                                                                console.log("!!!!!!!!!!!!! game-screen-all-node-container FIRST ENTER , ");
                                        
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



                if (audioMapSize < audioList.length || visualMapSize < visualList.length) {
                    let i = 0;
                    let tempAudioMap = {};
                    setAudioMapSize(audioList.length);
                    for (;i < audioList.length; i++) {
                        let item = audioList[i];
                        tempAudioMap[item["var"]] = item["url"];
                    }
                    setAudioMap(tempAudioMap);
        
                    i = 0;
                    let tempVisualMap = {};
                    setVisualMapSize(visualList.length);
                    for (;i < visualList.length; i++) {
                        let item = visualList[i];
                        tempVisualMap[item["var"]] = item["url"];
                    }
                    setVisualMap(tempVisualMap);
                }

                setFirstTimeEnter(false);

        } else {
            if (jumpNodeSignal == true) {
                walkToNextNode();

                setJumpNodeSignal(false);
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

    async function fetchOrFindNodeData(chapterKeyTemp, nodeKeyTemp) {
//allNodeDataContainer, setAllNodeDataContainer
        let keyStr = chapterKeyTemp + "--" + nodeKeyTemp;

        if (allNodeDataContainer[keyStr] !== undefined && allNodeDataContainer[keyStr] !== null) {
                                                    console.log(" \t\t... already in map, ", allNodeDataContainer[keyStr]);
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

                                                    console.log(" \t\t... newly added to map, ", dataObj);
  
            return dataObj;

        }

    }

    function locateHoldingNextNode(nodeKeyInfo, nodeTypeInfo) {//TODO35
        // fetch next-node key if direct
        //TODO do conditional-jump if logic-splitter

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
                setHoldingNextNode(nextNodeKey);

            } else {

                //TODO show user-in-game-warning... and exit normally?
                
                                                        console.log("no next-node!!");
            }


        } else { //LogicSplitter

            let logicArr = nodeDataTemp["spltLogicPairs"]
            let resultKey = handleLogicSplitting(logicArr);

            setHoldingNextNode(resultKey);
        }
    }

    function handleLogicSplitting(arr) {
//TODO go through splitting-array for next-node-locating

            //              spltLogicPairs: 
            // [{"internalStmt":"else", "nextNode": "", "displayStmt": "else"},],
            
            let len = arr.length;
            let i = 0;
            let stopBool = false;
            let targetNode = "";

            while (i < len && stopBool === false) {
                let item = arr[i];
                let stmt = item["internalStmt"];


                // TODO36 handle stmt into the following:  
                // TODO36                                  var1, action, isVar2GivenValue, var2, currTargetNodeKey

                let var1 = ""; //TODO use stmt, game-data name
                let action = ""; //TODO use stmt
                let isVar2GivenValue = ""; //TODO use stmt
                let var2 = ""; //TODO use stmt, game-data name or pure value

                let currTargetNodeKey = ""; //TODO use stmt

                let var1_value = ""; //TODO use game-data if applies
                let var2_value = ""; //TODO


                switch (action){
                    case "==":
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

                    case ">":
                        if (var1_value > var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    case ">=": 
                        if (var1_value >= var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    case "<": 
                        if (var1_value < var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    case "<=": 
                        if (var1_value <= var2_value) {
                            targetNode = currTargetNodeKey;
                            stopBool = true;
                        }
                        break;

                    default:
                        continue; //not a standard "action", so ignore this
                }
            
            
                i++;


            }
   

            return targetNode;



    }


    function walkToNextNode() {

        //TODO after receiving switch-signal
        
        console.log("#chapterNodeMapping = ", chapterNodeMapping);
        console.log("\t#holdingNextNode = ", holdingNextNode);

        // get nextNode's type
        let upcomingNodeType = chapterNodeMapping[currChapterKey][holdingNextNode]["nodeType"];

        // set new holding-next
        locateHoldingNextNode(holdingNextNode, upcomingNodeType);


        setCurrNodeType(upcomingNodeType);
        setCurrNodeKey(holdingNextNode);
        //set upcoming-node's actual data
        if (upcomingNodeType !== "*chapterStart*" && upcomingNodeType !== "*chapterEnd*") {
            fetchOrFindNodeData(currChapterKey, holdingNextNode);
        }

        //TODO52 update currentGameStatusProgress

        triggerChangeToCurrNode(holdingNextNode, upcomingNodeType);

    }

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

                    triggerChangeToCurrChapter(nextChapterItem[0], nextChapterItem[1]);


                    //TODO52 update currentGameStatusProgress

                    console.log("next chapter!! \n", nextChapterItem);
                    break;
                } else { 
                    // TODO end of the entire game. ask if return ?
                    //later: if SL-system, go to nav-to-SL hint
                    //later: if non-SL-system, go to story-page(chapter list page)?


                }
            }

            i++;
        }


    }







return (<div 
    style={{
        "backgroundColor": "blue", 
        "borderRadius": "0px",
        "userSelect": "none",
        "cursor": "pointer"
    }}
>


    {currNodeType === "*chapterStart*" && <div 
        style={{
            "backgroundColor": "green", 
            "borderRadius": "0px", 
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`, 
        }}
        onClick={()=>{
            locateHoldingNextNode(currNodeKey, currNodeType);
            setJumpNodeSignal(true);
        }}
    >
    {/* *chapterStart*<br></br> */}
    {currChapterTitle} <br></br>
    {/* chapter = {currChapterKey}, node-key = {currNodeKey} */}
        
    </div>}


    {currNodeType === "*chapterEnd*" && 
    <div style={{"backgroundColor": "brown", "borderRadius": "0px", "width": `${screenWidth}px`, "height": `${screenHeight}px`}}
        onClick={()=>{

            //TODO switch to next chapter!
            walkToNextChapter();
        }}
    >
    *chapterEnd*<br></br>
    chapter = {currChapterKey}, node-key = {currNodeKey}        
        </div>}

    {currNodeType === "Conversation" && 
    <div 
        style={{"backgroundColor": "blue", "borderRadius": "0px", "width": `${screenWidth}px`, "height": `${screenHeight}px`}}
        onClick={()=>{
            //--- works perfectly ok with temp conv-area (without logic-splitter so far)---
            locateHoldingNextNode(currNodeKey, currNodeType);
            setJumpNodeSignal(true);
            //--- works perfectly ok with temp conv-area (without logic-splitter so far)---
        }}
    >
    conversation-node<br></br>
    chapter = {currChapterKey}, node-key = {currNodeKey}

    {/* //TODO51  */}
       {/* <GameScreen_InPracShell_ConvNode
            
            screenWidth={screenWidth}
            screenHeight={screenHeight}
                
            uiLanguage={uiLanguage}
            
            username={username}
            projectname={projectname}
            
            enteringEmuGameDataTracker={currGameDataTracker}

            visualMap={visualMap} //TODO empty so far
            audioMap={audioMap} //TODO empty so far
       
       /> */}


    {/* //TODO39 conv-node-compo */}


        
    </div>}

    


    {currNodeType === "LogicSplitter" && <div style={{"backgroundColor": "green", "borderRadius": "0px", "width": `${screenWidth}px`, "height": `${screenHeight}px`}}>
        Logic Splitter<br></br>
        chapter = {currChapterKey}, node-key = {currNodeKey}
        
    </div>}




</div>);


}
