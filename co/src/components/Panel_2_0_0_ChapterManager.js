import * as React from 'react';
import { useState, useEffect } from 'react';
import langDictionary from './_textDictionary';

export default function ChapterManager({
  updateChapterList_gm, 
  
  updateChosenChapterItem, 
 
  prepareForNewChapterMapping, 
  
  getChapterList,


  triggerCreatedNewChapter,
  
  sendOutIsCollapsed,

  getUILanguage,
  
}) {



  // [ ] 1.create a chapter
  // [ ] 2.revert a deleted chapter
  // [ ] 3.change chapter title/note
  // [ ] 4.delete a node


//TODO3: game-maker level: all chapter's data (each chapter's node list)
//TODO3: add getchapterList (from caller) : "getChapterList()"

  const [languageCodeTextOption, setLanguageCodeTextOption] = useState('en'); //TODO16

  let textDictItem = langDictionary[languageCodeTextOption];
  let textDictItemDefault = langDictionary["en"];


  let saveText = textDictItem.saveText !== undefined ?
        textDictItem.saveText
        : textDictItemDefault.saveText;

  let cancelText = textDictItem.cancelText !== undefined ?
        textDictItem.cancelText
        : textDictItemDefault.cancelText;

  let deleteText = textDictItem.deleteText !== undefined ?
        textDictItem.deleteText
        : textDictItemDefault.deleteText;

  let addText = textDictItem.addText !== undefined ?
        textDictItem.addText
        : textDictItemDefault.addText;

  let collapseText = textDictItem.collapseText !== undefined ?
        textDictItem.collapseText
        : textDictItemDefault.collapseText;

  let revertText = textDictItem.revertText !== undefined ?
        textDictItem.revertText
        : textDictItemDefault.revertText;

  let chapterManagementText = textDictItem.chapterManagementText !== undefined ?
        textDictItem.chapterManagementText
        : textDictItemDefault.chapterManagementText;

  let chapterUniqueIDText = textDictItem.chapterUniqueIDText !== undefined ?
        textDictItem.chapterUniqueIDText
        : textDictItemDefault.chapterUniqueIDText;

  let chapterTitleText = textDictItem.chapterTitleText !== undefined ?
        textDictItem.chapterTitleText
        : textDictItemDefault.chapterTitleText;

  let newWordText = textDictItem.newWordText !== undefined ?
        textDictItem.newWordText
        : textDictItemDefault.newWordText;

  let noteText = textDictItem.noteText !== undefined ?
        textDictItem.noteText
        : textDictItemDefault.noteText;

  let chapterText = textDictItem.chapterText !== undefined ?
        textDictItem.chapterText
        : textDictItemDefault.chapterText;

  let unChangeableOnceSubmittedText = textDictItem.unChangeableOnceSubmittedText !== undefined ?
        textDictItem.unChangeableOnceSubmittedText
        : textDictItemDefault.unChangeableOnceSubmittedText;

  let editableLaterText = textDictItem.editableLaterText !== undefined ?
        textDictItem.editableLaterText
        : textDictItemDefault.editableLaterText;

  let renameText = textDictItem.renameText !== undefined ?
        textDictItem.renameText
        : textDictItemDefault.renameText;

  let deleteSText = textDictItem.deleteSText !== undefined ?
        textDictItem.deleteSText
        : textDictItemDefault.deleteSText;

  let emptyNotePlaceHolder = textDictItem.emptyNotePlaceHolder !== undefined ?
        textDictItem.emptyNotePlaceHolder
        : textDictItemDefault.emptyNotePlaceHolder;

  let noDeletedChapterText = textDictItem.noDeletedChapterText !== undefined ?
        textDictItem.noDeletedChapterText
        : textDictItemDefault.noDeletedChapterText;

  let revertDeletedChapterText = textDictItem.revertDeletedChapterText !== undefined ?
        textDictItem.revertDeletedChapterText
        : textDictItemDefault.revertDeletedChapterText;
  


  //TODO other text on UI - localization

  const [isCollapse, setIsCollapse] = useState(false);

  const [newChapterKeyInput, setNewChapterKeyInput] = useState("");
  const [newChapterTitleInput, setNewChapterTitleInput] = useState("");
  const [newChapterNoteInput, setNewChapterNoteInput] = useState("");

  const [editingChapterTitle, setEditingChapterTitle] = useState("");
  const [editingChapterNote, setEditingChapterNote] = useState("");

  const [editedLine, setEditedLine] = useState(-1);
  const [selectedChptKey, setSelectedChpt] = useState("");
  const [isAddNewChpater, setIsAddNewChapter] = useState(false);
  const [deletedLocalList, setDeletedLocalList] = useState([]);
  const [isRevertingChapter, setIsRevertingChapter] = useState(false);

  const [createdNewChapterList, setCreatedNewChapterList] = useState([]);

  const [chapterList, setchapterList] = useState(undefined);

  const [firstTimeEnter, setFirstTimeEnter] = useState(true);
  useEffect(() => {

                  console.log("\t\t\t\tchapter-manager rendered once.");

    if (firstTimeEnter === true) {
      if (chapterList === undefined) {

        loadListFromOuter();
        
        setFirstTimeEnter(false);
      }
    } 


    let UILang = getUILanguage();
    setLanguageCodeTextOption(UILang);


  });

  function loadListFromOuter() {
        let chapterListTemp = getChapterList(); // current-version(not necessarily newest from cloud)
        //   console.log("chp-mgr, chapter list  = ", chapterListTemp);
        setchapterList(chapterListTemp);
        
        
        //prepare for deleted-list as well
        if (chapterListTemp != chapterList) {
          makeDeletedList(chapterListTemp);
        } 

  }

  function makeDeletedList(chapterInfo) {
//console.log("make deleted list: before = ", chapterInfo);

    let i = 0;
    let tempList = [];
    for (; i < chapterInfo.length; i++) {
      if (chapterInfo[i][2] === "delete") {
        tempList.push(chapterInfo[i]);
      }
    }
    //TODO50


//console.log("make deleted list: after = ", tempList);

    setDeletedLocalList(tempList);    

  }
  
  function triggerChapterChangeBothInOut(tempchapterList) {
    updateChapterList_gm(tempchapterList);
    setchapterList(tempchapterList);
  }

  function changeChapterTitle(index, newTitle) {
    //action 03
    let tempchapterList = chapterList;
    tempchapterList[index][1] = newTitle;

    triggerChapterChangeBothInOut(tempchapterList);

    setEditingChapterTitle("");
  }

  function changeChapterNote(index, note) {
    //action 03
    let tempchapterList = chapterList;
    tempchapterList[index][3] = note;

    triggerChapterChangeBothInOut(tempchapterList);

    setEditingChapterNote("");
  }


  function addNewChapterItem() { //add a new chapter - important
    //action 01
    let userInputChpKey = newChapterKeyInput;

    //1. not allowing empty chapter key or chapter title
    if (userInputChpKey.length < 1 || newChapterTitleInput.length < 1) {
      alert("Can not have blank chapter unique-ID or empty chapter title");
      return;
    }

    userInputChpKey = userInputChpKey.replace(/ /g,"_");
    //replace spaces in the key-string


    //2. not allowing duplicate chapter key
    let i = 0;
    for (; i < chapterList.length; i++) {
      let tempKey = chapterList[i][0];
      if (userInputChpKey === tempKey) {
        alert("Can not use duplicate chapter unique-ID.");
        return;
      }
    }

    let tempchapterList = chapterList;
                      console.log("\t\tadding a new chapter: ", chapterList);

    let line = [userInputChpKey, newChapterTitleInput, "display", newChapterNoteInput]; //TODO3
    tempchapterList.push(line);

    // add current chapter-key into created-key-list
    triggerCreatedNewChapter(line);


    triggerChapterChangeBothInOut(tempchapterList);
    makeDeletedList(tempchapterList);

    prepareForNewChapterMapping(userInputChpKey);

    setNewChapterKeyInput("");
    setNewChapterTitleInput("");

    let newListTemp = getChapterList();
    setchapterList(newListTemp);

  }

  function hideChapter(index) {
    //action 04
    let askStr = "Are you sure to delete the chapter " + chapterList[index][1] + "?";
    let response = window.confirm(askStr);
    if (response) {
      let deleteListTemp = deletedLocalList;
      deleteListTemp.push(chapterList[index]);
  
      let tempchapterList = chapterList;
      tempchapterList[index][2] = "delete";


      triggerChapterChangeBothInOut(tempchapterList);

      makeDeletedList(tempchapterList);

      setSelectedChpt("");
    }

  }
  
  function handleSelectChapterKey(item) {
    if (selectedChptKey === item[0]) {
      setSelectedChpt("");
    } else {
      setSelectedChpt(item[0]);
      updateChosenChapterItem(item[0]); // sends chapter-key info
    }
  }

  function revertChapter(keyStr) {
    //action 02
    let i = 0;
    let tempchapterList = chapterList;
    let tempDeletedLocalList = [];

    for (; i < tempchapterList.length; i++) {
      if (tempchapterList[i][0] === keyStr) {
        tempchapterList[i][2] = "display"; //not including this in the updated-deleted-list
        setSelectedChpt(i);
      } else {
        if (tempchapterList[i][2] === "delete") {
          tempDeletedLocalList.push(tempchapterList[i]);
        }
      }
    }

    // update deletedLocalList
    setDeletedLocalList(tempDeletedLocalList);

    triggerChapterChangeBothInOut(tempchapterList);

    setIsRevertingChapter(false);

  }


    return (
      <div style={{"height": "600px"}}>
        {isCollapse === false && 
        <div className="parallelFrame">
         
          <div className="listBar" style={{"overflow": "hidden"}}>
         
              <div className="chapterManagingArea"> 
                        <label>{chapterManagementText}: </label>
                

                
                  <ul>
                    {
                    (chapterList !== undefined && chapterList.length > 0)
                    &&   <>
                        {chapterList.map((item, index) => {
                          if (item[0] === "chapter_placeholder") {
                            return;
                          }

                          let hide = "display";
                          if (chapterList[index][2] === "delete") {
                            hide = "hide";
                          }
                          let divKey = "div"+index;
                          return (
                          <div key={divKey}>
                          {hide === "display" && 
                          <>
                            <li key={index}
                                className={selectedChptKey === item[0] ? "chapterListItemSelected" : "chapterListItem"} 
                                onClick={()=>{handleSelectChapterKey(item);setIsAddNewChapter(false);}}>             
                              {item[0]}: {item[1]}
                            </li>
                            {selectedChptKey === item[0] && 
                              <>
                                <label>{chapterUniqueIDText}: {item[0]}</label>
                                <br></br>
                                <br></br>

                                <label>{chapterTitleText}:  </label><br></br>
                                <label>{item[1]}</label>
                                <br></br>
                                <br></br>

                                <label>{noteText}: </label>
                                <br></br><label>{(item[3].length > 0 ) ? item[3] : emptyNotePlaceHolder}</label>
                                <br></br>
                                <textarea value={editingChapterNote} onChange={(event)=>{
                                  setEditingChapterNote(event.target.value);
                                }}></textarea>
                                <br></br>
                                <button onClick={()=>{setEditingChapterNote("");}}>{cancelText}</button>
                                <button onClick={()=>{
                                  changeChapterNote(index, editingChapterNote);
                                }}>{saveText}</button>

                                <br></br>
                                <br></br>
                                <label>{renameText}{chapterText}: </label><input value={editingChapterTitle} 
                                  onChange={(event)=>{
                                    setEditingChapterTitle(event.target.value);
                                                    console.log("changing title: "); //TODO testing
                                                    console.log(event.target.value); //TODO testing
                                  }}>
                                </input>
                                <br></br>
                                <button onClick={()=>{setEditingChapterTitle("");}}>{cancelText}</button>
                                <button onClick={()=>{changeChapterTitle(index, editingChapterTitle);}}>{saveText}</button>
                                
                                <br></br>
                                <br></br>                          
                                <label>{deleteSText}{chapterText}</label><br></br>
                                <button onClick={()=>{hideChapter(index);}}>
                                  {deleteText}
                                </button>
                                  
                                <br></br>

                              </>
                            
                            }
                            </>}
                          </div>
                          );
                          })}

                    </>}


                      <br></br><br></br>
                      <li 
                        className={isAddNewChpater === true ?"chapterListItemSelected" : "chapterListItem"} 
                        style={{"textDecoration": "underline"}}
                        onClick={()=>{
                          setIsAddNewChapter(!isAddNewChpater);
                          setSelectedChpt("");
                          updateChosenChapterItem("");
console.log("chapterList: ", chapterList); //TODO testing
                        }}>
                        + {newWordText}{chapterText}
                      </li>
                      {isAddNewChpater === true && 
                      <div>
                        <label>{newWordText}{chapterUniqueIDText} ({unChangeableOnceSubmittedText}): </label><br></br>
                        <input value={newChapterKeyInput} onChange={(event)=>{
                          setNewChapterKeyInput(event.target.value);
                        }}></input>
                        <br></br><br></br>
                        <label>{newWordText}{chapterTitleText} ({editableLaterText}): </label><br></br>
                        <input value={newChapterTitleInput} 
                          onChange={(event)=>{
                            setNewChapterTitleInput(event.target.value);
                          }}
                          onFocus={()=>{
                            if (newChapterTitleInput.length === 0) {
                              setNewChapterTitleInput(newChapterKeyInput);
                            }
                          }}
                        ></input>
                        <br></br><br></br>

                        <label>{noteText}:</label><br></br>
                        <input></input>
                        <br></br><br></br>
                        <button onClick={()=>{addNewChapterItem();}}>
                          {addText}</button>
                      </div>}
                        
                      <br></br><br></br>
                      <li 
                        className={isRevertingChapter === true ?"chapterListItemSelected" : "chapterListItem"} 
                        style={{"textDecoration": "underline"}}
                        onClick={()=>{
                          setIsRevertingChapter(!isRevertingChapter);
                        }}>
                        {revertDeletedChapterText}
                      </li>

                        <div>
                        
                          
                        {isRevertingChapter && 
                        <div
                            style={{"overflow": "scroll"}}
                        >

                        {deletedLocalList.length === 0 && <div>
                               {noDeletedChapterText}

                        </div>}
                        
                        {deletedLocalList.length > 0 && <table
                        
                            style={{"border": "none"}}
                        >
                            <tbody>
                              {deletedLocalList.map((item, index) => {
                                let divKey = "deletedListItem" + index;
                                return (
                                  <tr 
                                      key={divKey}
                                  >

                                      <td
                                        style={{
                                          "border": "none", 
                                          "overflow": "scroll", 
                                          "width": "5px", 
                                          "backgroundColor": "grey",
                                          "padding": "5px"
                                        }}
                                      >
                                          {item[0]}
                                          <br></br>
                                          {item[1]}
                                      </td>

                                      <td
                                        style={{"border": "none", "overflow": "scroll", "width": "20px"}}

                                      >
                                          <button 
                                              
                                              onClick={()=>{revertChapter(item[0]);}}
                                          >
                                                {revertText}
                                          </button>
                                      </td>
                                 
                                  
                                  </tr>);
                              })}
                            </tbody>
                         
                        </table>}


                        
                        </div>
                        }
                        



                        </div>

{/* //TODO plan */}

                      {/* <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br> */}
                      {/* <p className="plans">on cloud db: chapter-key is the colleciton name; detailed data fetch from cloud
                        <br></br>TODO feature: insert chapter between existing chapters 
                        <br></br>TODO feature: rearrange chapter sequence
                      </p> */}
{/* //TODO plan */}
                  </ul>

                  
                  </div>

                </div>

                  <div>
                    <button className="shrinkTab" onClick={()=>{
                      setIsCollapse(true);
                      sendOutIsCollapsed(true);
                      }}>︽</button>
                  </div>     

        </div>
        }


        {isCollapse === true && <button className="chapterManagerSwitch" onClick={()=>{
              setIsCollapse(false);
              sendOutIsCollapsed(false);
        }}>
          {chapterManagementText}
          </button>}



      </div>
    );
}