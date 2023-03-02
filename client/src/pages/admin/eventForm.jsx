import AdminNavBar from "@/components/AdminNavBar";
import CreateEventForm from "@/components/CreateEventForm";
import Image from "next/image";
import React from "react";

function eventForm() {
    return (
        <AdminNavBar>
            <div className="flex flex-col md:flex-row justify-center md:h-screen bg-[color:var(--primary-color)]">
                <div className="flex-1 mx-6 my-6 bg-[color:var(--primary-color)]">
                    <Image
                        src="/img/eventsFormImg.jpg"
                        alt="Event Image"
                        width={500}
                        height={500}
                        className="w-full h-full object-contain md:object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div className="flex-1 m-6 md:m-0 md:mr-6">
                    <CreateEventForm />
                </div>
            </div>
        </AdminNavBar>
    );
}

export default eventForm;
