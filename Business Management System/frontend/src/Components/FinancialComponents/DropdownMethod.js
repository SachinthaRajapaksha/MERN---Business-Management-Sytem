import React from 'react';

function DropdownMethod({ selectedType, setSelectedType }) {
    const handleSelectChange = (e) => {
        setSelectedType(e.target.value);
    };

    return (
        <select
            className="shadow-sm form-select"
            value={selectedType}
            onChange={handleSelectChange}
            style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ced4da',
                fontSize: '16px',
                cursor: 'pointer',
                width: '160px', // Adjust the width here
            }}
        >
            <option value="All">All Transactions</option>
            <option value="Income">Incomes</option>
            <option value="Expense">Expenses</option>
        </select>
    );
}

export default DropdownMethod;

