import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './webpage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

// TODO: when other componente enter here, specify the component name and decide display items on the side bar
export default function Sidebar() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState("/dashboard");


    function goToProjectManagingPanel() {
        setCurrentPage("/projectmanagingpanel");
        navigate('/projectmanagingpanel');
    }

    return (
    <div className="sidebar" > Welcome, user ___ ! 1223123
        <div> 
            <button className="sidebar_options">Profile</button>
            <button className="sidebar_options" onClick={goToProjectManagingPanel}>My Projects</button>
            <button className="sidebar_options">Account</button>
        </div>

        <div className="plans"> Logout</div>
    </div>
    );
}
