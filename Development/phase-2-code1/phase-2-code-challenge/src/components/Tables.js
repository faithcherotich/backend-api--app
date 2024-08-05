import React, { useEffect, useState } from 'react'; 
import "./Tables.css";
import Tableitem from './Tableitem'; 


function Tables() {
  const [transactions, setTransactions] = useState([]); 
  const [newItem, setNewItem] = useState(""); 
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    category: ''
  });
useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTransactions(data);
        }
      })
       },
  []);

  const handleSearch = (event) => {
    setNewItem(event.target.value);
  };

  const handleInputChange = (event) => {
    setNewTransaction({
      ...newTransaction,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({ date: '', description: '', amount: '', category: '' });
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(newItem.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions..."
        value={newItem}
        onChange={handleSearch}
      />
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="date"
          placeholder="Date"
          value={newTransaction.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTransaction.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newTransaction.category}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Transaction</button>
      </form>
      {filteredTransactions.length ? (
        <Tableitem transactions={filteredTransactions} />
      ) : (
        <p>wait...</p>
      )}
    </div>
  );
}

export default Tables;