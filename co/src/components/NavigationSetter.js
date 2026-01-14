import { useState, useEffect } from 'react';
import langDictionary from './_textDictionary';
import { defaultScreenWidth, defaultScreenHeight } from './_dataStructure_DefaultObjects';


export default function NavigationSetter({
  initialNavObj, 
  onEditingSlPageTab,
  updateNavObj, 
  openRm, 

  fetchPageName,
  triggerUpdateCurrPageName, 

  getCurrentPopWindowName,
  notifyEditorPopWindowOpened,

  initialScreenHeight, getScreenheight,

  intialEmuPlayerProfile,
  fetchEmuPlayerProfile,
  openEmuManager,
  getUILanguage,


  getVisualMap,
  getAudioMap,

  getGameDataDesign,

  getSlEditingFlag


}) {

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en');


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

    let rectangleAndColorFilledText = textDictItem.rectangleAndColorFilledText !== undefined ?
        textDictItem.rectangleAndColorFilledText
        : textDictItemDefault.rectangleAndColorFilledText;

    let basePictureText = textDictItem.basePictureText !== undefined ?
        textDictItem.basePictureText
        : textDictItemDefault.basePictureText;

    let selectResourceText = textDictItem.selectResourceText !== undefined ?
        textDictItem.selectResourceText
        : textDictItemDefault.selectResourceText;

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

    let allButtonCornerRadiusText = textDictItem.allButtonCornerRadiusText !== undefined ?
        textDictItem.allButtonCornerRadiusText
        : textDictItemDefault.allButtonCornerRadiusText;

    let updateListText = textDictItem.updateListText !== undefined ?
        textDictItem.updateListText
        : textDictItemDefault.updateListText;

    let reloadSetterText = textDictItem.reloadSetterText !== undefined ?
        textDictItem.reloadSetterText
        : textDictItemDefault.reloadSetterText;

    let fontNameText = textDictItem.fontNameText !== undefined ?
        textDictItem.fontNameText
        : textDictItemDefault.fontNameText;

    let labelTextText = textDictItem.labelTextText !== undefined ?
        textDictItem.labelTextText
        : textDictItemDefault.labelTextText;

    let valueItemText = textDictItem.valueItemText !== undefined ?
        textDictItem.valueItemText
        : textDictItemDefault.valueItemText;

    let selectDataItemCategoryText = textDictItem.selectDataItemCategoryText !== undefined ?
        textDictItem.selectDataItemCategoryText
        : textDictItemDefault.selectDataItemCategoryText;

    let gameDataText = textDictItem.gameDataText !== undefined ?
        textDictItem.gameDataText
        : textDictItemDefault.gameDataText;
    
    let playerProfileText = textDictItem.playerProfileText !== undefined ?
        textDictItem.playerProfileText
        : textDictItemDefault.playerProfileText;
        
    let playerAccountInfoText = textDictItem.playerAccountInfoText !== undefined ?
        textDictItem.playerAccountInfoText
        : textDictItemDefault.playerAccountInfoText;
    
    let italicText = textDictItem.italicText !== undefined ?
        textDictItem.italicText
        : textDictItemDefault.italicText;

    let chapterListText = textDictItem.chapterListText !== undefined ?
        textDictItem.chapterListText
        : textDictItemDefault.chapterListText;

    let listDirectionText = textDictItem.listDirectionText !== undefined ?
        textDictItem.listDirectionText
        : textDictItemDefault.listDirectionText;

    let listItemLookingText = textDictItem.listItemLookingText !== undefined ?
        textDictItem.listItemLookingText
        : textDictItemDefault.listItemLookingText;
    
    let sItems = textDictItem.sItems !== undefined ?
        textDictItem.sItems
        : textDictItemDefault.sItems;

    let playSpeedText = textDictItem.playSpeedText !== undefined ?
        textDictItem.playSpeedText
        : textDictItemDefault.playSpeedText;

    let bgmVolumeText = textDictItem.bgmVolumeText !== undefined ? 
        textDictItem.bgmVolumeText
        : textDictItemDefault.bgmVolumeText;

    let soundEffectVolumeText = textDictItem.soundEffectVolumeText !== undefined ?
        textDictItem.soundEffectVolumeText
        : textDictItemDefault.soundEffectVolumeText;

    let groupsText = textDictItem.groupsText !== undefined ?
        textDictItem.groupsText
        : textDictItemDefault.groupsText;

    let sliderSText = textDictItem.sliderSText !== undefined ?
        textDictItem.sliderSText
        : textDictItemDefault.sliderSText;
    
    let colorText = textDictItem.colorText !== undefined ?
        textDictItem.colorText
        : textDictItemDefault.colorText;

    let productItemListText = textDictItem.productItemListText !== undefined ?
        textDictItem.productItemListText
        : textDictItemDefault.productItemListText;



//TODO15
        
    const [screenHeight, setScreenHeight] = useState(initialScreenHeight);

    const screenWidth = defaultScreenWidth; //TODO temp  

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

    const [toggleIsPlayerProfile, setToggleIsPlayerProfile] = useState(true);
    const [toggleIsSetting, setToggleIsSetting] = useState(true);
    const [toggleIsShop, setToggleIsShop] = useState(true);

    const [toggleIsSettingPlaySpeed, setToggleIsSettingPlaySpeed] = useState(true);
    const [toggleIsSettingBgmVol, setToggleIsSettingBgmVol] = useState(true);
    const [toggleIsSettingSeVol, setToggleIsSettingSeVol] = useState(true);

    const [ppTryingTextItemTextItalicBool, setPpTryingTextItemTextItalicBool] = useState(false);

    const [playerProfilePageAddingValueType, setPlayerProfilePageAddingValueType] = useState("");
    const [itemAddingTable, setItemAddingTable] = useState([]);
    const [ppNicknameDisplay, setPPNicknameDisplay] = useState(initialNavObj["playerProfilePage-playerProfileNickNameItem-adding"]);
    const [ppIconDisplay, setPPIconDisplay] = useState(initialNavObj["playerProfilePage-playerProfileIconPicItem-adding"]);

    const [gameDataDesignList, setGameDataDesignList] = useState(-1);                    /* Important */

    const [qWindowContentText, setQwindowContentText] = useState(initialNavObj["outWindow-askContent"]);
    const [qWindowConfirmBtnText, setQwindowConfirmBtnText] = useState(initialNavObj["outWindow-Btn-confirmingText"]);
    const [qWindowCancelBtnText, setQwindowCancelBtnText] = useState(initialNavObj["outWindow-Btn-cancellingText"]);

    const [popWindowName, setPopWindowName] = useState(""); // "gameQuitAsking"   "slConfirming"

    const [progressWithSLinput, setProgressWithSLinput] = useState(initialNavObj["isWithSL"]);

    const [emuPlayerInfo, setEmuPlayerInfo] = useState(intialEmuPlayerProfile);

    const [shopPageBuyInput, setShopPageBuyInput] = useState(initialNavObj["shopPage-listItem-buyText"]);
    const [shopPageCancelInput, setShopPageCancelInput] = useState(initialNavObj["shopPage-bConfWindow-cancelText"]);
    const [shopPageInfoInput, setShopPageInfoInput] = useState(initialNavObj["shopPage-listItem-infoText"]);
    const [shopPageConfirmInput, setShopPageConfirmInput] = useState(initialNavObj["shopPage-bConfWindow-confirmText"]);


    const [audioMap, setAudioMap] = useState({});
    const [visualMap, setVisualMap] = useState({}); 

    const [isSlSheetEditing, setIsSlSheetEditing] = useState(false);


    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
      if (firstTimeEnter === true) {
            //console.log("Navigation Setter -- "); //TODO test

            getGameDataDesignFromOuterLayer(); //value-list: game-data
 

            //TODO value-list player-account 



            setFirstTimeEnter(false);
      }

      let slEditingTemp = getSlEditingFlag();
      setIsSlSheetEditing(slEditingTemp);


      let UILang = getUILanguage();
      setLanguageCodeTextOption(UILang);

      //fetch from nav-previewer for current-page-name
      let tempPage= fetchPageName();
      if (tempPage !== undefined && tempPage !== "") {
        setCurrentSettingPage(tempPage);
        let pWindowTemp = getCurrentPopWindowName();


        setPopWindowName(pWindowTemp);

          if (pWindowTemp === "gameQuitAsking") {
            // should show game-quit-pop-window-settings
            //TODO
  
          } else if (pWindowTemp === "slConfirming") {
              // should show sl-confim-pop-window-settings
  
  
          } 

        

      }
      if (tempPage === "Quit Asking Window" || tempPage === "SL Asking Window") {
         //TODO79
      } else {
        
      }

      

      let heightTemp = getScreenheight();
      setScreenHeight(heightTemp);

      let ppTemp = fetchEmuPlayerProfile();
      setEmuPlayerInfo(ppTemp);


      let auMap = getAudioMap();
      setAudioMap(auMap);
      let visMap = getVisualMap();
      setVisualMap(visMap);

    });


    const [audioList, setAudioList] = useState([]); //TODO for bgm on each nav-page -- future feature
    const [visualList, setVisualList] = useState([]); 

    const [ppNicknameAreaExpand, setPpNicknameAreaExpand] = useState(false);


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


    function getGameDataDesignFromOuterLayer() {

      let gDataMap = getGameDataDesign();
      setGameDataDesignList(gDataMap);
    }


    function changePPTryingTextItemTextContent(event) { 
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj-textContent"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj-textContent": event.target.value});

      updateNavObj(tempNav);
               
    }

    function changePPTryingTextItemTextItalic() {
      setPpTryingTextItemTextItalicBool(!ppTryingTextItemTextItalicBool);
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj-textItalic"] = !ppTryingTextItemTextItalicBool;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj-textItalic": !ppTryingTextItemTextItalicBool});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemFontSize(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj-textFontSize"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj-textFontSize": event.target.value});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemFontFamily(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj-textFont"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj-textFont": event.target.value});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemTextColor(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj-textColor"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj-textColor": event.target.value});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemPosX(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj-posX"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj-posX": event.target.value});
               
      updateNavObj(tempNav);
    }

    function changePPTryingTextItemPosY(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj-posY"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj-posY": event.target.value});
               
      updateNavObj(tempNav);      
    }

    function resetPPTryingTextItem() {

      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingTextObj-isPreviewing"] = false;
      tempNav["playerProfilePage-previewingTextObj-textContent"] = "";
      tempNav["playerProfilePage-previewingTextObj-textItalic"] = false;
      tempNav["playerProfilePage-previewingTextObj-textFontSize"] = 12;
      tempNav["playerProfilePage-previewingTextObj-textFont"] = "serif";
      tempNav["playerProfilePage-previewingTextObj-textColor"] = "#000000";
      tempNav["playerProfilePage-previewingTextObj-posX"] = 30;
      tempNav["playerProfilePage-previewingTextObj-posY"] = 50;    
 
      setCurrentProjectNav({...currentProjectNav, 
        "playerProfilePage-previewingTextObj-isPreviewing": false,
        "playerProfilePage-previewingTextObj-textContent": "",
        "playerProfilePage-previewingTextObj-textItalic": false,
        "playerProfilePage-previewingTextObj-textFontSize": 12,
        "playerProfilePage-previewingTextObj-textFont": "serif",
        "playerProfilePage-previewingTextObj-textColor": "#000000",
        "playerProfilePage-previewingTextObj-posX": 30,
        "playerProfilePage-previewingTextObj-posY": 50,
      
      });
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
        objTemp["textContent"] = currentProjectNav["playerProfilePage-previewingTextObj-textContent"];
        objTemp["textItalic"] = currentProjectNav["playerProfilePage-previewingTextObj-textItalic"];
        objTemp["textFontSize"] = currentProjectNav["playerProfilePage-previewingTextObj-textFontSize"];
        objTemp["textFont"]  = currentProjectNav["playerProfilePage-previewingTextObj-textFont"];
        objTemp["textColor"] = currentProjectNav["playerProfilePage-previewingTextObj-textColor"];

     } else if (objTemp.itemType === "value") {
        objTemp["labelText"] = currentProjectNav["playerProfilePage-previewingValueObj-labelText"];
        objTemp["valueItemType"] = currentProjectNav["playerProfilePage-previewingValueObj-valueItemType"];
        objTemp["valueItemName"] = currentProjectNav["playerProfilePage-previewingValueObj-valueItemName"];
        objTemp["textFontSize"] = currentProjectNav["playerProfilePage-previewingValueObj-textFontSize"];
        objTemp["textFont"] = currentProjectNav["playerProfilePage-previewingValueObj-textFont"];
        objTemp["textColor"] = currentProjectNav["playerProfilePage-previewingValueObj-textColor"];

     } else if (objTemp.itemType === "pic") {
        objTemp["picName"] = currentProjectNav["playerProfilePage-previewingPicObj-picName"];
        objTemp["width"] = currentProjectNav["playerProfilePage-previewingPicObj-width"];
        objTemp["height"] = currentProjectNav["playerProfilePage-previewingPicObj-height"];

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
      tempNav["playerProfilePage-previewingValueObj-labelText"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-labelText": event.target.value});
               
      updateNavObj(tempNav);   
    }

    function changePPTryingPicItemPosX(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj-posX"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj-posX": event.target.value});
               
      updateNavObj(tempNav);
    }

    function changePPTryingPicItemPosY(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj-posY"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj-posY": event.target.value});
               
      updateNavObj(tempNav);
    }

    function changePPTryingPicName(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj-picName"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj-picName": event.target.value});
               
      updateNavObj(tempNav);
    }

    function changePPTryingPicItemWidth(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj-width"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj-width": event.target.value});
               
      updateNavObj(tempNav);   
    }

    function changePPTryingPicItemHeight(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingPicObj-height"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj-height": event.target.value});
               
      updateNavObj(tempNav);   
    }

    function resetPPTryingPicItem() {
      let tempNav = currentProjectNav;

      tempNav["isPreviewing"] = false;
      tempNav["posX"] = 50;
      tempNav["posY"] = 50;
      tempNav["picName"] = "";
      tempNav["width"] = 200;
      tempNav["height"] = 200;

      setCurrentProjectNav({...currentProjectNav, 
          "isPreviewing": false,
          "posX": 50,
          "posY": 50,
          "picName": "",
          "width": 200,
          "height": 200,
      });

      updateNavObj(tempNav); //TODO12
    }

    function changePPTryingValueItemPosX(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-posX"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-posX": event.target.value});
               
      updateNavObj(tempNav);      
    }

    function changePPTryingValueItemPosY(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-posY"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-posY": event.target.value});
               
      updateNavObj(tempNav);      
    }

    function changePPTryingValueItemFontSize(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-textFontSize"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-textFontSize": event.target.value});
               
      updateNavObj(tempNav);      
    }

    function changePPTryingValueItemFont(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-textFont"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-textFont": event.target.value});
               
      updateNavObj(tempNav);      
    }

    function changePPTryingValueItemTextColor(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-textColor"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-textColor": event.target.value});
               
      updateNavObj(tempNav);     
    }

    function resetPPTryingValueItem() {

      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-isPreviewing"] = false;
      tempNav["playerProfilePage-previewingValueObj-labelText"] = "";
      tempNav["playerProfilePage-previewingValueObj-valueItemType"] = "Game Data";
      tempNav["playerProfilePage-previewingValueObj-valueItemName"] = "";
      tempNav["playerProfilePage-previewingValueObj-posX"] = 30;
      tempNav["playerProfilePage-previewingValueObj-posY"] = 70;
      tempNav["playerProfilePage-previewingValueObj-textFontSize"] = 12;
      tempNav["playerProfilePage-previewingValueObj-textFont"] = "serif";
      tempNav["playerProfilePage-previewingValueObj-textColor"] = "#000000";


      setCurrentProjectNav({...currentProjectNav, 
          "playerProfilePage-previewingValueObj-isPreviewing": false,
          "playerProfilePage-previewingValueObj-labelText": "",
          "playerProfilePage-previewingValueObj-valueItemType": "Game Data",
          "playerProfilePage-previewingValueObj-valueItemName": "",
          "playerProfilePage-previewingValueObj-posX": 30,
          "playerProfilePage-previewingValueObj-posY": 70,
          "playerProfilePage-previewingValueObj-textFontSize": 12,
          "playerProfilePage-previewingValueObj-textFont": "serif",
          "playerProfilePage-previewingValueObj-textColor": "#000000"
      });
      updateNavObj(tempNav);

    }

    function changePlayerProfilePageAddingValueType(val) {
      setPlayerProfilePageAddingValueType(val);

      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-valueItemType"] = val;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-valueItemType": val});
               
      updateNavObj(tempNav);  
    }
  
    function changePlayerProfilePageAddingValueName(event) {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-valueItemName"] = event.target.value;
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-valueItemName": event.target.value});
               
      updateNavObj(tempNav);  
    }

    function resetPlayerProfilePageAddingValueName() {
      let tempNav = currentProjectNav;
      tempNav["playerProfilePage-previewingValueObj-valueItemName"] = "";
      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-valueItemName": ""});
               
      updateNavObj(tempNav);  
    }



   return (
  <>{
   <div 
   className="guiSettings" 
   style={{
      "maxHeight": `${screenHeight-30}px`,
      "minHeight": `${screenHeight-30}px`

    }}>
        
      {(currentSettingPage !== "Main Page" && currentSettingPage !== "" 
      //&& currentSettingPage !== "G ame Progress Strategy"
      
      ) && 
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
                  }}>{rectangleAndColorFilledText}</label>
                      <div className="indentOne">
                        <input type="color" value={currentProjectNav["backButton-shapeColor"]} onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["backButton-shapeColor"] = event.target.value;
                            updateNavObj(tempObj);       

                            setCurrentProjectNav({...currentProjectNav, "backButton-shapeColor": event.target.value});    
                        }}></input>
                        <label>  </label>
                        <input value={currentProjectNav["backButton-shapeColor"]} onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["backButton-shapeColor"] = event.target.value;
                            updateNavObj(tempObj);       

                            setCurrentProjectNav({...currentProjectNav, "backButton-shapeColor": event.target.value});    
                        }}></input>
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
                          <option key="backButtonDefault" value="">-- {selectResourceText} --</option>
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

     {
       isSlSheetEditing === false
    //  (currentSettingPage !== "G ame Progress Strategy")
      && <div>
      <button
        onClick={()=>{
          getGameDataDesignFromOuterLayer();
          
          triggerUpdateCurrPageName("Main Page");
        }}
      >{reloadSetterText}</button><br></br>

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

        <label>{allButtonCornerRadiusText}:</label><br></br>
        <input type="range"
          min="0" max="50" step="1"
          value={currentProjectNav["defaultCornerRadius"]}
          onChange={(event)=>{
            let tempObj = currentProjectNav;
            tempObj["defaultCornerRadius"] = event.target.value;
            updateNavObj(tempObj);       
                      
            setCurrentProjectNav({...currentProjectNav, "defaultCornerRadius": event.target.value});  
          }}
        ></input>
        <label>{currentProjectNav["defaultCornerRadius"]} px</label>

      </div>

      <br></br>

      <label>{selectPageToSetupText}: </label>
      <select value={currentSettingPage}
        onChange={(event)=>{
          let pageOption = event.target.value;

          if (pageOption !== "Quit Asking Window" 
            && pageOption !== "SL Asking Window") {
            //actual page-changes
            setCurrentSettingPage(pageOption);
            triggerUpdateCurrPageName(pageOption);            
          } else {
            //pop-window on top of original page

            //TODO9999999999 if pop-window, don't change the page-name here or outer???

            notifyEditorPopWindowOpened(pageOption); //TODO79
          }

        }}>
          <option value="" key="defaultEmptyPage">-- {selectAPageName} --</option>
          {/* <option value="Game Progress Strategy" key="Game Progress Strategy">{gameProgressStrategyText}</option> */}
          <option value="Main Page" key="Main Page">{mainPageText}</option>
          <option value="Chapter Selection Page" key="Chapter Selection Page">{storyPageText}</option>
          <option value="Settings Page" key="Settings Page">{settingsPageText}</option>
          <option value="Player Profile Page" key="Player Profile Page">{playerProfilePageText}</option>
          <option value="Game Status Data Page" key="Game Status Data Page">{gameStatusDataPageText}</option>
          <option value="Shop Page" key="Shop Page">{shopPageText}</option>
          <option value="During Game" key="During Game">{duringGamePlayPageText}</option>
          <option value="Quit Asking Window" key="Quit Asking Window">Quit Window</option> 
          <option value="SL Asking Window" key="SL Asking Window" >Save/Load Confirm Window</option>
                                                                                      {/* //TODO20 */}

      </select>
       <br></br><br></br>
      
      </div>}
     
