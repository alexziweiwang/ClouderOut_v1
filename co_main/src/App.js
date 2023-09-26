import './App.css';
import logo from './logo.svg';
import GameMaker from './components/GameMaker.js'
import Dashboard from './components/Dashboard.js'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Define your routes within the <Routes> component */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gameediting" element={<GameMaker />} />
      </Routes>
      <p>App component</p>
    </div>
  );
}

export default App;
