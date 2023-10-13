import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import GameMaker from './components/GameMaker'
import ProjectManagerPanel from './components/ProjectManagingPanel';
import ConversationNodeEditingPanel from'./components/ConversationNodeEditingPanel';
import ProjectManageNew from './components/ProjectManageNew';
import ProjectManageEdit from './components/ProjectManageEdit';
import AccountPage from './components/AccountPage';
import CardGameNodeEditingPanel from './components/CardGameNodeEditingPanel';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GameMaker />} />  {/* TODO change later for default entry page */}
        <Route path="*" element={<Dashboard />} />  {/* TODO change later for default entry page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projectmanagingpanel" element={<ProjectManagerPanel />} />
        <Route path="/gamemaker" element={<GameMaker />} />
        <Route path="/conversationnode" element={<ConversationNodeEditingPanel />} />
        <Route path="/cardgamenode" element={<CardGameNodeEditingPanel />} />
        <Route path="/projectmanagenew" element={<ProjectManageNew/>} />
        <Route path="/projectmanageedit" element={<ProjectManageEdit/>} />
        <Route path="/accountpage" element={<AccountPage/>} />
      </Routes>     
    </div>
  );
}

export default App;
