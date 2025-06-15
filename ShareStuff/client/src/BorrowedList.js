import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BorrowedList() {
  const [records, setRecords] = useState([]);

  // ดึงข้อมูลจาก Backend
  const fetchBorrowedRecords = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/borrowed');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching borrowed records:', error);
    }
  };

  // ฟังก์ชันสำหรับคืนของ
  const handleReturn = async (id) => {
    const confirmReturn = window.confirm('คุณแน่ใจหรือไม่ว่าต้องการคืนของรายการนี้?');
    if (!confirmReturn) return;

    try {
      await axios.post(`http://localhost:8081/api/return/${id}`);
      alert('คืนของเรียบร้อยแล้ว');
      fetchBorrowedRecords(); // โหลดข้อมูลใหม่หลังจากคืนของ
    } catch (error) {
      console.error('Error returning item:', error);
      alert('เกิดข้อผิดพลาดในการคืนของ');
    }
  };


  useEffect(() => {
    fetchBorrowedRecords();
  }, []);

  return (
    <div>
      <h2>รายการที่ถูกยืม</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Borrower ID</th>
            <th>Item ID</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Return Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.borrowedBy}</td>
              <td>{record.itemId}</td>
              <td>{record.borrowDate}</td>
              <td>{record.dueDate}</td>
              <td>
                <button onClick={() => handleReturn(record.id)}>คืนของ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowedList;