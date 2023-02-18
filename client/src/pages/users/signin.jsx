import React, { useState } from "react";

export default function signin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signin/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-2">
      {/* Back Button */}
      <div className="mb-4">
        <a href="/">
          <button class="text-blue-600">{"< "}back</button>
        </a>
      </div>

      {/* Page heading */}
      <div className="text-3xl font-bold">Signin Page</div>

      {/* Page Content */}
      <div>
        <form onSubmit={handleVerify} class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              class="w-full border border-gray-400 p-2"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button class="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600">
            Verify
          </button>
        </form>

        <form onSubmit={handleSubmit} class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              class="w-full border border-gray-400 p-2"
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
          </div>

          <button class="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
