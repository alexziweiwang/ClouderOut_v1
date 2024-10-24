import { getProjectGameData, updateGameData, getChapterData } from '../models/GameDataModel';

/**
 * Get project data, call cloud-db related model function
 * 
 * @param {*} projectName project name
 * @param {*} uname username
 * @returns 
 */
export async function getProjectGameDataVM({projectName, uname}) {
    const result = await getProjectGameData({projectName, uname});
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
    await updateGameData({projectName, uname, gameData});
}

export async function getChapterDataVM({projectName, uname, chapterName}) {
    await getChapterData({projectName, uname, chapterName});
}