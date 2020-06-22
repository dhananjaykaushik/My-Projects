import React from 'react';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import MainContent from './components/main-content/MainContent';

function App() {
  return (
    <div className="container app-container">
      <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <MainContent />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
