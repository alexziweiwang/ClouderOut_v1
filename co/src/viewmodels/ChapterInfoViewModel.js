import { fetchChapterNodeMapping, updateChapterNodesToCloudData,
    fetchAllChapterList, 
    addNewOneChapterFolder
    
} from '../models/ChapterInfoModel_Firebase';


export async function fetchChapterNodeMappingVM({projectName, currUser, bkOption}) {
    let mapping = {};

    if (bkOption === "firebase") {
        mapping =  await fetchChapterNodeMapping({projectName, currUser});
    }

    return mapping;
}

export async function updateChapterNodesToCloudDataVM({projectName, currUser, chapterNodeMappingObj, bkOption}) {
    if (bkOption === "firebase") {
        await updateChapterNodesToCloudData({projectName, currUser, chapterNodeMappingObj});
    }

}

export async function fetchAllChapterListVM({projectName, currUser, bkOption}) {
    let list = {};
    
    if (bkOption === "firebase") {
        list = await fetchAllChapterList({projectName, currUser});
    }

    return list;
}

export async function addNewOneChapterFolderVM({project, username, chapterKey, bkOption}) {
    if (bkOption === "firebase") {
        await addNewOneChapterFolder({project, username, chapterKey});
    }

}