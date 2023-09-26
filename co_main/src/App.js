import logo from './logo.svg';
import './App.css';
import GameMaker from './components/GameMaker.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is the web-app entry for C.O.
        </p>

        <p>That is, the user should sign up / log in first, and then manage their projects.</p>
        <GameMaker></GameMaker>
      </header>
    </div>
  );
}

export default App;
