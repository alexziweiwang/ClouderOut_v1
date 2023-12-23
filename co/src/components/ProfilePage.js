import * as React from 'react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { getProjectGameDataVM } from '../viewmodels/AccountViewModel';

export default function ProfilePage() {
    const username = "user002"; //TODO test

    let name = "/profilepage";

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

      <p className="plans"> This is Profile Page!  </p>
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
