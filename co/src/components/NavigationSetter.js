import { useState, useEffect } from 'react';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { getProjectGameDataDesignVM } from '../viewmodels/GameDataViewModel';
import langDictionary from './textDictionary';



export default function NavigationSetter({initialNavObj, 
  updateNavObj, openRm, 
  updateCurrentPageName, fetchPageName,
  initialScreenHeight, getScreenheight,
  userName,
  projName,
  updateEmuPlayerProfile,
  intialEmuPlayerProfile,
  getUILanguage,

}) {
    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16


    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];

    let saveChangesText = textDictItem.saveChangesText !== undefined ?
      textDictItem.saveChangesText
      : textDictItemDefault.saveChangesText;

    const updateText = textDictItem.updateText !== undefined ?
        textDictItem.updateText
        : textDictItemDefault.updateText;

    let manageResourceText = textDictItem.manageResourceText !== undefined ?
        textDictItem.manageResourceText
        : textDictItemDefault.manageResourceText;

    let gameProgressStrategyText = textDictItem.gameProgressStrategyText !== undefined ?
        textDictItem.gameProgressStrategyText
        : textDictItemDefault.gameProgressStrategyText;
        
    let mainPageText = textDictItem.mainPageText !== undefined ?
        textDictItem.mainPageText
        : textDictItemDefault.mainPageText;

    let storyPageText = textDictItem.storyPageText !== undefined ?
        textDictItem.storyPageText
        : textDictItemDefault.storyPageText;
    
    let settingsPageText = textDictItem.settingsPageText !== undefined ?
        textDictItem.settingsPageText
        : textDictItemDefault.settingsPageText;
    
    let playerProfilePageText = textDictItem.playerProfilePageText !== undefined ?
        textDictItem.playerProfilePageText
        : textDictItemDefault.playerProfilePageText;
    
    let gameStatusDataPageText = textDictItem.gameStatusDataPageText !== undefined ?
        textDictItem.gameStatusDataPageText
        : textDictItemDefault.gameStatusDataPageText;
    
    let shopPageText = textDictItem.shopPageText !== undefined ?
        textDictItem.shopPageText
        : textDictItemDefault.shopPageText;
    
    let duringGamePlayPageText = textDictItem.duringGamePlayPageText !== undefined ?
        textDictItem.duringGamePlayPageText
        : textDictItemDefault.duringGamePlayPageText;

    let fontForAllNavUIText = textDictItem.fontForAllNavUIText !== undefined ?
        textDictItem.fontForAllNavUIText
        : textDictItemDefault.fontForAllNavUIText;

    let selectAPageName = textDictItem.selectAPageName !== undefined ?
        textDictItem.selectAPageName
        : textDictItemDefault.selectAPageName;

    let  backGroundOfTheEntirePageText = textDictItem.backGroundOfTheEntirePageText !== undefined ?
        textDictItem. backGroundOfTheEntirePageText
        : textDictItemDefault. backGroundOfTheEntirePageText;

    let rectangleAndColorFilled = textDictItem.rectangleAndColorFilled !== undefined ?
        textDictItem.rectangleAndColorFilled
        : textDictItemDefault.rectangleAndColorFilled;

    let basePictureText = textDictItem.basePictureText !== undefined ?
        textDictItem.basePictureText
        : textDictItemDefault.basePictureText;

    let selectResource = textDictItem.selectResource !== undefined ?
        textDictItem.selectResource
        : textDictItemDefault.selectResource;

    let listItemSettingsText = textDictItem.listItemSettingsText !== undefined ?
        textDictItem.listItemSettingsText
        : textDictItemDefault.listItemSettingsText;

    let displayNamingText = textDictItem.displayNamingText !== undefined ?
        textDictItem.displayNamingText
        : textDictItemDefault.displayNamingText;

    let sEntryText = textDictItem.sEntryText !== undefined ?
        textDictItem.sEntryText
        : textDictItemDefault.sEntryText;

    let fixedListText = textDictItem.fixedListText !== undefined ?
        textDictItem.fixedListText
        : textDictItemDefault.fixedListText;

    let customizedItemsText = textDictItem.customizedItemsText !== undefined ? 
        textDictItem.customizedItemsText
        : textDictItemDefault.customizedItemsText;

    let selectPageToSetupText = textDictItem.selectPageToSetupText !== undefined ?
        textDictItem.selectPageToSetupText
        : textDictItemDefault.selectPageToSetupText;

    let backgroundColorText = textDictItem.backgroundColorText !== undefined ?
        textDictItem.backgroundColorText
        : textDictItemDefault.backgroundColorText;

    let horizontalText = textDictItem.horizontalText !== undefined ?
        textDictItem.horizontalText
        : textDictItemDefault.horizontalText;

    let verticalText = textDictItem.verticalText !== undefined ?
        textDictItem.verticalText
        : textDictItemDefault.verticalText;

    let groupPositionXText = textDictItem.groupPositionXText !== undefined ?
        textDictItem.groupPositionXText
        : textDictItemDefault.groupPositionXText;

    let groupPositionYText = textDictItem.groupPositionYText !== undefined ?
        textDictItem.groupPositionYText
        : textDictItemDefault.groupPositionYText;

    let itemWidthText = textDictItem.itemWidthText !== undefined ?
        textDictItem.itemWidthText
        : textDictItemDefault.itemWidthText;

    let itemHeightText = textDictItem.itemHeightText !== undefined ?
        textDictItem.itemHeightText
        : textDictItemDefault.itemHeightText;

    let itemGapText = textDictItem.itemGapText !== undefined ?
        textDictItem.itemGapText
        : textDictItemDefault.itemGapText;

    let fontColorText = textDictItem.fontColorText !== undefined ?
        textDictItem.fontColorText
        : textDictItemDefault.fontColorText;

    let fontSizeText = textDictItem.fontSizeText !== undefined ?
        textDictItem.fontSizeText
        : textDictItemDefault.fontSizeText;

    let positionXText = textDictItem.positionXText !== undefined ?
        textDictItem.positionXText
        : textDictItemDefault.positionXText;

    let positionYText = textDictItem.positionYText !== undefined ?
        textDictItem.positionYText
        : textDictItemDefault.positionYText;

    let widthText = textDictItem.widthText !== undefined ?
        textDictItem.widthText
        : textDictItemDefault.widthText;

    let heightText = textDictItem.heightText !== undefined ? 
        textDictItem.heightText
        : textDictItemDefault.heightText;

    let mainPageItemsText = textDictItem.mainPageItemsText !== undefined ?
        textDictItem.mainPageItemsText
        : textDictItemDefault.mainPageItemsText;

    let generalBackButtonSettingsText = textDictItem.generalBackButtonSettingsText !== undefined ?
        textDictItem.generalBackButtonSettingsText
        : textDictItemDefault.generalBackButtonSettingsText;

    let buttonLookingText = textDictItem.buttonLookingText !== undefined ?
        textDictItem.buttonLookingText
        : textDictItemDefault.buttonLookingText;

    let chapterTitleLookingText = textDictItem.chapterTitleLookingText !== undefined ?
        textDictItem.chapterTitleLookingText
        : textDictItemDefault.chapterTitleLookingText;

    




