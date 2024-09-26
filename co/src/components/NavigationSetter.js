import { useState, useEffect } from 'react';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';
import { getProjectGameDataVM } from '../viewmodels/GameDataViewModel';



export default function NavigationSetter({initialNavObj, 
  updateNavObj, openRm, 
  updateCurrentPageName, fetchPageName,
  initialScreenHeight, getScreenheight,
  userName,
  projName
}) {

    let languageCode = 0;
    let saveChangesText = ["Save Changes"];
    let updateText = ["Update"];
    let manageResourceText = ["Manage Resource"];
    let gameProgressStrategyText = ["Game Progress Strategy"];
    let mainPageText = ["Main Page"];
    let storyPageText = ["Story Page"];
    let settingsPageText = ["Settings Page"];
    let playerProfilePageText = ["Player Profile Page"]
    let gameStatusDataPageText = ["Game Status Data Page"];
    let shopPageText = ["Shop Page"];
    let duringGamePlayPageText = ["*During Game-play*"];

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
    const [gameDataDesignList, setGameData] = useState(-1);                    /* Important */



    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
      if (firstTimeEnter === true) {
            console.log("Navigation Setter -- "); //TODO test
            fetchProjResourceLists();
            getGameDataFromCloud();

            setFirstTimeEnter(false);
      }


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

      
      gDataMap = await getProjectGameDataVM(({projectName: projName, uname: userName, mostUpdated: isUpdated}));
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

    function addPPTryingTextItemNew() {
      //TODO add to the currentProjectNav["playerProfilePage-itemMap"]
      
      //TODO make setter's side update table


      //TODO reset the obj ...

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
        "valueItemType": "GameData",
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
             >{openBackButtonSettingArea === true ? "" : "︾"} General Back Button Settings </div>
             {openBackButtonSettingArea && <div className="indentOne">
                  <label>Width: </label>
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

                  <br></br><label>Height: </label>
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
                  <br></br><label>Button Looking: </label>
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
                  }}>Rectangle & Color Filled</label>
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
                  }}>Base Picture</label>
                      
                      <div className="indentOne">
                        <select value={currentProjectNav["backButton-picName"]} onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["backButton-picName"] = event.target.value;
                          updateNavObj(tempObj);       

                          setCurrentProjectNav({...currentProjectNav, "backButton-picName": event.target.value});  
 
                        }}>
                          <option key="backButtonDefault" value="">-- Select Resource --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "backButton-" + index + item["var"];
                                return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                              })}
                        </select>
                        <button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>

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
                    }}>{updateText[languageCode]}</button>
                  </div>
                  <label>Font Size:</label>
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
      
      {openBackButtonSettingArea && <br></br>}
      
      <div style={{"backgroundColor": "grey", "padding": "7px"}}>
        <label>Font for all UI in navigation system: </label>
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

      </div>

      <br></br>
      <label>Select a Page to setup: </label>
      <select value={currentSettingPage}
        onChange={(event)=>{
          setCurrentSettingPage(event.target.value);
          updateCurrentPageName(event.target.value);
        }}>
          <option value="" key="defaultEmptyPage">-- Select a Page Name --</option>
          <option value="Game Progress Strategy" key="Game Progress Strategy">{gameProgressStrategyText[languageCode]}</option>
          <option value="Main Page" key="Main Page">{mainPageText[languageCode]}</option>
          <option value="Story Page" key="Story Page">{storyPageText[languageCode]}</option>
          <option value="Settings Page" key="Settings Page">{settingsPageText[languageCode]}</option>
          <option value="Player Profile Page" key="Player Profile Page">{playerProfilePageText[languageCode]}</option>
          <option value="Game Status Data Page" key="Game Status Data Page">{gameStatusDataPageText[languageCode]}</option>
          <option value="Shop Page" key="Shop Page">{shopPageText[languageCode]}</option>
          <option value="During Game" key="During Game">{duringGamePlayPageText[languageCode]}</option>
      </select>

      <br></br><br></br>

      <button>{saveChangesText[languageCode]}</button>
    
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
   
              <label>Background of the entire page:</label><br></br>
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
                        }}>Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
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
                        }}>Base Picture </label>
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
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "sl-bg-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
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
                     >Horizontal</label>
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
                     >Vertical</label>         
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
                                }}>Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
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
                        }}>Base Picture </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                      let tempObj = currentProjectNav;
                                      tempObj["saveloadPage-slotPicName"] = event.target.value;
                                      updateNavObj(tempObj);       
                                      
                                      setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotPicName": event.target.value});                         
                                      
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "sl-slot-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
                        </>}

          
                  </div>
               
     
                <label>Slot Size:</label><br></br>
                  <div className="indentOne">
                      <label>Width:</label>
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
                      <label>Height:</label>
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
     <label>Main Page:</label>
     <div className="indentOne">
     <label>Background of the entire page:</label><br></br>
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
                        }}>Rectangle & Color Filled </label>
                            {currentProjectNav["mainPage-isBackgroundShape"] &&
                                <div className="indentOne">
                                    <label>Background Color: </label>
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
                            
                              }}>Base Picture </label><br></br>
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
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "mainPage-bg-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select>
                                <button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
                        </div>}

          
                  </div>

         <label>List item configuration: </label><br></br>
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
         >Fixed List (Grouped Items)</label>
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
               >Horizontal</label>
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
               >Vertical</label>
               <br></br>
               <label>Group Position X:</label>
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
               <label>Group Position Y:</label>
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
               <label>Item Width:</label>
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
               <label>Item Height:</label>
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
               <label>Item gap:</label>
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
                <label>Font Color:</label>
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
                Font Size:
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
                
              }}>Rectangle & Color Filled </label>
              
                  {currentProjectNav["mainPage-isListItemShape"] &&
                      <div className="indentOne">
                          <label>Background Color: </label>
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
                  
                    }}>Base Picture </label><br></br>
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
                          <option key="mpliDefault" value="">-- Select Resource --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "mainPage-li-" + index + item["var"];
                              return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                          })}
                      </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
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
         
         >Customized Items</label>

         <br></br>
         <br></br>
         <label>Main Page Items: </label>
         <br></br>
         <br></br><input type="checkbox"
           checked={true}
           readOnly
           onClick={()=>{alert("Story-option must be kept.");}}
         ></input>
         <label>Story Page Entry</label>
         <div className="indentOne">
           <label>Display Naming: </label>
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

           }}>{updateText[languageCode]}</button>

         </div>
         {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-story"]) && 
         <div className="indentOne">
           Position X:
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
           Position Y:
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
           Width:
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
           Height:
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
           Font Color:
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
           Font Size:
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
                        
                  }}>Rectangle & Color Filled </label>
                  
                      {
                          <div className="indentOne">
                              <label>Background Color: </label>
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
                          
                        }}>Base Picture </label><br></br>
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
                              <option key="mpliDefault" value="">-- Select Resource --</option>
                              {visualList.map((item, index) => {
                                  let keyStr = "mainPage-li-" + index + item["var"];
                                  return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                              })}
                          </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
                  </div>}

           </div>}
     
           <br></br><input type="checkbox" value={currentProjectNav["mainPage-playerProfile"]}
           checked={currentProjectNav["mainPage-playerProfile"]}
           onChange={()=>{
             let val = currentProjectNav["mainPage-playerProfile"];
             
             let tempObj = currentProjectNav;
             tempObj["mainPage-playerProfile"] = !val;
             updateNavObj(tempObj);              

             setCurrentProjectNav({...currentProjectNav, "mainPage-playerProfile": !val});
            }}               
         ></input>
           <label>Player Profile Page Entry</label>
         <div className="indentOne">
           <label>Display Naming: </label>
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

           }}>{updateText[languageCode]}</button>
         </div>
       {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-playerProfile"]) && <div className="indentOne">
           Position X:
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
           Position Y:
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
           Width:
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
           Height:
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
           Font Color:
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
           Font Size:
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
              Rectangle & Color Filled </label>
              
                {
                    <div className="indentOne">
                        <label>Background Color: </label>
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
                                
                  }}>Base Picture </label><br></br>
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
                        <option key="mpliDefault" value="">-- Select Resource --</option>
                        {visualList.map((item, index) => {
                            let keyStr = "mainPage-li-" + index + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
            </div>}

           </div>}             
         
         

         <br></br><input type="checkbox" value={currentProjectNav["mainPage-setting"]}
           checked={currentProjectNav["mainPage-setting"]}
           onChange={()=>{
             let val = currentProjectNav["mainPage-setting"];
             
             let tempObj = currentProjectNav;
             tempObj["mainPage-setting"] = !val;
             updateNavObj(tempObj);  

             setCurrentProjectNav({...currentProjectNav, "mainPage-setting": !val});
            }}      
         ></input>
         <label>Settings Page Entry</label>
         <div className="indentOne">
           <label>Display Naming: </label>
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

           }}>{updateText[languageCode]}</button>
         </div>
         {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-setting"]) && <div className="indentOne">
           Position X:
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
           Position Y:
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
           Width:
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
           Height:
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
           Font Color:
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
           Font Size:
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
              }}>Rectangle & Color Filled </label>
              
                {
                    <div className="indentOne">
                        <label>Background Color: </label>
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
                  }}>Base Picture </label><br></br>
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
                        <option key="mpliDefault" value="">-- Select Resource --</option>
                        {visualList.map((item, index) => {
                            let keyStr = "mainPage-li-" + index + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
            </div>}
 
           </div>}

         <br></br><input type="checkbox" value={currentProjectNav["mainPage-shop"]}
           checked={currentProjectNav["mainPage-shop"]}
           onChange={()=>{
             let val = currentProjectNav["mainPage-shop"];
            
             let tempObj = currentProjectNav;
             tempObj["mainPage-shop"] = !val;
             updateNavObj(tempObj);

             setCurrentProjectNav({...currentProjectNav, "mainPage-shop": !val});
            }}                     
         ></input>
         <label>Shop Page Entry</label>
         <div className="indentOne">
           <label>Display Naming: </label>
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

           }}>{updateText[languageCode]}</button>
         </div>
       {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-shop"]) && <div className="indentOne">
           Position X:
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
           Position Y:
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
           Width:
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
           Height:
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
           Font Color:
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
           Font Size:
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
              Rectangle & Color Filled </label>
            
                {
                    <div className="indentOne">
                        <label>Background Color: </label>
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
                  }}>Base Picture </label><br></br>
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
                        <option key="mpliDefault" value="">-- Select Resource --</option>
                        {visualList.map((item, index) => {
                            let keyStr = "mainPage-li-" + index + item["var"];
                            return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                        })}
                    </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
            </div>}
               
           </div>} 

     </div>
    </div>}

    {currentSettingPage === "Story Page" && <div>
     <label>Story Page:</label>
       <div className="indentOne">
       <label>Background of the entire page:</label><br></br>
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
                      
                        }}>Rectangle & Color Filled </label>
                           {/* Background of the entire page */}
                            {<div className="indentOne">
                                    <label>Background Color: </label>
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
                     {/* Background of the entire page */}
                        }}>Base Picture </label>
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
                                    <option key="stryBgDefault" value="">-- Select Resource --</option>

                                     {visualList.map((item, index) => {
                                        let keyStr = "storyPage-bg-pic" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}

                             </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
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
            >Horizontal</label>
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
           >Vertical</label>
           <br></br>

           <label>Chapter Title Looking:</label>
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
              }}>Rectangle & Color Filled </label>
                  {
                      <div className="indentOne">
                          <label>Background Color: </label>
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
                    }}>Base Picture </label>
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
                          <option key="storyPage-li-Default" value="">-- Select Resource --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "storyPage-li-" + index + item["var"];
                              return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                          })}
                   
                      </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
              </>}
              <label>Item Width: </label>
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
              <label>Item Height: </label>
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
              <label>Group X: </label>    
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
              <label>Group Y: </label>    
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
              <label>Item Gap: </label>  
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
              <label>Font Shade: </label>
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
              <label>Font Size:</label>
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
     <label>Background of the entire page:</label><br></br>
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
      
                        }}>Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
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
      
                              }}>Base Picture </label>
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
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                                    {visualList.map((item, index) => {
                                        let keyStr = "settingsPage-bgpic-" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                   
                                </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
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
                        
                      }}>Rectangle & Color Filled </label>
                  {
                      <div className="indentOne">
                          <label>Background Color: </label>
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
                        
                }}>Base Picture </label>
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
                          <option key="mpliDefault" value="">-- Select Resource --</option>
                          {visualList.map((item, index) => {
                              let keyStr = "settingsPage-li-" + index + item["var"];
                              return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                          })}
                
                      </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
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
               >Horizontal</label>
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
               >Vertical</label>
               <br></br>
               Group Position X:
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
               Group Position Y:
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
               Group Width:
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
               Group Height:
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
                  Item Gap: 
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
                  Font Color:
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
               Font Size:
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
            <label>Display Naming:</label>
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
            }}>{updateText[languageCode]}</button>
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
            <label>Display Naming:</label>
            <input value={settingsPageBgmVolName}
            onChange={(event)=>{
              setSettingsPageBgmVolName(event.target.value);
            }}></input>
            <button onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["settingPage-bgmVolName"] = settingsPageBgmVolName;
              updateNavObj(tempObj);     

              setCurrentProjectNav({...currentProjectNav, "settingPage-bgmVolName": settingsPageBgmVolName});   
            }}>{updateText[languageCode]}</button> 
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
            <label>Display Naming:</label>
            <input value={settingsPageSeVolName} onChange={(event)=>{
              setSettingsPageSeVolName(event.target.value);
            }}></input>
            <button onClick={()=>{
              let tempObj = currentProjectNav;
              tempObj["settingPage-seVolName"] = settingsPageSeVolName;
              updateNavObj(tempObj); 

              setCurrentProjectNav({...currentProjectNav, "settingPage-seVolName": settingsPageSeVolName});
            }}>{updateText[languageCode]}</button>
          </div>


       </div>


     </div>
     </div>}


     {currentSettingPage === "Player Profile Page" && <div>
     <label>Player Profile Page:</label>
       <div className="indentOne">
       <label>Background of the entire page:</label><br></br>
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
                        >Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
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
                                Base Picture </label>
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
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                                    {visualList.map((item, index) => {
                                        let keyStr = "playerProfilePage-li-" + index + item["var"];
                                        return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}
                                </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
                        </>}

          
                  </div>
       

          <div>
            <table>
              <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Item Type</th>
                    <th>Position (x, y)</th>
                    <th>Operations</th>
                </tr>
              </thead>
              <tbody>
              {Object.keys(currentProjectNav["playerProfilePage-itemMap"]).map((currKey) => {
                 let item = currentProjectNav["playerProfilePage-itemMap"][currKey];

                 return (
                   <tr>
                        <td>{item["name"]}</td>
                        <td>{item["type"]}</td>
                        <td>{item["posX"]}, {item["posY"]}</td>
                        <td>
                          <button
                            onClick={()=>{
                              //TODO highlight this item on previewer ??

                              //TODO notify caller-layer...
                            }}
                          >select</button>
                          <button onClick={()=>{
                            let askStr = "Are you sure to delete this item?";
                            let resp = window.confirm(askStr);
                            if (resp === true) {
                              //TODO delete this from table

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

             <label>Text Font Size: </label>
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
             <label>Position X: </label>
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
             <label>Position Y: </label>
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
                addPPTryingTextItemNew();

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
                    <option key="ppSetting-value-type-defaultNone" value="">-- Select Data Range --</option>

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
                        <option>-- Select Player Profile Data Item --</option>
//TODO7
                      </select>
                  }
                  
                  {playerProfilePageAddingValueType === "Player Account Info" && 
                      <select>
                        <option>-- Select Player Account Data Item --</option>
//TODO7
                      </select>
                      
                  }
                </div>

           
            <label>Position X</label>
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
             <label>Position Y: </label>
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
             <label>Text Font Size: </label>
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

        
           
           <button>Add</button>
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
             
             <label>Position X: </label>
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
             
             
             <label>Position Y: </label>
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
             <button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br>
             
             <label>Width: </label>
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

             <label>Height: </label>
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
            
             
             <button>Add</button>
             
             <button
              onClick={()=>{
                resetPPTryingPicItem();
              }}
             >Clear</button>


           </div>}
    
           <br></br><br></br>

           <input type="checkbox"
            value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["adding"]}
            checked={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["adding"]}
            onChange={()=>{
              let tempNav = currentProjectNav;
              tempNav["playerProfilePage-playerProfileNickNameItem"]["adding"] = !tempNav["playerProfilePage-playerProfileNickNameItem"]["adding"];
              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
              updateNavObj(tempNav);
            }}
           ></input>  
           <label
            className="textNoSelect cursor_pointer"
            onClick={()=>{
              
              let tempNav = currentProjectNav;
              tempNav["playerProfilePage-playerProfileNickNameItem"]["adding"] = !tempNav["playerProfilePage-playerProfileNickNameItem"]["adding"];
              setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
              updateNavObj(tempNav);              
            }}
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
              <label>Text Font Size: </label>
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
              <label>Position X: </label>
              <input
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
                value={currentProjectNav["playerProfilePage-playerProfileNickNameItem"]["posX"]}
                onChange={(event)=>{
                  let tempNav = currentProjectNav;
                  tempNav["playerProfilePage-playerProfileNickNameItem"]["posX"] = event.target.value;
                  setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileNickNameItem": tempNav["playerProfilePage-playerProfileNickNameItem"]});         
                  updateNavObj(tempNav);  
                }}
              ></input>
              <br></br>
              <label>Position Y: </label>
              <input
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
           <br></br>
           <input type="checkbox"
              value={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["adding"]}
              checked={currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["adding"]}
              onChange={()=>{
                let tempNav = currentProjectNav;
                tempNav["playerProfilePage-playerProfileIconPicItem"]["adding"] = !tempNav["playerProfilePage-playerProfileIconPicItem"]["adding"];
                setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                updateNavObj(tempNav);
              }}
           ></input>  
           <label
            className="textNoSelect cursor_pointer"
            onClick={()=>{
                let tempNav = currentProjectNav;
                tempNav["playerProfilePage-playerProfileIconPicItem"]["adding"] = !tempNav["playerProfilePage-playerProfileIconPicItem"]["adding"];
                setCurrentProjectNav({...currentProjectNav, "playerProfilePage-playerProfileIconPicItem": tempNav["playerProfilePage-playerProfileIconPicItem"]});         
                updateNavObj(tempNav);              
            }}
           >Player Profile Icon</label> 
           {currentProjectNav["playerProfilePage-playerProfileIconPicItem"]["adding"] &&
            <div className="indentOne">
                <label>Position X: </label><input type="range"></input><input></input>
                <br></br>
                <label>Position Y: </label><input type="range"></input><input></input>
                <br></br>
                <label>Picture: </label><select></select><button>Manage Resource</button>
                <br></br>
                <label>Width: </label><input type="range"></input><input></input>
                <br></br>
                <label>Height: </label><input type="range"></input><input></input>
            </div>}
                      


       </div>
    </div>}

    {currentSettingPage === "Game Status Data Page" && <div>
     <label>Game Status Data Page:</label>
       <div className="indentOne">
       <label>Background of the entire page:</label><br></br>
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
                        }}>Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
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
                        }}>Base Picture </label>
                            {
                            <>
                              <select onChange={(event)=>{
                                  let tempObj = currentProjectNav;
                                  tempObj["gsdPage-bgPicName"] = event.target.value;
                                  updateNavObj(tempObj); 
                        
                                  setCurrentProjectNav({...currentProjectNav, "gsdPage-bgPicName": event.target.value});                                     
                              }}>                    
                                    <option key="gsdPage-bgPicNameDefault" value="">-- Select Resource --</option>
                                    {visualList.map((item, index) => {
                                      let keyStr = "gsdPage-bgPic-" + index + item["var"];
                                      return (<option key={keyStr} value={item["var"]}>{item["var"]}</option>);
                                    })}                                    
                          
                                </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
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
       <label>Background of the entire page:</label><br></br>
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
                        >Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
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
                            
                          }}>Base Picture </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>{manageResourceText[languageCode]}</button><br></br><br></br>
                        </>}

          
                  </div>
       

           TODO shop page content (in separate editor?)

       </div>
       </div>}

    <br></br>

    <br></br>

    <button>{saveChangesText[languageCode]}</button>



 </div>
);


}
