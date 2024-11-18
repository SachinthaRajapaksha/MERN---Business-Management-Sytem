import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/FinancialComponents/Navbar';
import ChartPage from '../../Components/FinancialComponents/ChartPage';
import Sidebar from '../../Components/FinancialComponents/Sidebar';
import RecentTransactions from '../../Components/FinancialComponents/RecentTransactions';
import LineBarSum from '../../Components/FinancialComponents/LineBarSum';
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import backgroundImage from '../../images/b2.png'

function DashboardPage() {
    const [profitData, setProfitData] = useState([]);
    const [totals, setTotals] = useState({
        totalIncome: 0,
        totalExpense: 0,
        profit: 0
    });
    const [timeframe, setTimeframe] = useState('thisMonth');

    useEffect(() => {
        fetchData();
    }, [timeframe]);

    const fetchData = async () => {
        try {
            const responseTotals = await axios.get(`http://localhost:4000/api/incomes/totals?timeframe=${timeframe}`);
            setTotals(responseTotals.data);

            const responseDailyTotals = await axios.get(`http://localhost:4000/api/incomes/daily-totals?timeframe=${timeframe}`);
            setProfitData(responseDailyTotals.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTimeframeChange = (event) => {
        setTimeframe(event.target.value);
    };

    const handleDownloadPDF = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/incomes/report', { responseType: 'blob' });
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Prompt user to save the PDF file
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            // Ask user to specify the filename and location
            link.setAttribute('download', 'report.pdf');
            link.click();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div >
            <div style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }} />

            <Navbar />
            <Sidebar />
            <div className="container mt-5">
                <div className="container" style={{ width: "230px", marginLeft: '10px', paddingTop: '30px' }}>
                    <div className=" d-flex shadow-sm container mb-4 mt-4 border rounded " style={{ width: '299px', background: '#fff' }}>
                        <h2>Financial Overview</h2>
                    </div>
                    <hr style={{ width: '630%', borderColor: '#fff ', borderWidth: '5px', margin: '20px auto' }} />
                    <div className="d-flex">
                        <select className="shadow-sm form-select" style={{ marginLeft: '15px' }} value={timeframe} onChange={handleTimeframeChange}>
                            <option value="" disabled hidden>Filter Analysis</option>
                            <option value="thisMonth">This Month</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>
                </div>

                <hr style={{ width: '100%', borderColor: '#000000 ', borderWidth: '3px',marginLeft: '34px' }} />

                <div className="d-flex" style={{ marginTop: '50px', marginLeft: '120px', marginBottom:'40px' }}>
                    <div className="shadow p border rounded p-3 mr-3 d-flex align-items-center" style={{ marginRight: '80px', background: '#51E552', color: 'white', width: '320px' }}>
                        <div className="d-flex p-2 mr-2" style={{ marginRight: '10px' }}>
                            <i className="bi bi-graph-up-arrow fs-4"></i>
                            <div
                                className="d-none d-lg-block"
                                style={{ borderLeft: "3px solid #000", height: 40, marginTop: '3px', marginRight: '20px', marginLeft: '20px' }}
                            ></div>
                        </div>
                        <div>
                            <h5 className="text-muted">Total Income</h5>
                            <h3>{totals.totalIncome} LKR</h3>
                        </div>
                    </div>
                    <div className="shadow-lg border rounded p-3 mr-3 d-flex align-items-center" style={{ marginRight: '80px', background: '#EC1515', color: 'white', width: '320px' }}>
                        <div className="d-flex p-2 mr-2" style={{ marginRight: '10px' }}>
                            <i className="bi bi-graph-down-arrow fs-4"></i>
                            <div
                                className="d-none d-lg-block"
                                style={{ borderLeft: "3px solid #000", height: 40, marginTop: '3px', marginRight: '20px', marginLeft: '20px' }}
                            ></div>
                        </div>
                        <div>
                            <h5 className="text-muted">Total Expense</h5>
                            <h3>{totals.totalExpense} LKR</h3>
                        </div>
                    </div>
                    <div className="shadow-lg border rounded p-3 d-flex align-items-center" style={{ marginRight: '80px', background: '#3866C8', color: 'white', width: '320px' }}>
                        <div className="d-flex p-2 mr-2" style={{ marginRight: '10px' }}>
                            <i className="bi bi-currency-dollar fs-4"></i>
                            <div
                                className="d-none d-lg-block"
                                style={{ borderLeft: "3px solid #000", height: 40, marginTop: '3px', marginRight: '20px', marginLeft: '20px' }}
                            ></div>
                        </div>
                        <div>
                            <h5 className="text-muted">Profit</h5>
                            <h3>{totals.profit} LKR</h3>
                        </div>
                    </div>
                </div>

                

            </div>

            <div className="container mt-3" style={{ width: '1350px', marginBottom: '50px', marginLeft: '134px' }} >
                <div className="shadow p card">
                    <div className="card-body">
                        <h5 className="card-title">Profit Analysis:</h5>
                        <div className="chart-container" style={{ height: '360px' }} >
                            <Line
                                data={{
                                    labels: profitData.map(data => data.date),
                                    datasets: [{
                                        label: "Income",
                                        data: profitData.map(data => data.income),
                                        backgroundColor: "rgba(67, 205, 36, 0.2)",
                                        borderColor: "#43CD24",
                                        borderWidth: 2,
                                        pointRadius: 4,
                                        pointBackgroundColor: "#43CD24",
                                        tension: 0.3,
                                    },
                                    {
                                        label: "Expense",
                                        data: profitData.map(data => data.expense),
                                        backgroundColor: "rgba(237, 37, 10, 0.2)",
                                        borderColor: "#ED250A",
                                        borderWidth: 2,
                                        pointRadius: 4,
                                        pointBackgroundColor: "#ED250A",
                                        tension: 0.3,
                                    },
                                    {
                                        label: "Profit",
                                        data: profitData.map(data => data.profit),
                                        backgroundColor: "rgba(10, 30, 237, 0.2)",
                                        borderColor: "#0A1EED",
                                        borderWidth: 2,
                                        pointRadius: 4,
                                        pointBackgroundColor: "#0A1EED",
                                        tension: 0.3,
                                    }]
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            labels: {
                                                font: {
                                                    size: 12
                                                }
                                            }
                                        }
                                    },
                                    scales: {
                                        x: {
                                            ticks: {
                                                font: {
                                                    size: 10
                                                }
                                            }
                                        },
                                        y: {
                                            ticks: {
                                                font: {
                                                    size: 10
                                                }
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr style={{ width: '70%', borderColor: '#fff ', borderWidth: '5px', margin: '20px auto' }} />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <LineBarSum />
                </div>
                <div style={{ flex: 1 }}>
                    <RecentTransactions />
                </div>
            </div>
            <div>
                <button className="btn btn-dark" style={{ width: '1000px', marginBottom: '40px', marginLeft: '300px' }} onClick={handleDownloadPDF} >
                    <i className="bi bi-save"></i> Generate Report
                </button>
            </div>

            <footer style={{ backgroundColor: "#333", color: "#fff", padding: "50px", textAlign: "center" }}>
                <span style={{ left: '10px' }}>SunRich Paradise All rights Reserved</span>
            </footer>
        </div>
    );
}

export default DashboardPage;
