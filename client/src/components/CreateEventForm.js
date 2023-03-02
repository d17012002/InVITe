import { useState } from "react";

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        name: "",
        venue: "",
        datetime: "",
        price: "",
        poster: "",
        description: "",
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        const datetemp = new Date(formData.datetime);
        const formattedDate = datetemp.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const formattedTime = datetemp.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        const date = `${formattedDate}`;
        const time = `${formattedTime}`;
        console.log(formData);
        const requestBody = {
            name: formData.name,
            venue: formData.venue,
            date: date,
            time: time,
            description: formData.description,
            price: formData.price,
            poster: formData.poster,
        };
        console.log(requestBody);
        // server post request
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/post/event`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            }
        );
        const data = await response.json();
        if (response.status === 200) {
            console.log(data);
        }
        else {
            console.error(`Failed with status code ${response.status}`);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="h-full flex items-center">
            <div className="bg-white rela p-8 w-full rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">
                    Create an Event
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block font-medium text-gray-700"
                        >
                            Title:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="adminDropDownInput"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="venue"
                            className="block font-medium text-gray-700"
                        >
                            Venue:
                        </label>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            className="adminDropDownInput"
                            value={formData.venue}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="cursor-default mt-1">
                        <label
                            htmlFor="datetime"
                            className="block font-medium text-gray-700"
                        >
                            Date and Time:
                        </label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            name="datetime"
                            className="adminDropDownInput"
                            value={formData.datetime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block font-medium text-gray-700"
                        >
                            Price:
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="adminDropDownInput"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="poster"
                            className="block font-medium text-gray-700"
                        >
                            Poster URL:
                        </label>
                        <input
                            type="url"
                            id="poster"
                            name="poster"
                            className="adminDropDownInput"
                            value={formData.poster}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block font-medium text-gray-700"
                        >
                            Description:
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="adminDropDownInput"
                            value={formData.description}
                            rows="5"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-center w-full px-4 py-2 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] transition-all ease-in-out text-white font-bold rounded-lg"
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
