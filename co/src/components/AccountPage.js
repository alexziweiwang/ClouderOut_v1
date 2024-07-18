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
        <div style={{"textAlign": "left", "padding": "10px"}}>
     
          <label>Username: </label>
          <label>(username)</label>
          <br></br>
          <label>Nickname: </label>
          <label>(nickname)</label><button>Update</button>
          <br></br>
          <label>Email linked: </label>
          <label>(email)</label><button>Update</button>
          <br></br>
          <label>Phone Number: </label>
          <label>(phone number)</label><button>Update</button>
          <br></br>
          <label>ClouderCredits: </label>
          <label>(credits)</label><button>Top up</button>
          <br></br><br></br><br></br><br></br>
          <button>Deactivate Account</button>
        </div>
    </div>
 
  </div>
    );
}
