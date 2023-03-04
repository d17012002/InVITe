import AdminNavBar from "@/components/AdminNavBar";
import dummyUsers from "@/utils/dummyUsers";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Registration = () => {
    const [showChecklist, setShowChecklist] = useState(false);
    const [users, setUsers] = useState(dummyUsers);
    const [searchQuery, setSearchQuery] = useState("");

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

    return (
        <AdminNavBar>
            <div className="container h-screen mx-auto my-4">
                <div className="flex justify-between items-center mb-4">
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
                            className="px-3 py-1 border border-gray-400 rounded-md focus:border-[color:var(--darker-secondary-color)] focus:outline-none focus:ring-1 focus:ring-[color:var(--darker-secondary-color)]"
                        />
                    </div>
                </div>

                {showChecklist ? (
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
                                .sort((a, b) => a.id - b.id)
                                .filter((user) =>
                                    user.name
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                                )
                                .map((user) => (
                                    <tr
                                        key={user.id}
                                        className={
                                            user.checked ? "line-through" : ""
                                        }
                                    >
                                        <td className="p-2 border border-gray-300">
                                            {user.id}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {user.name}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {user.email}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {user.regNo}
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
                                                    {user.passId}
                                                </div>
                                            </label>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ) : (
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
                                .sort((a, b) => a.id - b.id)
                                .filter((user) =>
                                    user.name
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                                )
                                .map((user) => (
                                    <tr key={user.id}>
                                        <td className="p-2 border border-gray-300">
                                            {user.id}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {user.name}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {user.email}
                                        </td>
                                        <td className="p-2 border border-gray-300">
                                            {user.regNo}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminNavBar>
    );
};

export default Registration;
