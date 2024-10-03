import { getProjectInfo } from '../models/AccountModel';

/**
 * Get profile data
 * 
 * @param {*} uname username
 * @returns profile data
 */
export async function getProjectInfoVM({uname}) {
    const profile = await getProjectInfo({uname});
    return profile;
}