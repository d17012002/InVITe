import Dashboard_Filter from "@/components/Dashboard_Filter";
import UserImages from "@/utils/user_dashboard_images";
import React from "react";
import { AiFillStar } from "react-icons/ai";

function UserDashboard() {
  return (
    <div className="flex m-auto max-w-screen-xl">
      <div className="flex flex-col w-1/4 p-4 bg-[color:var(--primary-color)]">
        <Dashboard_Filter />
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
                {/* Star component */}
                <div className="flex flex-row items-center">
                  <AiFillStar />
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
