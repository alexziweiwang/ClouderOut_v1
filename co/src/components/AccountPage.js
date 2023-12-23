import * as React from 'react';
import Sidebar from './Sidebar';

export default function AccountPage() {
    const username = "user002"; //TODO test

    let name = "/accountpage";

    return (
  <div className="page">
    <Sidebar compName = {name}/>

    <div className="dashboard_content">

      <p className="plans"> This is Account Page!  </p>
      
    </div>
 
  </div>
    );
}
