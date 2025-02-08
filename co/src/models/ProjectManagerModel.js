import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, getDocs, addDoc, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 

/*
List of functions:


function fetchProjectList(currUser
function revertProject(projectToRevert, currUser)
function deleteProject(projectToDelete, currUser)
function createProject(currUser, projectName, projectObj)

*/


/**
 * Get the list of project names of the user
 * 
 * @param {*} currUser username
 * @returns list of project names
 */
export async function fetchProjectList(currUser) {

                          console.log("*from cloud*: model - fetch project list ...");
  
  const docRef = doc(db, "user_projects", currUser);
 
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
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
export async function revertProject(projectToRevert, currUser) {
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
export async function deleteProject(projectToDelete, currUser) {

  const projRef = doc(db, "user_projects", currUser, "projects", projectToDelete);

  await updateDoc(projRef, {trashed: true});
  
}

export async function createProject(currUser, projectName, projectObj) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);

  let projObjTemp = projectObj;
  projObjTemp = {...projObjTemp, ui_language: 'en'}; //default editor-UI-language

  await setDoc(projRef, projObjTemp);


  const placeholder = "chapter0";
  await setDoc(projRef, projObjTemp).then(() => {
    setDoc(doc(db, "user_projects", currUser, "projects", projectName, "chapters", placeholder), 
    {})
  }).catch((e) => {
    console.log(e)
  })
}


export async function updateProjectUILang({projectName, currUser, selectedUILang}) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);

  await updateDoc(projRef, {ui_language: selectedUILang});
}

export async function fetchProjectUILang({projectName, currUser}) {
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);
  const projSnap = await getDoc(projRef);

  if (!projSnap.exists()) {
    return;
  }

  let projectData = projSnap.data();

  return projectData.ui_language;
}

export async function updateProjectNavigationSettings({projectName, currUser, dataObj}) {
  //TODO: update nav-ui-settings from dataObj
  const projRef = doc(db, "user_projects", currUser, "projects", projectName);

  await updateDoc(projRef, 
    {nav_ui_settings: dataObj
  });



}

export async function fetchProjectNavigationSettings({projectName, currUser}) {
  let dataObj = {};
//TODO

  return dataObj;
}