import React from 'react'
import UserImages from "@/utils/user_dashboard_images";

function UserDashboard() {
    return (
        <div className="flex">
            <div className="w-1/4 p-4 bg-gray-200">
                <h2 className="text-lg font-medium mb-4">Filter</h2>
                <form>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="sort-by">Sort By</label>
                        <select className="bg-white border border-gray-400 rounded-lg w-full py-2 px-4" id="sort-by">
                            <option>Newest</option>
                            <option>Oldest</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="category">Category</label>
                        <select className="bg-white border border-gray-400 rounded-lg w-full py-2 px-4" id="category">
                            <option>All</option>
                            <option>Category 1</option>
                            <option>Category 2</option>
                            <option>Category 3</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="w-3/4 p-4">
                <h2 className="text-lg font-medium mb-4">Cards</h2>
                <div className="grid grid-cols-3 gap-4">
                    {UserImages.map(image => (
                        <div className="bg-white rounded-lg shadow-md" key={image.id}>
                            <img className="w-full h-48 object-cover" src={image.src} alt={image.alt} />
                            <div className="p-4">
                                <h3 className="text-lg font-medium mb-2">{image.title}</h3>
                                <p className="text-gray-600 mb-2">{image.club}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserDashboard