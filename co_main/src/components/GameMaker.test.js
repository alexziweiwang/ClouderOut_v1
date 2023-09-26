import React from 'react';
import ReactDOM from 'react-dom';
import GameMaker from './GameMaker';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameMaker />, div);
  ReactDOM.unmountComponentAtNode(div);
});