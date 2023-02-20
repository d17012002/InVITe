import React from "react";

function LandingPage() {
  return (
    <div>
      <div className="text-3xl font-bold">Welcome to landing page</div>
      <div className="text-xl">you have two options: </div>
      <div>
        <a href="/users/signin">
          <button className="mr-4 bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500">
            Signin
          </button>
        </a>
        <a href="/users/signup">
          <button className="mr-4 bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500">
            Signup
          </button>
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
