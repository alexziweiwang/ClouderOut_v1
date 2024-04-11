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
  if (projectName === "" || projectName === undefined) {
    return;
  }
  const projectRef = doc(db, "user_projects", uname, "projects", projectName);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    return;
  }

  let projectData = [];
  projectData = projectSnap.data().game_data; 

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
  const projectRef = doc(db, "user_projects", uname, "projects", projectName);
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
  
  if (projectName === "" || projectName === undefined) {
    return;
  }

              //TODO later: need to add"chapter_name" after creating a new chapter
  const chapterRef = doc(db, "user_projects", uname, "projects", projectName, "chapters", chapterName);
  const chapterSnap = await getDoc(chapterRef);
  if (!chapterSnap.exists()) {
    return;
  }

  let projectData = chapterSnap.data();
 
  console.log("game-data-model(cloud): getChapterData", projectData); //TODO test

  return projectData;
}