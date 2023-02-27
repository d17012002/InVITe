import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setAdminToken = (admin_id) => {
    console.log("admin id state value ", admin_id);
    cookies.set("admin_token", admin_id, {
        expires: new Date(Date.now() + 86400000),
        // path: "/", commeting this becoz anurag daddy ne bola :)
    });
};
