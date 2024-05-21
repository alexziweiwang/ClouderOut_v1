import { useState, useEffect } from 'react';

export default function NavigationSetter({initialNavObj, updateNavObj}) {

    const [mainPageEntries, setMainPageEntries] = useState({
      "story": initialNavObj["mainPage-story"],
      "shop": initialNavObj["mainPage-shop"],
      "setting": initialNavObj["mainPage-setting"],
      "playerProfile": initialNavObj["mainPage-playerProfile"],
    });
    const [isMainPageEntriesHorizontal, setIsMainPageEntriesHorizontal] = useState(initialNavObj["mainPage-entriesHorizontal"]);
    const [isMainPageEntriesCustom, setIsMainPageEntriesCustom] = useState(initialNavObj["mainPage-entriesCustom"]);
  
    const [settingsPageEntries, setSettingsPageEntries] = useState({
      "playSpeed": initialNavObj["settingPage-playSpeed"],
      "bgmVol": initialNavObj["settingPage-bgmVol"],
      "seVol": initialNavObj["settingPage-seVol"]
    });
    const [isSettingsPageEntriesHorizontal, setIsSettingsPageEntriesHorizontal] = useState(initialNavObj["settingPage-entriesHorizontal"]);
    const [isSettingsPageEntriesCustom, setIsSettingsPageEntriesCustom] = useState(initialNavObj["settingPage-entriesCustom"]);
 
    const [currentProjectNav, setCurrentProjectNav] = useState({
      "isWithSL": initialNavObj["isWithSL"],
      "mainPage-story": initialNavObj["mainPage-story"],
      "mainPage-shop": initialNavObj["mainPage-shop"],
      "mainPage-setting": initialNavObj["mainPage-setting"],
      "mainPage-playerProfile": initialNavObj["mainPage-playerProfile"],    
      "mainPage-entriesHorizontal": initialNavObj["mainPage-entriesHorizontal"],
      "mainPage-entriesCustom": initialNavObj["mainPage-entriesCustom"],
      "settingPage-playSpeed": initialNavObj["settingPage-playSpeed"],
      "settingPage-bgmVol": initialNavObj["settingPage-bgmVol"],
      "settingPage-seVol": initialNavObj["settingPage-seVol"],
      "settingPage-entriesHorizontal": initialNavObj["settingPage-entriesHorizontal"],
      "settingPage-entriesCustom": initialNavObj["settingPage-entriesCustom"]
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
     <label>Main Navigation Screen Size: </label><select>
               <option value="" key=""> ----- Select Size and Direction ----- </option>
               <option value="h450_800" key="h450_800"> height: 450px, width: 800px (horizontal) </option>
               <option value="v800_450" key="v800_450"> height: 800px, width: 450px (vertical) </option>
               <option value="h600_800" key="h600_800"> height: 600px, width: 800px (horizontal) </option>
               <option value="v800_600" key="v800_600"> height: 800px, width: 600px (vertical) </option>
     </select>
     <br></br>

     <br></br><label>Game Progress Strategy:</label>
       <div style={{"justifyContent": "center"}}>

               <input type="radio" name="progressStrategy" checked={currentProjectNav["isWithSL"]} value={currentProjectNav["isWithSL"]} onChange={()=>{
                   setCurrentProjectNav({...currentProjectNav, "isWithSL": true});

                   let tempObj = currentProjectNav;
                   tempObj["isWithSL"] = true;
                   updateNavObj(tempObj);
                   }}></input>
               <label onClick={()=>{
                   setCurrentProjectNav({...currentProjectNav, "isWithSL": true});

                   let tempObj = currentProjectNav;
                   tempObj["isWithSL"] = true;
                   updateNavObj(tempObj);                       
            }}>SaveLoad System</label>                    
           
               <br></br>
               <input type="radio" name="progressStrategy" checked={!currentProjectNav["isWithSL"]} value={currentProjectNav["isWithSL"]} onChange={()=>{
                   setCurrentProjectNav({...currentProjectNav, "isWithSL": false});

                   let tempObj = currentProjectNav;
                   tempObj["isWithSL"] = false;
                   updateNavObj(tempObj);  
                   }}></input>
               <label onClick={()=>{
                   setCurrentProjectNav({...currentProjectNav, "isWithSL": false});

                   let tempObj = currentProjectNav;
                   tempObj["isWithSL"] = false;
                   updateNavObj(tempObj);  
                   }}>Without SaveLoad System</label>
           
       </div>
       <br></br><br></br>
     Main Page Options:
     <div className="indentOne">
         <input type="radio" value={isMainPageEntriesCustom} checked={!isMainPageEntriesCustom}
           onChange={()=>{
               setIsMainPageEntriesCustom(false);
               let tempObj = initialNavObj;
               initialNavObj["mainPage-entriesCustom"] = false;
               updateNavObj(tempObj);  
            }}
         ></input><label></label>Fixed List
             {!isMainPageEntriesCustom && <div className="indentOne" style={{"backgroundColor": "grey"}}>
               <input type="radio" value={isMainPageEntriesHorizontal} checked={isMainPageEntriesHorizontal}
                 onChange={()=>{setIsMainPageEntriesHorizontal(true);
                    let tempObj = initialNavObj;
                    initialNavObj["mainPage-entriesHorizontal"] = true;
                    updateNavObj(tempObj);                 
                }}
               ></input>
               <label>Horizontal</label>
               <br></br><input type="radio" value={isMainPageEntriesHorizontal} checked={!isMainPageEntriesHorizontal}
                 onChange={()=>{setIsMainPageEntriesHorizontal(false);
                    let tempObj = initialNavObj;
                    initialNavObj["mainPage-entriesHorizontal"] = false;
                    updateNavObj(tempObj);    
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
         <br></br><input type="radio"  value={isMainPageEntriesCustom} checked={isMainPageEntriesCustom}
            onChange={()=>{setIsMainPageEntriesCustom(true);
                let tempObj = initialNavObj;
                initialNavObj["mainPage-entriesCustom"] = true;
                updateNavObj(tempObj);  
            }}
         ></input>
         <label></label>Customized Positions

         <br></br>
         <br></br><label>Main Page Items: </label>
         
         <br></br><input type="checkbox" value={mainPageEntries["story"]}
           checked={mainPageEntries["story"]}
           onChange={()=>{
             let val = mainPageEntries["story"];
             setMainPageEntries({...mainPageEntries, "story": !val});

             let tempObj = initialNavObj;
             initialNavObj["mainPage-story"] = !val;
             updateNavObj(tempObj);              
            }}
         ></input><label>Story</label>
         {(isMainPageEntriesCustom && mainPageEntries["story"]) && <div className="indentOne">
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
           Font:
                 <select></select>
               <br></br>
           Font Size:
                 <input type="number"></input>
               <br></br>
           Background Picture:
                 <select></select><button>Resource</button>
           </div>}
         <br></br><input type="checkbox" value={mainPageEntries["setting"]}
           checked={mainPageEntries["setting"]}
           onChange={()=>{
             let val = mainPageEntries["setting"];
             setMainPageEntries({...mainPageEntries, "setting": !val});

             let tempObj = initialNavObj;
             initialNavObj["mainPage-setting"] = !val;
             updateNavObj(tempObj);  
            }}      
         ></input><label>Setting</label>
         {(isMainPageEntriesCustom && mainPageEntries["setting"]) && <div className="indentOne">
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
           Font:
                 <select></select>
               <br></br>
           Font Size:
                 <input type="number"></input>
               <br></br>
           Background Picture:
                 <select></select><button>Resource</button>
           </div>}
         <br></br><input type="checkbox" value={mainPageEntries["playerProfile"]}
           checked={mainPageEntries["playerProfile"]}
           onChange={()=>{
             let val = mainPageEntries["playerProfile"];
             setMainPageEntries({...mainPageEntries, "playerProfile": !val});

             let tempObj = initialNavObj;
             initialNavObj["mainPage-playerProfile"] = !val;
             updateNavObj(tempObj);              
            }}               
         ></input><label>Player Profile</label>
       {(isMainPageEntriesCustom && mainPageEntries["playerProfile"]) && <div className="indentOne">
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
           Font:
                 <select></select>
               <br></br>
           Font Size:
                 <input type="number"></input>
               <br></br>
           Background Picture:
                 <select></select><button>Resource</button>
           </div>}             
         <br></br><input type="checkbox" value={mainPageEntries["shop"]}
           checked={mainPageEntries["shop"]}
           onChange={()=>{
             let val = mainPageEntries["shop"];
             setMainPageEntries({...mainPageEntries, "shop": !val});
            
             let tempObj = initialNavObj;
             initialNavObj["mainPage-shop"] = !val;
             updateNavObj(tempObj);
            }}                     
         ></input><label>Shop</label>
       {(isMainPageEntriesCustom && mainPageEntries["shop"]) && <div className="indentOne">
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
           Font:
                 <select></select>
               <br></br>
           Font Size:
                 <input type="number"></input>
               <br></br>
           Background Picture:
                 <select></select><button>Resource</button>
           </div>} 
     </div>


     <br></br><br></br>

     <br></br>Story Page
       <div className="indentOne">
           Chapter List:
           <br></br>
           <input type="radio"></input><label>Horizontal</label>
           <br></br>
           <input type="radio"></input><label>Vertical</label>
           <br></br>

           <label>Title base</label>
           <select></select>
           TODO shape

       </div>

     <br></br>Settings Page
     <div className="indentOne">
       <input type="radio" value={isSettingsPageEntriesCustom} checked={!isSettingsPageEntriesCustom}
         onChange={()=>{setIsSettingsPageEntriesCustom(false);
        
            let tempObj = initialNavObj;
            initialNavObj["settingPage-entriesCustom"] = false;
            updateNavObj(tempObj);        
        }}
       ></input><label>Fixed List</label>
       {!isSettingsPageEntriesCustom && <div className="indentOne" style={{"backgroundColor": "grey"}}>
               <input type="radio" value={isSettingsPageEntriesHorizontal} checked={isSettingsPageEntriesHorizontal}
                 onChange={()=>{setIsSettingsPageEntriesHorizontal(true);
                
                    let tempObj = initialNavObj;
                    initialNavObj["settingPage-entriesHorizontal"] = true;
                    updateNavObj(tempObj);     
                }}
               ></input>
               <label>Horizontal</label>
               <br></br>
               <input type="radio" value={isSettingsPageEntriesHorizontal} checked={!isSettingsPageEntriesHorizontal}
                 onChange={()=>{setIsSettingsPageEntriesHorizontal(false);
                    let tempObj = initialNavObj;
                    initialNavObj["settingPage-entriesHorizontal"] = false;
                    updateNavObj(tempObj);   
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
       <input type="radio" value={isSettingsPageEntriesCustom} checked={isSettingsPageEntriesCustom}
         onChange={()=>{setIsSettingsPageEntriesCustom(true);
        
            let tempObj = initialNavObj;
            initialNavObj["settingPage-entriesCustom"] = true;
            updateNavObj(tempObj);          
        }} 
       ></input><label>Customized Positions</label>
       <br></br>
       <label>Settings Page Items:</label>
       <div>
         <input type="checkbox"
           value={settingsPageEntries["playSpeed"]}
           checked={settingsPageEntries["playSpeed"]}
           onChange={()=>{
             let currVal = settingsPageEntries["playSpeed"];
             setSettingsPageEntries({...settingsPageEntries, "playSpeed": !currVal});
                  
             let tempObj = initialNavObj;
             initialNavObj["settingPage-playSpeed"] = !currVal;
             updateNavObj(tempObj);     
            }}
         ></input><label>Play Speed</label>
         {(isSettingsPageEntriesCustom && settingsPageEntries["playSpeed"]) 
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
               Font:
                     <select></select>
                   <br></br>
               Font Size:
                     <input type="number"></input>
                   <br></br>
               Slider Looking: TODO
         </div>}
         <br></br>

         <input type="checkbox"
           value={settingsPageEntries["bgmVol"]}
           checked={settingsPageEntries["bgmVol"]}
           onChange={()=>{
             let currVal = settingsPageEntries["bgmVol"];
             setSettingsPageEntries({...settingsPageEntries, "bgmVol": !currVal});
                    
             let tempObj = initialNavObj;
             initialNavObj["settingPage-bgmVol"] = !currVal;
             updateNavObj(tempObj);     
            }}                  
         ></input><label>Background Music Volume</label>
         {(isSettingsPageEntriesCustom && settingsPageEntries["bgmVol"]) 
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
               Font:
                     <select></select>
                   <br></br>
               Font Size:
                     <input type="number"></input>
                   <br></br>
               Slider Looking: TODO
         </div>}
         <br></br>
         <input type="checkbox"
           value={settingsPageEntries["seVol"]}
           checked={settingsPageEntries["seVol"]}
           onChange={()=>{
             let currVal = settingsPageEntries["seVol"];
             setSettingsPageEntries({...settingsPageEntries, "seVol": !currVal});
                                         
             let tempObj = initialNavObj;
             initialNavObj["settingPage-seVol"] = !currVal;
             updateNavObj(tempObj); 
            }}                  
         ></input><label>Sound Effect Volume</label>
         {(isSettingsPageEntriesCustom && settingsPageEntries["seVol"]) 
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
               Font:
                     <select></select>
                   <br></br>
               Font Size:
                     <input type="number"></input>
                   <br></br>
               Slider Looking: TODO
         </div>}

       </div>


     </div>
   
     <br></br>
     <br></br>Player Profile Page
       <div className="indentOne">
           TODO elements (pic) and data displaying

       </div>

     <br></br>Game Status Data Page
       <div className="indentOne">
           TODO data displaying
           <br></br>TODO layout
       </div>

     <br></br>Shop Page
       <div className="indentOne">
           TODO shop page content (in separate editor?)

       </div>


     <br></br><br></br>
     <p className="plans">
       TODO: Menu UI setter (main page, etc.)
       <br></br>TODO: Navigation setter
       <br></br>Path: main-page to story seciton, to either s/l, chapter list, or branch page         
       <br></br>Path: main-page to other parts? player profile(including game data/status?), game settings, meeting(optional), shop(optional), achievements(optional), gallery/memory(optional)  
     </p>

     <button>Save Changes</button>



 </div>);


}