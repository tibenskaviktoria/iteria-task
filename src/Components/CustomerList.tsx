import React from 'react'

import { Anchor, Box, DataTable } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';

import { useQuery } from 'urql';
import { FetchCustomersQuery } from '../server/queries';


export const CustomerList:React.FC = () => {
  const [result] = useQuery({
    query: FetchCustomersQuery,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Box>
      <DataTable
        columns={[
        {
          property: 'uuid',
          header: 'uuid',
          render: val => (
            <Anchor href={'/customer/' + val.uuid} label={val.uuid}/>
          ),
        },
        {
          property: 'name',
          header: 'Name',
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
    </Box>
  )
}
