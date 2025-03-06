import * as React from 'react';
import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';


export default function ConvNodeUISetter({
    openRm, iniDefaultButtonObj, 
    iniTxtFrameObj, iniMenuButtonObj, iniConvNavObj, iniCovLogObj,
    updateIsDisplayDefaultButtonPreview, 
    updateDefaultButtonSettings, 
    updateTextFrameUISettings, 
    updateBackButtonSettings, 
    updateConvNavSettings, 
    fetchRmUpdatedSignal, 
    updateConvLogUISettings, 
    fetchGdmUpdatedSignal, 
    resetRmUpdatedSignal, 
    respondUpdatedRm,

    getAudioMap,
    getVisualMap,

    getUILanguage,
    username, projName,
    
}) {


    const screenWidth = 800;
    const screenHeight = 600;
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];


    let manageResourceText = textDictItem.manageResourceText !== undefined ?
        textDictItem.manageResourceText
        : textDictItemDefault.manageResourceText;
    
    let updateText = textDictItem.updateText !== undefined ?
        textDictItem.updateText
        : textDictItemDefault.updateText;

    let saveText = textDictItem.saveText !== undefined ?
        textDictItem.saveText
        : textDictItemDefault.saveText;

    let collapseText = textDictItem.collapseText !== undefined ?
        textDictItem.collapseText
        : textDictItemDefault.collapseText;

    let widthText = textDictItem.widthText !== undefined ?
        textDictItem.widthText
        : textDictItemDefault.widthText;

    let heightText = textDictItem.heightText !== undefined ? 
        textDictItem.heightText
        : textDictItemDefault.heightText;

    let fontColorText = textDictItem.fontColorText !== undefined ?
        textDictItem.fontColorText
        : textDictItemDefault.fontColorText;

    let fontSizeText = textDictItem.fontSizeText !== undefined ?
        textDictItem.fontSizeText
        : textDictItemDefault.fontSizeText;

    let fontNameText = textDictItem.fontNameText !== undefined ?
        textDictItem.fontNameText
        : textDictItemDefault.fontNameText;

    let selectResourceText = textDictItem.selectResourceText !== undefined ?
        textDictItem.selectResourceText
        : textDictItemDefault.selectResourceText;

    let buttonLookingText = textDictItem.buttonLookingText !== undefined ?
        textDictItem.buttonLookingText
        : textDictItemDefault.buttonLookingText;

    let positionXText = textDictItem.positionXText !== undefined ?
        textDictItem.positionXText
        : textDictItemDefault.positionXText;        

    let positionYText = textDictItem.positionYText !== undefined ?
        textDictItem.positionYText
        : textDictItemDefault.positionYText;

    let basePictureText = textDictItem.basePictureText !== undefined ?
        textDictItem.basePictureText
        : textDictItemDefault.basePictureText;

    let rectangleAndColorFilledText = textDictItem.rectangleAndColorFilledText !== undefined ?
        textDictItem.rectangleAndColorFilledText
        : textDictItemDefault.rectangleAndColorFilledText;  

    let itemGapText = textDictItem.itemGapText !== undefined ?
        textDictItem.itemGapText
        : textDictItemDefault.itemGapText;    

    let borderSizeText = textDictItem.borderSizeText !== undefined ?
        textDictItem.borderSizeText
        : textDictItemDefault.borderSizeText;
    
    let buttonTextText = textDictItem.buttonTextText !== undefined ?
        textDictItem.buttonTextText
        : textDictItemDefault.buttonTextText;

    let groupPositionXText = textDictItem.groupPositionXText !== undefined ?
        textDictItem.groupPositionXText
        : textDictItemDefault.groupPositionXText;

    let groupPositionYText = textDictItem.groupPositionYText !== undefined ?
        textDictItem.groupPositionYText
        : textDictItemDefault.groupPositionYText;

    let backgroundColorText = textDictItem.backgroundColorText !== undefined ?
        textDictItem.backgroundColorText
        : textDictItemDefault.backgroundColorText;
    
    let cornerRadiusText = textDictItem.cornerRadiusText !== undefined ?
        textDictItem.cornerRadiusText
        : textDictItemDefault.cornerRadiusText;

    let borderColorText = textDictItem.borderColorText !== undefined ?
        textDictItem.borderColorText
        : textDictItemDefault.borderColorText;

    let horizontallyCentredText = textDictItem.horizontallyCentredText !== undefined ?
        textDictItem.horizontallyCentredText
        : textDictItemDefault.horizontallyCentredText;


