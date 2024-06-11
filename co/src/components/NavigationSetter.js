import { useState, useEffect } from 'react';
import { fetchProjectResourceVarPairsVM } from '../viewmodels/ResourceManagerViewModel';

export default function NavigationSetter({initialNavObj, updateNavObj, openRm, updateCurrentPageName}) {
  const username = "user002"; //TODO testing
  const projName = "project001"; //TODO testing
  
  const screenWidth = 800; //TODO temp  
  const screenHeight = 600; //TODO temp
  
  const [currentSettingPage, setCurrentSettingPage] = useState("");

    const [currentProjectNav, setCurrentProjectNav] = useState({
      "screenSize": initialNavObj["screenSize"],
      "isWithSL": initialNavObj["isWithSL"],
      "mainPage-story": initialNavObj["mainPage-story"],
      "mainPage-shop": initialNavObj["mainPage-shop"],
      "mainPage-setting": initialNavObj["mainPage-setting"],
      "mainPage-playerProfile": initialNavObj["mainPage-playerProfile"],    
      "mainPage-entriesHorizontal": initialNavObj["mainPage-entriesHorizontal"],
      "mainPage-entriesCustom": initialNavObj["mainPage-entriesCustom"],

      "mainPage-isBackgroundShape": initialNavObj["mainPage-isBackgroundShape"],
      "mainPage-bgShadeName": initialNavObj["mainPage-bgShadeName"],
      "mainPage-bgPicName": initialNavObj["mainPage-bgPicName"],
      "mainPage-isListItemShape": initialNavObj["mainPage-isListItemShape"],
      "mainPage-listItemShadeName": initialNavObj["mainPage-listItemShadeName"],
      "mainPage-listItemPicName": initialNavObj["mainPage-listItemPicName"],
      "mainPage-listItemGroupX": initialNavObj["mainPage-listItemGroupX"],
      "mainPage-listItemGroupY": initialNavObj["mainPage-listItemGroupY"],
      "mainPage-listItemGroupWidth": initialNavObj["mainPage-listItemGroupWidth"],
      "mainPage-listItemGroupHeight": initialNavObj["mainPage-listItemGroupHeight"],
      "mainPage-listItemGap": initialNavObj["mainPage-listItemGap"],
      "mainPage-listItemGroupFontColor": initialNavObj["mainPage-listItemGroupFontColor"],
      "mainPage-listItemGroupFontSize": initialNavObj["mainPage-listItemGroupFontSize"],
      
      "mainPage-story-isShape": initialNavObj["mainPage-story-isShape"],
      "mainPage-story-shadeName": initialNavObj["mainPage-story-shadeName"],
      "mainPage-story-picName": initialNavObj["mainPage-story-picName"],
      "mainPage-setting-isShape": initialNavObj["mainPage-setting-isShape"],
      "mainPage-setting-shadeName": initialNavObj["mainPage-setting-shadeName"],
      "mainPage-setting-picName": initialNavObj["mainPage-setting-picName"],
      "mainPage-playerProfile-isShape": initialNavObj["mainPage-playerProfile-isShape"],
      "mainPage-playerProfile-shadeName": initialNavObj["mainPage-playerProfile-shadeName"],
      "mainPage-playerProfile-picName": initialNavObj["mainPage-playerProfile-picName"],
      "mainPage-shop-isShape": initialNavObj["mainPage-shop-isShape"],
      "mainPage-shop-shadeName": initialNavObj["mainPage-shop-shadeName"],
      "mainPage-shop-picName": initialNavObj["mainPage-shop-picName"],

      "mainPage-story-posX": initialNavObj["mainPage-story-posX"],
      "mainPage-story-posY": initialNavObj["mainPage-story-posY"],
      "mainPage-story-width": initialNavObj["mainPage-story-width"],
      "mainPage-story-height": initialNavObj["mainPage-story-height"],
      "mainPage-story-fontSize": initialNavObj["mainPage-story-fontSize"],
      "mainPage-story-fontColor": initialNavObj["mainPage-story-fontColor"],
      "mainPage-setting-posX": initialNavObj["mainPage-setting-posX"],
      "mainPage-setting-posY": initialNavObj["mainPage-setting-posY"],
      "mainPage-setting-width": initialNavObj["mainPage-setting-width"],
      "mainPage-setting-height": initialNavObj["mainPage-setting-height"],
      "mainPage-setting-fontSize": initialNavObj["mainPage-setting-fontSize"],
      "mainPage-setting-fontColor": initialNavObj["mainPage-setting-fontColor"],
      "mainPage-playerProfile-posX": initialNavObj["mainPage-playerProfile-posX"],
      "mainPage-playerProfile-posY": initialNavObj["mainPage-playerProfile-posY"],
      "mainPage-playerProfile-width": initialNavObj["mainPage-playerProfile-width"],
      "mainPage-playerProfile-height": initialNavObj["mainPage-playerProfile-height"],
      "mainPage-playerProfile-fontSize": initialNavObj["mainPage-playerProfile-fontSize"],
      "mainPage-playerProfile-fontColor": initialNavObj["mainPage-playerProfile-fontColor"],
      "mainPage-shop-posX": initialNavObj["mainPage-shop-posX"],
      "mainPage-shop-posY": initialNavObj["mainPage-shop-posY"],
      "mainPage-shop-width": initialNavObj["mainPage-shop-width"],
      "mainPage-shop-height": initialNavObj["mainPage-shop-height"],
      "mainPage-shop-fontSize": initialNavObj["mainPage-shop-fontSize"],
      "mainPage-shop-fontColor": initialNavObj["mainPage-shop-fontColor"],

      "mainPage-story-name": initialNavObj["mainPage-story-name"],
      "mainPage-setting-name": initialNavObj["mainPage-setting-name"],
      "mainPage-playerProfile-name": initialNavObj["mainPage-playerProfile-name"],
      "mainPage-shop-name": initialNavObj["mainPage-shop-name"],
  
      "saveloadPage-isBackgroundShape": initialNavObj["saveloadPage-isBackgroundShape"],
      "saveloadPage-bgShadeName": initialNavObj["saveloadPage-bgShadeName"],
      "saveloadPage-bgPicName": initialNavObj["saveloadPage-bgPicName"],
      "saveloadPage-isSlotShape": initialNavObj["saveloadPage-isSlotShape"],
      "saveloadPage-slotShadeName": initialNavObj["saveloadPage-slotShadeName"],
      "saveloadPage-slotPicName": initialNavObj["saveloadPage-slotPicName"],
      "saveloadPage-slotRowCount": initialNavObj["saveloadPage-slotRowCount"],
      "saveloadPage-slotColCount": initialNavObj["saveloadPage-slotColCount"],
      "saveloadPage-slotPageCount": initialNavObj["saveloadPage-slotPageCount"],
      "saveloadPage-slotWidth": initialNavObj["saveloadPage-slotWidth"],
      "saveloadPage-slotHeight": initialNavObj["saveloadPage-slotHeight"],
      "saveloadPage-slotHorizontalGap": initialNavObj["saveloadPage-slotHorizontalGap"],
      "saveloadPage-slotVerticalGap": initialNavObj["saveloadPage-slotVerticalGap"],
      "saveloadPage-groupPosX": initialNavObj["saveloadPage-groupPosX"],
      "saveloadPage-groupPosY": initialNavObj["saveloadPage-groupPosY"],

      "settingPage-playSpeed": initialNavObj["settingPage-playSpeed"],
      "settingPage-bgmVol": initialNavObj["settingPage-bgmVol"],
      "settingPage-seVol": initialNavObj["settingPage-seVol"],
      "settingPage-entriesHorizontal": initialNavObj["settingPage-entriesHorizontal"],
      "settingPage-entriesCustom": initialNavObj["settingPage-entriesCustom"],

      "storyPage-chapterListHorizontal": initialNavObj["storyPage-chapterListHorizontal"],

      "settingPage-isBackgroundShape": initialNavObj["settingPage-isBackgroundShape"],
      "settingPage-bgShadeName": initialNavObj["settingPage-bgShadeName"],
      "settingPage-bgPicName": initialNavObj[ "settingPage-bgPicName"],
      "settingPage-isListItemShape": initialNavObj["settingPage-isListItemShape"],
      "settingPage-listItemShadeName": initialNavObj["settingPage-listItemShadeName"],
      "settingPage-listItemPicName": initialNavObj["settingPage-listItemPicName"],
      "settingPage-listItemGroupX": initialNavObj["settingPage-listItemGroupX"],
      "settingPage-listItemGroupY": initialNavObj["settingPage-listItemGroupY"],
      "settingPage-listItemGroupWidth": initialNavObj["settingPage-listItemGroupWidth"],
      "settingPage-listItemGroupHeight": initialNavObj["settingPage-listItemGroupHeight"],

      "settingPage-playSpeed-posX": initialNavObj["settingPage-playSpeed-posX"],
      "settingPage-playSpeed-posY": initialNavObj["settingPage-playSpeed-posY"],
      "settingPage-playSpeed-width": initialNavObj["settingPage-playSpeed-width"],
      "settingPage-playSpeed-height": initialNavObj["settingPage-playSpeed-height"],
      "settingPage-playSpeed-fontSize": initialNavObj["settingPage-playSpeed-fontSize"],
      "settingPage-playSpeed-fontColor": initialNavObj["settingPage-playSpeed-fontColor"],

      "settingPage-bgmVol-posX": initialNavObj["settingPage-bgmVol-posX"],
      "settingPage-bgmVol-posY": initialNavObj["settingPage-bgmVol-posY"],
      "settingPage-bgmVol-width": initialNavObj["settingPage-bgmVol-width"],
      "settingPage-bgmVol-height": initialNavObj["settingPage-bgmVol-height"],
      "settingPage-bgmVol-fontSize": initialNavObj["settingPage-bgmVol-fontSize"],
      "settingPage-bgmVol-fontColor": initialNavObj["settingPage-bgmVol-fontColor"],

      "settingPage-seVol-posX": initialNavObj["settingPage-seVol-posX"],
      "settingPage-seVol-posY": initialNavObj["settingPage-seVol-posY"],
      "settingPage-seVol-width": initialNavObj["settingPage-seVol-width"],
      "settingPage-seVol-height": initialNavObj["settingPage-seVol-height"],
      "settingPage-seVol-fontSize": initialNavObj["settingPage-seVol-fontSize"],
      "settingPage-seVol-fontColor": initialNavObj["settingPage-seVol-fontColor"],

      "storyPage-isBackgroundShape": initialNavObj["storyPage-isBackgroundShape"],
      "storyPage-bgShadeName": initialNavObj["storyPage-bgShadeName"],
      "storyPage-bgPicName": initialNavObj["storyPage-bgPicName"],
      "storyPage-isListItemShape": initialNavObj["storyPage-isListItemShape"],
      "storyPage-listItemShadeName": initialNavObj["storyPage-listItemShadeName"],
      "storyPage-listItemPicName": initialNavObj["storyPage-listItemPicName"],
      "storyPage-listItemGroupX": initialNavObj["storyPage-listItemGroupX"],
      "storyPage-listItemGroupY": initialNavObj["storyPage-listItemGroupY"],
      "storyPage-listItemGroupWidth": initialNavObj["storyPage-listItemGroupWidth"],
      "storyPage-listItemGroupHeight": initialNavObj["storyPage-listItemGroupHeight"],
      "storyPage-listItemGap": initialNavObj["storyPage-listItemGap"],
      "storyPage-listItemGroupFontColor": initialNavObj["storyPage-listItemGroupFontColor"],
      "storyPage-listItemGroupFontSize": initialNavObj["storyPage-listItemGroupFontSize"],
    });

    const [mainPageStoryName, setMainPageStoryName] = useState("");
    const [mainPagePlayerProfileName, setMainPagePlayerProfileName] = useState("");
    const [mainPageSettingsName, setMainPageSettingsName] = useState("");
    const [mainPageShopName, setMainPageShopName] = useState("");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
      if (firstTimeEnter === true) {
            console.log("Navigation Setter -- "); //TODO test
            fetchProjResourceLists();
            setFirstTimeEnter(false);
      }
    });


    const [audioList, setAudioList] = useState([]); //TODO for bgm on each nav-page -- future feature
    const [visualList, setVisualList] = useState([]); 
    async function fetchProjResourceLists() {
      console.log("nav-setter: fetchProjResourceLists()"); //TODO test
      /* fetch from cloud db */
      const obj = await fetchProjectResourceVarPairsVM({userName: username, projectName: projName});
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
    
   return (
   
   <div className="guiSettings">
   <button>Save Changes</button>


     <br></br><br></br>
     <label>Screen Size for all navigation pages:</label>
     <select
     onChange={(event)=>{
      let tempObj = currentProjectNav;
      tempObj["screenSize"] = event.target.value;
      updateNavObj(tempObj);  

      setCurrentProjectNav({...currentProjectNav, "screenSize": event.target.value});
     }}
     >
               <option value="" key=""> ----- Select Size and Direction ----- </option>
               <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
               <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
               <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
               <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>
     </select>
     <br></br><br></br><br></br>
     <label>Select a Page to setup:</label><br></br>
      <select value={currentSettingPage}
        onChange={(event)=>{
          setCurrentSettingPage(event.target.value);
          updateCurrentPageName(event.target.value);
        }}>
          <option value="" key="defaultEmptyPage">-- Select a Page Name --</option>
          <option value="Game Progress Strategy" key="Game Progress Strategy">Game Progress Strategy</option>
          <option value="Main Page" key="Main Page">Main Page</option>
          <option value="Story Page" key="Story Page">Story Page</option>
          <option value="Settings Page" key="Settings Page">Settings Page</option>
          <option value="Player Profile Page" key="Player Profile Page">Player Profile Page</option>
          <option value="Game Status Data Page" key="Game Status Data Page">Game Status Data Page</option>
          <option value="Shop Page" key="Shop Page">Shop Page</option>
      </select>

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
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
               
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
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
               
                <label>Slot Layout</label>
                    <div className="indentOne">
                      <label>Number of rows:</label>
                        <select
                          value={currentProjectNav["saveloadPage-slotRowCount"]}
                          onChange={()=>{
                            let tempObj = currentProjectNav;
                            tempObj["saveloadPage-slotRowCount"] = event.target.value;
                            updateNavObj(tempObj);       
                            
                            setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotRowCount": event.target.value});
                          }}
                        >
                          <option key="SLrowCountOne">1</option>
                          <option key="SLrowCountTwo">2</option>
                        </select>
                      <br></br>                     
                      <label>Number of columns:</label>
                      <select
                        value={currentProjectNav["saveloadPage-slotColCount"]}
                        onChange={()=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotColCount"] = event.target.value;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotColCount": event.target.value});
                        }}>
                          <option key="SLcolCountOne">1</option>
                          <option key="SLcolCountTwo">2</option>
                          <option key="SLcolCountThree">3</option>
                        </select>
                      <br></br>
                      <label>Number of Pages:</label>
                      <input type="number" min="1" max="99" step="1" value={currentProjectNav["saveloadPage-slotPageCount"]}
                        onChange={(event)=>{
                          let tempObj = currentProjectNav;
                          tempObj["saveloadPage-slotPageCount"] = event.target.value;
                          updateNavObj(tempObj);       
                          
                          setCurrentProjectNav({...currentProjectNav, "saveloadPage-slotPageCount": event.target.value});
                        }}
                      ></input>
                    
                    </div>
                <label>Slot Size:</label><br></br>
                  <div className="indentOne">
                      <label>Width:</label>
                      <input type="range"></input>
                      <br></br>
                      <label>Height:</label>
                      <input type="range"></input>
                  </div>
                <label>Gaps between slots:</label><br></br>
                  <div className="indentOne">
                      <label>Horizontal:</label>
                      <input type="range"></input>
                      <br></br>
                      <label>Vertical:</label>
                      <input type="range"></input>
                  </div>
                  <label>Group Positions:</label><br></br>
                    <div className="indentOne">
                        <label>position X:</label>
                        <input type="range"></input>
                        <br></br>
                        <label>position Y:</label>
                        <input type="range"></input>
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
                                <button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
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
                      </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
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
         <br></br><input type="checkbox" value={currentProjectNav["mainPage-story"]}
           checked={true}
           onClick={()=>{alert("Story-option must be kept.");}}
         ></input>
         <label>Story</label>
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

           }}>Update</button>

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
                          </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
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
           <label>Player Profile</label>
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

           }}>Update</button>
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
                    </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
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
         <label>Settings</label>
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

           }}>Update</button>
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
                    </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
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
         <label>Shop</label>
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

           }}>Update</button>
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
                    </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
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
                            {
                                <div className="indentOne">
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
            
                        }}>Base Picture </label>
                            {
                            <>
                                <select onChange={(event)=>{
                        
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
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
            ></input><label>Horizontal</label>
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
           ></input><label>Vertical</label>
           <br></br>

           <label>Chapter Title Looking:</label>
          <div className="indentOne">
                
            <input type="radio" 
              
              onChange={(event)=>{          
              }}></input><label onClick={(event)=>{
                      
                      }}>Rectangle & Color Filled </label>
                  {
                      <div className="indentOne">
                          <label>Background Color: </label>
                          <input type="color"
                          onChange={(event)=>{
                            
                              }}></input>
                          <label></label>
                      </div>}
                  
              <br></br><input type="radio"
                onChange={(event)=>{
                
              }}></input><label onClick={(event)=>{
                    }}>Base Picture </label>
                  {
                  <>
                      <select onChange={(event)=>{
                      }}>                    
                          <option key="mpliDefault" value="">-- Select Resource --</option>
                
                      </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
              </>}

 
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
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}
          
                  </div>
       

          <label>List Item Looking:</label>
          <div className="indentOne">
                
            <input type="radio" 
              
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
                
                      </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
              </>}

 
         </div>

       <input type="radio" value={currentProjectNav["settingPage-entriesCustom"]} checked={!currentProjectNav["settingPage-entriesCustom"]}
         onChange={()=>{
            let tempObj = currentProjectNav;
            tempObj["settingPage-entriesCustom"] = false;
            updateNavObj(tempObj);        

            setCurrentProjectNav({...currentProjectNav, "settingPage-entriesCustom": false});
        }}
       ></input><label>Fixed List</label>
       {!currentProjectNav["settingPage-entriesCustom"] && <div className="indentOne" style={{"backgroundColor": "grey"}}>
               <input type="radio" value={currentProjectNav["settingPage-entriesHorizontal"]} checked={currentProjectNav["settingPage-entriesHorizontal"]}
                 onChange={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-entriesHorizontal"] = true;
                    updateNavObj(tempObj);  
                    
                    setCurrentProjectNav({...currentProjectNav, "settingPage-entriesHorizontal": true});
                }}
               ></input>
               <label>Horizontal</label>
               <br></br>
               <input type="radio" value={currentProjectNav["settingPage-entriesHorizontal"]} checked={!currentProjectNav["settingPage-entriesHorizontal"]}
                 onChange={()=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-entriesHorizontal"] = false;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-entriesHorizontal": false});
                
                  }}
               ></input>
               <label>Vertical</label>
               <br></br>
               Group Position X:
                 <input type="range"
                  value={currentProjectNav["settingPage-listItemGroupX"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupX"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupX": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
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
                  value={currentProjectNav["settingPage-listItemGroupY"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupY"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupY": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
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
                  value={currentProjectNav["settingPage-listItemGroupWidth"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupWidth"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupWidth": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
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
                  value={currentProjectNav["settingPage-listItemGroupHeight"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupHeight"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupHeight": event.target.value});
           
                  }}
                 ></input>
                 <input type="number"
                  value={currentProjectNav["settingPage-listItemGroupHeight"]}
                  onChange={(event)=>{
                    let tempObj = currentProjectNav;
                    tempObj["settingPage-listItemGroupHeight"] = event.target.value;
                    updateNavObj(tempObj);   

                    setCurrentProjectNav({...currentProjectNav, "settingPage-listItemGroupHeight": event.target.value});
           
                  }}
                  ></input>
       </div>}
       
       <br></br>
       <input type="radio" value={currentProjectNav["settingPage-entriesCustom"]} checked={currentProjectNav["settingPage-entriesCustom"]}
         onChange={()=>{
            let tempObj = currentProjectNav;
            tempObj["settingPage-entriesCustom"] = true;
            updateNavObj(tempObj);          

            setCurrentProjectNav({...currentProjectNav, "settingPage-entriesCustom": true});
        }} 
       ></input><label>Customized Positions</label>
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
         ></input><label>Play Speed</label>
         {(currentProjectNav["settingPage-entriesCustom"] &&  currentProjectNav["settingPage-playSpeed"]) 
         && <div className="indentOne">
             Position X:
                     <input type="range"></input>
                   <br></br>
               Position Y:
                   <input type="range"></input>
                   <br></br>
               Width:
                     <input type="range"></input>
                   <br></br>
               Height:
                     <input type="range"></input>
                   <br></br>
               Font Color:
                    <input type="color"></input>
                   <br></br>
               Font Size:
                     <input type="number"></input>
                   <br></br>
               Slider Looking: TODO
         </div>}
         <br></br>

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
         ></input><label>Background Music Volume</label>
         {(currentProjectNav["settingPage-entriesCustom"] &&  currentProjectNav["settingPage-bgmVol"]) 
         && <div className="indentOne">
             Position X:
                     <input type="range"></input>
                   <br></br>
               Position Y:
                   <input type="range"></input>
                   <br></br>
               Width:
                     <input type="range"></input>
                   <br></br>
               Height:
                     <input type="range"></input>
                   <br></br>
               Font Color:
                    <input type="color"></input>
                   <br></br>
               Font Size:
                     <input type="number"></input>
                   <br></br>
               Slider Looking: TODO
         </div>}
         <br></br>
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
         ></input><label>Sound Effect Volume</label>
         {(currentProjectNav["settingPage-entriesCustom"] &&  currentProjectNav["settingPage-seVol"]) 
         && <div className="indentOne">
             Position X:
                     <input type="range"></input>
                   <br></br>
               Position Y:
                   <input type="range"></input>
                   <br></br>
               Width:
                     <input type="range"></input>
                   <br></br>
               Height:
                     <input type="range"></input>
                   <br></br>
               Font Color:
                    <input type="color"></input>
                   <br></br>
               Font Size:
                     <input type="number"></input>
                   <br></br>
               Slider Looking: TODO
         </div>}

       </div>


     </div>
     </div>}


     {currentSettingPage === "Player Profile Page" && <div>
     <label>Player Profile Page:</label>
       <div className="indentOne">
       <label>Background of the entire page:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        
                        onChange={(event)=>{          
                        }}></input><label onClick={(event)=>{
                                
                                }}>Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                      
                                        }}></input>
                                    <label></label>
                                </div>}
                            
                        <br></br><input type="radio"
                          onChange={(event)=>{
                          
                        }}></input><label onClick={(event)=>{
                              }}>Base Picture </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
       

           TODO elements (pic) and data displaying

       </div>
    </div>}

    {currentSettingPage === "Game Status Data Page" && <div>
     <label>Game Status Data Page:</label>
       <div className="indentOne">
       <label>Background of the entire page:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        
                        onChange={(event)=>{          
                        }}></input><label onClick={(event)=>{
                                
                                }}>Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                      
                                        }}></input>
                                    <label></label>
                                </div>}
                            
                        <br></br><input type="radio"
                          onChange={(event)=>{
                          
                        }}></input><label onClick={(event)=>{
                              }}>Base Picture </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
       

           TODO data displaying
           <br></br>TODO layout
       </div>
    </div>}

    {currentSettingPage === "Shop Page" && <div>
     <label>Shop Page:</label>
       <div className="indentOne">
       <label>Background of the entire page:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        
                        onChange={(event)=>{          
                        }}></input><label onClick={(event)=>{
                                
                                }}>Rectangle & Color Filled </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                      
                                        }}></input>
                                    <label></label>
                                </div>}
                            
                        <br></br><input type="radio"
                          onChange={(event)=>{
                          
                        }}></input><label onClick={(event)=>{
                              }}>Base Picture </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
       

           TODO shop page content (in separate editor?)

       </div>
       </div>}

    <br></br>
    <button>Save Changes</button>



 </div>);


}
