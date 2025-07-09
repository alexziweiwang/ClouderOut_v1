import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ConversationNodeEditingPanel from'./components/ConversationNodeEditingPanel';
import CardGameNodeEditingPanel from './components/CardGameNodeEditingPanel';
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
        <Route path="/editorcontainer" element={<Panel2_Container_GameEditor/>} />

        <Route path="/conversationnode" element={<ConversationNodeEditingPanel />} />
        <Route path="/cardgamenode" element={<CardGameNodeEditingPanel />} />
        
        <Route path="/notloggedin" element={<UserNotLoggedInPage/>} />
        <Route path="/projectNonCloud" element={<ProjectManagingOffline/>} />

      </Routes>     
    </div>
  );
}

export default App;
