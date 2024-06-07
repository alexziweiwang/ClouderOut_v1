import { useState, useEffect } from 'react';


export default function NavigationPreview({initialNavObj, fetchNavObj, fetchPageName}) {
    const [screenWidth, setScreenWidth] = useState(800);
    const [screenHeight, setScreenHeight] = useState(450);

    const [resourceList, setResourceList] = useState([]); //TODO for resource-selection

    const [navObj, setNavObj] = useState(initialNavObj);
    const [page, setPage] = useState("");
    const [mainPageElementList, setMainPageElementList] = useState({
        "Story" : navObj["mainPage-story"],
        "Player Profile": navObj["mainPage-playerProfile"],
        "Settings": navObj["mainPage-setting"],
        "Shop": navObj["mainPage-shop"],
    }); //booleans
    const [mainPageMapSize, setMainPageMapSize] = useState(0);
    const [mainPageBgPicUrl, setMainPageBgPicUrl] = useState("");
    const [mainPageFixedListItemPicUrl, setMainPageFixedListItemPicUrl] = useState("");
    const [mainPageCustomStoryPicUrl, setMainPageCustomStoryPicUrl] = useState("");
    const [mainPageCustomPlayerProfilePicUrl, setMainPageCustomPlayerProfilePicUrl] = useState("");
    const [mainPageCustomSettingsPicUrl, setMainPageCustomSettingsPicUrl] = useState("");
    const [mainPageCustomShopPicUrl, setMainPageCustomShopPicUrl] = useState("");

    useEffect(() => {
        console.log("initial nav-preview: ", initialNavObj); //TODO test
        console.log("Navigation Preview -- "); //TODO test

        let objTemp = fetchNavObj();
        setNavObj(objTemp);
        // setMainPageElementList({
        //     "Story" : objTemp["mainPage-story"],
        //     "Player Profile": objTemp["mainPage-playerProfile"],
        //     "Settings": objTemp["mainPage-setting"],
        //     "Shop": objTemp["mainPage-shop"],
        // });

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

  
        //TODO setMainPageBgPicUrl()
        //TODO setMainPageFixedListItemPicUrl()
        //TODO setMainPageFixedListItemPicUrl();
        //TODO setMainPageCustomStoryPicUrl();
        //TODO setMainPageCustomPlayerProfilePicUrl();
        //TODO setMainPageCustomSettingsPicUrl();
        //TODO setMainPageCustomShopPicUrl();
      
    });
    

    return (<div className="previewWindow">

        <br></br>

        {page === "Main Page"&& 
        <> main page
        <div style={{
                "width": `${screenWidth}px`, 
                "height": `${screenHeight}px`,
                "backgroundColor": `${navObj["mainPage-bgShadeName"]}`, 
                "background-image": navObj["mainPage-isBackgroundShape"] === false ? `url('${mainPageBgPicUrl}')` : "",
                "background-size": `${screenWidth}px ${screenHeight}px`,
                
                "marginLeft": `20px`,
                "position": "relative", 
            
                }}
            >

            {/* grouped items */}
            {navObj["mainPage-entriesCustom"] === false &&  <div style={{
                "position": "absolute",
                "display": navObj["mainPage-entriesHorizontal"] === true ? "flex" : "inline",
                "marginLeft": `${navObj["mainPage-listItemGroupX"]}px`,
                "marginTop": `${navObj["mainPage-listItemGroupY"]}px`,
                }}>

            {Object.keys(mainPageElementList).map((key) => {
                let optionName = "";
                if (key === "Story") {
                    optionName = navObj["mainPage-story-name"];
                } else if (key === "Player Profile") {
                    optionName = navObj["mainPage-playerProfile-name"];
                } else if (key === "Settings") {
                    optionName = navObj["mainPage-setting-name"];
                } else if (key === "Shop") {
                    optionName = navObj["mainPage-shop-name"];
                }

                if (mainPageElementList[key] === true) {
                    let keyStr1 = key + "_groupedItems";
                    return (
               
                        <div 
                            id={keyStr1}
                            style = {navObj["mainPage-isListItemShape"] === true ? 
                            {
                                "backgroundColor": `${navObj["mainPage-listItemShadeName"]}`,
                                "marginBottom": `${navObj["mainPage-listItemGap"]}px`,
                                "marginRight": `${navObj["mainPage-listItemGap"]}px`,
                                "width": `${navObj["mainPage-listItemGroupWidth"]}px`,
                                "height": `${navObj["mainPage-listItemGroupHeight"]}px`,
                                "color": `${navObj["mainPage-listItemGroupFontColor"]}`,
                                "fontSize": `${navObj["mainPage-listItemGroupFontSize"]}px`,

                                "justify-content": "center",
                                "align-items": "center",
                                "display": "flex",
                            } : {            
                                "background-image": `url('')`,
                                "background-size": `${navObj["mainPage-listItemGroupWidth"]}px ${navObj["mainPage-listItemGroupHeight"]}px`,
                                
                                "marginBottom": `${navObj["mainPage-listItemGap"]}px`,
                                "marginRight": `${navObj["mainPage-listItemGap"]}px`,
                                "width": `${navObj["mainPage-listItemGroupWidth"]}px`,
                                "height": `${navObj["mainPage-listItemGroupHeight"]}px`,
                                "color": `${navObj["mainPage-listItemGroupFontColor"]}`,
                                "fontSize": `${navObj["mainPage-listItemGroupFontSize"]}px`,

                                "justify-content": "center",
                                "align-items": "center",
                                "display": "flex",}
                        }
                        onMouseDown={
                            ()=>{
                                document.getElementById(keyStr1).style.filter = "invert(100%)";
                            }
                        }
                        onMouseUp={
                            ()=>{
                                document.getElementById(keyStr1).style.filter = "invert(0%)";
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

            {Object.keys(mainPageElementList).map((key) => {
                let keyStr2 = key + "_customizedItems";

                let optionName = "";
                if (key === "Story") {
                    optionName = navObj["mainPage-story-name"];
                } else if (key === "Player Profile") {
                    optionName = navObj["mainPage-playerProfile-name"];
                } else if (key === "Settings") {
                    optionName = navObj["mainPage-setting-name"];
                } else if (key === "Shop") {
                    optionName = navObj["mainPage-shop-name"];
                }

                if (mainPageElementList[key] === true) {
                    let currItemPosX = 0;
                    let currItemPosY = 0;
                    let currItemWidth = 0;
                    let currItemHeight = 0;
                    let currItemFontColor = "";
                    let currItemFontSize = 0;
                    let currItemBgShade = "";                   
                    let currIsShapeBool = false;

                    if (key === "Story") {
                        currItemPosX = navObj["mainPage-story-posX"];
                        currItemPosY = navObj["mainPage-story-posY"];
                        currItemWidth = navObj["mainPage-story-width"];
                        currItemHeight = navObj["mainPage-story-height"];
                        currItemFontColor = navObj["mainPage-story-fontColor"];
                        currItemFontSize = navObj["mainPage-story-fontSize"];
                        currItemBgShade = navObj["mainPage-story-shadeName"];
                        currIsShapeBool = navObj["mainPage-story-isShape"];
                    } else if (key === "Player Profile") {
                        currItemPosX = navObj["mainPage-playerProfile-posX"];
                        currItemPosY = navObj["mainPage-playerProfile-posY"];
                        currItemWidth = navObj["mainPage-playerProfile-width"];
                        currItemHeight = navObj["mainPage-playerProfile-height"];
                        currItemFontColor = navObj["mainPage-playerProfile-fontColor"];
                        currItemFontSize = navObj["mainPage-playerProfile-fontSize"];
                        currItemBgShade = navObj["mainPage-playerProfile-shadeName"];
                        currIsShapeBool = navObj["mainPage-playerProfile-isShape"];
                    } else if (key === "Settings") {
                        currItemPosX = navObj["mainPage-setting-posX"];
                        currItemPosY = navObj["mainPage-setting-posY"];
                        currItemWidth = navObj["mainPage-setting-width"];
                        currItemHeight = navObj["mainPage-setting-height"];
                        currItemFontColor = navObj["mainPage-setting-fontColor"];
                        currItemFontSize = navObj["mainPage-setting-fontSize"];
                        currItemBgShade = navObj["mainPage-setting-shadeName"];
                        currIsShapeBool = navObj["mainPage-setting-isShape"];
                    } else if (key === "Shop") {
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
                            id={keyStr2}
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

                                "justify-content": "center",
                                "align-items": "center",
                                "display": "flex",
                            } :
                            {
                                //TODO background image & backgound size
                                "position": "absolute",
                                "marginBottom": `${navObj["mainPage-listItemGap"]}px`,

                                "marginLeft": `${currItemPosX}px`,
                                "marginTop": `${currItemPosY}px`,
                                "width": `${currItemWidth}px`,
                                "height": `${currItemHeight}px`,
                                "color": `${currItemFontColor}`,
                                "fontSize": `${currItemFontSize}px`,

                                "justify-content": "center",
                                "align-items": "center",
                                "display": "flex",
                            }
                            }
                            onMouseDown={
                                ()=>{
                                    document.getElementById(keyStr2).style.filter = "invert(100%)";
                                }
                            }
                            onMouseUp={
                                ()=>{
                                    document.getElementById(keyStr2).style.filter = "invert(0%)";
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
  


        {(navObj["isWithSL"] && page === "Game Progress Strategy") && <>
        <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            
            saveload page preview</div>
        <br></br></>}

        {page === "Story Page" && <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            story page
            <br></br>        
            {navObj["storyPage-chapterListHorizontal"].toString()}<br></br>
        </div>}

        {page === "Settings Page" && <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            setting page
            <br></br>   
            {navObj["settingPage-playSpeed"].toString()}<br></br>
            {navObj["settingPage-bgmVol"].toString()}<br></br>
            {navObj["settingPage-seVol"].toString()}<br></br>
            {navObj["settingPage-entriesHorizontal"].toString()}<br></br>
            {navObj["settingPage-entriesCustom"].toString()} 
        </div>}

        {page === "Player Profile Page" && <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            player profile page
            <br></br>        
            {navObj["storyPage-chapterListHorizontal"].toString()}<br></br>
        </div>}

        {page === "Game Status Data Page" && <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            game status data page
            <br></br>        
            {navObj["storyPage-chapterListHorizontal"].toString()}<br></br>
        </div>}
  
        {page === "Shop Page" && <div style={{"width": `${screenWidth}px`, "height": `${screenHeight}px`,"backgroundColor": "rgb(222, 222, 235)", "marginLeft": `20px`}}
        >
            shop page
            <br></br>        
            {navObj["storyPage-chapterListHorizontal"].toString()}<br></br>
        </div>}

        <br></br>              

    </div>);
}