//TODO15
        
    const [screenHeight, setScreenHeight] = useState(initialScreenHeight);

    const screenWidth = 800; //TODO temp  

    const [currentSettingPage, setCurrentSettingPage] = useState("Main Page");
    const [openBackButtonSettingArea, setOpenBackButtonSettingArea] = useState(true);

    const [currentProjectNav, setCurrentProjectNav] = useState(initialNavObj);

    

    const [mainPageStoryName, setMainPageStoryName] = useState("");
    const [mainPagePlayerProfileName, setMainPagePlayerProfileName] = useState("");
    const [mainPageSettingsName, setMainPageSettingsName] = useState("");
    const [mainPageShopName, setMainPageShopName] = useState("");

    const [settingsPagePlaySpeedName, setSettingsPagePlaySpeedName] = useState("");
    const [settingsPageBgmVolName, setSettingsPageBgmVolName] = useState("");
    const [settingsPageSeVolName, setSettingsPageSeVolName] = useState("");

    const [backButtonName, setBackButtonName]= useState("");

    const [gsdPageMap, setGsdPageMap] = useState({});

    const [playerProfilePageIsAddingText, setPlayerProfilePageIsAddingText] = useState(false);
    const [playerProfilePageIsAddingPic, setPlayerProfilePageIsAddingPic] = useState(false);
    const [playerProfilePageIsAddingValue, setPlayerProfilePageIsAddingValue] = useState(false);

    const [ppTryingTextItemTextItalicBool, setPpTryingTextItemTextItalicBool] = useState(false);

    const [playerProfilePageAddingValueType, setPlayerProfilePageAddingValueType] = useState("");
    const [itemAddingTable, setItemAddingTable] = useState([]);


    const [gameDataDesignList, setGameData] = useState(-1);                    /* Important */

    const [emuPlayerInfo, setEmuPlayerInfo] = useState(intialEmuPlayerProfile);

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
      if (firstTimeEnter === true) {
            console.log("Navigation Setter -- "); //TODO test
            fetchProjResourceLists();
            getGameDataFromCloud(); //value-list: game-data
 

            //TODO value-list player-account 



            setFirstTimeEnter(false);
      }
      let UILang = getUILanguage();
      setLanguageCodeTextOption(UILang);

      //fetch from nav-previewer for current-page-name
      let tempPage= fetchPageName();
      setCurrentSettingPage(tempPage);

      let heightTemp = getScreenheight();
      setScreenHeight(heightTemp);

    });


    const [audioList, setAudioList] = useState([]); //TODO for bgm on each nav-page -- future feature
    const [visualList, setVisualList] = useState([]); 
    async function fetchProjResourceLists() {
      console.log("nav-setter: fetchProjResourceLists()"); //TODO test
      /* fetch from cloud db */
      const obj = await fetchProjectResourceVarPairsVM({userName: userName, projectName: projName});
      console.log("new render- nav setter: obj from cloud (resource list):"); //TODO test
      console.log(obj); //TODO test
      setAudioList(obj.audio);
      setVisualList(obj.visual);
    }

    function handleVisualRsrcSelectorSave(updatedList) {
      //TODO update visualList
      setVisualList(updatedList);

    }
    function handleAudioRsrcSelectorSave(updatedList) {
      //TODO update audioList
      console.log("!! Piece Setter, from Resource Selector: [audio]");
      console.log(updatedList);
      setAudioList(updatedList);
    }

    async function getGameDataFromCloud() {
      let isUpdated = true;

      let gDataMap = {};

      
      gDataMap = await getProjectGameDataDesignVM(({projectName: projName, uname: userName, mostUpdated: isUpdated}));
      setGameData(gDataMap);
  }


    function changePPTryingTextItemTextContent(event) { 
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj"]["textContent"] = event.target.value;

      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": tempNav["playerProfilePage-previewingTextObj"]});
               
      updateNavObj(tempNav);
               
    }

    function changePPTryingTextItemTextItalic() {
      setPpTryingTextItemTextItalicBool(!ppTryingTextItemTextItalicBool);
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj"]["textItalic"] = !ppTryingTextItemTextItalicBool;

      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": tempNav["playerProfilePage-previewingTextObj"]});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemFontSize(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj"]["textFontSize"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": tempNav["playerProfilePage-previewingTextObj"]});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemFontFamily(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj"]["textFont"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": tempNav["playerProfilePage-previewingTextObj"]});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemTextColor(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj"]["textColor"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": tempNav["playerProfilePage-previewingTextObj"]});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemPosX(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj"]["posX"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": tempNav["playerProfilePage-previewingTextObj"]});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemPosY(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj"]["posY"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": tempNav["playerProfilePage-previewingTextObj"]});
               
      updateNavObj(tempNav);      
    }

    function resetPPTryingTextItem() {
      let resetItem = {      
        "previewing": currentProjectNav["playerProfilePage-previewingTextObj"]["previewing"],
        "textContent": "",
        "textItalic": false,
        "textFontSize": 12,
        "textFont": "serif",
        "textColor": "#000000",
        "posX": 30,
        "posY": 50,
      }
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj"] = resetItem;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": resetItem});
      updateNavObj(tempNav);

      setPpTryingTextItemTextItalicBool(false);
    }

    function addPPTryingAnyItemNew(obj) { //TODO16
      let objTemp = obj;
      // make setter's side update table
      let tableTemp = itemAddingTable;

      //common properties (for all types):     
      // itemName
      // itemType
      // pos-x
      // pos-y
      
      //TODO details of this item, based on its type

      if (objTemp.itemType === "text") {
        objTemp["textContent"] = currentProjectNav["playerProfilePage-previewingTextObj"]["textContent"];
        objTemp["textItalic"] = currentProjectNav["playerProfilePage-previewingTextObj"]["textItalic"];
        objTemp["textFontSize"] = currentProjectNav["playerProfilePage-previewingTextObj"]["textFontSize"];
        objTemp["textFont"]  = currentProjectNav["playerProfilePage-previewingTextObj"]["textFont"];
        objTemp["textColor"] = currentProjectNav["playerProfilePage-previewingTextObj"]["textColor"];

     } else if (objTemp.itemType === "value") {
        objTemp["labelText"] = currentProjectNav["playerProfilePage-previewingValueObj"]["labelText"];
        objTemp["valueItemType"] = currentProjectNav["playerProfilePage-previewingValueObj"]["valueItemType"];
        objTemp["valueItemName"] = currentProjectNav["playerProfilePage-previewingValueObj"]["valueItemName"];
        objTemp["textFontSize"] = currentProjectNav["playerProfilePage-previewingValueObj"]["textFontSize"];
        objTemp["textFont"] = currentProjectNav["playerProfilePage-previewingValueObj"]["textFont"];
        objTemp["textColor"] = currentProjectNav["playerProfilePage-previewingValueObj"]["textColor"];

     } else if (objTemp.itemType === "pic") {
        objTemp["picName"] = currentProjectNav["playerProfilePage-previewingPicObj"]["picName"];
        objTemp["width"] = currentProjectNav["playerProfilePage-previewingPicObj"]["width"];
        objTemp["height"] = currentProjectNav["playerProfilePage-previewingPicObj"]["height"];

     }
      objTemp["selected"] = false;

      tableTemp.push(objTemp);

      setItemAddingTable(tableTemp);

      // add to the currentProjectNav["playerProfilePage-itemMap"]
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-itemMap"] = tableTemp;
      updateNavObj(tempNav);

    }

    function editItemTable(giveIndex, newItem) {
      let tableTemp = [];
      itemAddingTable.map((item, i)=>{
        if (i === giveIndex) {
          tableTemp.push(newItem);
        } else {
          tableTemp.push(itemAddingTable[i]);
        }
      })

      setItemAddingTable(tableTemp);
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-itemMap"] = tableTemp;
      updateNavObj(tempNav);

    }

    function deleteFromItemTable(givenItemName) {
      let tableTemp = [];
      
      itemAddingTable.map((item, i)=>{
        if (item["itemName"] !== givenItemName) {
          tableTemp.push(item);
        }
      })

      setItemAddingTable(tableTemp);
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-itemMap"] = tableTemp;
      updateNavObj(tempNav);

    }

    function changePPTryingValueItemLabelText(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["labelText"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);   
    }

    function changePPTryingPicItemPosX(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj"]["posX"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj": tempNav["playerProfilePage-previewingPicObj"]});
               
      updateNavObj(tempNav);
    }

    function changePPTryingPicItemPosY(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj"]["posY"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj": tempNav["playerProfilePage-previewingPicObj"]});
               
      updateNavObj(tempNav);
    }

    function changePPTryingPicName(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj"]["picName"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj": tempNav["playerProfilePage-previewingPicObj"]});
               
      updateNavObj(tempNav);
    }

    function changePPTryingPicItemWidth(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj"]["width"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj": tempNav["playerProfilePage-previewingPicObj"]});
               
      updateNavObj(tempNav);   
    }

    function changePPTryingPicItemHeight(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj"]["height"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj": tempNav["playerProfilePage-previewingPicObj"]});
               
      updateNavObj(tempNav);   
    }

    function resetPPTryingPicItem() {
      let resetItem = {
        "previewing": currentProjectNav["playerProfilePage-previewingPicObj"]["previewing"],
        "posX": 50,
        "posY": 50,
        "picName": "",
        "width": 200,
        "height": 200,
      };
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj"] = resetItem;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj": resetItem});
      updateNavObj(tempNav);
    }

    function changePPTryingValueItemPosX(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["posX"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);      
    }

    function changePPTryingValueItemPosY(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["posY"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);      
    }

    function changePPTryingValueItemFontSize(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["textFontSize"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);      
    }

    function changePPTryingValueItemFont(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["textFont"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);      
    }

    function changePPTryingValueItemTextColor(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["textColor"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);     
    }

    function resetPPTryingValueItem() {
      let resetItem = {
        "previewing": currentProjectNav["playerProfilePage-previewingValueObj"]["previewing"],
        "labelText": "",
        "valueItemType": "Game Data",
        "valueItemName": "",
        "posX": 30,
        "posY": 70,
        "textFontSize": 12,
        "textFont": "serif",
        "textColor": "#000000",
      };
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"] = resetItem;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": resetItem});
      updateNavObj(tempNav);
    }

    function changePlayerProfilePageAddingValueType(val) {
      setPlayerProfilePageAddingValueType(val);

      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["valueItemType"] = val;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);  
    }
  
    function changePlayerProfilePageAddingValueName(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["valueItemName"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);  
    }

    function resetPlayerProfilePageAddingValueName() {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj"]["valueItemName"] = "";
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});
               
      updateNavObj(tempNav);  
    }



   return (
  
   <div className="guiSettings" style={{"maxHeight": `${screenHeight-30}px`}}>
        
      {(currentSettingPage !== "Main Page" && currentSettingPage !== "") && 
      <div style={{"backgroundColor": "grey", "padding": "7px"}}>
             
             {openBackButtonSettingArea && <div className="cursor_pointer textNoSelect"
                onClick={()=>{
                  setOpenBackButtonSettingArea(false);
                }}>︽</div>}
             <div className="cursor_pointer textNoSelect"
              onClick={()=>{
                setOpenBackButtonSettingArea(true);
              }}
             >{openBackButtonSettingArea === true ? "" : "︾"} {generalBackButtonSettingsText} </div>
             {openBackButtonSettingArea && <div className="indentOne">
                  <label>{widthText}: </label>
                    <input type="range" 
                      value={currentProjectNav["backButton-width"]} onChange={
                      (event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["backButton-width"] = event.target.value;
                        updateNavObj(tempObj);       
                        
                        setCurrentProjectNav({...currentProjectNav, "backButton-width": event.target.value});  
                      }
                    }></input>
                    <input type="number"
                      value={currentProjectNav["backButton-width"]} onChange={
                      (event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["backButton-width"] = event.target.value;
                        updateNavObj(tempObj);       
                        
                        setCurrentProjectNav({...currentProjectNav, "backButton-width": event.target.value});  
                      }
                    }></input>

                  <br></br><label>{heightText}: </label>
                  <input type="range" 
                      value={currentProjectNav["backButton-height"]} onChange={
                      (event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["backButton-height"] = event.target.value;
                        updateNavObj(tempObj);       
                        
                        setCurrentProjectNav({...currentProjectNav, "backButton-height": event.target.value});  
                      }
                    }></input>
                    <input type="number"
                      value={currentProjectNav["backButton-height"]} onChange={
                      (event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["backButton-height"] = event.target.value;
                        updateNavObj(tempObj);       
                        
                        setCurrentProjectNav({...currentProjectNav, "backButton-height": event.target.value});  
                      }
                    }></input>
                  <br></br><label>{buttonLookingText}: </label>
                  <br></br><input type="radio" 
                    value={currentProjectNav["backButton-isShape"]}
                    checked={currentProjectNav["backButton-isShape"]}
                    onChange={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["backButton-isShape"] = true;
                      updateNavObj(tempObj);       

                      setCurrentProjectNav({...currentProjectNav, "backButton-isShape": true});  
                    }}
                  ></input><label onClick={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["backButton-isShape"] = true;
                      updateNavObj(tempObj);       

                      setCurrentProjectNav({...currentProjectNav, "backButton-isShape": true});       
                  }}>{rectangleAndColorFilled}</label>
                      <div className="indentOne">
                        <input type="color" value={currentProjectNav["backButton-shapeColor"]} onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["backButton-shapeColor"] = event.target.value;
                            updateNavObj(tempObj);       

                            setCurrentProjectNav({...currentProjectNav, "backButton-shapeColor": event.target.value});    
                        }}></input>
                        <label> {currentProjectNav["backButton-shapeColor"]}</label>
                      </div>
                  <input type="radio"
                    value={currentProjectNav["backButton-isShape"]}
                    checked={!currentProjectNav["backButton-isShape"]}
                    onChange={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["backButton-isShape"] = false;
                      updateNavObj(tempObj);       

                      setCurrentProjectNav({...currentProjectNav, "backButton-isShape": false});  
                    }}
                  ></input><label onClick={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["backButton-isShape"] = false;
                      updateNavObj(tempObj);       

                      setCurrentProjectNav({...currentProjectNav, "backButton-isShape": false});  
                  }}>{basePictureText}</label>
                      
                      <div className="indentOne">
                        <select value={currentProjectNav["backButton-picName"]} onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["backButton-picName"] = event.target.value;
                          updateNavObj(tempObj);       

                          setCurrentProjectNav({...currentProjectNav, "backButton-picName": event.target.value});  
 
                        }}>
                          <option key="backButtonDefault" value="">-- {selectResource} --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "backButton-" + index + item["var"];
                                return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                              })}
                        </select>
                        <button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>

                      </div>
                      
                  <label>Display Text (default "←"): </label>
                  <div className="indentOne">
                    <input value={backButtonName} onChange={(event)=>{
                      setBackButtonName(event.target.value);
                    }}></input>
                    <button onClick={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["backButton-displayText"] = backButtonName;
                      updateNavObj(tempObj);       

                      setCurrentProjectNav({...currentProjectNav, "backButton-displayText": backButtonName});         
                    }}>{updateText}</button>
                  </div>
                  <label>{fontSizeText}:</label>
                  <input type="range" value={currentProjectNav["backButton-fontSize"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["backButton-fontSize"] = event.target.value;
                      updateNavObj(tempObj);       

                      setCurrentProjectNav({...currentProjectNav, "backButton-fontSize": event.target.value});  
                    }}
                  ></input>
                  <input type="number" value={currentProjectNav["backButton-fontSize"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["backButton-fontSize"] = event.target.value;
                      updateNavObj(tempObj);       

                      setCurrentProjectNav({...currentProjectNav, "backButton-fontSize": event.target.value});  
                    }}
                  ></input>
              </div>
             }
     
     </div>}

      <br></br>
      <button
        onClick={()=>{
          fetchProjResourceLists();
          getGameDataFromCloud();
        }}
      >Reload Setter</button><br></br>


      {openBackButtonSettingArea && <br></br>}
      
      <div style={{"backgroundColor": "grey", "padding": "7px"}}>
        <label>{fontForAllNavUIText}: </label>
        <div className="indentOne">
            <select value={currentProjectNav["fontFamilyForAll"]}
              onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["fontFamilyForAll"] = event.target.value;
                  updateNavObj(tempObj);       
                            
                  setCurrentProjectNav({...currentProjectNav, "fontFamilyForAll": event.target.value});  
              }}
            >
                <option value="serif" key="navUI_serif">serif</option>
                <option value="sans-serif" key="navUI_sans-serif">sans-serif</option>
                <option value="cursive" key="navUI_cursive">cursive</option>    
            </select>          
        </div>
        
        <label>All Rectangle Corner Radius:</label><br></br>
        <input type="range"></input>
        <label></label>

      </div>

      <br></br>
      <label>{selectPageToSetupText}: </label>
      <select value={currentSettingPage}
        onChange={(event)=>{
          setCurrentSettingPage(event.target.value);
          updateCurrentPageName(event.target.value);
        }}>
          <option value="" key="defaultEmptyPage">-- {selectAPageName} --</option>
          <option value="Game Progress Strategy" key="Game Progress Strategy">{gameProgressStrategyText}</option>
          <option value="Main Page" key="Main Page">{mainPageText}</option>
          <option value="Story Page" key="Story Page">{storyPageText}</option>
          <option value="Settings Page" key="Settings Page">{settingsPageText}</option>
          <option value="Player Profile Page" key="Player Profile Page">{playerProfilePageText}</option>
          <option value="Game Status Data Page" key="Game Status Data Page">{gameStatusDataPageText}</option>
          <option value="Shop Page" key="Shop Page">{shopPageText}</option>
          <option value="During Game" key="During Game">{duringGamePlayPageText}</option>
      </select>

      <br></br><br></br>

      <button>{saveChangesText}</button>
    
      <br></br><br></br><br></br>
    {currentSettingPage === "Game Progress Strategy" && <div>
     <label>Game Progress Strategy:</label>
       <div style={{"justifyContent": "center"}}>

              <input type="radio" checked={!currentProjectNav["isWithSL"]} value={currentProjectNav["isWithSL"]} onChange={()=>{
                   let tempObj = currentProjectNav;
                   tempObj["isWithSL"] = false;
                   updateNavObj(tempObj);  

                   setCurrentProjectNav({...currentProjectNav, "isWithSL": false});
                   }}></input>
               <label onClick={()=>{                   
                   let tempObj = currentProjectNav;
                   tempObj["isWithSL"] = false;
                   updateNavObj(tempObj);  

                   setCurrentProjectNav({...currentProjectNav, "isWithSL": false});
                   }}>Without SaveLoad System</label>

              <br></br>


               <input type="radio" checked={currentProjectNav["isWithSL"]} value={currentProjectNav["isWithSL"]} onChange={()=>{
                   let tempObj = currentProjectNav;
                   tempObj["isWithSL"] = true;
                   updateNavObj(tempObj);

                   setCurrentProjectNav({...currentProjectNav, "isWithSL": true});

                   }}></input>
               <label onClick={()=>{
                   let tempObj = currentProjectNav;
                   tempObj["isWithSL"] = true;
                   updateNavObj(tempObj);       
                   
                   setCurrentProjectNav({...currentProjectNav, "isWithSL": true});
            }}>SaveLoad System</label>    
                 {currentProjectNav["isWithSL"] && <>
     
              <div className="indentOne">
   
              <label>{backGroundOfTheEntirePageText}:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        value={currentProjectNav["saveloadPage-isBackgroundShape"]}
                        checked={currentProjectNav["saveloadPage-isBackgroundShape"]}
                        onChange={()=>{          
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-isBackgroundShape": true});    
                        }}></input><label onClick={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-isBackgroundShape"] = true;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-isBackgroundShape": true});    
                        }}>{rectangleAndColorFilled} </label>
                            {
                                <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["saveloadPage-bgShadeName"] = event.target.value;
                                      updateNavObj(tempObj);       
                                      
                                      setCurrentProjectNav({...currentProjectNav, "saveloadPage-bgShadeName": event.target.value});    
                                        }}></input>
                                    <label> {currentProjectNav["saveloadPage-bgShadeName"]}</label>
                                </div>}
                            
                        <br></br><input type="radio"
                          value={currentProjectNav["saveloadPage-isBackgroundShape"]}
                          checked={!currentProjectNav["saveloadPage-isBackgroundShape"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-isBackgroundShape": false});   
                        }}></input><label onClick={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-isBackgroundShape": false});   
                        }}>{basePictureText} </label>
                            {
                            <>
                                <select 
                                  value={currentProjectNav["saveloadPage-bgPicName"]}
                                  onChange={(event)=>{
                                    let tempObj = currentProjectNav;
                                    tempObj["saveloadPage-bgPicName"] = event.target.value;
                                    updateNavObj(tempObj);       
                                    
                                    setCurrentProjectNav({...currentProjectNav, "saveloadPage-bgPicName": event.target.value});   
                                }}>                    
                                    <option key="mpliDefault" value="">-- {selectResource} --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "sl-bg-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>

                  <label>Slot Layout</label>
                    <div className="indentOne">
                     <input 
                      type="radio" 
                      value={currentProjectNav["saveloadPage-slotListIsHorizontal"]}
                      checked={currentProjectNav["saveloadPage-slotListIsHorizontal"]}
                      onChange={()=>{
                        let tempObj = currentProjectNav;
                        tempObj["saveloadPage-slotListIsHorizontal"] = true;
                        updateNavObj(tempObj);       
                        
                        setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotListIsHorizontal": true});                 
                      }}
                     ></input>
                     <label
                           onClick={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-slotListIsHorizontal"] = true;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotListIsHorizontal": true});                 
                          }}
                     >{horizontalText}</label>
                     <br></br>
                     <input type="radio"
                        value={currentProjectNav["saveloadPage-slotListIsHorizontal"]}
                        checked={!currentProjectNav["saveloadPage-slotListIsHorizontal"]}
                        onChange={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotListIsHorizontal"] = false;
                          updateNavObj(tempObj);       
                            
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotListIsHorizontal": false});                 
                        }}
                     ></input>
                     <label
                          onClick={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-slotListIsHorizontal"] = false;
                            updateNavObj(tempObj);       
                              
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotListIsHorizontal": false});                 
                        }}
                     >{verticalText}</label>         
                     <br></br>
                     <label>Slot per page:</label>
                     <select
                      value={currentProjectNav["saveloadPage-slotPerPage"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["saveloadPage-slotPerPage"] = event.target.value;
                        updateNavObj(tempObj);       
                          
                        setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotPerPage": event.target.value}); 
                      }}
                      >
                       <option key="sl-slot-per-page-2" value="2">2</option>
                       <option key="sl-slot-per-page-3" value="3">3</option>
                       <option key="sl-slot-per-page-4" value="4">4</option>
                       <option key="sl-slot-per-page-5" value="5">5</option>
                     </select>        
                 
                      <br></br>
                      <label>Number of Pages:</label>
                      <input type="number" min="1" max="15" step="1" value={currentProjectNav["saveloadPage-slotPageCount"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotPageCount"] = event.target.value;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotPageCount": event.target.value});
                        }}
                      ></input>
                    
                    </div>
               
              
                        <br></br>
                <label>Slot Looking:</label>
                    <div className="indentOne">
                      <input type="radio" 
                        value={currentProjectNav["saveloadPage-isSlotShape"]}
                        checked={currentProjectNav["saveloadPage-isSlotShape"]}
                        onChange={()=>{   
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-isSlotShape"] = true;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-isSlotShape": true});   
                        }}></input><label onClick={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-isSlotShape"] = true;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-isSlotShape": true});              
                                }}>{rectangleAndColorFilled} </label>
                            {
                                <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["saveloadPage-slotShadeName"] = event.target.value;
                                      updateNavObj(tempObj);       
                                      
                                      setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotShadeName": event.target.value});                         
                                      
                                    }}></input>
                                    <label> {currentProjectNav["saveloadPage-slotShadeName"]}</label>
                                </div>}
                            
                        <br></br><input type="radio"
                          value={currentProjectNav["saveloadPage-isSlotShape"]}
                          checked={!currentProjectNav["saveloadPage-isSlotShape"]}         
                          onChange={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-isSlotShape"] = false;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-isSlotShape": false}); 
                          
                        }}></input><label onClick={()=>{
                              let tempObj = currentProjectNav;
                              tempObj["saveloadPage-isSlotShape"] = false;
                              updateNavObj(tempObj);       
                              
                              setCurrentProjectNav({...currentProjectNav, "saveloadPage-isSlotShape": false}); 
                        }}>{basePictureText} </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["saveloadPage-slotPicName"] = event.target.value;
                                      updateNavObj(tempObj);       
                                      
                                      setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotPicName": event.target.value});                         
                                      
                                }}>                    
                                    <option key="mpliDefault" value="">-- {selectResource} --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "sl-slot-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>
               
     
                <label>Slot Size:</label><br></br>
                  <div className="indentOne">
                      <label>{widthText}:</label>
                      <input type="range" 
                        min="1" max="500" step="1"
                        value={currentProjectNav["saveloadPage-slotWidth"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotWidth"] = event.target.value;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotWidth": event.target.value});
                        }}
                      ></input>
                      <input type="number" 
                        min="1" max="500" step="1"
                        value={currentProjectNav["saveloadPage-slotWidth"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotWidth"] = event.target.value;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotWidth": event.target.value});
                        }}></input>
                      <br></br>
                      <label>{heightText}:</label>
                      <input type="range" 
                        min="1" max="240" step="1"
                        value={currentProjectNav["saveloadPage-slotHeight"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotHeight"] = event.target.value;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotHeight": event.target.value});
                        }}
                      ></input>
                      <input type="number" 
                        min="1" max="240" step="1"
                        value={currentProjectNav["saveloadPage-slotHeight"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotHeight"] = event.target.value;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotHeight": event.target.value});
                        }}></input>
                  </div>
                <label>Gaps between slots:</label><br></br>
                  <div className="indentOne">
                   
                      <input type="range" 
                          min="0" max="20" step="1"
                          value={currentProjectNav["saveloadPage-slotGap"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-slotGap"] = event.target.value;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotGap": event.target.value});
                          }}
                        ></input>
                      <input type="number" 
                          min="0" max="20" step="1"
                          value={currentProjectNav["saveloadPage-slotGap"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-slotGap"] = event.target.value;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotGap": event.target.value});
                          }}
                        ></input>    
                
       
                  </div>
                  <label>Group Positions:</label><br></br>
                    <div className="indentOne">
                        <label>position X:</label>
                        <input type="range" 
                          min="0" max="600" step="1"
                          value={currentProjectNav["saveloadPage-groupPosX"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-groupPosX"] = event.target.value;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-groupPosX": event.target.value});                            
                          }}
                        ></input>
                        <input type="number" 
                          min="0" max="600" step="1"
                          value={currentProjectNav["saveloadPage-groupPosX"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-groupPosX"] = event.target.value;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-groupPosX": event.target.value});                            
                          }}
                        ></input>
                       
                        <br></br>
                        <label>position Y:</label>
                        <input type="range" 
                          min="0" max="600" step="1"
                          value={currentProjectNav["saveloadPage-groupPosY"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-groupPosY"] = event.target.value;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-groupPosY": event.target.value});                            
                          }}
                        ></input>
                        <input type="number" 
                          min="0" max="600" step="1"
                          value={currentProjectNav["saveloadPage-groupPosY"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-groupPosY"] = event.target.value;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-groupPosY": event.target.value});                            
                          }}
                        ></input>
           
                    </div>
 
              </div> </>}
                
          
           
       </div>
    </div>}   
       
    {currentSettingPage === "Main Page" && <div>
     <label>{mainPageText}:</label>
     <div className="indentOne">
     <label>{backGroundOfTheEntirePageText}:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        value={currentProjectNav["mainPage-isBackgroundShape"]}
                        checked={currentProjectNav["mainPage-isBackgroundShape"]}
                        onChange={()=>{     
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj);
                          //TODO test

                          setCurrentProjectNav({...currentProjectNav, "mainPage-isBackgroundShape": true});            
                        
                        }}></input>

                        <label onClick={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj);
                          //TODO test

                          setCurrentProjectNav({...currentProjectNav, "mainPage-isBackgroundShape": true});               
                        }}>{rectangleAndColorFilled} </label>
                            {currentProjectNav["mainPage-isBackgroundShape"] &&
                                <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                      value={currentProjectNav["mainPage-bgShadeName"]}
                                      onChange={(event)=>{
                                        let tempObj = currentProjectNav;
                                        tempObj["mainPage-bgShadeName"] = event.target.value;
                                        updateNavObj(tempObj);
                                        //TODO test

                                        setCurrentProjectNav({...currentProjectNav, "mainPage-bgShadeName": event.target.value});               
                                        
                                        }}></input>
                                    <label> {currentProjectNav["mainPage-bgShadeName"]}</label>
                                </div>}
                            
                        <br></br>
                        <input type="radio"
                            value={currentProjectNav["mainPage-isBackgroundShape"]}
                            checked={!currentProjectNav["mainPage-isBackgroundShape"]}
                          onChange={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["mainPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj);
                            //TODO test

                            setCurrentProjectNav({...currentProjectNav, "mainPage-isBackgroundShape": false});                                                  
                          }}></input><label onClick={()=>{
                              let tempObj = currentProjectNav;
                              tempObj["mainPage-isBackgroundShape"] = false;
                              updateNavObj(tempObj);
                              //TODO test

                              setCurrentProjectNav({...currentProjectNav, "mainPage-isBackgroundShape": false});
                            
                              }}>{basePictureText} </label><br></br>
                            {!currentProjectNav["mainPage-isBackgroundShape"] &&
                            <div className="indentOne">
                                <select 
                                  value={currentProjectNav["mainPage-bgPicName"]}
                                  onChange={(event)=>{
                                    let tempObj = currentProjectNav;
                                    tempObj["mainPage-bgPicName"] = event.target.value;
                                    updateNavObj(tempObj);
                                    //TODO test

                                    setCurrentProjectNav({...currentProjectNav, "mainPage-bgPicName": event.target.value});
                                    
                                }}>  
                                {/* //TODO  resource, var-name                */}
                                    <option key="mpliDefault" value="">-- {selectResource} --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "mainPage-bg-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select>
                                <button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </div>}

          
                  </div>

         <label>{listItemSettingsText}: </label><br></br>
         <input type="radio" 
          value={currentProjectNav["mainPage-entriesCustom"]} 
          checked={!currentProjectNav["mainPage-entriesCustom"]}
           onChange={()=>{
              let tempObj = currentProjectNav;
              tempObj["mainPage-entriesCustom"] = false;
              updateNavObj(tempObj);  

              setCurrentProjectNav({...currentProjectNav, "mainPage-entriesCustom": false });
            }}
         ></input><label></label>
         <label
                    onClick={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["mainPage-entriesCustom"] = false;
                      updateNavObj(tempObj);  
        
                      setCurrentProjectNav({...currentProjectNav, "mainPage-entriesCustom": false });
                    }}
         >{fixedListText}</label>
             {!currentProjectNav["mainPage-entriesCustom"] && <div className="indentOne" style={{"backgroundColor": "grey"}}>

               <input type="radio" value={currentProjectNav["mainPage-entriesHorizontal"]} checked={currentProjectNav["mainPage-entriesHorizontal"]}
                 onChange={()=>{
                    
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-entriesHorizontal"] = true;
                    updateNavObj(tempObj);                 

                    setCurrentProjectNav({...currentProjectNav, "mainPage-entriesHorizontal": true});
                }}
               ></input>
               <label
                onClick={()=>{
                    
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-entriesHorizontal"] = true;
                    updateNavObj(tempObj);                 

                    setCurrentProjectNav({...currentProjectNav, "mainPage-entriesHorizontal": true});
                }
                }
               >{horizontalText}</label>
               <br></br><input type="radio" value={currentProjectNav["mainPage-entriesHorizontal"]} checked={!currentProjectNav["mainPage-entriesHorizontal"]}
                 onChange={()=>{                    
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-entriesHorizontal"] = false;
                    updateNavObj(tempObj);    

                    setCurrentProjectNav({...currentProjectNav, "mainPage-entriesHorizontal": false});
                }}
               ></input>
               <label
                onClick={()=>{                    
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-entriesHorizontal"] = false;
                    updateNavObj(tempObj);    

                    setCurrentProjectNav({...currentProjectNav, "mainPage-entriesHorizontal": false});
                }}
               >{verticalText}</label>
               <br></br>
               <label>{groupPositionXText}:</label>
                 <input type="range"
                  min="0" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-listItemGroupX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupX"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupX": event.target.value});
                    }
                  }
                 ></input>
                 <input type="number"
                  min="0" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-listItemGroupX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupX"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupX": event.target.value});
                    }}
                 ></input>                 
               <br></br>
               <label>{groupPositionYText}:</label>
               <input type="range"
                  min="0" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-listItemGroupY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupY"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupY": event.target.value});
                    }}               
               ></input>
               <input type="number"
                  min="0" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-listItemGroupY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupY"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupY": event.target.value});
                    }}               
               ></input>               
               <br></br>
               <label>{itemWidthText}:</label>
               <input type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-listItemGroupWidth"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemWidth"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupWidth": event.target.value});
                    }}               
               ></input>  
               <input type="number"
                  min="1" max={screenWidth/4} step="1"
                  value={currentProjectNav["mainPage-listItemGroupWidth"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemWidth"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupWidth": event.target.value});
                    }}               
               ></input>                 
               <br></br>
               <label>{itemHeightText}:</label>
               <input type="range"
                  min="1" max={screenHeight/4} step="1"
                  value={currentProjectNav["mainPage-listItemGroupHeight"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupHeight"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupHeight": event.target.value});
                    }}               
               ></input> 
               <input type="number"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-listItemGroupHeight"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupHeight"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupHeight": event.target.value});
                    }}               
               ></input> 
               <br></br>
               <label>{itemGapText}:</label>
               <input type="range" 
                min="1" max="110" step="1"
                value={currentProjectNav["mainPage-listItemGap"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-listItemGap"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGap": event.target.value});
                  }}                  
                ></input>
               <input type="number" 
                value={currentProjectNav["mainPage-listItemGap"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-listItemGap"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGap": event.target.value});
                  }}  
                ></input>
                <br></br>
                <label>{fontColorText}:</label>
                 <input type="color" 
                  value={currentProjectNav["mainPage-listItemGroupFontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupFontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test
  
                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupFontColor": event.target.value});             
                            
                  }}
                 ></input>
                 <label> {currentProjectNav["mainPage-listItemGroupFontColor"]}</label>
               <br></br>
                {fontSizeText}:
                <input type="range"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-listItemGroupFontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupFontSize"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupFontSize": event.target.value});             
                  }}
               ></input>
                <input type="number"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-listItemGroupFontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupFontSize"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupFontSize": event.target.value});             
                  }}
               ></input>  

            <br></br>
            <input type="radio" 
              value={currentProjectNav["mainPage-isListItemShape"]}
              checked={currentProjectNav["mainPage-isListItemShape"]}
              onChange={()=>{  
                let tempObj = currentProjectNav;
                tempObj["mainPage-isListItemShape"] = true;
                updateNavObj(tempObj);                           
                //TODO test

                setCurrentProjectNav({...currentProjectNav, "mainPage-isListItemShape": true});
                
              }}></input>
              <label onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["mainPage-isListItemShape"] = true;
                updateNavObj(tempObj);                  
                //TODO test

                setCurrentProjectNav({...currentProjectNav, "mainPage-isListItemShape": true});
                
              }}>{rectangleAndColorFilled} </label>
              
                  {currentProjectNav["mainPage-isListItemShape"] &&
                      <div className="indentOne">
                          <label>{backgroundColorText}: </label>
                          <input type="color"
                          value={currentProjectNav["mainPage-listItemShadeName"]}
                          onChange={(event)=>{
                                let tempObj = currentProjectNav;
                                tempObj["mainPage-listItemShadeName"] = event.target.value;
                                updateNavObj(tempObj);                  
                                //TODO test
                
                                setCurrentProjectNav({...currentProjectNav, "mainPage-listItemShadeName": event.target.value});
                                
                              }}></input>
                          <label> {currentProjectNav["mainPage-listItemShadeName"]}</label>
                      </div>}
                  
              <br></br><input type="radio"
                value={currentProjectNav["mainPage-isListItemShape"]}
                checked={!currentProjectNav["mainPage-isListItemShape"]}
                onChange={()=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-isListItemShape"] = false;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-isListItemShape": false});
                  
              }}></input><label onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["mainPage-isListItemShape"] = false;
                updateNavObj(tempObj);                  
                //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-isListItemShape": false});
                  
                    }}>{basePictureText} </label><br></br>
                  {!currentProjectNav["mainPage-isListItemShape"] &&
                  <div className="indentOne">
                      <select
                        value={currentProjectNav["mainPage-listItemPicName"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-listItemPicName"] = event.target.value;
                          updateNavObj(tempObj);                  
                          //TODO test
             
                          setCurrentProjectNav({...currentProjectNav, "mainPage-listItemPicName": event.target.value});
                          
                      }}>                    
                          <option key="mpliDefault" value="">-- {selectResource} --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "mainPage-li-" + index + item["var"];
                              return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                          })}
                      </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
              </div>}
   
  
             </div>}
         <br></br><input type="radio"  
            value={currentProjectNav["mainPage-entriesCustom"]} 
            checked={currentProjectNav["mainPage-entriesCustom"]}
            onChange={()=>{              
                let tempObj = currentProjectNav;
                tempObj["mainPage-entriesCustom"] = true;
                updateNavObj(tempObj); 
                
                setCurrentProjectNav({...currentProjectNav, "mainPage-entriesCustom": true });
            }}
         ></input>
         <label
                     onClick={()=>{              
                      let tempObj = currentProjectNav;
                      tempObj["mainPage-entriesCustom"] = true;
                      updateNavObj(tempObj); 
                      
                      setCurrentProjectNav({...currentProjectNav, "mainPage-entriesCustom": true });
                  }}
         
         >{customizedItemsText}</label>

         <br></br>
         <br></br>
         <label>{mainPageItemsText}: </label>
         <div className="indentOne someGrey" style={{"color": "#000000"}}>
            <input type="checkbox" value={currentProjectNav["mainPage-playerProfile"]}
                checked={currentProjectNav["mainPage-playerProfile"]}
                onChange={()=>{
                  /*
                  let val = currentProjectNav["mainPage-playerProfile"];
                  
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-playerProfile"] = !val;
                  updateNavObj(tempObj);              

                  setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile": !val});
                  */
                  }}               
            ></input>
           <label
                onClick={()=>{
/*
                  let val = currentProjectNav["mainPage-playerProfile"];
                  
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-playerProfile"] = !val;
                  updateNavObj(tempObj);              

                  setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile": !val});
*/
                }} 
           >{playerProfilePageText}{sEntryText}</label>
           <br></br>

           <input 
              type="checkbox" 
              value={currentProjectNav["mainPage-setting"]}
              checked={currentProjectNav["mainPage-setting"]}
              onChange={()=>{
/*
                let val = currentProjectNav["mainPage-setting"];
                
                let tempObj = currentProjectNav;
                tempObj["mainPage-setting"] = !val;
                updateNavObj(tempObj);  

                setCurrentProjectNav({...currentProjectNav, "mainPage-setting": !val});
*/
                }}      
            ></input>
            <label
                onClick={()=>{
/*
                let val = currentProjectNav["mainPage-setting"];
                
                let tempObj = currentProjectNav;
                tempObj["mainPage-setting"] = !val;
                updateNavObj(tempObj);  

                setCurrentProjectNav({...currentProjectNav, "mainPage-setting": !val});
*/
                }} 
            >{settingsPageText}{sEntryText}</label>
            <br></br>
            <input type="checkbox" value={currentProjectNav["mainPage-shop"]}
              checked={currentProjectNav["mainPage-shop"]}
              onChange={()=>{
/*
                let val = currentProjectNav["mainPage-shop"];
                
                let tempObj = currentProjectNav;
                tempObj["mainPage-shop"] = !val;
                updateNavObj(tempObj);

                setCurrentProjectNav({...currentProjectNav, "mainPage-shop": !val});
*/
                }}                     
            ></input>
            <label
              onClick={()=>{
/*
                let val = currentProjectNav["mainPage-shop"];
              
                let tempObj = currentProjectNav;
                tempObj["mainPage-shop"] = !val;
                updateNavObj(tempObj);

                setCurrentProjectNav({...currentProjectNav, "mainPage-shop": !val});
*/
              }}     
            >{shopPageText}{sEntryText}</label>



