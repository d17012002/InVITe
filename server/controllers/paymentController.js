// const https = require("https");
// const qs = require("querystring");

// const checksum_lib = require('../paytm/checksum');
// const config = require('../paytm/config');

// const payment = (req, res) => {

//   var paymentDetails = {
//     amount: req.body.amount,
//     customerId: req.body.name,
//     customerEmail: req.body.email,
//     customerPhone: req.body.phone,
//   };
//   if (
//     !paymentDetails.amount ||
//     !paymentDetails.customerId ||
//     !paymentDetails.customerEmail ||
//     !paymentDetails.customerPhone
//   ) {
//     res.status(400).send("Payment failed");
//   } else {
//     var params = {};
//     params["MID"] = config.PaytmConfig.mid;
//     params["WEBSITE"] = config.PaytmConfig.website;
//     params["CHANNEL_ID"] = "WEB";
//     params["INDUSTRY_TYPE_ID"] = "Retail";
//     params["ORDER_ID"] = "TEST_" + new Date().getTime();
//     params["CUST_ID"] = paymentDetails.customerId;
//     params["TXN_AMOUNT"] = paymentDetails.amount;
//     params["CALLBACK_URL"] = "http://localhost:3000/callback";
//     params["EMAIL"] = paymentDetails.customerEmail;
//     params["MOBILE_NO"] = paymentDetails.customerPhone;

//     checksum_lib.genchecksum(
//       params,
//       config.PaytmConfig.key,
//       function (err, checksum) {
//         var txn_url =
//           "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
//         // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

//         var form_fields = "";
//         for (var x in params) {
//           form_fields +=
//             "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
//         }
//         form_fields +=
//           "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write(
//           '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' +
//             txn_url +
//             '" name="f1">' +
//             form_fields +
//             '</form><script type="text/javascript">document.f1.submit();</script></body></html>'
//         );
//         res.end();
//       }
//     );
//   }
// };

// const callback = (req, res) => {
//   var body = "";

//   req.on("data", function (data) {
//     body += data;
//   });

//   req.on("end", function () {
//     var html = "";
//     var post_data = qs.parse(body);

//     // received params in callback
//     console.log("Callback Response: ", post_data, "n");

//     // verify the checksum
//     var checksumhash = post_data.CHECKSUMHASH;
//     // delete post_data.CHECKSUMHASH;
//     var result = checksum_lib.verifychecksum(
//       post_data,
//       config.PaytmConfig.key,
//       checksumhash
//     );
//     console.log("Checksum Result => ", result, "n");

//     // Send Server-to-Server request to verify Order Status
//     var params = { MID: config.PaytmConfig.mid, ORDERID: post_data.ORDERID };

//     checksum_lib.genchecksum(
//       params,
//       config.PaytmConfig.key,
//       function (err, checksum) {
//         params.CHECKSUMHASH = checksum;
//         post_data = "JsonData=" + JSON.stringify(params);

//         var options = {
//           hostname: "securegw-stage.paytm.in", // for staging
//           // hostname: 'securegw.paytm.in', // for production
//           port: 443,
//           path: "/merchant-status/getTxnStatus",
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             "Content-Length": post_data.length,
//           },
//         };

//         // Set up the request
//         var response = "";
//         var post_req = https.request(options, function (post_res) {
//           post_res.on("data", function (chunk) {
//             response += chunk;
//           });

//           post_res.on("end", function () {
//             console.log("S2S Response: ", response, "n");

//             var _result = JSON.parse(response);
//             if (_result.STATUS == "TXN_SUCCESS") {
//               res.send("payment sucess");
//             } else {
//               res.send("payment failed");
//             }
//           });
//         });

//         // post the data
//         post_req.write(post_data);
//         post_req.end();
//       }
//     );
//   });
// };

// module.exports = {
//   callback,
//   payment
// }

//production
// const stripe = require("stripe")(
//   "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"
// );

//test
const stripe = require("stripe")(
  "sk_test_51MchbUSHgjbJVeCEdGCirq8uGLo5Knir0um3cb2F39N2zn93vVS2KDhMC677E2R663FVJn6SZpQHAZ6ix5Yzexee00ecaOYnSG"
);

const uuid = require("uuid").v4;

const payment = async (req, res) => {
  console.log(req.body);
  let error, status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const key = uuid();

    const charge = await stripe.charges.create(
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
    status = "failure";
  }

  res.send({ error, status });
};

module.exports = {
  payment,
};
