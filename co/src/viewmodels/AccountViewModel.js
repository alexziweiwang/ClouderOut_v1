import { getProjectInfo } from '../models/AccountModel';


/**
List of functions:

function getProjectInfoVM({uname})

*/

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