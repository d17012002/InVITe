import Dashboard_Filter from "@/components/Dashboard_Filter";
import NavBar from "@/components/NavBar";
import UserImages from "@/utils/user_dashboard_images";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineStar } from "react-icons/ai";

function UserDashboard() {
    const router = useRouter();
    return (
        <NavBar>
            <div className="flex m-auto overflow-y-hidden h-[calc(100vh)]">
                <div className="flex mx-auto container ">
                    <div className="flex flex-col p-4 sticky top-0 w-1/4">
                        <Dashboard_Filter />
                    </div>
                    <div className="w-3/4 p-4 overflow-y-auto h-[calc(80vh)]">
                        <h2 className="text-lg font-medium mb-4">Cards</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            <div
                                onClick={() => {
                                    router.push("/event/123");
                                }}
                                className="hover:scale-105 cursor-pointer transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
                                key="0"
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    className="w-full rounded-lg bg-cover"
                                    src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-V2VkLCA1IEFwciBvbndhcmRz,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00319088-awvqxbtxsl-portrait.jpg"
                                    alt=""
                                />
                                <div className="flex flex-row justify-between items-start mt-4">
                                    <div className="w-3/4 px-2">
                                        <p className="text-sm text-gray-800 font-bold">
                                            Jo Bolta Hai Wohi Hota Hai Ft. Harsh
                                            Gujral
                                        </p>
                                        <p className="text-sm text-gray-800">
                                            Auditorium
                                        </p>
                                        <p className="text-sm text-gray-800">
                                            Mar 18-25
                                        </p>
                                    </div>
                                    {/* Star component */}
                                    <div className="flex flex-col items-center w-1/4">
                                        <span className="w-full flex flex-row items-center">
                                            <AiOutlineStar />
                                            <span className="text-sm">
                                                4,92
                                            </span>
                                        </span>
                                        <p className="text-sm text-gray-800 mt-2">
                                            <strong>Rs. 100</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {UserImages?.map((image) => (
                                <div
                                    className="hover:scale-105 cursor-pointer transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
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
        </NavBar>
    );
}

export default UserDashboard;
