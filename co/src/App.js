import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import ProjectManagerPanel from './components/ProjectManagingPanel';
import ConversationNodeEditingPanel from'./components/ConversationNodeEditingPanel';
import ProjectManageNew from './components/ProjectManageNew';
import ProjectManageEdit from './components/ProjectManageEdit';
import AccountPage from './components/AccountPage';
import CardGameNodeEditingPanel from './components/CardGameNodeEditingPanel';
import ProfilePage from './components/ProfilePage';
import Container_GameEditor_Outer from './components/Container_GameEditor_Outer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Container_GameEditor_Outer />} />  {/* TODO change later for default entry page */}
        <Route path="*" element={<Dashboard />} />  {/* TODO change later for default entry page */}
        
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projectmanagingpanel" element={<ProjectManagerPanel />} />
        <Route path="/conversationnode" element={<ConversationNodeEditingPanel />} />
        <Route path="/cardgamenode" element={<CardGameNodeEditingPanel />} />
        <Route path="/projectmanagenew" element={<ProjectManageNew/>} />
        <Route path="/projectmanageedit" element={<ProjectManageEdit/>} />
        <Route path="/accountpage" element={<AccountPage/>} />
        <Route path="/profilepage" element={<ProfilePage/>} />
        <Route path="/editorcontainer" element={<Container_GameEditor_Outer/>} />

      </Routes>     
    </div>
  );
}

export default App;
