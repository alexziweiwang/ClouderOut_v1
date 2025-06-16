import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';




export default function ProjectManagingOffline() {

    const navigate = useNavigate();

    const projectNameStr = "";

    function goToGameMaker() {
        if (selected_project_name === "") {
          return;
        }
  
        navigate('/editorcontainer', { 
          replace: true, 
          state: { 
            selected_project_name: projectNameStr, 
          } });
  
      }


    return (<div>

    </div>)

}