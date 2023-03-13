import UserNavBar from "@/components/UserNavBar";
import { getUserToken } from "@/utils/getUserToken";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EventPage() {
    const router = useRouter();
    const eventId = router.query.eventId;
    const userId = getUserToken();
    const [eventData, setEventData] = useState([]);
    const [isUserRegistered, setIsUserRegistered] = useState(false);

    // function to handle share button click
    const share = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: eventData.name,
                    text: "Check out this event!",
                    url: window.location.href,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
        }
    };

    // function that fetches the event data on load
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
                setEventData(data);
                // Check if the user's ID exists in the participants array
                setIsUserRegistered(
                    data.participants.some(
                        (participant) => participant.id === userId
                    )
                );
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching event data:", error.message);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [eventId]); // fetch event on component mount and when eventId changes

    if (!eventData || !eventData.cover)
        // If event data isn't loaded correctly, it should recall API
        return <div onLoad={fetchEvent()}>loading...</div>;
    else
        return (
            <div className="pt-20 lg:pt-8 bg-[color:var(--primary-color)]">
                <UserNavBar />
                <div className="flex flex-col items-center justify-center">
                    <Head>
                        <title>{eventData.name}</title>
                    </Head>
                    {/* Top div with image */}
                    <div className="relative h-40 sm:h-[25rem] overflow-hidden container shadow-lg">
                        {/* blurred image background */}
                        <Image
                            src={eventData.cover}
                            alt={eventData.name}
                            fill
                            placeholder="blur"
                            blurDataURL={eventData.cover}
                            className="h-[25rem] container filter blur hidden lg:block object-cover"
                        />

                        <div className="absolute inset-0 w-full h-40 sm:h-[25rem] container">
                            <Image
                                // src="https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-jo-bolta-hai-wohi-hota-hai-ft-harsh-gujral-0-2023-2-3-t-9-23-51.jpg"
                                src={eventData.cover}
                                alt="Event image"
                                fill
                                className="absolute object-contain object-center"
                            />
                        </div>
                    </div>

                    {/* Second div with event details and ticket pricing */}
                    <div className="container bg-white py-4 mt-4 rounded-lg shadow-md">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                        {eventData.name}
                                    </h1>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="text-md text-gray-800 mr-4">
                                            <span className="font-bold">
                                                Date:
                                            </span>{" "}
                                            {eventData.date}
                                        </div>
                                        <div className="text-md text-gray-800 mr-4">
                                            <span className="font-bold">
                                                Time:
                                            </span>{" "}
                                            {eventData.time}
                                        </div>
                                        <div className="text-md text-gray-800 mr-4">
                                            <span className="font-bold">
                                                Venue:
                                            </span>{" "}
                                            {eventData.venue}
                                        </div>
                                        <div className="text-md text-gray-800 mr-4">
                                            <span className="font-bold">
                                                Organizer:
                                            </span>{" "}
                                            {eventData.organizer}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left lg:text-right mt-4 lg:mt-0">
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/event/${eventId}/payment`
                                            )
                                        }
                                        className={`px-6 py-2 ${
                                            isUserRegistered
                                                ? "bg-gray-700 hover:bg-gray-800"
                                                : "bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)]"
                                        } text-white rounded focus:outline-none`}
                                        disabled={isUserRegistered}
                                    >
                                        {isUserRegistered
                                            ? "Already Registered"
                                            : "Buy Tickets"}
                                    </button>
                                </div>
                            </div>
                            <div className="border-b border-gray-300 mt-8 mb-4"></div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex flex-col">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Ticket Pricing
                                    </h3>
                                    <p className="text-gray-800">
                                        ₹{eventData.price}
                                    </p>
                                </div>
                                <div className="flex mt-4 md:mt-0">
                                    <button
                                        onClick={share}
                                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                                    >
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Third div with major event details */}
                    <div className="container mt-4 bg-[color:var(--primary-color)]">
                        <div className="container">
                            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                                <div className="mb-4 max-w-5xl bg-white px-6 py-4 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        About the Event
                                    </h3>
                                    {Array(3)
                                        .fill()
                                        .map((_, index) => (
                                            <p
                                                key={index}
                                                className="text-gray-600 text-md"
                                            >
                                                {eventData.description}
                                            </p>
                                        ))}
                                </div>
                                <div className="mb-4 bg-white px-6 py-4 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Ticket Prices
                                    </h3>
                                    <ul className="text-gray-600">
                                        {[
                                            {
                                                type: "General*",
                                                price: eventData.price,
                                            },
                                            {
                                                type: "VIP*",
                                                price: 2 * eventData.price,
                                            },
                                            {
                                                type: "VVIP*",
                                                price: 4 * eventData.price,
                                            },
                                        ].map((item, index) => (
                                            <li
                                                className="flex items-center h-16 py-1 rounded-md p-4 mb-2 hover:shadow-md"
                                                key={index}
                                            >
                                                <span className="w-1/3">
                                                    {item.type}
                                                </span>
                                                <span className="w-1/3 text-center">
                                                    ₹{item.price}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        router.push(
                                                            `/event/${eventId}/payment`
                                                        )
                                                    }
                                                    className={`px-3 py-2 ${
                                                        isUserRegistered
                                                            ? "bg-gray-700 hover:bg-gray-800"
                                                            : "bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)]"
                                                    } text-white rounded focus:outline-none`}
                                                    disabled={isUserRegistered}
                                                >
                                                    {isUserRegistered
                                                        ? "Registered"
                                                        : "Buy Tickets"}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-sm text-[color:var(--darker-secondary-color)] mt-6">
                                        *Caution: All ticket sales are final and
                                        non-refundable.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default EventPage;
