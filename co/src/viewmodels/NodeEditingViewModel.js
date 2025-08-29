import { singleNodeGetFromCloud, singleNodeWriteToCloud, createNewNodeFolders } from '../models/NodeEditingModel_Firebase';


export async function singleNodeWriteToCloudVM({project, username, chapterKey, nodeKey, dataObj, bkOption}) {
    if (bkOption === "firebase") {
        await singleNodeWriteToCloud({project, username, chapterKey, nodeKey, dataObj});
    }

}

export async function singleNodeGetFromCloudVM({project, username, chapterKey, nodeKey, bkOption}) {
    let res = {};

    if (bkOption === "firebase") {
        res = await singleNodeGetFromCloud({project, username, chapterKey, nodeKey});
    }
    
    return res;
}

export async function createNewNodeFoldersVM({project, username, nodeList, bkOption}) {
    if (bkOption === "firebase") {
        await createNewNodeFolders({project, username, nodeList});
    }

          /* for each item inside pendingNewNodeList:
                let pair = {
                    "longKey": longKey,
                    "objContent": genObjBothParts
                }
          */
}

// export async function addNewNodeFoldersVM({project, username, nodeList, chapterKey, bkOption}) {

//     if (bkOption === "firebase") {
//         await addNewNodeFolders({project, username, nodeList, chapterKey});
//     }

// }
