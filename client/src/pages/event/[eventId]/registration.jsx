import AdminNavBar from "@/components/AdminNavBar";
import dummyUsers from "@/utils/dummyUsers";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";

const Registration = () => {
    const router = useRouter();
    const eventId = router.query.eventId;
    const [showChecklist, setShowChecklist] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/getevent`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            event_id: eventId,
                        }),
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.participants);
                } else {
                    throw new Error(
                        `${response.status} ${response.statusText}`
                    );
                }
            } catch (error) {
                console.error("Error fetching event data:", error.message);
            }
        };

        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    function handleCheckboxChange(userId) {
        setUsers(
            users.map((user) => {
                if (user.id === userId) {
                    return {
                        ...user,
                        checked: !user.checked,
                    };
                }
                return user;
            })
        );
    }

    const handleSubmit = async () => {
        const checkedUsers = users
            .filter((user) => user.checked)
            .map((user) => user.id);
        console.log(checkedUsers);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/event/checkin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        event_id: eventId,
                        checkInList: checkedUsers,
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                if (data.msg == "success") {
                    router.reload();
                }
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching event data:", error.message);
        }
    };

    return (
        <div className="pt-20 lg:pt-8 bg-[color:var(--primary-color)]">
            <AdminNavBar />
            <div className="container h-screen mx-auto my-4">
                <div className="flex flex-col gap-y-3 sm:flex-row sm:gap-y-0 justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <button
                            className={`px-4 py-2 rounded ${
                                showChecklist
                                    ? "bg-gray-300 text-gray-800"
                                    : "bg-[color:var(--darker-secondary-color)] text-white hover:bg-[color:var(--secondary-color)]"
                            }`}
                            onClick={() => setShowChecklist(false)}
                        >
                            All Users
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${
                                showChecklist
                                    ? "bg-[color:var(--darker-secondary-color)] text-white hover:bg-[color:var(--secondary-color)]"
                                    : "bg-gray-300 text-gray-800"
                            }`}
                            onClick={() => setShowChecklist(true)}
                        >
                            Check List
                        </button>
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-[3%] py-1 border border-gray-400 rounded-md focus:border-[color:var(--darker-secondary-color)] focus:outline-none focus:ring-1 focus:ring-[color:var(--darker-secondary-color)]"
                        />
                    </div>
                </div>

                {showChecklist ? (
                    <div className="overflow-x-auto overflow-y-auto">
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        #
                                    </th>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        Name
                                    </th>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        Email
                                    </th>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        Reg. No.
                                    </th>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        Checked
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* .filter((user) => user.checked) */}
                                {users
                                    .filter(
                                        (user) =>
                                            user.name
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase()
                                                ) && !user.entry
                                    )
                                    .map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className={
                                                user.checked ? "line-through" : ""
                                            }
                                        >
                                            <td className="p-2 border border-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                {user.name}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                {user.email}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                {user.regno}
                                            </td>
                                            <td className="p-2 border border-gray-300 text-center w-1/4">
                                                <label
                                                    htmlFor={`checkbox-${user.id}`}
                                                    className="flex cursor-pointer"
                                                >
                                                    <div className="relative">
                                                        <input
                                                            id={`checkbox-${user.id}`}
                                                            type="checkbox"
                                                            value={user.id}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    user.id
                                                                )
                                                            }
                                                            className="sr-only"
                                                        />
                                                        <div
                                                            className={`bg-white border border-[color:var(--darker-secondary-color)] rounded-md shadow-sm w-6 h-6 flex items-center justify-center mr-2 ${
                                                                user.checked
                                                                    ? "ring-1 ring-[color:var(--darker-secondary-color)]"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {user.checked && (
                                                                <FaCheck className="text-[color:var(--secondary-color)]" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="select-none">
                                                        {user.passID}
                                                    </div>
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto overflow-y-auto">
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        #
                                    </th>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        Name
                                    </th>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        Email
                                    </th>
                                    <th className="p-2 bg-gray-100 border border-gray-300">
                                        Reg. No.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users
                                    .filter((user) =>
                                        user.name
                                            .toLowerCase()
                                            .includes(searchQuery.toLowerCase())
                                    )
                                    .map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="p-2 border border-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                {user.name}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                {user.email}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                                {user.regno}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {showChecklist ? (
                    <center>
                        <button
                            onClick={handleSubmit}
                            className="bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] mt-3 text-white py-3 px-[15%] rounded-md transition duration-300 ease-in-out"
                        >
                            Submit list
                        </button>
                    </center>
                ) : null}
            </div>
        </div>
    );
};

export default Registration;
