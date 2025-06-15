import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items');
      setItems(response.data);
      const uniqueCategories = ['ทั้งหมด', ...new Set(response.data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleBorrow = async (itemId) => {
    try {
      const response = await axios.post('/api/borrow', null, {
        params: {
          itemId,
          user: 'anonymous'
        }
      });
      alert(response.data);
      fetchItems();
    } catch (error) {
      alert(error.response?.data || 'เกิดข้อผิดพลาด');
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'ทั้งหมด' || item.category === selectedCategory)
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">รายการของทั้งหมด</h2>

      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ค้นหาชื่อ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '400px' }}
        />
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: '200px' }}
        >
          {categories.map(category => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ชื่อ</th>
            <th>หมวดหมู่</th>
            <th>จำนวนคงเหลือ</th>
            <th>การยืม</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleBorrow(item.id)}
                  disabled={item.quantity <= 0}
                >
                  ยืม
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
