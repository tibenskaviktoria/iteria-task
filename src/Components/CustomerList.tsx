import React from 'react'

import { Box, DataTable, Text } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';

import { useQuery } from 'urql';
import { FetchCustomersQuery } from '../queries';


export const CustomerList:React.FC = () => {
  const [result] = useQuery({
    query: FetchCustomersQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <DataTable
      columns={[
      {
        property: 'uuid',
        header: 'uuid',
      },
      {
        property: 'name',
        header: <Text>Name</Text>,
        primary: true,
      },
      {
        property: 'birth_date',
        header: 'Date of birth',
      },
      {
        property: 'vip',
        header: 'Vip',
        render: datum => (
          <Box pad={{vertical: 'xsmall'}}>
            { datum.vip ? <Checkmark/> : <Close/>}
          </Box>
        ),
      },
      {
        property: 'orders_aggregate.aggregate.sum.total_sum',
        header: 'Sum of all orders',
      },
      ]}
      data={data.customers}
    />
  )
}
