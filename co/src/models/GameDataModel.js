import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection, query, where, updateDoc} from "firebase/firestore"; 


/**
 * Get specific project data 
 * 
 * @param {*} projectName project name
 * @param {*} uname username
 * @returns specific project data of the user
 */
export async function getProjectGameData({projectName, uname}) {
  const docRef = doc(db, "user_projects", uname);
  const userDirSnap = await getDoc(docRef);

  if (!userDirSnap.exists()) {
    return;
  }
  if (projectName === "" || projectName === undefined) {
    return;
  }

  const q = query(collection(docRef, "projects"), where("project_name", "==", projectName));
  const querySnapshot = await getDocs(q);
  let projectData = [];
  querySnapshot.forEach((doc) => {
    projectData = doc.data().game_data;
  });    
  return projectData;
}

/**
 * Update game data by replacing with provided data
 * 
 * @param {*} projectName project name
 * @param {*} uname username
 * @param {*} gameData game data to update
 * @returns void
 */
export async function updateGameData({projectName, uname, gameData}) {
  const userDirRef = doc(db, "user_projects", uname);
  const userDirSnap = await getDoc(userDirRef);

  if (!userDirSnap.exists()) {
    return;
  }
  if (projectName === "" || projectName === undefined) {
    return;
  }

  const projectRef = doc(userDirRef, "projects", projectName);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    return;
  }
  /* current document contains "game_data" field */
  await updateDoc(projectRef, {
    "game_data": gameData
  });
}

export async function getChapterData({projectName, uname, chapterName}) {
  //TODO fetch chapter data in the specified project of that user
  
  console.log("projectName, uname, chapterName:", projectName, uname, chapterName); //TODO test

  const docRef = doc(db, "user_projects", uname);
  const userDirSnap = await getDoc(docRef);

  if (!userDirSnap.exists()) {
    return;
  }
  if (projectName === "" || projectName === undefined) {
    return;
  }

  const projecRef = collection(docRef, projectName);
  const q = query(collection(projecRef, "chapters"), where("chapter_name", "==", chapterName));
              //TODO later: need to add"chapter_name" after creating a new chapter
  const querySnapshot = await getDocs(q);
  let projectData = [];
  querySnapshot.forEach((doc) => {
    projectData = doc.data();
  }); 

  //TODO continue for chapter title in this project folder
  

  console.log("getChapterData", projectData); //TODO test
}