{currentSettingPage !== "During Game" &&      
    <>
      <button>{saveChangesText}</button>

<div style={{"border": "1px dotted #FFFFFF", "padding": "2px", "paddingTop": "7px", "paddingLeft": "5px"}}>    

    {
    // (currentSettingPage === "Game Progress Strategy") 
    isSlSheetEditing === true
    && <div>
     <label>Game Progress Strategy:</label>
       <div style={{"justifyContent": "center"}}>

                              {/* <input type="radio" checked={!progressWithSLinput} value={progressWithSLinput} 
                                onChange={()=>{
                                  setProgressWithSLinput(false)
                                  }}></input>
                              <label onClick={()=>{                   
                                      setProgressWithSLinput(false)
                                  }}>Without SaveLoad System</label>

                              <br></br> */}

                              {/* <input type="radio" checked={progressWithSLinput} value={progressWithSLinput} 
                                onChange={()=>{
                                  setProgressWithSLinput(true);
                                  }}></input>
                              <label onClick={()=>{
                                  setProgressWithSLinput(true);
                            }}>SaveLoad System</label>     */}

                            {/* <br></br>
                            <button
                              onClick={()=>{
                                let tempObj = currentProjectNav;
                                tempObj["isWithSL"] = progressWithSLinput;
                                updateNavObj(tempObj);       
                                
                                setCurrentProjectNav({...currentProjectNav, "isWithSL": progressWithSLinput});
                              }}
                            >{updateText}</button>
                             */}


            <br></br>
            
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
                        }}>{rectangleAndColorFilledText} </label>
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
                                        <label>  </label>
                                    <input
                                    onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["saveloadPage-bgShadeName"] = event.target.value;
                                      updateNavObj(tempObj);       
                                      
                                      setCurrentProjectNav({...currentProjectNav, "saveloadPage-bgShadeName": event.target.value});    
                                        }}></input>                                        
                                </div>}
                            
                        <br></br><input type="radio"
                          value={currentProjectNav["saveloadPage-isBackgroundShape"]}
                          checked={!currentProjectNav["saveloadPage-isBackgroundShape"]}
                          onChange={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-isBackgroundShape"] = false;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-isBackgroundShape": false});   
                        }}></input><label onClick={()=>{
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
                                    <option key="mpliDefault" value="">-- {selectResourceText} --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "sl-bg-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>

                  <label>{listItemSettingsText}:</label>
                    <div className="indentOne">
                     {/* <input 
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
                     <br></br> */}
                     <label>Slot per page: </label>
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
                      <label>Number of Pages: </label>
                      <input type="number" min="1" max="10" step="1" value={currentProjectNav["saveloadPage-slotPageCount"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotPageCount"] = event.target.value;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotPageCount": event.target.value});
                        }}
                      ></input>
                    
                    </div>
               
              
                        <br></br>
                <label>{listItemLookingText}:</label>
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
                                }}>{rectangleAndColorFilledText} </label>
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
                                    <label>  </label>
                                    <input
                                    onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["saveloadPage-slotShadeName"] = event.target.value;
                                      updateNavObj(tempObj);       
                                      
                                      setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotShadeName": event.target.value});                         
                                      
                                    }}></input>                                    
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
                                    <option key="mpliDefault" value="">-- {selectResourceText} --</option>
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
                <label>{itemGapText}:</label>
                 
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
                
                    <div className="indentOne">
                        <label>{positionXText}:</label>
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
                        <label>{positionYText}:</label>
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
                        }}>{rectangleAndColorFilledText} </label>
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
                                      <label>  </label>
                                    <input
                                      value={currentProjectNav["mainPage-bgShadeName"]}
                                      onChange={(event)=>{
                                        let tempObj = currentProjectNav;
                                        tempObj["mainPage-bgShadeName"] = event.target.value;
                                        updateNavObj(tempObj);
                                        //TODO test

                                        setCurrentProjectNav({...currentProjectNav, "mainPage-bgShadeName": event.target.value});               
                                        
                                        }}></input>
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
                                    <option key="mpliDefault" value="">-- {selectResourceText} --</option>
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

                  setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGap": event.target.value});
                  }}                  
                ></input>
               <input type="number" 
                value={currentProjectNav["mainPage-listItemGap"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-listItemGap"] = event.target.value;
                  updateNavObj(tempObj);                  

                  setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGap": event.target.value});
                  }}  
                ></input>
                <br></br>
                <label>Item Corner Radius</label>
                <input
                  type="range"
                  min="0" max="50" step="1"
                  value={currentProjectNav["mainPage-listItemGroupCornerRadius"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupCornerRadius"] = event.target.value;
                    updateNavObj(tempObj);                  

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupCornerRadius": event.target.value});             
                  }}
                ></input>
                <input
                  min="0" max="50" step="1"
                  value={currentProjectNav["mainPage-listItemGroupCornerRadius"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupCornerRadius"] = event.target.value;
                    updateNavObj(tempObj);                  

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupCornerRadius": event.target.value});             
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
  
                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupFontColor": event.target.value});             
                            
                  }}
                 ></input>
                 <label>  </label>
                 <input
                  value={currentProjectNav["mainPage-listItemGroupFontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupFontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
  
                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupFontColor": event.target.value});             
                            
                  }}
                 ></input>
               <br></br>
                {fontSizeText}:
                <input type="range"
                  min="5" max="32" step="1"
                  value={currentProjectNav["mainPage-listItemGroupFontSize"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemGroupFontSize"] = event.target.value;
                    updateNavObj(tempObj);                  

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

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemGroupFontSize": event.target.value});             
                  }}
               ></input>  

                <br></br>

           

                <label>Text Font</label>
                <select
                  value={currentProjectNav["mainPage-listItemTextFont"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-listItemTextFont"] = event.target.value;
                    updateNavObj(tempObj);                  

                    setCurrentProjectNav({...currentProjectNav, "mainPage-listItemTextFont": event.target.value});             
                  }}
                >
                  <option value="serif" key="mainPageItem_serif">serif</option>
                  <option value="sans-serif" key="mainPageItem_sans-serif">sans-serif</option>
                  <option value="cursive" key="mainPageItem_cursive">cursive</option>
  
