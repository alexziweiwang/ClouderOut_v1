import { getProjectGameData } from '../models/GameDataModel';

export async function getProjectGameDataVM({projectName, uname}) {
    const result = await getProjectGameData({projectName, uname});
    return result;
}