import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';

export default function GameUISetter({openRm}) {
    //TODO at previous layer, keep unsaved-local setting data locally, so that switching doesn't trigger cloud-db operations
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {
            fetchProjResourceLists();
            setFirstTimeEnter(false);
        }
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
    const [idvButtonBgPicUrl, setIdvButtonBgPicUrl] = useState("");
    const [idvButtonBgPicRotated, setIdvButtonBgPicRotated] = useState(false);

    //TODO current: defualt-reset when start rendering this component
    //TODO later: fetch from cloud-db for setting records
    const [defaultButtonObj, setDefaultButtonObj] = useState({
        "widthMin": 200,
        "widthMax": 700,
        "height": 20,
        "cornerRadius": 0,
        "transparency": 0.9,
        "isShape": false,
        "bgColor": "#a8d1d6",
        "picVar": "",
        "textColor": "#000000",
        "margin": 5,
        "justifyContent": "start",
        "alignItems": "center",
        "border": "2px solid #000000"
    });

    const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content"];

    const [txtFrameW, setTxtFrameW] = useState(200);
    const [txtFrameH, setTxtFrameH] = useState(500);
    const [txtFrameX, setTxtFrameX] = useState(100);
    const [txtFrameY, setTxtFrameY] = useState(100);
    const [txtFrameCnrRadius, setTxtFrameCnrRadius] = useState(0);
    const [txtFrameTransparency, setTxtFrameTransparency] = useState(90);
    const [txtFrameIsShape, setTxtFrameIsShape] = useState(true);
    const [txtFrameColor, setTxtFrameColor] = useState("#a8d1d6");
    const [txtFramePicVar, setTxtFramePicVar] = useState("");
    const [txtFrameFontName, setTxtFrameFontName] = useState(0);
    const [txtFrameFontSize, setTxtFrameFontSize] = useState(12);
    const [txtFrameTextColor, setTxtFrameTextColor] = useState("#000000");

    const [txtFrameObj, setTxtFrameObj] = useState(
        {"width": 200,
        "height": 500,
        "positionX": 100,
        "positionY": 100,
        "cornerRadius": 0,
        "transparency": 0.9,
        "isShape": true,
        "bgColor": "#a8d1d6",
        "picVar": "",
        "fontName": "",
        "fontSize": 12,
        "textColor": "#000000",
        "justifyContent": "start",
        "alignItems": "start",
        "border": "2px solid #000000"
    }
    );


    const [igsidebarBackBtnBorderColor, setIgsidebarBackBtnBorderColor] = useState("#000000");
    const [igsidebarBackBtnBorderSize, setIgsidebarBackBtnBorderSize] = useState("2");

    const [igsidebarBackBtnObj, setIgsidebarBackBtnObj] = useState(
        {"width": 50,
        "height": 50,
        "positionX": 100,
        "positionY": 100,
        "cornerRadius": 0,
        "transparency": 0.9,
        "isShape": false,
        "bgColor": "#a8d1d6",
        "picVar": "",
        "textColor": "#000000"}
    );

    const [backButtonTextSample, setBackButtonTextSample] = useState("<-");


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

    1. Individual Button Look, Defualt

        <div className="indentOne">
        <br></br>Min-Width: <input type="range" value={defaultButtonObj["widthMin"]} min="0" max="1200" step="1" onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "widthMin": event.target.value});
        }}></input><input value={defaultButtonObj["widthMin"]} min="0" max="1200" step="1" type="number" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "widthMin": event.target.value});}}></input>
        <br></br>Max-Width: <input type="range" value={defaultButtonObj["widthMax"]} min="0" max="1200" step="1" onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "widthMax": event.target.value});
            }}></input><input value={defaultButtonObj["widthMax"]} min="0" max="1200" step="1" type="number" onChange={(event)=>{            setDefaultButtonObj({...defaultButtonObj,  "widthMax": event.target.value});
        }}></input>
        <br></br>Height: <input type="range" value={defaultButtonObj["height"]} min="0" max="80" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj, "height": event.target.value});}}></input><input type="number" value={defaultButtonObj["height"]} min="0" max="1200" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "height": event.target.value});}}></input>
        <br></br><label>Corner Radius: </label>
        <input type="range" value={defaultButtonObj["cornerRadius"]} min="0" max="20" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "cornerRadius": event.target.value});}}></input><label>{defaultButtonObj["cornerRadius"]}</label>
        <br></br><label>Transparency: </label><input type="range" value={defaultButtonObj["transparency"]} min="0" max="1" step="0.1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "transparency": event.target.value});}}></input><label>{defaultButtonObj["transparency"]}</label>
        <br></br><label>Text Color: </label><input type="color" value={defaultButtonObj["textColor"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "textColor": event.target.value});}}></input><label> {defaultButtonObj["textColor"]}</label>
        <br></br><label>Text Horizontal Position: </label>
            <select value={defaultButtonObj["justifyContent"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "justifyContent": event.target.value});}}>
                <option value="center" key="defaultButtonTextAlignCenter">Center</option>
                <option value="start" key="defaultButtonTextAlignLeft">Left</option>
            </select>
        <br></br><label>Text Vertical Position: </label>
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
                            setDefaultButtonObj({...defaultButtonObj,  "picVar": event.target.value}); 
                            setIdvButtonBgPicUrl(visualMap[event.target.value]["url"]);  
                
                }}>
                    
                    <option key="idvDefault" value="">-- Select Resource --</option>
                    {Object.keys(visualMap).map((currKey) => {
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */

                            return (
                                <option value={currKey} key={currKey}>{visualMap[currKey]["var"]}</option>
                            );
                    })}
                </select><button onClick={() => {openRm();}}>Resource Adding</button>
                <div className="indentOne">               
                    <input type="checkbox" value={idvButtonBgPicRotated} checked={idvButtonBgPicRotated} onChange={(event)=>{setIdvButtonBgPicRotated(!idvButtonBgPicRotated);}}></input><label> Rotate Picture for 90 degrees</label>
                </div>
                </>}
        <br></br><label>Gap between buttons: </label>
        <input type="range" value={defaultButtonObj["margin"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "margin": event.target.value});
        }}
            min="0" max="100" step="1"
        ></input>{defaultButtonObj["margin"]}
    </div>

    <br></br><br></br><br></br>
    *Default Button Preview Area*
    <div className="buttonPreviewArea">              
            {defaultButtonTextSampleArr.map((item, index)=>{
                let currId = "defaultButtonDiv" + index;
                return (
                <div id={currId} key={index} style={
                    defaultButtonObj["isShape"] === true ? {   
                        "background": defaultButtonObj["bgColor"],
                        
                        "height": `${defaultButtonObj["height"]}px`,
                        "border-radius": `${defaultButtonObj["cornerRadius"]}px`,
                        "color": defaultButtonObj["textColor"],
                        "opacity": defaultButtonObj["transparency"],
                        "border": `${defaultButtonObj["border"]}`,
                        "margin-bottom": `${defaultButtonObj["margin"]}px`,
                        "padding-left": `10px`,
                        "justify-content": defaultButtonObj["justifyContent"],
                        "align-items": defaultButtonObj["alignItems"],
                        
                        "display": "flex",
                        "cursor": "pointer",
                        "user-select": "none",
                        "transition": "all 0.2s ease-out"
                    } : {"background-image": `url('${idvButtonBgPicUrl}')`,
                        "background-size": idvButtonBgPicRotated? `${defaultButtonObj["widthMax"]}px ${defaultButtonObj["height"]}px` : `${defaultButtonObj["height"]}px ${defaultButtonObj["widthMax"]}px`,
        
                        "height": `${defaultButtonObj["height"]}px`,
                        "border-radius": `${defaultButtonObj["cornerRadius"]}px`,
                        "color": defaultButtonObj["textColor"],
                        "opacity": defaultButtonObj["transparency"],
                        "border": `${defaultButtonObj["border"]}`,
                        "margin-bottom": `${defaultButtonObj["margin"]}px`,
                        "padding-left": `10px`,
                        "justify-content": defaultButtonObj["justifyContent"],
                        "align-items": defaultButtonObj["alignItems"],
                        
                        "display": "flex",
                        "cursor": "pointer",
                        "user-select": "none",
                        "transition": "all 0.2s ease-out"
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
        




    </div>

    <br></br><br></br>
    <br></br>Back Button: 
    <div className="indentOne">
        <label>Corner Radius: </label>
            <select value={igsidebarBackBtnObj["cornerRadius"]} onChange={(event)=>{
                    setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "cornerRadius": event.target.value});
                }}>
                <option value="0" key="0igsBbtn">-- Select Radius (default 0) --</option>
                <option value="1" key="1igsBbtn">1</option>
                <option value="5" key="5igsBbtn">5</option>
            </select>
        <br></br><label>Transparency: </label><input type="range" value={igsidebarBackBtnObj["transparency"]} type="range" min="0" max="1" step="0.1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "transparency": event.target.value});
            }}></input><label>{igsidebarBackBtnObj["transparency"]}</label>
        <br></br><label>Font Color: </label><input type="color" value={igsidebarBackBtnObj["textColor"]} onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "textColor": event.target.value});
            }}></input><label>{igsidebarBackBtnObj["textColor"]}</label>
        <br></br>Position X: <input value={igsidebarBackBtnObj["positionX"]} type="range" min="0" max="1200" step="1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "positionX": event.target.value});
            }}></input><input type="number" value={igsidebarBackBtnObj["positionX"]} min="0" max="1200" step="1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "positionX": event.target.value});
            }}></input>
        <br></br>Position Y: <input value={igsidebarBackBtnObj["positionY"]} type="range" min="0" max="1200" step="1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "positionY": event.target.value});
            }}></input><input type="number" value={igsidebarBackBtnObj["positionY"]} min="0" max="1200" step="1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "positionY": event.target.value});
                }}></input>
        <br></br>Width: <input type="range" value={igsidebarBackBtnObj["width"]} type="range" min="0" max="300" step="1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "width": event.target.value});
            }}></input>
            <input type="number" value={igsidebarBackBtnObj["width"]} min="0" max="300" step="1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "width": event.target.value});
            }}></input>
        <br></br>Height: <input type="range" value={igsidebarBackBtnObj["height"]} type="range" min="0" max="300" step="1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "height": event.target.value});
            }}></input>
            <input type="number" value={igsidebarBackBtnObj["height"]} min="0" max="300" step="1" onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "height": event.target.value});
            }}></input>
        <br></br><label>Border Size: </label>
            <input type="range" value={igsidebarBackBtnBorderSize} min="0" max="3" step="1" onChange={(event)=>{setIgsidebarBackBtnBorderSize(event.target.value);}}></input>
            <label>{igsidebarBackBtnBorderSize}</label>

        <br></br><label>Border Color: </label>
        <input type="color" value={igsidebarBackBtnBorderColor} onChange={(event)=>{setIgsidebarBackBtnBorderColor(event.target.value);}}></input>
        <label>{igsidebarBackBtnBorderColor}</label>

        <br></br><label>Button Looking:</label>
        <br></br><input type="radio" value={igsidebarBackBtnObj["isShape"]} checked={igsidebarBackBtnObj["isShape"]} onChange={()=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "isShape": true});
            }}></input><label onClick={()=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "isShape": true});
                }}>Rectangle: </label>
        {igsidebarBackBtnObj["isShape"] && <><input type="color" value={igsidebarBackBtnObj["bgColor"]} onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "bgColor": event.target.value});
            }}></input><label>{igsidebarBackBtnObj["bgColor"]}</label></>}
        <br></br><input type="radio" value={igsidebarBackBtnObj["isShape"]} checked={!igsidebarBackBtnObj["isShape"]} onChange={()=>{setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "isShape": false});}}></input><label onClick={()=>{setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "isShape": false});}}>Base Picture: </label>
        {!igsidebarBackBtnObj["isShape"] && <>
            <select value={igsidebarBackBtnObj["picVar"]} onChange={(event)=>{
                setIgsidebarBackBtnObj({...igsidebarBackBtnObj, "picVar": event.target.value});
            }}>
                <option key="igsidebarBackBtnDefault" value="">-- Select Resource --</option>
            </select>
        <button onClick={() => {openRm()}}>Resource Adding</button>
        <br></br><label>Text Content: </label><input value={backButtonTextSample} onChange={(event)=>{setBackButtonTextSample(event.target.value);}}></input>
        </>}
        <br></br><br></br><br></br>
        *Back Button Preview Area*

        <div className="buttonPreviewArea2">

                <div id="backButtonDiv" key="backButtonPreview"
                    style={igsidebarBackBtnObj["isShape"] === true ?{
                        "background": igsidebarBackBtnObj["bgColor"],

                        "width": `${igsidebarBackBtnObj["width"]}px`,
                        "height": `${igsidebarBackBtnObj["height"]}px`,
                        "top": `${igsidebarBackBtnObj["positionX"]}px`,
                        "left": `${igsidebarBackBtnObj["positionY"]}px`,
                        "color": igsidebarBackBtnObj["textColor"],
                        "border-radius": `${igsidebarBackBtnObj["cornerRadius"]}px`,
                        "opacity": igsidebarBackBtnObj["transparency"],

                        "justify-content": "center",
                        "align-items": "center",                        
                        "display": "flex",
                        "border": `${igsidebarBackBtnBorderSize}px solid ${igsidebarBackBtnBorderColor}`,
                        "cursor": "pointer",
                        "user-select": "none",
                        "transition": "all 0.2s ease-out"
                    } : {
                        "background-image": `url('')`,
                        "background-size": true ? `${igsidebarBackBtnObj["width"]}px ${igsidebarBackBtnObj["height"]}px` : `${igsidebarBackBtnObj["height"]}px ${igsidebarBackBtnObj["width"]}px`,
                
                        "width": `${igsidebarBackBtnObj["width"]}px`,
                        "height": `${igsidebarBackBtnObj["height"]}px`,
                        "top": `${igsidebarBackBtnObj["positionX"]}px`,
                        "left": `${igsidebarBackBtnObj["positionY"]}px`,
                        "color": igsidebarBackBtnObj["textColor"],
                        "border-radius": `${igsidebarBackBtnObj["cornerRadius"]}px`,
                        "opacity": igsidebarBackBtnObj["transparency"],

                        "justify-content": "center",
                        "align-items": "center",
                        "display": "flex",
                        "border": `${igsidebarBackBtnBorderSize}px solid ${igsidebarBackBtnBorderColor}`,
                        "cursor": "pointer",
                        "user-select": "none",
                        "transition": "all 0.2s ease-out"
                    }}

                   
                    onMouseDown={
                        ()=>{
                            document.getElementById("backButtonDiv").style.filter = "invert(100%)";
                        }
                        }
                    onMouseUp={
                        ()=>{
                            document.getElementById("backButtonDiv").style.filter = "invert(0%)";
                        }
                    }
                >
                {backButtonTextSample}
                </div>
 
        </div>
    </div>
   


    <br></br><br></br><br></br>
    2. Text Frame
    <br></br>Width: <input type="range" value={txtFrameW} min="0" max="1200" step="1" onChange={(event)=>{setTxtFrameW(event.target.value);;}}></input><input value={txtFrameW} type="number" min="0" max="1200" step="1" onChange={(event)=>{setTxtFrameW(event.target.value);;}}></input>
    <br></br>Height: <input type="range" value={txtFrameH} min="0" max="1200" step="1" onChange={(event)=>{setTxtFrameH(event.target.value);}}></input><input type="number" value={txtFrameH} min="0" max="1200" step="1" onChange={(event)=>{setTxtFrameH(event.target.value);}}></input>
    <br></br>Position X: <input type="range" value={txtFrameX} min="0" max="1200" step="1" onChange={(event)=>{setTxtFrameX(event.target.value);}}></input><input type="number" value={txtFrameX} min="0" max="1200" step="1" onChange={(event)=>{setTxtFrameX(event.target.value);}}></input>
    <br></br>Position Y: <input type="range" value={txtFrameY} min="0" max="1200" step="1" onChange={(event)=>{setTxtFrameY(event.target.value);}}></input><input type="number" value={txtFrameY} min="0" max="1200" step="1" onChange={(event)=>{setTxtFrameY(event.target.value);}}></input>
    <br></br><label>Corner Radius: </label>
        <select onChange={(event)=>{setTxtFrameCnrRadius(event.target.value);}} value={txtFrameCnrRadius}>
            <option value="0" key="0tf">-- Corner Radius (default 0)--</option>
            <option value="1" key="1tf">1</option>
            <option value="5" key="5tf">5</option>
        </select>
    <br></br><label>Transparency: </label><input type="range" value={txtFrameTransparency} min="0" max="100" step="1" onChange={(event)=>{setTxtFrameTransparency(event.target.value);}}></input><label>{txtFrameTransparency}%</label>

    <br></br><input type="radio" value={txtFrameIsShape} checked={txtFrameIsShape} onChange={()=>{setTxtFrameIsShape(true);}}></input><label onClick={()=>{setTxtFrameIsShape(true);}}>Rectangle: </label>
        {txtFrameIsShape && <><input type="color" value={txtFrameColor} onChange={(event)=>{setTxtFrameColor(event.target.value);}}></input><label>{txtFrameColor}</label></>}
    <br></br><input type="radio" value={txtFrameIsShape} checked={!txtFrameIsShape} onChange={()=>{setTxtFrameIsShape(false);}}></input><label onClick={()=>{setTxtFrameIsShape(false);}}>Base Picture </label>
        {!txtFrameIsShape && <><select value={txtFramePicVar} onChange={(event)=>{setTxtFramePicVar(event.target.value);}}><option key="tfvDefault" value="">-- Select Resource --</option></select>
        <button onClick={() => {openRm()}}>Resource Adding</button></>}

    <br></br><label>Font: </label>
    <select value={txtFrameFontName} onChange={(event)=>{setTxtFrameFontName(event.target.value);}}>
        <option key="fontDefault" value="default">-- Select Font --</option>
    </select>
    
    <br></br><label>Font Size: </label><input type="range" value={txtFrameFontSize} min="0" max="32" step="1" onChange={(event)=>{setTxtFrameFontSize(event.target.value);}}></input><input type="number" value={txtFrameFontSize} min="0" max="32" step="1" onChange={(event)=>{setTxtFrameFontSize(event.target.value);}}></input>
    <br></br><label>Font Color: </label><input type="color" value={txtFrameTextColor} onChange={(event)=>{setTxtFrameTextColor(event.target.value);}}></input><label>{txtFrameTextColor}</label>

    <br></br><br></br><br></br>

    3. In-game Side-bar
 
    <br></br><label>Menu Option: </label>  
    <div className="indentOne">
        Position X: <input type="range" value={igsidebarMenuPosX} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarMenuPosX(event.target.value);}}></input><input type="number" value={igsidebarMenuPosX} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarMenuPosX(event.target.value);}}></input>
        <br></br>
        Position Y: <input type="range" value={igsidebarMenuPosY} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarMenuPosY(event.target.value);}}></input><input type="number" value={igsidebarMenuPosY} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarMenuPosY(event.target.value);}}></input>
        <br></br>
        <label>Width: </label><input type="range" value={igsidebarMenuW} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarMenuW(event.target.value);}}></input><input type="number" value={igsidebarMenuW} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarMenuW(event.target.value);}}></input><br></br>
        <label>Height: </label><input type="range" value={igsidebarMenuH} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarMenuH(event.target.value);}}></input><input type="number" value={igsidebarMenuH} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarMenuH(event.target.value);}}></input><br></br>
        <label>Transparency: </label><input type="range" value={igsidebarMenuTransparency} min="0" max="100" step="1" onChange={(event)=>{setIgsidebarMenuTransparency(event.target.value);}}></input><label>{igsidebarMenuTransparency}%</label><br></br>
        <label>Font Color: </label><input type="color" value={igsidebarMenuTextColor} onChange={(event)=>{setIgsidebarMenuTextColor(event.target.value);}}></input><label>{igsidebarMenuTextColor}</label>
        <br></br>       
        <label>Corner Radius: </label>
            <select value={igsidebarMenuCnrRadius} onChange={(event)=>{setIgsidebarMenuCnrRadius(event.target.value);}}>
                <option value="0" key="0menu">0</option>
                <option value="1" key="1menu">1</option>
                <option value="5" key="5menu">5</option>
            </select>
        <br></br>
        <input type="radio" value={igsidebarMenuIsShape} checked={igsidebarMenuIsShape} onChange={()=>{setIgsidebarMenuIsShape(true);}}></input><label onChange={()=>{setIgsidebarMenuIsShape(true);}}>Rectangle: </label>
        {igsidebarMenuIsShape === true && <><input type="color" value={igsidebarMenuColor} onChange={(event)=>{setIgsidebarMenuColor(event.target.value);}}></input><label>{igsidebarMenuColor}</label></>}
        <br></br>
        <input type="radio" value={igsidebarMenuIsShape} checked={!igsidebarMenuIsShape} onChange={()=>{setIgsidebarMenuIsShape(false);}}></input><label onChange={()=>{setIgsidebarMenuIsShape(false);}}>Base Picture: </label>
        {igsidebarMenuIsShape === false && <><select></select><button onClick={() => {openRm()}}>Resource Adding</button></>}
        
        <br></br><br></br><br></br>
        <input type="radio" value={igsidebarMenuIsSingleBtn} checked={igsidebarMenuIsSingleBtn} onChange={()=>{setIgsidebarMenuIsSingleBtn(true);}}></input><label onChange={()=>{setIgsidebarMenuIsSingleBtn(true);}}>Single Menu Option</label>
        <br></br>(single menu button: jump to pause page)

        <br></br>
        <input type="radio"  value={igsidebarMenuIsSingleBtn} checked={!igsidebarMenuIsSingleBtn} onChange={()=>{setIgsidebarMenuIsSingleBtn(false);}}></input><label onChange={()=>{setIgsidebarMenuIsSingleBtn(false);}}>Menu Option List</label>
        <div className="indentOne">
            <input type="checkbox" value={autoBtn} checked={autoBtn} onChange={()=>{setAutoBtn(!autoBtn);}}></input><label>Auto</label>
            <br></br>
            <input type="checkbox" value={saveBtn} checked={saveBtn} onChange={()=>{setSaveBtn(!saveBtn);}}></input><label>Save</label>
            <br></br>
            <input type="checkbox" value={loadBtn} checked={loadBtn} onChange={()=>{setLoadBtn(!loadBtn);}}></input><label>Load</label>
            <br></br>
            <input type="checkbox" value={settingsBtn} checked={settingsBtn} onChange={()=>{setSettingsBtn(!settingsBtn);}}></input><label>Settings</label>
            <br></br>
            <input type="checkbox" value={returnTitlePageBtn} checked={returnTitlePageBtn} onChange={()=>{setReturnTitlePageBtn(!returnTitlePageBtn);}}></input><label>Return to Title-Page</label>
            <br></br>
            <input type="checkbox" value={inGameDataBtn} checked={inGameDataBtn} onChange={()=>{setInGameDataBtn(!inGameDataBtn);}}></input><label>In-Game Data</label>
            <br></br>
            <input type="checkbox" value={dealBtn} checked={dealBtn} onChange={()=>{setDealBtn(!dealBtn);}}></input><label>Deal</label>
            <br></br>
            List Format: 
            <select value={igsidebarMenuIsListDirection} onChange={(event)=>{setIgsidebarMenuIsListDirection(event.target.value);}}>
                <option key="v" value="vertical">Vertical</option>    
                <option key="h" value="horizontal">Horizontal</option>    
            </select>
            <br></br><label>Padding: </label><input type="range" min="0" max="15" step="1" value={igsidebarMenuListPadding} onChange={(event)=>{setIgsidebarMenuListPadding(event.target.value);}}></input><input type="number" min="0" max="15" step="1" value={igsidebarMenuListPadding} onChange={(event)=>{setIgsidebarMenuListPadding(event.target.value);}}></input>
        </div>

    </div>

    <br></br><button>Save</button>
</div>

);



}