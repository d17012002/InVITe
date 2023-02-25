import React from "react";

function Testimonials({ images }) {
    return (
        <section>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="py-12 md:py-20 border-t border-gray-800">
                    {/* Section header */}
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <h2 className="h2 mb-4">Our super cool Developers</h2>
                        <p className="text-xl text-gray-500">
                            Vitae aliquet nec ullamcorper sit amet risus nullam
                            eget felis semper quis lectus nulla at volutpat diam
                            ut venenatis tellus—in ornare.
                        </p>
                    </div>

                    {/* Testimonials */}
                    <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">
                        {/* 1st testimonial */}
                        <div
                            className="flex flex-col h-full p-6 bg-[color:var(--darker-secondary-color)]"
                            data-aos="fade-up"
                        >
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <img
                                        className="rounded-full"
                                        src={images[0].src}
                                        width="48"
                                        height="48"
                                        alt={images[0].title}
                                    />
                                    <svg
                                        className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-white"
                                        viewBox="0 0 24 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="text-lg text-white grow">
                                — InVITe lets me quickly get the insights I
                                care about so that I can focus on my productive
                                work. I've had InVITe for about 24 hours now
                                and I honestly don't know how I functioned
                                without it before.
                            </blockquote>
                            <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                <cite className="text-gray-200 not-italic">
                                    {images[0].title}
                                </cite>{" "}
                                -{" "}
                                <a
                                    className="text-white hover:text-gray-200 transition duration-150 ease-in-out"
                                    href="#0"
                                >
                                    Papa log 😎
                                </a>
                            </div>
                        </div>

                        {/* 2nd testimonial */}
                        <div
                            className="flex flex-col h-full p-6 bg-[color:var(--darker-secondary-color)]"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <img
                                        className="rounded-full"
                                        src={images[1].src}
                                        width="48"
                                        height="48"
                                        alt={images[1].title}
                                    />
                                    <svg
                                        className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-white"
                                        viewBox="0 0 24 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="text-lg text-white grow">
                                — InVITe lets me quickly get the insights I
                                care about so that I can focus on my productive
                                work. I've had InVITe for about 24 hours now
                                and I honestly don't know how I functioned
                                without it before.
                            </blockquote>
                            <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                <cite className="text-gray-200 not-italic">
                                    {images[1].title}
                                </cite>{" "}
                                -{" "}
                                <a
                                    className="text-white hover:text-gray-200 transition duration-150 ease-in-out"
                                    href="#0"
                                >
                                    Papa log 😎
                                </a>
                            </div>
                        </div>

                        {/* 3rd testimonial */}
                        <div
                            className="flex flex-col h-full p-6 bg-[color:var(--darker-secondary-color)]"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            <div>
                                <div className="relative inline-flex flex-col mb-4">
                                    <img
                                        className="rounded-full"
                                        src={images[2].src}
                                        width="48"
                                        height="48"
                                        alt={images[2].title}
                                    />
                                    <svg
                                        className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-white"
                                        viewBox="0 0 24 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                                    </svg>
                                </div>
                            </div>
                            <blockquote className="text-lg text-white grow">
                                — InVITe lets me quickly get the insights I
                                care about so that I can focus on my productive
                                work. I've had InVITe for about 24 hours now
                                and I honestly don't know how I functioned
                                without it before.
                            </blockquote>
                            <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                                <cite className="text-gray-200 not-italic">
                                    {images[2].title}
                                </cite>{" "}
                                -{" "}
                                <a
                                    className="text-white hover:text-gray-200 transition duration-150 ease-in-out"
                                    href="#0"
                                >
                                    Papa log 😎
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
