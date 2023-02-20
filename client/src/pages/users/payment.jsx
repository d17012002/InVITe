import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

function payment() {
    const [product] = useState({
        name: "Sample Game",
        price: 2,
        description: "This is a sample demo",
    });

    const handleToken = async (event, token, addresses) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    product,
                    addresses,
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col m-auto max-w-screen-xl">
            <h1>Stripe Payment</h1>
            <p>Payment is currently in Test Mode</p><br />
            <p>You can make the payment using our test credentials provided below:</p><br/>
            <ul>
                <li>Card Number: <i>4242 4242 4242 4242</i></li>
                <li>Expiry: Any future date (eg: 11/25)</li>
                <li>CVC: Any 3 digit number</li>
            </ul>
            <br/>
            
            <StripeCheckout
                className="flex justify-center w-max"
                stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
                amount={product.price * 100}
                token={handleToken}
                name={product.name}
                currency="INR"
                billingAddress
                shippingAddress
            />
        </div>
    );
}

export default payment;
