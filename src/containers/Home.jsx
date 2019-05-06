import React from 'react';
import gql, { } from 'graphql-tag';
import { Query } from 'react-apollo';

const ALL_USERS = gql`
  {
    allUsers {
      id
      email
    }
  }
`;

const Home = () => (
  <Query query={ALL_USERS}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error!</div>;
      return data.allUsers.map(u => <h1 key={u.id}>{u.email}</h1>);
    }}
  </Query>
);

export default Home;
