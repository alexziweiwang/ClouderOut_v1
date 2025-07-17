import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getAuthFirebase } from '../authtools/firebaseAuthOperations';


import langDictionary from './_textDictionary';
import uiLangMap from './uiLangMap';


//level(-1)

import GameMaker from './GameMaker';
import ConversationNodeEditingPanel from './ConversationNodeEditingPanel';


export default function Panel2_Container_GameEditor() {


//TODO put modals here
//TODO put editor-switching here


    const navigate = useNavigate();


    const {state} = useLocation();
    let projectName = "default-no-state projectname"; //TODO testing
    let mode = "default-node-state mode";
    let projectContentProvided = "default-node-state provided-project-content";

    const [focusingEditor, setFocusingEditor] = useState("gameMaker");
  

    if (state !== null && state !== undefined) {
      projectName = state.selected_project_name;
      mode = state.mode;
      projectContentProvided = state.providedImptProj;                                                         //   projectContentProvided = state.
                              console.log("container... \n mode = ", state.mode, "\n state = ", state);

    }

    const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

    let textDictItem = langDictionary[languageCodeTextOption];
    let textDictItemDefault = langDictionary["en"];
  
    const resourceManagerButtonText = textDictItem.resourceManagerButtonText !== undefined ?
            textDictItem.resourceManagerButtonText
            : textDictItemDefault.resourceManagerButtonText;
  
    const gameDataManagerButtonText = textDictItem.gameDataManagerButtonText !== undefined ?
            textDictItem.gameDataManagerButtonText
            : textDictItemDefault.gameDataManagerButtonText;

    const emuManagerText = textDictItem.emuManagerText !== undefined ?
            textDictItem.emuManagerText
            : textDictItemDefault.emuManagerText;    

    function goToNotLoggedInPage() {
        navigate('/notloggedin', { replace: true });
    }


    


    const [authEmailName, setAuthEmailName] = useState("_");

    const [firstTimeEnter, setFirstTimeEnter] = useState(true);
    useEffect(() => {
        if (state === null && state.mode === "online_cloud") {
                                    console.log("!!! not logged in - going to -login_page......");
            goToNotLoggedInPage();
        }

        if (authEmailName !== "_" && firstTimeEnter === true) {


                                //TODO
                                // if : condition of init-status of var...
                                // setFirstTimeEnter(false);
        }


        if (authEmailName === "_" && state.mode === "online_cloud") { // get login info
            getAuthFirebase(
                {
                  goToNotLoggedInPageFunc: goToNotLoggedInPage,
                  sendOutEmailName: setAuthEmailName
                }
            );
        }

        console.log("\n\n\n\n\n\npanel2 state = ", state);

    });

    function switchEditor(infoObj) {
        //TODO99999

            // goToEditorName,
            // clickedNodeKey, 
            // projectName, 
            // userName, 
            // screenSizeStr, 
            // uiLang, 
            // chapterKey,
            // editorMode


    }

    function goToGameMaker() {
        setFocusingEditor("gameMaker");

    }


return (<div style={{"backgroundColor": "#b5b2b0"}}>


{/* top banner area */}
<div className={state.mode === "online_cloud" ? "" : "colorInvert"}>
<div className="returning_buttons_cloud_mode">
      
      {state.mode === "online_cloud" && <button 
          className="button2" 
          onClick={()=>{
              //chapterChangingOrExiting(); goToDashboard();
            }}>
             ←
        </button>}


      {state.mode === "online_cloud" && <div style={{"textAlign": "start"}}>
              <label>{projectName}</label>
              <br></br>
              <label>{authEmailName}</label>
              <br></br>
              <label>Cloud Mode</label>
      </div>}



      <div
        style={{"minWidth": "150px"}}
      >

      </div>


                <div className="parallelFrame buttonRight30px" style={{"width": "600px"}}>
               

                    {authEmailName !== "" && 
                    <>
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                //       setDisplayRmModal(true);
                        }}> 
                        {resourceManagerButtonText} </button>
                    
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                //        setDisplayGdmBool(true);
                        
                        }}>
                        {gameDataManagerButtonText}</button>
                    
                    <button 
                    className="rmTab" 
                    onClick={()=>{
                //       setDisplayEmBool(true);
                        }}>
                        {emuManagerText}
                    </button>
                    </>}
                

                        <div>
                            <label>Editor Language</label><br></br>
                            <select value={languageCodeTextOption}
                            onChange={(event)=>{
                        //      userChangeEditorUILang(event.target.value);
                            }}
                            >
                            <option key="lang-Eng" value="en">English</option>
                            <option key="lang-chn" value="chn">简体中文</option> 
                            {/* //TODO16 */}
                            </select>
                        </div>

                </div>

    </div>
</div>
   
   
   
   
{/* editor area */}
    {(
    (authEmailName !== "_" && state.mode === "online_cloud") 
    || (state.mode !== "online_cloud")
    )
    && 
    <>
   
   
    {focusingEditor === "gameMaker"
    && <GameMaker
        projectName={state.selected_project_name}
        editorMode={state.mode}
        projectFile={state.projectFile}
        switchEditor={switchEditor}
    />}



    </>}
</div>);


}



// "offline_half"
// "offline_full"
// "online_cloud"