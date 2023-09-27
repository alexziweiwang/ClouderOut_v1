import React from 'react';
import ReactDOM from 'react-dom';
import Temp from './Temp';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Temp />, div);
  ReactDOM.unmountComponentAtNode(div);
});