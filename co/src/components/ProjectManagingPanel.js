import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';

export default function ProjectManagerPanel() {
    const navigate = useNavigate();
    const [selected_project_name, setProjectName] = useState['unnamed'];

    function goToDashboard() {
      navigate('/dashboard', { replace: true });
    }
  
    function goToGameMaker() {
        navigate('/gamemaker', { replace: true }, { name: { selected_project_name } });
    }
    
    return (
  <div>    
    <div>

        <div className="returning_buttons"><button className="button" onClick={goToDashboard}>Return to Dashboard </button></div>
        <p className="plans">This is ProjectManagerPanel Component!!
          <br></br>Here, the user can create new projects, or select specific projects to edit.
          <br></br>flow: create or continue? if create, then create and complete or start with game-maker? 
        </p>

        <p className="plans">Later: connect to cloud db and provide all project names to get selected by the user, or create new project</p>
        //TODO when use choose an exisiting project, do setProjectName to update the selection of project
        //TODO also do creation of projects to cloud db
        <button className="button" onClick={goToGameMaker}> Go To GameMaker! </button>
    </div>
    

  </div>
    );
}
