import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";
import { GrFormClose } from "react-icons/gr";

function Popup_Filter({
    filterOptions = {
        keyword: "",
        category: "",
        dateRange: "",
        price: [10, 3000],
    },
    setFilterOptions,
    handleClose,
    handleFilterClear,
}) {
    // function to handle filter values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "keyword":
                setFilterOptions({ ...filterOptions, keyword: value });
                break;
            case "category":
                setFilterOptions({ ...filterOptions, category: value });
                break;
            case "dateRange":
                setFilterOptions({ ...filterOptions, dateRange: value });
                break;
            default:
                break;
        }
    };

    // Handle input change for the status filter
    const handlePriceChange = (value) => {
        setFilterOptions({ ...filterOptions, price: [...value] });
    };

    return (
        // Add filter options to the DOM element
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 mt-[8rem] bg-white p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filter Options</h2>
                <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleClose}
                >
                    <GrFormClose className="h-6 w-6" />
                </button>
            </div>
            <form className="flex flex-col gap-y-3" onSubmit={handleClose}>
                {/* Input to search through keyword */}
                <div className="mb-2">
                    <label htmlFor="keyword" className="font-medium block mb-1">
                        Keyword
                    </label>
                    <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        value={filterOptions.keyword}
                        onChange={handleInputChange}
                        className="filterInput"
                        placeholder="Search by keyword..."
                    />
                </div>
                {/* Selection menu to choose a category */}
                <div className="mb-2">
                    <label
                        htmlFor="category"
                        className="font-medium block mb-1"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={filterOptions.category}
                        onChange={handleInputChange}
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
                    <label
                        htmlFor="dateRange"
                        className="font-medium block mb-1"
                    >
                        Date Range
                    </label>
                    <input
                        type="date"
                        id="dateRange"
                        name="dateRange"
                        value={filterOptions.dateRange}
                        onChange={handleInputChange}
                        className="filterInput"
                    />
                </div>
                <div>
                    <h3>Price</h3>
                    <Slider
                        range
                        min={0}
                        max={3000}
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
                    className="bg-[color:var(--darker-secondary-color)] text-white py-2 px-4 rounded-lg hover:bg-[color:var(--secondary-color)]"
                >
                    Apply Filters
                </button>
            </form>
            <button
                onClick={handleFilterClear}
                className="w-full mt-2 text-white py-2 px-4 rounded-lg bg-gray-700 hover:bg-gray-800"
            >
                Clear Filters
            </button>
        </div>
    );
}

export default Popup_Filter;
