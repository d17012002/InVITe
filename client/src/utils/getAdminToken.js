import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getAdminToken = () => {
    return cookies.get("admin_token");
};
