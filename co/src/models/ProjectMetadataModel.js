import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 

export async function fetchProjectAllMetadata({projectName, currUser}) {
    const projRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projSnap = await getDoc(projRef);
  
    if (!projSnap.exists()) {
      return {"invalid key": "invalid value"};
    }
  
    let projectData = projSnap.data();
  
    return projectData;
  
}

export async function fetchProjectMetadataSingleField({projectName, currUser, fieldName}) {
    const docRef = doc(db, "user_projects", currUser, "projects", projectName);
    const docSnap = await getDoc(docRef);
  
    if (!docSnap.exists()) {
      return;
    }

    let projectData = docSnap.data();

    let item = "";
    switch (fieldName){

        case "author_info":
            item = projectData.author_info;
            break;

        case "chapterList":
            item = projectData.chapterList;
            break;
            
        case "chapterNodeMapping":
            item = projectData.chapterNodeMapping;
            break;  

        case "convNodeUiPlanMap":
            item = projectData.convNodeUiPlanMap;
            break;

        case "emu4sets":
            item = projectData.emu4sets;
            break;

        case "game_data":
            item = projectData.game_data;
            break;   
            
        case "nav_ui_settings":
            item = projectData.nav_ui_settings;
            break;          
            
        case "proj_resource_audio":
            item = projectData.proj_resource_audio;
            break;   

        case "proj_resource_visual":
            item = projectData.proj_resource_visual;
            break;  

        case "project_description":
            item = projectData.project_description
            break;  

        case "project_name":
            item = projectData.project_description;
            break;  

        case "project_title":
            item = projectData.project_title;
            break;  
        
        case "sizeDirection":
            item = projectData.sizeDirection;
            break;  

        case "trashed":
            item = projectData.trashed;
            break;     

        case "type":
            item = projectData.type;
            break;             
            
        case "ui_language":
            item = projectData.ui_language;
            break;  

        default:
            return "default: not fetched";
        }

        return item;
}

export async function updateProjectMetadataSingleField({projectName, currUser, fieldName, contentValue}) {
    const docRef = doc(db, "user_projects", currUser, "projects", projectName);
    const docSnap = await getDoc(docRef);
  

    if (!docSnap.exists()) {
      return;
    }

    let outObj = {};
    switch (fieldName){

        case "author_info":
            outObj = {"author_info": contentValue};
            break;

        case "chapterList":
            outObj = {"chapterList": contentValue};
            break;
            
        case "chapterNodeMapping":
            outObj = {"chapterNodeMapping": contentValue};
            break;  

        case "convNodeUiPlanMap":
            outObj = {"convNodeUiPlanMap": contentValue};
            break;

        case "emu4sets":
            outObj = {"emu4sets": contentValue};
            break;

        case "game_data":
            outObj = {"game_data": contentValue};
            break;   
            
        case "nav_ui_settings":
            outObj = {"nav_ui_settings": contentValue};
            break;          
            
        case "proj_resource_audio":
            outObj = {"proj_resource_audio": contentValue};
            break;   

        case "proj_resource_visual":
            outObj = {"proj_resource_visual": contentValue};
            break;  

        case "project_description":
            outObj = {"project_description": contentValue};
            break;  

        case "project_name":
            outObj = {"project_name": contentValue};
            break;  

        case "project_title":
            outObj = {"project_title": contentValue};
            break;  
        
        case "sizeDirection":
            outObj = {"sizeDirection": contentValue};
            break;  

        case "trashed":
            outObj = {"trashed": contentValue};
            break;     

        case "type":
            outObj = {"type": contentValue};
            break;             
            
        case "ui_language":
            outObj = {"ui_language": contentValue};
            break;  

        default:
            return;
        }

    await updateDoc(docRef, outObj);

    //TODO test
  
}

    //example obj(for metadata): 
                                // author_info:  ""
                                // chapterList: {0: Array(4), 1: Array(4), 2: Array(4)}
                                // chapterNodeMapping:  {placeholder: {…}, chapter1: {…}, chapter2: {…}}
                                // convNodeUiPlanMap:  {}
                                // emu4sets:  {shp5: {…}, ess4: {…}, epp2: {…}, gdt1: {…}, epa3: {…}}
                                // game_data:  {health: {…}}
                                // nav_ui_settings:  {outWindow-Btn-textColor: '#FFFFFF', mainPage-playerProfile-posX: 300, shopPage-bConfWindow-confirmText: 'Confirm', settingPage-sliderColor: '#0373fc', mainPage-shop-isShape: false, …}
                                
                                // proj_resource_audio:  [] //array
                                // proj_resource_visual:  [{…}] //array
                                // project_description:  ""
                                // project_name:  "a6_p2"
                                // project_title:  "a6_p2"

                                // sizeDirection:  "h450_800"
                                // trashed:  false
                                // type:  "project"
                                // ui_language: "chn"