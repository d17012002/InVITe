import { useState } from "react";
import Cookies from "universal-cookie";

export default function signup() {
  const cookies = new Cookies();

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ errorMsg: "", successMsg: "" });

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [username, setUsername] = useState("");

  // Take Email, give OTP
  const handleVerifyEmail = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
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

  // Take all info, return account creating
  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contactNumber: contactNumber,
        otp: otp,
        email: email,
        regNumber: regNumber,
        username: username,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setMessage({ errorMsg: "", successMsg: data.msg });
      console.log(data);
      setStep(3); // Move to next step on the same page

      setCookie(data.user_id); // set cookie when signed up
    } else {
      console.error(`Failed with status code ${response.status}`);
      setMessage({ errorMsg: data.msg, successMsg: "" });
    }
  };

  const setCookie = (user_id) => {
    console.log("user id state value ", user_id);
    cookies.set("user_token", user_id, {
      expires: new Date(Date.now() + 86400000),
    });
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
      <div className="text-center text-3xl font-bold">Signup Page</div>

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
              Complete Signup
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
            /* Step 1 Content */
            step === 1 && (
              <form onSubmit={handleVerifyEmail}>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Enter your email address
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
                {/* EMAIL */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Your email address
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    defaultValue={email}
                    disabled
                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                    // onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                {/* OTP */}
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

                {/* USERNAME */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    autoComplete="none"
                    required
                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* REG-NUMBER */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Enter VIT Registration Number
                  </label>
                  <input
                    type="text"
                    id="regNumber"
                    name="regNumber"
                    value={regNumber}
                    autoComplete="none"
                    required
                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                    onChange={(e) => setRegNumber(e.target.value)}
                  />
                </div>

                {/* CONTACT-NUMBER */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Enter Contact Number
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={contactNumber}
                    autoComplete="none"
                    required
                    className="bg-gray-100 p-2 mx-2 mb-4 focus:outline-none rounded-lg w-10/12"
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500"
                >
                  Complete Signup
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
                        <span className="font-bold">Success : </span>
                        Your account has been created!
                      </p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500">
                  Go to Dashboard
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
