import React, { useState } from "react";

export default function signin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    if (response.status === 200) {
      setMessage({ errorMsg: "", successMsg: data.msg });
      console.log(data);
      setStep(3); // Move to next step on the same page
    } else {
      console.error(`Failed with status code ${response.status}`);
      setMessage({ errorMsg: data.msg, successMsg: "" });
    }
  };

  const handleVerifyEmail = async (event) => {
    event.preventDefault();
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
    if (response.status === 200) {
      setMessage({ errorMsg: "", successMsg: data.msg });
      console.log(data);
      setStep(2); // Move to next step on the same page
    } else {
      console.error(`Failed with status code ${response.status}`);
      setMessage({ errorMsg: data.msg, successMsg: "" });
    }
  };

  return (
    <div className="m-2">
      {/* Back Button */}
      <div className="mb-4">
        <a href="/">
          <button className="text-red-500">{"< "}back</button>
        </a>
      </div>

      {/* Page heading */}
      <div className="text-center text-3xl font-bold">Signin Page</div>

      {/* Page Content */}
      <div className="max-w-3xl mx-auto mt-10">
        {/* Steps Nav */}
        <div className="flex items-center justify-center">
          {/* Step 1: normal-height:fit; mobile-view: 6rem*/}
          <div className={`w-full h-24 lg:h-fit ${step === 1 ? `font-medium` : ``}`}>
            <div
              className={`h-full border-2 rounded-l-lg px-5 py-2 ${
                step >= 1 ? `border-red-500` : `border-red-300 border-dashed`
              }`}
            >
              <div>01</div>
              Verify Email
            </div>
          </div>

          {/* Step 2: normal-height:fit; mobile-view: 6rem */}
          <div className={`w-full h-24 lg:h-fit ${step === 2 ? `font-medium` : ``}`}>
            <div
              className={`h-full border-2 border-l-0 px-5 py-2 ${
                step >= 2 ? `border-red-500` : `border-red-300 border-dashed`
              }`}
            >
              <div>02</div>
              OTP Verification
            </div>
          </div>

          {/* Step 3: normal-height:fit; mobile-view: 6rem */}
          <div className={`w-full h-24 lg:h-fit ${step === 3 ? `font-medium` : ``}`}>
            <div
              className={`h-full border-2 border-l-0 rounded-r-lg px-5 py-2 ${
                step >= 3 ? `border-red-500` : `border-red-300 border-dashed`
              }`}
            >
              <div>03</div>
              Go to Dashboard!
            </div>
          </div>
        </div>

        {/* Error Message */}
        {message.errorMsg && (
          <h1 className="rounded p-3 my-2 bg-red-200 text-red-600 font-medium">
            {message.errorMsg}
          </h1>
        )}

        {/* Success Message */}
        {message.successMsg && (
          <h1 className="rounded p-3 my-2 bg-green-200 text-green-600 font-medium">
            {message.successMsg}
          </h1>
        )}

        {/* Steps Content */}
        <div className="bg-white p-5 rounded-lg mt-2">
          {
            /* Step 1 Content*/
            step === 1 && (
              <form onSubmit={handleVerifyEmail}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Enter your Registered Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  type="submit"
                  className="mt-4 bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500"
                >
                  Verify
                </button>
              </form>
            )
          }
          {
            /* Step 2 Content */
            step === 2 && (
              <form onSubmit={handleSubmit}>
                {/* Only OTP in Signin */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Enter Verification Code
                  </label>

                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    autoComplete="none"
                    required
                    value={otp}
                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500"
                >
                  Submit
                </button>
              </form>
            )
          }
          {
            /* Step 3 Content */
            step === 3 && (
              <div>
                <div className="bg-green-50 border-b border-green-400 text-green-800 text-sm p-4 flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <p>
                        <span className="font-bold">Hey there! </span>
                        Welcome back, you're successfully signed in!
                      </p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500">
                  Go to your dashboard
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
