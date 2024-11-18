import React, { useState } from 'react';
import ChartPage from './ChartPage';
import Dashboard from '../pages/IncomeExpense/Dashboard';

function DashboardContainer() {
    const [timeframe, setTimeframe] = useState('all');

    const handleTimeframeChange = (selectedTimeframe) => {
        setTimeframe(selectedTimeframe);
    };

    return (
        <div>
            <div className="container mt-3">
                <div className="d-flex justify-content-center">
                    <select className="form-select" value={timeframe} onChange={(e) => handleTimeframeChange(e.target.value)}>
                        <option value="thisMonth">This Month</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="all">All Time</option>
                    </select>
                </div>
            </div>
            <ChartPage timeframe={timeframe} handleTimeframeChange={handleTimeframeChange} />
            <Dashboard timeframe={timeframe} handleTimeframeChange={handleTimeframeChange} />
        </div>
    );
}

export default DashboardContainer;
