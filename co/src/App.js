import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import UserNotLoggedInPage from './components/UserNotLoggedInPage';

import ProjectManagingOffline from './components/ProjectManagingNonCloud';

import Panel1_UserMgr from './components/Panel1_UserMgr';
import Panel2_Container_GameEditor from './components/Panel2_Container_GameEditor';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserNotLoggedInPage />} />  {/* TODO change later for default entry page */}
        <Route path="*" element={<UserNotLoggedInPage />} />  {/* TODO change later for default entry page */}
        
        <Route path="/mainpanel" element={<Panel1_UserMgr/>} />
        <Route path="/editorcontainer" element={<Panel2_Container_GameEditor/>} />
        
        <Route path="/notloggedin" element={<UserNotLoggedInPage/>} />
        <Route path="/projectNonCloud" element={<ProjectManagingOffline/>} />

      </Routes>     
    </div>
  );
}

export default App;
