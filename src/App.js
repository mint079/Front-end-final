import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Custlist from './Custlist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Customer</h1>
        </header>
        <Custlist />
      </div>
    );
  }
}

export default App;
