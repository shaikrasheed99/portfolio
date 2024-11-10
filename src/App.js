import React from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <main style={{ marginLeft: '60px' }}>
        <Header />
        <About />
        <Footer />
      </main>
    </div>
  );
}

export default App;
