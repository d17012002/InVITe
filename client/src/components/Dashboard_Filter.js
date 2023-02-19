import React, { useState } from 'react'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function Dashboard_Filter() {

    // Declare state for the filter options
    const [filterOptions, setFilterOptions] = useState({
        keyword: "",
        category: "",
        dateRange: "",
        price: [10, 100],
    });

    // Handle input change for the keyword search
    const handleKeywordChange = (e) => {
        setFilterOptions({ ...filterOptions, keyword: e.target.value });
    };

    // Handle input change for the category filter
    const handleCategoryChange = (e) => {
        setFilterOptions({ ...filterOptions, category: e.target.value });
    };

    // Handle input change for the date range filter
    const handleDateRangeChange = (e) => {
        setFilterOptions({ ...filterOptions, dateRange: e.target.value });
    };

    // Handle input change for the status filter
    const handlePriceChange = (value) => {
        setFilterOptions({ ...filterOptions, price: [...value] });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform the search/filter operation based on the filter options
        // ...
        console.log(filterOptions);
    };

    return (
        // Add filter options to the DOM element
        <div>
            <h2 className="text-lg font-medium mb-2">Filter Options</h2>
            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
                {/* Input to search through keyword */}
                <div className="mb-2">
                    <label htmlFor="keyword" className="font-medium block mb-1">
                        Keyword
                    </label>
                    <input
                        type="text"
                        id="keyword"
                        value={filterOptions.keyword}
                        onChange={handleKeywordChange}
                        className="filterInput"
                        placeholder="Search by keyword..."
                    />
                </div>
                {/* Selection menu to choose a category */}
                <div className="mb-2">
                    <label htmlFor="category" className="font-medium block mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        value={filterOptions.category}
                        onChange={handleCategoryChange}
                        className="filterInput"
                    >
                        <option value="">Select a category...</option>
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </select>
                </div>
                {/* Input field to filter through a date range */}
                <div className="mb-2">
                    <label htmlFor="dateRange" className="font-medium block mb-1">
                        Date Range
                    </label>
                    <input
                        type="date"
                        id="dateRange"
                        value={filterOptions.dateRange}
                        onChange={handleDateRangeChange}
                        className="filterInput"
                    />
                </div>
                <div>
                    <h3>Price</h3>
                    <Slider
                        range
                        min={0}
                        max={300}
                        step={10}
                        defaultValue={[10, 100]}
                        value={filterOptions.price}
                        onChange={handlePriceChange}
                    />
                    <p>
                        ₹{filterOptions.price[0]} - ₹{filterOptions.price[1]}
                    </p>
                </div>
                {/* Button to apply filters */}
                <button
                    type="submit"
                    className="bg-[color:var(--secondary-color)] text-white py-2 px-4 rounded-lg hover:bg-[color:var(--darker-secondary-color)]"
                >
                    Apply Filters
                </button>
            </form>
        </div>
    );
}

export default Dashboard_Filter