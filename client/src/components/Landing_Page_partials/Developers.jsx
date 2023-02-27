import Image from "next/image";
import { FaGithub, FaLinkedin, FaLink } from "react-icons/fa";

function TeamSection({images: developers}) {
    return (
        <div>
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
                <br />
                <br />
                <br />
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                    <h2 className="h2 mb-4">Our super cool Developers</h2>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
                    {developers?.map((developer) => (
                        <div key={developer?.id} className="flex flex-col">
                            <div className="flex-shrink-0">
                                <Image
                                    className="rounded-lg shadow-md w-full h-64 object-cover"
                                    src={developer?.src}
                                    alt={developer?.title}
                                    width={500}
                                    height={500}
                                    cover
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {developer?.title}
                                    </h3>
                                    <p className="mt-2 text-base text-gray-500">
                                        {developer?.role}
                                    </p>
                                </div>
                                <div className="mt-6 flex-grow flex items-center">
                                    <div className="flex space-x-3">
                                        {developer?.githubUrl && (
                                            <a
                                                href={developer?.githubUrl}
                                                className="text-gray-500 hover:text-[color:var(--darker-secondary-color)] transition-all ease-in-out"
                                                target="_blank"
                                            >
                                                <span className="sr-only">
                                                    GitHub
                                                </span>
                                                <FaGithub className="h-6 w-6" />
                                            </a>
                                        )}
                                        {developer?.linkedinUrl && (
                                            <a
                                                href={developer?.linkedinUrl}
                                                className="text-gray-500 hover:text-[color:var(--darker-secondary-color)] transition-all ease-in-out"
                                                target="_blank"
                                            >
                                                <span className="sr-only">
                                                    LinkedIn
                                                </span>
                                                <FaLinkedin className="h-6 w-6" />
                                            </a>
                                        )}
                                        {developer?.websiteUrl && (
                                            <a
                                                href={developer?.websiteUrl}
                                                className="text-gray-500 hover:text-[color:var(--darker-secondary-color)] transition-all ease-in-out"
                                                target="_blank"
                                            >
                                                <span className="sr-only">
                                                    Personal Website
                                                </span>
                                                <FaLink className="h-6 w-6" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
