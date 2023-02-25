import Developers from "@/components/Landing_Page_partials/Developers";
import FeaturesZigZag from "@/components/Landing_Page_partials/FeaturesZigZag";
import Header from "@/components/Landing_Page_partials/Header";
import HeroHome from "@/components/Landing_Page_partials/HeroHome";
import LandingPageImages from "@/utils/landing_page_images";
import React from "react";

const [feature1, feature2, feature3, dev1, dev2, dev3] = LandingPageImages;

function LandingPage() {
    return (
        <div className="overflow-x-hidden">
            <div className="flex flex-col min-h-screen overflow-x-hidden ">
                <Header className="overflow-x-hidden" />

                <main className="grow">
                    <HeroHome />
                    <FeaturesZigZag images={[feature1, feature2, feature3]} />
                    <Developers images={[dev1, dev2, dev3]} />
                </main>
            </div>
            {/* <div>
              <a href="/users/signin">
                  <button className="mr-4 bg-[color:var(--darker-secondary-color)] text-white py-2 px-4 rounded hover:bg-[color:var(--secondary-color)]">
                      Signin
                  </button>
              </a>
              <a href="/users/signup">
                  <button className="mr-4 bg-[color:var(--darker-secondary-color)] text-white py-2 px-4 rounded hover:bg-[color:var(--secondary-color)]">
                      Signup
                  </button>
              </a>
          </div> */}
        </div>
    );
}

export default LandingPage;
