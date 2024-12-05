import { useState, useEffect } from 'react';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';


export default function NavigationPreview ({
    initialNavObj, 
    fetchNavObj, 

    fetchPageName, 
    updateCurrentPageName,
    updateCurrentStanding,


    chapterData, 
    isEditing,

    initialGameDataRefData,
    initialPlayerProfileRefData,
    initialPlayerAccountRefData,

    fetchPlayerInfoSets,
    fetchCurrentGameData,

    getUILanguage,
    initialUILanguage,

}) {
//TODO game-data, player-profile, player-account-info fetching for testing ...

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState(initialUILanguage); //TODO16

    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(450);
    
    const [renderCounter, setRenderCounter] = useState(0);


    const [audioList, setAudioList] = useState([]); //TODO for bgm on each nav-page -- future feature
    const [visualList, setVisualList] = useState([]); 
    async function fetchProjResourceLists() {
   //   console.log("nav-preview: fetchProjResourceLists()"); //TODO test

      if (username === "default-no-state username" || projName === "default-no-state projectName") {
        return;
      }
      /* fetch from cloud db */
      const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
                                                // console.log("new render- nav preview: obj from cloud (resource list):"); //TODO test
                                                // console.log(obj); //TODO test
      setAudioList(obj.audio);
      setVisualList(obj.visual);
    }

    const [navObj, setNavObj] = useState(initialNavObj);
    const [page, setPage] = useState("Main Page");

    const [refDataPlayerProfile, setRefDataPlayerProfile] = useState(initialPlayerProfileRefData);
    const [refDataPlayerAccount, setRefDataPlayerAccount] = useState(initialPlayerAccountRefData);
    const [refGameDataList, setRefGameDataList] = useState(initialGameDataRefData);

    const [qWindowOpen, setQWindowOpen] = useState(false);


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

    const sizeLookupMap = { "16:9(horizonal)": [800, 450],
        "16:9(vertical)": [450, 800],
        "4:3(horizonal)": [800, 600],
        "4:3(vertical)": [600, 800]};

    const [tryPPText, setTryPPText] = useState(-1);
    const [tryPPValue, setTryPPValue] = useState(-1);
    const [tryPPPic, setTryPPPic] = useState(-1);

    const [userClickCancelQwindow, setUserClickCancelQwindow] = useState(false);

    
    function updateRenderCounter() {
        console.log("updateRenderCounter!");
        setRenderCounter((renderCounter+1) % 100);
    }


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {


        if (firstTimeEnter === true) {
                                        // console.log("initial nav-preview: ", initialNavObj); //TODO test
                                        // console.log("Navigation Preview -- "); //TODO test
                                                                 
            fetchProjResourceLists();

            let i = 0;
            let j = 0;

            let currRow = [];
            for (; j < navObj["saveloadPage-slotPerPage"]; j++) {
                let num = j;
                currRow.push(num);
            }
            setSlSlotFrame(currRow);

            let initialChapterTitle = [];
            let k = 0;
            for(; k < chapterData.length; k++) {
                initialChapterTitle.push(chapterData[k][1]);
            }
            setStoryPageChapterTitles(initialChapterTitle);

            setFirstTimeEnter(false);

        }

        let UILang = getUILanguage();
        setLanguageCodeTextOption(UILang);





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





        let playerInfoObj = fetchPlayerInfoSets();
        setRefDataPlayerAccount(playerInfoObj["userAccount"]);
        setRefDataPlayerProfile(playerInfoObj["playerProfile"])


        let gameDataTemp = fetchCurrentGameData();
        setRefGameDataList(gameDataTemp);

        if (isEditing === true) { 
            let objTemp = fetchNavObj();
            if (objTemp != navObj) {
                setNavObj(objTemp);
   
                setupPPTryingObjects(objTemp);//TODO too-many-rendering
           
            
                if (slotPerPageLocal != objTemp["saveloadPage-slotPerPage"]) {
                    setSlotPerPageLocal(objTemp["saveloadPage-slotPerPage"]);
                    let currRow = [];
                    let j = 0;
                    for (; j < objTemp["saveloadPage-slotPerPage"]; j++) {
                        let num = j;
                        currRow.push(num);
                    }
                    setSlSlotFrame(currRow);

                } 
            }
        } 


        let tempPage= fetchPageName();
        
        if (tempPage !== undefined && tempPage !== "" && tempPage !== "Quit Asking Window") {
            setPage(tempPage);
            setUserClickCancelQwindow(false);
        } else if (tempPage === "Quit Asking Window" && userClickCancelQwindow === false) {
            setQWindowOpen(true);
        }


        if (navObj["screenSize"] === "16:9(horizonal)"
            || navObj["screenSize"] === "16:9(vertical)"
            || navObj["screenSize"] === "4:3(horizonal)"
            || navObj["screenSize"] === "4:3(vertical)"
            ) {
                let w = sizeLookupMap[navObj["screenSize"]][0];
                let h = sizeLookupMap[navObj["screenSize"]][1];
                setScreenWidth(w);
                setScreenHeight(h);
        }





    }); //-- useEffect --

    function setupPPTryingObjects(navObj) {
        let textObjTemp = {
            "isPreviewing": navObj["playerProfilePage-previewingTextObj-isPreviewing"],
            "textContent": navObj["playerProfilePage-previewingTextObj-textContent"],
            "textItalic": navObj["playerProfilePage-previewingTextObj-textItalic"],
            "textFontSize": navObj["playerProfilePage-previewingTextObj-textFontSize"],
            "textFont": navObj["playerProfilePage-previewingTextObj-textFont"],
            "textColor": navObj["playerProfilePage-previewingTextObj-textColor"],
            "posX": navObj["playerProfilePage-previewingTextObj-posX"],
            "posY": navObj["playerProfilePage-previewingTextObj-posY"],
        };


        let valObjTemp = {
            "isPreviewing": navObj["playerProfilePage-previewingValueObj-isPreviewing"],
            "labelText": navObj["playerProfilePage-previewingValueObj-labelText"],
            "valueItemType": navObj["playerProfilePage-previewingValueObj-valueItemType"],
            "valueItemName": navObj["playerProfilePage-previewingValueObj-valueItemName"],
            "posX": navObj["playerProfilePage-previewingValueObj-posX"],
            "posY": navObj["playerProfilePage-previewingValueObj-posY"],
            "textFontSize": navObj["playerProfilePage-previewingValueObj-textFontSize"],
            "textFont": navObj["playerProfilePage-previewingValueObj-textFont"],
            "textColor": navObj["playerProfilePage-previewingValueObj-textColor"],
        };


        let picObjTemp = {
            "isPreviewing": navObj["playerProfilePage-previewingPicObj-isPreviewing"],
            "posX": navObj["playerProfilePage-previewingPicObj-posX"],
            "posY": navObj["playerProfilePage-previewingPicObj-posY"],
            "picName": navObj["playerProfilePage-previewingPicObj-picName"],
            "width": navObj["playerProfilePage-previewingPicObj-width"],
            "height": navObj["playerProfilePage-previewingPicObj-height"],

        };

        setTryPPText(textObjTemp);
        setTryPPValue(valObjTemp);
        setTryPPPic(picObjTemp);

    }
    

    return (
    <div
        style={{
            "fontFamily": `${navObj["fontFamilyForAll"]}`,
            "position": "absolute",
            "userSelect": "none",
            "borderRadius": "0px",
    }}>
        {page === "Main Page" && 

        <div style={{
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor": `${navObj["mainPage-bgShadeName"]}`, 
                "backgroundImage": navObj["mainPage-isBackgroundShape"] === false ? `url('${visualMap[navObj[mainPagePictureVariableNames[0]]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                
             
                "position": "relative", 
                "borderRadius": "0px",
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
                        let keyStr1 = item + "_groupedItems" + (isEditing === true ? "__e" : "__ne");
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
                                    "borderRadius": `${navObj["defaultCornerRadius"]}px`,
                                    
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
                                    "borderRadius": `${navObj["defaultCornerRadius"]}px`,

                                    "justifyContent": "center",
                                    "alignItems": "center",
                                    "display": "flex",
                                    
                                
                                    "transition": "all 0.2s ease-out",
                                }
                            }
                            onMouseDown={
                                ()=>{
                                    document.getElementById(keyStr1).style.filter = "brightness(120%)";
                                }
                            }
                            onMouseUp={
                                ()=>{
                                    document.getElementById(keyStr1).style.filter = "brightness(100%)";


                                    updateCurrentPageName(pageNaming);


                                    let currentStandingObjTemp = {};
                                    currentStandingObjTemp["pageStatus"] = pageNaming;
                                    currentStandingObjTemp["chapterKey"] = "";
                                    currentStandingObjTemp["nodeKey"] = "";
                                    currentStandingObjTemp["nodeType"] = ""; 
                                    updateCurrentStanding(currentStandingObjTemp);

                                }
                            }
                            >
                                 {optionName}
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
         
                let keyStr2 = item + "_customizedItems" + (isEditing === true ? "__e" : "__ne");
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
                                "borderRadius": `${navObj["defaultCornerRadius"]}px`,

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
                                "borderRadius": `${navObj["defaultCornerRadius"]}px`,

                                "transition": "all 0.2s ease-out",

                                "justifyContent": "center",
                                "alignItems": "center",
                                "display": "flex",
                            }
                            }
                            onMouseDown={
                                ()=>{
                                    document.getElementById(keyStr2).style.filter = "brightness(120%)";
                                }
                            }
                            onMouseUp={
                                ()=>{
                                    document.getElementById(keyStr2).style.filter = "brightness(100%)";

                                    updateCurrentPageName(pageNaming);

                                    let currentStandingObjTemp = {};
                                    currentStandingObjTemp["pageStatus"] = pageNaming;
                                    currentStandingObjTemp["chapterKey"] = "";
                                    currentStandingObjTemp["nodeKey"] = "";
                                    currentStandingObjTemp["nodeType"] = ""; 
                                    updateCurrentStanding(currentStandingObjTemp);
                                }
                            }
                        >
                            {optionName}
                        </div>

                    );
                }                  
            }
            )}             
            </div>}      
        </div>
        
        }
  


        {(navObj["isWithSL"] === true && 
        page === "Game Progress Strategy") && 
        <div style={{
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`,
            "backgroundColor": "rgb(222, 222, 235)", 
            "position": "relative",
            "borderRadius": "0px",
        }}
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

    
                <div style={{
                    "left": `${navObj["saveloadPage-groupPosX"]}px`,
                    "top": `${navObj["saveloadPage-groupPosY"]}px`,
                    "position": "absolute",
                    "display": navObj["saveloadPage-slotListIsHorizontal"] === true ? "flex" : "",
                    "overflow": "scroll",
                    "borderRadius": "0px",
                }}>
                    {slSlotFrame.map((item, index) => {
                        let keyStr = "slSlot" + slCurrentSlotPage + "-" + index + (isEditing === true ? "__e" : "__ne");
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
                            "borderRadius": `${navObj["defaultCornerRadius"]}px`,

                            "transition": "all 0.2s ease-out",
                        }}
              
                            onMouseDown={
                                ()=>{
                                    document.getElementById(keyStr).style.filter = "brightness(120%)";


                                }
                            }
                            onMouseUp={
                                ()=>{
                                    document.getElementById(keyStr).style.filter = "brightness(100%)";

                                   // console.log("slot - ", (index+1), " at page", slCurrentSlotPage);
                                    //TODO data update operation


                                }
                            }
                        >
                            ?

                        </div>);
                    })}
                </div>
         


            <div 
                style={{
                    "display": "flex", 
                    "top": "357px", 
                    "left": "495px", 
                    "position": "absolute", 

                    "backgroundColor": "orange"    
                    
                }}>
                
                <div 
                    id="slSlotPageLeftControler" 
                    style={{
                        //TODO width
                        "color": "#272626",
                    }}
                    onClick={()=>{
            
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
                        {slCurrentSlotPage >= 2 &&  <label
                            style={{"cursor": "pointer",
                            "textDecoration": "underline"}}
                        >
                            Previous
                        </label>}

                </div>

                <div>
                        {slCurrentSlotPage}/{navObj["saveloadPage-slotPageCount"]}
                </div>

                <div id="slSlotPageRightControler"
                  style={{
                        //TODO width 
                        "color": "#272626",
                        
                    }}
                    onClick={()=>{
                   
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

                {(slCurrentSlotPage !== navObj["saveloadPage-slotPageCount"]) &&
                    <label
                    style={{"cursor": "pointer",
                        "textDecoration": "underline"}}
                    >
                        Next
                    </label>}
                    
                </div>
            
                
            </div>


            </div>
           
            </div>
     
        
        }

        {page === "Story Page" && 
        <div style={{
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`,
            "backgroundColor": "rgb(222, 222, 235)",
            "borderRadius": "0px",
            "borderRadius": "0px",
        }}
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
                "borderRadius": "0px",
                "borderRadius": "0px",
                }}
            >

                <div style={{
                    "left": `${navObj["storyPage-listItemGroupX"]}px`,
                    "top": `${navObj["storyPage-listItemGroupY"]}px`,

                    "position": "absolute", 

                    "display": navObj["storyPage-chapterListHorizontal"] === true ? "flex" : "",
                    "overflow": "scroll",
                    "borderRadius": "0px",
                }}>
                    {navObj["isWithSL"] === true && <div
                    id="loadGameEntry"
                    className="navigationButton"
                    style={{
                        "backgroundColor": navObj["storyPage-isListItemShape"] ? navObj["storyPage-listItemShadeName"] : "#c0cfe2",
                        "backgroundImage": navObj["storyPage-isListItemShape"] === false 
                        ? `url('${visualMap[navObj["storyPage-listItemPicName"]]}')` : "",
                        
                        "width": `${navObj["storyPage-listItemGroupWidth"]}px`,
                        "height": `${navObj["storyPage-listItemGroupHeight"]}px`,

                        "marginRight": `${navObj["storyPage-listItemGap"]}px`,
                        "marginBottom": `${navObj["storyPage-listItemGap"]}px`,

                        "color": `${navObj["storyPage-listItemGroupFontColor"]}`,
                        "fontSize": `${navObj["storyPage-listItemGroupFontSize"]}px`,
                        "borderRadius": `${navObj["defaultCornerRadius"]}px`,

                        "transition": "all 0.2s ease-out",

                        "justifyContent": "center",
                        "alignItems": "center",
                        "display": "flex",
                        "borderRadius": "0px",
                    }}
                    onMouseDown={
                        ()=>{
                            document.getElementById("loadGameEntry").style.filter = "brightness(120%)";
                        }
                    }
                    onMouseUp={
                        ()=>{
                            document.getElementById("loadGameEntry").style.filter = "brightness(100%)";
                            updateCurrentPageName("Game Progress Strategy");

                            let currentStandingObjTemp = {};
                            currentStandingObjTemp["pageStatus"] = "Game Progress Strategy";
                            currentStandingObjTemp["chapterKey"] = "";
                            currentStandingObjTemp["nodeKey"] = "";
                            currentStandingObjTemp["nodeType"] = ""; 
                            updateCurrentStanding(currentStandingObjTemp);
                        }
                    }
                >
                    load game from s/l
                </div>}


                        {storyPageChapterTitles.map((item, index) => {
                            let keyStr = "storyPageSameplTitle" + index + (isEditing === true ? "__e" : "__ne");


                            return (<div key={keyStr} id={keyStr}
                                className="navigationButton"
                                style={{
                                    "backgroundColor": navObj["storyPage-isListItemShape"] ? navObj["storyPage-listItemShadeName"] : "#c0cfe2",
                                    "backgroundImage": navObj["storyPage-isListItemShape"] === false 
                                    ? `url('${visualMap[navObj["storyPage-listItemPicName"]]}')` : "",
                                    
                                    "width": `${navObj["storyPage-listItemGroupWidth"]}px`,
                                    "height": `${navObj["storyPage-listItemGroupHeight"]}px`,

                                    "marginRight": `${navObj["storyPage-listItemGap"]}px`,
                                    "marginBottom": `${navObj["storyPage-listItemGap"]}px`,

                                    "color": `${navObj["storyPage-listItemGroupFontColor"]}`,
                                    "fontSize": `${navObj["storyPage-listItemGroupFontSize"]}px`,
                                    "borderRadius": `${navObj["defaultCornerRadius"]}px`,

                                    "transition": "all 0.2s ease-out",

                                    "justifyContent": "center",
                                    "alignItems": "center",
                                    "display": "flex",
                                    "borderRadius": "0px",
                                }}
                                onMouseDown={
                                    ()=>{
                                        document.getElementById(keyStr).style.filter = "brightness(120%)";
                                    }
                                }
                                onMouseUp={
                                    ()=>{
                                        document.getElementById(keyStr).style.filter = "brightness(100%)";

                           


                                        updateCurrentPageName("During Game");

                                        let currentStandingObjTemp = {};
                                        currentStandingObjTemp["pageStatus"] = "During Game";
                                        currentStandingObjTemp["chapterKey"] = item;
                                        currentStandingObjTemp["nodeKey"] = item + "_start"; //TODO default start-node's key ... if non-SL system
                                        currentStandingObjTemp["nodeType"] = "*chapterStart*"; //TODO if non-SL system
                                        updateCurrentStanding(currentStandingObjTemp);

                                    }
                                }
                            >
                                
                                {item}
                            </div>);
                        })}





                </div>

                
            </div>
            
        </div>
        }

        {page === "Settings Page" && 
    
        <div style={{
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`,
            "backgroundColor": "rgb(222, 222, 235)",
            "borderRadius": "0px",
        }}
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

         
            <div style={{
                "left": `${navObj["settingPage-listItemGroupX"]}px`,
                "top": `${navObj["settingPage-listItemGroupY"]}px`,
                "position": "absolute",

                "display": navObj["settingPage-entriesHorizontal"] === true ? "flex" : "",
                "overflow": "scroll",
                "border-radius": "0px",
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


                                   let keyStr3 = "settingItem" + index + (isEditing === true ? "__e" : "__ne");

                                    return (
                                    <div
                                        className="navigationButton"
                                        key={keyStr3}
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
                                            "borderRadius": `${navObj["defaultCornerRadius"]}px`,
                                            
                                            "transition": "all 0.2s ease-out",

                                            "padding": "7px",
                                            "userSelect": "none"
                                        }}
                                      
                                    >
                                        <div style={{"height": "30px",}}>
                                            <label style={{"height": "20px"}}>{title} [{keyStr3}]</label>
                                            <label>(value)</label>
                                        </div>

                                        <div
                                        >
                                            <input type="range"
                                                
                                                onChange={()=>{
                                                    //TODO update to player-gameSettings?
                                                }}
                                                style={{
                                                    "accentColor": navObj["settingPage-sliderColor"],
                                                    "width": `${navObj["settingPage-sliderWidth"]}px`,
                                                }}
                                            ></input> 
                                 
                                        </div>
                                        
                                        </div>);

                            }
    
                    })}


                </div>

            </div>

        </div>
        }

        {page === "Player Profile Page" && 
  
        <div style={{
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`,
            "borderRadius": "0px",
        }}
        >

            <div style={{"position": "relative",                 
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor":  navObj["playerProfilePage-isBackgroundShape"] === true ? `${navObj["playerProfilePage-bgShadeName"]}` : "rgb(222, 222, 235)", 
                "backgroundImage": navObj["playerProfilePage-isBackgroundShape"] === false 
                    ? `url('${visualMap[navObj["playerProfilePage-bgPicName"]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
            }}>
                {(tryPPText !== -1 && tryPPText["isPreviewing"] !== false)
                    && 
                    <div style={{
                        "position": "absolute",
                        "left": `${tryPPText["posX"]}px`,
                        "top": `${tryPPText["posY"]}px`,
                        "fontSize": `${tryPPText["textFontSize"]}px`,
                        "fontFamily": `${tryPPText["textFont"]}`,
                        "color": `${tryPPText["textColor"]}`,
                    }}
                    >
                        {tryPPText["textItalic"] === false && <label>{tryPPText["textContent"]}</label>}
                        {tryPPText["textItalic"] === true && <em>{tryPPText["textContent"]}</em>}

                    </div>}


                {(tryPPValue !== -1 && tryPPValue["isPreviewing"] !== false) && 
                    <div style={{
                        "position": "absolute",
                        "left": `${tryPPValue["posX"]}px`,
                        "top": `${tryPPValue["posY"]}px`,
                        "fontSize": `${tryPPValue["textFontSize"]}px`,
                        "fontFamily": `${tryPPValue["textFont"]}`,
                        "color": `${tryPPValue["textColor"]}`,
                    }}>
                        {tryPPValue["labelText"]}: ({tryPPValue["valueItemName"]}'s value here)
                    </div>}

                {(tryPPPic !== -1 && tryPPPic["isPreviewing"] !== false) && 
                <div style={{
                        "position": "absolute",
                        "left": `${tryPPPic["posX"]}px`,
                        "top": `${tryPPPic["posY"]}px`,
                        "borderRadius": "0px",
                    }}>
                        <img
                            src={visualMap[tryPPPic["picName"]]}
                            width={tryPPPic["width"]}
                            height={tryPPPic["height"]}
                        ></img>
                </div>}

                {navObj["playerProfilePage-playerProfileNickNameItem-adding"] === true &&
                    <div
                        style={{
                            "position": "absolute",
                            "fontSize": `${navObj["playerProfilePage-playerProfileNickNameItem-textFontSize"]}px`,
                            "fontFamily": `${navObj["playerProfilePage-playerProfileNickNameItem-textFont"]}`,
                            "color": `${navObj["playerProfilePage-playerProfileNickNameItem-textColor"]}`,
                            "left": `${navObj["playerProfilePage-playerProfileNickNameItem-posX"]}px`,
                            "top": `${navObj["playerProfilePage-playerProfileNickNameItem-posY"]}px`,
                        }}
                    >
                        {/* TODO5 */}
                        
                        {navObj["playerProfilePage-playerProfileNickNameItem-textItalic"] === false &&
                        <label>
                            {navObj["playerProfilePage-playerProfileNickNameItem-nicknameLabel"]} {
                                (refDataPlayerProfile !== undefined 
                                && refDataPlayerProfile["playername"] !== undefined) 
                                ? refDataPlayerProfile["playername"] 
                                : " (refDataPlayerProfile[playername]) "}
                        </label>}

                        {navObj["playerProfilePage-playerProfileNickNameItem-textItalic"] === true &&
                        <em>
                            {navObj["playerProfilePage-playerProfileNickNameItem-nicknameLabel"]} {
                            (refDataPlayerProfile !== undefined 
                            && refDataPlayerProfile["playername"] !== undefined) 
                            ? refDataPlayerProfile["playername"] 
                            : " (refDataPlayerProfile[playername]) "}
                        </em>
                        }
                    </div>
                }

                {navObj["playerProfilePage-playerProfileIconPicItem-adding"] === true &&
                    <div style={{
                        "position": "absolute",
                        "left": `${navObj["playerProfilePage-playerProfileIconPicItem-posX"]}px`,
                        "top": `${navObj["playerProfilePage-playerProfileIconPicItem-posY"]}px`,
                        "borderRadius": "0px",
                    }}>
                        <img
                            src={visualMap[refDataPlayerProfile["iconPicName"]]}
                            width={navObj["playerProfilePage-playerProfileIconPicItem-width"] * navObj["playerProfilePage-playerProfileIconPicItem-scale"]}
                            height={navObj["playerProfilePage-playerProfileIconPicItem-height"] * navObj["playerProfilePage-playerProfileIconPicItem-scale"]}
                        ></img>
                        
                </div>}

                <div style={{"position": "absolute"}}>

                {navObj["playerProfilePage-itemMap"].map((item, index) => {
                    let keyStr = "playerProfilePage-itemMap" + index;


                    if (item["itemType"] === "text") {
                        // item["textContent"];
                        // item["textItalic"];
                        // item["textFontSize"];
                        // item["textFont"];
                        // item["textColor"];
                        return (

                            <div 
                                key={keyStr}
                                style={{
                                "position": "absolute",
                                "left": `${item["posX"]}px`,
                                "top": `${item["posY"]}px`,
                                "margin": "0px",

                                "fontSize": `${item["textFontSize"]}px`,
                                "fontFamily": `${item["textFont"]}`,
                                "color": `${item["textColor"]}`
                            }}>
                                {item["textItalic"] === false && <label>{item["textContent"]}</label>}
                                {item["textItalic"] === true && <em>{item["textContent"]}</em>}
                            </div>

                        );
              
                   } else if (item["itemType"] === "value") {
                        // item["labelText"];
                        // item["valueItemType"];
                        // item["valueItemName"];
                        // item["textFontSize"];
                        // item["textFont"];
                        // item["textColor"];

                        //refDataPlayerProfile
                        //refDataPlayerAccount
                        //refGameDataList

                        //"Game Data"     "Player Profile"     "Player Account Info"
                        let actualValue = "";
                        let isValueFetched = false;

                        if (item["valueItemType"] === "Game Data") {
                            let tempArr = refGameDataList.filter(e => e[0] === item["valueItemName"]);
                            if (tempArr.length > 0) {
                                actualValue = tempArr[0][1].toString();

                                isValueFetched = true;
                            }
  
                        } else if (item["valueItemType"] === "Player Profile") {
                            actualValue = refDataPlayerProfile[item["valueItemName"]];
                            isValueFetched = true;
                        } else if (item["valueItemType"] === "Player Account Info") {
                            actualValue = refDataPlayerAccount[item["valueItemName"]];
                            isValueFetched = true;
                        }

// console.log("item = ", item["itemName"], "... actualVal = ", actualValue, " type = ", item["valueItemType"]);
// console.log("refDataPlayerProfile: ", refDataPlayerProfile);
// console.log("refDataPlayerAccount: ", refDataPlayerAccount);
// console.log("refGameDataList: ", refGameDataList);



                        if (isValueFetched === false) {
                            return;
                        }
                        

                        
                        //TODO from item["valueItemType"] and item["valueItemName"], fetch the actual value

                        return (
                        <div>
                        {isValueFetched === true && <div
                                key={keyStr}
                                style={{
                                    "position": "absolute",
                                    "left": `${item["posX"]}px`,
                                    "top": `${item["posY"]}px`,
                                    "margin": "0px",
                                    "fontSize": `${item["textFontSize"]}px`,
                                    "color": `${item["textColor"]}`,
                                    "fontFamily": `${item["textFont"]}`,
                                    "backgroundColor": "orange"
                                }}
                            >
                                {item["labelText"]}: {actualValue}


                        </div>}
                        </div>);

              
                   } else if (item["itemType"] === "pic") {
                        // item["picName"];
                        // item["width"];
                        // item["height"];

                        return (<div 
                            key={keyStr}
                            style={{
                                "position": "absolute",
                                "left": `${item["posX"]}px`,
                                "top": `${item["posY"]}px`,
                                "margin": "0px",
                                "width": `${item["width"]}px`,
                                "height": `${item["height"]}px`,
                                "backgroundColor": "orange",
                            }}>
                                <img
                                    src={visualMap[item["picName"]]}
                                    width={item["width"]}
                                    height={item["height"]}
                                ></img>
                        </div>);
              
                   }

                })}
                </div>

            </div>            
        </div>
        }

        {page === "Game Status Data Page" && 
        <div style={{
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`,
            "backgroundColor": "rgb(222, 222, 235)",
            "borderRadius": "0px",
        }}
        >
            <div style={{
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor":  navObj["gsdPage-isBackgroundShape"] === true ? `${navObj["gsdPage-bgShadeName"]}` : "rgb(222, 222, 235)", 
                "backgroundImage": navObj["gsdPage-isBackgroundShape"] === false 
                    ? `url('${visualMap[navObj["gsdPage-bgPicName"]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                

                "position": "relative", 
                "overflow": "scroll",
            
                }}                
            >
           

            </div>

            
        </div>
     
        }
  
        {page === "Shop Page" && 
    
        <div style={{
            "width": `${screenWidth}px`, 
            "height": `${screenHeight}px`,
            "backgroundColor": "rgb(222, 222, 235)",
            "borderRadius": "0px",
        }}
        >
        <div style={{"position": "relative",                 
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                
                "backgroundColor":  navObj["shopPage-isBackgroundShape"] === true ? `${navObj[ "shopPage-bgShadeName"]}` : "rgb(222, 222, 235)", 
                "backgroundImage": navObj["shopPage-isBackgroundShape"] === false 
                    ? `url('${visualMap[navObj["shopPage-bgPicName"]]}')` : "",
                "backgroundSize": `${screenWidth}px ${screenHeight}px`,
                

                "position": "relative", 
                "overflow": "scroll",
                
                }}>

        

            <br></br>        
            this is Shop Page
            <br></br>






            </div>
        </div>
        }


        {page === "During Game" && <div style={{"position": "absolute"}}><br></br><br></br><br></br>(During Game)</div>}



        {(qWindowOpen === true) && <div style={{"position": "absolute",             
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "borderRadius": "0px",
                "border": "1px dotted #000000",
        }}>


                {/* window-div */}
                {<div
                    style={{
                        "height": `${navObj["outWindow-height"]}px`,
                        "width": `${navObj["outWindow-width"]}px`,

                        "backgroundColor": navObj["outWindow-isShape"] === true ? `${navObj["outWindow-color"]}` : "pink",
                        "backgroundImage": navObj["outWindow-isShape"] === false ?
                            `url('${visualMap[navObj["outWindow-picName"]]}')` : "",
                        "position": "absolute",
                        "top": `${navObj["outWindow-posY"]}px`,
                        "left": `${navObj["outWindow-posX"]}px`,
                        "borderRadius": `${navObj["outWindow-windowCornerRadius"]}px`,


                        "padding": "0px",
                        "overflow": "scroll",
                        "justifyContent": "center",                          

                    }}
                >
                        {navObj["outWindow-askContent"]}

                        {/* button-group */}
                        <div style={{
                            "display": "flex", 
                            "position": "absolute",
                            "backgroundColor": "green",  
                            "left": "10%",
                            "top": "50%"
                            // TODO calculate later (According to window width, etc.)
                        }}> 
                            <button
                                id="qWindowConfirmBtn"
                                style={{
                                    "color": navObj["outWindow-Btn-textColor"],
                                    "backgroundColor": navObj["outWindow-Btn-color"],
                                    "borderRadius": `${navObj["outWindow-Btn-cornerRadius"]}px`,

                                    "width": "71px",
                                    "marginRight": "10px"

                                }}

                                onMouseDown={
                                    ()=>{
                                        document.getElementById("qWindowConfirmBtn").style.filter = "brightness(120%)";
                                    }
                                }
                                onMouseUp={
                                    ()=>{
                                        document.getElementById("qWindowConfirmBtn").style.filter = "brightness(100%)";
                                        
                                        
                                        
                                            //close window and return to story-chapter-page (from during-game)
                                            let nextPageName = "Story Page";
                                            let currentStandingObjTemp = {};
                                            currentStandingObjTemp["pageStatus"] = nextPageName;
                                            currentStandingObjTemp["chapterKey"] = "";
                                            currentStandingObjTemp["nodeKey"] = "";
                                            currentStandingObjTemp["nodeType"] = ""; 
                                            updateCurrentStanding(currentStandingObjTemp);
                                            
                                            updateCurrentPageName(nextPageName);

                                          
                                            //close q-window
                                            setQWindowOpen(false);
                                }}

                            >{navObj["outWindow-Btn-confirmingText"]}</button>
                            <button
                                id="qWindowCancelBtn"
                                style={{
                                    "color": navObj["outWindow-Btn-textColor"],
                                    "backgroundColor": navObj["outWindow-Btn-color"],
                                    "borderRadius": `${navObj["outWindow-Btn-cornerRadius"]}px`,

                                    "width": "71px",


                                }}
                                onMouseDown={
                                    ()=>{
                                        document.getElementById("qWindowCancelBtn").style.filter = "brightness(120%)";
                                    }
                                }
                                onMouseUp={
                                    ()=>{
                                        document.getElementById("qWindowCancelBtn").style.filter = "brightness(100%)";

                                        //close q-window
                                     
                                        setQWindowOpen(false);
                                        setUserClickCancelQwindow(true);
                                        updateCurrentPageName("During Game");

                                        
                                }}
                            >{navObj["outWindow-Btn-cancellingText"]}</button>
                        </div>
                </div>}{/* window-div */}
{/* TODO25 */}
                       
        </div>}

        


        {/* large frame for all elements */}
        <div style={{
            "borderRadius": "0px",

        }}>
                {/* //TODO5 */}
                {((page !== "Main Page" && page !== "Game Progress Strategy" && page !== "Quit Asking Window" && qWindowOpen === false) 
                    || (page === "Game Progress Strategy" && navObj["isWithSL"] === true)) 
                && <div 
                    className="navigationButton"
                    id="backButton"
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
                                "borderRadius": `${navObj["defaultCornerRadius"]}px`,

                                "transition": "all 0.2s ease-out",

                                "justifyContent": "center",
                                "alignItems": "center",
                                "display": "flex",
                            }}
                        onMouseDown={
                            ()=>{
                                document.getElementById("backButton").style.filter = "brightness(120%)";
                            }
                        }
                        onMouseUp={
                            ()=>{
                                document.getElementById("backButton").style.filter = "brightness(100%)";


                                let nextPageName = "Main Page";
                                if (page === "During Game") {
                                    setQWindowOpen(true);
                                    updateCurrentPageName("Quit Asking Window");
                                    

                                } else if (page === "Game Progress Strategy") {
                                    nextPageName = "Story Page";
                                    let currentStandingObjTemp = {};
                                    currentStandingObjTemp["pageStatus"] = "Story Page";
                                    currentStandingObjTemp["chapterKey"] = "";
                                    currentStandingObjTemp["nodeKey"] = "";
                                    currentStandingObjTemp["nodeType"] = ""; 
                                    updateCurrentStanding(currentStandingObjTemp);
                                    updateCurrentPageName(nextPageName);
                                } else {
                                    updateCurrentPageName(nextPageName);
                                }
        
                                

                                
                            }
                        }
                        >
                            {navObj["backButton-displayText"]}
                </div>}   

           



        </div>
        {/* large frame for all elements */}

         

    </div>);
}
