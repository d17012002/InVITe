import NavBar from "@/components/UserNavBar";
import { getUserToken } from "@/utils/getUserToken";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

export default function payment() {
    
    const router = useRouter();

    // const [eventDetails, setEventDetails] = useState({ name: "", price: "" });
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: "",
    });

    const now = new Date();
    const future = new Date(now.getFullYear() + 2, now.getMonth());
    const month =
        future.getMonth() < 9
            ? `0${future.getMonth() + 1}`
            : future.getMonth() + 1;
    const year = future.getFullYear().toString().substr(-2);

    // Get Event-Id from URL
    const event_id = router.query.eventId;
    // console.log(event_id);

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
                    event_id: event_id,
                }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                setName(data.name);
                setPrice(data.price);
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            } catch (error) {
            console.error("Error fetching event data:", error.message);
            }
        };

        if (event_id) {
            fetchEvent();
        }
    }, [event_id]);

    useEffect(() => {
    if (name && price && event_id) {
        setProduct({
        name: name,
        price: price,
        description: `Pay Rs. ${price} for the most awaited event, ${name}`,
        });
    }
    }, [name, price, event_id]);

    const handleToken = async (event, token, addresses) => {
        // Fetching user_token cookie value in user_id
        const user_id = getUserToken();

        // console.log("Payment gateway cookie fetch - ", user_id);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token,
                        product,
                        addresses,
                        user: { user_id },
                        event: { event_id },
                    }),
                }
            );
            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                alert("Payment Successful");
                router.push("/users/dashboard");
            }
            else if(data.status === "alreadyregistered"){
                alert("User is already registered.");
                router.push("/users/dashboard");
            }
            else {
                console.error(`Failed with status code ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    

    return (
        <div className="pt-20 lg:pt-8">
            <NavBar />
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Puritan&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex flex-col m-6 ">
                <div className="text-3xl">
                    Pay using{" "}
                    <span
                        className="text-4xl font-bold"
                        style={{ color: "#5F57F7", fontFamily: "Puritan" }}
                    >
                        stripe
                    </span>
                </div>
                <div className="text-sm text-gray-400">
                    Payment is currently in Test Mode
                </div>

                <div className="m-6 flex flex-col ">
                    <div>Use the following test credentials: </div>

                    <div className="relative mb-6 overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-1/3 ">
                        <table className="w-full text-sm text-left my-2">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Field
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        Card Number
                                    </th>
                                    <td
                                        className="px-6 py-4"
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                "4242 4242 4242 4242"
                                            );
                                        }}
                                        title="Click to copy"
                                    >
                                        4242 4242 4242 4242
                                    </td>
                                </tr>
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        Expiry
                                    </th>
                                    <td className="px-6 py-4">
                                        Any future date (eg: {month}/{year})
                                    </td>
                                </tr>
                                <tr className="bg-white hover:bg-gray-50">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium whitespace-nowrap"
                                    >
                                        CVC
                                    </th>
                                    <td className="px-6 py-4">
                                        Any 3 digit number (eg: 345)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <StripeCheckout
                        className="flex justify-center w-max"
                        stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
                        amount={product.price * 100}
                        token={handleToken}
                        name={product.name}
                        currency="INR"
                        billingAddress
                        shippingAddress
                    />
                </div>
            </div>
        </div>
    );
}
