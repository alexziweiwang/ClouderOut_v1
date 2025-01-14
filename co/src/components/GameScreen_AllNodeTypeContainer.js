import { useState, useEffect } from 'react';

import langDictionary from './textDictionary';





export default function GameScreen_AllNodeTypeContainer({
    getNodeType, 
    getChapterKey, 
    getNodeKey,
    getChapterTitle,
    getCurrentGameDataTracker,
    getCurrChapterAllNodeMapping,
    getAllChapterList,

    username,
    projectname,
    uiLanguage

}) {


    const [screenWidth, setScreenWidth] = useState(800); //TODO /* according to current node's size */
    const [screenHeight, setScreenHeight] = useState(450); //TODO /* according to current node's size */


    const [currNodeType, setCurrNodeType] = useState("");
    const [currNodeKey, setCurrNodeKey] = useState("");
    const [currChapterKey, setCurrChapterKey] = useState("");
    const [currChapterTitle, setCurrChapterTitle] = useState("");

    const [holdingNextNode, setHoldingNextNode] = useState("");

    const [gameDataTracker, setGameDataTracker] = useState({});

    const [chapterNodeMapping, setChapterNodeMapping] = useState({});

    const [allChapterList, setAllChapterList] = useState([]);

    const [jumpNodeSignal, setJumpNodeSignal] = useState(false);

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
 
        if (firstTimeEnter === true) {
            //TODO
                                            console.log("!!!!!!!!!!!!! game-screen-all-node-container FIRST ENTER");
            
                let nodeTypeTemp = getNodeType();
                setCurrNodeType(nodeTypeTemp);

                let chapterKeyTemp = getChapterKey();
                setCurrChapterKey(chapterKeyTemp);

                let nodeKeyTemp = getNodeKey();
                if (nodeKeyTemp !== currNodeKey) {
                    setCurrNodeKey(nodeKeyTemp);
                    setupScreenSizeByNodeKey(nodeKeyTemp);            
                }

                let chapterTitleTemp = getChapterTitle();
                setCurrChapterTitle(chapterTitleTemp);

                let nodeMappingTemp = getCurrChapterAllNodeMapping();
                setChapterNodeMapping(nodeMappingTemp);

                let chapterListTemp = getAllChapterList();
                initializeChapterArray(chapterListTemp);

                setFirstTimeEnter(false);

        } else {
            if (jumpNodeSignal == true) {
                switchToNextNode();

                setJumpNodeSignal(false);
            }
        }

        //TODO

   
       

        //TODO screen-width and screen-height

        

    }); //-- useEffect --

    function initializeChapterArray(list) {
        let arr = [];
            //    console.log("initializeChapterArray-func, input list = ", list);

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
            let nextNodeKey = "";

            //TODO go through splitting-array for next-node-locating

            //setHoldingNextNode(nextNodeKey);
        }
    }


    function switchToNextNode() {

        //TODO after receiving switch-signal
        
        console.log("#chapterNodeMapping = ", chapterNodeMapping);
        console.log("\t#holdingNextNode = ", holdingNextNode);

        // get nextNode's type
        let upcomingNodeType = chapterNodeMapping[currChapterKey][holdingNextNode]["nodeType"];

        // set new holding-next
        locateHoldingNextNode(holdingNextNode, upcomingNodeType);


        setCurrNodeType(upcomingNodeType);
        setCurrNodeKey(holdingNextNode)
    }

    function switchToNextChapter() {
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

                    console.log("next chapter!! \n", nextChapterItem);
                    break;
                } else { 
                    // TODO end of the entire game. ask if return ?

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
            switchToNextChapter();
        }}
    >
    *chapterEnd*<br></br>
    chapter = {currChapterKey}, node-key = {currNodeKey}        
        </div>}

    {currNodeType === "Conversation" && 
    <div 
        style={{"backgroundColor": "blue", "borderRadius": "0px", "width": `${screenWidth}px`, "height": `${screenHeight}px`}}
        onClick={()=>{
            //--- works perfectly ok (without logic-splitter so far)---
            locateHoldingNextNode(currNodeKey, currNodeType);
            setJumpNodeSignal(true);
            //--- works perfectly ok (without logic-splitter so far)---
        }}
    >
    conversation-node<br></br>
    chapter = {currChapterKey}, node-key = {currNodeKey}


        
    </div>}

    
    {currNodeType === "LogicSplitter" && <div style={{"backgroundColor": "green", "borderRadius": "0px", "width": `${screenWidth}px`, "height": `${screenHeight}px`}}>
        Logic Splitter<br></br>
        chapter = {currChapterKey}, node-key = {currNodeKey}
        
    </div>}




</div>);


}

/* for conversation-node
<GameScreen_InPrac_ConvNode

    initialPieceNum = 0
    isDisplay = true

    allPieceContent = {pieceDataStructure} // fetched from cloud
    uiData1_textframe={gameUITextFrame}  // fetched from cloud
    uiData2_buttonOption={gameUIDefaultButton}  // fetched from cloud
    uiData3_ConvNavigation={uiConvNav}  // fetched from cloud
    uiData4_logPageSettings={logPageUISettings} // fetched from cloud
    
    screenWidth={screenWidth} // fetched from cloud in setupScreenSizeByNodeKey-func
    screenHeight={screenHeight} // fetched from cloud in setupScreenSizeByNodeKey-func
        
    uiLanguage={uiLanguage}
    
    username={usename}
    projectname={projectname} 
    
    enteringEmuGameDataTracker={gameDataTracker}

    visualList={} //should be from outer layers
    audioList={} //should be from outer layers
/>




*/