const Admin = require("../models/admin");

const setAdmin = async (req, res) => {

    const new_admin = new Admin ({
        email: req.body.email,
        pass: req.body.password
    })
    
    await new_admin.save((error, success) => {
        if (error) console.log(error);
        else console.log("Saved::New Admin::credentials.");
    });
    
    res.status(200).send("Credentials Added");
}

module.exports = {
    setAdmin
}