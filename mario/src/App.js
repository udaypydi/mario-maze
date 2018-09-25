import React, { Component } from 'react';
import Mario from './components/Mario';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Mario />
      </div>
    );
  }
}

export default App;
