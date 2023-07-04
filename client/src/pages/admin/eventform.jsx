import AdminNavBar from "@/components/AdminNavBar";
import CreateEventForm from "@/components/CreateEventForm";
import Image from "next/image";
import React from "react";

function eventform() {
    return (
        <div className="pt-20 lg:pt-8 bg-[color:var(--primary-color)]">
            <AdminNavBar />
            <center className = "p-6">
                <div className="flex flex-col md:h-[calc(88vh)] md:w-[90%] md:flex-row justify-center bg-[color:var(--primary-color)]">
                    <div className="flex-1 mx-6 mb-6 bg-[color:var(--primary-color)]">
                        <Image
                            src="/img/eventsFormImg.jpg"
                            alt="Event Image"
                            width={500}
                            height={500}
                            className="w-full h-full object-contain md:object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="flex-1 m-6 md:m-0 md:mr-6 md:mb-6">
                        <CreateEventForm />
                    </div>
                </div>
            </center>
        </div>
    );
}

export default eventform;
