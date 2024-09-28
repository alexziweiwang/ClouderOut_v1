import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


import Modal_ResourceManagingWindow from './Modal_ResourceManagingWindow';
import Modal_GameDataManager from './Modal_GameDataManager';
import GameMaker from './GameMaker'

export default function Container_GameEditor_Outer() {

    const navigate = useNavigate();


    const {state} = useLocation();
    let projectName = "default-no-state projectname"; //TODO testing
    let username = "default-no-state username";
  
    if (state !== null) {
      projectName = state.selected_project_name;
      username = state.username;
    }


    const [isDisplayRmBool, setDisplayRmModal] = useState(false);
    const [isDisplayGdmBool, setDisplayGdmBool] = useState(false);

    const [rmUpdatedSignal, setRmUpdatedSignal] = useState(false);
    const [gdmUpdatedSignal, setGdmUpdatedSignal] = useState(false);
  
  




//TODO borderline between values and functions





    function handleResourceManagerCancel() {
        setDisplayRmModal(false);
        
        //TODO3 fetch laterst data from cloud?
        setRmUpdatedSignal(true);
    
    }


    function handleResourceManagerSaveChanges() {
        console.log("modal save changes!");
        //TODO update to cloud db
        setDisplayRmModal(false);
    }
    
    function handleGameDataManagerCancel() {
        setDisplayGdmBool(false);
    }
    
    function handleGameDataManagerSaveChanges() {
        setDisplayGdmBool(false);
    
    }

    function triggerRefresh() {
        setFirstTimeEnter(true);
    }

return (<div>

    <GameMaker/>


    {isDisplayRmBool && 
          <div
            style={{
              "display": isDisplayRmBool === false ? "none" : "flex",
            }}
          >
            <Modal_ResourceManagingWindow 
              isDisplay = {isDisplayRmBool} 
              handleRmCancel={handleResourceManagerCancel} 
              handleRmSaveChanges={handleResourceManagerSaveChanges}
              refresh={triggerRefresh}
          />
          
          </div>}

          {isDisplayGdmBool && 
            <Modal_GameDataManager 
              isDisplay={isDisplayGdmBool} 
              handleGdmCancel={handleGameDataManagerCancel} 
              initialGameData={gameDataDesignList} 
              resetNeedCloudData={markNextNeedCloudGameData} 
              updateGameDataToCloud={updateGameDataSettingsToCloud}
          />} 
    //TODO: game-maker
    //TODO: resource-manager
    //TODO: game-data-manager


</div>);


}