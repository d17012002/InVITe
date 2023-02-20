const { sendTicket } = require("./smsController");
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

//production
// const stripe = require("stripe")(
//   "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"
// );

// test
const stripe = require("stripe")(
  "sk_test_51MchbUSHgjbJVeCEdGCirq8uGLo5Knir0um3cb2F39N2zn93vVS2KDhMC677E2R663FVJn6SZpQHAZ6ix5Yzexee00ecaOYnSG"
);

const uuid = require("uuid").v4;

const payment = async (req, res) => {
  console.log(req.body);
  let charge, status, Email;
  var { product, token } = req.body;

  console.log("*************");
  console.log(product, token);

  var key = uuid();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
        description: `Booked Ticket for ${product.name}`,
        shipping: {
          name: token.billing_name,
          address: {
            line1: token.shipping_address_line1,
            line2: token.shipping_address_line2,
            city: token.shipping_address_city,
            country: token.shipping_address_country,
            postal_code: token.shipping_address_zip,
          },
        },
      },
      {
        idempotencyKey: key,
      }
    );

    console.log("Charge: ", { charge });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "success";
  }

  var header = req.headers.cookie;
  var token = header.split("="); // split is undefined
  console.log(token);
  res.send({ msg: "Getting tokken from cookie", user_token: token[1] });

  // collecting ticket details
  // var Details = {
  //   "email": Email,
  //   "event_name": product.name,
  //   "name": token.billing_name,
  //   "pass": key,
  //   "price": product.price,
  //   "address1": token.shipping_address_line1,
  //   "city":token.shipping_address_city,
  //   "zip":token.shipping_address_zip
  // }

  // console.log("All details before email: ", Details)

  // sendTicket(Details);

  //NOTE-
  //add this user into events-> registerted people-> [(name, pass)] //no need to get from cookies

  res.send({ status });
};

module.exports = {
  payment,
};
