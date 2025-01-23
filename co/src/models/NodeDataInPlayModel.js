export async function fetchNodeData({projectName, uname, chapterKey, nodeKey}) {

    let obj = {};

    const projectNodeRef = doc(db, "user_projects", uname, "projects", projectName, "chapters", chapterKey, "nodes", nodeKey);
    const projectNodeSnap = await getDoc(projectNodeRef);
  
                                  console.log("model-func-fetchNodeData-  ", dataObj, " for node - ", nodeKey);
    if (!projectNodeSnap.exists()) {
      return "node-not-exist";
    }

    let nodeContentData = projectNodeSnap.data().nodeContent;
    let nodeUIData = projectNodeSnap.data().nodeUISettings;

    obj[nodeContent] = nodeContentData;
    obj[nodeUISettings] = nodeUIData;

            console.log("node all info = ", obj);


    return obj;

}