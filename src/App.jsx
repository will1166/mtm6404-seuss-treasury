import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Quotes from './pages/Quotes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navigation Header */}
        <header className="site-header">
          <h1>Seuss Treasury</h1>
          <nav className="navbar">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end
            >
              Books
            </NavLink>
            <NavLink 
              to="/quotes" 
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Quotes
            </NavLink>
          </nav>
        </header>

        {/* Page Routes */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/quotes" element={<Quotes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;