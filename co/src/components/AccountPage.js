import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './webpage.css';
import Sidebar from './Sidebar';
import { getProjectGameDataVM } from '../viewmodels/AccountViewModel';

/* Dashboard
Dashboard is for each specific user, and users setup their profile, projects and account.
*/
export default function AccountPage() {
    const navigate = useNavigate();
    const username = "user002"; //TODO test

    let name = "/accountpage";

    let profile = [];
    const [profileText, setProfile] = useState({});

    async function getProfile() {
      profile = await getProjectGameDataVM({uname: username});
      console.log("page: ", profile); //TODO test
      setProfile(profile);
    }


    return (
  <div className="page">
    <Sidebar compName = {name}/>

    <div className="dashboard_content">

      <p className="plans"> This is Account Page!  </p>
      <button onClick={getProfile}> Load my profile </button>
      <ul>
                {
                Object.keys(profileText).map((key) => {
                return (
                    <li className="clickableListItem2" key={key}>{key}:               {profileText[key]}</li>
                )
                })}
      </ul>
      
    </div>
 
  </div>
    );
}
