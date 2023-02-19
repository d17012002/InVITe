import { useRouter } from "next/router"
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import { HiOutlineTicket } from "react-icons/hi";

function EventPage() {
    const router = useRouter();
    const eventId = router.query.eventId;

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    return (
        <div className="bg-gray-100 h-screen">
            <Head>
                <title>Event Page {eventId}</title>
                <meta name="description" content="Example of an event page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto pt-10 pb-5">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-3/5 md:mr-5">
                        <div className="relative h-96 md:h-full">
                            <Image src="https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-jo-bolta-hai-wohi-hota-hai-ft-harsh-gujral-0-2023-2-3-t-9-23-51.jpg" layout="fill" objectFit="cover" />
                        </div>
                    </div>
                    <div className="md:w-2/5 md:ml-5 pt-5 md:pt-0">
                        <h1 className="text-4xl font-bold mb-2">Event {eventId}</h1>
                        <h3 className="text-2xl font-medium mb-2">Club {eventId}</h3>
                        <p className="text-gray-500 text-lg mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <div className="flex items-center mb-4">
                            <AiOutlineCalendar size={20} className="mr-2" />
                            <p className="text-gray-500 text-lg">Fri 24 Feb 2023 at 8:30 PM</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <GrLocation size={20} className="mr-2" />
                            <p className="text-gray-500 text-lg">Under Belly</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <FaRegMoneyBillAlt size={20} className="mr-2" />
                            <p className="text-gray-500 text-lg">₹500</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <HiOutlineTicket size={20} className="mr-2" />
                            <p className="text-gray-500 text-lg">{quantity} ticket(s)</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="border-2 border-gray-300 rounded-md p-2 w-24 text-lg focus:outline-none"
                            />
                        </div>
                        <button className="bg-[color:var(--secondary-color)] text-white rounded-lg px-5 py-2 hover:bg-[color:var(--darker-secondary-color)] flex items-center">
                            Book now <RiArrowRightSLine className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventPage