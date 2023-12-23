import * as React from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';


export default function AccountPage({}) {

    let name = "/accountpage";

    const {state} = useLocation();
    let username = "default-no-state-username";
    if (state !== null) {
        username = state.username;
    } 
    console.log("account page - username = ", username);


    return (
  <div className="page">
    <Sidebar compName = {name}/>

    <div className="dashboard_content">

      <p className="plans"> This is Account Page!  </p>
      
    </div>
 
  </div>
    );
}
