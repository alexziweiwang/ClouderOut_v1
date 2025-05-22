import { 
    getProfileInfo, 
    getUserDefaultUILang, 
    updateUserDefaultUILang, 
} from '../models/AccountModel_Firebase';


/**
List of functions:

function getProfileInfoVM({uname})

*/

/**
 * Get profile data
 * 
 * @param {*} uname username
 * @returns profile data
 */
export async function getProfileInfoVM({uname, bkOption}) {
    const profile = {};
    
    if (bkOption === "firebase") {
        profile = await getProfileInfo({uname});
    }
    return profile;
}

// export async function getUserDefaultUILangVM({uname}) {
//     let res = {}
    
//     if (backendFlag === "firebase") {
//         res = await getUserDefaultUILang({uname});
//     }

//     return res;
// }

// export async function updateUserDefaultUILangVM({uname, newUILang}) {
//     if (backendFlag === "firebase") {
//         await updateUserDefaultUILang({uname, newUILang});
//     }
// }
