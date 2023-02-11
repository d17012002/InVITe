import React from "react";

export default function signup() {
  return (
    <div className="m-2">
      {/* Back Button */}
      <div className="mb-4">
        <a href="/">
          <button class="text-blue-600">{"< "}back</button>
        </a>
      </div>

      {/* Page heading */}
      <div className="text-3xl font-bold">Signup Page</div>

      {/* Page Content */}
      <div>
        First, you'll have to enter your phone number and press 'Send-OTP'
      </div>
      <div>{"[ Input tag for Phone Number ] [ 'Send-OTP' Button ]"}</div>
      <br />

      <div>Enter your OTP in the OTP field and press 'Verify-OTP' button</div>
      <div>{"[ Input tag for OTP ] [ 'Verify-OTP' Button ]"}</div>
      <br />

      <div>
        Enter your Name, Registration No. & EmailID and press 'Signup' to enter
        user dashboard
      </div>
      <div>{"[ Input field for name ]"}</div>
      <div>{"[ Input field for Reg No. ]"}</div>
      <div>{"[ Input field for Email ID ]"}</div>
      <div>{"[ 'Signup' Button(opens user dashboard) ]"}</div>
    </div>
  );
}
