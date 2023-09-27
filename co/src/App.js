import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import GameMaker from './components/GameMaker'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gamemaker" element={<GameMaker />} />
      </Routes>

      {/* <header className="App-header">
      </header> */}
    
     
    </div>
  );
}

export default App;
