import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProjectManagingPanel from './components/ProjectManagingPanel';
import ConversationNodeEditingPanel from'./components/ConversationNodeEditingPanel';
import ProjectManageNew from './components/ProjectManageNew';
import ProjectManageEdit from './components/ProjectManageEdit';
import AccountPage from './components/AccountPage';
import CardGameNodeEditingPanel from './components/CardGameNodeEditingPanel';
import ProfilePage from './components/ProfilePage';
import Panel2_Container_GameEditor from './components/Panel2_Container_GameEditor';
import UserNotLoggedInPage from './components/UserNotLoggedInPage';
import ProjectManagingOffline from './components/ProjectManagingNonCloud';
import Panel1_UserMgr from './components/Panel1_UserMgr';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Panel1_UserMgr />} />  {/* TODO change later for default entry page */}
        <Route path="*" element={<Panel1_UserMgr />} />  {/* TODO change later for default entry page */}
        
        <Route path="/mainpanel" element={<Panel1_UserMgr/>} />
        <Route path="/conversationnode" element={<ConversationNodeEditingPanel />} />
        <Route path="/cardgamenode" element={<CardGameNodeEditingPanel />} />
        <Route path="/projectmanagenew" element={<ProjectManageNew/>} />
        <Route path="/projectmanageedit" element={<ProjectManageEdit/>} />
        <Route path="/accountpage" element={<AccountPage/>} />
        <Route path="/profilepage" element={<ProfilePage/>} />
        <Route path="/editorcontainer" element={<Panel2_Container_GameEditor/>} />
        <Route path="/notloggedin" element={<UserNotLoggedInPage/>} />
        <Route path="/projectNonCloud" element={<ProjectManagingOffline/>} />

      </Routes>     
    </div>
  );
}

export default App;
