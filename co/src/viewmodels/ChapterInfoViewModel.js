import { fetchChapterNodesData, updateChapterNodesToCloudData,
    fetchAllChapterList, updateChapterListToCloud,
    addNewChapterFolders,
    
} from '../models/ChapterInfoModel';


export async function fetchChapterNodesDataVM({projectName, currUser}) {
    
    return await fetchChapterNodesData({projectName, currUser});
}

export async function updateChapterNodesToCloudDataVM({projectName, currUser, chapterNodeMappingObj}) {
    await updateChapterNodesToCloudData({projectName, currUser, chapterNodeMappingObj});

}

export async function fetchAllChapterListVM({projectName, currUser}) {
    return await fetchAllChapterList({projectName, currUser});
}

export async function updateChapterListToCloudVM({projectName, currUser, chapterListData}) {
    await updateChapterListToCloud({projectName, currUser, chapterListData});
}

export async function addNewChapterFoldersVM({project, username, chapterKeyList}) {
    await addNewChapterFolders({project, username, chapterKeyList});
}