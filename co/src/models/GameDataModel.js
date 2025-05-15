import  {db} from '../GoogleCloudConnections'; //TODO23 database
import { doc, getDoc, getDocs, collection, query, where, updateDoc} from "firebase/firestore"; 


/**
 * Get specific project data 
 * 
 * @param {*} projectName project name
 * @param {*} uname username
 * @returns specific project data of the user
 */
export async function getProjectGameDataDesign({projectName, uname}) {
  if (projectName === "" || projectName === undefined || projectName === "_") {
    return {};
  }
  const projectRef = doc(db, "user_projects", uname, "projects", projectName);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    return {};
  }

  let projectData = {};
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
export async function updateGameDataDesign({projectName, uname, gameData}) {
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

