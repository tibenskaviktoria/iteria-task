import React from 'react';
import { Grommet } from 'grommet';
import { createClient, Provider } from 'urql';

import { CustomerList } from './Components/CustomerList';



function App() {
  const client = createClient({
    url: 'https://iteria-customers-db.hasura.app/v1/graphql',
    fetchOptions: () => {
      const token = "DdbGIfDZoS7zzlFwzmqnOPFeAxsoVgjs7AMpLnzf24JXJ7i1rALA4V08GZXD3s2N";
      return {
        headers: { "x-hasura-admin-secret": token },
      };
    },
  });

  return (
    <Provider value={client}>
      <Grommet plain>
        <CustomerList />
      </Grommet>
    </Provider>
  );
}

export default App;