{/* //TODO29 */}
                </select>

            <br></br>
            <label>Item Background</label><br></br>
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
                
              }}>{rectangleAndColorFilledText} </label>
              
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
                          <label>  </label>
                          <input
                          value={currentProjectNav["mainPage-listItemShadeName"]}
                          onChange={(event)=>{
                                let tempObj = currentProjectNav;
                                tempObj["mainPage-listItemShadeName"] = event.target.value;
                                updateNavObj(tempObj);                  
                                //TODO test
                
                                setCurrentProjectNav({...currentProjectNav, "mainPage-listItemShadeName": event.target.value});
                                
                              }}></input>

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
                          <option key="mpliDefault" value="">-- {selectResourceText} --</option>
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

         {/* //TODO999999999 for with-sl-mode: entry to "load game"? */}
         <div className="indentOne someGrey" style={{"color": "#000000"}}>
            <input type="checkbox" value={toggleIsPlayerProfile}
                checked={toggleIsPlayerProfile}
                onChange={()=>{
                  setToggleIsPlayerProfile(!toggleIsPlayerProfile);
                }}               
            ></input>
           <label className="textNoSelect"
                onClick={()=>{
                  setToggleIsPlayerProfile(!toggleIsPlayerProfile);
                }} 
           >{playerProfilePageText}{sEntryText}</label>
           <br></br>

           <input 
              type="checkbox" 
              value={toggleIsSetting}
              checked={toggleIsSetting}
              onChange={()=>{
                setToggleIsSetting(!toggleIsSetting);
              }}      
            ></input>
            <label className="textNoSelect"
                onClick={()=>{
                  setToggleIsSetting(!toggleIsSetting);
                }} 
            >{settingsPageText}{sEntryText}</label>
            <br></br>
            <input type="checkbox" value={toggleIsShop}
              checked={toggleIsShop}
              onChange={()=>{
                  setToggleIsShop(!toggleIsShop);
              }}                     
            ></input>
            <label className="textNoSelect"
              onClick={()=>{
                  setToggleIsShop(!toggleIsShop);
              }}     
            >{shopPageText}{sEntryText}</label>


            <br></br><br></br>
            <button
              onClick={()=>{
                  let tempObj = currentProjectNav;
                  tempObj["mainPage-playerProfile"] = toggleIsPlayerProfile;
                  tempObj["mainPage-setting"] = toggleIsSetting;
                  tempObj["mainPage-shop"] = toggleIsShop;
                  updateNavObj(tempObj);                  
                
                  
                  setCurrentProjectNav({...currentProjectNav, 
                    "mainPage-playerProfile": toggleIsPlayerProfile,
                    "mainPage-setting":  toggleIsSetting,
                    "mainPage-shop": toggleIsShop
                  });   

              }}
            >{updateListText}</button>
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
                 <label>  </label>
                 <input
                  value={currentProjectNav["mainPage-story-fontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-story-fontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test
  
                    setCurrentProjectNav({...currentProjectNav, "mainPage-story-fontColor": event.target.value});             
                            
                  }}
                 ></input>
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
                        
                  }}>{rectangleAndColorFilledText} </label>
                  
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
                          <label>  </label>
                          <input
                              value={currentProjectNav["mainPage-story-shadeName"]}
                              onChange={(event)=>{
                                let tempObj = currentProjectNav;
                                tempObj["mainPage-story-shadeName"] = event.target.value;
                                updateNavObj(tempObj);                  
                                //TODO test
            
                                setCurrentProjectNav({...currentProjectNav, "mainPage-story-shadeName": event.target.value});             
                                             
                                  }}></input>                                  
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
                              <option key="mpliDefault" value="">-- {selectResourceText} --</option>
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
                <label>  </label>  
                <input
                  value={currentProjectNav["mainPage-playerProfile-fontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-playerProfile-fontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-fontColor": event.target.value});             
                  }}                   
                ></input>

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
              {rectangleAndColorFilledText} </label>
              
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
                        <label>  </label>
                        <input
                          value={currentProjectNav["mainPage-playerProfile-shadeName"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-playerProfile-shadeName"] = event.target.value;
                          updateNavObj(tempObj);                  
                          //TODO test
    
                          setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile-shadeName": event.target.value});             
                                                   
                            }}></input>

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
                        <option key="mpliDefault" value="">-- {selectResourceText} --</option>
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
                <label>  </label>
                <input
                  value={currentProjectNav["mainPage-setting-fontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-setting-fontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-setting-fontColor": event.target.value});             
                  }}
                 ></input>
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
              }}>{rectangleAndColorFilledText} </label>
              
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
                        <label>  </label>
                        <input
                        value={currentProjectNav["mainPage-setting-shadeName"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["mainPage-setting-shadeName"] = event.target.value;
                          updateNavObj(tempObj);                  
                          //TODO test
    
                          setCurrentProjectNav({...currentProjectNav, "mainPage-setting-shadeName": event.target.value});                           
                            }}></input>                            
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
                        <option key="mpliDefault" value="">-- {selectResourceText} --</option>
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
                <label>  </label>
                <input
                  value={currentProjectNav["mainPage-shop-fontColor"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-shop-fontColor"] = event.target.value;
                    updateNavObj(tempObj);                  
                    //TODO test

                    setCurrentProjectNav({...currentProjectNav, "mainPage-shop-fontColor": event.target.value});             
                    }}  
                ></input>
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
              {rectangleAndColorFilledText} </label>
            
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
                        <label>  </label>
                        <input
                          value={currentProjectNav["mainPage-shop-shadeName"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["mainPage-shop-shadeName"] = event.target.value;
                            updateNavObj(tempObj);                  
                            //TODO test
        
                            setCurrentProjectNav({...currentProjectNav, "mainPage-shop-shadeName": event.target.value});                          
                            }}></input>

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
                        <option key="mpliDefault" value="">-- {selectResourceText} --</option>
                        {visualList.map((item, index) => {
                            let keyStr = "mainPage-li-" + index + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
            </div>}
               
           </div>} 

     </div>
    </div>}

    {currentSettingPage === "Chapter Selection Page" && <div>
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
                      
                        }}>{rectangleAndColorFilledText} </label>
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
                                    <label>  </label>
                                    <input
                                    value={currentProjectNav["storyPage-bgShadeName"]}
                                    onChange={(event)=>{
                                          let tempObj = currentProjectNav;
                                          tempObj["storyPage-bgShadeName"] = event.target.value;
                                          updateNavObj(tempObj);
                                          //TODO test
                
                                          setCurrentProjectNav({...currentProjectNav, "storyPage-bgShadeName": event.target.value});            
                                          
                                      }}></input>                                
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
                                    <option key="stryBgDefault" value="">-- {selectResourceText} --</option>

                                     {visualList.map((item, index) => {
                                        let keyStr = "storyPage-bg-pic" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}

                             </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>
       
           {chapterListText}:
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
              }}>{rectangleAndColorFilledText} </label>
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
                          <label>  </label>
                          <input
                          value={currentProjectNav["storyPage-listItemShadeName"]}
                          onChange={(event)=>{
                            let tempObj = currentProjectNav;
                            tempObj["storyPage-listItemShadeName"] = event.target.value;
                            updateNavObj(tempObj);
        
                            setCurrentProjectNav({...currentProjectNav, "storyPage-listItemShadeName": event.target.value}); 
                              }}></input> 
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
                          <option key="storyPage-li-Default" value="">-- {selectResourceText} --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "storyPage-li-" + index + item["var"];
                              return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                          })}
                   
                      </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
              </>}
              <label>{itemWidthText}: </label>
              <input type="range"
                max={screenWidth} min="1" step="1"
                value={currentProjectNav["storyPage-listItemGroupWidth"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupWidth"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupWidth": event.target.value});                  
                }}
              ></input>
              <input type="number"
                max={screenWidth} min="1" step="1"
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
                max={screenHeight} min="1" step="1"
                value={currentProjectNav["storyPage-listItemGroupHeight"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupHeight"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupHeight": event.target.value});                  
                }}
              ></input>
              <input type="number"
                max={screenHeight} min="1" step="1"
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
                max="100" min="1" step="1"
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
              <label>  </label>
              <input
                value={currentProjectNav["storyPage-listItemGroupFontColor"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["storyPage-listItemGroupFontColor"] = event.target.value;
                  updateNavObj(tempObj);
  
                  setCurrentProjectNav({...currentProjectNav, "storyPage-listItemGroupFontColor": event.target.value});                    
                }}
              ></input>               
              
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

     <label>{settingsPageText}</label>
     <div className="indentOne"><br></br>
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
      
                        }}>{rectangleAndColorFilledText} </label>
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
                                    <label>  </label>
                                    <input
                                    value={currentProjectNav["settingPage-bgShadeName"]}
                                    onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["settingPage-bgShadeName"] = event.target.value;
                                      updateNavObj(tempObj);                                      

                                      setCurrentProjectNav({...currentProjectNav, "settingPage-bgShadeName": event.target.value});

                                        }}></input>                                    
                                
                                
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
                                    <option key="mpliDefault" value="">-- {selectResourceText} --</option>
                                    {visualList.map((item, index) => {
                                        let keyStr = "settingsPage-bgpic-" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                   
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}
          
                  </div>
       

          <label>{listItemLookingText}:</label>
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
                        
                      }}>{rectangleAndColorFilledText} </label>
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
                          <label>  </label>
                          <input
                          onChange={(event)=>{
                                let tempObj = currentProjectNav;
                                tempObj["settingPage-listItemShadeName"] = event.target.value;
                                updateNavObj(tempObj);
                
                                setCurrentProjectNav({...currentProjectNav, "settingPage-listItemShadeName": event.target.value});
                
                            }}></input>                            
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
                          <option key="mpliDefault" value="">-- {selectResourceText} --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "settingsPage-li-" + index + item["var"];
                              return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                          })}
                
                      </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
              </>}

 
         </div>

         <label>{listDirectionText}: </label><br></br>             
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
                  min="0" max={screenWidth} step="1"
                  value={currentProjectNav["settingPage-listItemGroupX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupX"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupX": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
                  min="0" max={screenWidth} step="1"
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
               {groupsText}{widthText}:
               <input type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["settingPage-listItemGroupWidth"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupWidth"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupWidth": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["settingPage-listItemGroupWidth"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupWidth"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupWidth": event.target.value});
           
                  }}
                  ></input>
               <br></br>
               {itemHeightText}:
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
                    <label>  </label>
                    <input
                      value={currentProjectNav["settingPage-listItemFontColor"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-listItemFontColor"] = event.target.value;
                        updateNavObj(tempObj);   
    
                        setCurrentProjectNav({...currentProjectNav, "settingPage-listItemFontColor": event.target.value});   
                      }}
                    >
                    </input>                   <br></br>
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

                   <br></br>
                   <label>{sliderSText}{widthText}: </label>
                   <input type="range"
                      min="20" max="545" step="1"
                      value={currentProjectNav["settingPage-sliderWidth"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-sliderWidth"] = event.target.value;
                        updateNavObj(tempObj);   
    
                        setCurrentProjectNav({...currentProjectNav, "settingPage-sliderWidth": event.target.value});  
                      }}
                   
                   ></input>
                   <input type="number"
                      min="20" max="545" step="1"
                      value={currentProjectNav["settingPage-sliderWidth"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-sliderWidth"] = event.target.value;
                        updateNavObj(tempObj);   
    
                        setCurrentProjectNav({...currentProjectNav, "settingPage-sliderWidth": event.target.value});  
                      }}
                   ></input>

                   <br></br>
                   <label>{sliderSText}{colorText}: </label>
                   <input type="color"
                      min="20" max="545" step="1"
                      value={currentProjectNav["settingPage-sliderColor"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-sliderColor"] = event.target.value;
                        updateNavObj(tempObj);   
    
                        setCurrentProjectNav({...currentProjectNav, "settingPage-sliderColor": event.target.value});  
                      }}
                   ></input>
                   <label>  </label>
                   <input
                      min="20" max="545" step="1"
                      value={currentProjectNav["settingPage-sliderColor"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["settingPage-sliderColor"] = event.target.value;
                        updateNavObj(tempObj);   
    
                        setCurrentProjectNav({...currentProjectNav, "settingPage-sliderColor": event.target.value});  
                      }}
                   ></input>
                   {/* <br></br>
                   <label>Slider Thumb Looking:</label>
                   <div className="indentOne someGrey"
                   >
                     <label>Corner Radius: </label>
                     <input type="range"
                      min="0" max="50" step="1"
                      
                     ></input>
                     <label>

                     </label>
                     <br></br>

                        <input type="radio"
                            onChange={()=>{    
                                  
                            }}
                        ></input>
                        
                        
                        <label onClick={()=>{    
                                  
                        }}>{rectangleAndColorFilledText} </label>
                        {<div className="indentOne">
                            <input type="color"></input>
                            <label></label>
                        </div>}
                        


                          <br></br>
                          <input type="radio"
                              onChange={()=>{    
                                    
                              }}
                          ></input>
                          <label onClick={()=>{    
                                   
                          }}>{basePictureText} </label>
                            
                              {<>
                                <select 
                                  onChange={(event)=>{
                                    
                                  }}  
                                
                                
                                >                    
                                    <option key="mpliDefault" value="">-- {selectResourceText} --</option>
                                    {visualList.map((item, index) => {
                                        let keyStr = "setting-slider-thumb-li-" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select>
                                <button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                              </>}

                   </div> */}


                   {/* <br></br>
                   <label>Slider Track Looking:</label>
             
                      <div className="indentOne"
                    style={{"backgroundColor": "orange"}}
                   >
                        <input type="radio"
                            onChange={()=>{    
                                  
                            }}
                        ></input>
                        
                        
                        <label onClick={()=>{    
                                  
                        }}>{rectangleAndColorFilledText} </label>
                        {<div className="indentOne">
                            <input type="color"></input>
                            <label></label>
                        </div>}
                        


                          <br></br>
                          <input type="radio"
                              onChange={()=>{    
                                    
                              }}
                          ></input>
                          <label onClick={()=>{    
                                   
                          }}>{basePictureText} </label>
                            
                              {<>
                                <select 
                                  onChange={(event)=>{
                                    
                                  }}  
                                
                                
                                >                    
                                    <option key="mpliDefault" value="">-- {selectResourceText} --</option>
                                    {visualList.map((item, index) => {
                                        let keyStr = "setting-slider-track-li-" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select>
                                <button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                              </>}

                  




                   </div>

                */}
        
       
  
       <br></br><br></br>
       <label>{settingsPageText}{sItems}:</label>
       <div className="indentOne someGrey" style={{"color": "#000000"}}>
  
         <input type="checkbox"
           value={toggleIsSettingPlaySpeed}
           checked={toggleIsSettingPlaySpeed}
           onChange={()=>{
              setToggleIsSettingPlaySpeed(!toggleIsSettingPlaySpeed);
            }}
         ></input><label
            onClick={()=>{
              setToggleIsSettingPlaySpeed(!toggleIsSettingPlaySpeed);
            }}  
         >{playSpeedText}</label>
         <br></br>

         <input type="checkbox"
           value={toggleIsSettingBgmVol}
           checked={toggleIsSettingBgmVol}
           onChange={()=>{
              setToggleIsSettingBgmVol(!toggleIsSettingBgmVol);  

            }}                  
         ></input><label
            onClick={()=>{
              setToggleIsSettingBgmVol(!toggleIsSettingBgmVol);  

            }}      
         >{bgmVolumeText}</label>
         <br></br>

         <input type="checkbox"
           value={toggleIsSettingSeVol}
           checked={toggleIsSettingSeVol}
           onChange={()=>{
              setToggleIsSettingSeVol(!toggleIsSettingSeVol);

            }}                  
         ></input><label
            onClick={()=>{
              setToggleIsSettingSeVol(!toggleIsSettingSeVol);
            }}    
         >{soundEffectVolumeText}</label>

         <br></br><br></br>
         <button
          onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["settingPage-playSpeed"] = toggleIsSettingPlaySpeed;
              tempObj["settingPage-bgmVol"] = toggleIsSettingBgmVol;
              tempObj["settingPage-seVol"] = toggleIsSettingSeVol;
              updateNavObj(tempObj);                  


              setCurrentProjectNav({...currentProjectNav, 
                "settingPage-playSpeed": toggleIsSettingPlaySpeed,
                "settingPage-bgmVol": toggleIsSettingBgmVol,
                "settingPage-seVol": toggleIsSettingSeVol
              });  

          }}
         >{updateListText}</button>

       </div>
       
       
       <div>

          {currentProjectNav["settingPage-playSpeed"] &&  <>
            <label>{playSpeedText}</label>
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
          </>}  

         {currentProjectNav["settingPage-bgmVol"] && <>
            <label>{bgmVolumeText}</label>
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
          </>}


          {currentProjectNav["settingPage-seVol"] && <>
            <label>{soundEffectVolumeText}</label>
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
          
          </>}


       </div>


     </div>
     </div>}


     {currentSettingPage === "Player Profile Page" && <div>
     <label>{playerProfilePageText}:</label>
             
    


       <br></br>
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
                        >{rectangleAndColorFilledText} </label>
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
                                    <label>  </label>
                                    <input
                                    value={currentProjectNav["playerProfilePage-bgShadeName"]}
                                    onChange={(event)=>{
                                          let tempObj = currentProjectNav;
                                          tempObj["playerProfilePage-bgShadeName"] = event.target.value;
                                          updateNavObj(tempObj);
                
                                          setCurrentProjectNav({...currentProjectNav, "playerProfilePage-bgShadeName": event.target.value});      
                                    }}></input>                  
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
                                    <option key="mpliDefault" value="">-- {selectResourceText} --</option>
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
                          {/* <button
                            onClick={()=>{
                              //TODO highlight this item on previewer ??

                              //TODO notify caller-layer...
                              console.log("selected...", item);
                              let itemTemp = item;
                              itemTemp["selected"] = !itemTemp["selected"];
                              editItemTable(index, itemTemp);
                            }}
                          >{item["selected"] === true ? "unselect" : "select"}</button> */}
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
                tempNav["playerProfilePage-previewingTextObj-isPreviewing"] = !playerProfilePageIsAddingText;
                setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingTextObj-isPreviewing": !playerProfilePageIsAddingText});         
                updateNavObj(tempNav);
            

           }}>{playerProfilePageIsAddingText ? "︽" : "︾" } Add Text</button>
           {playerProfilePageIsAddingText && <>
           <br></br>
           <div className="indentOne" style={{"backgroundColor": "#98C1D9", "padding": "5px", "borderRadius": "0px", "margin": "3px", "color": "#000000"}}>
             <label>Text Content: </label>
             
             <input 
              value={currentProjectNav["playerProfilePage-previewingTextObj-textContent"]}
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
             >{italicText}</label><br></br>

             <label>{fontSizeText}: </label>
             <input type="range" min="5" max="90" step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj-textFontSize"]}
              onChange={(event)=>{
                changePPTryingTextItemFontSize(event);
              }}
             ></input>
             <label>{currentProjectNav["playerProfilePage-previewingTextObj-textFontSize"]
}</label>
             <br></br>
             <label>{fontNameText}: </label>
                <select 
                  value={currentProjectNav["playerProfilePage-previewingTextObj-textFont"]}
                  onChange={(event)=>{
                    changePPTryingTextItemFontFamily(event);
                  }}
                
                >
                  <option value="serif" key="toAddPPpageTextContent_serif">serif</option>
                  <option value="sans-serif" key="toAddPPpageTextContent_sans-serif">sans-serif</option>
                  <option value="cursive" key="toAddPPpageTextContent_cursive">cursive</option>
  
                </select><br></br>
             <label>{fontColorText}: </label>
             <input type="color"
              value={currentProjectNav["playerProfilePage-previewingTextObj-textColor"]}
              onChange={(event)=>{
                changePPTryingTextItemTextColor(event);
              }}
             
             ></input>
             <label>  </label>
             <input
              value={currentProjectNav["playerProfilePage-previewingTextObj-textColor"]}
              onChange={(event)=>{
                changePPTryingTextItemTextColor(event);
              }}
             
             ></input>             
             <br></br>
             <label>{positionXText}: </label>
             <input type="range" min="1" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj-posX"]}
              onChange={(event)=>{
                changePPTryingTextItemPosX(event);
              }}
             ></input>
             <input min="1" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj-posX"]}
              onChange={(event)=>{
                changePPTryingTextItemPosX(event);
              }}
             ></input>
             
             <br></br>
             <label>{positionYText}: </label>
             <input type="range" min="1" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj-posY"]}
              onChange={(event)=>{
                changePPTryingTextItemPosY(event);
              }}
             ></input>
             <input min="1" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingTextObj-posY"]}
              onChange={(event)=>{
                changePPTryingTextItemPosY(event);
              }}
             ></input>
             <br></br><br></br>
             <button
              onClick={()=>{
                if (currentProjectNav["playerProfilePage-previewingTextObj-textContent"].length === 0) {
                  alert("Cannot add empty text content.");
                  return;
                }
                let itemName = "text-" + currentProjectNav["playerProfilePage-previewingTextObj-textContent"];
                let itemType = "text";
                let x = currentProjectNav["playerProfilePage-previewingTextObj-posX"];
                let y = currentProjectNav["playerProfilePage-previewingTextObj-posY"];
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
              tempNav["playerProfilePage-previewingValueObj-isPreviewing"] = !playerProfilePageIsAddingValue;
              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingValueObj-isPreviewing": !playerProfilePageIsAddingValue});         
              updateNavObj(tempNav);

            }}
           >{playerProfilePageIsAddingValue ? "︽" : "︾" } Add Value Display</button><br></br> 
           {playerProfilePageIsAddingValue && <div style={{"backgroundColor": "#98C1D9", "padding": "5px", "borderRadius": "0px", "margin": "3px", "color": "#000000"}}>
           
           
           
             <label>{labelTextText}: </label>
             <input
              value={currentProjectNav["playerProfilePage-previewingValueObj-labelText"]}
              onChange={(event)=>{
                changePPTryingValueItemLabelText(event);
              }}
             ></input>
             <br></br>                       
             <label>{valueItemText}: </label>

                <div className="indentOne">
                  <select value={playerProfilePageAddingValueType}
                    onChange={(event)=>{
                      changePlayerProfilePageAddingValueType(event.target.value);
                    }}
                  >
                    <option key="ppSetting-value-type-defaultNone" value="">-- {selectDataItemCategoryText} --</option>

                    <option key="ppSetting-value-type-gameData" value="Game Data">{gameDataText}</option>
                    <option key="ppSetting-value-type-playerProfileData" value="Player Profile">{playerProfileText}</option>
                    <option key="ppSetting-value-type-accountInfo" value="Player Account Info">{playerAccountInfoText}</option>
                  </select>

                  {/* actual data item names (according to type) */}
                  {playerProfilePageAddingValueType === "Game Data" && 
                      <>
                      <select 
                        value={currentProjectNav["playerProfilePage-previewingValueObj-valueItemName"]}
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
                          getGameDataDesignFromOuterLayer();
                          resetPlayerProfilePageAddingValueName();
                        }}
                      >Update Game Data</button>
                      </>
                  }
                  
                  {playerProfilePageAddingValueType === "Player Profile" && 
                      <>
                      <select 
                        value={currentProjectNav["playerProfilePage-previewingValueObj-valueItemName"]}
                        onChange={(event)=>{
                          changePlayerProfilePageAddingValueName(event);
                        }}
                      >
                        <option key="ppValue-playerProfile-option-defaultNone" value="">-- Select Player Profile Data Item --</option>
                        {Object.keys(intialEmuPlayerProfile).map((currKey) => {                     
                          let keyStr = "ppValue-playerProfile-option-" + currKey;
                          return (<option key={keyStr} value={currKey}>{currKey}</option>);
                        })}

                      </select>
                      {/* <button>

                      </button> */}
                      </>
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
              value={currentProjectNav["playerProfilePage-previewingValueObj-posX"]}
              onChange={(event)=>{
                changePPTryingValueItemPosX(event);
              }}
            ></input>  
            <input min="0" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj-posX"]}
              onChange={(event)=>{
                changePPTryingValueItemPosX(event);
              }}
            ></input>  
               
               <br></br>
             <label>{positionYText}: </label>
             <input type="range" min="0" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj-posY"]}
              onChange={(event)=>{
                changePPTryingValueItemPosY(event);
              }}
            ></input>  
             <input min="0" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj-posY"]}
              onChange={(event)=>{
                changePPTryingValueItemPosY(event);
              }}
            ></input>  
             <br></br>
             <label>{fontSizeText}: </label>
             <input type="range" min="1" max="50" step="1"
              value={currentProjectNav["playerProfilePage-previewingValueObj-textFontSize"]}
              onChange={(event)=>{
                changePPTryingValueItemFontSize(event);
              }}
             ></input>
             <label> {currentProjectNav["playerProfilePage-previewingValueObj-textFontSize"]}</label>
             
             <br></br>
             <label>{fontNameText}: </label><select
              value={currentProjectNav["playerProfilePage-previewingValueObj-textFont"]}
              onChange={(event)=>{
                changePPTryingValueItemFont(event);

              }}
             >
                  <option value="serif" key="toAddPPpageValue_serif">serif</option>
                  <option value="sans-serif" key="toAddPPpageValue_sans-serif">sans-serif</option>
                  <option value="cursive" key="toAddPPpageValue_cursive">cursive</option>
             </select><br></br>
             <label>{fontColorText}: </label>
             <input type="color"
              value={currentProjectNav["playerProfilePage-previewingValueObj-textColor"]}
              onChange={(event)=>{
                changePPTryingValueItemTextColor(event);

              }}
             ></input>
             <label>  </label>
             <input
              value={currentProjectNav["playerProfilePage-previewingValueObj-textColor"]}
              onChange={(event)=>{
                changePPTryingValueItemTextColor(event);

              }}
             ></input>           
             <br></br>                     

        
           
           <button
            onClick={()=>{
              let itemType = "value";


              if (currentProjectNav["playerProfilePage-previewingValueObj-valueItemType"].length === 0
                || currentProjectNav["playerProfilePage-previewingValueObj-valueItemName"].length === 0) {
                alert("Cannot add unclear value-item.");
                return;
              }
              let itemName = "value-" + currentProjectNav["playerProfilePage-previewingValueObj-labelText"]
                + "-"
                + currentProjectNav["playerProfilePage-previewingValueObj-valueItemType"]
                + "-"
                + currentProjectNav["playerProfilePage-previewingValueObj-valueItemName"];
              
          
              let x = currentProjectNav["playerProfilePage-previewingValueObj-posX"];
              let y = currentProjectNav["playerProfilePage-previewingValueObj-posY"];
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
              tempNav["playerProfilePage-previewingPicObj-isPreviewing"] = !playerProfilePageIsAddingPic;
              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-previewingPicObj-isPreviewing": !playerProfilePageIsAddingPic});         
              updateNavObj(tempNav);
            }}
           >{playerProfilePageIsAddingPic ? "︽" : "︾" } Add Picture</button>
           
           {playerProfilePageIsAddingPic && <div className="indentOne" style={{"backgroundColor": "#98C1D9", "padding": "5px", "borderRadius": "0px", "margin": "3px", "color": "#000000"}}>
             
             <label>{positionXText}: </label>
             <input type="range" min="0" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj-posX"]}
              onChange={(event)=>{
                changePPTryingPicItemPosX(event);
              }}
             ></input>
             <input min="0" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj-posX"]}
              onChange={(event)=>{
                changePPTryingPicItemPosX(event);
              }}
             ></input>
             
             <br></br>
             
             
             <label>{positionYText}: </label>
             <input type="range" min="0" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj-posY"]}
              onChange={(event)=>{
                changePPTryingPicItemPosY(event);
              }}
             ></input>             
             <input min="0" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj-posY"]}
              onChange={(event)=>{
                changePPTryingPicItemPosY(event);
              }}
             ></input>   
             <br></br>
                         
             <label>Picture: </label>


             <select onChange={(event)=>{
               changePPTryingPicName(event);
             }}
                value={currentProjectNav["playerProfilePage-previewingPicObj-picName"]}
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
              value={currentProjectNav["playerProfilePage-previewingPicObj-width"]}
              onChange={(event)=>{
                changePPTryingPicItemWidth(event);
              }}
             ></input>    
             <input min="1" max={screenWidth} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj-width"]}
              onChange={(event)=>{
                changePPTryingPicItemWidth(event);
              }}
             ></input>  
             
             <br></br>

             <label>{heightText}: </label>
             <input type="range" min="1" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj-height"]}
              onChange={(event)=>{
                changePPTryingPicItemHeight(event);
              }}
             ></input>  
             <input min="1" max={screenHeight} step="1"
              value={currentProjectNav["playerProfilePage-previewingPicObj-height"]}
              onChange={(event)=>{
                changePPTryingPicItemHeight(event);
              }}
             ></input>  
             <br></br>
             <br></br>
            
             
             <button
              onClick={()=>{
                  let itemType = "pic";

                  if (currentProjectNav["playerProfilePage-previewingPicObj-picName"].length === 0) {
                    alert("Cannot add empty picture option.");
                    return;
                  }
                  let itemName = "pic-" + currentProjectNav["playerProfilePage-previewingPicObj-picName"];
                  
                  let x = currentProjectNav["playerProfilePage-previewingPicObj-posX"];
                  let y = currentProjectNav["playerProfilePage-previewingPicObj-posY"];
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
           <div className="indentOne">

            <br></br>
            <div>Emulated User Data (for Test) Setting</div>
            <div className="indentOne someGrey" style={{"color": "#000000", "padding": "3px"}}>
                <label>Username: </label>
                <label>{emuPlayerInfo["playername"]}</label>
                <br></br>
                
                <label>User Title:</label>
                <label>  {emuPlayerInfo["userTitle"]}</label>
                <br></br>
                
                <label>Icon Name: </label>
                <label>  {emuPlayerInfo["iconPicName"]}</label>
                <br></br>

                <label>Level: </label>
                <label>  {emuPlayerInfo["level"]}</label>
                <br></br>

                <label>Membership: </label>
                <label>  {emuPlayerInfo["membership"]}</label>

                <br></br>
                <button 
                  onClick={()=>{
                    openEmuManager();
                  }}
                >Emu Manager</button>
            </div>
          
            <br></br>
            <br></br>
 
        <div className="someGrey">
           <input type="checkbox"
            value={ppNicknameDisplay}
            checked={ppNicknameDisplay}
            onChange={()=>{
                setPPNicknameDisplay(!ppNicknameDisplay);
            }}
           ></input> 
           <label
              className="textNoSelect cursor_pointer"
           >
                Display Nickname
           </label>
           <br></br>

           <input type="checkbox"
            value={ppIconDisplay}
            checked={ppIconDisplay}
            onChange={()=>{
                setPPIconDisplay(!ppIconDisplay);
            }}
           ></input> 
           <label
              className="textNoSelect cursor_pointer"
           >
                Display Icon
           </label>

           <br></br>
           <button
            onClick={()=>{
              //TODO2
              //setPPNicknameDisplay(); setPPIconDisplay();
              //ppNicknameDisplay         ppIconDisplay

              let tempNav = currentProjectNav;
              tempNav["playerProfilePage-playerProfileNickNameItem-adding"] = ppNicknameDisplay;
              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-adding": ppNicknameDisplay});         
              updateNavObj(tempNav);

              tempNav = currentProjectNav;
              tempNav["playerProfilePage-playerProfileIconPicItem-adding"] = ppIconDisplay;
              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-adding": ppIconDisplay});         


            }}
           >Update</button>

        </div>

    
          <label
              className="textNoSelect cursor_pointer"
          >
              Player Profile Nickname
          </label>
                <br></br>

                {currentProjectNav["playerProfilePage-playerProfileNickNameItem-adding"]&& 
                <label
                  onClick={()=>{
                    setPpNicknameAreaExpand(!ppNicknameAreaExpand);
                  }}
                > (Displaying)</label>}
                {!currentProjectNav["playerProfilePage-playerProfileNickNameItem-adding"]&& 
                <label> (Not Displaying)</label>}

                <br></br>

                {<div className="indentOne">
                    {currentProjectNav["playerProfilePage-playerProfileNickNameItem-adding"]&&<button
                      onClick={()=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-adding"] = false;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-adding": false});         
                        updateNavObj(tempNav); 
                      }}
                    >Hide Nickname</button>}
                    {!currentProjectNav["playerProfilePage-playerProfileNickNameItem-adding"]&&<button
                      onClick={()=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-adding"] = true;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-adding": true});         
                        updateNavObj(tempNav); 
                      }}
                    >Display Nickname</button>}

                    <br></br>
                    <label>Label (optional): </label>
                    <input
                      placeholder="Nickname"
                      value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-nicknameLabel"]}
                      onChange={(event)=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-nicknameLabel"] = event.target.value;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-nicknameLabel": event.target.value});         
                        updateNavObj(tempNav);   
                      }}
                      onClick={()=>{
                        if (currentProjectNav["playerProfilePage-playerProfileNickNameItem-nicknameLabel"] === "") {
                          let tempNav = currentProjectNav;
                          tempNav["playerProfilePage-playerProfileNickNameItem-nicknameLabel"] = "Nickname";
                          setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-nicknameLabel": "Nickname"});         
                          updateNavObj(tempNav);   
                        }
                      }}
                    ></input>
                    <br></br>
                    <label>{italicText}</label>
                      <input type="checkbox"
                        value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-textItalic"]}
                        onChange={()=>{
                          let tempNav = currentProjectNav;
                          let val = !tempNav["playerProfilePage-playerProfileNickNameItem-textItalic"];
                          tempNav["playerProfilePage-playerProfileNickNameItem-textItalic"] = val;
                          setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-textItalic": val});         
                          updateNavObj(tempNav);   
                        }}    
                      ></input>
                    <br></br>
                    <label>{fontSizeText}: </label>
                    <input type="range"
                        value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-textFontSize"]}
                        onChange={(event)=>{
                          let tempNav = currentProjectNav;
                          tempNav["playerProfilePage-playerProfileNickNameItem-textFontSize"] = event.target.value;
                          setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-textFontSize": event.target.value});         
                          updateNavObj(tempNav);   
                        }}  
                    ></input>
                    <label>{currentProjectNav["playerProfilePage-playerProfileNickNameItem-textFontSize"]}</label>
                    <br></br>
                    <label>{fontNameText}: </label>
                    <select
                      value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-textFont"]}
                      onChange={(event)=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-textFont"] = event.target.value;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-textFont": event.target.value});         
                        updateNavObj(tempNav);   
                      }}
                    >
                      <option value="serif" key="playerProfile_nickname_serif">serif</option>
                      <option value="sans-serif" key="playerProfile_nickname_sans-serif">sans-serif</option>
                      <option value="cursive" key="playerProfile_nickname_cursive">cursive</option>   
                    </select>
                    <br></br>
                    <label>{fontColorText}: </label>
                    <input type="color"
                      value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-textColor"]}
                      onChange={(event)=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-textColor"] = event.target.value;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-textColor": event.target.value});         
                        updateNavObj(tempNav);  
                      }}              
                    ></input>
                    <label>  </label>
                    <input
                      value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-textColor"]}
                      onChange={(event)=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-textColor"] = event.target.value;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-textColor": event.target.value});         
                        updateNavObj(tempNav);  
                      }}              
                    ></input>                  
                    <br></br>
                    <label>{positionXText}: </label>
                    <input
                      min="0" max={screenWidth} step="1"
                      type="range"
                      value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-posX"]}
                      onChange={(event)=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-posX"] = event.target.value;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-posX": event.target.value});         
                        updateNavObj(tempNav);  
                      }}
                    ></input>
                    <input
                      min="0" max={screenWidth} step="1"
                      value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-posX"]}
                      onChange={(event)=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-posX"] = event.target.value;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-posX": event.target.value});         
                        updateNavObj(tempNav);  
                      }}
                    ></input>
                    <br></br>
                    <label>{positionYText}: </label>
                    <input
                      min="0" max={screenHeight} step="1"
                      type="range"
                      value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-posY"]}
                      onChange={(event)=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-posY"] = event.target.value;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-posY": event.target.value});         
                        updateNavObj(tempNav);  
                      }}
                    ></input>
                    <input
                      min="0" max={screenHeight} step="1"
                      value={currentProjectNav["playerProfilePage-playerProfileNickNameItem-posY"]}
                      onChange={(event)=>{
                        let tempNav = currentProjectNav;
                        tempNav["playerProfilePage-playerProfileNickNameItem-posY"] = event.target.value;
                        setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem-posY": event.target.value});         
                        updateNavObj(tempNav);  
                      }}
                    ></input>

                </div>}
                



           <label
            className="textNoSelect cursor_pointer"
           >Player Profile Icon</label> 
           {currentProjectNav["playerProfilePage-playerProfileIconPicItem-adding"] &&
            <div className="indentOne">
                <label>{positionXText}: </label>
                <input type="range"
                  min="0" max={screenWidth} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-posX"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-posX": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-posX"]}
                ></input>
                <input
                    min="0" max={screenWidth} step="1"
                    onChange={(event)=>{
                      let tempNav = currentProjectNav;
                      tempNav["playerProfilePage-playerProfileIconPicItem-posX"] = event.target.value;
                      setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-posX": event.target.value});         
                      updateNavObj(tempNav);                       
                    }}
                    value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-posX"]}
                ></input>
                <br></br>
                <label>{positionYText}: </label>
                <input type="range"
                  min="0" max={screenHeight} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-posY"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-posY": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-posY"]}
                ></input>
                <input
                  min="0" max={screenHeight} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-posY"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-posY": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-posY"]}
                ></input>
                <br></br>
                <label>{widthText}: </label>
                <input type="range"
                  min="0" max={screenWidth} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-width"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-width": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-width"]}
                ></input>
                <input
                  min="0" max={screenWidth} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-width"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-width": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-width"]}
                ></input>
                <br></br>
                <label>{heightText}: </label>
                <input type="range"
                  min="0" max={screenHeight} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-height"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-height": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-height"]}
                ></input>
                <input
                  min="0" max={screenHeight} step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-height"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-height": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-height"]}
                ></input>
                <br></br>
                <label>Scale: </label>
                <input type="range"
                  min="1" max="5" step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-scale"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-scale": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-scale"]}
                ></input>
                <input
                  min="1" max="5" step="1"
                  onChange={(event)=>{
                    let tempNav = currentProjectNav;
                    tempNav["playerProfilePage-playerProfileIconPicItem-scale"] = event.target.value;
                    setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem-scale": event.target.value});         
                    updateNavObj(tempNav);                       
                  }}
                  value={currentProjectNav["playerProfilePage-playerProfileIconPicItem-scale"]}
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
                        }}>{rectangleAndColorFilledText} </label>
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
                                    <label>  </label>
                                    <input
                                    onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["gsdPage-bgShadeName"] = event.target.value;
                                      updateNavObj(tempObj); 
                        
                                      setCurrentProjectNav({...currentProjectNav, "gsdPage-bgShadeName": event.target.value});      
                                        }}></input>                                
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
                                    <option key="gsdPage-bgPicNameDefault" value="">-- {selectResourceText} --</option>
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
     <label>{shopPageText}:</label>
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
                        >{rectangleAndColorFilledText} </label>
                            {
                                <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                            let tempObj = currentProjectNav;
                                            tempObj["shopPage-bgShadeName"] = event.target.value;
                                            updateNavObj(tempObj); 
                    
                                            setCurrentProjectNav({...currentProjectNav, "shopPage-bgShadeName": event.target.value}); 
                                        }}></input>
                                    <label>  </label>
                                    <input
                                    onChange={(event)=>{
                                            let tempObj = currentProjectNav;
                                            tempObj["shopPage-bgShadeName"] = event.target.value;
                                            updateNavObj(tempObj); 
                    
                                            setCurrentProjectNav({...currentProjectNav, "shopPage-bgShadeName": event.target.value}); 
                                        }}></input>

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
                                    <option key="shop-bgp-Default" value="">-- {selectResourceText} --</option>
                          
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}

          
                  </div>
       

           <br></br>
           <label>{productItemListText}</label><br></br>
           <div className="indentOne">

                <br></br>
                <br></br><label>{listItemLookingText}: </label>
                <div className="indentOne">

                  <input type="radio" 
                        value={currentProjectNav["shopPage-listItem-isBackgroundShape"]}
                        checked={currentProjectNav["shopPage-listItem-isBackgroundShape"]}
                        onChange={()=>{    
                          let tempObj = currentProjectNav;
                          tempObj["shopPage-listItem-isBackgroundShape"] = true;
                          updateNavObj(tempObj); 
            
                          setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-isBackgroundShape": true});  
                          
                        }}></input><label onClick={()=>{    
                          let tempObj = currentProjectNav;
                          tempObj["shopPage-listItem-isBackgroundShape"] = true;
                          updateNavObj(tempObj); 
            
                          setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-isBackgroundShape": true});  
                          
                        }}
                        >{rectangleAndColorFilledText} </label>
                            {currentProjectNav["shopPage-listItem-isBackgroundShape"] && <div className="indentOne">
                                    <label>{backgroundColorText}: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                            let tempObj = currentProjectNav;
                                            tempObj["shopPage-listItem-bgShadeName"] = event.target.value;
                                            updateNavObj(tempObj); 
                    
                                            setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-bgShadeName": event.target.value}); 
                                        }}></input>
                                    <label>  </label>
                                    <input
                                    onChange={(event)=>{
                                            let tempObj = currentProjectNav;
                                            tempObj["shopPage-listItem-bgShadeName"] = event.target.value;
                                            updateNavObj(tempObj); 
                    
                                            setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-bgShadeName": event.target.value}); 
                                        }}></input>                                        
                            </div>}
                            
                        <br></br>
                        <input type="radio"
                          value={currentProjectNav["shopPage-listItem-isBackgroundShape"]}
                          checked={!currentProjectNav["shopPage-listItem-isBackgroundShape"]}
                          onChange={()=>{    
                            let tempObj = currentProjectNav;
                            tempObj["shopPage-listItem-isBackgroundShape"] = false;
                            updateNavObj(tempObj); 
              
                            setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-isBackgroundShape": false});  
                            
                          }}></input><label onClick={()=>{    
                            let tempObj = currentProjectNav;
                            tempObj["shopPage-listItem-isBackgroundShape"] = false;
                            updateNavObj(tempObj); 
              
                            setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-isBackgroundShape": false});  
                            
                          }}>{basePictureText} </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                  //TODO navObj["shopPage-listItem-bgPicName"]

                                }}>                    
                                    <option key="shop-list-item-bgp" value="">-- {selectResourceText} --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "shop-product-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select><button onClick={() => {openRm();}}>{manageResourceText}</button><br></br><br></br>
                        </>}


                </div>

                <label>{itemWidthText}</label>
                <input
                  type="range"
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["shopPage-listItem-width"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-width"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-width": event.target.value});  
                  }}
                ></input>
                <input
                  min="1" max={screenWidth} step="1"
                  value={currentProjectNav["shopPage-listItem-width"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-width"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-width": event.target.value});  
                  }}                
                ></input>
                <br></br>

                <label>{itemHeightText}</label>
                <input
                  type="range"
                  min="1" max={screenHeight} step="1"
                  value={currentProjectNav["shopPage-listItem-height"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-height"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-height": event.target.value});  
                  }}   
                ></input>
                <input
                 min="1" max={screenHeight} step="1"
                 value={currentProjectNav["shopPage-listItem-height"]}
                 onChange={(event)=>{
                   let tempObj = currentProjectNav;
                   tempObj["shopPage-listItem-height"] = event.target.value;
                   updateNavObj(tempObj); 
     
                   setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-height": event.target.value});  
                 }}                  
                ></input>
                <br></br>  

                    {/* <br></br>
                <label>Item Corner Radius </label>
                <input type="range"
                  min="0" max="50" step="1"
                  value={currentProjectNav["shopPage-listItem-cornerRadius"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-cornerRadius"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-cornerRadius": event.target.value});  
                  }}                 
                ></input>
                <input
                  min="0" max="50" step="1"
                  value={currentProjectNav["shopPage-listItem-cornerRadius"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-cornerRadius"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-cornerRadius": event.target.value});  
                  }} 
                ></input>      */}

                <label>{itemGapText} </label>
                <input type="range"
                 min="1" max="300" step="1"
                 value={currentProjectNav["shopPage-listItem-gap"]}
                 onChange={(event)=>{
                   let tempObj = currentProjectNav;
                   tempObj["shopPage-listItem-gap"] = event.target.value;
                   updateNavObj(tempObj); 
     
                   setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-gap": event.target.value});  
                 }}  
                ></input>
                <input
                  min="1" max="20" step="1"
                  value={currentProjectNav["shopPage-listItem-gap"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-gap"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-gap": event.target.value});  
                  }}  
                ></input>

                <br></br>
                <label>{groupPositionXText}</label>
                <input type="range"
                  min="0" max={screenWidth} step="1"
                  value={currentProjectNav["shopPage-listItem-groupX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-groupX"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-groupX": event.target.value});  
                  }}
                
                ></input>
                <input
                  min="0" max={screenWidth} step="1"
                  value={currentProjectNav["shopPage-listItem-groupX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-groupX"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-groupX": event.target.value});  
                    
                  }}
                ></input>
                <br></br>

                <label>{groupPositionYText}</label>
                <input type="range"
                  min="0" max={screenHeight} step="1"
                  value={currentProjectNav["shopPage-listItem-groupY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-groupY"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-groupY": event.target.value});  
                  }}
                
                ></input>
                <input
                  min="0" max={screenHeight} step="1"
                  value={currentProjectNav["shopPage-listItem-groupY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-listItem-groupY"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-groupY": event.target.value});  
                    
                  }}
                ></input>

           </div>

           <label>Buying Confirm Window</label>
           <div className="indentOne">
             <label>{widthText} </label>
             <input type="range"           
              min="1" max={screenWidth} step="1"
              value={currentProjectNav["shopPage-bConfWindow-width"]}
              onChange={(event)=>{
                let tempObj = currentProjectNav;
                tempObj["shopPage-bConfWindow-width"] = event.target.value;
                updateNavObj(tempObj); 
  
                setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-width": event.target.value});  
              }}
             ></input>
             <input
              min="1" max={screenWidth} step="1"
              value={currentProjectNav["shopPage-bConfWindow-width"]}
              onChange={(event)=>{
                let tempObj = currentProjectNav;
                tempObj["shopPage-bConfWindow-width"] = event.target.value;
                updateNavObj(tempObj); 
               
                setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-width": event.target.value});  
              }}
             ></input>
             <br></br>

             <label>{heightText} </label>
             <input type="range"
                min="1" max={screenHeight} step="1"
                value={currentProjectNav["shopPage-bConfWindow-height"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["shopPage-bConfWindow-height"] = event.target.value;
                  updateNavObj(tempObj); 
    
                  setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-height": event.target.value});  
                }}             
             ></input>
             <input
                min="1" max={screenHeight} step="1"
                value={currentProjectNav["shopPage-bConfWindow-height"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["shopPage-bConfWindow-height"] = event.target.value;
                  updateNavObj(tempObj); 
    
                  setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-height": event.target.value});  
                }}               
             ></input>
             <br></br>

             <label>{fontColorText} </label>
             <input type="color"
              value={currentProjectNav["shopPage-bConfWindow-textColor"]}
              onChange={(event)=>{
                let tempObj = currentProjectNav;
                tempObj["shopPage-bConfWindow-textColor"] = event.target.value;
                updateNavObj(tempObj); 
  
                setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-textColor": event.target.value});  
              }} 
             ></input>
             <label>  </label>
             <input
              value={currentProjectNav["shopPage-bConfWindow-textColor"]}
              onChange={(event)=>{
                let tempObj = currentProjectNav;
                tempObj["shopPage-bConfWindow-textColor"] = event.target.value;
                updateNavObj(tempObj); 
  
                setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-textColor": event.target.value});  
              }} 
             ></input>           
             
             <br></br>

             <label>{backgroundColorText} </label>
             <input type="color"
                value={currentProjectNav["shopPage-bConfWindow-bgColor"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["shopPage-bConfWindow-bgColor"] = event.target.value;
                  updateNavObj(tempObj); 
    
                  setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-bgColor": event.target.value});  
                }} 
             ></input>
             <label>  </label>
             <input
                value={currentProjectNav["shopPage-bConfWindow-bgColor"]}
                onChange={(event)=>{
                  let tempObj = currentProjectNav;
                  tempObj["shopPage-bConfWindow-bgColor"] = event.target.value;
                  updateNavObj(tempObj); 
    
                  setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-bgColor": event.target.value});  
                }} 
             ></input>
             <br></br>

             <label>Window Corner Radius </label>
             <input type="range"
                  min="0" max="50" step="1"
                  value={currentProjectNav["shopPage-bConfWindow-cornerRadius"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-bConfWindow-cornerRadius"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-cornerRadius": event.target.value});  
                  }} 
             ></input>
             <input
                  min="0" max="50" step="1"
                  value={currentProjectNav["shopPage-bConfWindow-cornerRadius"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["shopPage-bConfWindow-cornerRadius"] = event.target.value;
                    updateNavObj(tempObj); 
      
                    setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-cornerRadius": event.target.value});  
                  }} 
             ></input>

             <br></br>
             <label>Buy Text Display </label>

             <input      
              value={shopPageBuyInput}
              onChange={(event)=>{
                setShopPageBuyInput(event.target.value);
              }}
             ></input>
             <button
              onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["shopPage-listItem-buyText"] = shopPageBuyInput;
                updateNavObj(tempObj); 
  
                setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-buyText": shopPageBuyInput});  
              }} 
             >{updateText}</button>


             <br></br>
             <label>Cancelling Text Display </label>
             <input
              value={shopPageCancelInput}
              onChange={(event)=>{
                setShopPageCancelInput(event.target.value);
              }}
             ></input>             
             <button
              onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["shopPage-bConfWindow-cancelText"] = shopPageCancelInput;
                updateNavObj(tempObj); 
  
                setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-cancelText": shopPageCancelInput});  
              }}              
             >{updateText}</button>  

             <br></br>  
             <label>Info Text Display </label>
             <input
              value={shopPageInfoInput}
              onChange={(event)=>{
                setShopPageInfoInput(event.target.value);
              }}
             ></input>             
             <button
              onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["shopPage-listItem-infoText"] = shopPageInfoInput;
                updateNavObj(tempObj); 
  
                setCurrentProjectNav({...currentProjectNav, "shopPage-listItem-infoText": shopPageInfoInput});  
              }}              
             >{updateText}</button>  


             <br></br>
             <label>Confirm Text Display </label>
             <input
              value={shopPageConfirmInput}
              onChange={(event)=>{
                setShopPageConfirmInput(event.target.value);
              }}
             ></input>             
             <button
              onClick={()=>{
                let tempObj = currentProjectNav;
                tempObj["shopPage-bConfWindow-confirmText"] = shopPageConfirmInput;
                updateNavObj(tempObj); 
  
                setCurrentProjectNav({...currentProjectNav, "shopPage-bConfWindow-confirmText": shopPageConfirmInput});  
              }}              
             >{updateText}</button>  



           </div>

       </div>
       </div>}

       {/* //TODO79 */}
      {currentSettingPage === "Quit Asking Window" && 
      <>
 
      </>}


    <br></br>


