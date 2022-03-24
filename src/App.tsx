import React from 'react';
import { Grommet } from 'grommet';
import { createClient, Provider } from 'urql';

import { CustomerList } from './Components/CustomerList';

function App() {
  const client = createClient({
    url: process.env.REACT_APP_HASURA_ENDPOINT ?? '',
    fetchOptions: () => {;
      return {
        headers: { "x-hasura-admin-secret": process.env.REACT_APP_HASURA_TOKEN ?? '' },
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
