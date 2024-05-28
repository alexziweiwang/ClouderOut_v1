import { useState, useEffect } from 'react';

export default function NavigationSetter({initialNavObj, updateNavObj, openRm, updateCurrentPageName}) {
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

      "mainPage-isBackgroundShape": false,
      "mainPage-bgsShapeName": "",
      "mainPage-bgPicName": "",
      "mainPage-isListItemShape": false,
      "mainPage-listItemShapeName": "",
      "mainPage-listItemPicName": "",
      "mainPage-listItemGroupX": 0,
      "mainPage-listItemGroupY": 0,
      "mainPage-listItemGroupWidth": 0,
      "mainPage-listItemGroupHeight": 0,
      
      "mainPage-story-posX": 0,
      "mainPage-story-posY": 0,
      "mainPage-story-width": 0,
      "mainPage-story-height": 0,
      "mainPage-story-fontSize": 10,
      "mainPage-story-fontColor": "",
      "mainPage-setting-posX": 0,
      "mainPage-setting-posY": 0,
      "mainPage-setting-width": 0,
      "mainPage-setting-height": 0,
      "mainPage-setting-fontSize": 10,
      "mainPage-setting-fontColor": "",
      "mainPage-playerProfile-posX": 0,
      "mainPage-playerProfile-posY": 0,
      "mainPage-playerProfile-width": 0,
      "mainPage-playerProfile-height": 0,
      "mainPage-playerProfile-fontSize": 10,
      "mainPage-playerProfile-fontColor": "",
      "mainPage-shop-posX": 0,
      "mainPage-shop-posY": 0,
      "mainPage-shop-width": 0,
      "mainPage-shop-height": 0,
      "mainPage-shop-fontSize": 10,
      "mainPage-shop-fontColor": "",
  
      "saveloadPage-isBackgroundShape": false,
      "saveloadPage-bgsShapeName": "",
      "saveloadPage-bgPicName": "",
      "saveloadPage-isSlotShape": false,
      "saveloadPage-slotShapeName": "",
      "saveloadPage-slotPicName": "",
      "saveloadPage-slotRowCount": 1,
      "saveloadPage-slotColCount": 1,
      "saveloadPage-slotPageCount": 1,
      "saveloadPage-slotWidth": 1,
      "saveloadPage-slotHeight": 1,
      "saveloadPage-slotHorizontalGap": 1, 
      "saveloadPage-slotVerticalGap": 1,
      "saveloadPage-groupPosX": 0,
      "saveloadPage-groupPosY": 0,

      "settingPage-playSpeed": initialNavObj["settingPage-playSpeed"],
      "settingPage-bgmVol": initialNavObj["settingPage-bgmVol"],
      "settingPage-seVol": initialNavObj["settingPage-seVol"],
      "settingPage-entriesHorizontal": initialNavObj["settingPage-entriesHorizontal"],
      "settingPage-entriesCustom": initialNavObj["settingPage-entriesCustom"],

      "storyPage-chapterListHorizontal": initialNavObj["storyPage-chapterListHorizontal"],

      "settingPage-isBackgroundShape": false,
      "settingPage-bgsShapeName": "",
      "settingPage-bgPicName": "",
      "settingPage-isListItemShape": false,
      "settingPage-listItemShapeName": "",
      "settingPage-listItemPicName": "",
      "settingPage-listItemGroupX": 0,
      "settingPage-listItemGroupY": 0,
      "settingPage-listItemGroupWidth": 0,
      "settingPage-listItemGroupHeight": 0,

      "settingPage-playSpeed-posX": 0,
      "settingPage-playSpeed-posY": 0,
      "settingPage-playSpeed-width": 0,
      "settingPage-playSpeed-height": 0,
      "settingPage-playSpeed-fontSize": 10,
      "settingPage-playSpeed-fontColor": "",

      "settingPage-bgmVol-posX": 0,
      "settingPage-bgmVol-posY": 0,
      "settingPage-bgmVol-width": 0,
      "settingPage-bgmVol-height": 0,
      "settingPage-bgmVol-fontSize": 10,
      "settingPage-bgmVol-fontColor": "",

      "settingPage-seVol-posX": 0,
      "settingPage-seVol-posY": 0,
      "settingPage-seVol-width": 0,
      "settingPage-seVol-height": 0,
      "settingPage-seVol-fontSize": 10,
      "settingPage-seVol-fontColor": "",
    });
    
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
      if (firstTimeEnter === true) {
            console.log("Navigation Setter -- "); //TODO test
            setFirstTimeEnter(false);
      }
    });
    
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
                        
                        onChange={(event)=>{          
                        }}></input><label onClick={(event)=>{
                                
                                }}>Rectangle & Color Filled: </label>
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
                              }}>Base Picture: </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
               
                <label>Slot Looking:</label>
                    <div className="indentOne">
                      <input type="radio" 
                        
                        onChange={(event)=>{          
                        }}></input><label onClick={(event)=>{
                                
                                }}>Rectangle & Color Filled: </label>
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
                              }}>Base Picture: </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
               
                <label>Slot Layout</label>
                    <div className="indentOne">
                      <label>Number of rows:</label>
                        <select>
                          <option key="SLrowCountOne">1</option>
                          <option key="SLrowCountTwo">2</option>
                          <option key="SLrowCountThree">3</option>
                        </select>
                      <br></br>                     
                      <label>Number of columns:</label>
                      <select>
                          <option key="SLcolCountOne">1</option>
                          <option key="SLcolCountTwo">2</option>
                          <option key="SLcolCountThree">3</option>
                          <option key="SLcolCountFour">4</option>
                        </select>
                      <br></br>
                      <label>Number of Pages:</label>
                      <input type="number" min="1" max="99" step="1"></input>
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
                          setCurrentProjectNav({...currentProjectNav, "mainPage-isBackgroundShape": true});            
                        //TODO obj for previewing
                        }}></input>

                        <label onClick={()=>{
                          setCurrentProjectNav({...currentProjectNav, "mainPage-isBackgroundShape": true});               
                          //TODO obj for previewing

                        }}>Rectangle & Color Filled: </label>
                            {
                                <div className="indentOne">
                                    <label>Background Color: </label>
                                    <input type="color"
                                    onChange={(event)=>{
                                      
                                        }}></input>
                                    <label></label>
                                </div>}
                            
                        <br></br>
                        <input type="radio"
                            value={currentProjectNav["mainPage-isBackgroundShape"]}
                            checked={!currentProjectNav["mainPage-isBackgroundShape"]}
                          onChange={()=>{
                            setCurrentProjectNav({...currentProjectNav, "mainPage-isBackgroundShape": false});
                            //TODO obj for previewing
                        
                          }}></input><label onClick={()=>{
                            setCurrentProjectNav({...currentProjectNav, "mainPage-isBackgroundShape": false});
                            //TODO obj for previewing
                              }}>Base Picture: </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
             
          <label>List Item Looking:</label>
          <div className="indentOne">
                
            <input type="radio" 
              value={currentProjectNav["mainPage-isListItemShape"]}
              checked={currentProjectNav["mainPage-isListItemShape"]}
              onChange={()=>{          
                setCurrentProjectNav({...currentProjectNav, "mainPage-isListItemShape": true});
                //TODO obj for previewing
              }}></input>
              <label onClick={(event)=>{
                setCurrentProjectNav({...currentProjectNav, "mainPage-isListItemShape": true});
                //TODO obj for previewing
              }}>Rectangle & Color Filled: </label>
              
                  {
                      <div className="indentOne">
                          <label>Background Color: </label>
                          <input type="color"
                          onChange={(event)=>{
                            
                              }}></input>
                          <label></label>
                      </div>}
                  
              <br></br><input type="radio"
                value={currentProjectNav["mainPage-isListItemShape"]}
                checked={!currentProjectNav["mainPage-isListItemShape"]}
                onChange={()=>{
                  setCurrentProjectNav({...currentProjectNav, "mainPage-isListItemShape": false});

              }}></input><label onClick={()=>{
                  setCurrentProjectNav({...currentProjectNav, "mainPage-isListItemShape": false});

                    }}>Base Picture: </label>
                  {
                  <>
                      <select onChange={(event)=>{
                      }}>                    
                          <option key="mpliDefault" value="">-- Select Resource --</option>
                
                      </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
              </>}

 
         </div>

         <label>List item positions: </label><br></br>
         <input type="radio" value={currentProjectNav["mainPage-entriesCustom"]} checked={!currentProjectNav["mainPage-entriesCustom"]}
           onChange={()=>{
              let tempObj = currentProjectNav;
              tempObj["mainPage-entriesCustom"] = false;
              updateNavObj(tempObj);  

              setCurrentProjectNav({...currentProjectNav, "mainPage-entriesCustom": false });
            }}
         ></input><label></label>
         Fixed List
             {!currentProjectNav["mainPage-entriesCustom"] && <div className="indentOne" style={{"backgroundColor": "grey"}}>

               <input type="radio" value={currentProjectNav["mainPage-entriesHorizontal"]} checked={currentProjectNav["mainPage-entriesHorizontal"]}
                 onChange={()=>{
                    
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-entriesCustom"] = true;
                    updateNavObj(tempObj);                 

                    setCurrentProjectNav({...currentProjectNav, "mainPage-entriesHorizontal": true});
                }}
               ></input>
               <label>Horizontal</label>
               <br></br><input type="radio" value={currentProjectNav["mainPage-entriesHorizontal"]} checked={!currentProjectNav["mainPage-entriesHorizontal"]}
                 onChange={()=>{                    
                    let tempObj = currentProjectNav;
                    tempObj["mainPage-entriesCustom"] = false;
                    updateNavObj(tempObj);    

                    setCurrentProjectNav({...currentProjectNav, "mainPage-entriesHorizontal": false});
                }}
               ></input>
               <label>Vertical</label>
               <br></br>
               Group Position X:
                 <input type="range"></input>
               <br></br>
               Group Position Y:
               <input type="range"></input>
               <br></br>
               Group Width:
                 <input type="range"></input>
               <br></br>
               Group Height:
                 <input type="range"></input>
             </div>}
         <br></br><input type="radio"  value={currentProjectNav["mainPage-entriesCustom"]} checked={currentProjectNav["mainPage-entriesCustom"]}
            onChange={()=>{              
                let tempObj = currentProjectNav;
                tempObj["mainPage-entriesCustom"] = true;
                updateNavObj(tempObj); 
                
                setCurrentProjectNav({...currentProjectNav, "mainPage-entriesCustom": true });
            }}
         ></input>
         <label></label>Customized Positions

         <br></br>
         <br></br><label>Main Page Items: </label>
         
         <br></br><input type="checkbox" value={currentProjectNav["mainPage-story"]}
           checked={currentProjectNav["mainPage-story"]}
           onChange={()=>{
             let val = currentProjectNav["mainPage-story"];

             let tempObj = currentProjectNav;
             tempObj["mainPage-story"] = !val;
             updateNavObj(tempObj);  

             setCurrentProjectNav({...currentProjectNav, "mainPage-story": !val});             
            }}
         ></input><label>Story</label>
         {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-story"]) && <div className="indentOne">
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
         ></input><label>Setting</label>
         {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-setting"]) && <div className="indentOne">
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
         ></input><label>Player Profile</label>
       {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-playerProfile"]) && <div className="indentOne">
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
         ></input><label>Shop</label>
       {(currentProjectNav["mainPage-entriesCustom"] && currentProjectNav["mainPage-shop"]) && <div className="indentOne">
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
           </div>} 
     </div>
    </div>}

    {currentSettingPage === "Story Page" && <div>
     <label>Story Page:</label>
       <div className="indentOne">
       <label>Background of the entire page:</label><br></br>
                <div className="indentOne">
                      <input type="radio" 
                        
                        onChange={(event)=>{          
                        }}></input><label onClick={(event)=>{
                                
                                }}>Rectangle & Color Filled: </label>
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
                              }}>Base Picture: </label>
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
                      
                      }}>Rectangle & Color Filled: </label>
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
                    }}>Base Picture: </label>
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
                        
                        onChange={(event)=>{          
                        }}></input><label onClick={(event)=>{
                                
                                }}>Rectangle & Color Filled: </label>
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
                              }}>Base Picture: </label>
                            {
                            <>
                                <select onChange={(event)=>{
                                }}>                    
                                    <option key="mpliDefault" value="">-- Select Resource --</option>
                          
                                </select><button onClick={() => {openRm();}}>Resource+</button><br></br><br></br>
                        </>}

          
                  </div>
       

          <label>List Item Looking:</label>
          <div className="indentOne">
                
            <input type="radio" 
              
              onChange={(event)=>{          
              }}></input><label onClick={(event)=>{
                      
                      }}>Rectangle & Color Filled: </label>
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
                    }}>Base Picture: </label>
                  {
                  <>
                      <select onChange={(event)=>{
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
                 <input type="range"></input>
               <br></br>
               Group Position Y:
               <input type="range"></input>
               <br></br>
               Group Width:
                 <input type="range"></input>
               <br></br>
               Group Height:
                 <input type="range"></input>
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
                                
                                }}>Rectangle & Color Filled: </label>
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
                              }}>Base Picture: </label>
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
                                
                                }}>Rectangle & Color Filled: </label>
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
                              }}>Base Picture: </label>
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
                                
                                }}>Rectangle & Color Filled: </label>
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
                              }}>Base Picture: </label>
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