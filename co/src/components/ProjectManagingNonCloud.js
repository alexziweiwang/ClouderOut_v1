import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { userLogOutVM } from '../viewmodels/_UserFirebaseAuthViewModel';



//projectNonCloud
export default function ProjectManagingOffline() {

    const navigate = useNavigate();

    const modeName = "offline_half"; //can use online-link for resource, but not using cloud-resource(databse or storage)


    const [projectIdInput, setProjectIdInput] = useState("my_project");

    const [isCreateNewProject, setIsCreateNewProject] = useState(true);


    function goToGameMaker(projectNameTemp) {
        if (projectNameTemp === "") {
          return;
        }

        userLogOutVM();
  
        navigate('/editorcontainer', { 
          replace: true, 
          state: { 
            selected_project_name: projectNameTemp, 
            mode: modeName
          } });
  
      }


    return (
    <div  style={{"display": "flex", "justifyContent": "center", "alignItem": "center"}}>


        <div>
   
                <button 
                    className={isCreateNewProject === true ? "topBarTabSelected" : "topBarTab"}
                    onClick={()=>{
                        setIsCreateNewProject(true);
                    }}   
                    
                    >New Project</button>
            
          
                <button 
                    className={isCreateNewProject === false ? "topBarTabSelected" : "topBarTab"}
                    onClick={()=>{
                        setIsCreateNewProject(false);
                    }}                  
                >Import Project File</button>



                
            {isCreateNewProject === true && <div>
                    <br></br><br></br><br></br>
                    <label>Project ID: </label>
                    <input
                        value={projectIdInput}
                        onChange={(event)=>{
                            setProjectIdInput(event.target.value);
                        }}
                    ></input>

                    <br></br><br></br>
                    <button
                        onClick={()=>{
                            goToGameMaker(projectIdInput);
                        }}
                    >Create Project</button>
                </div>}


                {isCreateNewProject === false && <div>

                </div>}


        </div>


    </div>
    )

}