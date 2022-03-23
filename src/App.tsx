import React from 'react';
import { Grommet } from 'grommet';
import { createClient, Provider } from 'urql';



function App() {
  const client = createClient({
    url: 'https://iteria-customers-db.hasura.app/v1/graphql',
    fetchOptions: () => {
      return {
        headers: { "x-hasura-admin-secret": "DdbGIfDZoS7zzlFwzmqnOPFeAxsoVgjs7AMpLnzf24JXJ7i1rALA4V08GZXD3s2N" },
      };
    },
  });

  return (
    <Provider value={client}>
      <Grommet plain>
        
      </Grommet>
    </Provider>
  );
}

export default App;
