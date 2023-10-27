import { getProjectGameData } from '../models/AccountModel';

export async function getProjectGameDataVM({uname}) {
    const profile = await getProjectGameData({uname});
    return profile;
}