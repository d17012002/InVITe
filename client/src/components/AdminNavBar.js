import { getAdminToken } from "@/utils/getAdminToken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminDropdown from "@/components/AdminDropdown";

export default function NavBar({ children }) {
    const router = useRouter();

    const adminIdCookie = getAdminToken();

    const fetchAdminData = async () => {
        // If cookie was manually removed from browser
        if (!adminIdCookie) {
            console.error("No cookie found! Please authenticate");
            // redirect to signin
            router.push("/admin/auth");
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    return (
        <div>
            <header className="bg-[color:var(--white-color)] fixed top-0 z-50 w-full shadow-md text-[color:var(--darker-secondary-color)]">
                <div className="container mx-auto flex items-center flex-col lg:flex-row justify-between p-4">
                    <div
                        onClick={() => router.push("/admin/dashboard")}
                        className="flex items-center gap-x-3 cursor-pointer"
                    >
                        <Image
                            src="/favicon_io/android-chrome-192x192.png"
                            width={500}
                            height={500}
                            alt="Logo"
                            className="h-8 w-8"
                        />
                        <h1 className="m-2 text-black font-bold text-4xl">
                            {"<In"}
                            <span className="text-[color:var(--darker-secondary-color)]">
                                VIT
                            </span>
                            {"e />"}
                        </h1>
                    </div>
                    <nav className="text-sm">
                        <ul className="flex items-center">
                            <li
                                // onClick={() => router.push("/")}
                                className="mr-4 cursor-pointer"
                            >
                                <a>Past Events</a>
                            </li>
                            <li
                                onClick={() => router.push("/")}
                                className="mr-4 cursor-pointer"
                            >
                                <a>About us</a>
                            </li>
                            <AdminDropdown />
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="pt-36 lg:pt-28 bg-[color:var(--primary-color)]">
                {/* Display everything that's inside <NavBar> & </NavBar> Here */}
                {children}
            </div>
        </div>
    );
}
