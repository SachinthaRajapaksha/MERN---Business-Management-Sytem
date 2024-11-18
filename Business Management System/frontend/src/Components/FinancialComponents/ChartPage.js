import React, { useState, useEffect } from 'react';
import { Chart as ChartJS} from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from 'axios';

function ChartPage() {
    const [profitData, setProfitData] = useState([]);
    const [timeframe, setTimeframe] = useState('all');

    useEffect(() => {
        fetchData();
    }, [timeframe]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/incomes/daily-totals?timeframe=${timeframe}`);
            setProfitData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTimeframeChange = (event) => {
        setTimeframe(event.target.value);
    };

    return (
        <div className="shadow-lg container mt-5" style={{ width: '1350px', marginBottom: '50px', marginLeft:'130px' }} >
            <div className="shadow-lg card">
                <div className="shadow-lg card-body">
                    <h5 className="card-title">Profit Analysis:</h5>
                    <div className="d-flex justify-content-end mb-3">
                        <select className="form-select" value={timeframe} onChange={handleTimeframeChange}>
                            <option value="thisMonth">This Month</option>
                            <option value="lastMonth">Last Month</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>
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
    );
}

export default ChartPage;
