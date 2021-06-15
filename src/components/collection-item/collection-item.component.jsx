import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import "./collection-item.styles.scss";

import { gql } from "apollo-boost";
import { useMutation } from "react-apollo";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CollectionItem = ({ item }) => {
  const [addItemToCart, { data }] = useMutation(ADD_ITEM_TO_CART);
  const { name, price, imageUrl } = item;

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton
        onClick={() => addItemToCart({ variables: { item: item } })}
        inverted
      >
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
