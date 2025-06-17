import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';




export default function ProjectManagingOffline() {

    const navigate = useNavigate();

    const modeName = "offline_half"; //can use online-link for resource, but not using cloud-resource(databse or storage)


    const [projectIdInput, setProjectIdInput] = useState("my_project");

    function goToGameMaker(projectNameTemp) {
        if (projectNameTemp === "") {
          return;
        }
  
        navigate('/editorcontainer', { 
          replace: true, 
          state: { 
            selected_project_name: projectNameTemp, 
            mode: modeName
          } });
  
      }


    return (
    <div>





        <label>Project Id: </label>
        <input
            value={projectIdInput}
            onChange={(event)=>{
                setProjectIdInput(event.target.value);
            }}
        ></input>

        <br></br>
        <button
            onClick={()=>{
                goToGameMaker(projectIdInput);
            }}
        >Create Project</button>




    </div>
    )

}