import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

function EventPage() {
    const router = useRouter();
    const eventId = router.query.eventId;

    return (
        <div className="flex flex-col items-center justify-center bg-[color:var(--primary-color)]">
            <Head>
                <title>Event Page {eventId}</title>
            </Head>
            {/* Top div with image */}
            <div className="relative h-40 sm:h-[25rem] overflow-hidden container shadow-lg">
                <div className="event__image h-[25rem] container bg-cover bg-center filter blur hidden lg:block" />
                <div className="absolute inset-0 w-full h-40 sm:h-[25rem] container">
                    <Image
                        src="https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-jo-bolta-hai-wohi-hota-hai-ft-harsh-gujral-0-2023-2-3-t-9-23-51.jpg"
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
                                Tehelka Stand-Up Comedy Feat. Shubham Shandilya{" "}
                                {eventId}
                            </h1>
                            <div className="flex flex-col md:flex-row">
                                <div className="text-md text-gray-800 mr-4">
                                    <span className="font-bold">Date:</span>{" "}
                                    Sun, 15 Aug 2023
                                </div>
                                <div className="text-md text-gray-800 mr-4">
                                    <span className="font-bold">Time:</span>{" "}
                                    6:00 PM
                                </div>
                                <div className="text-md text-gray-800 mr-4">
                                    <span className="font-bold">Venue:</span>{" "}
                                    Jawaharlal Nehru Indoor Stadium
                                </div>
                            </div>
                        </div>
                        <div className="text-left lg:text-right mt-4 lg:mt-0">
                            <button className="px-6 py-2 bg-[color:var(--darker-secondary-color)] text-white rounded hover:bg-[color:var(--secondary-color)] focus:outline-none">
                                Buy Tickets
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
                                General Admission - ₹500
                            </p>
                        </div>
                        <div className="flex mt-4 md:mt-0">
                            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none mr-4">
                                Add to Wishlist
                            </button>
                            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none">
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
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Duis mattis tristique
                                        augue sed sagittis. Vestibulum ultrices
                                        leo eu tortor euismod consectetur.
                                        Aenean sagittis erat a eros maximus
                                        commodo. Maecenas rhoncus enim a ipsum
                                        luctus, ut efficitur metus viverra.
                                        Etiam fermentum convallis lectus, in
                                        euismod mi commodo vitae. Nunc convallis
                                        feugiat ante, vel lobortis dolor
                                        pulvinar vitae.
                                    </p>
                                ))}
                        </div>
                        <div className="mb-4 bg-white px-6 py-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Ticket Prices
                            </h3>
                            <ul className="text-gray-600">
                                {[
                                    { type: "General*", price: 500 },
                                    { type: "VIP*", price: 1000 },
                                    { type: "VVIP*", price: 2000 },
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
                                        <button className="w-1/3 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white py-1 px-2 rounded-md text-sm transition duration-300 ease-in-out">
                                            Buy Now
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm text-gray-600 mt-6">
                                *Caution: All ticket sales are final and
                                non-refundable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventPage;
