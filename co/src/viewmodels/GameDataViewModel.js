import { getProjectGameDataDesign, updateGameDataDesign } from '../models/GameDataModel';

/**
 * Get project data, call cloud-db related model function
 * 
 * @param {*} projectName project name
 * @param {*} uname username
 * @returns 
 */
export async function getProjectGameDataDesignVM({projectName, uname}) {
    const result = await getProjectGameDataDesign({projectName, uname});
    return result;
}

/**
 * Update project data, call cloud-db related model function
 * 
 * @param {*} projectName project name
 * @param {*} uname username
 * @param {*} gameData game data
 */
export async function updateGameDataDesignVM({projectName, uname, gameData}) {
    await updateGameDataDesign({projectName, uname, gameData});
}
