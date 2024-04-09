import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';

export default function GameUISetter({openRm, iniDefaultButtonObj, iniTxtFrameObj, iniMenuButtonObj, updateIsDisplayDefaultButtonPreview, updateDefaultButtonSettings, updateTextFrameUISettings, updateBackButtonSettings, sendMenuType}) {
    const screenWidth = 800;
    const screenHeight = 600;

    //TODO at previous layer, keep unsaved-local setting data locally, so that switching doesn't trigger cloud-db operations
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
            fetchProjResourceLists();
            setFirstTimeEnter(false);
        }
        updateIsDisplayDefaultButtonPreview(displayDefaultButtonPreview);
        updateDefaultButtonSettings(defaultButtonObj);
  
        updateTextFrameUISettings(txtFrameObj);
        updateBackButtonSettings(igMenuBtnObj);

    });

    const username = "user002"; //TODO testing
    const projName = "project001"; //TODO testing

    const [visualMap, setVisualMap] = useState([]); 
    async function fetchProjResourceLists() {
        console.log("piece-setter: fetchProjResourceLists()"); //TODO test
        /* fetch from cloud db */
        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
        setVisualMap(obj.visual);
    }

    const [idvButtonBorderColor, setIdvButtonBorderColor] = useState("#000000");
    const [idvButtonBorderSize, setIdvButtonBorderSize] = useState("2");

    //TODO current: defualt-reset when start rendering this component
    //TODO later: fetch from cloud-db for setting records
    const [defaultButtonObj, setDefaultButtonObj] = useState(iniDefaultButtonObj);

    const [displayDefaultButtonPreview, setDisplayDefaultButtonPreview] = useState(true);

    const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content", "Sample3: Another option..."];

    const [txtFrameFontName, setTxtFrameFontName] = useState(0); //TODO
    const [txtFrameFontSize, setTxtFrameFontSize] = useState(12); //TODO
    const [txtFrameContentAreaCentered, setTxtFrameContentAreaCentered] = useState(true);
    const [txtFrameContentAreaHgap, setTxtFrameContentAreaHgap] = useState(10);
    const [txtFrameContentAreaVgap, setTxtFrameContentAreaVgap] = useState(10);

    const [txtFrameObj, setTxtFrameObj] = useState(iniTxtFrameObj);

    const [isMenuStoryCore, setIsMenuStoryCore] = useState(false);

    const [igMenuBtnObj, setIgMenuBtnObj] = useState(iniMenuButtonObj);

    const [igsidebarMenuPosX, setIgsidebarMenuPosX] = useState(100);
    const [igsidebarMenuPosY, setIgsidebarMenuPosY] = useState(100);
    const [igsidebarMenuW, setIgsidebarMenuW] = useState(100);
    const [igsidebarMenuH, setIgsidebarMenuH] = useState(100);
    const [igsidebarMenuCnrRadius, setIgsidebarMenuCnrRadius] = useState(100);
    const [igsidebarMenuIsShape, setIgsidebarMenuIsShape] = useState(true);
    const [igsidebarMenuPicVar, setIgsidebarMenuPicVar] = useState("");
    const [igsidebarMenuTextColor, setIgsidebarMenuTextColor] = useState("#000000");

    const [igsidebarMenuIsSingleBtn, setIgsidebarMenuIsSingleBtn] = useState(true);
    const [igsidebarMenuListPadding, setIgsidebarMenuListPadding] = useState(1);
    const [igsidebarMenuIsListDirection, setIgsidebarMenuIsListDirection] = useState(1);

    const [igsidebarMenuTransparency, setIgsidebarMenuTransparency] = useState(90);
    const [igsidebarMenuColor, setIgsidebarMenuColor] = useState("#a8d1d6");

    const [autoBtn, setAutoBtn] = useState(true);
    const [saveBtn, setSaveBtn] = useState(true);
    const [loadBtn, setLoadBtn] = useState(true);
    const [settingsBtn, setSettingsBtn] = useState(true);
    const [returnTitlePageBtn, setReturnTitlePageBtn] = useState(true);
    const [inGameDataBtn, setInGameDataBtn] = useState(true);
    const [dealBtn, setDealBtn] = useState(true);

    const [igsidebarMenuObj, setIgsidebarMenuObj] = useState({
        "width": igsidebarMenuW,
        "height": igsidebarMenuH,
        "positionX": igsidebarMenuPosX,
        "positionY": igsidebarMenuPosY,
        "cornerRadius": igsidebarMenuCnrRadius,
        "transparency": igsidebarMenuTransparency,
        "isShape": igsidebarMenuIsShape,
        "bgColor": igsidebarMenuColor,
        "picVar": igsidebarMenuPicVar,
        "isSingleButton": igsidebarMenuIsSingleBtn,
        "listItemPadding": igsidebarMenuListPadding,
        "listDirection": igsidebarMenuIsListDirection,
        "autoOption": autoBtn,
        "saveGameOption": saveBtn,
        "loadGameOption": loadBtn,
        "settingsOption": settingsBtn,
        "returnToTitleOption": returnTitlePageBtn,
        "inGameDataOption": inGameDataBtn,
        "dealOption": dealBtn
    });

    return (
 
    <div className="guiSettings">

    1. Defualt Button (group)

        <div className="indentOne">
        <br></br>Width: <input type="range" value={defaultButtonObj["widthMin"]} min="0" max="800" step="1" onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "widthMin": event.target.value});
        }}></input><input value={defaultButtonObj["widthMin"]} min="0" max="800" step="1" type="number" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "widthMin": event.target.value});}}></input>
        {/* <br></br>Max-Width: <input type="range" value={defaultButtonObj["widthMax"]} min="0" max="800" step="1" onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "widthMax": event.target.value});
            }}></input><input value={defaultButtonObj["widthMax"]} min="0" max="800" step="1" type="number" onChange={(event)=>{            setDefaultButtonObj({...defaultButtonObj,  "widthMax": event.target.value});
        }}></input> */}
        <br></br>Height: <input type="range" value={defaultButtonObj["height"]} min="0" max="80" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj, "height": event.target.value});}}></input><input type="number" value={defaultButtonObj["height"]} min="0" max="800" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "height": event.target.value});}}></input>
        <br></br><label>Corner Radius: </label>
        <input type="range" value={defaultButtonObj["cornerRadius"]} min="0" max="20" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "cornerRadius": event.target.value});}}></input><label>{defaultButtonObj["cornerRadius"]}</label>
        {/* <br></br><label>Transparency: </label><input type="range" value={defaultButtonObj["transparency"]} min="0" max="1" step="0.1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "transparency": event.target.value});}}></input><label>{defaultButtonObj["transparency"]}</label> */}
        <br></br><label>Text Size: </label><input type="range" value={defaultButtonObj["textSize"]}  min="0" max="90" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "textSize": event.target.value});}}></input><label> {defaultButtonObj["textSize"]} px</label>
        <br></br><label>Text Color: </label><input type="color" value={defaultButtonObj["textColor"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "textColor": event.target.value});}}></input><label> {defaultButtonObj["textColor"]}</label>
        <br></br><label>Text Horizontal Alignment: </label>
            <select value={defaultButtonObj["justifyContent"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "justifyContent": event.target.value});}}>
                <option value="center" key="defaultButtonTextAlignCenter">Center</option>
                <option value="start" key="defaultButtonTextAlignLeft">Left</option>
            </select>
        <br></br><label>Text Vertical Alignment: </label>
            <select value={defaultButtonObj["alignItems"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "alignItems": event.target.value});}}>
                <option value="center" key="defaultButtonAlignItemsCenter">Center</option>
                <option value="start" key="defaultButtonAlignItemsTop">Top</option>
                <option value="end" key="defaultButtonAlignItemsBottom">Bottom</option>
            </select>
        <br></br><label>Border Color: </label><input type="color" value={idvButtonBorderColor} onChange={(event)=>{
                        setIdvButtonBorderColor(event.target.value);
                        let temp = idvButtonBorderSize + "px solid " + event.target.value;
                        setDefaultButtonObj({...defaultButtonObj,  "border": temp});
                    }}></input><label> {idvButtonBorderColor}</label>
                    <br></br><label>Border Size: </label>
                    <input type="range" value={idvButtonBorderSize} min="0" max="3" step="1" onChange={(event)=>{
                        setIdvButtonBorderSize(event.target.value);
                        let temp = event.target.value + "px solid " + idvButtonBorderColor;
                        setDefaultButtonObj({...defaultButtonObj,  "border": temp});
                    }}></input><label>{idvButtonBorderSize}px</label>
        <br></br><label>Button Looking: </label>
        <br></br><input type="radio" value={defaultButtonObj["isShape"]} checked={defaultButtonObj["isShape"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "isShape": true});
          
        }}></input><label onClick={(event)=>{
                setDefaultButtonObj({...defaultButtonObj,  "isShape": true});
                
                }}>Rectangle & Color Filled: </label>
            {defaultButtonObj["isShape"] && 
                <div className="indentOne">
                    <label>Background Color: </label>
                    <input type="color" value={defaultButtonObj["bgColor"]} 
                    onChange={(event)=>{
                        setDefaultButtonObj({...defaultButtonObj,  "bgColor": event.target.value});
                       
                        }}></input><label> {defaultButtonObj["bgColor"]}</label>
                </div>}
            
        <br></br><input type="radio" value={defaultButtonObj["isShape"]} checked={!defaultButtonObj["isShape"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "isShape": false});
        
        }}></input><label onClick={(event)=>{
                setDefaultButtonObj({...defaultButtonObj,  "isShape": false});
              }}>Base Picture: </label>
            {!defaultButtonObj["isShape"] && <>
                <select value={defaultButtonObj["picVar"]} onChange={(event)=>{
                            setDefaultButtonObj({...defaultButtonObj,  "picVar": event.target.value, "picUrl": visualMap[event.target.value]["url"]}); 
                
                }}>                    
                    <option key="idvDefault" value="">-- Select Resource --</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "defaultButton" + currKey;
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            return (
                                <option value={currKey} key={keyName}>{visualMap[currKey]["var"]}</option>
                            );
                    })}
                </select><button onClick={() => {openRm();}}>Resource Adding</button>
         
                </>}
        <br></br><label>Gap between buttons: </label>
        <input type="range" value={defaultButtonObj["margin"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "margin": event.target.value});
        }}
            min="0" max="100" step="1"
        ></input>{defaultButtonObj["margin"]}
    
    </div>

    <br></br><br></br>
    <input type="checkbox" 
        value={displayDefaultButtonPreview}
        checked={displayDefaultButtonPreview}
        onChange={()=>{setDisplayDefaultButtonPreview(!displayDefaultButtonPreview);}}
                ></input><label>Preview in right window</label>  
    <br></br>
    {displayDefaultButtonPreview && <>
        <br></br><label>Button Group PositionX: </label><br></br>
            <div className="indentOne">
                <input type="range" value={defaultButtonObj["groupX"]}
                    onChange={(event)=>{
                        setDefaultButtonObj({...defaultButtonObj,  "groupX": event.target.value, "horizontalMid": false});
                    }}
                    min="0" max="800" step="1"
                ></input>
                <input type="number" value={defaultButtonObj["groupX"]}
                    onChange={(event)=>{
                            setDefaultButtonObj({...defaultButtonObj,  "groupX": event.target.value, "horizontalMid": false});
                    }}
                    min="0" max="800" step="1"

                ></input>
                
                <br></br>
                <input type="checkbox" value={defaultButtonObj["horizontalMid"]}
                    checked={defaultButtonObj["horizontalMid"]}
                    onChange={()=>{
                        if (defaultButtonObj["horizontalMid"] === false) { // going to be true
                            //recalculate                            
                            let posX = (screenWidth - defaultButtonObj["widthMin"]) / 2 - 1;
                            setDefaultButtonObj({...defaultButtonObj,  "groupX": posX, "horizontalMid": !defaultButtonObj["horizontalMid"]});
                        } else {
                            setDefaultButtonObj({...defaultButtonObj,  "horizontalMid": !defaultButtonObj["horizontalMid"]});
                        }
                    }}
                ></input><label>Horizontally Centered</label>
            </div>
        <br></br><label>Button Group PositionY: </label><br></br>
            <div className="indentOne">
   
                <input type="range" value={defaultButtonObj["groupY"]}
                    onChange={(event)=>{
                        setDefaultButtonObj({...defaultButtonObj,  "groupY": event.target.value, "verticalMid": false});
                    }}
                    min="0" max="800" step="1"
                
                ></input>
                <input type="number"  value={defaultButtonObj["groupY"]}
                    onChange={(event)=>{
                        setDefaultButtonObj({...defaultButtonObj,  "groupY": event.target.value, "verticalMid": false});
                    }}
                    min="0" max="800" step="1"
                   
                ></input>              
            </div> </>}            
    {!displayDefaultButtonPreview && <label>*Default Button Preview Area*</label>}
    {!displayDefaultButtonPreview && <div className="buttonPreviewArea" style={{"position": "relative"}}>
    
            {defaultButtonTextSampleArr.map((item, index)=>{
                let currId = "defaultButtonDiv" + index;
                return (
                <div id={currId} key={index} style={
                    defaultButtonObj["isShape"] === true ? {   
                        "background": defaultButtonObj["bgColor"],

                        "width": `${defaultButtonObj["widthMin"]}px`,
                        "height": `${defaultButtonObj["height"]}px`,
                        "border-radius": `${defaultButtonObj["cornerRadius"]}px`,
                        "color": defaultButtonObj["textColor"],
                        "opacity": defaultButtonObj["transparency"],
                        "border": `${defaultButtonObj["border"]}`,
                        "margin-bottom": `${defaultButtonObj["margin"]}px`,
                        "padding-left": `10px`,
                        "justify-content": defaultButtonObj["justifyContent"],
                        "align-items": defaultButtonObj["alignItems"],
                        "font-size": `${defaultButtonObj["textSize"]}px`,

                        "display": "flex",
                        "cursor": "pointer",
                        "user-select": "none",
                        "transition": "all 0.2s ease-out",
                        "overflow": "scroll"
                    } : {"background-image": `url('${defaultButtonObj["picUrl"]}')`,
                        "background-size": `${defaultButtonObj["widthMax"]}px ${defaultButtonObj["height"]}px`,
                        
                        "width": `${defaultButtonObj["widthMin"]}px`,
                        "height": `${defaultButtonObj["height"]}px`,
                        "border-radius": `${defaultButtonObj["cornerRadius"]}px`,
                        "color": defaultButtonObj["textColor"],
                        "opacity": defaultButtonObj["transparency"],
                        "border": `${defaultButtonObj["border"]}`,
                        "margin-bottom": `${defaultButtonObj["margin"]}px`,
                        "padding-left": `10px`,
                        "justify-content": defaultButtonObj["justifyContent"],
                        "align-items": defaultButtonObj["alignItems"],
                        "font-size": `${defaultButtonObj["textSize"]}px`,

                        "display": "flex",
                        "cursor": "pointer",
                        "user-select": "none",
                        "transition": "all 0.2s ease-out",
                        "overflow": "scroll"
                    }      
                }
                onMouseDown={
                    ()=>{
                        document.getElementById(currId).style.filter = "invert(100%)";
                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById(currId).style.filter = "invert(0%)";
                    }
                }
                
                >
                {defaultButtonTextSampleArr[index]}
                </div>);
            }                
            )}
       
    </div>}

    <br></br><br></br><br></br>
    2. Text Frame
    <br></br>Width: <input type="range" value={txtFrameObj["width"]} min="0" max="800" step="1" onChange={(event)=>{
            let posX = (screenWidth - txtFrameObj["width"]) / 2 - 1;
          
            setTxtFrameObj({...txtFrameObj, "positionX": posX, "width": event.target.value});

        }}></input><input value={txtFrameObj["width"]} type="number" min="0" max="800" step="1" onChange={(event)=>{
            let posX = (screenWidth - txtFrameObj["width"]) / 2;
            setTxtFrameObj({...txtFrameObj, "width": event.target.value, "positionX": posX});        
        }}></input>
    <br></br>Height: <input type="range" value={txtFrameObj["height"]} min="0" max="800" step="1" onChange={(event)=>{
        setTxtFrameObj({...txtFrameObj, "height": event.target.value});    
        }}></input><input type="number" value={txtFrameObj["height"]} min="0" max="800" step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "height": event.target.value});    
        }}></input>
    <br></br>Position Y: <input type="range" value={txtFrameObj["positionY"]} min="0" max="800" step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "positionY": event.target.value});    
        }}></input><input type="number" value={txtFrameObj["positionY"]} min="0" max="800" step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "positionY": event.target.value});           
        }}></input>
    <br></br><label>Corner Radius: </label>
    <input type="range" min="0" max="100" step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "cornerRadius": event.target.value});    
        }} value={txtFrameObj["cornerRadius"]}></input><label> {txtFrameObj["cornerRadius"]}</label>
       
    {/* <br></br><label>Transparency: </label><input type="range" value={txtFrameObj["transparency"]} min="0" max="1" step="0.1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "transparency": event.target.value});    
        }}></input><label>{txtFrameObj["transparency"]}</label> */}
    <br></br><input type="radio" value={txtFrameObj["isShape"]} checked={txtFrameObj["isShape"]} onChange={()=>{
            setTxtFrameObj({...txtFrameObj, "isShape": true});    
        }}></input><label onClick={()=>{setTxtFrameObj({...txtFrameObj, "isShape": true});}}>Rectangle: </label>
        {txtFrameObj["isShape"] && <><input type="color" value={txtFrameObj["bgColor"]} onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "bgColor": event.target.value});    
            }}></input><label>{txtFrameObj["bgColor"]}</label></>}
    <br></br><input type="radio" value={txtFrameObj["isShape"]} checked={!txtFrameObj["isShape"]} onChange={()=>{setTxtFrameObj({...txtFrameObj, "isShape": false});}}></input><label onClick={()=>{setTxtFrameObj({...txtFrameObj, "isShape": false});}}>Base Picture </label>
        {!txtFrameObj["isShape"] && <><select value={txtFrameObj["picVar"]} onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "picVar": event.target.value, "picUrl": visualMap[event.target.value]["url"]});    
            }}><option key="tfvDefault" value="">-- Select Resource --</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "tfvButton" + currKey;
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            return (
                                <option value={currKey} key={keyName}>{visualMap[currKey]["var"]}</option>
                            );
                    })}
            </select>
        <button onClick={() => {openRm()}}>Resource Adding</button></>}

    <br></br><label>Font: </label>
    <select value={txtFrameFontName} onChange={(event)=>{setTxtFrameFontName(event.target.value);}}>
        <option key="fontDefault" value="default">-- Select Font --</option>
    </select>
  
    <br></br><label>Text Size: </label><input type="range" value={txtFrameObj["textSize"]} min="0" max="32" step="1" onChange={(event)=>{
        setTxtFrameObj({...txtFrameObj, "textSize": event.target.value});            
    }}></input><input type="number" value={txtFrameObj["textSize"]} min="0" max="32" step="1" onChange={(event)=>{setTxtFrameObj({...txtFrameObj, "textSize": event.target.value});}}></input>
    <br></br><label>Text Color: </label><input type="color" value={txtFrameObj["textColor"]} onChange={(event)=>{
        setTxtFrameObj({...txtFrameObj, "textColor": event.target.value});            
    }}></input><label> {txtFrameObj["textColor"]}</label>
    <br></br>Text Content Area:
    <div className="indentOne">
    <input type="radio" value={txtFrameContentAreaCentered} checked={txtFrameContentAreaCentered} onChange={(event)=>{setTxtFrameContentAreaCentered(!txtFrameContentAreaCentered);}}>
    </input><label>Centered: </label>
        {txtFrameContentAreaCentered && <div className="indentOne">

                <label>Horizontal Gap: </label>
                <br></br>
                    <input type="range" value={txtFrameContentAreaHgap}
                        min="10" max={(txtFrameObj["width"] - 20) / 2} step="1"
                        onChange={(event)=>{setTxtFrameContentAreaHgap(event.target.value);
                            // horiztonalGap * 2 + contentAreaWidth = frameWidth
                            let contentAreaWidth = txtFrameObj["width"] - 2 * event.target.value - 2;
                            setTxtFrameObj({...txtFrameObj, 
                                "TextContentArea-x": event.target.value, 
                                "TextContentArea-w": contentAreaWidth}); 
                        }}
                    
                    ></input>
                    <input type="number" value={txtFrameContentAreaHgap}
                        min="10" max={(txtFrameObj["width"] - 20) / 2} step="1"
                        onChange={(event)=>{setTxtFrameContentAreaHgap(event.target.value);
                            // horiztonalGap * 2 + contentAreaWidth = frameWidth
                            let contentAreaWidth = txtFrameObj["width"] - 2 * event.target.value - 2;
                            setTxtFrameObj({...txtFrameObj, 
                                "TextContentArea-x": event.target.value, 
                                "TextContentArea-w": contentAreaWidth}); 
                        }}
                    ></input>
                    
                <br></br>
                <label>Vertical Gap: </label>
                <br></br>
                    <input type="range" value={txtFrameContentAreaVgap}
                        min="10" max={(txtFrameObj["height"] - 20) / 2} step="1"
                        onChange={(event)=>{setTxtFrameContentAreaVgap(event.target.value);
                            // verticalGap * 2 + contentAreaHeight = frameHeight
                            let contentAreaHeight = txtFrameObj["height"] - 2 * event.target.value - 2;
                            setTxtFrameObj({...txtFrameObj, 
                                "TextContentArea-y":event.target.value,
                                "TextContentArea-h": contentAreaHeight
                            }); 
                        }}                    
                    ></input>
                    <input type="number" value={txtFrameContentAreaVgap}
                        min="10" max={(txtFrameObj["height"] - 20) / 2} step="1"
                        onChange={(event)=>{setTxtFrameContentAreaVgap(event.target.value);
                            // verticalGap * 2 + contentAreaHeight = frameHeight
                            let contentAreaHeight = txtFrameObj["height"] - 2 * event.target.value - 2;
                            setTxtFrameObj({...txtFrameObj, 
                                "TextContentArea-y":event.target.value,
                                "TextContentArea-h": contentAreaHeight
                            }); 
                        }}                    
                    ></input>
        </div>}
        <br></br>
        <input type="radio" value={txtFrameContentAreaCentered} checked={!txtFrameContentAreaCentered} onChange={(event)=>{setTxtFrameContentAreaCentered(!txtFrameContentAreaCentered);}}>
            </input><label>Customized: </label>
            {!txtFrameContentAreaCentered && <div className="indentOne">
                TextContentArea-x: <input type="range" value={txtFrameObj["TextContentArea-x"]} min="0" max="800" step="1" 
                onChange={(event) => {
                    setTxtFrameObj({...txtFrameObj, "TextContentArea-x": event.target.value});    
                }}
                ></input>{txtFrameObj["TextContentArea-x"]}
                <br></br>
                TextContentArea-y: <input type="range" value={txtFrameObj["TextContentArea-y"]} min="0" max="800" step="1" 
            onChange={(event) => {
                setTxtFrameObj({...txtFrameObj, "TextContentArea-y": event.target.value});    
            }}
                ></input>{txtFrameObj["TextContentArea-y"]}
                <br></br>
                TextContentArea-w: <input type="range" value={txtFrameObj["TextContentArea-w"]} min="0" max="800" step="1" 
            onChange={(event) => {
                setTxtFrameObj({...txtFrameObj, "TextContentArea-w": event.target.value});    
            }}
                ></input>{txtFrameObj["TextContentArea-w"]}
                <br></br>
                TextContentArea-h:  <input type="range" value={txtFrameObj["TextContentArea-h"]} min="0" max="800" step="1" 
            onChange={(event) => {
                setTxtFrameObj({...txtFrameObj, "TextContentArea-h": event.target.value});    
            }}
                ></input>{txtFrameObj["TextContentArea-h"]}            
        </div>}
    </div>

    <br></br>

    2.5 Text Options:<br></br>
    Auto & Fast & Log<br></br>
    Horizontal / Vertical Direction <br></br>
    group position X <br></br>
    group position Y <br></br>
    pic/shape base
    

    <br></br><br></br><br></br>

    3. Menu System


    <br></br><input type="radio" value={isMenuStoryCore} checked={!isMenuStoryCore} onChange={()=>{
        setIsMenuStoryCore(false);
        setIgMenuBtnObj({...igMenuBtnObj, "buttonText": "←"});    
        sendMenuType("notStoryCore");
    }}
    ></input>
    <label onClick={()=>{
        setIsMenuStoryCore(false);
        setIgMenuBtnObj({...igMenuBtnObj, "buttonText": "←"});    
        sendMenuType("notStoryCore");

    }}
    >3.1 comprehensive experience</label>
    {!isMenuStoryCore && <div className="indentOne">
    <label>Text Content: </label><input value={igMenuBtnObj["buttonText"]} onChange={(event)=>{
            setIgMenuBtnObj({...igMenuBtnObj, "buttonText": event.target.value});
    }}></input>             

    </div>}


    <br></br><input type="radio" value={isMenuStoryCore} checked={isMenuStoryCore} onChange={()=>{
        setIsMenuStoryCore(true);
        setIgMenuBtnObj({...igMenuBtnObj, "buttonText": "Menu"});    
        sendMenuType("storyCore");

    }}
    ></input>
    <label onClick={()=>{
        setIsMenuStoryCore(true);        
        sendMenuType("storyCore");
        setIgMenuBtnObj({...igMenuBtnObj, "buttonText": "Menu"});        
}}
    >3.2: story core</label>
    {isMenuStoryCore && <div className="indentOne">
        <label>Text Content: </label><input value={igMenuBtnObj["buttonText"]} onChange={(event)=>{
            setIgMenuBtnObj({...igMenuBtnObj, "buttonText": event.target.value});
        }}></input>            

    </div>}

    <br></br><br></br><br></br>
    <div className="indentOne">
        <label>Corner Radius: </label>
            <input type="range" value={igMenuBtnObj["cornerRadius"]} min="0" max="20" step="1" onChange={(event)=>{
                    setIgMenuBtnObj({...igMenuBtnObj, "cornerRadius": event.target.value});
                }}></input><label>{igMenuBtnObj["cornerRadius"]}</label>
        {/* <br></br><label>Transparency: </label><input type="range" value={igMenuBtnObj["transparency"]} type="range" min="0" max="1" step="0.1" onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "transparency": event.target.value});
            }}></input><label>{igMenuBtnObj["transparency"]}</label> */}
        <br></br>Width: <input type="range" value={igMenuBtnObj["width"]} type="range" min="0" max="300" step="1" onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "width": event.target.value});
            }}></input>
            <input type="number" value={igMenuBtnObj["width"]} min="0" max="300" step="1" onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "width": event.target.value});
            }}></input>
        <br></br>Height: <input type="range" value={igMenuBtnObj["height"]} type="range" min="0" max="300" step="1" onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "height": event.target.value});
            }}></input>
            <input type="number" value={igMenuBtnObj["height"]} min="0" max="300" step="1" onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "height": event.target.value});
            }}></input>
        <br></br><label>Border Size: </label>
            <input type="range" value={igMenuBtnObj["borderSize"]} min="0" max="3" step="1" onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "borderSize": event.target.value});
                }}></input>
            <label>{igMenuBtnObj["borderSize"]}</label>

        <br></br><label>Border Color: </label>
        <input type="color" value={igMenuBtnObj["borderColor"]} onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "borderColor": event.target.value});           
            }}></input>
        <label> {igMenuBtnObj["borderColor"]}</label>

        <br></br><label>Button Looking:</label>
        <br></br><input type="radio" value={igMenuBtnObj["isShape"]} checked={igMenuBtnObj["isShape"]} onChange={()=>{
                setIgMenuBtnObj({...igMenuBtnObj, "isShape": true});
            }}></input><label onClick={()=>{
                setIgMenuBtnObj({...igMenuBtnObj, "isShape": true});
                }}>Rectangle: </label>
        {igMenuBtnObj["isShape"] && <><input type="color" value={igMenuBtnObj["bgColor"]} onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "bgColor": event.target.value});
            }}></input><label>{igMenuBtnObj["bgColor"]}</label></>}
        
        <br></br><input type="radio" value={igMenuBtnObj["isShape"]} checked={!igMenuBtnObj["isShape"]} onChange={()=>{
            setIgMenuBtnObj({...igMenuBtnObj, "isShape": false});
            }}></input><label onClick={()=>{setIgMenuBtnObj({...igMenuBtnObj, "isShape": false});}}>Base Picture: </label>
        {!igMenuBtnObj["isShape"] && <>
                <select value={igMenuBtnObj["picVar"]} onChange={(event)=>{
                            setIgMenuBtnObj({...igMenuBtnObj,  "picVar": event.target.value, "picUrl": visualMap[event.target.value]["url"]}); 
                }}>                    
                    <option key="idvBackButton" value="">-- Select Resource --</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "backtButton" + currKey;
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            return (
                                <option value={currKey} key={keyName}>{visualMap[currKey]["var"]}</option>
                            );
                    })}
                </select><button onClick={() => {openRm();}}>Resource Adding</button>
        </>}
        <br></br><label>Text Color: </label><input type="color" value={igMenuBtnObj["textColor"]} onChange={(event)=>{
                setIgMenuBtnObj({...igMenuBtnObj, "textColor": event.target.value});
            }}></input><label> {igMenuBtnObj["textColor"]}</label>
        <br></br><label>Text Size:</label>
            <input type="range" value={igMenuBtnObj["textSize"]}
                onChange={(event)=>{ setIgMenuBtnObj({...igMenuBtnObj, "textSize": event.target.value});}}
            ></input>

        <br></br><label>Position X:</label>
            <input type="range" value={igMenuBtnObj["posX"]}
                onChange={(event)=>{
                    setIgMenuBtnObj({...igMenuBtnObj, "posX": event.target.value});                   
                }}
                min="0" max="800" step="1" 
            ></input>
            <input type="number" value={igMenuBtnObj["posX"]}
                onChange={(event)=>{
                    setIgMenuBtnObj({...igMenuBtnObj, "posX": event.target.value});                   
                }} 
                min="0" max="800" step="1"            
            ></input>

        <br></br><label>Position Y:</label>
            <input type="range" value={igMenuBtnObj["posY"]}
                onChange={(event)=>{
                    setIgMenuBtnObj({...igMenuBtnObj, "posY": event.target.value});                   
                }}            
                min="0" max="800" step="1" 
            ></input>
            <input type="number" value={igMenuBtnObj["posY"]}
                onChange={(event)=>{
                    setIgMenuBtnObj({...igMenuBtnObj, "posY": event.target.value});                   
                }}           
                min="0" max="800" step="1"  
            ></input>

    </div>
    
    <br></br><button>Save</button>
</div>

);



}