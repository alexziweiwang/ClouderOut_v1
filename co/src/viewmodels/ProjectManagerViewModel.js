import {fetchProjectList} from '../models/ProjectManagerModel';

import db from '../googleCloudConnetions';
import { doc, getDoc, getDocs, collection } from "firebase/firestore"; 

export async function fetchProjectListVM() {
    const res = await fetchProjectList();
    return res;
}


