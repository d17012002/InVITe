const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const userInfo = (req, res) => {
    var header = req.headers.cookie;
    var token = header.split('=');
    console.log(token);
    res.send({msg: "Getting tokken from cookie", user_token: token[1]});
}

module.exports = {
    userInfo,
  };
  