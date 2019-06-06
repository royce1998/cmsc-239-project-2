import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Vis1 from './Vis1';
import Vis2 from './Vis2';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Vis1 />, document.getElementById('vis1'));
ReactDOM.render(<Vis2 />, document.getElementById('vis2'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
