import Cookies from "universal-cookie";

const cookies = new Cookies();

export const removeUserToken = () => {
    cookies.remove("user_token", {
        path: "/",
    });
};
