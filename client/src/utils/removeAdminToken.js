import Cookies from "universal-cookie";

const cookies = new Cookies();

export const removeAdminToken = () => {
    cookies.remove("admin_token", {
        path: "/",
    });
};
