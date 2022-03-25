import React from 'react';
import { Grommet } from 'grommet';
import { createClient, Provider } from 'urql';

import { CustomerList } from './Components/CustomerList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CustomerDetail } from './Components/CustomerDetail';

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
      <Grommet>
        <Router>
          <Routes>
            <Route path='/' element={<CustomerList/>}>
              
            </Route>
            <Route path='customer/:id' element={<CustomerDetail/>}></Route>
          </Routes>
        </Router>
      </Grommet>
    </Provider>
  );
}

export default App;
