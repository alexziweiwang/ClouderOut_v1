import * as React from 'react';
import Sidebar from './Sidebar';

/* Dashboard
Dashboard is for each specific user, and users setup their profile, projects and account.
*/
export default function Dashboard() {
    let name = "/dashboard";
    const uname = "user002";


    return (
  <div className="page">
    <Sidebar compName={name} username={uname}/>

    
    <div className="dashboard_content">

      <p className="plans"> This is ... *Dashboard Component* for {uname}</p>

      <p className="plans">TODO: responsibility of this page: 
        <br></br>User Authentication: only logged-in user can see this page with their own info only
      </p>
      
      <p className="plans">
        arrangement for this page:
      <br></br> For new users, display tutorial-like pages;
      <br></br>For users who hold two or more projects, display quick entry for their projects? 
      <br></br> future: display announcement, recommended articles, etc.
      </p>
      
    </div>
 
  </div>
    );
}
