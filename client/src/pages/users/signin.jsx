import React from "react";

export default function signin() {
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
      <div>Enter your phone number and press 'Send-OTP' button to verify</div>
      <div>{"[ Input tag for phone number ] [ 'Send-OTP' Button]"}</div>
      <br />

      <div>Enter your OTP in the OTP field and press 'signin' button</div>
      <div>{"[ Input tag for OTP ] [ 'Signin' Button (open user dashboard after verifying) ]"}</div>
    </div>
  );
}
