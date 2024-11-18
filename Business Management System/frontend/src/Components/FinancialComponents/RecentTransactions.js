import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecentTransactions() {
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        fetchRecentTransactions();
    }, []);

    const fetchRecentTransactions = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/incomes/trans");
            setRecentTransactions(response.data.slice(0, 5)); // Get the 5 most recent transactions
        } catch (error) {
            console.error('Error fetching recent transactions:', error);
        }
    };

    return (
        <div className="shadow-lg container mt-4 border rounded p-4" style={{ maxWidth: '620px', marginBottom: '40px', marginLeft:'90px', background:'#ffff' }} >
            <h4>Most Recent Transactions</h4>
            {recentTransactions.map(transaction => (
                <div key={transaction._id} className="shadow p border rounded p-3 mb-3">
                    <div><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</div>
                    <div style={{ maxWidth: '680px', wordWrap: 'break-word' }} ><strong>Description:</strong> {transaction.detail}</div>
                    <div><strong>Category:</strong> {transaction.category}</div>
                    <div><strong>Type:</strong> {transaction.type}</div>
                    <div><strong>Amount:</strong> {transaction.amount} LKR</div>
                </div>
            ))}
        </div>
    );
}

export default RecentTransactions;