{/* TODO16 */}

            <br></br><br></br>
            <button
              onClick={()=>{
                  //TODO 4 entries' status
                  //TODO update the following: currentProjectNav["mainPage-playerProfile"] , currentProjectNav["mainPage-setting"], currentProjectNav["mainPage-shop"]

              }}
            >Update Entry List</button>
         </div>
         <br></br>
  
         <label
         >{storyPageText}{sEntryText}</label>


         <div className="indentOne">
           <label>{displayNamingText}: </label>
           <input 
            value={mainPageStoryName}
            onChange={(event)=>{
              setMainPageStoryName(event.target.value);
            }}
           ></input>
           <button onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["mainPage-story-name"] = mainPageStoryName;
              updateNavObj(tempObj);                  
              //TODO test
              
              setCurrentProjectNav({...currentProjectNav, "mainPage-story-name": mainPageStoryName});             

           }}>{updateText}</button>

         </div>
         {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-story"]) && 
         <div className="indentOne">
           {positionXText}:
               <input type="range"
                min="1" max={screenWidth} step="1"
                value={currentProjectNav["mainPage-story-posX"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-story-posX"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-story-posX": event.target.value});             
                }}
               ></input>
                <input type="number"
                min="1" max={screenWidth} step="1"
                value={currentProjectNav["mainPage-story-posX"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-story-posX"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-story-posX": event.target.value});             
                }}
               ></input>
               <br></br>
           {positionYText}:
              <input type="range"
                min="1" max={screenHeight} step="1"
                value={currentProjectNav["mainPage-story-posY"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-story-posY"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-story-posY": event.target.value});             
                }}
               ></input>
              <input type="number"
                min="1" max={screenHeight} step="1"
                value={currentProjectNav["mainPage-story-posY"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-story-posY"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-story-posY": event.target.value});             
                }}
               ></input>               
               <br></br>
           {widthText}:
              <input type="range"
                min="1" max={screenWidth} step="1"
                value={currentProjectNav["mainPage-story-width"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-story-width"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-story-width": event.target.value});             
                }}
               ></input>
              <input type="number"
                min="1" max={screenWidth} step="1"
                value={currentProjectNav["mainPage-story-width"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-story-width"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-story-width": event.target.value});             
                }}
               ></input>               
               <br></br>
           {heightText}:
              <input type="range"
                min="1" max={screenHeight} step="1"
                value={currentProjectNav["mainPage-story-height"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-story-height"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-story-height": event.target.value});             
                }}
               ></input>
              <input type="number"
                min="1" max={screenHeight} step="1"
                value={currentProjectNav["mainPage-story-height"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-story-height"] = event.target.value;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-story-height": event.target.value});             
                }}
               ></input>
               <br></br>
           {fontColorText}:
                 <input type="color" 
                  value={currentProjectNav["mainPage-story-fontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-story-fontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test
  
                    setCurrentProjectNav({...currentProjectNav, "mainPage-story-fontColor": event.target.value});             
                            
                  }}
                 ></input>
                 <label> {currentProjectNav["mainPage-story-fontColor"]}</label>
               <br></br>
           {fontSizeText}:
                <input type="range"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-story-fontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-story-fontSize"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-story-fontSize": event.target.value});             
                  }}
               ></input>
                <input type="number"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-story-fontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-story-fontSize"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-story-fontSize": event.target.value});                              
                  }}
               ></input>               
               <br></br>
             
                <input type="radio" 
                  value={currentProjectNav["mainPage-story-isShape"]}
                  checked={currentProjectNav["mainPage-story-isShape"]}
                  onChange={()=>{  
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-story-isShape"] = true;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-story-isShape": true});             
                        
                  }}></input>
                  <label onClick={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-story-isShape"] = true;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-story-isShape": true});             
                        
                  }}>{rectangleAndColorFilled} </label>
                  
                      {
                          <div className="indentOne">
                              <label>{backgroundColorText}: </label>
                              <input type="color"
                              value={currentProjectNav["mainPage-story-shadeName"]}
                              onChange={(event)=>{
                                let tempObj = currentProjectNav;
                                tempObj["mainPage-story-shadeName"] = event.target.value;
                                updateNavObj(tempObj);                  
                                //TODO test
            
                                setCurrentProjectNav({...currentProjectNav, "mainPage-story-shadeName": event.target.value});             
                                             
                                  }}></input>
                              <label> {currentProjectNav[ "mainPage-story-shadeName"]}</label>
                          </div>}
                      
                  <br></br><input type="radio"
                           value={currentProjectNav["mainPage-story-isShape"]}
                           checked={!currentProjectNav["mainPage-story-isShape"]}
                    onChange={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["mainPage-story-isShape"] = false;
                      updateNavObj(tempObj);                  
                      //TODO test
  
                      setCurrentProjectNav({...currentProjectNav, "mainPage-story-isShape": false});             
                                         
                  }}></input><label onClick={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-story-isShape"] = false;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-story-isShape": false});             
                          
                        }}>{basePictureText} </label><br></br>
                      {
                      <div className="indentOne">
                          <select 
                            value={currentProjectNav["mainPage-story-picName"]}
                            onChange={(event)=>{
                              let tempObj = currentProjectNav;
                              tempObj["mainPage-story-picName"] = event.target.value;
                              updateNavObj(tempObj);                  
                              //TODO test

                              setCurrentProjectNav({...currentProjectNav, "mainPage-story-picName": event.target.value});             
                                                        
                          }}>                    
                              <option key="mpliDefault" value="">-- {selectResource} --</option>
                              {visualList.map((item, index) => {
                                  let keyStr = "mainPage-li-" + index + item["var"];
                                  return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                              })}
                          </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                  </div>}

           </div>}
     
           <br></br>
           <label>{playerProfilePageText}{sEntryText}</label>
         <div className="indentOne">
           <label>{displayNamingText}: </label>
           <input 
            value={mainPagePlayerProfileName}
            onChange={(event)=>{
              setMainPagePlayerProfileName(event.target.value);
            }}
           ></input>
           <button onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["mainPage-playerProfile-name"] = mainPagePlayerProfileName;
              updateNavObj(tempObj);                  
              //TODO test
              
              setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-name": mainPagePlayerProfileName});             

           }}>{updateText}</button>
         </div>
       {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-playerProfile"]) && <div className="indentOne">
           {positionXText}:
                 <input type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-playerProfile-posX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-posX"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-posX": event.target.value});             
                  }}                                 
                 ></input>
                 <input type="number"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-playerProfile-posX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-posX"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-posX": event.target.value});             
                  }}                                 
                 ></input>
               <br></br>
           {positionYText}:
                <input type="range"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-playerProfile-posY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-posY"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-posY": event.target.value});             
                  }}                                 
                 ></input>
                 <input type="number"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-playerProfile-posY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-posY"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-posY": event.target.value});             
                  }}                                 
                 ></input>
               <br></br>
           {widthText}:
                <input type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-playerProfile-width"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-width"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-width": event.target.value});             
                  }}                                 
                 ></input>
               <input type="number"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-playerProfile-width"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-width"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-width": event.target.value});             
                  }}                                 
                 ></input>                 
               <br></br>
           {heightText}:
                <input type="range"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-playerProfile-height"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-height"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-height": event.target.value});             
                  }}                                 
                 ></input>
               <input type="number"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-playerProfile-height"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-height"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-height": event.target.value});             
                  }}                                 
                 ></input>                 
               <br></br>
           {fontColorText}:
                <input type="color"
                  value={currentProjectNav["mainPage-playerProfile-fontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-fontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-fontColor": event.target.value});             
                  }}                   
                ></input>
                <label> {currentProjectNav["mainPage-playerProfile-fontColor"]}</label>
               <br></br>
           {fontSizeText}:
              <input type="range"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-playerProfile-fontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-fontSize"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-fontSize": event.target.value});             
                  }}                                 
                 ></input>
              <input type="number"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-playerProfile-fontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-fontSize"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-fontSize": event.target.value});             
                 
                  }}                                 
                 ></input>                 
               <br></br>
            
               <input type="radio" 
                  value={currentProjectNav["mainPage-playerProfile-isShape"]}
                  checked={currentProjectNav["mainPage-playerProfile-isShape"]}
                  onChange={()=>{ 
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-isShape"] = true;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-isShape": true});             
                            
                  }}></input>
              <label onClick={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["mainPage-playerProfile-isShape"] = true;
                      updateNavObj(tempObj);                  
                      //TODO test

                      setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-isShape": true});             
                          
              }}>
              {rectangleAndColorFilled} </label>
              
                {
                    <div className="indentOne">
                        <label>{backgroundColorText}: </label>
                        <input type="color"
                          value={currentProjectNav["mainPage-playerProfile-shadeName"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-playerProfile-shadeName"] = event.target.value;
                          updateNavObj(tempObj);                  
                          //TODO test
    
                          setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-shadeName": event.target.value});             
                                                   
                            }}></input>
                        <label> {currentProjectNav["mainPage-playerProfile-shadeName"]}</label>
                    </div>}
                
            <br></br><input type="radio"
            
              value={currentProjectNav["mainPage-playerProfile-isShape"]}
              checked={!currentProjectNav["mainPage-playerProfile-isShape"]}
              onChange={()=>{ 
                let tempObj = currentProjectNav;
                tempObj["mainPage-playerProfile-isShape"] = false;
                updateNavObj(tempObj);                  
                //TODO test

                setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-isShape": false});             
                        
            }}></input>    
                <label onClick={()=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-playerProfile-isShape"] = false;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-isShape": false});             
                                
                  }}>{basePictureText} </label><br></br>
                {
                <div className="indentOne">
                    <select 
                      value={currentProjectNav["mainPage-playerProfile-picName"]}
                      onChange={(event)=>{
                       let tempObj = currentProjectNav;
                       tempObj["mainPage-playerProfile-picName"] = event.target.value;
                       updateNavObj(tempObj);                  
                       //TODO test
 
                       setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-picName": event.target.value});             
                                           
                    }}>                    
                        <option key="mpliDefault" value="">-- {selectResource} --</option>
                        {visualList.map((item, index) => {
                            let keyStr = "mainPage-li-" + index + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
            </div>}

           </div>}             
         
         

         <br></br>
         <label>{settingsPageText}{sEntryText}</label>
         <div className="indentOne">
           <label>{displayNamingText}: </label>
           <input 
            value={mainPageSettingsName}
            onChange={(event)=>{
              setMainPageSettingsName(event.target.value);
            }}
           ></input>
           <button onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["mainPage-setting-name"] = mainPageSettingsName;
              updateNavObj(tempObj);                  
              //TODO test
              
              setCurrentProjectNav({...currentProjectNav, "mainPage-setting-name": mainPageSettingsName});             

           }}>{updateText}</button>
         </div>
         {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-setting"]) && <div className="indentOne">
           {positionXText}:
                 <input type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-setting-posX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-posX"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-posX": event.target.value});             
                  }}
                 ></input>
                 <input type="number"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-setting-posX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-posX"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-posX": event.target.value});             
                  }}
                 ></input>                 
               <br></br>
           {positionYText}:
                <input type="range"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-setting-posY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-posY"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-posY": event.target.value});             
                  }}
                 ></input>
                 <input type="number"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-setting-posY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-posY"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-posY": event.target.value});             
                  }}
                 ></input>        
               <br></br>
           {widthText}:
                <input type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-setting-width"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-width"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-width": event.target.value});             
                  }}
                 ></input>
                <input type="number"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-setting-width"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-width"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-width": event.target.value});             
                  }}
                 ></input>                 
               <br></br>
           {heightText}:
                <input type="range"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-setting-height"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-height"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-height": event.target.value});             
                  }}
                 ></input>
                <input type="number"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-setting-height"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-height"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-height": event.target.value});             
                  }}
                 ></input>                 
               <br></br>
           {fontColorText}:
                <input type="color"
                  value={currentProjectNav["mainPage-setting-fontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-fontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-fontColor": event.target.value});             
                  }}
                 ></input>
                 <label> {currentProjectNav["mainPage-setting-fontColor"]}</label>
               <br></br>
           {fontSizeText}:
                <input type="range"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-setting-fontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-fontSize"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-fontSize": event.target.value});             
                  }}
                 ></input>
                <input type="number"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-setting-fontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-fontSize"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-fontSize": event.target.value});                   
                  }}
                 ></input>                 
               <br></br>
             
               <input type="radio" 
                  value={currentProjectNav["mainPage-setting-isShape"]}
                  checked={currentProjectNav["mainPage-setting-isShape"]}
                  onChange={()=>{  
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-isShape"] = true;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-isShape": true});             
                  }}></input>
              <label onClick={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["mainPage-setting-isShape"] = true;
                      updateNavObj(tempObj);                  
                      //TODO test

                      setCurrentProjectNav({...currentProjectNav, "mainPage-setting-isShape": true});  
              }}>{rectangleAndColorFilled} </label>
              
                {
                    <div className="indentOne">
                        <label>{backgroundColorText}: </label>
                        <input type="color"
                        value={currentProjectNav["mainPage-setting-shadeName"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-setting-shadeName"] = event.target.value;
                          updateNavObj(tempObj);                  
                          //TODO test
    
                          setCurrentProjectNav({...currentProjectNav, "mainPage-setting-shadeName": event.target.value});                           
                            }}></input>
                        <label> {currentProjectNav["mainPage-setting-shadeName"]}</label>
                    </div>}
                
            <br></br><input type="radio"
                  value={currentProjectNav["mainPage-setting-isShape"]}
                  checked={!currentProjectNav["mainPage-setting-isShape"]}
                  onChange={()=>{  
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-isShape"] = false;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-isShape": false});             
                  }}></input>
              <label onClick={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-isShape"] = false;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-isShape": false});                  
                  }}>{basePictureText} </label><br></br>
                {
                <div className="indentOne">
                    <select 
                      value={currentProjectNav["mainPage-setting-picName"]}
                      onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-setting-picName"] = event.target.value;
                          updateNavObj(tempObj);                  
                          //TODO test
    
                          setCurrentProjectNav({...currentProjectNav, "mainPage-setting-picName": event.target.value});                         
                    }}>                    
                        <option key="mpliDefault" value="">-- {selectResource} --</option>
                        {visualList.map((item, index) => {
                            let keyStr = "mainPage-li-" + index + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
            </div>}
 
           </div>}

         <br></br>
         <label 
         >{shopPageText}{sEntryText}</label>
         <div className="indentOne">
           <label>{displayNamingText}: </label>
           <input 
            value={mainPageShopName}
            onChange={(event)=>{
              setMainPageShopName(event.target.value);
            }}
           ></input>
           <button onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["mainPage-shop-name"] = mainPageShopName;
              updateNavObj(tempObj);                  
              //TODO test
              
              setCurrentProjectNav({...currentProjectNav, "mainPage-shop-name": mainPageShopName});             

           }}>{updateText}</button>
         </div>
       {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-shop"]) && <div className="indentOne">
           {positionXText}:
            <input type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-shop-posX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-posX"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-posX": event.target.value});             
                  }}                                 
            ></input>
            <input type="number"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-shop-posX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-posX"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-posX": event.target.value});             
                  }}                                 
            ></input>
               <br></br>
           {positionYText}:
           <input type="range"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-shop-posY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-posY"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-posY": event.target.value});             
                  }}                                 
            ></input>
            <input type="number"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-shop-posY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-posY"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-posY": event.target.value});             
                  }}                                 
            ></input>
               <br></br>
           {widthText}:
           <input type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-shop-width"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-width"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-width": event.target.value});             
                  }}                                 
            ></input>
           <input type="number"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["mainPage-shop-width"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-width"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-width": event.target.value});             
                  }}                                 
            ></input>            
               <br></br>
           {heightText}:
           <input type="range"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-shop-height"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-height"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-height": event.target.value});             
                  }}                                 
            ></input>
           <input type="number"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["mainPage-shop-height"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-height"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-height": event.target.value});             
                  }}                                 
            ></input> 
               <br></br>
           {fontColorText}:
                <input type="color"
                  value={currentProjectNav["mainPage-shop-fontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-fontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-fontColor": event.target.value});             
                    }}  
                ></input>
                
                <label> {currentProjectNav["mainPage-shop-fontColor"]}</label>
               <br></br>
           {fontSizeText}:
            <input type="range"
                    min="5" max="32" step="1"
                    value={currentProjectNav["mainPage-shop-fontSize"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["mainPage-shop-fontSize"] = event.target.value;
                      updateNavObj(tempObj);                  
                      //TODO test

                      setCurrentProjectNav({...currentProjectNav, "mainPage-shop-fontSize": event.target.value});             
                    }}                                 
              ></input>
            <input type="number"
                    value={currentProjectNav["mainPage-shop-fontSize"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["mainPage-shop-fontSize"] = event.target.value;
                      updateNavObj(tempObj);                  
                      //TODO test

                      setCurrentProjectNav({...currentProjectNav, "mainPage-shop-fontSize": event.target.value});             
                    }}                                 
              ></input>              
               <br></br>
               <input type="radio" 
                value={currentProjectNav["mainPage-shop-isShape"]}
                checked={currentProjectNav["mainPage-shop-isShape"]}
                onChange={()=>{  
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-shop-isShape"] = true;
                  updateNavObj(tempObj);                  
                  //TODO test

                  setCurrentProjectNav({...currentProjectNav, "mainPage-shop-isShape": true});      
                }}></input>
              <label onClick={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-isShape"] = true;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-isShape": true});     
              }}>
              {rectangleAndColorFilled} </label>
            
                {
                    <div className="indentOne">
                        <label>{backgroundColorText}: </label>
                        <input type="color"
                          value={currentProjectNav["mainPage-shop-shadeName"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["mainPage-shop-shadeName"] = event.target.value;
                            updateNavObj(tempObj);                  
                            //TODO test
        
                            setCurrentProjectNav({...currentProjectNav, "mainPage-shop-shadeName": event.target.value});                          
                            }}></input>
                        <label> {currentProjectNav["mainPage-shop-shadeName"]}</label>
                    </div>}
                
            <br></br><input type="radio"
              value={currentProjectNav["mainPage-shop-isShape"]}
              checked={!currentProjectNav["mainPage-shop-isShape"]}
              onChange={()=>{
                let tempObj = currentProjectNav;
                tempObj["mainPage-shop-isShape"] = false;
                updateNavObj(tempObj);                  
                //TODO test

                setCurrentProjectNav({...currentProjectNav, "mainPage-shop-isShape": false});                    
            }}></input><label onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["mainPage-shop-isShape"] = false;
              updateNavObj(tempObj);                  
              //TODO test

              setCurrentProjectNav({...currentProjectNav, "mainPage-shop-isShape": false});                   
                  }}>{basePictureText} </label><br></br>
                {
                <div className="indentOne">
                    <select 
                      value={currentProjectNav["mainPage-shop-picName"]}
                      onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-shop-picName"] = event.target.value;
                          updateNavObj(tempObj);                  
                          //TODO test
        
                          setCurrentProjectNav({...currentProjectNav, "mainPage-shop-picName": event.target.value});               
                    }}>                    
                        <option key="mpliDefault" value="">-- {selectResource} --</option>
                        {visualList.map((item, index) => {
                            let keyStr = "mainPage-li-" + index + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
            </div>}
               
           </div>} 

     </div>
    </div>}

    {currentSettingPage === "Story Page" && <div>
     <label>{storyPageText}:</label>
       <div className="indentOne">
       <label>{backGroundOfTheEntirePageText}:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        value={currentProjectNav["storyPage-isBackgroundShape"]}
                        checked={currentProjectNav["storyPage-isBackgroundShape"]}
                        onChange={()=>{      
                          let tempObj = currentProjectNav;
                          tempObj["storyPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj);
                          //TODO test

                          setCurrentProjectNav({...currentProjectNav, "storyPage-isBackgroundShape": true});            
                
                        }}></input><label onClick={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["storyPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj);
                          //TODO test

                          setCurrentProjectNav({...currentProjectNav, "storyPage-isBackgroundShape": true});            
                      
                        }}>{rectangleAndColorFilled} </label>
                           {/* {backGroundOfTheEntirePageText} */}
                            {<div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    value={currentProjectNav["storyPage-bgShadeName"]}
                                    onChange={(event)=>{
                                          let tempObj = currentProjectNav;
                                          tempObj["storyPage-bgShadeName"] = event.target.value;
                                          updateNavObj(tempObj);
                                          //TODO test
                
                                          setCurrentProjectNav({...currentProjectNav, "storyPage-bgShadeName": event.target.value});            
                                          
                                      }}></input>
                                    <label></label>
                                </div>}
                            
                        <br></br><input type="radio"
                          value={currentProjectNav["storyPage-isBackgroundShape"]}
                          checked={!currentProjectNav["storyPage-isBackgroundShape"]}             
                          onChange={()=>{ 
                            let tempObj = currentProjectNav;
                            tempObj["storyPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj);
                            //TODO test
  
                            setCurrentProjectNav({...currentProjectNav, "storyPage-isBackgroundShape": false});            
                               
                        }}></input><label onClick={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["storyPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj);
                            //TODO test

                            setCurrentProjectNav({...currentProjectNav, "storyPage-isBackgroundShape": false});            
                     {/* {backGroundOfTheEntirePageText} */}
                        }}>{basePictureText} </label>
                            {
                            <>
                                <select 
                                  value={currentProjectNav["storyPage-bgPicName"]}
                                  onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["storyPage-bgPicName"] = event.target.value;
                                      updateNavObj(tempObj);                  
                                      //TODO test
                    
                                      setCurrentProjectNav({...currentProjectNav, "storyPage-bgPicName": event.target.value});

                                }}>               
                                    <option key="stryBgDefault" value="">-- {selectResource} --</option>

                                     {visualList.map((item, index) => {
                                        let keyStr = "storyPage-bg-pic" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}

                             </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>
       
           Chapter List:
           <br></br>
           <input type="radio" 
            value={currentProjectNav["storyPage-chapterListHorizontal"]} 
            checked={currentProjectNav["storyPage-chapterListHorizontal"]}
            onChange={()=>{
              let tempObj = currentProjectNav;
              tempObj["storyPage-chapterListHorizontal"] = true;
              updateNavObj(tempObj);
 
              setCurrentProjectNav({...currentProjectNav, "storyPage-chapterListHorizontal": true});
            }}
            ></input><label
              onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["storyPage-chapterListHorizontal"] = true;
                updateNavObj(tempObj);
  
                setCurrentProjectNav({...currentProjectNav, "storyPage-chapterListHorizontal": true});
              }}  
            >{horizontalText}</label>
           <br></br>
           <input type="radio"
              value={currentProjectNav["storyPage-chapterListHorizontal"]} 
              checked={!currentProjectNav["storyPage-chapterListHorizontal"]}    
              onChange={()=>{
                let tempObj = currentProjectNav;
                tempObj["storyPage-chapterListHorizontal"] = false;
                updateNavObj(tempObj);
   
                setCurrentProjectNav({...currentProjectNav, "storyPage-chapterListHorizontal": false});
              }}     
           ></input><label
              onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["storyPage-chapterListHorizontal"] = false;
                updateNavObj(tempObj);

                setCurrentProjectNav({...currentProjectNav, "storyPage-chapterListHorizontal": false});
              }}    
           >{verticalText}</label>
           <br></br>

           <label>{chapterTitleLookingText}:</label>
          <div className="indentOne">
                
            <input type="radio" 
              value={currentProjectNav["storyPage-isListItemShape"]}
              checked={currentProjectNav["storyPage-isListItemShape"]}
              onChange={()=>{          
                let tempObj = currentProjectNav;
                tempObj["storyPage-isListItemShape"] = true;
                updateNavObj(tempObj);

                setCurrentProjectNav({...currentProjectNav, "storyPage-isListItemShape": true});
              }}></input><label onClick={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["storyPage-isListItemShape"] = true;
                    updateNavObj(tempObj);

                    setCurrentProjectNav({...currentProjectNav, "storyPage-isListItemShape": true});             
              }}>{rectangleAndColorFilled} </label>
                  {
                      <div className="indentOne">
                          <label>{backgroundColorText}: </label>
                          <input type="color"
                          value={currentProjectNav["storyPage-listItemShadeName"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["storyPage-listItemShadeName"] = event.target.value;
                            updateNavObj(tempObj);
        
                            setCurrentProjectNav({...currentProjectNav, "storyPage-listItemShadeName": event.target.value}); 
                              }}></input>
                          <label> {currentProjectNav["storyPage-listItemShadeName"]}</label>
                      </div>}
                  
              <br></br><input type="radio"
                value={currentProjectNav["storyPage-isListItemShape"]}
                checked={!currentProjectNav["storyPage-isListItemShape"]}
                onChange={()=>{          
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-isListItemShape"] = false;
                  updateNavObj(tempObj);

                  setCurrentProjectNav({...currentProjectNav, "storyPage-isListItemShape": false});
                }}
                
              ></input><label onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["storyPage-isListItemShape"] = false;
                updateNavObj(tempObj);

                setCurrentProjectNav({...currentProjectNav, "storyPage-isListItemShape": false});
                    }}>{basePictureText} </label>
                  {
                  <>
                      <select
                        value={currentProjectNav["storyPage-listItemPicName"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["storyPage-listItemPicName"] = event.target.value;
                          updateNavObj(tempObj);
          
                          setCurrentProjectNav({...currentProjectNav, "storyPage-listItemPicName": event.target.value});
                      }}>                    
                          <option key="storyPage-li-Default" value="">-- {selectResource} --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "storyPage-li-" + index + item["var"];
                              return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                          })}
                   
                      </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
              </>}
              <label>{itemWidthText}: </label>
              <input type="range"
                max="560" min="1" step="1"
                value={currentProjectNav["storyPage-listItemGroupWidth"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupWidth"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupWidth": event.target.value});                  
                }}
              ></input>
              <input type="number"
                max="560" min="1" step="1"
                value={currentProjectNav["storyPage-listItemGroupWidth"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupWidth"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupWidth": event.target.value});                  
                }}
              ></input>
              <br></br>
              <label>{itemHeightText}: </label>
              <input type="range"
                value={currentProjectNav["storyPage-listItemGroupHeight"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupHeight"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupHeight": event.target.value});                  
                }}
              ></input>
              <input type="number"
                value={currentProjectNav["storyPage-listItemGroupHeight"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupHeight"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupHeight": event.target.value});                  
                }}
              ></input> 
              <br></br>
              <label>{groupPositionXText}: </label>    
              <input type="range"
                min="0" max="650" step="1"
                value={currentProjectNav["storyPage-listItemGroupX"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupX"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupX": event.target.value});                  
                }}
              ></input>
              <input type="number"
                min="0" max="650" step="1"
                value={currentProjectNav["storyPage-listItemGroupX"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupX"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupX": event.target.value});                  
                }}
              ></input> 
              <br></br>
              <label>{groupPositionYText}: </label>    
              <input type="range"
                min="0" max="600" step="1"
                value={currentProjectNav["storyPage-listItemGroupY"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupY"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupY": event.target.value});                  
                }}
              ></input>
              <input type="number"
                min="0" max="600" step="1"
                value={currentProjectNav["storyPage-listItemGroupY"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupY"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupY": event.target.value});                  
                }}
              ></input> 
              <br></br>    
              <label>{itemGapText}: </label>  
              <input type="range"
                max="20" min="1" step="1"
                value={currentProjectNav["storyPage-listItemGap"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGap"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGap": event.target.value});                  
                }}
              ></input>
              <input type="number"
                max="20" min="1" step="1"
                value={currentProjectNav["storyPage-listItemGap"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGap"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGap": event.target.value});                  
                }}
              ></input> 
              <br></br>
              <label>{fontColorText}: </label>
              <input type="color"
                value={currentProjectNav["storyPage-listItemGroupFontColor"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupFontColor"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupFontColor": event.target.value});                    
                }}
              ></input>   
              <label>{currentProjectNav["storyPage-listItemGroupFontColor"]}</label>
              <br></br>
              <label>{fontSizeText}:</label>
              <input type="range"
                max="32" min="1" step="1"
                value={currentProjectNav["storyPage-listItemGroupFontSize"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupFontSize"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupFontSize": event.target.value});                  
                }}
              ></input>
              <input type="number"
                max="32" min="1" step="1"
                value={currentProjectNav["storyPage-listItemGroupFontSize"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupFontSize"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupFontSize": event.target.value});                  
                }}
              ></input> 
 
         </div>

       </div>
    </div>}

    {currentSettingPage === "Settings Page" && <div>
     <label>Settings Page:</label>
     <div className="indentOne">
     <label>{backGroundOfTheEntirePageText}:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        value={currentProjectNav["settingPage-isBackgroundShape"]}
                        checked={currentProjectNav["settingPage-isBackgroundShape"]}
                        onChange={()=>{  
                          let tempObj = currentProjectNav;
                          tempObj["settingPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj);

                          setCurrentProjectNav({...currentProjectNav, "settingPage-isBackgroundShape": true});

                        }}></input><label onClick={()=>{
                              let tempObj = currentProjectNav;
                              tempObj["settingPage-isBackgroundShape"] = true;
                              updateNavObj(tempObj);

                              setCurrentProjectNav({...currentProjectNav, "settingPage-isBackgroundShape": true});
      
                        }}>{rectangleAndColorFilled} </label>
                            {
                                <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    value={currentProjectNav["settingPage-bgShadeName"]}
                                    onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["settingPage-bgShadeName"] = event.target.value;
                                      updateNavObj(tempObj);                                      

                                      setCurrentProjectNav({...currentProjectNav, "settingPage-bgShadeName": event.target.value});

                                        }}></input>
                                    <label> {currentProjectNav["settingPage-bgShadeName"]}</label>
                                </div>}
                            
                        <br></br><input type="radio"
                          value={currentProjectNav["settingPage-isBackgroundShape"]}
                          checked={!currentProjectNav["settingPage-isBackgroundShape"]}
                          onChange={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["settingPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj);

                            setCurrentProjectNav({...currentProjectNav, "settingPage-isBackgroundShape": false});
                         
                        }}></input><label onClick={()=>{
                                let tempObj = currentProjectNav;
                                tempObj["settingPage-isBackgroundShape"] = false;
                                updateNavObj(tempObj);

                                setCurrentProjectNav({...currentProjectNav, "settingPage-isBackgroundShape": false});
      
                              }}>{basePictureText} </label>
                            {
                            <>
                                <select 
                                value={currentProjectNav["settingPage-bgPicName"]}
                                onChange={(event)=>{
                                  let tempObj = currentProjectNav;
                                  tempObj["settingPage-bgPicName"] = event.target.value;
                                  updateNavObj(tempObj);

                                  setCurrentProjectNav({...currentProjectNav, "settingPage-bgPicName": event.target.value});
        
                                }}>                    
                                    <option key="mpliDefault" value="">-- {selectResource} --</option>
                                    {visualList.map((item, index) => {
                                        let keyStr = "settingsPage-bgpic-" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                   
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}
          
                  </div>
       

          <label>List Item Looking:</label>
          <div className="indentOne">
                
            <input type="radio" 
              value={currentProjectNav["settingPage-isListItemShape"]}
              checked={currentProjectNav["settingPage-isListItemShape"]}
              onChange={()=>{      
                let tempObj = currentProjectNav;
                tempObj["settingPage-isListItemShape"] = true;
                updateNavObj(tempObj);

                setCurrentProjectNav({...currentProjectNav, "settingPage-isListItemShape": true});

              }}></input><label onClick={()=>{
                  let tempObj = currentProjectNav;
                  tempObj["settingPage-isListItemShape"] = true;
                  updateNavObj(tempObj);

                  setCurrentProjectNav({...currentProjectNav, "settingPage-isListItemShape": true});
                        
                      }}>{rectangleAndColorFilled} </label>
                  {
                      <div className="indentOne">
                          <label>{backgroundColorText}: </label>
                          <input type="color"
                          onChange={(event)=>{
                                let tempObj = currentProjectNav;
                                tempObj["settingPage-listItemShadeName"] = event.target.value;
                                updateNavObj(tempObj);
                
                                setCurrentProjectNav({...currentProjectNav, "settingPage-listItemShadeName": event.target.value});
                
                            }}></input>
                          <label></label>
                      </div>}
                  
              <br></br><input type="radio"
                value={currentProjectNav["settingPage-isListItemShape"]}
                checked={!currentProjectNav["settingPage-isListItemShape"]}
                onChange={()=>{
                  let tempObj = currentProjectNav;
                  tempObj["settingPage-isListItemShape"] = false;
                  updateNavObj(tempObj);

                  setCurrentProjectNav({...currentProjectNav, "settingPage-isListItemShape": false});
                           
              }}></input><label onClick={()=>{
                  let tempObj = currentProjectNav;
                  tempObj["settingPage-isListItemShape"] = false;
                  updateNavObj(tempObj);

                  setCurrentProjectNav({...currentProjectNav, "settingPage-isListItemShape": false});
                        
                }}>{basePictureText} </label>
                  {
                  <>
                      <select 
                      value={currentProjectNav["settingPage-listItemPicName"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-listItemPicName"] = event.target.value;
                        updateNavObj(tempObj);

                        setCurrentProjectNav({...currentProjectNav, "settingPage-listItemPicName": event.target.value});
                                      
                      }}>                    
                          <option key="mpliDefault" value="">-- {selectResource} --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "settingsPage-li-" + index + item["var"];
                              return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                          })}
                
                      </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
              </>}

 
         </div>

         <label>List Direction: </label><br></br>             
               <input type="radio" value={currentProjectNav["settingPage-entriesHorizontal"]} checked={currentProjectNav["settingPage-entriesHorizontal"]}
                 onChange={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-entriesHorizontal"] = true;
                    updateNavObj(tempObj);  
                    
                    setCurrentProjectNav({...currentProjectNav, "settingPage-entriesHorizontal": true});
                }}
               ></input>
               <label
                onClick={()=>{
                  let tempObj = currentProjectNav;
                  tempObj["settingPage-entriesHorizontal"] = true;
                  updateNavObj(tempObj);  
                  
                  setCurrentProjectNav({...currentProjectNav, "settingPage-entriesHorizontal": true});
              }}
               >{horizontalText}</label>
               <br></br>
               <input type="radio" value={currentProjectNav["settingPage-entriesHorizontal"]} checked={!currentProjectNav["settingPage-entriesHorizontal"]}
                 onChange={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-entriesHorizontal"] = false;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-entriesHorizontal": false});
                
                  }}
               ></input>
               <label
                  onClick={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-entriesHorizontal"] = false;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-entriesHorizontal": false});
                
                  }}
               >{verticalText}</label>
               <br></br>
               {groupPositionXText}:
                 <input type="range"
                  min="0" max="800" step="1"
                  value={currentProjectNav["settingPage-listItemGroupX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupX"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupX": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
                  min="0" max="800" step="1"
                  value={currentProjectNav["settingPage-listItemGroupX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupX"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupX": event.target.value});
           
                  }}
                 ></input>                 
               <br></br>
               {groupPositionYText}:
               <input type="range"
                  min="0" max="600" step="1"
                  value={currentProjectNav["settingPage-listItemGroupY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupY"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupY": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
                  min="0" max="600" step="1"
                  value={currentProjectNav["settingPage-listItemGroupY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupY"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupY": event.target.value});
           
                  }}
                 ></input>  
               <br></br>
               Group {widthText}:
               <input type="range"
                  min="1" max="800" step="1"
                  value={currentProjectNav["settingPage-listItemGroupWidth"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupWidth"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupWidth": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
                  min="1" max="800" step="1"
                  value={currentProjectNav["settingPage-listItemGroupWidth"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupWidth"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupWidth": event.target.value});
           
                  }}
                  ></input>
               <br></br>
               Group {heightText}:
               <input type="range"
                  min="1" max="600" step="1"
                  value={currentProjectNav["settingPage-listItemGroupHeight"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupHeight"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupHeight": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
                  min="1" max="600" step="1"
                  value={currentProjectNav["settingPage-listItemGroupHeight"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupHeight"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupHeight": event.target.value});
           
                  }}
                  ></input>

                  <br></br>
                  {itemGapText}: 
                  <input type="range"
                    min="0" max="150" step="1"
                    value={currentProjectNav["settingPage-listItemGap"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["settingPage-listItemGap"] = event.target.value;
                      updateNavObj(tempObj);   
  
                      setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGap": event.target.value});
                    }}
                  >

                  </input>
                  <input type="number"
                    min="0" max="150" step="1"
                    value={currentProjectNav["settingPage-listItemGap"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["settingPage-listItemGap"] = event.target.value;
                      updateNavObj(tempObj);   
  
                      setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGap": event.target.value});
                    }}
                  >

                  </input>

                  <br></br>
                  {fontColorText}:
                    <input type="color" 
                      value={currentProjectNav["settingPage-listItemFontColor"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-listItemFontColor"] = event.target.value;
                        updateNavObj(tempObj);   
    
                        setCurrentProjectNav({...currentProjectNav, "settingPage-listItemFontColor": event.target.value});   
                      }}
                    >
                    </input>
                    <label> {currentProjectNav["settingPage-listItemFontColor"]}</label>
                   <br></br>
               {fontSizeText}:
                     <input type="range" value={currentProjectNav["settingPage-listItemFontSize"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-listItemFontSize"] = event.target.value;
                        updateNavObj(tempObj);   
    
                        setCurrentProjectNav({...currentProjectNav, "settingPage-listItemFontSize": event.target.value});  
                      }}
                     ></input>
                     <input type="number" value={currentProjectNav["settingPage-listItemFontSize"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-listItemFontSize"] = event.target.value;
                        updateNavObj(tempObj);   
    
                        setCurrentProjectNav({...currentProjectNav, "settingPage-listItemFontSize": event.target.value});  
                      }}
                     ></input>
             
                   <br></br>
               
               Slider Looking: TODO

  
       
  
       <br></br><br></br>
       <label>Settings Page Items:</label>
       <div>
         <input type="checkbox"
           value={ currentProjectNav["settingPage-playSpeed"]}
           checked={ currentProjectNav["settingPage-playSpeed"]}
           onChange={()=>{
             let currVal =  currentProjectNav["settingPage-playSpeed"];
                  
             let tempObj = currentProjectNav;
             tempObj["settingPage-playSpeed"] = !currVal;
             updateNavObj(tempObj);     

             setCurrentProjectNav({...currentProjectNav, "settingPage-playSpeed": !currVal});
            }}
         ></input><label
            onClick={()=>{
              let currVal =  currentProjectNav["settingPage-playSpeed"];
                  
              let tempObj = currentProjectNav;
              tempObj["settingPage-playSpeed"] = !currVal;
              updateNavObj(tempObj);     

              setCurrentProjectNav({...currentProjectNav, "settingPage-playSpeed": !currVal});
            }}  
         >Play Speed</label>
         <br></br>
          <div className="indentOne">
            <label>{displayNamingText}:</label>
            <input value={settingsPagePlaySpeedName} onChange={
              (event)=>{
                setSettingsPagePlaySpeedName(event.target.value);
              }
            }></input>
            <button
            onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["settingPage-playSpeedName"] = settingsPagePlaySpeedName;
              updateNavObj(tempObj);     

              setCurrentProjectNav({...currentProjectNav, "settingPage-playSpeedName": settingsPagePlaySpeedName});
            }}>{updateText}</button>
          </div>

         <input type="checkbox"
           value={ currentProjectNav["settingPage-bgmVol"]}
           checked={ currentProjectNav["settingPage-bgmVol"]}
           onChange={()=>{
             let currVal =  currentProjectNav["settingPage-bgmVol"];
                    
             let tempObj = currentProjectNav;
             tempObj["settingPage-bgmVol"] = !currVal;
             updateNavObj(tempObj);     

             setCurrentProjectNav({...currentProjectNav, "settingPage-bgmVol": !currVal});
            }}                  
         ></input><label
            onClick={()=>{
              let currVal =  currentProjectNav["settingPage-bgmVol"];
                    
              let tempObj = currentProjectNav;
              tempObj["settingPage-bgmVol"] = !currVal;
              updateNavObj(tempObj);     

              setCurrentProjectNav({...currentProjectNav, "settingPage-bgmVol": !currVal});
            }}      
         >Background Music Volume</label>
          <div className="indentOne">
            <label>{displayNamingText}:</label>
            <input value={settingsPageBgmVolName}
            onChange={(event)=>{
              setSettingsPageBgmVolName(event.target.value);
            }}></input>
            <button onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["settingPage-bgmVolName"] = settingsPageBgmVolName;
              updateNavObj(tempObj);     

              setCurrentProjectNav({...currentProjectNav, "settingPage-bgmVolName": settingsPageBgmVolName});   
            }}>{updateText}</button> 
          </div>
     

         <input type="checkbox"
           value={ currentProjectNav["settingPage-seVol"]}
           checked={ currentProjectNav["settingPage-seVol"]}
           onChange={()=>{
             let currVal =  currentProjectNav["settingPage-seVol"];
                                         
             let tempObj = currentProjectNav;
             tempObj["settingPage-seVol"] = !currVal;
             updateNavObj(tempObj); 

             setCurrentProjectNav({...currentProjectNav, "settingPage-seVol": !currVal});
            }}                  
         ></input><label
            onClick={()=>{
              let currVal =  currentProjectNav["settingPage-seVol"];
                                          
              let tempObj = currentProjectNav;
              tempObj["settingPage-seVol"] = !currVal;
              updateNavObj(tempObj); 

              setCurrentProjectNav({...currentProjectNav, "settingPage-seVol": !currVal});
            }}    
         >Sound Effect Volume</label>
          <div className="indentOne">
            <label>{displayNamingText}:</label>
            <input value={settingsPageSeVolName} onChange={(event)=>{
              setSettingsPageSeVolName(event.target.value);
            }}></input>
            <button onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["settingPage-seVolName"] = settingsPageSeVolName;
              updateNavObj(tempObj); 

              setCurrentProjectNav({...currentProjectNav, "settingPage-seVolName": settingsPageSeVolName});
            }}>{updateText}</button>
          </div>


       </div>


     </div>
     </div>}


     {currentSettingPage === "Player Profile Page" && <div>
     <label>Player Profile Page:</label>
             
    



       <br></br><label>Element Settings: </label>
       <div className="indentOne">
       <label>{backGroundOfTheEntirePageText}:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        value={currentProjectNav["playerProfilePage-isBackgroundShape"]}
                        checked={currentProjectNav["playerProfilePage-isBackgroundShape"]}
                        onChange={()=>{    
                          let tempObj = currentProjectNav;
                          tempObj["playerProfilePage-isBackgroundShape"] = true;
                          updateNavObj(tempObj);

                          setCurrentProjectNav({...currentProjectNav, "playerProfilePage-isBackgroundShape": true});
                                 
                        }}></input><label onClick={()=>{    
                          let tempObj = currentProjectNav;
                          tempObj["playerProfilePage-isBackgroundShape"] = true;
                          updateNavObj(tempObj);

                          setCurrentProjectNav({...currentProjectNav, "playerProfilePage-isBackgroundShape": true});
                                 
                        }}
                        >{rectangleAndColorFilled} </label>
                            {
                                <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    value={currentProjectNav["playerProfilePage-bgShadeName"]}
                                    onChange={(event)=>{
                                          let tempObj = currentProjectNav;
                                          tempObj["playerProfilePage-bgShadeName"] = event.target.value;
                                          updateNavObj(tempObj);
                
                                          setCurrentProjectNav({...currentProjectNav, "playerProfilePage-bgShadeName": event.target.value});      
                                    }}></input>
                                    <label></label>
                                </div>}
                            
                        <br></br><input type="radio"
                            value={currentProjectNav["playerProfilePage-isBackgroundShape"]}
                            checked={!currentProjectNav["playerProfilePage-isBackgroundShape"]}
                            onChange={()=>{    
                              let tempObj = currentProjectNav;
                              tempObj["playerProfilePage-isBackgroundShape"] = false;
                              updateNavObj(tempObj);
    
                              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-isBackgroundShape": false});
                                     
                            }}
                          ></input><label onClick={()=>{    
                                let tempObj = currentProjectNav;
                                tempObj["playerProfilePage-isBackgroundShape"] = false;
                                updateNavObj(tempObj);
      
                                setCurrentProjectNav({...currentProjectNav, "playerProfilePage-isBackgroundShape": false});
                                      
                              }}>
                                {basePictureText} </label>
                            {
                            <>
                                <select 
                                  value={currentProjectNav["playerProfilePage-bgPicName"]}
                                  onChange={(event)=>{
                                    let tempObj = currentProjectNav;
                                    tempObj["playerProfilePage-bgPicName"] = event.target.value;
                                    updateNavObj(tempObj);
        
                                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-bgPicName": event.target.value});
                                        
                                  }}  
                                
                                
                                >                    
                                    <option key="mpliDefault" value="">-- {selectResource} --</option>
                                    {visualList.map((item, index) => {
                                        let keyStr = "playerProfilePage-li-" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>
       

          <div>
            <table>
              <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Item Type</th>
                    <th>Position (x, y)</th>
            
                </tr>
              </thead>
              <tbody>
              {itemAddingTable.map((item, index) => {
                 let keyStr = "itemAddingTable" + index;
                 
                 return (
                   <tr key={keyStr}>
                        <td>{item["itemName"]}</td>
                        <td>{item["itemType"]}</td>
                        <td>{item["posX"]}, {item["posY"]}</td>
                        <td>
                          <button
                            onClick={()=>{
                              //TODO highlight this item on previewer ??

                              //TODO notify caller-layer...
                              console.log("selected...", item);
                              let itemTemp = item;
                              itemTemp["selected"] = !itemTemp["selected"];
                              editItemTable(index, itemTemp);
                            }}
                          >{item["selected"] === true ? "unselect" : "select"}</button>
                          <button onClick={()=>{
                            let askStr = "Are you sure to delete this item: " + item["itemName"] + "?";
                            let resp = window.confirm(askStr);
                            if (resp === true) {
                              //TODO delete this from table
                              deleteFromItemTable(item["itemName"]);

                              //TODO update to caller-layer...
                            }
                          }}>delete</button>
                        </td>
                   </tr>
                 );
              })}


              </tbody>
            </table>
        

          </div>

           <button 
            className="w300 textLeft"
            onClick={()=>{
//TODO5

                setPlayerProfilePageIsAddingText(!playerProfilePageIsAddingText);
                
                let tempNav = currentProjectNav;
                tempNav["playerProfilePage-previewingTextObj"]["previewing"] = !playerProfilePageIsAddingText;
                setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj": tempNav["playerProfilePage-previewingTextObj"]});         
                updateNavObj(tempNav);
            

           }}>{playerProfilePageIsAddingText ? "︽" : "︾" } Add Text</button>
           {playerProfilePageIsAddingText && <>
           <br></br>
           <div className="indentOne" style={{"backgroundColor": "#98C1D9", "padding": "5px", "borderRadius": "0px", "margin": "3px", "color": "#000000"}}>
             <label>Text Content: </label>
             
             <input 
              value={currentProjectNav["playerProfilePage-previewingTextObj"]["textContent"]}
              onChange={(event)=>{
                changePPTryingTextItemTextContent(event);
              }}></input>
             <input type="checkbox"
              value={ppTryingTextItemTextItalicBool}
              checked={ppTryingTextItemTextItalicBool}
              onChange={()=>{
                changePPTryingTextItemTextItalic();
              }}
             ></input><label 
                style={{"userSelect": "none", "cursor": "pointer"}}
                onClick={()=>{
                  changePPTryingTextItemTextItalic();
                }}
             >Italic</label><br></br>

             <label>Text {fontSizeText}: </label>
             <input type="range" min="5" max="90" step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj"]["textFontSize"]}
              onChange={(event)=>{
                changePPTryingTextItemFontSize(event);
              }}
             ></input>
             <label>{currentProjectNav["playerProfilePage-previewingTextObj"]["textFontSize"]
}</label>
             <br></br>
             <label>Text Font: </label>
                <select 
                  value={currentProjectNav["playerProfilePage-previewingTextObj"]["textFont"]}
                  onChange={(event)=>{
                    changePPTryingTextItemFontFamily(event);
                  }}
                
                >
                  <option value="serif" key="toAddPPpageTextContent_serif">serif</option>
                  <option value="sans-serif" key="toAddPPpageTextContent_sans-serif">sans-serif</option>
                  <option value="cursive" key="toAddPPpageTextContent_cursive">cursive</option>
  
                </select><br></br>
             <label>Text Color: </label><input type="color"
              value={currentProjectNav["playerProfilePage-previewingTextObj"]["textColor"]}
              onChange={(event)=>{
                changePPTryingTextItemTextColor(event);
              }}
             
             ></input>
             <label> {currentProjectNav["playerProfilePage-previewingTextObj"]["textColor"]}</label>
             <br></br>
             <label>{positionXText}: </label>
             <input type="range" min="1" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj"]["posX"]}
              onChange={(event)=>{
                changePPTryingTextItemPosX(event);
              }}
             ></input>
             <input min="1" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj"]["posX"]}
              onChange={(event)=>{
                changePPTryingTextItemPosX(event);
              }}
             ></input>
             
             <br></br>
             <label>{positionYText}: </label>
             <input type="range" min="1" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj"]["posY"]}
              onChange={(event)=>{
                changePPTryingTextItemPosY(event);
              }}
             ></input>
             <input min="1" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj"]["posY"]}
              onChange={(event)=>{
                changePPTryingTextItemPosY(event);
              }}
             ></input>
             <br></br><br></br>
             <button
              onClick={()=>{
                if (currentProjectNav["playerProfilePage-previewingTextObj"]["textContent"].length === 0) {
                  alert("Cannot add empty text content.");
                  return;
                }
                let itemName = "text-" + currentProjectNav["playerProfilePage-previewingTextObj"]["textContent"];
                let itemType = "text";
                let x = currentProjectNav["playerProfilePage-previewingTextObj"]["posX"];
                let y = currentProjectNav["playerProfilePage-previewingTextObj"]["posY"];
                let obj = {
                  "itemName": itemName,
                  "itemType": itemType,
                  "posX": x,
                  "posY": y
                }

                addPPTryingAnyItemNew(obj);
                resetPPTryingTextItem();
              }}
             >Add</button>
             <button
                onClick={()=>{
                  resetPPTryingTextItem();
                }}  
             >Clear</button>


           </div>
           </>}
           {!playerProfilePageIsAddingText && <br></br>}
       
           <br></br>
           <button
            className="w300 textLeft"
            onClick={()=>{
              setPlayerProfilePageIsAddingValue(!playerProfilePageIsAddingValue);
              
              let tempNav = currentProjectNav;
              tempNav["playerProfilePage-previewingValueObj"]["previewing"] = !playerProfilePageIsAddingValue;
              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj": tempNav["playerProfilePage-previewingValueObj"]});         
              updateNavObj(tempNav);

            }}
           >{playerProfilePageIsAddingValue ? "︽" : "︾" } Add Value Display</button><br></br> 
           {playerProfilePageIsAddingValue && <div style={{"backgroundColor": "#98C1D9", "padding": "5px", "borderRadius": "0px", "margin": "3px", "color": "#000000"}}>
           
           
           
             <label>Label Text: </label>
             <input
              value={currentProjectNav["playerProfilePage-previewingValueObj"]["labelText"]}
              onChange={(event)=>{
                changePPTryingValueItemLabelText(event);
              }}
             ></input>
             <br></br>                       
             <label>Value Item: </label>

                <div className="indentOne">
                  <select value={playerProfilePageAddingValueType}
                    onChange={(event)=>{
                      changePlayerProfilePageAddingValueType(event.target.value);
                    }}
                  >
                    <option key="ppSetting-value-type-defaultNone" value="">-- Select Data Item Category --</option>

                    <option key="ppSetting-value-type-gameData" value="Game Data">Game Data</option>
                    <option key="ppSetting-value-type-playerProfileData" value="Player Profile">Player Profile</option>
                    <option key="ppSetting-value-type-accountInfo" value="Player Account Info">Player Account Info</option>
                  </select>

                  {/* actual data item names (according to type) */}
                  {playerProfilePageAddingValueType === "Game Data" && 
                      <>
                      <select 
                        value={currentProjectNav["playerProfilePage-previewingValueObj"]["valueItemName"]}
                        onChange={(event)=>{
                          changePlayerProfilePageAddingValueName(event);
                        }}
                        >
                        <option key="ppValue-gameData-option-defaultNone" value="">-- Select Game Data Item --</option>
                        {Object.keys(gameDataDesignList).map((currKey) => {
                          let item = gameDataDesignList[currKey];
                          let keyStr = "ppValue-gameData-option-" + currKey;
                          return (<option key={keyStr} value={item["name"]}>{item["name"]}</option>);
                        })}

                      </select> 
                      <button
                        onClick={()=>{
                          getGameDataFromCloud();
                          resetPlayerProfilePageAddingValueName();
                        }
                        }
                      >Update Game Data</button>
                      </>
                  }
                  
                  {playerProfilePageAddingValueType === "Player Profile" && 
                      <select>
                        <option key="ppValue-playerProfile-option-defaultNone" value="">-- Select Player Profile Data Item --</option>
                        {Object.keys(intialEmuPlayerProfile).map((currKey) => {                     
                          let keyStr = "ppValue-playerProfile-option-" + currKey;
                          return (<option key={keyStr} value={currKey}>{currKey}</option>);
                        })}

                      </select>
                  }
                  
                  {playerProfilePageAddingValueType === "Player Account Info" && 
                      <select>
                        <option>-- Select Player Account Data Item --</option>
//TODO7
                      </select>
                      
                  }
                </div>

           
            <label>{positionXText}</label>
            <input type="range" min="0" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj"]["posX"]}
              onChange={(event)=>{
                changePPTryingValueItemPosX(event);
              }}
            ></input>  
            <input min="0" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj"]["posX"]}
              onChange={(event)=>{
                changePPTryingValueItemPosX(event);
              }}
            ></input>  
               
               <br></br>
             <label>{positionYText}: </label>
             <input type="range" min="0" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj"]["posY"]}
              onChange={(event)=>{
                changePPTryingValueItemPosY(event);
              }}
            ></input>  
             <input min="0" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj"]["posY"]}
              onChange={(event)=>{
                changePPTryingValueItemPosY(event);
              }}
            ></input>  
             <br></br>
             <label>Text {fontSizeText}: </label>
             <input type="range" min="1" max="50" step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj"]["textFontSize"]}
              onChange={(event)=>{
                changePPTryingValueItemFontSize(event);
              }}
             ></input>
             <label> {currentProjectNav["playerProfilePage-previewingValueObj"]["textFontSize"]}</label>
             
             <br></br>
             <label>Text Font: </label><select
              value={currentProjectNav["playerProfilePage-previewingValueObj"]["textFont"]}
              onChange={(event)=>{
                changePPTryingValueItemFont(event);

              }}
             >
                  <option value="serif" key="toAddPPpageValue_serif">serif</option>
                  <option value="sans-serif" key="toAddPPpageValue_sans-serif">sans-serif</option>
                  <option value="cursive" key="toAddPPpageValue_cursive">cursive</option>
             </select><br></br>
             <label>Text Color: </label>
             <input type="color"
              value={currentProjectNav["playerProfilePage-previewingValueObj"]["textColor"]}
              onChange={(event)=>{
                changePPTryingValueItemTextColor(event);

              }}
             ></input>
             <label> {currentProjectNav["playerProfilePage-previewingValueObj"]["textColor"]}</label>
             
             <br></br>                     

        
           
           <button
            onClick={()=>{
              let itemType = "value";


              if (currentProjectNav["playerProfilePage-previewingValueObj"]["valueItemType"].length === 0
                || currentProjectNav["playerProfilePage-previewingValueObj"]["valueItemName"].length === 0) {
                alert("Cannot add unclear value-item.");
                return;
              }
              let itemName = "value-" + currentProjectNav["playerProfilePage-previewingValueObj"]["labelText"]
                + "-"
                + currentProjectNav["playerProfilePage-previewingValueObj"]["valueItemType"]
                + "-"
                + currentProjectNav["playerProfilePage-previewingValueObj"]["valueItemName"];
              
          
              let x = currentProjectNav["playerProfilePage-previewingValueObj"]["posX"];
              let y = currentProjectNav["playerProfilePage-previewingValueObj"]["posY"];
              let obj = {
                "itemName": itemName,
                "itemType": itemType,
                "posX": x,
                "posY": y
              }

              addPPTryingAnyItemNew(obj);
              resetPPTryingValueItem();
            }}
           
           
           >Add</button>
           <button
            onClick={()=>{
              resetPPTryingValueItem();
            }}
           >Clear</button>
           </div>}
           
           <br></br>
           <button
            className="w300 textLeft"
            onClick={()=>{
              setPlayerProfilePageIsAddingPic(!playerProfilePageIsAddingPic);

              let tempNav = currentProjectNav;
              tempNav["playerProfilePage-previewingPicObj"]["previewing"] = !playerProfilePageIsAddingPic;
              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj": tempNav["playerProfilePage-previewingPicObj"]});         
              updateNavObj(tempNav);
            }}
           >{playerProfilePageIsAddingPic ? "︽" : "︾" } Add Picture</button>
           
           {playerProfilePageIsAddingPic && <div className="indentOne" style={{"backgroundColor": "#98C1D9", "padding": "5px", "borderRadius": "0px", "margin": "3px", "color": "#000000"}}>
             
             <label>{positionXText}: </label>
             <input type="range" min="0" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj"]["posX"]}
              onChange={(event)=>{
                changePPTryingPicItemPosX(event);
              }}
             ></input>
             <input min="0" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj"]["posX"]}
              onChange={(event)=>{
                changePPTryingPicItemPosX(event);
              }}
             ></input>
             
             <br></br>
             
             
             <label>{positionYText}: </label>
             <input type="range" min="0" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj"]["posY"]}
              onChange={(event)=>{
                changePPTryingPicItemPosY(event);
              }}
             ></input>             
             <input min="0" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj"]["posY"]}
              onChange={(event)=>{
                changePPTryingPicItemPosY(event);
              }}
             ></input>   
             <br></br>
                         
             <label>Picture: </label>


             <select onChange={(event)=>{
               changePPTryingPicName(event);
             }}
                value={currentProjectNav["playerProfilePage-previewingPicObj"]["picName"]}
             >
                <option key="profilePage-addingPic-defaultNone" value=""> -- Select Picture Name --</option>
                {visualList.map((item, index) => {
                  let keyStr = "profilePage-addingPic-" + index + item["var"];
                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                  })}                                    
                          
             </select>
             <button onClick={() => {openRm();}}>{manageResourceText}</button><br></br>
             
             <label>{widthText}: </label>
             <input type="range" min="1" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj"]["width"]}
              onChange={(event)=>{
                changePPTryingPicItemWidth(event);
              }}
             ></input>    
             <input min="1" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj"]["width"]}
              onChange={(event)=>{
                changePPTryingPicItemWidth(event);
              }}
             ></input>  
             
             <br></br>

             <label>{heightText}: </label>
             <input type="range" min="1" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj"]["height"]}
              onChange={(event)=>{
                changePPTryingPicItemHeight(event);
              }}
             ></input>  
             <input min="1" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj"]["height"]}
              onChange={(event)=>{
                changePPTryingPicItemHeight(event);
              }}
             ></input>  
             <br></br>
             <br></br>
            
             
             <button
              onClick={()=>{
                  let itemType = "pic";

                  if (currentProjectNav["playerProfilePage-previewingPicObj"]["picName"].length === 0) {
                    alert("Cannot add empty picture option.");
                    return;
                  }
                  let itemName = "pic-" + currentProjectNav["playerProfilePage-previewingPicObj"]["picName"];
                  
                  let x = currentProjectNav["playerProfilePage-previewingPicObj"]["posX"];
                  let y = currentProjectNav["playerProfilePage-previewingPicObj"]["posY"];
                  let obj = {
                    "itemName": itemName,
                    "itemType": itemType,
                    "posX": x,
                    "posY": y
                  }
    
                  addPPTryingAnyItemNew(obj);
                  resetPPTryingPicItem();
        
              }}
             >Add</button>
             
             <button
              onClick={()=>{
                resetPPTryingPicItem();
              }}
             >Clear</button>


           </div>}
    
           <br></br><br></br>
           <label>Player Profile Settings</label>
           <div className="indentOne">

            <br></br>
            <div>Emulated User Data (for Test) Setting</div>
            <div className="indentOne someGrey" style={{"color": "#000000", "padding": "3px"}}>
                <label>Username: </label>
                <input 
                    defaultValue={emuPlayerInfo["playername"]}
                    onChange={(event)=>{
                      let infoObj = emuPlayerInfo;
                      infoObj["playername"] = event.target.value;
                      setEmuPlayerInfo({...emuPlayerInfo, "playername": event.target.value});
                    }}
                ></input>
                <br></br>
                <label>Icon Picture: </label>
                    <select

                      onChange={(event)=>{
                        let infoObj = emuPlayerInfo;
                        infoObj["iconPicName"] = event.target.value;
                        setEmuPlayerInfo({...emuPlayerInfo, "iconPicName": event.target.value});         
                      }}
                    >
                      <option key="ppIcon-defaultNone" value="">-- Select Picture Name --</option>
                      {visualList.map((item, index) => {
                          let keyStr = "ppIcon-" + index + item["var"];
                          return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                      })}

                    </select>

                <button
                  onClick={()=>{
                    openRm();
                  }}
                >Manage Resource</button>
                <br></br>

                <label>Level: </label>
                <input></input>
                <br></br>

                <label>Membership: </label>
                <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>

                <br></br>
                <button 
                  onClick={()=>{
                    updateEmuPlayerProfile(emuPlayerInfo);

                  }}
                >Update</button>
            </div>
          
            <br></br>
            <br></br>
 

           {/* <input type="checkbox"
            value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["adding"]}
            checked={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["adding"]}
            onChange={()=>{
              // let tempNav = currentProjectNav;
              // tempNav["playerProfilePage-playerProfileNickNameItem"]["adding"] = !tempNav["playerProfilePage-playerProfileNickNameItem"]["adding"];
              // setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
              // updateNavObj(tempNav);
//TODO12
            }}
           ></input>   */}
           
           <label
            className="textNoSelect cursor_pointer"
           >
           Player Profile Nickname
           </label> 

           {currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["adding"] && 
           <div className="indentOne">
              <label>Label (optional): </label>
              <input
                placeholder="Nickname"
                value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["nicknameLabel"]}
                onChange={(event)=>{
                  let tempNav = currentProjectNav;
                  tempNav["playerProfilePage-playerProfileNickNameItem"]["nicknameLabel"] = event.target.value;
                  setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                  updateNavObj(tempNav);   
                }}
                onClick={()=>{
                  if (currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["nicknameLabel"] === "") {
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileNickNameItem"]["nicknameLabel"] = "Nickname";
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                    updateNavObj(tempNav);   
                  }
                }}
              ></input>
              <br></br>
              <label>Nickname Italic</label>
                <input type="checkbox"
                  value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["textItalic"]}
                  onChange={()=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileNickNameItem"]["textItalic"] = !tempNav["playerProfilePage-playerProfileNickNameItem"]["textItalic"];
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                    updateNavObj(tempNav);   
                  }}    
                ></input>
              <br></br>
              <label>Text {fontSizeText}: </label>
              <input type="range"
                  value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["textFontSize"]}
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileNickNameItem"]["textFontSize"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                    updateNavObj(tempNav);   
                  }}  
              ></input>
              <label>{currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["textFontSize"]}</label>
              <br></br>
              <label>Text Font: </label>
              <select
                value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["textFont"]}
                onChange={(event)=>{
                  let tempNav = currentProjectNav;
                  tempNav["playerProfilePage-playerProfileNickNameItem"]["textFont"] = event.target.value;
                  setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                  updateNavObj(tempNav);   
                }}
              >
                <option value="serif" key="playerProfile_nickname_serif">serif</option>
                <option value="sans-serif" key="playerProfile_nickname_sans-serif">sans-serif</option>
                <option value="cursive" key="playerProfile_nickname_cursive">cursive</option>   
              </select>
              <br></br>
              <label>Text Color: </label>
              <input type="color"
                value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["textColor"]}
                onChange={(event)=>{
                  let tempNav = currentProjectNav;
                  tempNav["playerProfilePage-playerProfileNickNameItem"]["textColor"] = event.target.value;
                  setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                  updateNavObj(tempNav);  
                }}              
              ></input>
              <label> {currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["textColor"]}</label>
              <br></br>
              <label>{positionXText}: </label>
              <input
                min="0" max={screenWidth} step="1"
                type="range"
                value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["posX"]}
                onChange={(event)=>{
                  let tempNav = currentProjectNav;
                  tempNav["playerProfilePage-playerProfileNickNameItem"]["posX"] = event.target.value;
                  setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                  updateNavObj(tempNav);  
                }}
              ></input>
              <input
                min="0" max={screenWidth} step="1"
                value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["posX"]}
                onChange={(event)=>{
                  let tempNav = currentProjectNav;
                  tempNav["playerProfilePage-playerProfileNickNameItem"]["posX"] = event.target.value;
                  setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                  updateNavObj(tempNav);  
                }}
              ></input>
              <br></br>
              <label>{positionYText}: </label>
              <input
                min="0" max={screenHeight} step="1"
                type="range"
                value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["posY"]}
                onChange={(event)=>{
                  let tempNav = currentProjectNav;
                  tempNav["playerProfilePage-playerProfileNickNameItem"]["posY"] = event.target.value;
                  setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                  updateNavObj(tempNav);  
                }}
              ></input>
              <input
                min="0" max={screenHeight} step="1"
                value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["posY"]}
                onChange={(event)=>{
                  let tempNav = currentProjectNav;
                  tempNav["playerProfilePage-playerProfileNickNameItem"]["posY"] = event.target.value;
                  setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                  updateNavObj(tempNav);  
                }}
              ></input>

           </div>}
           
           <br></br>
           {/* <input type="checkbox"
              value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["adding"]}
              checked={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["adding"]}
              onChange={()=>{
                // let tempNav = currentProjectNav;
                // tempNav["playerProfilePage-playerProfileIconPicItem"]["adding"] = !tempNav["playerProfilePage-playerProfileIconPicItem"]["adding"];
                // setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                // updateNavObj(tempNav);
//TODO12                
              }}
           ></input>   */}
           <label
            className="textNoSelect cursor_pointer"
           >Player Profile Icon</label> 
           {currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["adding"] &&
            <div className="indentOne">
                <label>{positionXText}: </label>
                <input type="range"
                  min="0" max={screenWidth} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["posX"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["posX"]}
                ></input>
                <input
                    min="0" max={screenWidth} step="1"
                    onChange={(event)=>{
                      let tempNav = currentProjectNav;
                      tempNav["playerProfilePage-playerProfileIconPicItem"]["posX"] = event.target.value;
                      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                      updateNavObj(tempNav);                       
                    }}
                    value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["posX"]}
                ></input>
                <br></br>
                <label>{positionYText}: </label>
                <input type="range"
                  min="0" max={screenHeight} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["posY"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["posY"]}
                ></input>
                <input
                  min="0" max={screenHeight} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["posY"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["posY"]}
                ></input>
                <br></br>
                <label>{widthText}: </label>
                <input type="range"
                  min="0" max={screenWidth} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["width"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["width"]}
                ></input>
                <input
                  min="0" max={screenWidth} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["width"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["width"]}
                ></input>
                <br></br>
                <label>{heightText}: </label>
                <input type="range"
                  min="0" max={screenHeight} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["height"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["height"]}
                ></input>
                <input
                  min="0" max={screenHeight} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["height"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["height"]}
                ></input>
                <br></br>
                <label>Scale: </label>
                <input type="range"
                  min="1" max="5" step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["scale"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["scale"]}
                ></input>
                <input
                  min="1" max="5" step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem"]["scale"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["scale"]}
                ></input>
            </div>}
            
      
  
           

            </div>
       </div>


    </div>}

    {currentSettingPage === "Game Status Data Page" && <div>
     <label>Game Status Data Page:</label>
       <div className="indentOne">
       <label>{backGroundOfTheEntirePageText}:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        value={currentProjectNav["gsdPage-isBackgroundShape"]}
                        checked={currentProjectNav["gsdPage-isBackgroundShape"]}
                        onChange={()=>{    
                          let tempObj = currentProjectNav;
                          tempObj["gsdPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj); 
             
                          setCurrentProjectNav({...currentProjectNav, "gsdPage-isBackgroundShape": true});
                        }}></input><label onClick={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["gsdPage-isBackgroundShape"] = true;
                            updateNavObj(tempObj); 
              
                            setCurrentProjectNav({...currentProjectNav, "gsdPage-isBackgroundShape": true});                                
                        }}>{rectangleAndColorFilled} </label>
                            {
                                <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["gsdPage-bgShadeName"] = event.target.value;
                                      updateNavObj(tempObj); 
                        
                                      setCurrentProjectNav({...currentProjectNav, "gsdPage-bgShadeName": event.target.value});      
                                        }}></input>
                                    <label> {currentProjectNav["gsdPage-bgShadeName"]}</label>
                                </div>}
                            
                        <input type="radio"
                          value={currentProjectNav["gsdPage-isBackgroundShape"]}
                          checked={!currentProjectNav["gsdPage-isBackgroundShape"]}
                          onChange={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["gsdPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj); 
              
                            setCurrentProjectNav({...currentProjectNav, "gsdPage-isBackgroundShape": false});             
                        }}></input><label onClick={()=>{
                              let tempObj = currentProjectNav;
                              tempObj["gsdPage-isBackgroundShape"] = false;
                              updateNavObj(tempObj); 
                
                              setCurrentProjectNav({...currentProjectNav, "gsdPage-isBackgroundShape": false});                           
                        }}>{basePictureText} </label>
                            {
                            <>
                              <select onChange={(event)=>{
                                  let tempObj = currentProjectNav;
                                  tempObj["gsdPage-bgPicName"] = event.target.value;
                                  updateNavObj(tempObj); 
                        
                                  setCurrentProjectNav({...currentProjectNav, "gsdPage-bgPicName": event.target.value});                                     
                              }}>                    
                                    <option key="gsdPage-bgPicNameDefault" value="">-- {selectResource} --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "gsdPage-bgPic-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}                                    
                          
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>
       

           TODO data displaying
           gsdPageMap(local) to gameStatusDataPageArr(stored to cloud)
           {/*//TODO setGsdPageMap() */}

           <br></br>TODO layout
       </div>
    </div>}

    {currentSettingPage === "Shop Page" && <div>
     <label>Shop Page:</label>
       <div className="indentOne">
       <label>{backGroundOfTheEntirePageText}:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        value={currentProjectNav["shopPage-isBackgroundShape"]}
                        checked={currentProjectNav["shopPage-isBackgroundShape"]}
                        onChange={()=>{    
                          let tempObj = currentProjectNav;
                          tempObj["shopPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj); 
            
                          setCurrentProjectNav({...currentProjectNav, "shopPage-isBackgroundShape": true});  
                          
                        }}></input><label onClick={()=>{    
                          let tempObj = currentProjectNav;
                          tempObj["shopPage-isBackgroundShape"] = true;
                          updateNavObj(tempObj); 
            
                          setCurrentProjectNav({...currentProjectNav, "shopPage-isBackgroundShape": true});  
                          
                        }}
                        >{rectangleAndColorFilled} </label>
                            {
                                <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                      
                                        }}></input>
                                    <label></label>
                                </div>}
                            
                        <br></br><input type="radio"
                          value={currentProjectNav["shopPage-isBackgroundShape"]}
                          checked={!currentProjectNav["shopPage-isBackgroundShape"]}
                          onChange={()=>{    
                            let tempObj = currentProjectNav;
                            tempObj["shopPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj); 
              
                            setCurrentProjectNav({...currentProjectNav, "shopPage-isBackgroundShape": false});  
                            
                          }}></input><label onClick={()=>{    
                            let tempObj = currentProjectNav;
                            tempObj["shopPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj); 
              
                            setCurrentProjectNav({...currentProjectNav, "shopPage-isBackgroundShape": false});  
                            
                          }}>{basePictureText} </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- {selectResource} --</option>
                          
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>
       

           TODO shop page content (in separate editor?)

       </div>
       </div>}

    <br></br>

    <br></br>

    <button>{saveChangesText}</button>



 </div>
);


}


/*
PlayerProfile { 
  "playername": "playerA",
  "userTitle": "",
  "iconPicName": "",
  "level": 2,
  "membership": 1,
}

PlayerAccount {
  "playername": "playerA",
  "email": "example@email.com",
}

PlayerSLRecords {
  "playername": "playerA",
  "itemStatus": [{}, {}, {}]
}  
*/