//TODO15





    //TODO at previous layer, keep unsaved-local setting data locally, so that switching doesn't trigger cloud-db operations
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (firstTimeEnter === true) {


            setFirstTimeEnter(false);
        }

        let uiLangTemp = getUILanguage();
        setLanguageCodeTextOption(uiLangTemp);

        updateIsDisplayDefaultButtonPreview(displayDefaultButtonPreview);
        updateDefaultButtonSettings(defaultButtonObj);
  
        updateTextFrameUISettings(txtFrameObj);
        updateBackButtonSettings(igMenuBtnObj);
        
        updateConvNavSettings(convNav);
        updateConvLogUISettings(convLogObj);


        let auMap = getAudioMap();
        setAudioMap(auMap);
        let visMap = getVisualMap();
        setVisualMap(visMap);

        console.log("...... conv-node-ui-setter, resource maps = ", auMap, "\n\t\t", visMap);

    });


    const [visualMap, setVisualMap] = useState([]); 
    const [audioMap, setAudioMap] = useState([]);



    const [idvButtonBorderColor, setIdvButtonBorderColor] = useState("#000000");
    const [idvButtonBorderSize, setIdvButtonBorderSize] = useState("2");

    //TODO current: default-reset when start rendering this component
    //TODO later: fetch from cloud-db for setting records
    const [defaultButtonObj, setDefaultButtonObj] = useState(iniDefaultButtonObj);

    const [displayDefaultButtonPreview, setDisplayDefaultButtonPreview] = useState(true);

    const [convNav, setConvNav] = useState(iniConvNavObj);
    const [auto0DisplayText, setAuto0DisplayText] = useState("Auto");
    const [auto1DisplayText, setAuto1DisplayText] = useState("Auto");
    const [logDisplayText, setLogDisplayText] = useState("Log");
    const [logCloseDisplayText, setLogCloseDisplayText] = useState("Close");
    const [setupDisplayText, setSetupDisplayText] = useState("Settings");

    const defaultButtonTextSampleArr = ["Sample1: Default Button", "Sample2: Default Button, Longer Content", "Sample3: Another option..."];

    const [txtFrameFontName, setTxtFrameFontName] = useState(0); //TODO
    const [txtFrameFontSize, setTxtFrameFontSize] = useState(12); //TODO
    const [txtFrameContentAreaCentered, setTxtFrameContentAreaCentered] = useState(true);
    const [txtFrameContentAreaHgap, setTxtFrameContentAreaHgap] = useState(10);
    const [txtFrameContentAreaVgap, setTxtFrameContentAreaVgap] = useState(10);

    const [txtFrameObj, setTxtFrameObj] = useState(iniTxtFrameObj);



    const [igMenuBtnObj, setIgMenuBtnObj] = useState(iniMenuButtonObj);

    const [convLogObj, setConvLogObj] = useState(iniCovLogObj);

    const [openDefaultButtonSection, setOpenDefaultButtonSection] = useState(false);
    const [openTextFrameSection, setOpenTextFrameSection] = useState(false);
    const [openAutoLogSection, setOpenAutoLogSection] = useState(false);
    const [openLogPageSection, setOpenLogPageSection] = useState(false);


