import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setUserToken = (user_id) => {
    console.log("user id state value ", user_id);
    cookies.set("user_token", user_id, {
        expires: new Date(Date.now() + 86400000),
        path: "/",
    });
};
