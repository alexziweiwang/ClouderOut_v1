import  {db} from '../GoogleCloudConnections';
import { doc, getDoc, getDocs, setDoc, collection, query, where, updateDoc } from "firebase/firestore"; 

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

//TODO10 refactor for rm-folder direct-access
  const q = query(collection(docRef, "projects"), where("type", "!=", "rm"));
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
  // TODO go to currUser's directory
  // TODO create a directory of projectName
  // TODO save any other info in projectObj

  // TODO create default directories: chapters

  const projRef = doc(db, "user_projects", currUser, "projects", projectName);

  await setDoc(projRef, projectObj);

  const chapterHead = "chapter0";
  const chapterCollRef = doc(db, "user_projects", currUser, "projects", projectName, "chapters", chapterHead);



                console.log("Created project = ", projectObj);//TODO testing
}