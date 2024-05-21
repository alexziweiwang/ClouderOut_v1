import { useState, useEffect } from 'react';

export default function NavigationSetter({initialNavObj, updateNavObj}) {

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
           
               <br></br>
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
           
       </div>
       <br></br><br></br>
     Main Page Options:
     <div className="indentOne">

         <input type="radio" value={currentProjectNav["mainPage-entriesCustom"]} checked={!currentProjectNav["mainPage-entriesCustom"]}
           onChange={()=>{
              let tempObj = currentProjectNav;
              tempObj["mainPage-entriesCustom"] = false;
              updateNavObj(tempObj);  

              setCurrentProjectNav({...currentProjectNav, "mainPage-entriesCustom": false });
            }}
         ></input><label></label>Fixed List
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
           Font:
                 <select></select>
               <br></br>
           Font Size:
                 <input type="number"></input>
               <br></br>
           Background Picture:
                 <select></select><button>Resource</button>
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
           Font:
                 <select></select>
               <br></br>
           Font Size:
                 <input type="number"></input>
               <br></br>
           Background Picture:
                 <select></select><button>Resource</button>
           </div>}
         <br></br><input type="checkbox" value={currentProjectNav["mainPage-playerProfile"]}
           checked={currentProjectNav["mainPage-playerProfile"]}
           onChange={()=>{
             let val = currentProjectNav["mainPage-playerProfile"];
             
             let tempObj = currentProjectNav;
             tempObj["mainPage-playerProfile"] = !val;
             updateNavObj(tempObj);              

             setCurrentProjectNav({...currentProjectNav, "playerProfile": !val});
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
           Font:
                 <select></select>
               <br></br>
           Font Size:
                 <input type="number"></input>
               <br></br>
           Background Picture:
                 <select></select><button>Resource</button>
           </div>}             
         <br></br><input type="checkbox" value={currentProjectNav["mainPage-shop"]}
           checked={currentProjectNav["mainPage-shop"]}
           onChange={()=>{
             let val = currentProjectNav["mainPage-shop"];
            
             let tempObj = currentProjectNav;
             tempObj["mainPage-shop"] = !val;
             updateNavObj(tempObj);

             setCurrentProjectNav({...currentProjectNav, "shop": !val});
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
       <br></br>
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

             setCurrentProjectNav({...currentProjectNav, "playSpeed": !currVal});
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
           value={ currentProjectNav["settingPage-bgmVol"]}
           checked={ currentProjectNav["settingPage-bgmVol"]}
           onChange={()=>{
             let currVal =  currentProjectNav["settingPage-bgmVol"];
                    
             let tempObj = currentProjectNav;
             tempObj["settingPage-bgmVol"] = !currVal;
             updateNavObj(tempObj);     

             setCurrentProjectNav({...currentProjectNav, "bgmVol": !currVal});
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
           value={ currentProjectNav["settingPage-seVol"]}
           checked={ currentProjectNav["settingPage-seVol"]}
           onChange={()=>{
             let currVal =  currentProjectNav["settingPage-seVol"];
                                         
             let tempObj = currentProjectNav;
             tempObj["settingPage-seVol"] = !currVal;
             updateNavObj(tempObj); 

             setCurrentProjectNav({...currentProjectNav, "seVol": !currVal});
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