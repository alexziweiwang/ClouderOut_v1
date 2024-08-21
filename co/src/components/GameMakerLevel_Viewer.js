import { useState, useEffect } from 'react';
import NavigationPreview from './NavigationPreview';


export default function GameMakerLevel_Viewer({isDisplay, makeNotDisplay, navigationObj,
    initialChapterList, getChapterList
}) {
    const [screenWidth, setScreenWidth] = useState(800); //TODO
    const [screenHeight, setScreenHeight] = useState(450); //TODO

//TODO (with "changing" during in-game actions)
//game-data tracker
//progress-tracker: current-chapter & current-node
//path deciding parts

//TODO settled data
//resource maps (visual & audio) [settled once started]
//node-inside-content: 
            // conv-node: <GameScreen_QuickView_ConvNode/>
            // card-game, or board-game, etc.
               
//TODO styles for game-play
//screen settings, etc.
    let modalStyleName = "";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }

    const [navStatus, setNavStatus] = useState("Main Page");

    const [gameDataTracker, setGameDataTracker] = useState(); //TODO add default from user's setting; pass-in to callee components (game nodes)

    const [currChapterKey, setCurrChapterKey] = useState("");

    const [currNodeType, setCurrNodeType] = useState(""); //TODO according to node-type, display the correct node's viewer?

    const [chapterList, setChapterList] = useState(initialChapterList); 


     useEffect(() => {

            if (navigationObj["screenSize"] === "h450_800") {
                setScreenWidth(800);
                setScreenHeight(450);
            } else if (navigationObj["screenSize"] === "v800_450") {
                setScreenWidth(450);
                setScreenHeight(800);
            } else if (navigationObj["screenSize"] === "h600_800") {
                setScreenWidth(800);
                setScreenHeight(600);
            } else if (navigationObj["screenSize"] === "v800_600") {
                setScreenWidth(600);
                setScreenHeight(800);
            }

            let chapterListTemp = getChapterList();
            setChapterList(chapterListTemp);
        });





    function updateGameData(data) { // model's functionality
        setGameDataTracker(data);
    }

    function passInGameData() {
        return gameDataTracker;
    }

    function passInNavObj() {
        return navigationObj;
    }

    function notUsing() {
        return "";
    }

    function passInNavPageName() {
        return navStatus;
    }

    function updateNavPageName(pageName) {
        setNavStatus(pageName);
    }


return(<>

<div className={modalStyleName} style={{"overflow": "scroll"}}>
    <div>

        <button className="testEntire" onClick={()=>{makeNotDisplay();}}>Stop Testing</button>

      
        <div style={{"position": "relative", "marginLeft": (screenWidth > screenHeight) ? "300px" : "450px"}}>
      


{/* game-screen layer */}
                {navStatus === "During Game" && 
                    <div style={{
                        "position": "absolute", 
                        "backgroundColor": "orange", 
                        "top": "0px", 
                        "left": "0px",
                        "width": `${screenWidth}px`, 
                        "height": `${screenHeight}px`,
                
                    }}>
                        !!! placeholder: game node (content+UI)
                        <br></br>2
                        <br></br>3
                        <br></br>TODO: according to currNodeType, display the component
                    </div>
                }





{/* navigation layer */}
                <div style={{
                    "position": "absolute", 
                    "top": "0px", 
                    "left": "0px",
                    "width": `${screenWidth}px`, 
                    "height": `${screenHeight}px`,
                }}>
                    <NavigationPreview 
                        initialNavObj={navigationObj} 
                        fetchNavObj={passInNavObj} 
                        chapterData={chapterList} 
                        fetchPageName={passInNavPageName} 
                        updateCurrentPageName={updateNavPageName}
                    />
                </div>
        </div>

    </div>





</div>

    
</>);

}