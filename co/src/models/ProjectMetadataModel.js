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

export async function updateProjectMetadataSingleField({projectName, currUser, fieldName, contentValue}) {
    const projRef = doc(db, "user_projects", currUser, "projects", projectName);
    const projectSnap = await getDoc(projRef);
  
    if (!projectSnap.exists()) {
      return;
    }

    await updateDoc(projectRef, {
        fieldName: contentValue
    });

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