import { getProjectGameData, updateGameData } from '../models/GameDataModel';

export async function getProjectGameDataVM({projectName, uname}) {
    const result = await getProjectGameData({projectName, uname});
    return result;
}

export async function updateGameDataVM({projectName, uname, gameData}) {
    await updateGameData({projectName, uname, gameData});
}