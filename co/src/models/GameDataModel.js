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
  let dataFetched = [];
  querySnapshot.forEach((doc) => {
    dataFetched = doc.data().game_data;
  });    
  return dataFetched;
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