</div>



    <button>{saveChangesText}</button>
    </>}

{currentSettingPage === "During Game" && 
<div>

    {popWindowName === "" && 
    <>
    (Navigation displaying only.<br></br>
    Setup node UI in specific node-editors.)
    </>}

    
    {/* if pop-window is "gameQuitAsking", //TODO adjust later */}
    {popWindowName === "gameQuitAsking" && 
    <div>
            <label>Question Content</label>
            <div className="indentOne">
                <textarea
                  value={qWindowContentText}
                  onChange={(event)=>{
                    setQwindowContentText(event.target.value);
                  }}
                >
                  {currentProjectNav["outWindow-askContent"]}
                </textarea>
                <button
                  onClick={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["outWindow-askContent"] = qWindowContentText;
                    updateNavObj(tempObj); 
        
                    setCurrentProjectNav({...currentProjectNav, "outWindow-width": qWindowContentText});  
                  }}
                >{updateText}</button>
            </div>
    
            <label> {widthText}</label>
            <input type="range"
              max={screenWidth} min="1" step="1"
              value={currentProjectNav["outWindow-width"]}
              onChange={(event)=>{
                let tempObj = currentProjectNav;
                tempObj["outWindow-width"] = event.target.value;
                updateNavObj(tempObj); 
    
                setCurrentProjectNav({...currentProjectNav, "outWindow-width": event.target.value});  
              }}
            ></input>
            <input
              max={screenWidth} min="1" step="1"
              value={currentProjectNav["outWindow-width"]}
              onChange={(event)=>{
                let tempObj = currentProjectNav;
                tempObj["outWindow-width"] = event.target.value;
                updateNavObj(tempObj); 
    
                setCurrentProjectNav({...currentProjectNav, "outWindow-width": event.target.value});  
              }}
            ></input>        
            <br></br>
            <label> {heightText}</label>
            <input type="range"
              max={screenHeight} min="1" step="1"
              value={currentProjectNav["outWindow-height"]}
              onChange={(event)=>{
                let tempObj = currentProjectNav;
                tempObj["outWindow-height"] = event.target.value;
                updateNavObj(tempObj); 
    
                setCurrentProjectNav({...currentProjectNav, "outWindow-height": event.target.value});  
              }} 
            ></input>
            <input
              max={screenHeight} min="1" step="1"
              value={currentProjectNav["outWindow-height"]}
              onChange={(event)=>{
                let tempObj = currentProjectNav;
                tempObj["outWindow-height"] = event.target.value;
                updateNavObj(tempObj); 
    
                setCurrentProjectNav({...currentProjectNav, "outWindow-height": event.target.value});  
              }} 
            ></input>    
            <br></br>
            <label>Window Button</label>
                <div className="indentOne">
                  <label>Button Corner Radius</label>
                  <input type="range"
                    value={currentProjectNav["outWindow-Btn-cornerRadius"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["outWindow-Btn-cornerRadius"] = event.target.value;
                      updateNavObj(tempObj); 
          
                      setCurrentProjectNav({...currentProjectNav, "outWindow-Btn-cornerRadius": event.target.value});  
                    }} 
                  ></input>
                  <label> {currentProjectNav["outWindow-Btn-cornerRadius"]}</label>
                  <br></br>
                  <label>Button Color </label>
                  <input type="color"
                      value={currentProjectNav["outWindow-Btn-color"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["outWindow-Btn-color"] = event.target.value;
                        updateNavObj(tempObj); 
            
                        setCurrentProjectNav({...currentProjectNav, "outWindow-Btn-color": event.target.value});  
                      }} 
                  ></input>
                  <label>  </label>
                  <input
                      value={currentProjectNav["outWindow-Btn-color"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["outWindow-Btn-color"] = event.target.value;
                        updateNavObj(tempObj); 
            
                        setCurrentProjectNav({...currentProjectNav, "outWindow-Btn-color": event.target.value});  
                      }} 
                  ></input>         
                  <br></br>
                  <label>Button Text Color </label>
                  <input type="color"
                      value={currentProjectNav["outWindow-Btn-textColor"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["outWindow-Btn-textColor"] = event.target.value;
                        updateNavObj(tempObj); 
            
                        setCurrentProjectNav({...currentProjectNav, "outWindow-Btn-textColor": event.target.value});  
                      }} 
                  ></input>
                  <label>  </label>
                  <input
                      value={currentProjectNav["outWindow-Btn-textColor"]}
                      onChange={(event)=>{
                        let tempObj = currentProjectNav;
                        tempObj["outWindow-Btn-textColor"] = event.target.value;
                        updateNavObj(tempObj); 
            
                        setCurrentProjectNav({...currentProjectNav, "outWindow-Btn-textColor": event.target.value});  
                      }} 
                  ></input>              
                  
                  <br></br>
                  <label>Confirming Button Text </label>
                  <input
                    value={qWindowConfirmBtnText}
                    onChange={(event)=>{
                      setQwindowConfirmBtnText(event.target.value);
                    }}
                  ></input>
                  
                  <button
                    onClick={()=>{
                      //qWindowConfirmBtnText
                      let tempObj = currentProjectNav;
                      tempObj["outWindow-Btn-confirmingText"] = qWindowConfirmBtnText;
                      updateNavObj(tempObj); 
          
                      setCurrentProjectNav({...currentProjectNav, "outWindow-Btn-confirmingText": qWindowConfirmBtnText});  
                    }}
                  >{updateText}</button><br></br>
                  
                  
                  <label>Cancelling Button Text </label>
                  <input
                    value={qWindowCancelBtnText}
                    onChange={(event)=>{
                      setQwindowCancelBtnText(event.target.value);
                    }}
                  ></input>
                  <button
                    onClick={()=>{
                        //qWindowCancelBtnText
                        let tempObj = currentProjectNav;
                        tempObj["outWindow-Btn-cancellingText"] = qWindowCancelBtnText;
                        updateNavObj(tempObj); 
            
                        setCurrentProjectNav({...currentProjectNav, "outWindow-Btn-cancellingText": qWindowCancelBtnText}); 
                    }}
                  >{updateText}</button>
    
                </div>
                {/* q-window button area */}
    
            <label>Window Corner Radius</label>
            <input type="range"
             min="0" max="20" step="1" 
             value={currentProjectNav["outWindow-windowCornerRadius"]}
             onChange={(event)=>{
               let tempObj = currentProjectNav;
               tempObj["outWindow-windowCornerRadius"] = event.target.value;
               updateNavObj(tempObj); 
    
               setCurrentProjectNav({...currentProjectNav, "outWindow-windowCornerRadius": event.target.value});  
             }} 
            ></input>
            <label> {currentProjectNav["outWindow-windowCornerRadius"]}</label>
            <br></br>
    
    
    
    
    
            {/* //TODO26 */}
          
            <label>Window, Horizontal: </label>
                  <div>
                      <input type="radio"
                        value={currentProjectNav["outWindow-horizontalCentred"]}
                        checked={currentProjectNav["outWindow-horizontalCentred"]}
                        onClick={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["outWindow-horizontalCentred"] = true;
                          updateNavObj(tempObj); 
              
                          setCurrentProjectNav({...currentProjectNav, "outWindow-horizontalCentred": true}); 
                        }}
                      ></input><label
                        onClick={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["outWindow-horizontalCentred"] = true;
                          updateNavObj(tempObj); 
              
                          setCurrentProjectNav({...currentProjectNav, "outWindow-horizontalCentred": true}); 
                        }}
                      >Horizontally Centred</label><br></br>
                      
                      <input type="radio"
                          value={currentProjectNav["outWindow-horizontalCentred"]}
                          checked={!currentProjectNav["outWindow-horizontalCentred"]}
                          onClick={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["outWindow-horizontalCentred"] = false;
                            updateNavObj(tempObj); 
                
                            setCurrentProjectNav({...currentProjectNav, "outWindow-horizontalCentred": false}); 
                          }}
                      ></input>
                      <label
                        onClick={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["outWindow-horizontalCentred"] = false;
                          updateNavObj(tempObj); 
              
                          setCurrentProjectNav({...currentProjectNav, "outWindow-horizontalCentred": false}); 
                      }}
                      >Customized Position X </label><br></br>
                      {currentProjectNav["outWindow-horizontalCentred"] === false
                      && <div className="indentOne">
                                <input type="range"
                                  min="0" max={screenWidth} step="1"
                                  value={currentProjectNav["outWindow-posX"]}
                                  onChange={(event)=>{
                                    let tempObj = currentProjectNav;
                                    tempObj["outWindow-posX"] = event.target.value;
                                    updateNavObj(tempObj); 
                        
                                    setCurrentProjectNav({...currentProjectNav, "outWindow-posX": event.target.value}); 
                                  }}
                                ></input>
                                <input
                                  min="0" max={screenWidth} step="1"
                                  value={currentProjectNav["outWindow-posX"]}
                                  onChange={(event)=>{
                                    let tempObj = currentProjectNav;
                                    tempObj["outWindow-posX"] = event.target.value;
                                    updateNavObj(tempObj); 
                        
                                    setCurrentProjectNav({...currentProjectNav, "outWindow-posX": event.target.value}); 
                                  }}
                                ></input>
                        </div>}
    
                  </div>
    
    
    
    
                  <label>Window, Vertical: </label>
                  <div>
                      <input type="radio"
                        value={currentProjectNav["outWindow-verticalCentred"]}
                        checked={currentProjectNav["outWindow-verticalCentred"]}
                        onClick={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["outWindow-verticalCentred"] = true;
                          updateNavObj(tempObj); 
              
                          setCurrentProjectNav({...currentProjectNav, "outWindow-verticalCentred": true}); 
                        }}
                      ></input><label
                        onClick={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["outWindow-verticalCentred"] = true;
                          updateNavObj(tempObj); 
              
                          setCurrentProjectNav({...currentProjectNav, "outWindow-verticalCentred": true}); 
                        }}
                      >Vertically Centred</label><br></br>
                      
                      <input type="radio"
                          value={currentProjectNav["outWindow-verticalCentred"]}
                          checked={!currentProjectNav["outWindow-verticalCentred"]}
                          onClick={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["outWindow-verticalCentred"] = false;
                            updateNavObj(tempObj); 
                
                            setCurrentProjectNav({...currentProjectNav, "outWindow-verticalCentred": false}); 
                          }}
                      ></input>
                      <label
                        onClick={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["outWindow-verticalCentred"] = false;
                          updateNavObj(tempObj); 
              
                          setCurrentProjectNav({...currentProjectNav, "outWindow-verticalCentred": false}); 
                      }}
                      >Customized Position Y </label><br></br>
                      {currentProjectNav["outWindow-verticalCentred"] === false
                      && <div className="indentOne">
                               <input type="range"
                                  min="0" max={screenHeight} step="1"
                                  value={currentProjectNav["outWindow-posY"]}
                                  onChange={(event)=>{
                                    let tempObj = currentProjectNav;
                                    tempObj["outWindow-posY"] = event.target.value;
                                    updateNavObj(tempObj); 
                        
                                    setCurrentProjectNav({...currentProjectNav, "outWindow-posY": event.target.value}); 
                                  }}
                                ></input>
                                <input
                                  min="0" max={screenHeight} step="1"
                                  value={currentProjectNav["outWindow-posY"]}
                                  onChange={(event)=>{
                                    let tempObj = currentProjectNav;
                                    tempObj["outWindow-posY"] = event.target.value;
                                    updateNavObj(tempObj); 
                        
                                    setCurrentProjectNav({...currentProjectNav, "outWindow-posY": event.target.value}); 
                                  }}
                                ></input>
                        </div>}
    
                  </div>
    
    
    
            <br></br>
            <label>Window Looking</label>
            <div className="indentOne">
                  <input type="radio"
                    value={currentProjectNav["outWindow-isShape"]}
                    checked={currentProjectNav["outWindow-isShape"]}
                    onChange={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["outWindow-isShape"] = true;
                      updateNavObj(tempObj); 
           
                      setCurrentProjectNav({...currentProjectNav, "outWindow-isShape": true});  
                    }}
                  >
                  </input>
                  <label
                     onClick={()=>{
                      let tempObj = currentProjectNav;
                      tempObj["outWindow-isShape"] = true;
                      updateNavObj(tempObj); 
           
                      setCurrentProjectNav({...currentProjectNav, "outWindow-isShape": true});  
                    }}
                  > {rectangleAndColorFilledText}</label><br></br>
                  <input type="color"
                    value={currentProjectNav["outWindow-color"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["outWindow-color"] = event.target.value;
                      updateNavObj(tempObj); 
           
                      setCurrentProjectNav({...currentProjectNav, "outWindow-color": event.target.value});  
                    }}
                  ></input>
                  <label>  </label>
                  <input
                    value={currentProjectNav["outWindow-color"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["outWindow-color"] = event.target.value;
                      updateNavObj(tempObj); 
           
                      setCurrentProjectNav({...currentProjectNav, "outWindow-color": event.target.value});  
                    }}
                  ></input>
    
    
                  <br></br>
    
    
                  <input type="radio"
                      value={currentProjectNav["outWindow-isShape"]}
                      checked={!currentProjectNav["outWindow-isShape"]}
                      onChange={()=>{
                        let tempObj = currentProjectNav;
                        tempObj["outWindow-isShape"] = false;
                        updateNavObj(tempObj); 
            
                        setCurrentProjectNav({...currentProjectNav, "outWindow-isShape": false});  
                    }}
                  >
                  </input>
                  <label
                      onClick={()=>{
                        let tempObj = currentProjectNav;
                        tempObj["outWindow-isShape"] = false;
                        updateNavObj(tempObj); 
            
                        setCurrentProjectNav({...currentProjectNav, "outWindow-isShape": false});  
                      }}
                  > {basePictureText}</label><br></br>
                  <select
                    value={currentProjectNav["outWindow-picName"]}
                    onChange={(event)=>{
                      let tempObj = currentProjectNav;
                      tempObj["outWindow-picName"] = event.target.value;
                      updateNavObj(tempObj); 
          
                      setCurrentProjectNav({...currentProjectNav, "outWindow-picName": event.target.value});  
                    }}
                  >
                    <option>-- {selectResourceText} --</option>
                    {visualList.map((item, index) => {
                        let keyStr = "qwin-bgp-" + index + item["var"];
                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                    })}
                  </select>
            </div>
    
    
          </div>
         
    }
   
</div>}

 </div>


  }</>
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