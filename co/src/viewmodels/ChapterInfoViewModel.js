import { fetchChapterData, updateChapterToCloudData } from '../models/ChapterInfoModel';


export async function fetchChapterDataVM({projectName, currUser}) {
    
    return await fetchChapterData({projectName, currUser});
}

export async function updateChapterToCloudDataVM({projectName, currUser, chapterNodeMappingObj, chapterNodeGridBlocks}) {
    await updateChapterToCloudData({projectName, currUser, chapterNodeMappingObj, chapterNodeGridBlocks});

}