//TODO5
    return (
 
    <div className="guiSettings pieceEditingLeftArea" style={{"height": `${screenHeight}px`}}>

    <div className="gameUISetterSectionTitle"
        onClick={()=>{
            setOpenDefaultButtonSection(!openDefaultButtonSection);
        }}
    >
        {!openDefaultButtonSection && <label style={{"cursor": "pointer"}}>Default Button (group) ︾</label>}
        {openDefaultButtonSection && <label style={{"cursor": "pointer"}}>Default Button (group) ︽</label>}

    </div>

{openDefaultButtonSection && <div>
    <div className="indentOne">
        <br></br>{widthText}: <input type="range" value={defaultButtonObj["widthMin"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "widthMin": event.target.value});
        }}></input><input value={defaultButtonObj["widthMin"]} min="0" max={screenWidth} step="1" type="number" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "widthMin": event.target.value});}}></input>
        {/* <br></br>Max-{widthText}: <input type="range" value={defaultButtonObj["widthMax"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "widthMax": event.target.value});
            }}></input><input value={defaultButtonObj["widthMax"]} min="0" max={screenWidth} step="1" type="number" onChange={(event)=>{            setDefaultButtonObj({...defaultButtonObj,  "widthMax": event.target.value});
        }}></input> */}
        <br></br>{heightText}: <input type="range" value={defaultButtonObj["height"]} min="0" max="80" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj, "height": event.target.value});}}></input><input type="number" value={defaultButtonObj["height"]} min="0" max={screenWidth} step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "height": event.target.value});}}></input>
        <br></br><label>{cornerRadiusText}: </label>
        <input type="range" value={defaultButtonObj["cornerRadius"]} min="0" max="20" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "cornerRadius": event.target.value});}}></input><label>{defaultButtonObj["cornerRadius"]}</label>
        {/* <br></br><label>Transparency: </label><input type="range" value={defaultButtonObj["transparency"]} min="0" max="1" step="0.1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "transparency": event.target.value});}}></input><label>{defaultButtonObj["transparency"]}</label> */}
        <br></br><label>{fontSizeText}: </label><input type="range" value={defaultButtonObj["textSize"]}  min="0" max="90" step="1" onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "textSize": event.target.value});}}></input><label> {defaultButtonObj["textSize"]} px</label>
        <br></br><label>{fontColorText}: </label><input type="color" value={defaultButtonObj["textColor"]} onChange={(event)=>{setDefaultButtonObj({...defaultButtonObj,  "textColor": event.target.value});}}></input><label> {defaultButtonObj["textColor"]}</label>
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

        <br></br><label>{fontNameText}: </label>
        <select value={defaultButtonObj["fontName"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "fontName": event.target.value})
        }}>
            <option value="serif" key="deflBtn_serif">serif</option>
            <option value="sans-serif" key="deflBtn_sans-serif">sans-serif</option>
            <option value="cursive" key="deflBtn_cursive">cursive</option>
        </select>
        <br></br><label>{borderColorText}: </label><input type="color" value={idvButtonBorderColor} onChange={(event)=>{
                        setIdvButtonBorderColor(event.target.value);
                        let temp = idvButtonBorderSize + "px solid " + event.target.value;
                        setDefaultButtonObj({...defaultButtonObj,  "border": temp});
                    }}></input><label> {idvButtonBorderColor}</label>
        <br></br><label>{borderSizeText}: </label>
                    <input type="range" value={idvButtonBorderSize} min="0" max="3" step="1" onChange={(event)=>{
                        setIdvButtonBorderSize(event.target.value);
                        let temp = event.target.value + "px solid " + idvButtonBorderColor;
                        setDefaultButtonObj({...defaultButtonObj,  "border": temp});
                    }}></input><label>{idvButtonBorderSize}px</label>
        <br></br><label>{buttonLookingText}: </label>
        <br></br><input type="radio" value={defaultButtonObj["isShape"]} checked={defaultButtonObj["isShape"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "isShape": true});
          
        }}></input><label onClick={(event)=>{
                setDefaultButtonObj({...defaultButtonObj,  "isShape": true});
                
                }}>{rectangleAndColorFilledText} </label>
            {defaultButtonObj["isShape"] && 
                <div className="indentOne">
                    <label>{backgroundColorText}: </label>
                    <input type="color" value={defaultButtonObj["bgColor"]} 
                    onChange={(event)=>{
                        setDefaultButtonObj({...defaultButtonObj,  "bgColor": event.target.value});
                       
                        }}></input><label> {defaultButtonObj["bgColor"]}</label>
                </div>}
            
        <br></br><input type="radio" value={defaultButtonObj["isShape"]} checked={!defaultButtonObj["isShape"]} onChange={(event)=>{
            setDefaultButtonObj({...defaultButtonObj,  "isShape": false});
        
        }}></input><label onClick={(event)=>{
                setDefaultButtonObj({...defaultButtonObj,  "isShape": false});
              }}>{basePictureText} </label>

            {!defaultButtonObj["isShape"] && <>
                <select value={defaultButtonObj["picVar"]} onChange={(event)=>{
                        setDefaultButtonObj({...defaultButtonObj,  "picVar": event.target.value}); 
                }}>                    
                    <option key="idvDefault" value="">-- {selectResourceText} --</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "defaultButton" + currKey;
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            if (currKey.length > 0) {
                                return (
                                    <option value={currKey} key={keyName}>{currKey}</option>
                                );
                            }

                    })}
                </select><button onClick={() => {openRm();}}>{manageResourceText}</button>
         
                </>}
        <br></br><label>{itemGapText}: </label>
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
        <br></br><label>{groupPositionXText}: </label><br></br>
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
                }}>{horizontallyCentredText}</label>
            </div>
        <br></br><label>{groupPositionYText}: </label><br></br>
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
                        "borderRadius": `${defaultButtonObj["cornerRadius"]}px`,
                        "color": defaultButtonObj["textColor"],
                        "opacity": defaultButtonObj["transparency"],
                        "border": `${defaultButtonObj["border"]}`,
                        "margin-bottom": `${defaultButtonObj["margin"]}px`,
                        "padding-left": `10px`,
                        "justifyContent": defaultButtonObj["justifyContent"],
                        "align-items": defaultButtonObj["alignItems"],
                        "fontSize": `${defaultButtonObj["textSize"]}px`,

                        "display": "flex",
                        "cursor": "pointer",
                        "userSelect": "none",
                        "transition": "all 0.2s ease-out",
                        
                    } : {
                        "backgroundImage": `url('${visualMap[defaultButtonObj["picVar"]]}')`, //TODO2 improve later
                        "backgroundSize": `${defaultButtonObj["widthMax"]}px ${defaultButtonObj["height"]}px`,
                        
                        "width": `${defaultButtonObj["widthMin"]}px`,
                        "height": `${defaultButtonObj["height"]}px`,
                        "borderRadius": `${defaultButtonObj["cornerRadius"]}px`,
                        "color": defaultButtonObj["textColor"],
                        "opacity": defaultButtonObj["transparency"],
                        "border": `${defaultButtonObj["border"]}`,
                        "margin-bottom": `${defaultButtonObj["margin"]}px`,
                        "padding-left": `10px`,
                        "justifyContent": defaultButtonObj["justifyContent"],
                        "align-items": defaultButtonObj["alignItems"],
                        "fontSize": `${defaultButtonObj["textSize"]}px`,

                        "display": "flex",
                        "cursor": "pointer",
                        "userSelect": "none",
                        "transition": "all 0.2s ease-out",
                        
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


    <br></br><div
        className="gameUISetterSectionCollapse"
        onClick={()=>{
            setOpenDefaultButtonSection(false);
        }}
    >{collapseText} ︽</div>

</div>}



    <br></br>
    <div className="gameUISetterSectionTitle"
        onClick={()=>{
            setOpenTextFrameSection(!openTextFrameSection);
        }}
    >
        {!openTextFrameSection && <label style={{"cursor": "pointer"}}>Text Frame ︾</label>}
        {openTextFrameSection &&<label style={{"cursor": "pointer"}}>Text Frame ︽</label>}
    </div>

