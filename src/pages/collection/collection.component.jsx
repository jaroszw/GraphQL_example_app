import React from "react";
import "./collection.styles.scss";

import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import Spinner from "../../components/spinner/spinner.component";

import CollectionItem from "../../components/collection-item/collection-item.component";

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionPage = ({ match }) => {
  const { loading, data, error } = useQuery(GET_COLLECTION_BY_TITLE, {
    variables: { title: match.params.collectionId },
  });

  if (loading) return <Spinner />;

  const { title, items } = data.getCollectionsByTitle;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
