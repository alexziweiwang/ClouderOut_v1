import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 
import { placeholderNameDefault } from './_dataStructure_DefaultObjects';

/*
List of functions:


function fetchProjectList(currUser
function revertProject(projectToRevert, currUser)
function deleteProject(projectToDelete, currUser)
function createProject(currUser, projectName, projectObj)
function updateProjectUILang({projectName, currUser, selectedUILang})
function fetchProjectUILang({projectName, currUser})
function updateProjectNavigationSettings({projectName, currUser, dataObj})
fetchProjectNavigationSettings({projectName, currUser})
function saveConvNodeUiPlan({projectName, currUser, updatedAllPlans, nodeType})
function fetchConvNodeUiAllPlans({projectName, currUser, nodeType})
function addNewAccountFolder({userId, username})


*/


/**
 * Get the list of project names of the user
 * 
 * @param {*} currUser username
 * @returns list of project names
 */
export async function fetchProjectList(currUser) {
//firebase
                          console.log("*from cloud*: model-func - fetch project list ...", currUser);
  
    const docRef = doc(db, "user_projects", currUser);
  
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {

      console.log("\t\t??? !docSnap.exists()");


      return;
    }

    const q = query(collection(docRef, "projects")); // new version

      const querySnapshot = await getDocs(q);
      let projectArr = [];
      querySnapshot.forEach((doc) => {
        projectArr.push(doc);
      });
      return projectArr;
}



/**
 * Revert deleted proejct to using
 * 
 * @param {*} projectToRevert project name
 * @param {*} currUser username
 * @returns void
 */
export async function revertProject({projectToRevert, currUser}) {
//firebase  
    const projRef = doc(db, "user_projects", currUser, "projects", projectToRevert);

    await updateDoc(projRef, {trashed: false});  
}

/**
 * Set specified project to deleted
 * 
 * @param {*} projectToDelete project name
 * @param {*} currUser username
 * @returns void
 */
export async function deleteProject({projectToDelete, currUser}) {
//firebase
  const projRef = doc(db, "user_projects", currUser, "projects", projectToDelete);

  await updateDoc(projRef, {trashed: true});
  
}


//firebase
export async function createProject({currUser, projectName, projectObj}) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);

  // let projObjTemp = projectObj;
  // projObjTemp = {...projObjTemp, ui_language: 'en'}; //default editor-UI-language

  await setDoc(projRef, projectObj);

//TODO199
                                                                    //const placeholder = "p laceholder123456789___###___###___##";
  const placeholderContent = {};
  await setDoc(projRef, projectObj).then(() => {
    setDoc(doc(db, "user_projects", currUser, "projects", projectName, "allNodes", placeholderNameDefault), 
    placeholderContent)
  }).catch((e) => {
    console.log(e)
  });

      //TODO199: change sturcture: chapters-level should be the last collection-level: 



}

//firebase
export async function updateProjectUILang({projectName, currUser, selectedUILang}) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);

  await updateDoc(projRef, {ui_language: selectedUILang});
}


//firebase
export async function fetchProjectUILang({projectName, currUser}) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);
  const projSnap = await getDoc(projRef);

  if (!projSnap.exists()) {
    return;
  }

  let projectData = projSnap.data();

  return projectData.ui_language;
}


//firebase
export async function updateProjectNavigationSettings({projectName, currUser, dataObj}) {
  //TODO: update nav-ui-settings from dataObj
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);

  await updateDoc(projRef, 
    {nav_ui_settings: dataObj
  });



}

//firebase
export async function fetchProjectNavigationSettings({projectName, currUser}) {
  let dataObj = {};
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);
  const projSnap = await getDoc(projRef);

  if (!projSnap.exists()) {
    return {};
  }

  if (projSnap.data() === undefined) {
    return {};
  }

  dataObj = projSnap.data().nav_ui_settings;

  return dataObj;
}


//firebase
export async function saveConvNodeUiPlan({projectName, currUser, updatedAllPlans, nodeType}) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);


  console.log("cloud func saving conv-node-ui plan: ", updatedAllPlans);

  if (nodeType === "Conversation") {
    await updateDoc(projRef, 
      {"convNodeUiPlanMap": updatedAllPlans
    });
  }

}

//firebase
export async function fetchConvNodeUiAllPlans({projectName, currUser, nodeType}) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);
  const projSnap = await getDoc(projRef);

  if (!projSnap.exists()) {
    return -1;
  }

  let dataObj = {};
  if (nodeType === "Conversation") {
    dataObj = projSnap.data().convNodeUiPlanMap;
  }

  return dataObj;


}


//firebase
export async function addNewAccountFolder({userId, username, userEmailAddr}) {
                  //Note: userId is the email-address that converted to string with "_"

                                console.log("_firebase_   add-new-account-folders for: [", username, "]");



      await setDoc(
        doc(db, "user_projects", userId), 
        {
          "default_ui_language": "en",
          "filename_records": [],
          "introduction": "",
          "username": username,
          "nickname": username,
          "phoneNumber": "",
          "emailAddr": userEmailAddr,
          "activated": true,

        });


                                            //  let proj_folder_placeholder = "p laceholder123456789___###___###___##";
      await setDoc(
        doc(db, "user_projects", userId, 'projects', placeholderNameDefault), 
        {}
      );
        

     
      //TODO1060 test
}

export async function fetchProjectAllMetadata({projectName, currUser}) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);
  const projSnap = await getDoc(projRef);

  if (!projSnap.exists()) {
    return {"invalid key": "invalid value"};
  }

  let projectData = projSnap.data();

  return projectData;

}