{openTextFrameSection && <div>
    {widthText}: <input type="range" value={txtFrameObj["width"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            let posX = (screenWidth - txtFrameObj["width"]) / 2 - 1;
          
            setTxtFrameObj({...txtFrameObj, "positionX": posX, "width": event.target.value});

        }}></input><input value={txtFrameObj["width"]} type="number" min="0" max={screenWidth} step="1" onChange={(event)=>{
            let posX = (screenWidth - txtFrameObj["width"]) / 2;
            setTxtFrameObj({...txtFrameObj, "width": event.target.value, "positionX": posX});        
        }}></input>
    <br></br>{heightText}: <input type="range" value={txtFrameObj["height"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
        setTxtFrameObj({...txtFrameObj, "height": event.target.value});    
        }}></input><input type="number" value={txtFrameObj["height"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "height": event.target.value});    
        }}></input>
    <br></br>{positionYText}: <input type="range" value={txtFrameObj["positionY"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "positionY": event.target.value});    
        }}></input><input type="number" value={txtFrameObj["positionY"]} min="0" max={screenWidth} step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "positionY": event.target.value});           
        }}></input>
    <br></br><label>{cornerRadiusText}: </label>
    <input type="range" min="0" max="100" step="1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "cornerRadius": event.target.value});    
        }} value={txtFrameObj["cornerRadius"]}></input><label> {txtFrameObj["cornerRadius"]}</label>
       
    {/* <br></br><label>Transparency: </label><input type="range" value={txtFrameObj["transparency"]} min="0" max="1" step="0.1" onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "transparency": event.target.value});    
        }}></input><label>{txtFrameObj["transparency"]}</label> */}
    <br></br><input type="radio" value={txtFrameObj["isShape"]} checked={txtFrameObj["isShape"]} onChange={()=>{
            setTxtFrameObj({...txtFrameObj, "isShape": true});    
        }}></input><label onClick={()=>{setTxtFrameObj({...txtFrameObj, "isShape": true});}}>{rectangleAndColorFilledText}: </label>
    
        {txtFrameObj["isShape"] && <><input type="color" value={txtFrameObj["bgColor"]} onChange={(event)=>{
            setTxtFrameObj({...txtFrameObj, "bgColor": event.target.value});    
            }}></input><label>{txtFrameObj["bgColor"]}</label></>}
    <br></br><input type="radio" value={txtFrameObj["isShape"]} checked={!txtFrameObj["isShape"]} onChange={()=>{setTxtFrameObj({...txtFrameObj, "isShape": false});}}></input><label 
    onClick={()=>{setTxtFrameObj({...txtFrameObj, "isShape": false});}}>{basePictureText} </label>
        {!txtFrameObj["isShape"] && <>
        
        <select value={txtFrameObj["picVar"]} onChange={(event)=>{
            if (event.target.value === "") {
                setTxtFrameObj({...txtFrameObj, "picVar": event.target.value});    
            } else {
                setTxtFrameObj({...txtFrameObj, "picVar": event.target.value});    
            }
            }}>
                <option key="tfvDefault" value="">-- {selectResourceText} --</option>
                <option key="noPic" value="">(no picture)</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "tfvButton" + currKey;
                            /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                            if (currKey.length > 0) {
                                return (
                                    <option value={currKey} key={keyName}>{currKey}</option>
                                );
                            }
                    })}
            </select>
        <button onClick={() => {openRm()}}>{manageResourceText}</button></>}

    <br></br><label>Font: </label>

    <select 
        value={txtFrameObj["fontName"]}
        onChange={(event)=>{
                setTxtFrameObj({...txtFrameObj,  "fontName": event.target.value});
            }}>
                <option value="serif" key="txf_serif">serif</option>
                <option value="sans-serif" key="txf_sans-serif">sans-serif</option>
                <option value="cursive" key="txf_cursive">cursive</option>
            </select>
  
    <br></br><label>{fontSizeText}: </label><input type="range" value={txtFrameObj["textSize"]} min="0" max="32" step="1" onChange={(event)=>{
        setTxtFrameObj({...txtFrameObj, "textSize": event.target.value});            
    }}></input><input type="number" value={txtFrameObj["textSize"]} min="0" max="32" step="1" onChange={(event)=>{setTxtFrameObj({...txtFrameObj, "textSize": event.target.value});}}></input>
    <br></br><label>{fontColorText}: </label><input type="color" value={txtFrameObj["textColor"]} onChange={(event)=>{
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


        <br></br><div
            className="gameUISetterSectionCollapse"
            onClick={()=>{
                    setOpenTextFrameSection(false);
                }}
            >{collapseText} ︽</div>
                </div>

</div>}

    <br></br>
    <div className="gameUISetterSectionTitle"
        onClick={()=>{
            setOpenAutoLogSection(!openAutoLogSection);
        }}
    >
        {!openAutoLogSection && <label style={{"cursor": "pointer"}}>Text Viewing Options (Auto & Log) ︾</label>}
        {openAutoLogSection && <label style={{"cursor": "pointer"}}>Text Viewing Options (Auto & Log) ︽</label>}
    </div>
{openAutoLogSection && <div>
    <div className="indentOne">
        <label>Auto Toggle:</label>
        <div className="indentOne">
            <label>Unclicked:</label>
            <div className="indentOne">
                <label>Font Color: </label>
                    <br></br><input type="color" value={convNav["buttonAutoShade0"]} onChange={(event)=>{
                                setConvNav({...convNav,  "buttonAutoShade0": event.target.value});
                    }}></input>
                    <label> {convNav["buttonAutoShade0"]}</label>

                    <br></br>
                <label>{basePictureText}: </label>
                    <select value={convNav["buttonAutoPicName0"]} onChange={(event)=>{
                        setConvNav({...convNav,  "buttonAutoPicName0": event.target.value});     
                    
                    }}>                    
                            <option key="autoDefault0" value="">-- {selectResourceText} --</option>
                            {Object.keys(visualMap).map((currKey) => {
                                    let keyName = "autoButton0" + currKey;
                                    if (currKey.length > 0) {
                                        return (
                                            <option value={currKey} key={keyName}>{currKey}</option>
                                        );
                                    }
                            })}
                        </select><button onClick={() => {openRm();}}>{manageResourceText}</button>
                    <br></br>
                    <label>Display Text:</label>
                    <input value={auto0DisplayText}
                        onChange={(event)=>{
                            setAuto0DisplayText(event.target.value);
                        }}
                    ></input>
                    <button onClick={()=>{
                        setConvNav({...convNav,  "buttonAutoDisplayText0": auto0DisplayText});     
                    }}>{updateText}</button>
                    <br></br>
            </div>

            <label>Pressed:</label>
            <div className="indentOne">
                   <label>Font Color: </label>
                    <br></br><input type="color" value={convNav["buttonAutoShade1"]} onChange={(event)=>{
                                setConvNav({...convNav,  "buttonAutoShade1": event.target.value});
                    }}></input>
                    <label> {convNav["buttonAutoShade1"]}</label>

                    <br></br>
                    <label>{basePictureText}: </label>
                    <select value={convNav["buttonAutoPicName1"]} onChange={(event)=>{
                        setConvNav({...convNav,  "buttonAutoPicName1": event.target.value});     
                    }}>                    
                            <option key="autoDefault1" value="">-- {selectResourceText} --</option>
                            {Object.keys(visualMap).map((currKey) => {
                                    let keyName = "autoButton1" + currKey;
                                    if (currKey.length > 0) {
                                        return (
                                            <option value={currKey} key={keyName}>{currKey}</option>
                                        );
                                    }
                            })}
                        </select><button onClick={() => {openRm();}}>{manageResourceText}</button>
                    <br></br>
                    <label>Display Text:</label>
                    <input value={auto1DisplayText}
                        onChange={(event)=>{
                            setAuto1DisplayText(event.target.value);
                        }}
                    ></input>
                    <button onClick={()=>{
                        setConvNav({...convNav,  "buttonAutoDisplayText1": auto1DisplayText});     
                    }}>{updateText}</button>
                    <br></br>
            </div>

          
            <label>Font:</label>
            <select value={convNav["buttonAutoFontName"]} onChange={(event)=>{
                setConvNav({...convNav,  "buttonAutoFontName": event.target.value});
            }}>
                <option value="serif" key="autoBtn_serif">serif</option>
                <option value="sans-serif" key="autoBtn_sans-serif">sans-serif</option>
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
            <label>Font Color: </label>
            <br></br><input type="color" value={convNav["buttonLogShade"]} onChange={(event)=>{
                        setConvNav({...convNav,  "buttonLogShade": event.target.value});
            }}></input>
            <label> {convNav["buttonLogShade"]}</label> 
    
            <br></br>
            <label>{basePictureText}: </label>
            
            <select value={convNav["buttonLogPicName"]} onChange={(event)=>{
                setConvNav({...convNav, "buttonLogPicName": event.target.value});
            }}>                    
                    <option key="logDefault" value="">-- {selectResourceText} --</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "logButton" + currKey;
                            if (currKey.length > 0) {
                                return (
                                    <option value={currKey} key={keyName}>{currKey}</option>
                                );
                            }
                    })}
                </select><button onClick={() => {openRm();}}>{manageResourceText}</button>
            <br></br>
            <input value={logDisplayText}
                        onChange={(event)=>{
                            setLogDisplayText(event.target.value);
                        }}
                    ></input>
                    <button onClick={()=>{
                        setConvNav({...convNav,  "buttonLogDisplayText": logDisplayText});     
                    }}>{updateText}</button>
            <br></br>
            <label>Font:</label>
            <select 
                value={convNav["buttonLogFontName"]}
                onChange={(event)=>{
                    setConvNav({...convNav,  "buttonLogFontName": event.target.value});
            }}>
                <option value="serif" key="logBtn_serif">serif</option>
                <option value="sans-serif" key="logBtn_sans-serif">sans-serif</option>
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
        <label>Setup Page Button:</label>
        <div className="indentOne">
        <label>Font Color: </label>
            <br></br><input type="color" value={convNav["buttonSetupShade"]} onChange={(event)=>{
                        setConvNav({...convNav,  "buttonSetupShade": event.target.value});
            }}></input>
            <label> {convNav["buttonSetupShade"]}</label> 
    
            <br></br>
            <label>{basePictureText}: </label>
            
            <select value={convNav["buttonSetupPicName"]} onChange={(event)=>{
                setConvNav({...convNav, "buttonSetupPicName": event.target.value});
            }}>                    
                    <option key="setupDefault" value="">-- {selectResourceText} --</option>
                    {Object.keys(visualMap).map((currKey) => {
                            let keyName = "setupButton" + currKey;
                            if (currKey.length > 0) {
                                return (
                                    <option value={currKey} key={keyName}>{currKey}</option>
                                );
                            }
                    })}
                </select><button onClick={() => {openRm();}}>{manageResourceText}</button>
            <br></br>
            <input value={setupDisplayText}
                        onChange={(event)=>{
                            setSetupDisplayText(event.target.value);
                        }}
                    ></input>
                    <button onClick={()=>{
                        setConvNav({...convNav,  "buttonSetupDisplayText": setupDisplayText});     
                    }}>{updateText}</button>
            <br></br>
            <label>Font:</label>
            <select 
                value={convNav["buttonSetupFontName"]}
                onChange={(event)=>{
                    setConvNav({...convNav,  "buttonSetupFontName": event.target.value});
            }}>
                <option value="serif" key="setupBtn_serif">serif</option>
                <option value="sans-serif" key="setupBtn_sans-serif">sans-serif</option>
                <option value="cursive" key="setupBtn_cursive">cursive</option>
            </select>
            <br></br>
            <input type="checkbox" 
                value={convNav["buttonSetupFontItalic"]} 
                checked={convNav["buttonSetupFontItalic"]}
                onChange={()=>{
                    let val = convNav["buttonSetupFontItalic"];
                    setConvNav({...convNav,  "buttonSetupFontItalic": !val});
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

        <br></br><br></br>
   
        <div className="indentOne">
                <label>{groupPositionXText}:</label>
                <input type="range" max="800" min="0" step="1" value={convNav["groupX"]}
                    onChange={(event)=>{
                        setConvNav({...convNav, "groupX": event.target.value});    
                    }}
                ></input>
                <input type="number" max="800" min="0" step="1" value={convNav["groupX"]}
                    onChange={(event)=>{
                        setConvNav({...convNav, "groupX": event.target.value});    
                    }}
                ></input>

                <br></br><label>{groupPositionYText}:</label>
                <input type="range" max="600" min="0" step="1" value={convNav["groupY"]}
                    onChange={(event)=>{
                        setConvNav({...convNav, "groupY": event.target.value});    
                    }}
                ></input>
                <input type="number" max="600" min="0" step="1" value={convNav["groupY"]}
                    onChange={(event)=>{
                        setConvNav({...convNav, "groupY": event.target.value});    
                    }}        
                ></input>

                <br></br><label>{widthText}:</label>
                <input type="range" max="200" min="40" step="2" value={convNav["groupWidth"]}
                    onChange={(event)=>{
                        setConvNav({...convNav, "groupWidth": event.target.value});    
                    }}      
                ></input>
                <input type="number" max="200" min="40" step="2" value={convNav["groupWidth"]}
                    onChange={(event)=>{
                        setConvNav({...convNav, "groupWidth": event.target.value});    
                    }}       
                ></input>

                <br></br><label>{heightText}:</label>
                <input type="range" max="200" min="10" step="1" value={convNav["groupHeight"]}
                    onChange={(event)=>{
                        setConvNav({...convNav, "groupHeight": event.target.value});    
                    }}    
                ></input>
                <input type="number" max="200" min="10" step="1" value={convNav["groupHeight"]}
                    onChange={(event)=>{
                        setConvNav({...convNav, "groupHeight": event.target.value});    
                    }}          
                ></input>
              
        </div>

        <br></br>
        <label>{cornerRadiusText}:</label>
        <input type="range" value={convNav["cornerRadius"]} min="0" max="200" step="1" 
        onChange={(event)=>{setConvNav({...convNav,  "cornerRadius": event.target.value});}}></input>
        <label> {convNav["cornerRadius"]}</label>

        <br></br><div
            className="gameUISetterSectionCollapse"
            onClick={()=>{
                    setOpenAutoLogSection(false);
                }}
            >{collapseText} ︽</div>

        </div>
</div>}

    <br></br>
    <div>
        <div className="gameUISetterSectionTitle" 
            onClick={()=>{
            setOpenLogPageSection(!openLogPageSection);
        }}>
            {!openLogPageSection && <label>Log Page Settings ︾</label>}
            {openLogPageSection && <label>Log Page Settings ︽</label>}
        </div>
    {openLogPageSection && <div className="indentOne">
            <label>Close Button Settings</label>
            <div className="indentOne">
            <input type="radio" value={convLogObj["closeButtonIsShape"]} checked={convLogObj["closeButtonIsShape"]}
                onChange={()=>{
                    setConvLogObj({...convLogObj, "closeButtonIsShape": true});
                }}
            ></input><label
                onClick={()=>{
                    setConvLogObj({...convLogObj, "closeButtonIsShape": true});
                }}
            >{rectangleAndColorFilledText}</label>
                <input type="color" value={convLogObj["closeButtonShade"]}
                    onChange={(event)=>{
                        setConvLogObj({...convLogObj, "closeButtonShade": event.target.value});
                    }}
                ></input>
                <br></br>
                <input type="radio" value={convLogObj["closeButtonIsShape"]} checked={!convLogObj["closeButtonIsShape"]}
                    onChange={()=>{
                        setConvLogObj({...convLogObj, "closeButtonIsShape": false});
                    }}
                ></input><label
                    onClick={()=>{
                        setConvLogObj({...convLogObj, "closeButtonIsShape": false});
                    }}
                >{basePictureText}</label>
                    <div className="indentOne">
                        <select value={visualMap[convLogObj["closeButtonPicName"]]} onChange={(event)=>{
                                    setConvLogObj({...convLogObj,  "closeButtonPicName": event.target.value}); 
                        }}>                    
                            <option key="convLogCloseBtnPic-default" value="">-- {selectResourceText} --</option>
                            {Object.keys(visualMap).map((currKey) => {
                                    let keyName = "convLogCloseBtnPic-" + currKey;
                                    /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                                    if (currKey.length > 0) {
                                        return (
                                            <option value={currKey} key={keyName}>{currKey}</option>
                                        );
                                    }
                            })}
                        </select>
                        <button onClick={() => {openRm();}}>{manageResourceText}</button>
                
                    </div>

                <label> {positionXText}:</label>
                    <input type="range" value={convLogObj["closeButtonPositionX"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonPositionX": event.target.value});
                        }}
                        max={screenWidth} min="1" step="1"
                    ></input>
                    <input type="number" value={convLogObj["closeButtonPositionX"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonPositionX": event.target.value});
                        }}
                        max={screenWidth} min="1" step="1"
                        ></input>
                <br></br>
                <label> {positionYText}:</label>
                <input type="range" value={convLogObj["closeButtonPositionY"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonPositionY": event.target.value});
                        }}
                        max={screenHeight} min="1" step="1"
                    ></input>
                    <input type="number" value={convLogObj["closeButtonPositionY"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonPositionY": event.target.value});
                        }}
                        max={screenHeight} min="1" step="1"
                        ></input>
                <br></br>
                <label> {widthText}:</label>
                <input type="range" value={convLogObj["closeButtonWidth"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonWidth": event.target.value});
                        }}
                        max={screenWidth/5} min="1" step="1"
                    ></input>
                    <input type="number" value={convLogObj["closeButtonWidth"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonWidth": event.target.value});
                        }}
                        max={screenWidth/5} min="1" step="1"
                        ></input>
                <br></br>
                <label> {heightText}:</label>
                <input type="range" value={convLogObj["closeButtonHeight"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonHeight": event.target.value});
                        }}
                        max={screenHeight/5} min="1" step="1"
                    ></input>
                    <input type="number" value={convLogObj["closeButtonHeight"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonHeight": event.target.value});
                        }}
                        max={screenHeight/5} min="1" step="1"
                        ></input>
                <br></br>
                <label> {cornerRadiusText}:</label>
                <input type="range" value={convLogObj["closeButtonCornerRadius"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonCornerRadius": event.target.value});
                        }}
                        max={50} min="0" step="1"
                    ></input>
                    <input type="number" value={convLogObj["closeButtonCornerRadius"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonCornerRadius": event.target.value});
                        }}
                        max={50} min="0" step="1"
                        ></input>
                <br></br>
                <label> {borderSizeText}:</label>
                    <input type="range" min="0" max="3" step="1"
                        value={convLogObj["closeButtonBorderSize"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonBorderSize": event.target.value});
                        }}                   
                    ></input>
                    <input type="number" min="0" max="3" step="1"
                        value={convLogObj["closeButtonBorderSize"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonBorderSize": event.target.value});
                        }}                   
                    ></input>
                <br></br>
                <label> {borderColorText}:</label>
                    <input type="color" value={convLogObj["closeButtonBorderColor"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "closeButtonBorderColor": event.target.value});
                        }}
                    
                    ></input>

                <br></br>
                <label>{buttonTextText}: </label>
                <input value={logCloseDisplayText}
                    onChange={(event)=>{
                        setLogCloseDisplayText(event.target.value);
                    }}
                ></input>
                <button 
                    onClick={()=>{
                        setConvLogObj({...convLogObj, "closeButtonText": logCloseDisplayText});
                    }}>Update</button>
                <br></br>
                <label>{fontColorText}: </label>
                <input type="color" value={convLogObj["closeButtonTextColor"]}
                    onChange={(event)=>{
                        setConvLogObj({...convLogObj, "closeButtonTextColor": event.target.value});
                    }}
                ></input>
                <br></br>
                <label>Button Font: </label>
                <select value={convLogObj["closeButtonFontName"]}
                    onChange={(event)=>{
                        setConvLogObj({...convLogObj, "closeButtonFontName": event.target.value});
                    }}
                >
                    <option value="serif" key="closeBtn_serif">serif</option>
                    <option value="sans-serif" key="closeBtn_sans-serif">sans-serif</option>
                    <option value="cursive" key="closeBtn_cursive">cursive</option>  
                </select>

            </div>
           
            <br></br>
        

            <br></br>
            <label>Background Visual Settings</label>
            <div className="indentOne">
                
                <input type="radio" 
                    value={convLogObj["bgpIsShape"]}
                    checked={convLogObj["bgpIsShape"]}
                    onChange={()=>{
                        setConvLogObj({...convLogObj, "bgpIsShape": true});
                    }}

                ></input><label
                    onClick={()=>{
                        setConvLogObj({...convLogObj, "bgpIsShape": true});
                    }}
                >{rectangleAndColorFilledText}</label>
                <input type="color" value={convLogObj["bgpShade"]} onChange={(event)=>{
                        setConvLogObj({...convLogObj, "bgpShade": event.target.value});
                }}></input>
                <br></br>
                <input type="radio"
                    value={convLogObj["bgpIsShape"]}
                    checked={!convLogObj["bgpIsShape"]}
                    onChange={()=>{
                        setConvLogObj({...convLogObj, "bgpIsShape": false});
                    }}
                ></input><label
                    onClick={()=>{
                        setConvLogObj({...convLogObj, "bgpIsShape": false});
                    }}
                >{basePictureText}</label>
                <div className="indentOne">
                        <select value={visualMap[convLogObj["bgpPicName"]]} onChange={(event)=>{
                                    setConvLogObj({...convLogObj,  "bgpPicName": event.target.value}); 
                        }}>                    
                            <option key="convLogBgp-default" value="">-- {selectResourceText} --</option>
                            {Object.keys(visualMap).map((currKey) => {
                                    let keyName = "convLogBgp-" + currKey;
                                    /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                                    if (currKey.length > 0) {
                                        return (
                                            <option value={currKey} key={keyName}>{currKey}</option>
                                        );
                                    }
                            })}
                        </select>
                        <button onClick={() => {openRm();}}>{manageResourceText}</button>
                
                    </div>
            </div>
                    
            <br></br>   
            <label>Group Unit Settings:</label>
                <div className="indentOne">
                    <label>Group Unit Background</label>
                    <div className="indentOne">
                            <input type="radio" 
                                value={convLogObj["groupBgIsShape"]} checked={convLogObj["groupBgIsShape"]}
                                onChange={()=>{
                                    setConvLogObj({...convLogObj, "groupBgIsShape": true});
                                }}
                            ></input>  
                            <label onClick={()=>{
                                    setConvLogObj({...convLogObj, "groupBgIsShape": true});
                            }}>
                            {rectangleAndColorFilledText}</label>
                            
                            <input type="color" value={convLogObj["groupBgShade"]}
                                onChange={(event)=>{
                                    setConvLogObj({...convLogObj, "groupBgShade": event.target.value});

                                }}
                            ></input>


                            <br></br>
                            <input type="radio"
                                value={convLogObj["groupBgIsShape"]} checked={!convLogObj["groupBgIsShape"]}
                                onChange={()=>{
                                    setConvLogObj({...convLogObj, "groupBgIsShape": false});
                                }}
                            ></input><label
                                onClick={()=>{
                                    setConvLogObj({...convLogObj, "groupBgIsShape": false});
                                }}
                            >{basePictureText}</label>
                            <select value={visualMap[convLogObj["groupBgpName"]]}
                                onChange={(event)=>{
                                    setConvLogObj({...convLogObj,  "groupBgpName": event.target.value}); 
                                }}
                            >
                                <option key="convLogGroupUnitBgp-default" value="">-- {selectResourceText} --</option>
                                {Object.keys(visualMap).map((currKey) => {
                                        let keyName = "convLogGroupUnitBgp-" + currKey;
                                        console.log("... vis-map key = ", currKey, "... value = ", visualMap[currKey]);
                                        /* format: {name: <name>, default_value: <value>, data_type: 'number'/'boolean'/'string'} */
                                        if (currKey.length > 0) {
                                            return (
                                                <option value={currKey} key={keyName}>{currKey}</option>
                                            );
                                        }
                                })}

                            </select>
                            <button onClick={() => {openRm();}}>{manageResourceText}</button>
                    </div>  
                    <label>{cornerRadiusText}</label>
                    <input type="range" value={convLogObj["groupUnitCornerRadius"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "groupUnitCornerRadius": event.target.value});
                        }}
                    ></input>
                    <input type="number" value={convLogObj["groupUnitCornerRadius"]}
                        onChange={(event)=>{
                            setConvLogObj({...convLogObj, "groupUnitCornerRadius": event.target.value});
                        }}></input>

                    <br></br>
                    <label>{groupPositionXText}</label>
                        <input type="range" value={convLogObj["groupPosX"]} onChange={(event)=>{
                                setConvLogObj({...convLogObj, "groupPosX": event.target.value});

                        }}
                            max={screenWidth} min="1" step="1"
                        ></input>
                        <input type="number" value={convLogObj["groupPosX"]} onChange={(event)=>{
                                setConvLogObj({...convLogObj, "groupPosX": event.target.value});
                        }}
                            max={screenWidth} min="1" step="1"
                        ></input><br></br>

                    <label>{groupPositionYText}</label>
                    <input type="range" value={convLogObj["groupPosY"]} onChange={(event)=>{
                                setConvLogObj({...convLogObj, "groupPosY": event.target.value});
                        }}
                            max={screenHeight} min="1" step="1"
                        ></input>
                        <input type="number" value={convLogObj["groupPosY"]} onChange={(event)=>{
                                setConvLogObj({...convLogObj, "groupPosY": event.target.value});
                        }}
                            max={screenHeight} min="1" step="1"
                        ></input><br></br>

                    <label>Group Width</label>
                    <input type="range" value={convLogObj["groupWidth"]} onChange={(event)=>{
                                setConvLogObj({...convLogObj, "groupWidth": event.target.value});    
                        }}
                            max={screenWidth} min="1" step="1"
                        ></input>
                        <input type="number" value={convLogObj["groupWidth"]} onChange={(event)=>{
                                setConvLogObj({...convLogObj, "groupWidth": event.target.value});
                        }}
                            max={screenWidth} min="1" step="1"
                        ></input><br></br>

                

                    <label>{itemGapText}</label>
                    <input type="range" value={convLogObj["groupItemGap"]} onChange={(event)=>{
                                setConvLogObj({...convLogObj, "groupItemGap": event.target.value});

                        }}
                            max={50} min="1" step="1"
                        ></input>
                        <input type="number" value={convLogObj["groupItemGap"]} onChange={(event)=>{
                                setConvLogObj({...convLogObj, "groupItemGap": event.target.value});
                        }}
                            max={50} min="1" step="1"
                        ></input><br></br>        


            </div>

              
            <br></br>  <br></br>  
            <label>Content Text Settings</label>
            <div className="indentOne">
                <br></br>Content Text Shade:
                 <input type="color" value={convLogObj["contentTextShade"]}
                    onChange={(event)=>{
                        setConvLogObj({...convLogObj, "contentTextShade": event.target.value});
                    }}
                ></input>
                <br></br>Content {fontSizeText}: 
                <input type="range" value={convLogObj["contentTextSize"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "contentTextSize": event.target.value});
                }}></input>
                <input type="number" value={convLogObj["contentTextSize"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "contentTextSize": event.target.value});
                }}></input>

                <br></br>
                <label>Content {fontNameText}: </label>
                <select value={convLogObj["contentTextFont"]} onChange={(event)=>{
                        setConvLogObj({...convLogObj,  "contentTextFont": event.target.value})
                    }}>
                        <option value="serif" key="contentTextFont_serif">serif</option>
                        <option value="sans-serif" key="contentTextFont_sans-serif">sans-serif</option>
                        <option value="cursive" key="contentTextFont_cursive">cursive</option>         
                </select>  
                <br></br>{positionXText}
                <input type="range" value={convLogObj["contentPosX"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "contentPosX": event.target.value});
                }}
                    max="200" min="0" step="1"
                ></input>
                <input type="number" value={convLogObj["contentPosX"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "contentPosX": event.target.value});
                }}
                    max="200" min="0" step="1"
                ></input>
                <br></br>{positionYText}
                <input type="range" value={convLogObj["contentPosY"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "contentPosY": event.target.value});
                }}></input>
                <input type="number" value={convLogObj["contentPosY"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "contentPosY": event.target.value});
                }}></input>
            </div>

            <label>Speaker Text Settings</label>
            <div className="indentOne">
                Speaker Text Shade
                <input type="color" value={convLogObj["speakerTextShade"]}
                    onChange={(event)=>{
                        setConvLogObj({...convLogObj, "speakerTextShade": event.target.value});
                    }}
                ></input>

                <br></br>Speaker Text Size
                <input type="range" value={convLogObj["speakerTextSize"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "speakerTextSize": event.target.value});
                }}></input>
                <input type="number" value={convLogObj["speakerTextSize"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "speakerTextSize": event.target.value});
                }}></input><br></br>
                
                <br></br><label>Speaker {fontNameText}: </label>
                <select value={convLogObj["speakerTextFont"]} onChange={(event)=>{
                        setConvLogObj({...convLogObj,  "speakerTextFont": event.target.value})
                    }}>

                        <option value="serif" key="speakerTextFont_serif">serif</option>
                        <option value="sans-serif" key="speakerTextFont_sans-serif">sans-serif</option>
                        <option value="cursive" key="speakerTextFont_cursive">cursive</option>         
                </select>   
                <br></br>
            
                <br></br>{positionXText}
                <input type="range" value={convLogObj["speakerPosX"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "speakerPosX": event.target.value});
                }}></input>
                <input type="number" value={convLogObj["speakerPosX"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "speakerPosX": event.target.value});
                }}></input>
                <br></br>{positionYText}
                <input type="range" value={convLogObj["speakerPosY"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "speakerPosY": event.target.value});
                }}></input>
                <input type="number" value={convLogObj["speakerPosY"]} onChange={(event)=>{
                    setConvLogObj({...convLogObj, "speakerPosY": event.target.value});
                }}></input>

            </div>
            <br></br><div
                className="gameUISetterSectionCollapse"
                onClick={()=>{
                        setOpenLogPageSection(false);
                    }}
                >{collapseText} ︽</div>

        </div>
    }
    </div>
  
   

    <br></br><button>{saveText}</button>
</div>

);



}