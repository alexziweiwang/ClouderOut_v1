import { useState, useEffect } from 'react';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';


export default function NavigationPreview ({
    initialNavObj, 
    fetchNavObj, 
    fetchPageName, 
    chapterData, 
    updateCurrentPageName

}) {
    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(450);

    const [audioList, setAudioList] = useState([]); //TODO for bgm on each nav-page -- future feature
    const [visualList, setVisualList] = useState([]); 
    async function fetchProjResourceLists() {
      console.log("nav-preview: fetchProjResourceLists()"); //TODO test
      /* fetch from cloud db */
      const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
      console.log("new render- nav preview: obj from cloud (resource list):"); //TODO test
      console.log(obj); //TODO test
      setAudioList(obj.audio);
      setVisualList(obj.visual);
    }

    const [navObj, setNavObj] = useState(initialNavObj);
    const [page, setPage] = useState("Main Page");

    const mainPageEntryNames = ["mainPage-story", "mainPage-playerProfile", "mainPage-setting", "mainPage-shop"];
    const mainPagePictureVariableNames = [
        "mainPage-bgPicName",               //0
        "mainPage-listItemPicName",         //1
        "mainPage-story-picName",           //2
        "mainPage-playerProfile-picName",   //3
        "mainPage-setting-picName",         //4
        "mainPage-shop-picName"             //5
    ]; 

    const settingsPageEntryNames = ["settingPage-playSpeed", "settingPage-bgmVol", "settingPage-seVol"];

    const [storyPageChapterTitles, setStoryPageChapterTitles] = useState([]);

    const [slCurrentSlotPage, setSlCurrentSlotPage] = useState(1);


    const [slSlotFrame, setSlSlotFrame] = useState(0);
    const [slotPerPageLocal, setSlotPerPageLocal] = useState(initialNavObj["saveloadPage-slotPerPage"]);

    const [audioMap, setAudioMap] = useState({}); //TODO for bgm on each nav-page -- future feature
    const [visualMap, setVisualMap] = useState({}); 
    const [audioMapSize, setAudioMapSize] = useState(0);
    const [visualMapSize, setVisualMapSize] = useState(0);

    

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        console.log("initial nav-preview: ", initialNavObj); //TODO test
        console.log("Navigation Preview -- "); //TODO test
        
        if (firstTimeEnter === true) {
            fetchProjResourceLists();

            let i = 0;
            let j = 0;

            let currRow = [];
            for (; j < navObj["saveloadPage-slotPerPage"]; j++) {
                let num = j;
                currRow.push(num);
            }
            setSlSlotFrame(currRow);
            console.log("initial slot-per-page: ", currRow); //TODO Test

            let initialChapterTitle = [];
            let k = 0;
            for(; k < chapterData.length; k++) {
                initialChapterTitle.push(chapterData[k][1]);
            }
            setStoryPageChapterTitles(initialChapterTitle);

            setFirstTimeEnter(false);
        }

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

        let objTemp = fetchNavObj();
        setNavObj(objTemp);


        if (slotPerPageLocal != objTemp["saveloadPage-slotPerPage"]) {
            setSlotPerPageLocal(objTemp["saveloadPage-slotPerPage"]);
            let currRow = [];
            let j = 0;
            for (; j < objTemp["saveloadPage-slotPerPage"]; j++) {
                let num = j;
                currRow.push(num);
            }
            setSlSlotFrame(currRow);
            console.log("initial slot-per-page: ", currRow); //TODO Test

        }


        let tempPage= fetchPageName();
        setPage(tempPage);


        if (navObj["screenSize"] === "h450_800") {
            setScreenWidth(800);
            setScreenHeight(450);
        } else if (navObj["screenSize"] === "v800_450") {
            setScreenWidth(450);
            setScreenHeight(800);
        } else if (navObj["screenSize"] === "h600_800") {
            setScreenWidth(800);
            setScreenHeight(600);
        } else if (navObj["screenSize"] === "v800_600") {
            setScreenWidth(600);
            setScreenHeight(800);
        }

    });
    

    return (
    <div className="previewWindow" 
        style={{
            "fontFamily": `${navObj["fontFamilyForAll"]}`,
    }}>

        <br></br>
     
        {page === "Main Page" && 
        <> main page
        <div style={{
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor": `${navObj["mainPage-bgShadeName"]}`, 
                "backgroundImage": navObj["mainPage-isBackgroundShape"] === false ? `url('${visualMap[navObj[mainPagePictureVariableNames[0]]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                
                "marginLeft": `20px`,
                "position": "relative", 
            
                }}
            >

            {/* grouped items */}
            {navObj["mainPage-entriesCustom"] === false &&  <div style={{
                "position": "absolute",
                "display": navObj["mainPage-entriesHorizontal"] === true ? "flex" : "",
                "marginLeft": `${navObj["mainPage-listItemGroupX"]}px`,
                "marginTop": `${navObj["mainPage-listItemGroupY"]}px`,
                }}>

                {mainPageEntryNames.map((item, index) => {
                    //"mainPage-story", "mainPage-playerProfile", "mainPage-setting", "mainPage-shop"
                    let optionName = "";
                    let pageNaming = "";
                    if (index === 0) {
                        optionName = navObj["mainPage-story-name"];
                        pageNaming = "Story Page";
                    } else if (index === 1) {
                        optionName = navObj["mainPage-playerProfile-name"];             
                        pageNaming = "Player Profile Page";
                    } else if (index === 2) {
                        optionName = navObj["mainPage-setting-name"];
                        pageNaming = "Settings Page";
                    } else if (index === 3) {
                        optionName = navObj["mainPage-shop-name"];
                        pageNaming = "Shop Page";
                    }

                    if (navObj[item] === true) {
                        let keyStr1 = item + "_groupedItems";
                        return (
                            <div 
                                className="navigationButton"
                                id={keyStr1}
                                key={keyStr1}
                                style = {navObj["mainPage-isListItemShape"] === true ? 
                                {
                                    "backgroundColor": `${navObj["mainPage-listItemShadeName"]}`,
                                    "marginBottom": `${navObj["mainPage-listItemGap"]}px`,
                                    "marginRight": `${navObj["mainPage-listItemGap"]}px`,
                                    "width": `${navObj["mainPage-listItemGroupWidth"]}px`,
                                    "height": `${navObj["mainPage-listItemGroupHeight"]}px`,
                                    "color": `${navObj["mainPage-listItemGroupFontColor"]}`,
                                    "fontSize": `${navObj["mainPage-listItemGroupFontSize"]}px`,
    
                                    "justifyContent": "center",
                                    "alignItems": "center",
                                    "display": "flex",
                                } : {            
                                    "backgroundImage": `url('${visualMap[navObj[mainPagePictureVariableNames[1]]]}')`,
                                    "backgroundSize": `${navObj["mainPage-listItemGroupWidth"]}px ${navObj["mainPage-listItemGroupHeight"]}px`,
                                    
                                    "marginBottom": `${navObj["mainPage-listItemGap"]}px`,
                                    "marginRight": `${navObj["mainPage-listItemGap"]}px`,
                                    "width": `${navObj["mainPage-listItemGroupWidth"]}px`,
                                    "height": `${navObj["mainPage-listItemGroupHeight"]}px`,
                                    "color": `${navObj["mainPage-listItemGroupFontColor"]}`,
                                    "fontSize": `${navObj["mainPage-listItemGroupFontSize"]}px`,
    
                                    "justifyContent": "center",
                                    "alignItems": "center",
                                    "display": "flex",
                                
                                    "transition": "all 0.2s ease-out",
                                }
                            }
                            onMouseDown={
                                ()=>{
                                    document.getElementById(keyStr1).style.filter = "brightness(120%)";
                                    console.log("main-page clicked: ", item);

                                }
                            }
                            onMouseUp={
                                ()=>{
                                    document.getElementById(keyStr1).style.filter = "brightness(100%)";
                                    updateCurrentPageName(pageNaming);
                                }
                            }
                            >
                                 <label>{optionName}</label>
                            </div>
                        );
                    
                    }

                }
                )}        

            </div>}
        
        
        
        
            {/* customized items */}
            {navObj["mainPage-entriesCustom"] === true && <div
            style={{"position": "absolute",}}>

            {mainPageEntryNames.map((item, index) => {
         
                let keyStr2 = item + "_customizedItems";
                let pageNaming = "default";

                let optionName = "";
                if (index === 0) {
                    optionName = navObj["mainPage-story-name"];
                    pageNaming = "Story Page";
                } else if (index === 1) {
                    optionName = navObj["mainPage-playerProfile-name"];
                    pageNaming = "Player Profile Page";
                } else if (index === 2) {
                    optionName = navObj["mainPage-setting-name"];
                    pageNaming = "Settings Page";
                } else if (index === 3) {
                    optionName = navObj["mainPage-shop-name"];
                    pageNaming = "Shop Page";
                }


                if (navObj[item] === true) {
                    let currItemPosX = 0;
                    let currItemPosY = 0;
                    let currItemWidth = 0;
                    let currItemHeight = 0;
                    let currItemFontColor = "";
                    let currItemFontSize = 0;
                    let currItemBgShade = "";                   
                    let currIsShapeBool = false;

                    if (index === 0) {
                        currItemPosX = navObj["mainPage-story-posX"];
                        currItemPosY = navObj["mainPage-story-posY"];
                        currItemWidth = navObj["mainPage-story-width"];
                        currItemHeight = navObj["mainPage-story-height"];
                        currItemFontColor = navObj["mainPage-story-fontColor"];
                        currItemFontSize = navObj["mainPage-story-fontSize"];
                        currItemBgShade = navObj["mainPage-story-shadeName"];
                        currIsShapeBool = navObj["mainPage-story-isShape"];
                    } else if (index === 1) {
                        currItemPosX = navObj["mainPage-playerProfile-posX"];
                        currItemPosY = navObj["mainPage-playerProfile-posY"];
                        currItemWidth = navObj["mainPage-playerProfile-width"];
                        currItemHeight = navObj["mainPage-playerProfile-height"];
                        currItemFontColor = navObj["mainPage-playerProfile-fontColor"];
                        currItemFontSize = navObj["mainPage-playerProfile-fontSize"];
                        currItemBgShade = navObj["mainPage-playerProfile-shadeName"];
                        currIsShapeBool = navObj["mainPage-playerProfile-isShape"];
                    } else if (index === 2) {
                        currItemPosX = navObj["mainPage-setting-posX"];
                        currItemPosY = navObj["mainPage-setting-posY"];
                        currItemWidth = navObj["mainPage-setting-width"];
                        currItemHeight = navObj["mainPage-setting-height"];
                        currItemFontColor = navObj["mainPage-setting-fontColor"];
                        currItemFontSize = navObj["mainPage-setting-fontSize"];
                        currItemBgShade = navObj["mainPage-setting-shadeName"];
                        currIsShapeBool = navObj["mainPage-setting-isShape"];
                    } else if (index === 3) {
                        currItemPosX = navObj["mainPage-shop-posX"];
                        currItemPosY = navObj["mainPage-shop-posY"];
                        currItemWidth = navObj["mainPage-shop-width"];
                        currItemHeight = navObj["mainPage-shop-height"];
                        currItemFontColor = navObj["mainPage-shop-fontColor"];
                        currItemFontSize = navObj["mainPage-shop-fontSize"];
                        currItemBgShade = navObj["mainPage-shop-shadeName"];
                        currIsShapeBool = navObj["mainPage-shop-isShape"];
                    } else {
                        return;
                    }
        

                    return (
                  
                        <div
                            className="navigationButton"
                            id={keyStr2}
                            key={keyStr2}
                            style={
                                currIsShapeBool === true ?
                                {
                                "position": "absolute",
                                "backgroundColor": `${currItemBgShade}`,
                                "marginBottom": `${navObj["mainPage-listItemGap"]}px`,
                                
                                "marginLeft": `${currItemPosX}px`,
                                "marginTop": `${currItemPosY}px`,
                                "width": `${currItemWidth}px`,
                                "height": `${currItemHeight}px`,
                                "color": `${currItemFontColor}`,
                                "fontSize": `${currItemFontSize}px`,

                                "justifyContent": "center",
                                "alignItems": "center",
                                "display": "flex",
                            } :
                            {
                                "backgroundImage": `url('${visualMap[navObj[mainPagePictureVariableNames[index+2]]]}')`,
                                "backgroundSize": `${currItemWidth}px ${currItemHeight}px`,
                                
                                "position": "absolute",
                                "marginBottom": `${navObj["mainPage-listItemGap"]}px`,

                                "marginLeft": `${currItemPosX}px`,
                                "marginTop": `${currItemPosY}px`,
                                "width": `${currItemWidth}px`,
                                "height": `${currItemHeight}px`,
                                "color": `${currItemFontColor}`,
                                "fontSize": `${currItemFontSize}px`,

                                "transition": "all 0.2s ease-out",

                                "justifyContent": "center",
                                "alignItems": "center",
                                "display": "flex",
                            }
                            }
                            onMouseDown={
                                ()=>{
                                    document.getElementById(keyStr2).style.filter = "brightness(120%)";
                                    console.log("main-page clicked: ", item);
              
                                }
                            }
                            onMouseUp={
                                ()=>{
                                    document.getElementById(keyStr2).style.filter = "brightness(100%)";
                                    updateCurrentPageName(pageNaming);
                                }
                            }
                        >
                            <label>{optionName}</label>
                        </div>

                    );
                }                  
            }
            )}             
            </div>}      
        </div>
        
        </>}
  


        {(navObj["isWithSL"] && 
        page === "Game Progress Strategy") && <>
            game progress / saveload page
        <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`, "position": "relative"}}
        >
                            
                <div style={{
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor":  navObj["saveloadPage-isBackgroundShape"] === true ? `${navObj["saveloadPage-bgShadeName"]}` : "rgb(222, 222, 235)", 
                "backgroundImage": navObj["saveloadPage-isBackgroundShape"] === false 
                    ? `url('${visualMap[navObj["saveloadPage-bgPicName"]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                

                "position": "relative", 
                "userSelect": "none",
            
                }}
            >


             {/* //TODO1 */}
             <div 
                className="navigationButton"
                id="slPage-backButton"
                style={{
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "backgroundColor": navObj["backButton-isShape"] === true ? `${navObj["backButton-shapeColor"]}` : "pink",
                    "backgroundImage": navObj["backButton-isShape"] === false ?
                        `url('${visualMap[navObj["backButton-picName"]]}')` : "",

                    "width": `${navObj["backButton-width"]}px`,
                    "height": `${navObj["backButton-height"]}px`,
                    "fontSize": `${navObj["backButton-fontSize"]}px`,

                    "transition": "all 0.2s ease-out",

                    "justifyContent": "center",
                    "alignItems": "center",
                    "display": "flex",
                }}
                onMouseDown={
                    ()=>{
                        document.getElementById("slPage-backButton").style.filter = "brightness(120%)";
                        console.log("slPage-backButton");

                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById("slPage-backButton").style.filter = "brightness(100%)";

                        updateCurrentPageName("Main Page");
                    }
                }
                >
                    <label>{navObj["backButton-displayText"]}</label>
                    ...{visualMap[navObj["backButton-picName"]]}...
                </div>


                
                <div style={{
                    "left": `${navObj["saveloadPage-groupPosX"]}px`,
                    "top": `${navObj["saveloadPage-groupPosY"]}px`,
                    "position": "absolute",
                    "display": navObj["saveloadPage-slotListIsHorizontal"] === true ? "flex" : "",
                    "overflow": "scroll",
                }}>
                    {slSlotFrame.map((item, index) => {
                        let keyStr = "slSlot" + slCurrentSlotPage + "-" + index;
                        return (<div 
                            className="navigationButton"
                            id={keyStr}
                            key={keyStr}
                            style={{
                            "backgroundColor":  navObj["saveloadPage-isSlotShape"] === true ? `${navObj["saveloadPage-slotShadeName"]}` : "rgb(200, 122, 135)", 
                            "backgroundImage": navObj["saveloadPage-isSlotShape"] === false ?
                                `url('${visualMap[navObj["saveloadPage-slotPicName"]]}')` : "",
                            "width": `${navObj["saveloadPage-slotWidth"]}px`,
                            "height": `${navObj["saveloadPage-slotHeight"]}px`,
                            "marginLeft": navObj["saveloadPage-slotListIsHorizontal"] === true ? `${navObj["saveloadPage-slotGap"]}px` : "0px",
                            "marginBottom": navObj["saveloadPage-slotListIsHorizontal"] === false ? `${navObj["saveloadPage-slotGap"]}px` : "0px",
                        
                            "transition": "all 0.2s ease-out",
                        }}
              
                            onMouseDown={
                                ()=>{
                                    document.getElementById(keyStr).style.filter = "brightness(120%)";
                                    console.log("slot - ", (index+1), " at page", slCurrentSlotPage);
                                    //TODO data update operation

                                }
                            }
                            onMouseUp={
                                ()=>{
                                    document.getElementById(keyStr).style.filter = "brightness(100%)";
                                }
                            }
                        >
                            ?

                        </div>);
                    })}
                </div>
         


            <div style={{"display": "flex", "top": "357px", "left": "495px", "position": "absolute"}}>
                <div id="slSlotPageLeftControler" style={{"width": "150px", "height":"150px", "fontSize": "70px", "color": "#272626"}}
                    onClick={()=>{
                        console.log("prev sl page");//TODO2
                        if (slCurrentSlotPage - 1 > 0) {
                            setSlCurrentSlotPage(slCurrentSlotPage-1);
                        } else {
                            setSlCurrentSlotPage(1);
                        }
                    }}
                    onMouseDown={
                        ()=>{
                            document.getElementById("slSlotPageLeftControler").style.filter = "brightness(130%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("slSlotPageLeftControler").style.filter = "brightness(100%)";
                        }
                    }
                >
                    <label>◂</label>
                </div>

                <div>
                        <label>{slCurrentSlotPage}/{navObj["saveloadPage-slotPageCount"]}</label>
                </div>

                <div id="slSlotPageRightControler"
                    style={{"width": "150px", "height":"150px", "fontSize": "70px", "color": "#272626"}}
                    onClick={()=>{
                        console.log("next sl page");//TODO2
                        let pageLimit = navObj["saveloadPage-slotPageCount"];
                        if (slCurrentSlotPage + 1 > pageLimit) {
                            setSlCurrentSlotPage(pageLimit);
                        } else {
                            setSlCurrentSlotPage(slCurrentSlotPage+1);
                        }
                    }}
                    onMouseDown={
                        ()=>{
                            document.getElementById("slSlotPageRightControler").style.filter = "brightness(130%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("slSlotPageRightControler").style.filter = "brightness(100%)";
                        }
                    }
                >
                    <label>▸</label>
                </div>
            </div>


            </div>
           
            </div>
        <br></br>
        
        </>
        
        }

        {page === "Story Page" && <>
        story page
        <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >


            {/* elements on story page */}
            <div style={{
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor":  navObj["storyPage-isBackgroundShape"] === true ? `${navObj["storyPage-bgShadeName"]}` : "rgb(222, 222, 235)", 
                "backgroundImage": navObj["storyPage-isBackgroundShape"] === false 
                    ? `url('${visualMap[navObj["storyPage-bgPicName"]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                
                "position": "relative", 
                "overflow": "scroll",

                }}
            >

             {/* //TODO1 */}
             <div 
                className="navigationButton"
                id="storyPage-backButton"
                style={{
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "backgroundColor": navObj["backButton-isShape"] === true ? `${navObj["backButton-shapeColor"]}` : "pink",
                    "backgroundImage": navObj["backButton-isShape"] === false ?
                        `url('${visualMap[navObj["backButton-picName"]]}')` : "",

                    "width": `${navObj["backButton-width"]}px`,
                    "height": `${navObj["backButton-height"]}px`,
                    "fontSize": `${navObj["backButton-fontSize"]}px`,

                    "transition": "all 0.2s ease-out",

                    "justifyContent": "center",
                    "alignItems": "center",
                    "display": "flex",
                }}
                onMouseDown={
                    ()=>{
                        document.getElementById("storyPage-backButton").style.filter = "brightness(120%)";
                        console.log("storyPage-backButton");
                       
                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById("storyPage-backButton").style.filter = "brightness(100%)";
                        updateCurrentPageName("Main Page");
                    }
                }
                >
                    <label>{navObj["backButton-displayText"]}</label>
                </div>


                <div style={{
                    "left": `${navObj["storyPage-listItemGroupX"]}px`,
                    "top": `${navObj["storyPage-listItemGroupY"]}px`,

                    "position": "absolute", 

                    "display": navObj["storyPage-chapterListHorizontal"] === true ? "flex" : "",
                    "overflow": "scroll",
                }}>

                        {storyPageChapterTitles.map((item, index) => {
                            let keyStr = "storyPageSameplTitle" + index;
                            return (<div key={keyStr} id={keyStr}
                                className="navigationButton"
                                style={{
                                    "backgroundColor": navObj["storyPage-isListItemShape"] ? navObj["storyPage-listItemShadeName"] : "",
                                    "backgroundImage": navObj["storyPage-isListItemShape"] === false 
                                    ? `url('${visualMap[navObj["storyPage-listItemPicName"]]}')` : "",
                                    
                                    "width": `${navObj["storyPage-listItemGroupWidth"]}px`,
                                    "height": `${navObj["storyPage-listItemGroupHeight"]}px`,

                                    "marginRight": `${navObj["storyPage-listItemGap"]}px`,
                                    "marginBottom": `${navObj["storyPage-listItemGap"]}px`,

                                    "color": `${navObj["storyPage-listItemGroupFontColor"]}`,
                                    "fontSize": `${navObj["storyPage-listItemGroupFontSize"]}px`,

                                    "transition": "all 0.2s ease-out",

                                    "justifyContent": "center",
                                    "alignItems": "center",
                                    "display": "flex",
                                }}
                                onMouseDown={
                                    ()=>{
                                        document.getElementById(keyStr).style.filter = "brightness(120%)";
                                        console.log("story-page-title clicked: ", item);
                                        updateCurrentPageName("During Game");
                                    }
                                }
                                onMouseUp={
                                    ()=>{
                                        document.getElementById(keyStr).style.filter = "brightness(100%)";
                                    }
                                }
                            >
                                
                                <label>{item}</label>
                            </div>);
                        })}


                </div>



            </div>
            
        </div>
        
        </>}

        {page === "Settings Page" && 
        <>
            setting page
        <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
              <div style={{
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor":  navObj["settingPage-isBackgroundShape"] === true ? `${navObj["settingPage-bgShadeName"]}` : "rgb(222, 222, 235)", 
                "backgroundImage": navObj["settingPage-isBackgroundShape"] === false 
                    ? `url('${visualMap[navObj["settingPage-bgPicName"]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                

                "position": "relative", 
                "overflow": "scroll",
            
                }}

            >

             {/* //TODO1 */}
             <div 
                className="navigationButton"
                id="settingsPage-backButton"
                style={{
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "backgroundColor": navObj["backButton-isShape"] === true ? `${navObj["backButton-shapeColor"]}` : "pink",
                    "backgroundImage": navObj["backButton-isShape"] === false ?
                        `url('${visualMap[navObj["backButton-picName"]]}')` : "",

                    "width": `${navObj["backButton-width"]}px`,
                    "height": `${navObj["backButton-height"]}px`,
                    "fontSize": `${navObj["backButton-fontSize"]}px`,

                    "transition": "all 0.2s ease-out",

                    "justifyContent": "center",
                    "alignItems": "center",
                    "display": "flex",
                }}
                onMouseDown={
                    ()=>{
                        document.getElementById("settingsPage-backButton").style.filter = "brightness(120%)";
                        console.log("settingsPage-backButton");
 
                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById("settingsPage-backButton").style.filter = "brightness(100%)";
                        updateCurrentPageName("Main Page");
                    }
                }
                >
                    <label>{navObj["backButton-displayText"]}</label>
                </div>            
            
            <div style={{
                "left": `${navObj["settingPage-listItemGroupX"]}px`,
                "top": `${navObj["settingPage-listItemGroupY"]}px`,
                "position": "absolute",

                "display": navObj["settingPage-entriesHorizontal"] === true ? "flex" : "",
                "overflow": "scroll",
            }}>

                        {settingsPageEntryNames.map((item, index) => {
                            let optionName = "settingsDefault";
                            if (index === 0) {
                                optionName = navObj["settingPage-playSpeed"];
                            } else if (index === 1) {
                                optionName = navObj["settingPage-bgmVol"];
                            } else if (index === 2) {
                                optionName = navObj["settingPage-seVol"];
                            } else {
                                optionName = "settingDefault" + index;
                            }
        
                            if (navObj[item] === true) {
                                
                                    let title = "";
                                    if (item === "settingPage-playSpeed") {
                                        title = navObj["settingPage-playSpeedName"];
                                    } else if (item === "settingPage-bgmVol") {
                                        title = navObj["settingPage-bgmVolName"];
                                    } else if (item === "settingPage-seVol") {
                                        title = navObj["settingPage-seVolName"];
                                    }

                                    //TODO: slider bar, slider handle

                                   let keyStr3 = "settingItem" + index;

                                    return (
                                    <div
                                        className="navigationButton"
                                        key={optionName}
                                        id={keyStr3}
                                        style={{
                                            "backgroundColor":  navObj["settingPage-isListItemShape"] === true ? `${navObj["settingPage-listItemShadeName"]}` : "rgb(200, 122, 135)", 
                                            "backgroundImage": navObj["settingPage-isListItemShape"] === false 
                                                ? `url('${visualMap[navObj["settingPage-listItemPicName"]]}')` : "",


                                            "width": `${navObj["settingPage-listItemGroupWidth"]}px`,
                                            "height": `${navObj["settingPage-listItemGroupHeight"]}px`,

                                            "color": `${navObj["settingPage-listItemFontColor"]}`,
                                            "fontSize": `${navObj["settingPage-listItemFontSize"]}px`,

                                            "marginRight": navObj["settingPage-entriesHorizontal"] === true ? `${navObj["settingPage-listItemGap"]}px` : "0px",
                                            "marginBottom": navObj["settingPage-entriesHorizontal"] === false ? `${navObj["settingPage-listItemGap"]}px` : "0px",

                                            "transition": "all 0.2s ease-out",

                                            "padding": "7px",
                                            "userSelect": "none"
                                        }}
                                        onMouseDown={
                                            ()=>{
                                                document.getElementById(keyStr3).style.filter = "brightness(120%)";
                                                console.log("setting-page clicked: ", item);
                                         
                                            }
                                        }
                                        onMouseUp={
                                            ()=>{
                                                document.getElementById(keyStr3).style.filter = "brightness(100%)";
                                            }
                                        }
                                    >

                                        <label>{title}</label>
                                        </div>);

                            }
    
                    })}


                </div>

            </div>

        </div>
        </>}

        {page === "Player Profile Page" && 
        <>
            player profile
        <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            <div style={{"position": "relative",                 
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,}}>

                {/* //TODO1 */}
                <div 
                    className="navigationButton"
                    id="playerProfilePage-backButton"
                    style={{
                        "position": "absolute",
                        "top": "0px",
                        "left": "0px",
                        "backgroundColor": navObj["backButton-isShape"] === true ? `${navObj["backButton-shapeColor"]}` : "pink",
                        "backgroundImage": navObj["backButton-isShape"] === false ?
                            `url('${visualMap[navObj["backButton-picName"]]}')` : "",

                        "width": `${navObj["backButton-width"]}px`,
                        "height": `${navObj["backButton-height"]}px`,
                        "fontSize": `${navObj["backButton-fontSize"]}px`,

                        "transition": "all 0.2s ease-out",

                        "justifyContent": "center",
                        "alignItems": "center",
                        "display": "flex",
                    }}
                onMouseDown={
                    ()=>{
                        document.getElementById("playerProfilePage-backButton").style.filter = "brightness(120%)";
                        console.log("playerProfilePage-backButton");
  
                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById("playerProfilePage-backButton").style.filter = "brightness(100%)";
                        updateCurrentPageName("Main Page");
                    }
                }
                >
                    <label>{navObj["backButton-displayText"]}</label>
                </div>   

            <br></br>        
            {navObj["storyPage-chapterListHorizontal"].toString()}<br></br>

            </div>            
        </div>
        </>}

        {page === "Game Status Data Page" && 
        <>
            game status data page
        <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            <div style={{
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor":  navObj["gsdPage-isBgShape"] === true ? `${navObj["gsdPage-bgShadeName"]}` : "rgb(222, 222, 235)", 
                "backgroundImage": navObj["gsdPage-isBgShape"] === false 
                    ? `url('${visualMap[navObj["gsdPage-bgPicName"]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                

                "position": "relative", 
                "overflow": "scroll",
            
                }}                
            >
                  {/* //TODO1 */}
                  <div 
                className="navigationButton" 
                id="gsdPage-backButton"
                style={{
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "backgroundColor": navObj["backButton-isShape"] === true ? `${navObj["backButton-shapeColor"]}` : "pink",
                    "backgroundImage": navObj["backButton-isShape"] === false ?
                        `url('${visualMap[navObj["backButton-picName"]]}')` : "",

                    "width": `${navObj["backButton-width"]}px`,
                    "height": `${navObj["backButton-height"]}px`,
                    "fontSize": `${navObj["backButton-fontSize"]}px`,

                    "transition": "all 0.2s ease-out",

                    "justifyContent": "center",
                    "alignItems": "center",
                    "display": "flex",
                }}
                onMouseDown={
                    ()=>{
                        document.getElementById("gsdPage-backButton").style.filter = "brightness(120%)";
                        console.log("gsdPage-backButton");
  
                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById("gsdPage-backButton").style.filter = "brightness(100%)";
                        updateCurrentPageName("Main Page");
                    }
                }
                >
                    <label>{navObj["backButton-displayText"]}</label>
                </div>   



            </div>

            
        </div>
        </>
        }
  
        {page === "Shop Page" && 
        <>
            shop page
        <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
        <div style={{"position": "relative",                 
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,}}>

                {/* //TODO1 */}
                <div 
                className="navigationButton"
                id="playerProfilePage-backButton"
                style={{
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "backgroundColor": navObj["backButton-isShape"] === true ? `${navObj["backButton-shapeColor"]}` : "pink",
                    "backgroundImage": navObj["backButton-isShape"] === false ?
                        `url('${visualMap[navObj["backButton-picName"]]}')` : "",

                    "width": `${navObj["backButton-width"]}px`,
                    "height": `${navObj["backButton-height"]}px`,
                    "fontSize": `${navObj["backButton-fontSize"]}px`,

                    "transition": "all 0.2s ease-out",

                    "justifyContent": "center",
                    "alignItems": "center",
                    "display": "flex",
                }}
                onMouseDown={
                    ()=>{
                        document.getElementById("playerProfilePage-backButton").style.filter = "brightness(120%)";
                        console.log("playerProfilePage-backButton");
 
                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById("playerProfilePage-backButton").style.filter = "brightness(100%)";
                        updateCurrentPageName("Main Page");
                    }
                }
                >
                    <label>{navObj["backButton-displayText"]}</label>
                </div>  


            <br></br>        
            {navObj["storyPage-chapterListHorizontal"].toString()}<br></br>






            </div>
        </div>
        </>}



        {page === "During Game" && <>
                During gameplay
                <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
        <div style={{"position": "relative",                 
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,}}>

                {/* //TODO1 */}
                <div 
                className="navigationButton"
                id="duringGame-backButton"
                style={{
                    "position": "absolute",
                    "top": "0px",
                    "left": "0px",
                    "backgroundColor": navObj["backButton-isShape"] === true ? `${navObj["backButton-shapeColor"]}` : "pink",
                    "backgroundImage": navObj["backButton-isShape"] === false ?
                        `url('${visualMap[navObj["backButton-picName"]]}')` : "",

                    "width": `${navObj["backButton-width"]}px`,
                    "height": `${navObj["backButton-height"]}px`,
                    "fontSize": `${navObj["backButton-fontSize"]}px`,

                    "transition": "all 0.2s ease-out",

                    "justifyContent": "center",
                    "alignItems": "center",
                    "display": "flex",
                }}
                onMouseDown={
                    ()=>{
                        document.getElementById("duringGame-backButton").style.filter = "brightness(120%)";
                        console.log("duringGame-backButton");
 
                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById("duringGame-backButton").style.filter = "brightness(100%)";
                        updateCurrentPageName("Story Page");
                    }
                }
                >
                    <label>{navObj["backButton-displayText"]}</label>
                </div>  


            <br></br>        






            </div>
        </div>
        </>}

        <br></br>              

    </div>);
}
