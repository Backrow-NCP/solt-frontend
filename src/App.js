import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GlobalStyles from './styles/global.js';

function App() {
  return (
    <>
      <GlobalStyles />

      <Router>
        <div className="App">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
