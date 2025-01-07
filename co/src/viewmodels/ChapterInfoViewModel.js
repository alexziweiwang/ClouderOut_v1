import { fetchChapterNodesData, updateChapterNodesToCloudData,
    fetchAllChapterList, updateChapterListToCloud,

} from '../models/ChapterInfoModel';


export async function fetchChapterNodesDataVM({projectName, currUser}) {
    
    return await fetchChapterNodesData({projectName, currUser});
}

export async function updateChapterNodesToCloudDataVM({projectName, currUser, chapterNodeMappingObj, chapterNodeGridBlocks}) {
    await updateChapterNodesToCloudData({projectName, currUser, chapterNodeMappingObj, chapterNodeGridBlocks});

}

export async function fetchAllChapterListVM({projectName, currUser}) {
    return await fetchAllChapterList({projectName, currUser});
}

export async function updateChapterListToCloudVM({projectName, currUser, chapterListData}) {
    await updateChapterListToCloud({projectName, currUser, chapterListData});
}