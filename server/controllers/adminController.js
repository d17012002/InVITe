const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "InVITe admin super secret key here...";

const setAdmin = async (req, res) => {

    const secret = JWT_SECRET;
    const payload = {
      email: req.body.email,
    };

    const token = await jwt.sign(payload, secret);

    const new_admin = new Admin({
        admin_id: token,
        email: req.body.email,
        name: req.body.name,
        pass: req.body.password,
    });

    await new_admin.save((error, success) => {
        if (error) console.log(error);
        else console.log("Saved::New Admin::credentials.");
    });

    res.status(200).send({ msg: "Credentials Added" });
};


const adminAuth = async(req, res) => {
    const Email = req.body.email
    const Pass = req.body.password

    Admin.find({ email: Email }, async function (err, docs) {
        if (docs.length === 0) {
           return res.status(400).send("Admin access denied");
        } else if(Pass === docs[0].pass){
           res.status(200).send({msg: "Success", admin_token: docs[0].admin_id})
        }
    });
}

module.exports = {
    setAdmin,
    adminAuth
};
