// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [groceries, setGroceries] = useState([]);
  const [newGrocery, setNewGrocery] = useState({ name: '', quantity: 0 });

  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    const result = await axios.get('http://localhost:3000/groceries');
    setGroceries(result.data);
  };

  const addGrocery = async () => {
    await axios.post('http://localhost:3000/groceries', newGrocery);
    fetchGroceries();
    setNewGrocery({ name: '', quantity: 0 });
  };

  const updateGrocery = async (id) => {
    const updatedGrocery = groceries.find((grocery) => grocery.id === id);
    await axios.put(`http://localhost:3000/groceries/${id}`, updatedGrocery);
    fetchGroceries();
  };

  const deleteGrocery = async (id) => {
    await axios.delete(`http://localhost:3000/groceries/${id}`);
    fetchGroceries();
  };

  return (
    <div className="container">
      <h1>Grocery List Manager</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Name"
          value={newGrocery.name}
          onChange={(e) => setNewGrocery({ ...newGrocery, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newGrocery.quantity}
          onChange={(e) => setNewGrocery({ ...newGrocery, quantity: parseInt(e.target.value) })}
        />
        <button onClick={addGrocery}>Add Grocery</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groceries.map((grocery) => (
              <tr key={grocery.id}>
                <td>{grocery.id}</td>
                <td>
                  <input
                    type="text"
                    value={grocery.name}
                    onChange={(e) => setGroceries(groceries.map(g => g.id === grocery.id ? { ...g, name: e.target.value } : g))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={grocery.quantity}
                    onChange={(e) => setGroceries(groceries.map(g => g.id === grocery.id ? { ...g, quantity: parseInt(e.target.value) } : g))}
                  />
                </td>
                <td className="actions">
                  <button className="update-button" onClick={() => updateGrocery(grocery.id)}>Update</button>
                  <button className="delete-button" onClick={() => deleteGrocery(grocery.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
