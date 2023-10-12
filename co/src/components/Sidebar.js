import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './webpage.css';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar(props) {
    console.log(props.compName);
    const navigate = useNavigate();

    function goToProjectManagingPanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }

    function backToDashboard() {
        navigate('/dashboard', { replace: true });
    }

    function projectManageNew() {
        navigate('/projectmanagenew', { replace: true });
    }

    function projectManagePanel() {
        navigate('/projectmanagingpanel', { replace: true });
    }


    return (
    <>
    {props.compName == "/dashboard" && <div className="sidebar1" > Welcome, user ___ ! 1223123
        <div> 
            <button className="sidebar_options">Profile</button>
            <button className="sidebar_options" onClick={goToProjectManagingPanel}>My Projects</button>
            <button className="sidebar_options">Account</button>
        </div>

        <div className="plans"> Logout</div>
        </div>
    }

    {(props.compName == "/projectmanagingpanel") && <div className="sidebar2" >
        <div> 
            <button className="sidebar_options" onClick={backToDashboard}> ← Dashboard</button>
        </div>
        <div>
            <br></br> <br></br> <br></br>
        <button className="sidebar_options" onClick={projectManageNew}> New Project</button>

        </div>

        </div>
    }

    {(props.compName == "/projectmanagenew") && <div className="sidebar2" >
        <div> 
            <button className="sidebar_options" onClick={backToDashboard}> ← Dashboard</button>
        </div>


        </div>
    }



    </>
    );
}
