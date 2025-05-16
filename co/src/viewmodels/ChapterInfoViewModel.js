import { fetchChapterNodeMapping, updateChapterNodesToCloudData,
    fetchAllChapterList, updateChapterListToCloud,
    addNewChapterFolders,
    addNewOneChapterFolder
    
} from '../models/ChapterInfoModel_Firebase';

const backendFlag = "firebase"; //TODO6000


export async function fetchChapterNodeMappingVM({projectName, currUser}) {
    let mapping = {};

    if (backendFlag === "firebase") {
        mapping =  await fetchChapterNodeMapping({projectName, currUser});
    }

    return mapping;
}

export async function updateChapterNodesToCloudDataVM({projectName, currUser, chapterNodeMappingObj}) {
    if (backendFlag === "firebase") {
        await updateChapterNodesToCloudData({projectName, currUser, chapterNodeMappingObj});
    }
}

export async function fetchAllChapterListVM({projectName, currUser}) {
    let list = {};
    
    if (backendFlag === "firebase") {
        list = await fetchAllChapterList({projectName, currUser});
    }

    return list;
}

export async function updateChapterListToCloudVM({projectName, currUser, chapterListData}) {
    if (backendFlag === "firebase") {
        await updateChapterListToCloud({projectName, currUser, chapterListData});
    }
}

export async function addNewChapterFoldersVM({project, username, chapterKeyList}) {
    if (backendFlag === "firebase") {
        await addNewChapterFolders({project, username, chapterKeyList});
    }

}

export async function addNewOneChapterFolderVM({project, username, chapterKey}) {
    if (backendFlag === "firebase") {
        await addNewOneChapterFolder({project, username, chapterKey});
    }

}