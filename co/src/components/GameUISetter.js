import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';

export default function GameUISetter({openRm, iniDefaultButtonObj, iniTxtFrameObj, iniMenuButtonObj, iniConvNavObj, updateIsDisplayDefaultButtonPreview, updateDefaultButtonSettings, updateTextFrameUISettings, updateBackButtonSettings, updateConvNavSettings}) {
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


        updateConvNavSettings(); //TODO test

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

    const [convNav, setConvNav] = useState(iniConvNavObj);

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
        <br></br>Width: <input type="range" value={defaultButtonObj["widthMin"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "widthMin": event.target.value});
        }}></input><input value={defaultButtonObj["widthMin"]} min="0" max={screenWidth} step="1" type="number" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "widthMin": event.target.value});}}></input>
        {/* <br></br>Max-Width: <input type="range" value={defaultButtonObj["widthMax"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "widthMax": event.target.value});
            }}></input><input value={defaultButtonObj["widthMax"]} min="0" max={screenWidth} step="1" type="number" onChange={(event)=>{            setDefaultButtonObj({...defaultButtonObj,  "widthMax": event.target.value});
        }}></input> */}
        <br></br>Height: <input type="range" value={defaultButtonObj["height"]} min="0" max="80" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj, "height": event.target.value});}}></input><input type="number" value={defaultButtonObj["height"]} min="0" max={screenWidth} step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "height": event.target.value});}}></input>
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
            <select value={defaultButtonObj["alignItems"]} onChange={
                (event)=>{setDefaultButtonObj({...defaultButtonObj,  "alignItems": event.target.value})
                ;}}>
                <option value="center" key="defaultButtonAlignItemsCenter">Center</option>
                <option value="start" key="defaultButtonAlignItemsTop">Top</option>
                <option value="end" key="defaultButtonAlignItemsBottom">Bottom</option>
            </select>

        <br></br><label>Text Font: </label>
        <select value={defaultButtonObj["fontName"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "fontName": event.target.value})
        }}>
            <option value="sans-serif" key="deflBtn_sans-serif">sans-serif</option>
            <option value="serif" key="deflBtn_serif">serif</option>
            <option value="cursive" key="deflBtn_cursive">cursive</option>
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
                
                }}>Rectangle & Color Filled </label>
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
              }}>Base Picture </label>
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
                </select><button onClick={() => {openRm();}}>Manage Resource</button>
         
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
                    min="0" max={screenWidth} step="1"
                ></input>
                <input type="number" value={defaultButtonObj["groupX"]}
                    onChange={(event)=>{
                            setDefaultButtonObj({...defaultButtonObj,  "groupX": event.target.value, "horizontalMid": false});
                    }}
                    min="0" max={screenWidth} step="1"

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
                ></input><label onClick={()=>{
                    if (defaultButtonObj["horizontalMid"] === false) { // going to be true
                        //recalculate                            
                        let posX = (screenWidth - defaultButtonObj["widthMin"]) / 2 - 1;
                        setDefaultButtonObj({...defaultButtonObj,  "groupX": posX, "horizontalMid": !defaultButtonObj["horizontalMid"]});
                    } else {
                        setDefaultButtonObj({...defaultButtonObj,  "horizontalMid": !defaultButtonObj["horizontalMid"]});
                    }   
                }}>Horizontally Centered</label>
            </div>
        <br></br><label>Button Group PositionY: </label><br></br>
            <div className="indentOne">
   
                <input type="range" value={defaultButtonObj["groupY"]}
                    onChange={(event)=>{
                        setDefaultButtonObj({...defaultButtonObj,  "groupY": event.target.value, "verticalMid": false});
                    }}
                    min="0" max={screenWidth} step="1"
                
                ></input>
                <input type="number"  value={defaultButtonObj["groupY"]}
                    onChange={(event)=>{
                        setDefaultButtonObj({...defaultButtonObj,  "groupY": event.target.value, "verticalMid": false});
                    }}
                    min="0" max={screenWidth} step="1"
                   
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
                    } : {
                        "background-image": `url('${defaultButtonObj["picUrl"]}')`, //TODO improve later
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
                        document.getElementById(currId).style.filter = "brightness(130%)";
                    }
                }
                onMouseUp={
                    ()=>{
                        document.getElementById(currId).style.filter = "brightness(100%)";
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
    <br></br>Width: <input type="range" value={txtFrameObj["width"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            let posX = (screenWidth - txtFrameObj["width"]) / 2 - 1;
          
            setTxtFrameObj({...txtFrameObj, "positionX": posX, "width": event.target.value});

        }}></input><input value={txtFrameObj["width"]} type="number" min="0" max={screenWidth} step="1" onChange={(event)=>{
            let posX = (screenWidth - txtFrameObj["width"]) / 2;
            setTxtFrameObj({...txtFrameObj, "width": event.target.value, "positionX": posX});        
        }}></input>
    <br></br>Height: <input type="range" value={txtFrameObj["height"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
        setTxtFrameObj({...txtFrameObj, "height": event.target.value});    
        }}></input><input type="number" value={txtFrameObj["height"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "height": event.target.value});    
        }}></input>
    <br></br>Position Y: <input type="range" value={txtFrameObj["positionY"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "positionY": event.target.value});    
        }}></input><input type="number" value={txtFrameObj["positionY"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
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
            if (event.target.value === "") {
                setTxtFrameObj({...txtFrameObj, "picVar": event.target.value, "picUrl": ""});    
            } else {
                setTxtFrameObj({...txtFrameObj, "picVar": event.target.value, "picUrl": visualMap[event.target.value]["url"]});    
            }
            }}>
                <option key="tfvDefault" value="">-- Select Resource --</option>
                <option key="noPic" value="">(no picture)</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "tfvButton" + currKey;
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            return (
                <option value={currKey} key={keyName}>{visualMap[currKey]["var"]}</option>
                            );
                    })}
            </select>
        <button onClick={() => {openRm()}}>Manage Resource</button></>}

    <br></br><label>Font: </label>

    <select 
        value={txtFrameObj["fontName"]}
        onChange={(event)=>{
                setTxtFrameObj({...txtFrameObj,  "fontName": event.target.value});
            }}>
                <option value="sans-serif" key="txf_sans-serif">sans-serif</option>
                <option value="serif" key="txf_serif">serif</option>
                <option value="cursive" key="txf_cursive">cursive</option>
            </select>
  
    <br></br><label>Text Size: </label><input type="range" value={txtFrameObj["textSize"]} min="0" max="32" step="1" onChange={(event)=>{
        setTxtFrameObj({...txtFrameObj, "textSize": event.target.value});            
    }}></input><input type="number" value={txtFrameObj["textSize"]} min="0" max="32" step="1" onChange={(event)=>{setTxtFrameObj({...txtFrameObj, "textSize": event.target.value});}}></input>
    <br></br><label>Text Color: </label><input type="color" value={txtFrameObj["textColor"]} onChange={(event)=>{
        setTxtFrameObj({...txtFrameObj, "textColor": event.target.value});            
    }}></input><label> {txtFrameObj["textColor"]}</label>
    <br></br>Text Content Area:
    <div className="indentOne">
    <input type="radio" value={txtFrameContentAreaCentered} checked={txtFrameContentAreaCentered} onChange={()=>{setTxtFrameContentAreaCentered(!txtFrameContentAreaCentered);}}>
    </input><label onClick={()=>{setTxtFrameContentAreaCentered(!txtFrameContentAreaCentered);}}>Centered: </label>
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
        <input type="radio" value={txtFrameContentAreaCentered} checked={!txtFrameContentAreaCentered} onChange={()=>{setTxtFrameContentAreaCentered(!txtFrameContentAreaCentered);}}>
            </input>
            <label onClick={()=>{setTxtFrameContentAreaCentered(!txtFrameContentAreaCentered);}}>Customized: </label>
            {!txtFrameContentAreaCentered && <div className="indentOne">
                Text Content Area - x: <input type="range" value={txtFrameObj["TextContentArea-x"]} min="-200" max={screenWidth} step="1" 
                onChange={(event) => {
                    setTxtFrameObj({...txtFrameObj, "TextContentArea-x": event.target.value});    
                }}
                ></input>{txtFrameObj["TextContentArea-x"]}
                <br></br>
                Text Content Area - y: <input type="range" value={txtFrameObj["TextContentArea-y"]} min="-500" max={screenWidth} step="1" 
            onChange={(event) => {
                setTxtFrameObj({...txtFrameObj, "TextContentArea-y": event.target.value});    
            }}
                ></input>{txtFrameObj["TextContentArea-y"]}
                <br></br>
                Text Content Area - width: <input type="range" value={txtFrameObj["TextContentArea-w"]} min="0" max={screenWidth} step="1" 
            onChange={(event) => {
                setTxtFrameObj({...txtFrameObj, "TextContentArea-w": event.target.value});    
            }}
                ></input>{txtFrameObj["TextContentArea-w"]}
                <br></br>
                Text Content Area - height:  <input type="range" value={txtFrameObj["TextContentArea-h"]} min="0" max={screenWidth} step="1" 
            onChange={(event) => {
                setTxtFrameObj({...txtFrameObj, "TextContentArea-h": event.target.value});    
            }}
                ></input>{txtFrameObj["TextContentArea-h"]}            
        </div>}
    </div>

    <br></br>
    <br></br><br></br>

    3.Text Viewing Options:<br></br>
    <div className="indentOne">
        <label>Auto Toggle:</label>
        <div className="indentOne">
            <label>Unclicked:</label>
            <div className="indentOne">
                    <input type="radio" value={convNav["buttonAutoIsTextFont0"]}
                        checked={convNav["buttonAutoIsTextFont0"]} 
                        onChange={()=>{
                            setConvNav({...convNav,  "buttonAutoIsTextFont0": true});
                        }}></input><label
                        onClick={()=>{
                            setConvNav({...convNav,  "buttonAutoIsTextFont0": true});
                        }}
                        >Font Color: </label>
                    <br></br><input type="color" value={convNav["buttonAutoShade0"]} onChange={(event)=>{
                                setConvNav({...convNav,  "buttonAutoShade0": event.target.value});
                    }}></input>
                    <label> {convNav["buttonAutoShade0"]}</label>

                    <br></br>
                    <input type="radio" value={convNav["buttonAutoIsTextFont0"]} checked={!convNav["buttonAutoIsTextFont0"]}
                        onChange={()=>{
                            setConvNav({...convNav,  "buttonAutoIsTextFont0": false});
                        }}
                    ></input><label
                        onClick={()=>{
                            setConvNav({...convNav,  "buttonAutoIsTextFont0": false});
                        }}
                    >Base Picture: </label>
                    <select value={convNav["buttonAutoPicName0"]} onChange={(event)=>{
                        setConvNav({...convNav,  "buttonAutoPicName0": event.target.value});     
                    }}>                    
                            <option key="autoDefault0" value="">-- Select Resource --</option>
                            {Object.keys(visualMap).map((currKey) => {
                                    let keyName = "autoButton0" + currKey;
                                    return (
                                        <option value={currKey} key={keyName}>{visualMap[currKey]["var"]}</option>
                                    );
                            })}
                        </select><button onClick={() => {openRm();}}>Manage Resource</button>
                    <br></br>
                    <label>Display Text:</label>
                    <input></input>
                    <button>Update</button>
                    <br></br>
            </div>

            <label>Pressed:</label>
            <div className="indentOne">
                    <input type="radio" value={convNav["buttonAutoIsTextFont1"]}
                        checked={convNav["buttonAutoIsTextFont1"]} 
                        onChange={()=>{
                            setConvNav({...convNav,  "buttonAutoIsTextFont1": true});
                        }}></input><label
                        onClick={()=>{
                            setConvNav({...convNav,  "buttonAutoIsTextFont1": true});
                        }}
                        >Font Color: </label>
                    <br></br><input type="color" value={convNav["buttonAutoShade1"]} onChange={(event)=>{
                                setConvNav({...convNav,  "buttonAutoShade1": event.target.value});
                    }}></input>
                    <label> {convNav["buttonAutoShade1"]}</label>

                    <br></br>
                    <input type="radio" value={convNav["buttonAutoIsTextFont1"]} checked={!convNav["buttonAutoIsTextFont1"]}
                        onChange={()=>{
                            setConvNav({...convNav,  "buttonAutoIsTextFont1": false});
                        }}
                    ></input><label
                        onClick={()=>{
                            setConvNav({...txtFrameObj,  "buttonAutoIsTextFont1": false});
                        }}
                    >Base Picture: </label>
                    <select value={convNav["buttonAutoPicName1"]} onChange={(event)=>{
                        setConvNav({...convNav,  "buttonAutoPicName1": event.target.value});     
                    }}>                    
                            <option key="autoDefault1" value="">-- Select Resource --</option>
                            {Object.keys(visualMap).map((currKey) => {
                                    let keyName = "autoButton1" + currKey;
                                    return (
                                        <option value={currKey} key={keyName}>{visualMap[currKey]["var"]}</option>
                                    );
                            })}
                        </select><button onClick={() => {openRm();}}>Manage Resource</button>
                    <br></br>
                    <label>Display Text:</label>
                    <input></input>
                    <button>Update</button>
                    <br></br>
            </div>

          
            <label>Font:</label>
            <select value={convNav["buttonAutoFontName"]} onChange={(event)=>{
                setConvNav({...convNav,  "buttonAutoFontName": event.target.value});
            }}>
                <option value="sans-serif" key="autoBtn_sans-serif">sans-serif</option>
                <option value="serif" key="autoBtn_serif">serif</option>
                <option value="cursive" key="autoBtn_cursive">cursive</option>
            </select>

            <br></br>
            <input type="checkbox" 
                value={convNav["buttonAutoFontItalic"]} 
                checked={convNav["buttonAutoFontItalic"]}
                onChange={()=>{
                    let val = convNav["buttonAutoFontItalic"];
                    setConvNav({...convNav,  "buttonAutoFontItalic": !val});
                }}
            ></input><em>Italic</em>
        </div>

        <br></br><br></br>
        <label>Log Page Button:</label>
        <div className="indentOne">
        <input type="radio" value={convNav["buttonLogIsTextFont"]}
                checked={txtFrameObj["buttonLogIsTextFont"]} 
                onChange={()=>{
                    setConvNav({...convNav,  "buttonLogIsTextFont": true});
                }}></input><label
                onClick={()=>{
                    setConvNav({...convNav,  "buttonLogIsTextFont": true});
                }}
                >Font Color: </label>
            <br></br><input type="color" value={convNav["buttonLogShade"]} onChange={(event)=>{
                        setConvNav({...convNav,  "buttonLogShade": event.target.value});
            }}></input>
            <label> {convNav["buttonLogShade"]}</label>

            <br></br>
            <input type="radio" value={convNav["buttonLogIsTextFont"]} checked={!convNav["buttonLogIsTextFont"]}
                onChange={()=>{
                    setConvNav({...convNav,  "buttonLogIsTextFont": false});
                }}
            ></input><label
                onClick={()=>{
                    setConvNav({...convNav,  "buttonLogIsTextFont": false});
                }}
            >Base Picture: </label>
            <select value={convNav["buttonLogPicName"]} onChange={(event)=>{
                setConvNav({...convNav,   "buttonLogPicName": event.target.value});     
            }}>                    
                    <option key="logDefault" value="">-- Select Resource --</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "logButton" + currKey;
                            return (
                                <option value={currKey} key={keyName}>{visualMap[currKey]["var"]}</option>
                            );
                    })}
                </select><button onClick={() => {openRm();}}>Manage Resource</button>
            <br></br>
            <label>Display Text:</label>
            <input></input>
            <button>Update</button>
            <br></br>
            <label>Font:</label>
            <select 
                value={convNav["buttonLogFontName"]}
                onChange={(event)=>{
                    setConvNav({...convNav,  "buttonLogFontName": event.target.value});
            }}>
                <option value="sans-serif" key="logBtn_sans-serif">sans-serif</option>
                <option value="serif" key="logBtn_serif">serif</option>
                <option value="cursive" key="logBtn_cursive">cursive</option>
            </select>
            <br></br>
            <input type="checkbox" 
                value={convNav["buttonLogFontItalic"]} 
                checked={convNav["buttonLogFontItalic"]}
                onChange={()=>{
                    let val = convNav["buttonLogFontItalic"];
                    setConvNav({...convNav,  "buttonLogFontItalic": !val});
                }}
            ></input><em>Italic</em>

        </div>
        <br></br><br></br>
        <label>Default display Speed:</label>
        <div className="indentOne">
            <select value={convNav["textDisplaySpeed"]} 
            onChange={(event)=>{                
                setConvNav({...convNav, "textDisplaySpeed": event.target.value});    
            }}>
                <option key="textDisplaySpeed1" value="1">1</option>
                <option key="textDisplaySpeed2" value="2">2</option>
                <option key="textDisplaySpeed3" value="3">3</option>
                <option key="textDisplaySpeed4" value="4">4</option>
                <option key="textDisplaySpeed5" value="5">5</option>
            </select>
        </div>
     

    </div>
  
   

    <br></br><button>Save</button>
</div>

);



}