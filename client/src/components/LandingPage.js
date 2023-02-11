import React from "react";

function LandingPage() {
  return (
    <div>
      <div className="text-3xl font-bold">Welcome to landing page</div>
      <div className="text-xl">you have two options: </div>
      <div>
        <a href="/users/signin">
          <button class="mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Signin
          </button>
        </a>
        <a href="/users/signup">
          <button class="mx-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Signup
          </button>
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
