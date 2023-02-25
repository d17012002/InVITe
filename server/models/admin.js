const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    pass: {
      type: String,
    },
    name: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "86400s" },
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

const test_credential = new Admin ({
    email: "invite.testing@gmail.com",
    name: "test",
    pass: "invite123"
})

test_credential.save((error, success) => {
    if (error) console.log(error);
    else console.log("Saved::Admin::test credentials.");
});

module.exports = Admin;


