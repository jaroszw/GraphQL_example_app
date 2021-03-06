import React from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

import { useQuery } from "react-apollo";
import { gql } from "apollo-boost";

import "./checkout.styles.scss";

const GET_CART_ITEMS = gql`
  {
    cartItems @client
    cartTotal @client
  }
`;

const CheckoutPage = () => {
  const {
    data: { cartItems, cartTotal },
  } = useQuery(GET_CART_ITEMS);

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">TOTAL: ${cartTotal}</div>
      <div className="test-warning">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
      </div>
      <StripeCheckoutButton price={cartTotal} />
    </div>
  );
};

export default CheckoutPage;
