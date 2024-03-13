import * as React from 'react';
import { useState, useEffect } from 'react';

export default function GameUISetter({}) {

    const [idvButtonBorderColor, setIdvButtonBorderColor] = useState("#000000");
    const [idvButtonBorderSize, setIdvButtonBorderSize] = useState("2px");
    const [idvButtonBorderString, setIdvButtonBorderString] = useState("2px solid #000000");

    //TODO current: defualt-reset when start rendering this component
    const [defaultButtonObj, setDefaultButtonObj] = useState({
        "widthMin": 200,
        "widthMax": 700,
        "height": 20,
        "cornerRadius": 0,
        "transparency": 0.9,
        "isShape": true,
        "bgColor": "#a8d1d6",
        "picVar": "",
        "textColor": "#000000",
        "margin": 5,
        "justifyContent": "start",
        "alignItems": "start"
    });

    const buttonTextSample1 = "Sample1: Default Button";
    const buttonTextSample2 = "Sample2: Default Button, Longer Content";

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
        {"width": txtFrameW,
        "height": txtFrameH,
        "positionX": txtFrameX,
        "positionY": txtFrameY,
        "cornerRadius": txtFrameCnrRadius,
        "transparency": txtFrameTransparency,
        "isShape": txtFrameIsShape,
        "bgColor": txtFrameColor,
        "picVar": txtFramePicVar,
        "fontName": txtFrameFontName,
        "fontSize": txtFrameFontSize,
        "textColor": txtFrameTextColor}
    );

    const [igsidebarBackBtnCnrRadius, setIgsidebarBackBtnCnrRadius] = useState(0);
    const [igsidebarBackBtnTransparency, setIgsidebarBackBtnTransparency] = useState(90);
    const [igsidebarBackBtnPosX, setIgsidebarBackBtnPosX] = useState(100);
    const [igsidebarBackBtnPosY, setIgsidebarBackBtnPosY] = useState(100);
    const [igsidebarBackBtnW, setIgsidebarBackBtnW] = useState(100);
    const [igsidebarBackBtnH, setIgsidebarBackBtnH] = useState(100);
    const [igsidebarBackBtnIsShape, setIgsidebarBackBtnIsShape] = useState(true);
    const [igsidebarBackBtnColor, setIgsidebarBackBtnColor] = useState("#a8d1d6");
    const [igsidebarBackBtnPicVar, setIgsidebarBackBtnPicVar] = useState("");
    const [igsidebarBackBtnTextColor, setIgsidebarBackBtnTextColor] = useState("#000000");

    const [igsidebarBackBtnObj, setIgsidebarBackBtnObj] = useState(
        {"width": igsidebarBackBtnW,
        "height": igsidebarBackBtnH,
        "positionX": igsidebarBackBtnPosX,
        "positionY": igsidebarBackBtnPosY,
        "cornerRadius": igsidebarBackBtnCnrRadius,
        "transparency": igsidebarBackBtnTransparency,
        "isShape": igsidebarBackBtnIsShape,
        "bgColor": igsidebarBackBtnColor,
        "picVar": igsidebarBackBtnPicVar,
        "textColor": igsidebarBackBtnTextColor}
    );

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
    const [igsidebarMenuShade, setIgsidebarMenuShade] = useState("#a8d1d6");

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
        "bgColor": igsidebarMenuShade,
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

    useEffect(() => {
        console.log("TODO: update any object data..."); //TODO test
        
        // setTxtFrameObj({"width": txtFrameW,
        //     "height": txtFrameH,
        //     "positionX": txtFrameX,
        //     "positionY": txtFrameY,
        //     "cornerRadius": txtFrameCnrRadius,
        //     "transparency": txtFrameTransparency,
        //     "isShape": txtFrameIsShape,
        //     "bgColor": txtFrameColor,
        //     "picVar": txtFramePicVar,
        //     "fontName": txtFrameFontName,
        //     "fontSize": txtFrameFontSize,
        //     "textColor": txtFrameTextColor});
            
        // setIgsidebarBackBtnObj({"width": igsidebarBackBtnW,
        //     "height": igsidebarBackBtnH,
        //     "positionX": igsidebarBackBtnPosX,
        //     "positionY": igsidebarBackBtnPosY,
        //     "cornerRadius": igsidebarBackBtnCnrRadius,
        //     "transparency": igsidebarBackBtnTransparency,
        //     "isShape": igsidebarBackBtnIsShape,
        //     "bgColor": igsidebarBackBtnColor,
        //     "picVar": igsidebarBackBtnPicVar,
        //     "textColor": igsidebarBackBtnTextColor});
        
        // setIgsidebarMenuObj({"width": igsidebarMenuW,
        //     "height": igsidebarMenuH,
        //     "positionX": igsidebarMenuPosX,
        //     "positionY": igsidebarMenuPosY,
        //     "cornerRadius": igsidebarMenuCnrRadius,
        //     "transparency": igsidebarMenuTransparency,
        //     "isShape": igsidebarMenuIsShape,
        //     "bgColor": igsidebarMenuShade,
        //     "picVar": igsidebarMenuPicVar,
        //     "textColor": igsidebarMenuTextColor,
        //     "isSingleButton": igsidebarMenuIsSingleBtn,
        //     "listItemPadding": igsidebarMenuListPadding,
        //     "listDirection": igsidebarMenuIsListDirection,
        //     "autoOption": autoBtn,
        //     "saveGameOption": saveBtn,
        //     "loadGameOption": loadBtn,
        //     "settingsOption": settingsBtn,
        //     "returnToTitleOption": returnTitlePageBtn,
        //     "inGameDataOption": inGameDataBtn,
        //     "dealOption": dealBtn});  
            
        // setIdvButtonStyle({
        //     "height": defaultButtonObj["height"],
        //     "border-radius": defaultButtonObj["cornerRadius"],
        //     "color": defaultButtonObj["textColor"],
        //     "opacity": defaultButtonObj["transparency"]/100,
        //     "border": idvButtonBorderString
        // })
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
        <br></br><label>Text Color: </label><input type="color" value={defaultButtonObj["textColor"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "textColor": event.target.value});}}></input><label>{defaultButtonObj["textColor"]}</label>
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
        <br></br><label>Button Looking: </label>
        <br></br><input type="radio" value={defaultButtonObj["isShape"]} checked={defaultButtonObj["isShape"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "isShape": true});
            //TODO setup to-record-style-data for is-shape-base
            
        }}></input><label onClick={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "isShape": true});;}}>Rectangle: </label>
            {defaultButtonObj["isShape"] && <><input type="color" value={defaultButtonObj["bgColor"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "bgColor": event.target.value});}}></input><label>{defaultButtonObj["bgColor"]}</label></>}
            
        <br></br><input type="radio" value={defaultButtonObj["isShape"]} checked={!defaultButtonObj["isShape"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "isShape": false});
            //TODO setup to-record-style-data for is-picture-base

        }}></input><label onClick={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "isShape": false});;}}>Base Picture: </label>
            {!defaultButtonObj["isShape"] && <><select value={defaultButtonObj["picVar"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "picVar": event.target.value});}}><option key="idvDefault" value="">-- Select Resource --</option></select><button>Resource Adding</button></>}
        <br></br><label>Gap between buttons: </label>
        <input type="range" value={defaultButtonObj["margin"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "margin": event.target.value});
        }}
            min="0" max="100" step="1"
        ></input>
        {defaultButtonObj["margin"]}

    </div>
    <div className="buttonPreviewArea">
        *Default Button Preview Area*
        {defaultButtonObj["isShape"] === true && <div style={
            {   
                "background": defaultButtonObj["bgColor"],
                "height": `${defaultButtonObj["height"]}px`,
                "border-radius": `${defaultButtonObj["cornerRadius"]}px`,
                "color": defaultButtonObj["textColor"],
                "opacity": defaultButtonObj["transparency"],
                "border": idvButtonBorderString,
                "margin-bottom": `${defaultButtonObj["margin"]}px`,
                "padding-left": `10px`,
                "justify-content": defaultButtonObj["justifyContent"],
                "display": "flex",
                "align-items": defaultButtonObj["alignItems"]
            }
        }>
            {buttonTextSample1}
        </div>}
        {defaultButtonObj["isShape"] === false && <div style={
            {   
                "height": `${defaultButtonObj["height"]}px`,
                "border-radius": `${defaultButtonObj["cornerRadius"]}px`,
                "color": defaultButtonObj["textColor"],
                "opacity": defaultButtonObj["transparency"],
                "border": idvButtonBorderString,
                "margin-bottom": `${defaultButtonObj["margin"]}px`,
                "padding-left": `10px`,
                "justify-content": defaultButtonObj["justifyContent"],
                "display": "flex",
                "align-items": defaultButtonObj["alignItems"]
            }
        }>
            {buttonTextSample1}
        </div>}

        <div style={
            {
                "height": `${defaultButtonObj["height"]}px`,
                "border-radius": `${defaultButtonObj["cornerRadius"]}px`,
                "color": defaultButtonObj["textColor"],
                "opacity": defaultButtonObj["transparency"],
                "border": idvButtonBorderString,
                "margin-bottom": `${defaultButtonObj["margin"]}px`,
                "padding-left": `10px`
            }
        }>
            {buttonTextSample2}
        </div>

    </div>

    <br></br><br></br>
    <br></br>Back Button: 
    <div className="indentOne">
        <label>Corner Radius: </label>
            <select value={igsidebarBackBtnCnrRadius} onChange={(event)=>{setIgsidebarBackBtnCnrRadius(event.target.value);}}>
                <option value="0" key="0igsBbtn">-- Select Radius (default 0) --</option>
                <option value="1" key="1igsBbtn">1</option>
                <option value="5" key="5igsBbtn">5</option>
            </select>
        <br></br><label>Transparency: </label><input type="range" value={igsidebarBackBtnTransparency} type="range" min="0" max="100" step="1" onChange={(event)=>{setIgsidebarBackBtnTransparency(event.target.value);}}></input><label>{igsidebarBackBtnTransparency}%</label>
        <br></br><label>Font Color: </label><input type="color" value={igsidebarBackBtnTextColor} onChange={(event)=>{setIgsidebarBackBtnTextColor(event.target.value);}}></input><label>{igsidebarBackBtnTextColor}</label>
        <br></br>Position X: <input value={igsidebarBackBtnPosX} type="range" min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarBackBtnPosX(event.target.value);}}></input><input type="number" value={igsidebarBackBtnPosX} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarBackBtnPosX(event.target.value);}}></input>
        <br></br>Position Y: <input value={igsidebarBackBtnPosY} type="range" min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarBackBtnPosY(event.target.value);}}></input><input type="number" value={igsidebarBackBtnPosY} min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarBackBtnPosY(event.target.value);}}></input>
        <br></br>Width: <input type="range" value={igsidebarBackBtnW} type="range" min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarBackBtnW(event.target.value);}}></input><input type="number" value={igsidebarBackBtnW} type="range" min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarBackBtnW(event.target.value);}}></input>
        <br></br>Height: <input type="range" value={igsidebarBackBtnH} type="range" min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarBackBtnH(event.target.value);}}></input><input type="number" value={igsidebarBackBtnH} type="range" min="0" max="1200" step="1" onChange={(event)=>{setIgsidebarBackBtnH(event.target.value);}}></input>
        <br></br><input type="radio" value={igsidebarBackBtnIsShape} checked={igsidebarBackBtnIsShape} onChange={()=>{setIgsidebarBackBtnIsShape(true);}}></input><label onClick={()=>{setIgsidebarBackBtnIsShape(true);}}>Rectangle: </label>
        {igsidebarBackBtnIsShape && <><input type="color" value={igsidebarBackBtnColor} onChange={(event)=>{setIgsidebarBackBtnColor(event.target.value);}}></input><label>{igsidebarBackBtnColor}</label></>}
        <br></br><input type="radio" value={igsidebarBackBtnIsShape} checked={!igsidebarBackBtnIsShape} onChange={()=>{setIgsidebarBackBtnIsShape(false);}}></input><label onClick={()=>{setIgsidebarBackBtnIsShape(false);}}>Base Picture: </label>
        {!igsidebarBackBtnIsShape && <>
            <select value={igsidebarBackBtnPicVar} onChange={(event)=>{setIgsidebarBackBtnPicVar(event.target.value);}}>
                <option key="igsidebarBackBtnDefault" value="">-- Select Resource --</option>
            </select>
        <button>Resource Adding</button></>}
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
        {!txtFrameIsShape && <><select value={txtFramePicVar} onChange={(event)=>{setTxtFramePicVar(event.target.value);}}><option key="tfvDefault" value="">-- Select Resource --</option></select><button>Resource Adding</button></>}

    <br></br><label>Font: </label>
    <select value={txtFrameFontName} onChange={(event)=>{setTxtFrameFontName(event.target.value);}}>
        <option key="fontDefault" value="default">-- Select Font --</option>
    </select>
    
    <br></br><label>Font Size: </label><input type="range" value={txtFrameFontSize} min="0" max="32" step="1" onChange={(event)=>{setTxtFrameFontSize(event.target.value);}}></input><input type="number" value={txtFrameFontSize} min="0" max="32" step="1" onChange={(event)=>{setTxtFrameFontSize(event.target.value);}}></input>
    <br></br><label>Font Shade: </label><input type="color" value={txtFrameTextColor} onChange={(event)=>{setTxtFrameTextColor(event.target.value);}}></input><label>{txtFrameTextColor}</label>

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
        {igsidebarMenuIsShape === true && <><input type="color" value={igsidebarMenuShade} onChange={(event)=>{setIgsidebarMenuShade(event.target.value);}}></input><label>{igsidebarMenuShade}</label></>}
        <br></br>
        <input type="radio" value={igsidebarMenuIsShape} checked={!igsidebarMenuIsShape} onChange={()=>{setIgsidebarMenuIsShape(false);}}></input><label onChange={()=>{setIgsidebarMenuIsShape(false);}}>Base Picture: </label>
        {igsidebarMenuIsShape === false && <><select></select><button>Resource Adding</button></>}
        
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
</div>);
}