import React from "react";

import { gql } from "appolo-boost";
import { Query } from "react-apollo";

import CollectionPage from "./collection.component";
import Spinner from "../spinner/spinner.component";

const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        priceimageUrl
      }
    }
  }
`;

const CollectionPageContainer = ({ match }) => (
  <Query
    query={GET_COLLECTION_BY_TITLE}
    variables={{ title: match.params.collection }}
  >
    {({ loading, error, data: { getCollectionsByTitle } }) => {
      if (loading) return <Spinner />;
      return <CollectionPage collection={getCollectionsByTitle} />;
    }}
  </Query>
);

export default CollectionPageContainer;
