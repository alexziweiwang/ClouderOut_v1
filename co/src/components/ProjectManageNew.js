import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//TODO20 cloud-func
import { fetchProjectListVM, createProjectVM } from '../viewmodels/ProjectManagerViewModel';
import { projectNavUiTemplate } from './_dataStructure_DefaultObjects';

//TODO115 collection of cloud-related


export default function ProjectManageNew({cancelAction, showCancelButton, isPart, triggerCreationSubmit, username}) {
    const navigate = useNavigate();

    const name = "/projectmanagenew";

    const [addedNewProjName, setAddedNewProjName] = useState(""); //TODO testing
    const [projDedscription, setProjDescription] = useState("");
    const [addedAuthorInfo, setAddedAuthorInfo] = useState("");
    const [addedGameScreenSize, setAddedGameScreenSize] = useState("");
    const [projList, setProjList] = useState(false); 
    const [firstTimeEnter, setFirstTimeEnter] = useState(true);

    useEffect(() => {
      if (firstTimeEnter === true) {
        loadProjectListFromCloud();
        setFirstTimeEnter(false);
      }
    });

    async function loadProjectListFromCloud() {
      const groupList = await fetchProjectListVM(username); 
      setProjList(groupList.untrashed);
    }

    function changeProjNameInput(event) {
      const str = event.target.value;

      setAddedNewProjName(str);
    }
    
    function createNewProjectLocal() {
        if (addedNewProjName === "") {
          alert("Project Name can not be empty!");
          return;
        }
        createNewProjectToCloud();
  
    }

 

    /* Create and setup the default set for a new project */
    function createNewProjectToCloud() {
      // TODO gather list:
      /* project name: addedNewProjName
      project description: projDedscription
      game-data map: empty {}
      author-info field: addedAuthorInfo
      field: type = "project"
      chapter directory: collection "chapters"
      game node directory: default in chapter-management (at least one default node in ecah chapter)
                 genre field (later) */
      
    
      const result = projList.filter((name) => name === addedNewProjName);
      if (result.length > 0) {
        console.log("warning: duplicate name");
        alert("Project Name already taken ...");
        //if already contains this name
        //don't navigate
        return;
      }
      
 
      //TODO: author name default: current username, then allow adding others
      

      const empty_game_data = {};
      const empty_rm_audio = [];
      const empty_rm_visual = [];
      const empty_chapter_list = {};
      const empty_chapter_node_mapping = {};
      const empty_node_ui_plan = {};
      const empty_emu_4sets = {
        "gdt1": {},
        "epp2": {},
        "epa3": {},
        "ess4": {},
        "shp5": {}
      };

      const empty_nav_ui_settings = {
        "screenSize": projectNavUiTemplate["screenSize"],
        "defaultCornerRadius": projectNavUiTemplate["defaultCornerRadius"],
        
        "isWithSL": projectNavUiTemplate["isWithSL"],
        "fontFamilyForAll": projectNavUiTemplate["fontFamilyForAll"],
    
        "mainPage-story": projectNavUiTemplate["mainPage-story"],
        "mainPage-shop": projectNavUiTemplate["mainPage-shop"],
        "mainPage-setting": projectNavUiTemplate["mainPage-setting"],
        "mainPage-playerProfile": projectNavUiTemplate["mainPage-playerProfile"],
        "mainPage-entriesHorizontal": projectNavUiTemplate["mainPage-entriesHorizontal"],
        "mainPage-entriesCustom": projectNavUiTemplate["mainPage-entriesCustom"],
    
        "mainPage-isBackgroundShape": projectNavUiTemplate["mainPage-isBackgroundShape"],
        "mainPage-bgShadeName": projectNavUiTemplate["mainPage-bgShadeName"],
        "mainPage-bgPicName": projectNavUiTemplate["mainPage-bgPicName"],
        "mainPage-isListItemShape": projectNavUiTemplate["mainPage-isListItemShape"],
        "mainPage-listItemShadeName": projectNavUiTemplate["mainPage-listItemShadeName"],
        "mainPage-listItemPicName": projectNavUiTemplate["mainPage-listItemPicName"],
        "mainPage-listItemGroupX": projectNavUiTemplate["mainPage-listItemGroupX"],
        "mainPage-listItemGroupY": projectNavUiTemplate["mainPage-listItemGroupY"],
        "mainPage-listItemGroupWidth": projectNavUiTemplate["mainPage-listItemGroupWidth"],
        "mainPage-listItemGroupHeight": projectNavUiTemplate["mainPage-listItemGroupHeight"],
        "mainPage-listItemGap": projectNavUiTemplate["mainPage-listItemGap"],
        "mainPage-listItemGroupFontColor": "",
        "mainPage-listItemGroupFontSize": 10,
        "mainPage-listItemGroupCornerRadius": 0, //TODO
        "mainPage-listItemTextFont": "serif", //TODO
    
        "mainPage-story-isShape": false,
        "mainPage-story-shadeName": "#c0cfe2",
        "mainPage-story-picName": "",
        "mainPage-setting-isShape": false,
        "mainPage-setting-shadeName": "#c0cfe2",
        "mainPage-setting-picName": "",
        "mainPage-playerProfile-isShape": false,
        "mainPage-playerProfile-shadeName": "#c0cfe2",
        "mainPage-playerProfiley-picName": "",
        "mainPage-shop-isShape": false,
        "mainPage-shop-shadeName": "#c0cfe2",
        "mainPage-shop-picName": "",
    
        "mainPage-story-posX": 300,
        "mainPage-story-posY": 100,
        "mainPage-story-width": 100,
        "mainPage-story-height": 60,
        "mainPage-story-fontSize": 10,
        "mainPage-story-fontColor": "",
        "mainPage-setting-posX": 300,
        "mainPage-setting-posY": 220,
        "mainPage-setting-width": 100,
        "mainPage-setting-height": 60,
        "mainPage-setting-fontSize": 10,
        "mainPage-setting-fontColor": "",
        "mainPage-playerProfile-posX": 300,
        "mainPage-playerProfile-posY": 160,
        "mainPage-playerProfile-width": 100,
        "mainPage-playerProfile-height": 60,
        "mainPage-playerProfile-fontSize": 10,
        "mainPage-playerProfile-fontColor": "",
        "mainPage-shop-posX": 300,
        "mainPage-shop-posY": 280,
        "mainPage-shop-width": 100,
        "mainPage-shop-height": 60,
        "mainPage-shop-fontSize": 10,
        "mainPage-shop-fontColor": "",
    
        "mainPage-story-name": "Story",
        "mainPage-setting-name": "Settings",
        "mainPage-playerProfile-name": "Player Profile",
        "mainPage-shop-name": "shop",
    
        "saveloadPage-isBackgroundShape": false,
        "saveloadPage-bgShadeName": "rgb(222, 222, 235)",
        "saveloadPage-bgPicName": "",
        "saveloadPage-isSlotShape": false,
        "saveloadPage-slotShadeName": "#c0cfe2",
        "saveloadPage-slotPicName": "",
        "saveloadPage-slotListIsHorizontal": false,
        "saveloadPage-slotPerPage": 3,
        "saveloadPage-slotRowCount": 2,
        "saveloadPage-slotColCount": 3,
        "saveloadPage-slotPageCount": 10,
        "saveloadPage-slotWidth": 500,
        "saveloadPage-slotHeight": 75,
        "saveloadPage-slotGap": 3, 
        "saveloadPage-groupPosX": 150,
        "saveloadPage-groupPosY": 100,
        
        "settingPage-playSpeed": true,
        "settingPage-bgmVol": true,
        "settingPage-seVol": true,
        "settingPage-entriesHorizontal": false,
        "settingPage-entriesCustom": false,
    
        "settingPage-isBackgroundShape": false,
        "settingPage-bgShadeName": "rgb(222, 222, 235)",
        "settingPage-bgPicName": "",
        "settingPage-isListItemShape": false,
        "settingPage-listItemShadeName": "#c0cfe2",
        "settingPage-listItemPicName": "",
        "settingPage-listItemGroupX": 130,
        "settingPage-listItemGroupY": 60,
        "settingPage-listItemGroupWidth": 550,
        "settingPage-listItemGroupHeight": 75,
        "settingPage-listItemFontSize": 20,
        "settingPage-listItemFontColor": "",
        "settingPage-listItemGap": 30,
        "settingPage-playSpeedName":"Play Speed",
        "settingPage-bgmVolName": "Background Music Volume",
        "settingPage-seVolName": "Sound Effect Volume",
        "settingPage-sliderWidth": 350,
        "settingPage-sliderHeight": 50,
        "settingPage-sliderColor": "#0373fc",
    
        "playerProfilePage-isBackgroundShape": false,
        "playerProfilePage-bgShadeName": "rgb(222, 222, 235)",
        "playerProfilePage-bgPicName": "",
        "playerProfilePage-itemMap": [],
    
        "playerProfilePage-previewingTextObj-isPreviewing": false,
        "playerProfilePage-previewingTextObj-textContent": "",
        "playerProfilePage-previewingTextObj-textItalic": false,
        "playerProfilePage-previewingTextObj-textFontSize": 12,
        "playerProfilePage-previewingTextObj-textFont": "serif",
        "playerProfilePage-previewingTextObj-textColor": "#000000",
        "playerProfilePage-previewingTextObj-posX": 30,
        "playerProfilePage-previewingTextObj-posY": 50,
    
        "playerProfilePage-previewingValueObj-isPreviewing": false,
        "playerProfilePage-previewingValueObj-labelText": "",
        "playerProfilePage-previewingValueObj-valueItemType": "Game Data",
        "playerProfilePage-previewingValueObj-valueItemName": "",
        "playerProfilePage-previewingValueObj-posX": 30,
        "playerProfilePage-previewingValueObj-posY": 70,
        "playerProfilePage-previewingValueObj-textFontSize": 12,
        "playerProfilePage-previewingValueObj-textFont": "serif",
        "playerProfilePage-previewingValueObj-textColor": "#000000",
    
        "playerProfilePage-previewingPicObj-isPreviewing": false,
        "playerProfilePage-previewingPicObj-posX": 50,
        "playerProfilePage-previewingPicObj-posY": 50,
        "playerProfilePage-previewingPicObj-picName": "",
        "playerProfilePage-previewingPicObj-width": 200,
        "playerProfilePage-previewingPicObj-height": 200,
    
        "playerProfilePage-playerProfileNickNameItem-adding": true,
        "playerProfilePage-playerProfileNickNameItem-nicknameLabel": "",
        "playerProfilePage-playerProfileNickNameItem-textContent": "",
        "playerProfilePage-playerProfileNickNameItem-textItalic": false,
        "playerProfilePage-playerProfileNickNameItem-textFontSize": 12,
        "playerProfilePage-playerProfileNickNameItem-textFont": "serif",
        "playerProfilePage-playerProfileNickNameItem-textColor": "#000000",
        "playerProfilePage-playerProfileNickNameItem-posX": 357,
        "playerProfilePage-playerProfileNickNameItem-posY": 300,
    
        "playerProfilePage-playerProfileIconPicItem-adding": true,
        "playerProfilePage-playerProfileIconPicItem-posX": 275,
        "playerProfilePage-playerProfileIconPicItem-posY": 50,
        "playerProfilePage-playerProfileIconPicItem-width": 200,
        "playerProfilePage-playerProfileIconPicItem-height": 200,
        "playerProfilePage-playerProfileIconPicItem-scale": 1,
    
    
    
        "shopPage-isBackgroundShape": false,
        "shopPage-bgShadeName": "rgb(222, 222, 235)",
        "shopPage-bgPicName": "",
        
        "shopPage-listItem-isBackgroundShape": false,
        "shopPage-listItem-bgShadeName": "rgb(222, 222, 235)",
        "shopPage-listItem-bgPicName": "",
        "shopPage-listItem-width": 150,
        "shopPage-listItem-height": 200,
        "shopPage-listItem-gap": 15,
        "shopPage-listItem-groupX": 0,
        "shopPage-listItem-groupY": 30,
        "shopPage-listItem-cornerRadius": 0,
        "shopPage-listItem-buyText": "Buy",   
        "shopPage-listItem-infoText": "Info",
    
        "shopPage-bConfWindow-width": 500,
        "shopPage-bConfWindow-height": 200,
        "shopPage-bConfWindow-textColor": "#000000",
        "shopPage-bConfWindow-bgColor": "pink",
        "shopPage-bConfWindow-cornerRadius": 0,
        "shopPage-bConfWindow-cancelText": "Cancel",    
        "shopPage-bConfWindow-confirmText": "Confirm",    
            
    
        "storyPage-chapterListHorizontal": false,
        "storyPage-isBackgroundShape": false,
        "storyPage-bgShadeName": "rgb(222, 222, 235)",
        "storyPage-bgPicName": "",
        "storyPage-isListItemShape": true,
        "storyPage-listItemShadeName": "#c0cfe2",
        "storyPage-listItemPicName": "",
        "storyPage-listItemGroupX": 120,
        "storyPage-listItemGroupY": 182,
        "storyPage-listItemGroupWidth": 560,
        "storyPage-listItemGroupHeight": 45,
        "storyPage-listItemGap": 25,
        "storyPage-listItemGroupFontColor": "",
        "storyPage-listItemGroupFontSize": 22,
    
        "gsdPage-isBackgroundShape": false,
        "gsdPage-bgShadeName": "rgb(222, 222, 235)",
        "gsdPage-bgPicName": "",
    
        "backButton-width": 50,
        "backButton-height": 50,
        "backButton-isShape": false,
        "backButton-shapeColor": "#c0cfe2",
        "backButton-picName": "",
        "backButton-displayText": "←",
        "backButton-fontSize": 15,
    
        "outWindow-askContent": "Are you sure to quit the story?",
        "outWindow-width": 200,
        "outWindow-height": 90,
        "outWindow-Btn-cornerRadius": 0,
        "outWindow-Btn-color": "grey",
        "outWindow-Btn-textColor": "#FFFFFF",
        "outWindow-Btn-confirmingText": "confirm",
        "outWindow-Btn-cancellingText": "cancel",
        "outWindow-horizontalCentred": true,
        "outWindow-verticalCentred": true,
        "outWindow-windowCornerRadius": 0,
        "outWindow-posX": 200,
        "outWindow-posY": 230,
        "outWindow-isShape": false,
        "outWindow-color": "pink",
        "outWindow-picName": "",


      }; //TODO900 default

      const default_size_direction = "h450_800"; //TODO900 default
      const default_ui_language = "en";


      const projectObj = {
        chapterList: empty_chapter_list,
        chapterNodeMapping: empty_chapter_node_mapping,
        convNodeUiPlanMap: empty_node_ui_plan,
        emu4sets: empty_emu_4sets,
        project_name: addedNewProjName,
        game_data: empty_game_data,
        nav_ui_settings: empty_nav_ui_settings,
        proj_resource_audio: empty_rm_audio,
        proj_resource_visual: empty_rm_visual,
        sizeDirection: default_size_direction,
        type: "project",
        trashed: false,
        ui_language: default_ui_language,

        author_info: addedAuthorInfo,
        project_description: projDedscription,

      };

      //TODO900 emu-data-sets
//TODO900 screen size

                                          console.log("Created project info: "); //TODO testing
                                          console.log(projectObj); //TODO testing

      let alertStr = "Project " + addedNewProjName + " Created!";
      alert(alertStr);

      createProjectVM(username, addedNewProjName, projectObj);
      triggerCreationSubmit();
  
      clearForm();
      
      // ensuring approach: warning if no specified directory/data structure exists when doing any CRUD to cloud db

    }

    function changeProjDescription(event) {
      setProjDescription(event.target.value);
    }

    function changeAuthorInfo(event) {
      const str = event.target.value;
      setAddedAuthorInfo(event.target.value);
    }

    function changeGameScreenSize(event) {
      const input = event.target.value;
      if (event != null && event.target != null && event.target.value!= null) {
   
        if (input === "16:9(horizonal)") {
          //TODO pass into cloud: node info
          console.log("16:9(horizonal)");

        } else if (input === "16:9(vertical)") {
          //TODO pass into cloud: node info
          console.log("16:9(vertical)");

        } else if (input === "4:3(horizonal)") {
          //TODO pass into cloud: node info
          console.log("4:3(horizonal)");

        } else if (input === "4:3(vertical)") {
          //TODO pass into cloud: node info
          console.log("4:3(vertical)");
        } else {
          
          //TODO: show warning if not selected
          console.log("not selected!");
        }
      }
    }

    function clearForm() {
      setAddedNewProjName("");
      setProjDescription("");
      setAddedAuthorInfo("");
    }


    return (
    <div className={!isPart ? "someGrey" : ""} style={{"width": "100%"}}>    
   
    <button
        style={{"marginTop": "20px", "marginRight": "-200px"}}
        onClick={()=>{
          clearForm();
        }}
    >Clear Form</button>


   <br></br><br></br>


        <div style={{"fontWeight": "normal"}}>
          {/* //TODO later: use table, etc. */}
  
          <div className="parallelFrame newProjForm">
            <table 
              className="noBorder">
              <tbody>
                <tr>
                  <td className="noBorder">Project Name: </td>
                  <td className="noBorder">
                      <input 
                        className="newProjectInfoElement" 
                        type="text" 
                        value={addedNewProjName} 
                        onChange={(event)=>{changeProjNameInput(event)}}/>
                  </td>
                </tr>

                <tr>
                  <td className="noBorder">Project Description:</td>
                  <td className="noBorder">
                    <textarea 
                      className="newProjectInfoElement" 
                      rows={5} 
                      cols={36} 
                      value={projDedscription} 
                      onChange={(event)=>{changeProjDescription(event)}}
                    />


                  </td>
                </tr>

                <tr>
                  <td className="noBorder">Author Info:</td>
                  <td className="noBorder">
                    <textarea 
                      className="newProjectInfoElement" 
                      rows={2} 
                      cols={20} 
                      value={addedAuthorInfo} 
                      onChange={(event)=>{changeAuthorInfo(event)}}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
 
      
      
        </div>

        </div>

        <br></br>
       
        <button 
          onClick={()=>{createNewProjectLocal()}}>
        Create Project
        </button>

        {showCancelButton === true && 
        <button
          onClick={()=>{
            cancelAction();
          }}
        >Cancel</button>}

         <br></br>
        <br></br>

{/*
        <p className="plans">TODO: For authors, later do the "@"-like for link to the author space?</p>
        <br></br>

        <br></br>
        <p className="plans"> (Later: [Genre] can be the "tag"s? multiple selection or add new? **Implement Later**)</p>

        <br></br> <br></br>
        <p className="plans">
          Validate user input, and then create a new folder for this new project
          <br></br> TODO: design and construct new-set for each new project: layers, etc.
        </p> */}
{/* //TODO plans */}

  </div>
    );
}