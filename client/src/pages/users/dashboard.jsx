
/// import SearchDate from "@/components/SearchDate";
import UserImages from "@/utils/user_dashboard_images";
import React, {useState} from "react";

function UserDashboard() {

  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="flex m-auto max-w-screen-xl">
      <div className="flex flex-col w-1/4 p-4 bg-gray-200">
        <h2 className="text-lg font-medium mb-4">Filter</h2>
        <div className="">
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="sort-by">
              Sort By
            </label>
            <select
              className="bg-white border border-gray-400 rounded-lg w-full py-2 px-4"
              id="sort-by"
            >
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2" htmlFor="category">
              Category
            </label>
            <select
              className="bg-white border border-gray-400 rounded-lg w-full py-2 px-4"
              id="category"
            >
              <option>All</option>
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
            </select>
          </div>
          {/* <div className="mb-4">
            {showSearch && <SearchDate />}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="banner__searchButton"
              variant="outlined"
            >
              {showSearch ? "Hide" : "Search Dates"}
            </button>
          </div> */}
        </div>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-lg font-medium mb-4">Cards</h2>
        <div className="grid grid-cols-3 gap-4">
          {UserImages?.map((image) => (
            <div className="mx-5 mt-5" key={image.id}>
              <img className="rounded-lg bg-cover" src={image.src} alt="" />
              <div className="flex flex-row justify-between items-start mt-4">
                <div>
                  <p className="text-sm text-gray-800 font-bold">Event, XYZ Club</p>
                  <p className="text-sm text-gray-800">49 kilometers away</p>
                  <p className="text-sm text-gray-800">Aug 18-25</p>
                  <p className="text-sm text-gray-800 mt-2">
                    {" "}
                    <strong>$2,135</strong>
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <p className="text-sm">4,92</p>
                </div>
              </div>
            </div>
            /* <div className="bg-white rounded-lg shadow-md" key={image.id}>
              <img className="w-full h-48 object-cover" src={image.src} alt={image.alt} />
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">{image.title}</h3>
                <p className="text-gray-600 mb-2">{image.club}</p>
              </div>
            </div> */
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
