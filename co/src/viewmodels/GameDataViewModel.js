import { getProjectGameData } from '../models/GameDataModel';

export async function getProjectGameDataVM({projectName, uname}) {
    return await getProjectGameData({projectName, uname});
}