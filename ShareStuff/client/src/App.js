import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ItemList from './ItemList';
import BorrowedList from './BorrowedList';

function App() {

  
  return (
    <Router>
      <div className="App">
        <h1>📦 ระบบยืมของ</h1>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>หน้าหลัก</Link>
          <Link to="/borrowed">ของที่ถูกยืม</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/borrowed" element={<BorrowedList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
