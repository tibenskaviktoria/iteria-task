import React from 'react'

import { Anchor, Box, Card, DataTable, Heading, Spinner, Text } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';

import { useFetchCustomersQuery } from '../server/generated/graphql';


export const CustomerList:React.FC = () => {
  const [result] = useFetchCustomersQuery();
  const { data, fetching, error } = result;
  if (fetching) return (
    <Box fill="vertical" align="center" justify="center">
      <Spinner size='medium'/>
    </Box>
  );
  if (error) return <p>Oh no... {error.message}</p>;
  const customers = data?.customers;

  function printSumOfOrders(sum: string): string {
    if (sum == null) {
      return "$0.00";
    } else {
      return sum;
    }
  }

  return (
    <Box fill="vertical" overflow="auto" align="center" flex="grow" justify="start" margin="large" pad="medium">
      <Heading margin="small" size="small">Customers</Heading>
      <Card background="light-1">
        <DataTable
          columns={[
          {
            property: 'uuid',
            header: 'UUID',
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
            render: val => (
              <Box pad={{vertical: 'xsmall'}}>
                { val.vip ? <Checkmark/> : <Close/>}
              </Box>
            ),
          },
          {
            property: 'orders_aggregate.aggregate.sum.total_sum',
            header: 'Sum of all orders',
            render: val => (
              <Text>{printSumOfOrders(val?.orders_aggregate?.aggregate?.sum?.total_sum)}</Text>
            ),
          },
          ]}
          data={customers}
          pad="small" 
          background={{"header":{"color":"dark-2"}}}
        />
      </Card>
    </Box>
  )
}
