import { useState, useEffect } from 'react';
import langDictionary from './textDictionary';
import { fetchEmuData1GdtVM, fetchEmuData2EppVM, fetchEmuData3EpaVM, fetchEmuData4EssVM, fetchEmuData5ShpVM, updateAllSetsVM } from '../viewmodels/EmuManagingViewModel';
import { getProjectGameDataDesignVM } from '../viewmodels/GameDataViewModel';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';


export default function Modal_EmuManager({
    isDisplay,
    handleEmCancel,
    getUILanguage,
    update1Gdt, update2Epp, update3Epa, update4Ess, update5Shp,
    isForGameMaker,
    username,projName,

}) {
//allows user to setup emu-data for testing


//1.PlayerGameData (tracker)

//2.PlayerProfile (player profile for this game)

//3.PlayerAccountSettings (player account info for all games)

//4.Save/Load slot (emu)


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

    const itemNameText = textDictItem.itemNameText !== undefined ? 
        textDictItem.itemNameText
        :textDictItemDefault.itemNameText;

    const itemContentText = textDictItem.itemContentText !== undefined ?
        textDictItem.itemContentText
        : textDictItemDefault.itemContentText;

    const operationText = textDictItem.operationText !== undefined ?
        textDictItem.operationText
        : textDictItemDefault.operationText;

    const emuGameDataText = textDictItem.emuGameDataText !== undefined ?
        textDictItem.emuGameDataText
        : textDictItemDefault.emuGameDataText

    const emuPlayerProfile = textDictItem.emuPlayerProfile !== undefined ? 
        textDictItem.emuPlayerProfile
        : textDictItemDefault.emuPlayerProfile;

    const emuPlayerAccount = textDictItem.emuPlayerAccount !== undefined ?
        textDictItem.emuPlayerAccount
        : textDictItemDefault.emuPlayerAccount;

    const emuShopInfo = textDictItem.emuShopInfo !== undefined ?
        textDictItem.emuShopInfo
        : textDictItemDefault.emuShopInfo;

    const productIDTextText = textDictItem.productIDTextText !== undefined ?
        textDictItem.productIDTextText
        : textDictItemDefault.productIDTextText;

    const productNameText = textDictItem.productNameText !== undefined ?
        textDictItem.productNameText
        : textDictItemDefault.productNameText;

    const productPriceText = textDictItem.productPriceText !== undefined ?
        textDictItem.productPriceText
        : textDictItemDefault.productPriceText;

    const productInfoText = textDictItem.productInfoText !== undefined ?
        textDictItem.productInfoText
        : textDictItemDefault.productInfoText;

    const deleteText = textDictItem.deleteText !== undefined ?
        textDictItem.deleteText
        :  textDictItemDefault.deleteText;

    const hideText = textDictItem.hideText !== undefined ?
        textDictItem.hideText
        : textDictItemDefault.hideText;


//TODO15


    
    const [visualMap, setVisualMap] = useState({});

    const [gdt1, setGdt1] = useState({});
    const [epp2, setEpp2] = useState({});
    const [epa3, setEpa3] = useState({});
    const [ess4, setEss4] = useState({});
    const [shp5, setShp5] = useState({});

    const [gdt1Dup, setGdt1Dup] = useState({});
    const [epp2Dup, setEpp2Dup] = useState({});
    const [epa3Dup, setEpa3Dup] = useState({});
    const [ess4Dup, setEss4Dup] = useState({});

    const [gdt1Input, setGdt1Input] = useState("");
    const [gdt1EditItemName, setGdt1EditItemName] = useState("");


    const [epp2EditItemName, setEpp2EditItemName] = useState("");
    const [epp2IconNamePreview, setEpp2IconNamePreview] = useState("");
    const [epp2Input, setEpp2Input] = useState("");

    const [epa3EditItemName, setEpa3EditItemName] = useState("");
    const [epa3Input, setEpa3Input] = useState("");

    const [addEmuProductItem, setAddEmuProductItem] = useState(false);
                                // product key, name, price, info

    const [addingEProductKey, setAddingEProductKey] = useState("");
    const [addingEProductName, setAddingEProductName] = useState("");
    const [addingEProductPrice, setAddingEProductPrice] = useState("");
    const [addingEProductInfo, setAddingEProductInfo] = useState("");


    const [cloudUpdated, setCloudUpdated] = useState(false);


    //     {productKey: "pdt1",
    //      productName: "product1",
    //      productPrice: 30,
    //      productInfo: "product1-description",
    //     },
    //     {productKey: "pdt2",
    //      productName: "product2",
    //      productPrice: 50,
    //      productInfo: "product2-description",
    //     },
    //     {productKey: "pdt3",
    //      productName: "product3",
    //      productPrice: 10,
    //      productInfo: "product3-description",
    //     },
    //     {productKey: "pdt4",
    //      productName: "product4",
    //      productPrice: 30,
    //      productInfo: "product4-description",
    //     },
    //     {productKey: "pdt5",
    //      productName: "product5",
    //      productPrice: 50,
    //      productInfo: "product5-description",
    //     },
    //     {productKey: "pdt6",
    //      productName: "product6",
    //      productPrice: 10,
    //      productInfo: "product6-description",
    //     },


   
    //     {productKey: "pdt1",
    //      acquired: true,
    //      acquiredTimeStamp: "timestamp1",
    //     },
    //     {productKey: "pdt2",
    //      acquired: false,
    //      acquiredTimeStamp: "timestamp2",
    //     },
    //     {productKey: "pdt3",
    //      acquired: true,
    //      acquiredTimeStamp: "timestamp3",
    //     },
    //     {productKey: "pdt4",
    //      acquired: false,
    //      acquiredTimeStamp: "timestamp4",
    //     },
    //     {productKey: "pdt5",
    //      acquired: true,
    //      acquiredTimeStamp: "timestamp5",
    //     },
    //     {productKey: "pdt6",
    //      acquired: false,
    //      acquiredTimeStamp: "timestamp6",
    //     },          



    const [editingShopEmuItemIndex, setEditingShopEmuItemIndex] = useState(-1);
    const [editingShopEmuItemName, setEditingShopEmuItemName] = useState("");
    const [editingShopEmuItemPrice, setEditingShopEmuItemPrice] = useState("");
    const [editingShopEmuItemInfo, setEditingShopEmuItemInfo] = useState("");
    const [editingShopEmuItemIsAcquired, setEditingShopEmuItemIsAcquired] = useState("");



//TODO20
    const [focusingPanelName, setFocusingPanelName] = useState("");

    const namingMap = {
        "1gdt": "1.Game Data to Test",
        "2epp": "2.Emu Player Profile",
        "3epa": "3.Emu Player Account",
        "4ess": "4.Emu SL slots",
        "5shp": "5.Emu Shop Product Items",
    }

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    function update1GdtToOuterLayer() {
        //gdt1
        update1Gdt(gdt1);
    }

    function makeDupGdt1(data1) {
        let tempObj = {};
        {Object.keys(data1).map((currKey) => {
            let name = data1[currKey]["name"];
            let defaultVal = data1[currKey]["default_value"];
            let dataType =data1[currKey]["data_type"];
            let currVal = data1[currKey]["current_value"];

            let obj = {
                "name": name,
                "default_value": defaultVal,
                "data_type": dataType,
                "current_value": currVal
            }
            let keyStr = currKey;
            tempObj[keyStr] = obj;
        })} 

                            console.log("making dup-gdt1... ", tempObj);

        setGdt1Dup(tempObj);
        return tempObj;

    }

    function update2EppToOuterLayer() {
        //epp2
        update2Epp(epp2);
    }

    function makeDupEpp2(data2) {
        let pn = data2["playername"];
        let ut = data2["userTitle"];
        let icpn = data2["iconPicName"];
        let lvl = data2["level"];
        let mbsp = data2["membership"];

        let tempObj = { 
            "playername": pn,
            "userTitle": ut,
            "iconPicName": icpn,
            "level": lvl,
            "membership": mbsp,
        };

                                console.log("making dup-epp2... ", tempObj);
        setEpp2Dup(tempObj);
        return tempObj;

    }

    function update3EpaToOuterLayer() {
        //epa3

        update3Epa(epa3);
    }

    function makeDupEpa3(data3) {
        let pn = data3["playername"];
        let eml = data3["email"];

        let tempObj = {
            "playername": pn,
            "email": eml,            
        }


                                    console.log("making dup-epa3... ", tempObj);
        setEpa3Dup(tempObj);
        return tempObj;

    }


    // function update4EssToOuterLayer(data4) {
    //     //ess4
    //     update4Ess(data4);
    // } //TODO temp: not using


    function update5ShpToOuterLayer() {
        update5Shp(shp5);

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
        update1Gdt(tempObj1);
        
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
        update2Epp(tempObj2);

    }        
    async function prepare3Epa() {
        // if local is not ready, from cloud
        let tempObj3 = await fetchEmuData3EpaVM({projectName: projName, currUser: username});
        let objSize = Object.keys(tempObj3).length;
        if (objSize === 0 || tempObj3 === undefined || tempObj3 === null) {
            tempObj3 = {
                "playername": "playerA",
                "email": "example@email.com",
            }
        }

                                            console.log("... epa3 prep: ", tempObj3); //TODO test

        setEpa3(tempObj3);
        update3Epa(tempObj3);


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
        update4Ess(tempObj4);

    }

    async function prepare5Shp() {
        //"5shp"
        let tempObject5 = await fetchEmuData5ShpVM({projectName: projName, currUser: username});
        if (tempObject5 === undefined || tempObject5 === null || Object.keys(tempObject5).length === 0) {

            let stockArrTemp = [
                {productKey: "pdt1",
                productName: "product1",
                productPrice: 30,
                productInfo: "product1-description",
               },
               {productKey: "pdt2",
                productName: "product2",
                productPrice: 50,
                productInfo: "product2-description",
               },
               {productKey: "pdt3",
                productName: "product3",
                productPrice: 10,
                productInfo: "product3-description",
               },
               {productKey: "pdt4",
                productName: "product4",
                productPrice: 30,
                productInfo: "product4-description",
               },
               {productKey: "pdt5",
                productName: "product5",
                productPrice: 50,
                productInfo: "product5-description",
               },
               {productKey: "pdt6",
                productName: "product6",
                productPrice: 10,
                productInfo: "product6-description",
               },
            ];

            let emuPlayerShopStatusTemp = [  {productKey: "pdt1",
                acquired: true,
                acquiredTimeStamp: "timestamp1",
            },
            {productKey: "pdt2",
                acquired: false,
                acquiredTimeStamp: "timestamp2",
            },
            {productKey: "pdt3",
                acquired: true,
                acquiredTimeStamp: "timestamp3",
            },
            {productKey: "pdt4",
                acquired: false,
                acquiredTimeStamp: "timestamp4",
            },
            {productKey: "pdt5",
                acquired: true,
                acquiredTimeStamp: "timestamp5",
            },
            {productKey: "pdt6",
                acquired: false,
                acquiredTimeStamp: "timestamp6",
            },  ];


            tempObject5 = {
                "shopStock": stockArrTemp,
                "playerPurchaseStatus":  emuPlayerShopStatusTemp
            }

        }
                                            console.log("... shp5 prep: ", tempObject5);
        // VM func for shop-product-items


        setShp5(tempObject5);
        update5Shp(tempObject5);

    }


    useEffect(() => {
                                    //TODO
                                    // console.log("modalWindow - EmyMgr: firstTimeEnter? ", firstTimeEnter);
                                    // console.log("\t\tinfo: username,projName", username , "and" ,projName);

        
        if (firstTimeEnter === true) {
            prepare1Gdt();
            prepare2Epp();
            prepare3Epa();
            // prepare4Ess();                                   //TODO later
            prepare5Shp();

            fetchVisualListFromCloud();


            update1GdtToOuterLayer(); 
            update2EppToOuterLayer(); 
            update3EpaToOuterLayer();

                                                console.log("!!!!!!!!!!!! Emu-Manager first-enter...", gdt1 , "\n", epp2, "\n", epa3);
            setFirstTimeEnter(false);
        }



        let UILang = getUILanguage();
        prepUILange(UILang);
    });

    function prepUILange(langOption) {
        setLanguageCodeTextOption(langOption);
    }

    async function saveAllChangesToCloud() {
        // let temp1 =  makeDupGdt1(gdt1); 
        // let temp2 = makeDupEpp2(epp2); 
        // let temp3 = makeDupEpa3(epa3);


        update1GdtToOuterLayer(); 
        update2EppToOuterLayer(); 
        update3EpaToOuterLayer();
        // update 4
        update5ShpToOuterLayer();

        


        //TODO send all 4 sets to cloud
        let resObj = {};
        resObj["gdt1"] = gdt1;
        resObj["epp2"] = epp2;
        resObj["epa3"] = epa3;
        resObj["ess4"] = ess4;
        resObj["5shp"] = shp5;

        await updateAllSetsVM({projectName: projName, currUser: username, dataObj: resObj});

        alert("Changes updated!");
        setCloudUpdated(true);


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


            <div
                style={{"display": "flex", "left": "60%"}}
            >                
                <button
                    className="cursor_pointer"
                    style={{"position": "relative", "left": "30%"}}
                    onClick={()=>{
                        saveAllChangesToCloud(); //TODO impl later
                    }}
                >{saveToCloudText}</button>
            

            <button className="cursor_pointer modalClose" 
                style={{"position": "relative", "left": "60%"}}
                onClick={()=>{
                    setFocusingPanelName("");
                    if (cloudUpdated === false) {
                        let resp = window.confirm("Are you sure you would like to exit without saving to cloud?");
                        if (!resp) {
                            return;
                        }
                    }
                    handleEmCancel();
                    setCloudUpdated(false);
                    
                }}
            >{closeText}</button>
            </div>


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
                        className={focusingPanelName === "1gdt" ? "selectedTab" : ""}
                        onClick={()=>{
                            setFocusingPanelName("1gdt");
                        }}
                    >1.{emuGameDataText}</button>

                    <br></br>
                    <button
                        className={focusingPanelName === "2epp" ? "selectedTab" : ""}
                        onClick={()=>{
                            setFocusingPanelName("2epp");
                        }}                    
                    >2.{emuPlayerProfile}</button>
                    <br></br>
                    <button
                        className={focusingPanelName === "3epa" ? "selectedTab" : ""}
                        onClick={()=>{
                            setFocusingPanelName("3epa");
                        }}             
                    >3.{emuPlayerAccount} </button>
                    <br></br>
                    <button
                        className={focusingPanelName === "4ess" ? "selectedTab" : ""}
                        onClick={()=>{
                            setFocusingPanelName("4ess");
                        }}             
                    >4.Emu SL slots</button>
                    <br></br>
                    <button
                        className={focusingPanelName === "5shp" ? "selectedTab" : ""}
                        onClick={()=>{
                            setFocusingPanelName("5shp");
                        }}

                    >
                     5.{emuShopInfo}
                    </button>


</div>}



                {((isForGameMaker === true && focusingPanelName === "1gdt") || isForGameMaker === false) && <div>
                {/* "1.Game Data to Test" */}
                {/* for Game-Maker and other Node-Level Editor */}
                        <br></br>
                        
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
                        





                        </div>
    
                </div>}




{/* for Game-Maker-Level only */}
{isForGameMaker === true && <>
                {focusingPanelName === "2epp" && <div>
                {/* "2.Emu Player Profile" */}
                    <br></br>
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
                                    <th style={{"width": "200px"}}>{itemNameText}</th>
                                    <th style={{"width": "200px"}}>{itemContentText}</th>
                                    <th style={{"width": "200px"}}>{operationText}</th>

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
                                        <div>   {epp2["iconPicName"]}<br></br>
                                                
                                                {(epp2["iconPicName"] !== undefined && epp2["iconPicName"] !== "") &&
                                                    <img 
                                                        className="iconPreview" 
                                                        src={visualMap[epp2["iconPicName"]]} 
                                                        alt="chosen icon"
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
                    <br></br>
                    <div
                        style={{
                            "borderRadius": "0px",
                            "overflow": "scroll",
                            "paddingLeft": "15%"
                        }}
                    >

                        <div  className="darkerGrey"
                             style={{
                                "borderRadius": "0px",
                                "overflow": "scroll",
                                "width": "613px",
                                }}
                    >


                        <table>
                            <thead>
                                <tr>
                                    <th style={{"width":"170px", "overflow": "scroll"}}>     
                                        {itemNameText}
       </th>
                                    <th style={{"width":"320px", "overflow": "scroll"}}>
                                        {itemContentText}
                                    </th>
                                    <th style={{"width":"100px", "overflow": "scroll"}}>
                                        {operationText}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td>Player Account Name</td>
                                        <td>{epa3["playername"]}</td>
                                        <td>
                                            <div>
                                                {epa3EditItemName !== "playername" && <button
                                                    onClick={()=>{
                                                        setEpa3EditItemName("playername");
                                                    }}
                                                >{editText}</button>}
                                                {epa3EditItemName === "playername" && <div>
                                                    <input
                                                        style={{"width":"90px"}}
                                                        onChange={(event)=>{
                                                            let val = event.target.value;
                                                            setEpa3Input(val);
                                                        }}
                                                    ></input><br></br>
                                                    <button
                                                        onClick={()=>{
                                                            if (epa3Input.length === 0) {
                                                                return;
                                                            }
                                                            setEpa3({...epa3,  "playername": epa3Input});
                                                            setEpa3EditItemName("");
                                                            setEpa3Input("");
                                                        }}
                                                    >{updateText}</button><br></br>
                                                    <button
                                                        onClick={()=>{
                                                            setEpa3EditItemName("");
                                                        }}
                                                    >{cancelText}</button>
                                                </div>}
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Account Email</td>
                                        <td>{epa3["email"]}</td>
                                        <td>
                                            <div>
                                                {epa3EditItemName !== "email" && <button
                                                    onClick={()=>{
                                                        setEpa3EditItemName("email");
                                                    }}
                                                >{editText}</button>}
                                                {epa3EditItemName === "email" && <div>
                                                    <input
                                                        style={{"width":"90px"}}
                                                        onChange={(event)=>{
                                                            let val = event.target.value;
                                                            setEpa3Input(val);
                                                        }}
                                                    ></input><br></br>
                                                    <button
                                                        onClick={()=>{
                                                            if (epa3Input.length === 0) {
                                                                return;
                                                            }
                                                            setEpa3({...epa3,  "email": epa3Input});
                                                            setEpa3EditItemName("");
                                                            setEpa3Input("");
                                                        }}
                                                    >{updateText}</button><br></br>
                                                    <button
                                                        onClick={()=>{
                                                            setEpa3EditItemName("");
                                                        }}
                                                    >{cancelText}</button>
                                                </div>}
                                            </div>
                                        </td>
                                    </tr>
                            </tbody>
                        </table>

                    </div>
                </div>


                </div>}

                {focusingPanelName === "4ess" && <div>
                {/* "4.Emu SL slots" */}
4   SL slots settings

                
{/* Note: each sl-slot:
  creation timestamp [key?]
+ customized title
+ game progress (chapter + node-type + node + in-node-status(piece, etc.))
+ game data status object
+ backpack status object */}

                </div>}




                {focusingPanelName ==="5shp" && <div>
                    <div 
                        style={{
                            "borderRadius": "0px",
                            "overflow": "scroll",
                            "paddingLeft": "6%"
                        }}
                    >
                        <br></br>
                        <div  className="darkerGrey"
                            style={{
                                "borderRadius": "0px",
                                "overflow": "scroll",
                                "width": "800px",
                                "height": "300px"
                            }}
                            
                        >
                            <table>
                  
                            <tbody>
                            {shp5["shopStock"].map((item, index)=>{
                                let testUserAcquired = false;
                                if (shp5["playerPurchaseStatus"] === undefined || shp5["playerPurchaseStatus"].length === 0) {
                                    return;
                                }

                                let userRecordArr = shp5["playerPurchaseStatus"].filter(e => item["productKey"] == e["productKey"]);
                                if (userRecordArr.length > 0) {
                                    if (userRecordArr[0]["acquired"] === true) {
                                        testUserAcquired = true;
                                    }
                                }
                                let testUserAcquiredStr = testUserAcquired === true ? "T" : "F";

                                return (
                                <>
                                <tr>    
                                    <th style={{"width": "110px"}}>{productIDTextText}</th>
                                    <th style={{"width": "110px"}}>{productNameText}</th>
                                    <th style={{"width": "70px"}}>{productPriceText}</th>
                                    <th style={{"width": "200px"}}>{productInfoText}</th>
                                    <th style={{"width": "90px"}}>Test User Acquired? </th>
                                </tr>
                                
                                <tr style={{"height": "70px"}}>
                                    <td>{item["productKey"]}</td>
                                    <td style={{"height": "auto"}}>{item["productName"]}<br></br>
                                        {editingShopEmuItemIndex === index && <input
                                            style={{"width": "90px"}}
                                            onChange={(event)=>{
                                                setEditingShopEmuItemName(event.target.value);
                                            }}
                                        ></input>}
                                    </td>
                                    <td style={{"height": "auto"}}
                                    >{item["productPrice"]}<br></br>
                                        {editingShopEmuItemIndex === index && <input
                                            type="number"
                                            style={{"width": "50px"}}
                                            onChange={(event)=>{
                                                setEditingShopEmuItemPrice(event.target.value);
                                            }}
                                        ></input>}
                                    </td>
                                    <td style={{"height": "auto"}}>{item["productInfo"]}<br></br>
                                        {editingShopEmuItemIndex === index && <input
                                            style={{"width": "90px"}}
                                            onChange={(event)=>{
                                                setEditingShopEmuItemInfo(event.target.value);
                                            }}
                                        ></input>}
                                    </td>
                                    <td>
                                        {testUserAcquiredStr} <br></br>
                                        {editingShopEmuItemIndex === index && 
                                        <select 
                                            onChange={(event)=>{
                                                let val = event.target.value;
                                                let boolVal = false;
                                                if (val === "true") {
                                                    boolVal = true;
                                                }
                                                setEditingShopEmuItemIsAcquired(boolVal);
                                            }}
                                        >
                                            <option key="shopEditItemDefaultNone" value="">--</option>
                                            <option key="shopEditItemTrue" value="true">T</option>
                                            <option key="shopEditItemFalse" value="false">F</option>

                                        </select>}
                                    </td>
                                    <td>

                                        {editingShopEmuItemIndex !== index && <div
                                            style={{
                                                "display": "flex"
                                            }}
                                        >
          
                                        <button
                                            onClick={()=>{
          
                                                setEditingShopEmuItemName(shp5["shopStock"][index]["productName"]);
                                                setEditingShopEmuItemPrice(shp5["shopStock"][index]["productPrice"]);
                                                setEditingShopEmuItemInfo(shp5["shopStock"][index]["productInfo"]); 

                                                setEditingShopEmuItemIsAcquired(shp5["playerPurchaseStatus"][index]["acquired"]);

                                                setEditingShopEmuItemIndex(index);
                                            }}
                                        >{editText}</button>
                                        <br></br>
                                        <button>Hide</button>
                                        <br></br>
                                        <button>{deleteText}</button>
                                        
                                        </div>}
                                        {editingShopEmuItemIndex === index && 
                                        <div
                                            style={{
                                                "display": "flex"
                                            }}                                        
                                        >
                           
                                        <button
                                            onClick={()=>{
                                                //TODO
                                                let tempShopStock = shp5["shopStock"];
                                                let tempUserShopStatus = shp5["playerPurchaseStatus"];

                                                shp5["shopStock"][editingShopEmuItemIndex]["productName"] = editingShopEmuItemName;
                                                shp5["shopStock"][editingShopEmuItemIndex]["productPrice"] = editingShopEmuItemPrice;
                                                shp5["shopStock"][editingShopEmuItemIndex]["productInfo"] = editingShopEmuItemInfo;

                                                tempUserShopStatus[editingShopEmuItemIndex]["acquired"] = editingShopEmuItemIsAcquired;

                                                setShp5({... shp5, 
                                                        "shopStock": tempShopStock, 
                                                        "playerPurchaseStatus": tempUserShopStatus});
                                                        

                                                //reset all
                                                setEditingShopEmuItemName("");
                                                setEditingShopEmuItemPrice("");
                                                setEditingShopEmuItemInfo(""); 

                                                setEditingShopEmuItemIsAcquired("");


                                                setEditingShopEmuItemIndex(-1);

                                            }}
                                        >{updateText}</button>
                                        <br></br>
                                        <button
                                            onClick={()=>{
                                                setEditingShopEmuItemIndex(-1);
                                            }}
                                        >{cancelText}</button>
                                        
                                        
                                        </div>}
                                    </td>
                                </tr>
                                <br></br>
                                </>
                                
                                )})}
                              
                            </tbody>
                        </table>
                       
                        </div>
                        {(shp5["shopStock"].length >= 4)
                            && <div style={{
                            "backgroundColor": "grey",
                            "width": "800px",
                            "height": "17px",
                            "borderRadius": "0px",
                        }}>
                        ... ...
                        </div>}

                        


                    </div>

                        <br></br>
                        <button
                            onClick={()=>{
                                setAddEmuProductItem(true);
                            }}
                        >Add a New Emu-Product</button>
                        {addEmuProductItem && <div>
                            <label>{productIDTextText}</label>
                            <input
                                onChange={(event)=>{
                                    setAddingEProductKey(event.target.value);
                                }}
                            ></input>
                            <br></br>
                            <label>{productNameText}</label>
                            <input
                                onChange={(event)=>{
                                    setAddingEProductName(event.target.value);
                                }}
                            ></input>
                            <br></br>
                            <label>{productPriceText}</label>
                            <input
                                type="number"
                                min="0" max="100000" step="1"
                                onChange={(event)=>{
                                    setAddingEProductPrice(event.target.value);
                                }}
                            ></input>
                            <br></br>
                            <label>{productInfoText}</label>
                            <input
                                onChange={(event)=>{
                                    setAddingEProductInfo(event.target.value);
                                }}
                            ></input>
 

                            <br></br><br></br>
                            <button
                                onClick={()=>{
                                    setAddEmuProductItem(false);
                            
                                    //validate inputs before processing
                                    if (addingEProductKey.length === 0) {
                                            alert("Product Key should not be empty!");
                                            return;
                                    }
                                    if (addingEProductName.length === 0) {
                                            alert("Product Name should not be empty!");
                                            return;
                                    }


                                    let item = {
                                        "productKey": addingEProductKey,
                                        "productName": addingEProductName,
                                        "productPrice": addingEProductPrice,
                                        "productInfo": addingEProductInfo,

                                    };

                                    let shopStockList = shp5["shopStock"];
                                    shopStockList.push(item);


                                    setShp5({...shp5, "shopStock": shopStockList});
                                    
                                    

                                }}                                  
                            >Add</button>

                            <br></br>
                            <button
                                onClick={()=>{
                                    setAddEmuProductItem(false);
                                }}                            
                            >Cancel</button>
                        </div>}
                </div>}

</>}

            </div>


        </div>




</div>
</div>);
}


// new naming of ds… 
// (1)during-game-parameters (2)player per game info (3)account data (4)SL-data
// 		for each SL-data, it contains one entire set of "during-game-parameters” and other aspects… 
// 		for "player per game info”: player profile, player game-setting, player-inventory 
// 		for “during-game-parameters”, contains backpack
//      account data should be managed in separate website (instead of inside any game-project-playing)
// (5)shop data... (seaprate, with higher level sec+auth), but data fetched and integrated into shop-page
// coin-info, various financial-items info, per user(player) in per game
//                every operations fetch from and updates to cloud db ...
//                     log the purchases, also balance of in-game-coin, etc.
