import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: '#021526', height: '100vh', fontSize:'8rem' }}>
          <div style={{ color:'white', paddingTop:'10rem' }}>
            111
          </div>
          <div style={{ fontSize:'4rem', color:'darkseagreen', paddingBottom:'4rem' }}>
            UUIDs generated
          </div>
          <div style={{ fontSize:'2rem', color:'white' }}>
            Likelihood of collision:
          </div>
          <div style={{ fontSize:'4rem', color:'thistle' }}>
            Winning the Lotto 100000 times
          </div>
      </div>
    );
  }
}

export default App;
