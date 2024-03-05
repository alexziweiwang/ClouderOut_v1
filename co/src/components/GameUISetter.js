import * as React from 'react';
import { useState, useEffect } from 'react';

export default function GameUISetter({}) {

    const [idvButtonMinW, setIdvButtonMinW] = useState(200);
    const [idvButtonMaxW, setIdvButtonMaxW] = useState(700);
    const [idvButtonHeight, setIdvButtonHeight] = useState(500);
    const [idvButtonCnrRadius, setIdvButtonCnrRadius] = useState(0);
    const [idvButtonTransparency, setIdvButtonTransparency] = useState(90);
    const [idvButtonIsShape, setIdvButtonIsShape] = useState(true);
    const [idvButtonColor, setIdvButtonColor] = useState("#000000");
    const [idvButtonPicVar, setIdvButtonPicVar] = useState("");

    const [txtFrameW, setTxtFrameW] = useState(200);
    const [txtFrameH, setTxtFrameH] = useState(500);
    const [txtFrameX, setTxtFrameX] = useState(100);
    const [txtFrameY, setTxtFrameY] = useState(100);
    const [txtFrameCnrRadius, setTxtFrameCnrRadius] = useState(0);
    const [txtFrameTransparency, setTxtFrameTransparency] = useState(90);
    const [txtFrameIsShape, setTxtFrameIsShape] = useState(true);
    const [txtFrameColor, setTxtFrameColor] = useState("#000000");
    const [txtFramePicVar, setTxtFramePicVar] = useState("");
    const [txtFrameFontName, setTxtFrameFontName] = useState(0);
    const [txtFrameFontSize, setTxtFrameFontSize] = useState(12);
    const [txtFrameFontColor, setTxtFrameFontColor] = useState("#000000");

    const [igsidebarBackBtnCnrRadius, setIgsidebarBackBtnCnrRadius] = useState(0);
    const [igsidebarBackBtnTransparency, setIgsidebarBackBtnTransparency] = useState(90);
    const [igsidebarBackBtnPosX, setIgsidebarBackBtnPosX] = useState(100);
    const [igsidebarBackBtnPosY, setIgsidebarBackBtnPosY] = useState(100);
    const [igsidebarBackBtnW, setIgsidebarBackBtnW] = useState(100);
    const [igsidebarBackBtnH, setIgsidebarBackBtnH] = useState(100);
    const [igsidebarBackBtnIsShape, setIgsidebarBackBtnIsShape] = useState(true);
    const [igsidebarBackBtnColor, setIgsidebarBackBtnColor] = useState("#000000");
    const [igsidebarBackBtnPicVar, setIgsidebarBackBtnPicVar] = useState("");

    const [igsidebarMenuPosX, setIgsidebarMenuPosX] = useState(100);
    const [igsidebarMenuPosY, setIgsidebarMenuPosY] = useState(100);
    const [igsidebarMenuW, setIgsidebarMenuW] = useState(100);
    const [igsidebarMenuH, setIgsidebarMenuH] = useState(100);
    const [igsidebarMenuIsSingleBtn, setIgsidebarMenuIsSingleBtn] = useState(true);
    const [igsidebarMenuListPadding, setIgsidebarMenuListPadding] = useState(1);

    const [autoBtn, setAutoBtn] = useState(true);
    const [saveBtn, setSaveBtn] = useState(true);
    const [loadBtn, setLoadBtn] = useState(true);
    const [settingsBtn, setSettingsBtn] = useState(true);
    const [returnTitlePageBtn, setReturnTitlePageBtn] = useState(true);
    const [inGameDataBtn, setInGameDataBtn] = useState(true);
    const [dealBtn, setDealBtn] = useState(true);


    return (<div className="guiSettings">
    1. Individual Button Look, Defualt

    <br></br>Min-Width: <input type="range" value={idvButtonMinW} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIdvButtonMinW(event.target.value);}}></input><input value={idvButtonMinW} min="0" max="1200" step="1" defaultValue="0" type="number" onChange={(event)=>{setIdvButtonMinW(event.target.value);}}></input>
    <br></br>Max-Width: <input type="range" value={idvButtonMaxW} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIdvButtonMaxW(event.target.value);}}></input><input value={idvButtonMaxW} min="0" max="1200" step="1" defaultValue="0" type="number" onChange={(event)=>{setIdvButtonMaxW(event.target.value);}}></input>
    <br></br>Height: <input type="range" value={idvButtonHeight} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIdvButtonHeight(event.target.value);}}></input><input type="number" value={idvButtonHeight} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIdvButtonHeight(event.target.value);}}></input>
    <br></br><label>Corner Radius: </label>
                                <select onChange={(event)=>{setIdvButtonCnrRadius(event.target.value);}} value={idvButtonCnrRadius}>
                                    <option value="0" key="0ib">-- Corner Radius (default 0)--</option>
                                    <option value="1" key="1ib">1</option>
                                    <option value="5" key="5ib">5</option>
                                </select>
    <br></br><label>Transparency: </label><input type="range" value={idvButtonTransparency} min="0" max="100" step="1" defaultValue="90" onChange={(event)=>{setIdvButtonTransparency(event.target.value);}}></input><label>{idvButtonTransparency}%</label>

    <br></br><input type="radio" value={idvButtonIsShape} checked={idvButtonIsShape} onChange={(event)=>{setIdvButtonIsShape(true);}}></input><label onClick={(event)=>{setIdvButtonIsShape(true);}}>Rectangle </label>
        {idvButtonIsShape && <><input type="color" value={idvButtonColor} onChange={(event)=>{setIdvButtonColor(event.target.value);}}></input><label>{idvButtonColor}</label></>}
        
    <br></br><input type="radio" value={idvButtonIsShape} checked={!idvButtonIsShape} onChange={(event)=>{setIdvButtonIsShape(false);}}></input><label onClick={(event)=>{setIdvButtonIsShape(false);}}>Base Picture </label>
        {!idvButtonIsShape && <><select value={idvButtonPicVar} onChange={(event)=>{setIdvButtonPicVar(event.target.value);}}><option key="idvDefault" value="">-- Select Resource --</option></select><button>Resource Adding</button></>}

    <br></br><br></br><br></br>
    2. Text Frame
    <br></br>Width: <input type="range" value={txtFrameW} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameW(event.target.value);;}}></input><input value={txtFrameW} type="number" min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameW(event.target.value);;}}></input>
        <br></br>Height: <input type="range" value={txtFrameH} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameH(event.target.value);}}></input><input type="number" value={txtFrameH} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameH(event.target.value);}}></input>
        <br></br>Position X: <input type="range" value={txtFrameX} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameX(event.target.value);}}></input><input type="number" value={txtFrameX} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameX(event.target.value);}}></input>
        <br></br>Position Y: <input type="range" value={txtFrameY} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameY(event.target.value);}}></input><input type="number" value={txtFrameY} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameY(event.target.value);}}></input>
        <br></br><label>Corner Radius: </label>
                                <select onChange={(event)=>{setTxtFrameCnrRadius(event.target.value);}} value={txtFrameCnrRadius}>
                                    <option value="0" key="0tf">-- Corner Radius (default 0)--</option>
                                    <option value="1" key="1tf">1</option>
                                    <option value="5" key="5tf">5</option>
                                </select>
        <br></br><label>Transparency: </label><input type="range" value={txtFrameTransparency} min="0" max="100" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameTransparency(event.target.value);}}></input><label>{txtFrameTransparency}%</label>

    <br></br><input type="radio" value={txtFrameIsShape} checked={txtFrameIsShape} onChange={()=>{setTxtFrameIsShape(true);}}></input><label onClick={()=>{setTxtFrameIsShape(true);}}>Rectangle: </label>
        {txtFrameIsShape && <><input type="color" value={txtFrameColor} onChange={(event)=>{setTxtFrameColor(event.target.value);}}></input><label>{txtFrameColor}</label></>}
    <br></br><input type="radio" value={txtFrameIsShape} checked={!txtFrameIsShape} onChange={()=>{setTxtFrameIsShape(false);}}></input><label onClick={()=>{setTxtFrameIsShape(false);}}>Base Picture </label>
        {!txtFrameIsShape && <><select value={txtFramePicVar} onChange={(event)=>{setTxtFramePicVar(event.target.value);}}><option key="tfvDefault" value="">-- Select Resource --</option></select><button>Resource Adding</button></>}


    <br></br><label>Font: </label>
        <select value={txtFrameFontName} onChange={(event)=>{setTxtFrameFontName(event.target.value);}}>
            <option key="fontDefault" value="default">-- Select Font --</option>
        </select>
    
    <br></br><label>Font Size: </label><input type="range" value={txtFrameFontSize} min="0" max="32" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameFontSize(event.target.value);}}></input><input type="number" value={txtFrameFontSize} min="0" max="32" step="1" defaultValue="0" onChange={(event)=>{setTxtFrameFontSize(event.target.value);}}></input>
    <br></br><label>Font Shade: </label><input type="color" value={txtFrameFontColor} onChange={(event)=>{setTxtFrameFontColor(event.target.value);}}></input><label>{txtFrameFontColor}</label>


    <br></br><br></br><br></br>

    3. In-game Side-bar
    <br></br>Back Button: 
    <div className="indentOne">
    <label>Corner Radius: </label>
        <select value={igsidebarBackBtnCnrRadius} onChange={(event)=>{setIgsidebarBackBtnCnrRadius(event.target.value);}}>
            <option value="0" key="0igsBbtn">-- Select Radius (default 0) --</option>
            <option value="1" key="1igsBbtn">1</option>
            <option value="5" key="5igsBbtn">5</option>
        </select>
        <br></br><label>Transparency: </label><input type="range" value={igsidebarBackBtnTransparency} type="range" min="0" max="100" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnTransparency(event.target.value);}}></input><label>{igsidebarBackBtnTransparency}</label>
    <br></br>Position X: <input value={igsidebarBackBtnPosX} type="range" min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnPosX(event.target.value);}}></input><input type="number" value={igsidebarBackBtnPosX} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnPosX(event.target.value);}}></input>
    <br></br>Position Y: <input value={igsidebarBackBtnPosY} type="range" min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnPosY(event.target.value);}}></input><input type="number" value={igsidebarBackBtnPosY} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnPosY(event.target.value);}}></input>
    <br></br>Width: <input type="range" value={igsidebarBackBtnW} type="range" min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnW(event.target.value);}}></input><input type="number" value={igsidebarBackBtnW} type="range" min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnW(event.target.value);}}></input>
    <br></br>Height: <input type="range" value={igsidebarBackBtnH} type="range" min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnH(event.target.value);}}></input><input type="number" value={igsidebarBackBtnH} type="range" min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarBackBtnH(event.target.value);}}></input>
    <br></br><input type="radio" value={igsidebarBackBtnIsShape} checked={igsidebarBackBtnIsShape} onChange={()=>{setIgsidebarBackBtnIsShape(true);}}></input><label onClick={()=>{setIgsidebarBackBtnIsShape(true);}}>Rectangle: </label>
    {igsidebarBackBtnIsShape && <><input type="color" value={igsidebarBackBtnColor} onChange={(event)=>{setIgsidebarBackBtnColor(event.target.value);}}></input><label>{igsidebarBackBtnColor}</label></>}
    <br></br><input type="radio" value={igsidebarBackBtnIsShape} checked={!igsidebarBackBtnIsShape} onChange={()=>{setIgsidebarBackBtnIsShape(false);}}></input><label onClick={()=>{setIgsidebarBackBtnIsShape(false);}}>Base Picture: </label>
    {!igsidebarBackBtnIsShape && <>
        <select value={igsidebarBackBtnPicVar} onChange={(event)=>{setIgsidebarBackBtnPicVar(event.target.value);}}>
            <option key="igsidebarBackBtnDefault" value="">-- Select Resource --</option>
        </select>
        <button>Resource Adding</button></>}
    </div>
    
    <br></br><labrl>Menu Option: </labrl>  
    <div className="indentOne">
    Position X: <input type="range" value={igsidebarMenuPosX} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarMenuPosX(event.target.value);}}></input><input type="number" value={igsidebarMenuPosX} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarMenuPosX(event.target.value);}}></input>
    <br></br>
    Position Y: <input type="range" value={igsidebarMenuPosY} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarMenuPosY(event.target.value);}}></input><input type="number" value={igsidebarMenuPosY} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarMenuPosY(event.target.value);}}></input>
    <br></br> 
    <label>Width: </label><input type="range" value={igsidebarMenuW} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarMenuW(event.target.value);}}></input><input type="number" value={igsidebarMenuW} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarMenuW(event.target.value);}}></input><br></br>
    <label>Height: </label><input type="range" value={igsidebarMenuH} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarMenuH(event.target.value);}}></input><input type="number" value={igsidebarMenuH} min="0" max="1200" step="1" defaultValue="0" onChange={(event)=>{setIgsidebarMenuH(event.target.value);}}></input><br></br>
    <label>Transparency: </label><input type="range"></input><label>[percent]</label>
    <br></br>        <label>Corner Radius: </label>
        <select>
            <option value="0" key="0">0</option>
            <option value="1" key="1">1</option>
            <option value="5" key="5">5</option>
        </select>
    <br></br><input type="radio"></input><label>Rectangle: </label>
    <input type="color"></input><label>[shade value]</label>
    <br></br>
    <input type="radio"></input><label>Base Picture</label><select></select><button>Resource Adding</button>
    
        <br></br><br></br>
    <br></br><input type="radio" value={igsidebarMenuIsSingleBtn} checked={igsidebarMenuIsSingleBtn} onChange={()=>{setIgsidebarMenuIsSingleBtn(true);}}></input><label>Single Menu Option</label>
    <br></br>(single menu button: jump to pause page)

    <br></br><input type="radio"  value={igsidebarMenuIsSingleBtn} checked={!igsidebarMenuIsSingleBtn} onChange={()=>{setIgsidebarMenuIsSingleBtn(false);}}></input><label>Menu Option List</label>
    <div className="indentOne">

    <p className="plans">
    autoBtn
    saveBtn
    loadBtn
    settingsBtn
    returnTitlePageBtn
    inGameDataBtn
    dealBtn
    </p>

        <input type="checkbox" value={autoBtn} checked={autoBtn} onChange={()=>{setAutoBtn(!autoBtn);}}></input><labe>Auto</labe>
        <br></br>
        <input type="checkbox" value={saveBtn} checked={saveBtn} onChange={()=>{setSaveBtn(!saveBtn);}}></input><labe>Save</labe>
        <br></br>
        <input type="checkbox" value={loadBtn} checked={loadBtn} onChange={()=>{setLoadBtn(!loadBtn);}}></input><labe>Load</labe>
        <br></br>
        <input type="checkbox" value={settingsBtn} checked={settingsBtn} onChange={()=>{setSettingsBtn(!settingsBtn);}}></input><labe>Settings</labe>
        <br></br>
        <input type="checkbox" value={returnTitlePageBtn} checked={returnTitlePageBtn} onChange={()=>{setReturnTitlePageBtn(!returnTitlePageBtn);}}></input><labe>Return to Title-Page</labe>
        <br></br>
        <input type="checkbox"></input><labe>In-Game Data</labe>
        <br></br>
        <input type="checkbox"></input><labe>Deal</labe>
        <br></br>
        List Format: <select>
            <option key="v" value="vertical">Vertical</option>    
            <option key="h" value="horizontal">Horizontal</option>    
        </select>
        <br></br><label>Padding: </label><input type="range" min="0" max="15" step="1" defaultValue="1" value={igsidebarMenuListPadding} onChange={(event)=>{setIgsidebarMenuListPadding(event.target.value);}}></input><input type="number" min="0" max="15" step="1" defaultValue="1" value={igsidebarMenuListPadding} onChange={(event)=>{setIgsidebarMenuListPadding(event.target.value);}}></input>
    </div>

    </div>

    <br></br><button>Save</button>
</div>);
}