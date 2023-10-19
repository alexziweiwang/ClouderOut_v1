import db from '../googleCloudConnetions';

export async function fetchProjectList() {
    const userProjects = db.collection('user_projects');
    const doc = await userProjects.get();
    if (!doc.exists) {
      console.log('on cloud db: document not found');
    } else {
      console.log('on cloud db: data is ... ', doc.data());
    }
}