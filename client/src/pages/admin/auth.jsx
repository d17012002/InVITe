import { setAdminToken } from "@/utils/setAdminToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Cookies from "universal-cookie";

export async function getServerSideProps(context) {
    const cookies = new Cookies(context.req.headers.cookie);
    const adminId = cookies.get("admin_token");
    if (!adminId) {
        return {
            props: { adminIdCookie: null },
        };
    }
    return {
        props: { adminIdCookie: adminId },
    };
}

export default function signin({ adminIdCookie }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
    const router = useRouter();

    useEffect(() => {
        // If cookie found, Redirect to dashboard
        if (adminIdCookie) {
            setStep(2); // Skip auth steps

            setTimeout(() => {
                // Set success message
                setMessage({
                    errorMsg: "",
                    successMsg: "Redirecting you ...",
                });
            }, 500);

            // Redirect to dashboard
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 800);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/auth`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            setMessage({ errorMsg: "", successMsg: data.msg });
            console.log(data);
            setStep(2); // Move to next step on the same page

            setAdminToken(data.admin_token); // set cookie when signed up
        } else {
            console.error(`Failed with status code ${response.status}`);
            setMessage({ errorMsg: data.msg, successMsg: "" });
        }
    };

    return (
        <div className="m-2">
            {/* back button */}
            <FiArrowLeft
                onClick={() => router.push("/")}
                size={24}
                className="cursor-pointer"
            />
            {/* Page heading */}
            <div className="text-center text-3xl font-bold">
                Admin Authentication Page
            </div>

            {/* Page Content */}
            <div className="max-w-3xl mx-auto mt-10">
                {/* Steps Nav */}
                <div className="flex items-center justify-center">
                    {/* Step 1: normal-height:fit; mobile-view: 6rem*/}
                    <div
                        className={`w-full h-24 lg:h-fit ${
                            step === 1 ? `font-medium` : ``
                        }`}
                    >
                        <div
                            className={`h-full border-2 rounded-l-lg px-5 py-2 ${
                                step >= 1
                                    ? `text-white bg-[color:var(--darker-secondary-color)] border-r-white border-[color:var(--darker-secondary-color)]`
                                    : `border-[color:var(--darker-secondary-color)] border-dashed`
                            }`}
                        >
                            <div>01</div>
                            Verify Credentials
                        </div>
                    </div>

                    {/* Step 2: normal-height:fit; mobile-view: 6rem */}
                    <div
                        className={`w-full h-24 lg:h-fit ${
                            step === 2 ? `font-medium` : ``
                        }`}
                    >
                        <div
                            className={`h-full border-2 border-l-0 rounded-r-lg px-5 py-2 ${
                                step >= 2
                                    ? `text-white bg-[color:var(--darker-secondary-color)] border-[color:var(--darker-secondary-color)]`
                                    : `border-[color:var(--darker-secondary-color)] border-dashed`
                            }`}
                        >
                            <div>02</div>
                            Go to Dashboard!
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {message.errorMsg && (
                    <h1 className="rounded p-3 my-2 bg-red-200 text-red-600 font-medium">
                        {message.errorMsg}
                    </h1>
                )}

                {/* Success Message */}
                {message.successMsg && (
                    <h1 className="rounded p-3 my-2 bg-green-200 text-green-600 font-medium">
                        {message.successMsg}
                    </h1>
                )}

                {/* Steps Content */}
                <div className="bg-white p-5 rounded-lg mt-2">
                    {
                        /* Step 1 Content*/
                        step === 1 && (
                            <form onSubmit={handleSubmit}>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Enter your Registered Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-full"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Enter your Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-full"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                <p className="text-sm text-gray-700 mt-6">
                                    *You have the option to designate yourself
                                    as an admin for testing purposes by
                                    following this{" "}
                                    <a
                                        href="https://invite-developers.vercel.app/"
                                        target="_blank"
                                        className="text-[color:var(--darker-secondary-color)]"
                                    >
                                        link.
                                    </a>
                                </p>

                                <button
                                    type="submit"
                                    className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mt-4 mb-4 sm:w-auto sm:mb-0"
                                >
                                    Verify
                                </button>

                                <button
                                    type="submit"
                                    onClick={() => {
                                        setEmail("invite.testing@gmail.com");
                                        setPassword("invite123");
                                    }}
                                    className="btn text-white bg-gray-700 hover:bg-gray-800 mt-4 w-full sm:w-auto sm:ml-4"
                                >
                                    Use Test Credentials
                                </button>
                            </form>
                        )
                    }
                    {
                        /* Step 2 Content */
                        step === 2 && (
                            <div>
                                <div className="bg-green-50 border-b border-green-400 text-green-800 text-sm p-4 flex justify-between">
                                    <div>
                                        <div className="flex items-center">
                                            <p>
                                                <span className="font-bold">
                                                    Hey there!{" "}
                                                </span>
                                                Welcome back, you're
                                                successfully signed in!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        router.push("/admin/dashboard")
                                    }
                                    className="mt-4 bg-[color:var(--darker-secondary-color)] text-white py-2 px-4 rounded hover:bg-[color:var(--secondary-color)] transition ease-in-out"
                                >
                                    Go to your dashboard
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
