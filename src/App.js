import React from 'react';
import logo_name from './logo_name.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo_name} className="logo_name" alt="logo_name" />
        
      </header>

      <footer className='footer'>All rights reserved 2024</footer>
    </div>
  );
}

export default App;
