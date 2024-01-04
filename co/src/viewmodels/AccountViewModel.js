import { getProjectGameData } from '../models/AccountModel';

/**
 * Get profile data
 * 
 * @param {*} uname username
 * @returns profile data
 */
export async function getProjectGameDataVM({uname}) {
    const profile = await getProjectGameData({uname});
    return profile;
}