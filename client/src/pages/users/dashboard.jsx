import Dashboard_Filter from "@/components/Dashboard_Filter";
import NavBar from "@/components/NavBar";
import UserImages from "@/utils/user_dashboard_images";
import Image from "next/image";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import Cookies from "universal-cookie";

function UserDashboard() {
    const cookies = new Cookies();
    console.log("Found this from cookies ", cookies.get("user_token"));

    return (
        <div className="h-full overflow-y-hidden">
            <NavBar />
            <div className="flex m-auto pt-28 overflow-y-hidden h-[calc(100vh)]">
                <div className="flex mx-auto container ">
                    <div className="flex flex-col p-4 sticky top-0 w-1/4">
                        <Dashboard_Filter />
                    </div>
                    <div className="w-3/4 p-4 overflow-y-auto h-[calc(80vh)]">
                        <h2 className="text-lg font-medium mb-4">Cards</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {UserImages?.map((image) => (
                                <div
                                    className=" mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
                                    key={image.id}
                                >
                                    <Image
                                        width={500}
                                        height={500}
                                        className="w-full rounded-lg bg-cover"
                                        src={image.src}
                                        alt=""
                                    />
                                    <div className="flex flex-row justify-between items-start mt-4">
                                        <div>
                                            <p className="text-sm text-gray-800 font-bold">
                                                Event, XYZ Club
                                            </p>
                                            <p className="text-sm text-gray-800">
                                                49 kilometers away
                                            </p>
                                            <p className="text-sm text-gray-800">
                                                Aug 18-25
                                            </p>
                                            <p className="text-sm text-gray-800 mt-2">
                                                {" "}
                                                <strong>$2,135</strong>
                                            </p>
                                        </div>
                                        {/* Star component */}
                                        <div className="flex flex-row items-center">
                                            <AiOutlineStar />
                                            <p className="text-sm">4,92</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
