import { updateChapterNodesToCloudDataVM } from '../viewmodels/ChapterInfoViewModel';



export async function updateChapterNodeMappingsToCloud_vm(
    nodeMap, 
    gridBlocksAll, 
    projectName, 
    authEmailName, 
    backendOption, 
    setNodeMapUpdatedSignal, 
    setGridBlocksUpdatedSignal
) {
    //TODO transfer gridBlocksAll into non-nested array
    //TODO send nodeMap
  //  if (nodeMapUpdatedSignal === true || gridBlocksUpdatedSignal === true) {

console.log("updating to cloud ... func-step2-all-node-mapping-grid", gridBlocksAll);
console.log("updating to cloud ... func-step2-all-node-mapping-nodemap", nodeMap);


        let i = 0;
        let len = 0;

        let gridMapTemp = {};

        Object.keys(gridBlocksAll).map((currKey) => {
          let currChapterGrid = gridBlocksAll[currKey]; // the 2d-array
          len = currChapterGrid.length;
          i = 0;
          let obj = {};
          while (i < len) {
            obj[i] = currChapterGrid[i];

            i++;
          }
          gridMapTemp[currKey] = obj;

        });

        await updateChapterNodesToCloudDataVM({
            projectName: projectName, 
            currUser: authEmailName,
            chapterNodeMappingObj: nodeMap,
            bkOption: backendOption
        });      
        setNodeMapUpdatedSignal(false);
        setGridBlocksUpdatedSignal(false);

   // }
    
    
    alert("All contents are updated.");

  }

