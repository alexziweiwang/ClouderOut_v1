import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';
import { fetchEmuData1GdtVM, fetchEmuData2EppVM, fetchEmuData3EpaVM, fetchEmuData4EssVM, updateAllSetsVM } from '../viewmodels/EmuManagingViewModel';
import { getProjectGameDataDesignVM } from '../viewmodels/GameDataViewModel';


export default function Modal_EmuManager({
    isDisplay,
    handleEmCancel,
    getUILanguage,
    update1Gdt, update2Epp, update3Epa, update4Ess,
    isForGameMaker,
    username,projName,

}) {
//allows user to setup emu-data for testing


//1.PlayerGameData (tracker)

//2.PlayerProfile (player profile for this game)

//3.PlayerAccountSettings (player account info for all games)

//4.Save/Load slot (emu)


    let modalStyleName = "modalBackboard";

    if (isDisplay === true) {
        modalStyleName = "displayBlock modalBackboard";
    } else {
        modalStyleName = "displayNone modalBackboard";
    }
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');
    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    const closeText = textDictItem.closeText !== undefined ?
        textDictItem.closeText
        : textDictItemDefault.closeText;

    const updateText = textDictItem.updateText !== undefined ?
        textDictItem.updateText
        : textDictItemDefault.updateText;

    const cancelText = textDictItem.cancelText !== undefined ?
        textDictItem.cancelText
        : textDictItemDefault.cancelText;

    const editText = textDictItem.editText !== undefined ?
        textDictItem.editText
        : textDictItemDefault.editText;

    const saveToCloudText = textDictItem.saveToCloudText !== undefined ?
        textDictItem.saveToCloudText
        : textDictItemDefault.saveToCloudText;

    const selectText = textDictItem.selectText !== undefined ?
        textDictItem.selectText
        : textDictItemDefault.selectText;

    const trueText = textDictItem.trueText !== undefined ?
        textDictItem.trueText
        : textDictItemDefault.trueText;
    
    const falseText = textDictItem.falseText !== undefined ?   
        textDictItem.falseText
        : textDictItemDefault.falseText;

    const nameText = textDictItem.nameText !== undefined ?
        textDictItem.nameText
        : textDictItemDefault.nameText;
    
    const typeText = textDictItem.typeText !== undefined ?
        textDictItem.typeText
        : textDictItemDefault.typeText;

    const defaultValueText = textDictItem.defaultValueText !== undefined ?
        textDictItem.defaultValueText
        : textDictItemDefault.defaultValueText;

    const currentValueText = textDictItem.currentValueText !== undefined ?
        textDictItem.currentValueText
        : textDictItemDefault.currentValueText;


    const [gdt1, setGdt1] = useState({});
    const [epp2, setEpp2] = useState({});
    const [epa3, setEpa3] = useState({});
    const [ess4, setEss4] = useState({});

    const [gdt1Input, setGdt1Input] = useState("");
    const [gdt1EditItemName, setGdt1EditItemName] = useState("");


    const [focusingPanelName, setFocusingPanelName] = useState("");

    const namingMap = {
        "1gdt": "1.Game Data to Test",
        "2epp": "2.Emu Player Profile",
        "3epa": "3.Emu Player Account",
        "4ess": "4.Emu SL slots"
    }

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    function update1GdtToOuterLayer(data1) {
        //gdt1
        update1Gdt(data1);
    }

    function update2EppToOuterLayer(data2) {
        //epp2 
        update2Epp(data2);
    }

    function update3EpaToOuterLayer(data3) {
        //epa3
        update3Epa(data3);
    }

    function update4EssToOuterLayer(data4) {
        //ess4
        update4Ess(data4);
    }


    async function prepare1Gdt() {

        let tempObj1 = await fetchEmuData1GdtVM({projectName: projName, currUser: username});
        let objSize = Object.keys(tempObj1).length;

        if (objSize === 0 || tempObj1 === undefined || tempObj1 === null) {
            // create from game-data-design-list

            let isUpdated = true;
            let gDataDesignMap = await getProjectGameDataDesignVM(({projectName: projName, uname: username, mostUpdated: isUpdated}));
                                    console.log("prepare1Gdt-fetched from cloud: ", gDataDesignMap);
            if (gDataDesignMap === null || gDataDesignMap === undefined) {
                return;
            }

            let trackerMap = {};
            {Object.keys(gDataDesignMap).map((currKey) => {
                let name = gDataDesignMap[currKey]["name"];
                let defaultVal = gDataDesignMap[currKey]["default_value"];
                let dataType = gDataDesignMap[currKey]["data_type"];

                let obj = {
                "name": name,
                "default_value": defaultVal,
                "data_type": dataType,
                "current_value": defaultVal
                }
                let keyStr = currKey;
                trackerMap[keyStr] = obj;
            })} 

            tempObj1 = trackerMap;
        }

                    console.log("... gdt1 prep: ", tempObj1);
        setGdt1(tempObj1);

    } 



    async function prepare2Epp() {
        // if local is not ready, from cloud
        let tempObj2 = await fetchEmuData2EppVM({projectName: projName, currUser: username});
        let objSize = Object.keys(tempObj2).length;
        if (objSize === 0 || tempObj2 === undefined || tempObj2 === null) {
            return;
        }
        setEpp2(tempObj2);
    }        
    async function prepare3Epa() {
        // if local is not ready, from cloud
        let tempObj3 = await fetchEmuData3EpaVM({projectName: projName, currUser: username});
        let objSize = Object.keys(tempObj3).length;
        if (objSize === 0 || tempObj3 === undefined || tempObj3 === null) {
            return;
        }
        setEpa3(tempObj3);
    }              
    async function prepare4Ess() {
        // if local is not ready, from cloud
        let tempObj4 = await fetchEmuData4EssVM({projectName: projName, currUser: username});
        let objSize = Object.keys(tempObj4).length;
        if (objSize === 0 || tempObj4 === undefined || tempObj4 === null) {
            return;
        }
        setEss4(tempObj4);
    }



    
    useEffect(() => {
        if (firstTimeEnter === true) {
            prepare1Gdt();
            prepare2Epp();
            prepare3Epa();
            prepare4Ess();

                                                console.log("Emu-Manager first-enter...");
            setFirstTimeEnter(false);
        }

        let UILang = getUILanguage();
        setLanguageCodeTextOption(UILang);
    });

    function saveAllChangesToCloud() {
        //TODO send all 4 sets to cloud
        let resObj = {};
        resObj["gdt1"] = gdt1;
        resObj["epp2"] = epp2;
        resObj["epa3"] = epa3;
        resObj["ess4"] = ess4;



    }



return (<div className={modalStyleName}>

<div>

        <div className="modalContent">

            <button className="cursor_pointer modalClose buttonRight50" 
                onClick={()=>{
                    setFocusingPanelName("");
                    handleEmCancel();
                }}
            >{closeText}</button>

            <div style={{
                "width": "900px",
                "marginLeft": "20%",
                "borderRadius": "0px"
            }}>
{isForGameMaker === true && <div className="someGrey parallelFrame"
                    style={{
                        "borderRadius": "0px"
                    }}
                >
                    <button 
                        onClick={()=>{
                            setFocusingPanelName("1gdt");
                        }}
                    >1.Game Data to Test</button>

                    <br></br>
                    <button

                        onClick={()=>{
                            setFocusingPanelName("2epp");
                        }}                    
                    >2.Emu Player Profile</button>
                    <br></br>
                    <button

                        onClick={()=>{
                            setFocusingPanelName("3epa");
                        }}             
                    >3.Emu Player Account</button>
                    <br></br>
                    <button

                        onClick={()=>{
                            setFocusingPanelName("4ess");
                        }}             
                    >4.Emu SL slots</button>


</div>}

                {((isForGameMaker === true && focusingPanelName === "1gdt") || isForGameMaker === false) && <div>
                {/* "1.Game Data to Test" */}
                {/* for Game-Maker and other Node-Level Editor */}
                    <div>Game Data Value Setup for Testing</div>
                        
                        <div 
                 
                            style={{
                                "borderRadius": "0px",
                                "overflow": "scroll",
                                "paddingLeft": "20%"
                            }}
                        >
                            <div  className="darkerGrey"
                             style={{
                                "borderRadius": "0px",
                                "overflow": "scroll",
                                "width": "509px",
                                }}
                            
                            >
                                <table>

                                <thead>
                                    <tr>
                                        <th style={{"width": "120px"}}>{nameText}</th>
                                        <th style={{"width": "70px"}}>{typeText}</th>
                                        <th style={{"width": "120px"}}>{defaultValueText}</th>
                                        <th style={{"width": "170px"}}>{currentValueText}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(gdt1).map((currKey) => {
                                        let keyName = "gdt1" + currKey;
                                        let item = gdt1[currKey];
                                        let itemType = item["data_type"];
                                        let defaultVal = trueText;
                                        let currentVal = trueText;

                                        if (itemType === "boolean") {
                                            if (item["default_value"] === false) {
                                                defaultVal = falseText;
                                            }
                                            if (item["current_value"] === false) {
                                                currentVal = falseText;
                                            }
                                        } else {
                                            defaultVal = item["default_value"];
                                            currentVal = item["current_value"];
                                        }

                                        return (
                                            <tr key={keyName}>
                                                <td style={{"backgroundColor": ""}}>{currKey}</td>
                                                <td>{item["data_type"]}</td>
                                                <td>{defaultVal}</td>
                                                <td style={{"width": "320px", "overflow": "scroll"}}>
                                                    <div style={{"display": "flex", "alignItems": "center"}}>
                                                        <div style={{"width": "120px", "overflow": "scroll"}}>
                                                           <label>{currentVal} </label>
                                                        </div>
                                                        
                                                        <div>

                                                            {gdt1EditItemName !== currKey && <button
                                                            onClick={()=>{
                                                                setGdt1EditItemName(currKey);
                                                            }}
                                                        >{editText}</button>}
                                                            {gdt1EditItemName === currKey && <div>
                                                                {itemType === "string" && <input value={gdt1Input}
                                                                    onChange={(event)=>{
                                                                        setGdt1Input(event.target.value);
                                                                    }}
                                                                    style={{"width": "60px"}}
                                                                ></input>}

                                                                {itemType === "number" && <input 
                                                                    value={gdt1Input}
                                                                    type="number"
                                                                    max="2147483647" min="-2147483648" step="1" 
                                                                    onChange={(event)=>{
                                                                        setGdt1Input(event.target.value);
                                                                    }}
                                                                    style={{"width": "60px"}}
                                                                ></input>}

                                                                {itemType === "boolean" && 
                                                                    <select 
                                                                        value={gdt1Input}
                                                                        onChange={(event)=>{
                                                                            setGdt1Input(event.target.value);
                                                                        }}                                                                        
                                                                    >   
                                                                        <option value="" key="gdt1editbooldefaultnone">-- {selectText} --</option>
                                                                        <option value={trueText} key="gdt1editbooltrue">{trueText}</option>
                                                                        <option value={falseText} key="gdt1editboolfalse">{falseText}</option>
                                                                    </select>
                                                                }
                                                                <button
                                                                    onClick={()=>{
                                                                        let newVal = gdt1Input;
                                                                        if (newVal.length === 0) {
                                                                            return;
                                                                        }
                                                                            
                                                                        if (itemType === "boolean") {
                                                                            if (newVal === trueText) {
                                                                                newVal = true;
                                                                            } else {
                                                                                newVal = false;
                                                                            }
                                                                        }
                                                                        let gdt1Temp = gdt1;
                                                                        gdt1[currKey]["current_value"] = newVal;

                                                                        setGdt1(gdt1Temp);
                                                                        setGdt1EditItemName("");
                                                                        setGdt1Input("");
                                                                    }}
                                                                >{updateText}</button>  
                                                                <br></br> 
                                                                <button
                                                                    onClick={()=>{
                                                                        setGdt1EditItemName("");
                                                                        setGdt1Input("");
                                                                    }}
                                                                >{cancelText}</button>                                                     
                                                        </div>}
                                                        </div>                          

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            
                            </div>
                            <button
                                onClick={()=>{
                                    saveAllChangesToCloud(); //TODO impl later
                                }}
                            
                            >{saveToCloudText}</button>




                        </div>
                </div>}




{/* for Game-Maker-Level only */}
{isForGameMaker === true && <>
                {focusingPanelName === "2epp" && <div>
                {/* "2.Emu Player Profile" */}
2
                </div>}
                
                {focusingPanelName === "3epa" && <div>
                {/* "3.Emu Player Account" */}
3
                </div>}

                {focusingPanelName === "4ess" && <div>
                {/* "4.Emu SL slots" */}
4
                </div>}

</>}

            </div>


        </div>




</div>
</div>);
}