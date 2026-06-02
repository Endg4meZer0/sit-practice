import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import Content from './components/Content';

function App() {
  return (
    <div>
      <Navbar active="1" />
      <Gallery />
      <Content />
    </div>
  );
}

export default App;
