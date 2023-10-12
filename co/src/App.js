import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import GameMaker from './components/GameMaker'
import ProjectManagerPanel from './components/ProjectManagingPanel';
import PieceScreenEditingPanel from'./components/PieceScreenEditingPanel';
import ProjectManageNew from './components/ProjectManageNew';
import ProjectManageEdit from './components/ProjectManageEdit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />  {/* TODO change later for default entry page */}
        <Route path="*" element={<Dashboard />} />  {/* TODO change later for default entry page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projectmanagingpanel" element={<ProjectManagerPanel />} />
        <Route path="/gamemaker" element={<GameMaker />} />
        <Route path="/piecepanel" element={<PieceScreenEditingPanel />} />
        <Route path="/projectmanagenew" element={<ProjectManageNew/>} />
        <Route path="/projectmanageedit" element={<ProjectManageEdit/>} />

      </Routes>     
    </div>
  );
}

export default App;
