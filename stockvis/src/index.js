import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Vis1 from './Vis1';
import Vis2 from './Vis2';
import Vis3 from './Vis3';
import Vis4 from './Vis4';
import Vis5 from './Vis5';
import * as serviceWorker from './serviceWorker';
import Root from './root.js';
import RootComponent2 from './root2.js';

//ReactDOM.render(<Root />, document.getElementById('app'));
ReactDOM.render(<Root />, document.getElementById('vis1'));
//ReactDOM.render(<Vis1 />, document.getElementById('vis1'));
ReactDOM.render(<Vis2 />, document.getElementById('vis3'));
ReactDOM.render(<Vis3 />, document.getElementById('vis4'));
ReactDOM.render(<Vis4 />, document.getElementById('vis5'));
ReactDOM.render(<Vis5 />, document.getElementById('vis6'));
ReactDOM.render(<RootComponent2 />, document.getElementById('vis2'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
