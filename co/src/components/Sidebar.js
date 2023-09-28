import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './webpage.css';


export default function Sidebar() {

    return (
    <div className="sidebar" > Welcome, user ___ ! 1223123
        <div> 
            <button class="sidebar_options">Profile</button>
            <button class="sidebar_options">My Projects</button>
            <button class="sidebar_options">Account</button>
        </div>

        <div className="plans"> Logout</div>
    </div>
    );
}
