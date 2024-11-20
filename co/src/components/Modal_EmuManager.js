import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';
import { fetchEmuData1GdtVM, fetchEmuData2EppVM, fetchEmuData3EpaVM, fetchEmuData4EssVM, updateAllSetsVM } from '../viewmodels/EmuManagingViewModel';
import { getProjectGameDataDesignVM } from '../viewmodels/GameDataViewModel';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';


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


    // let modalStyleName = "modalBackboard";

    // if (isDisplay === true) {
    //     modalStyleName = "displayBlock modalBackboard";
    // } else {
    //     modalStyleName = "displayNone modalBackboard";
    // }

    let modalStyleName = "displayBlock modalBackboard"; //TODO temp, fixing


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


    
    const [visualMap, setVisualMap] = useState({});

    const [gdt1, setGdt1] = useState({});
    const [epp2, setEpp2] = useState({});
    const [epa3, setEpa3] = useState({});
    const [ess4, setEss4] = useState({});

    const [gdt1Input, setGdt1Input] = useState("");
    const [gdt1EditItemName, setGdt1EditItemName] = useState("");


    const [epp2EditItemName, setEpp2EditItemName] = useState("");
    const [epp2IconNamePreview, setEpp2IconNamePreview] = useState("");
    const [epp2Input, setEpp2Input] = useState("");


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
                                           // console.log("\t\t--prepared from design-list."); //TODO test

        } 
                                            if (objSize !== 0 && tempObj1 !== undefined && tempObj1 !== null) { 
                                          // console.log("\t\t--fetched from cloud."); //TODO test
                                            }

                                                    console.log("... gdt1 prep: ", tempObj1); //TODO test
        setGdt1(tempObj1);

    } 



    async function prepare2Epp() {
        // if local is not ready, from cloud
        let tempObj2 = await fetchEmuData2EppVM({projectName: projName, currUser: username});
        let objSize = Object.keys(tempObj2).length;
        if (objSize === 0 || tempObj2 === undefined || tempObj2 === null) {
            // initialize

            tempObj2 = { 
                "playername": "playerA",
                "userTitle": "title1",
                "iconPicName": "",
                "level": 2,
                "membership": 1,
            };
        }
                                                console.log("... epp2 prep: ", tempObj2); //TODO test

        setEpp2(tempObj2);
    }        
    async function prepare3Epa() {
        // if local is not ready, from cloud
        let tempObj3 = await fetchEmuData3EpaVM({projectName: projName, currUser: username});
        let objSize = Object.keys(tempObj3).length;
        if (objSize === 0 || tempObj3 === undefined || tempObj3 === null) {
            return;
        }

                                            console.log("... epa3 prep: ", tempObj3); //TODO test

        setEpa3(tempObj3);
    }              
    async function prepare4Ess() {
        // if local is not ready, from cloud
        let tempObj4 = await fetchEmuData4EssVM({projectName: projName, currUser: username});
        let objSize = Object.keys(tempObj4).length;
        if (objSize === 0 || tempObj4 === undefined || tempObj4 === null) {
            return;
        }

                                            console.log("... ess4 prep: ", tempObj4); //TODO test
        setEss4(tempObj4);
    }


    useEffect(() => {
        console.log("modalWindow - EmyMgr: firstTimeEnter? ", firstTimeEnter);
        console.log("\t\tinfo: username,projName", username , "and" ,projName);

        
        if (firstTimeEnter === true) {
            prepare1Gdt();
            // prepare2Epp();
            // prepare3Epa();
            // prepare4Ess();
            // fetchVisualListFromCloud();

                                                console.log("!!!!!!!!!!!! Emu-Manager first-enter...");
            setFirstTimeEnter(false);
        }

        // let UILang = getUILanguage();
        // prepUILange(UILang);
    });

    function prepUILange(langOption) {
        setLanguageCodeTextOption(langOption);
    }

    async function saveAllChangesToCloud() {
        //TODO send all 4 sets to cloud
        let resObj = {};
        resObj["gdt1"] = gdt1;
        resObj["epp2"] = epp2;
        resObj["epa3"] = epa3;
        resObj["ess4"] = ess4;

        await updateAllSetsVM({projectName: projName, currUser: username, dataObj: resObj});

    }

    async function fetchVisualListFromCloud() {

        const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
        if (obj === undefined || obj === null) {
            return;
        }

        console.log("fetched obj = ", obj.visual);

        let tempMap = {};
        let resVis = obj.visual;
        resVis.map((item, index) => {  
            let varName = item["var"];
            let urlName = item["url"];
            tempMap[varName] = urlName;
        });

        setVisualMap(tempMap);

                                    console.log("emu-mgr, resource -- visual map  = =", tempMap);
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
                    <div>Emu-Player Profile for Testing</div>
                    <div
                        style={{
                            "borderRadius": "0px",
                            "overflow": "scroll",
                            "paddingLeft": "12%"
                        }}
                    >

                        <div  className="darkerGrey"
                             style={{
                                "borderRadius": "0px",
                                "overflow": "scroll",
                                "width": "622px",
                                }}
                            
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th style={{"width": "200px"}}>Value Name</th>
                                    <th style={{"width": "200px"}}>Value Content</th>
                                    <th style={{"width": "200px"}}>Operation</th>
                                
                                </tr>

                            </thead>

                            <tbody>
 
                                <tr>
                                    <td><label>Player Name Key</label></td>
                                    <td>
                                        <label>{epp2["playername"]}</label>
                                    </td>
                                    <td>
                                        {epp2EditItemName !== "PlayerNameKey" && <div>
                                            <button
                                                onClick={()=>{
                                                    setEpp2EditItemName("PlayerNameKey");
                                                }}
                                            >{editText}</button>
                                        </div>}
                                        {epp2EditItemName === "PlayerNameKey" && <div>
                                                <input
                                                    onChange={(event)=>{
                                                        let val = event.target.value;
                                                        setEpp2Input(val);
                                                    }}
                                                ></input>
                                                <br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2({...epp2,  "playername": epp2Input});
                                                        setEpp2EditItemName("");
                                                        setEpp2Input("");
                                                    }}
                                                >{updateText}</button><br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2EditItemName("");
                                                        setEpp2Input("");
                                                    }}
                                                >{cancelText}</button>
                                        </div>}
                                       
                                    </td>
                                </tr>
                                <tr>
                                    <td>User Title</td>
                                    <td>
                                        <label>{epp2["userTitle"]}</label>
                                    </td>
                                    <td>
                                        {epp2EditItemName !== "UserTitle" && <div>
                                            <button
                                                onClick={()=>{
                                                    setEpp2EditItemName("UserTitle");
                                                }}
                                            >{editText}</button>
                                        </div>}
                                        {epp2EditItemName === "UserTitle" && <div>
                                                <input
                                                    onChange={(event)=>{
                                                        let val = event.target.value;
                                                        setEpp2Input(val);
                                                    }}
                                                ></input>
                                                <br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2({...epp2,  "userTitle": epp2Input});
                                                        setEpp2EditItemName("");
                                                        setEpp2Input("");
                                                    }}
                                                >{updateText}</button><br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2EditItemName("");
                                                    }}
                                                >{cancelText}</button>
    
                                        </div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Icon</td>
                                    <td>
                                        <div>
                                                {(epp2["iconPicName"] !== undefined && epp2["iconPicName"] !== "") &&
                                                    <img 
                                                        className="iconPreview" 
                                                        src={visualMap[epp2["iconPicName"]]} 
                                                        alt="preview icon"
                                                    />}
                                        
                                        </div>
                                    </td>
                                    <td>
                                        {epp2EditItemName !== "Icon" && <div>
                                            <button
                                                onClick={()=>{
                                                    setEpp2EditItemName("Icon");
                                                }}
                                            >{editText}</button>
                                        </div>}
                                        {epp2EditItemName === "Icon" && <div>
                                      
                                                <select

                                                    onChange={(event)=>{
                                                        let varVal = event.target.value; //var-name
                                                        // let urlVal = visualMap[varVal];
                                                        // console.log("Select-list change: now get..", urlVal, " \nfrom ", varVal);
                                                        // console.log("visualMap = ", visualMap);
                                                        setEpp2IconNamePreview(varVal);

                                                        //TODO update previewing-icon-url

                                                    }}
                                                >
                                                    <option key="picNamesDefaultNone" value="">-- {selectText} --</option>

                                                    {Object.keys(visualMap).map((currKey) => {
                                                        let keyStr = "picNames_" + currKey;
                                                        
                                                        return (
                                                            <option
                                                                key={keyStr}
                                                                value={currKey}
                                                            >{currKey}</option>
                                                        ) 

                                                    })}

                                                </select>
                                                <div>   
                                                        {(visualMap[epp2IconNamePreview] !== undefined && visualMap[epp2IconNamePreview] !== "") && 
                                                        <img 
                                                            className="iconPreview" 
                                                            src={visualMap[epp2IconNamePreview]} 
                                                            alt="preview icon"
                                                        />}
                                                </div>
                                                
                                                <br></br>
                                                <button
                                                    onClick={()=>{
                                                        // use current epp2IconNamePreview as the new url...
                                                        setEpp2({...epp2,  "iconPicName": epp2IconNamePreview});

                                                    }}
                                                >{updateText}</button><br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2EditItemName("");
                                                    }}
                                                >{cancelText}</button>
                                      
                                                                               
                                        </div>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Level</td>
                                    <td>
                                        <label>{epp2["level"]}</label>
                                    </td>
                                    <td>
                                        {epp2EditItemName !== "Level" && <div>
                                            <button
                                                onClick={()=>{
                                                    setEpp2EditItemName("Level");
                                                }}
                                            >{editText}</button>
                                        </div>}
                                        {epp2EditItemName === "Level" && <div>
                                                <input
                                                    onChange={(event)=>{
                                                        let val = event.target.value;
                                                        setEpp2Input(val);
                                                    }}
                                                ></input>
                                                <br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2({...epp2,  "level": epp2Input});
                                                        setEpp2EditItemName("");
                                                        setEpp2Input("");
                                                    }}
                                                >{updateText}</button><br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2EditItemName("");
                                                    }}
                                                >{cancelText}</button>
                                           
                                        </div>}

                                    </td>
                                </tr>
                                <tr>
                                    <td>Membership</td>
                                    <td>
                                        <label>{epp2["membership"]}</label>
                                    </td>
                                    <td>
                                        {epp2EditItemName !== "Membership" && <div>
                                            <button
                                                onClick={()=>{
                                                    setEpp2EditItemName("Membership");
                                                }}
                                            >{editText}</button>
                                        </div>}
                                        {epp2EditItemName === "Membership" && <div>

                                                <input
                                                    onChange={(event)=>{
                                                        let val = event.target.value;
                                                        setEpp2Input(val);
                                                    }}
                                                ></input>
                                                <br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2({...epp2,  "membership": epp2Input});
                                                        setEpp2EditItemName("");
                                                        setEpp2Input("");
                                                    }}
                                                >{updateText}</button><br></br>
                                                <button
                                                    onClick={()=>{
                                                        setEpp2EditItemName("");
                                                    }}
                                                >{cancelText}</button>
                                        </div>}

                                    </td>
                                </tr>
                                
                                
                            </tbody>
                        </table>
                    </div>
                
                    </div>                                 
                </div>}
                
                {focusingPanelName === "3epa" && <div>
                {/* "3.Emu Player Account" */}
                    <label>Emu-Player Account for Testing</label>
                    <div
                        style={{
                            "borderRadius": "0px",
                            "overflow": "scroll",
                            "paddingLeft": "29%"
                        }}
                    >

                        <div  className="darkerGrey"
                             style={{
                                "borderRadius": "0px",
                                "overflow": "scroll",
                                "width": "350px",
                                }}
                            
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th>     
                                        Value Name
       </th>
                                    <th>
                                        Value Content
                                    </th>
                                    <th>
                                        Operation
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>Player Account Name</td>
                                        <td>(player name value here, ["playername"])</td>
                                        <td>
                                            <div>(buttons)</div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Account Email</td>
                                        <td>(account email value here, ["email"])</td>
                                        <td>
                                            <div>(buttons)</div>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>

                    </div>
                </div>


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