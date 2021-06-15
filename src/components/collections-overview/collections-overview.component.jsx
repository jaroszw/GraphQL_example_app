import React from "react";
import CollectionPreview from "../collection-preview/collection-preview.component";
import "./collections-overview.styles.scss";

import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";
import Spinner from "../spinner/spinner.component";

const GET_COLLECTIONS = gql`
  query GetCollections {
    collections {
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

const CollectionsOverview = () => {
  const { loading, data } = useQuery(GET_COLLECTIONS);

  if (loading) return <Spinner />;

  const { collections } = data;
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionsOverview;
