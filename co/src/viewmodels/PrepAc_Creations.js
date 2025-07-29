import { emptyConvNodeSinglePieceTemplate, emptyConvNodeUiAllTemplate } from '../components/_dataStructure_DefaultObjects';
import { createProjectVM } from './ProjectManagerViewModel';


export async function prepareForNewChapterMapping_vm (newKey, chapterNodeMapAll, setChapterNodeMapAll, setNodeMapUpdatedSignal, convertNodeMapToGridBlocks, setGridBlocksAll, setGridBlocksUpdatedSignal, updateChapterNodeMappingsToCloud) {
    //update all-node-map

    let nodeMapTemp = chapterNodeMapAll;
    let chapterStartKeyStr = "chapterStart";
    let chapterStartTitleStr = "Chapter Start"

    let chapterEndKeyStr = "chapterEnd";
    let chapterEndTitleStr = "Chapter End";

    let obj = {};
    obj[chapterStartKeyStr] = {
      nodeName: chapterStartTitleStr, 
      row: 2, 
      col: 0, 
      nextNode:"", 
      display: true, 
      nodeType:"*chapterStart*", 
      screenSize:"4:3(horizonal)"
    };
    obj[chapterEndKeyStr] = {
      nodeName: chapterEndTitleStr, 
      row: 2, 
      col: 5, 
      nextNode: "", 
      display: true, 
      nodeType:"*chapterEnd*", 
      screenSize:"4:3(horizonal)"
    };
    nodeMapTemp[newKey] = obj;

    setChapterNodeMapAll(nodeMapTemp);
    setNodeMapUpdatedSignal(true);

    //add all-grid-block with conversion of node-map to node-grid
    let gridAllTemp = convertNodeMapToGridBlocks(nodeMapTemp);
    setGridBlocksAll(gridAllTemp);

    setGridBlocksUpdatedSignal(true);

    //update to cloud
    await updateChapterNodeMappingsToCloud(nodeMapTemp); 


}


export function triggerCreatedNewNode_vm (nodeTypeTemp) {
    
    let nodeObj = {};

    if (nodeTypeTemp === "Conversation") {
      let convNodeArr = [];
      
      const contentItem = {};
      Object.keys(emptyConvNodeSinglePieceTemplate).map((currKey) => {
        contentItem[currKey] = emptyConvNodeSinglePieceTemplate[currKey];
      });

      convNodeArr.push(contentItem);

                                              console.log("new conv-node created!!", contentItem, "\n" ,convNodeArr);
      
      nodeObj["nodeContent"] = convNodeArr;


      const uiItem = {};
      Object.keys(emptyConvNodeUiAllTemplate).map((currKey) => {
          let insideObj = emptyConvNodeUiAllTemplate[currKey]; //read

          let insideWrite = {};

          Object.keys(insideObj).map((insideKey)=>{
              insideWrite[insideKey] = insideObj[insideKey];
          })

          uiItem[currKey] = insideWrite;
      });      
      nodeObj["nodeUISettings"] = uiItem;

    }

    return nodeObj;
  }



  export function prepareForNewProject_vm(
      projList, 
      addedNewProjKey, 
      epp2Template, 
      epa3Template, 
      projectNavUiTemplate, 
      addedAuthorInfo,
      projDedscription,
      addedNewProjName,

    ) {

   // TODO gather list:
      /* 
      project name: addedNewProjName
      project description: projDedscription
      game-data map: empty {}
      author-info field: addedAuthorInfo
      field: type = "project"
      chapter directory: collection "chapters"
      game node directory: default in chapter-management (at least one default node in ecah chapter)
                genre field (later) */
      

      const result = projList.filter((name) => name === addedNewProjKey);
      if (result.length > 0) {
        console.log("warning: duplicate name");
        alert("Project Name already taken ...");
        //if already contains this name
        //don't navigate
        return;
      }
      

                                                          //TODO: author name default: current user-name, then allow adding others
      
      const empty_game_data = {};
      const empty_rm_audio = [];
      const empty_rm_visual = [];
      const empty_chapter_list = {0: ["chapter_placeholder","chapter_placeholder","chapter_placeholder","chapter_placeholder"]};

      const empty_chapter_node_mapping = {
        "placeholder": {}
      };
      const empty_node_ui_plan = {};

      const empty_emu_4sets = {
        "gdt1": {},
        "epp2": {},
        "epa3": {},
        "ess4": {},
        "shp5": {}
      };


      Object.keys(epp2Template).map((currKey) => {
        empty_emu_4sets["epp2"][currKey] = epp2Template[currKey];
      })

      Object.keys(epa3Template).map((currKey) => {
        empty_emu_4sets["epa3"][currKey] = epa3Template[currKey];
      })
      


      let empty_nav_ui_settings = {};
      Object.keys(projectNavUiTemplate).map((currKey) => {
        empty_nav_ui_settings[currKey] = projectNavUiTemplate[currKey];
      }); //TODO900 default
      

      const default_size_direction = "h450_800"; //TODO900 default
      const default_ui_language = "en";


      const projectObj = {
        chapterList: empty_chapter_list,
        chapterNodeMapping: empty_chapter_node_mapping,
        convNodeUiPlanMap: empty_node_ui_plan,
        emu4sets: empty_emu_4sets,
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
        project_title: addedNewProjName,
        project_name: addedNewProjName,


      };

    return projectObj;
  }

export async function createNewProjectToCloud_vm(
  projList, 
  addedNewProjKey, 
  epp2Template, 
  epa3Template, 
  projectNavUiTemplate, 
  addedAuthorInfo,
  projDedscription,

  username,
  backendOption,

  triggerCreationSubmit,
  clearForm,

  addedNewProjName,




  
  ) {
   

      //TODO900 emu-data-sets
    //TODO900 screen size

      let projectObj = prepareForNewProject_vm(
        projList, 
        addedNewProjKey, 
        epp2Template, 
        epa3Template, 
        projectNavUiTemplate, 
        addedAuthorInfo,
        projDedscription,
        addedNewProjName,
        
      );


                                          console.log("Created project info: "); //TODO testing
                                          console.log(projectObj); //TODO testing

      let alertStr = "Project " + addedNewProjName + " Created!";
      alert(alertStr);

      await createProjectVM(
        {
          currUser: username, 
          projectName: addedNewProjKey, 
          projectObj: projectObj,
          bkOption: backendOption
        }
      );
      triggerCreationSubmit();

      clearForm();
      
      // ensuring approach: warning if no specified directory/data structure exists when doing any CRUD to cloud db

}
