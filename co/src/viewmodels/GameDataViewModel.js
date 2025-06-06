import { getProjectGameDataDesign, updateGameDataDesign } from '../models/GameDataModel_Firebase';


/**
 * Get project data, call cloud-db related model function
 * 
 * @param {*} projectName project name
 * @param {*} uname username
 * @returns 
 */
export async function getProjectGameDataDesignVM({projectName, uname, bkOption}) {
    let result = {};

    if (bkOption === "firebase") {
        return await getProjectGameDataDesign({projectName, uname});
    }

    return result;
}

/**
 * Update project data, call cloud-db related model function
 * 
 * @param {*} projectName project name
 * @param {*} uname username
 * @param {*} gameData game data
 */
export async function updateGameDataDesignVM({projectName, uname, gameData, bkOption}) {

    if (bkOption === "firebase") {
        await updateGameDataDesign({projectName, uname, gameData});
    }
    
}
