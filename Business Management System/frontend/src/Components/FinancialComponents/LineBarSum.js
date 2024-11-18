import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncomeExpenseSummary = () => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        async function fetchSummary() {
            try {
                const response = await axios.get('http://localhost:4000/api/incomes/summary');
                setSummary(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSummary();
    }, []);

    const incomeOrder = ['Customer Order', 'Sales Revenue', 'Dividend Income', 'Commissions', 'Other Incomes'];
    const expenseOrder = ['Employee Payrolls', 'Utilities and Maintenance', 'Supplier payments', 'Operating Expenses', 'Other Expenses'];

    return (
        <div className="container mt-4" style={{ maxWidth: '700px', marginBottom: '40px', marginLeft:'120px' }}>
            <div className="shadow-lg card">
                <div className="card-body">
                    <div className="card-header  bg-black text-white mb-2" style={{ height:'50px', textAlign:'center'}}>
                        <span style={{ fontSize:'20px',fontWeight: "bold",  }}>Transaction data summarized & categorized</span>{" "}
                    </div>

                    {summary && (
                        <div>
                            <div style={{fontSize:'20px'}}>
                                <p><strong>Incomes</strong></p>
                            </div>
                            
                            {incomeOrder.map(category => (
                                <div className="mb-3" key={category}>
                                    <div className="d-flex" >
                                        <p><strong>{category}</strong>: {summary.incomeCategories[category]} LKR</p>
                                        <div className="progress-percentage" style={{ position: 'absolute', right: 25 }} >{summary.incomeCategoryPercentage[category]}%</div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="progress flex-grow-1 me-2">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${summary.incomeCategoryPercentage[category]}%`, backgroundColor: summary.incomeCategoryColors[category], transition: 'width 1s ease-in-out' }}>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                            <div style={{marginTop:'28px'}}>
                            <hr />
                            </div>
                           

                            <div style={{fontSize:'20px'}}>
                                <p><strong>Expenses</strong></p>
                            </div>
                            {expenseOrder.map(category => (
                                <div className="mb-3" key={category}>
                                    <div className="d-flex" >
                                        <p><strong>{category}</strong>: {summary.expenseCategories[category]} LKR</p>
                                        <div className="progress-percentage" style={{ position: 'absolute', right: 25 }} >{summary.expenseCategoryPercentage[category]}%</div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="progress flex-grow-1 me-2">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${summary.expenseCategoryPercentage[category]}%`, backgroundColor: summary.expenseCategoryColors[category] }}>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomeExpenseSummary;
