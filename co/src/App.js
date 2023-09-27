import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import GameMaker from './components/GameMaker'
import ProjectManagerPanel from './components/ProjectManagingPanel';
import PieceScreenEditingPanel from'./components/PieceScreenEditingPanel';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />  {/* TODO change later for default entry page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projectmanagingpanel" element={<ProjectManagerPanel />} />
        <Route path="/gamemaker" element={<GameMaker />} />
        <Route path="/piecepanel" element={<PieceScreenEditingPanel />} />
      </Routes>


      {/* <header className="App-header">
      </header> */}
    
     
    </div>
  );
}

export default App;
