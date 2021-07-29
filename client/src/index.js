import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {GetUser} from './utils/GetUser'

import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
    
  <GetUser>
    <Router>
      <App />
    </Router>
      
  </GetUser>
    
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
