import React from 'react'
import { OrdersList } from './OrdersList';

import { Box, Button, Heading, Spinner, Text } from 'grommet';
import { FormPrevious } from 'grommet-icons';

import { useParams } from 'react-router-dom'
import { useFetchCustomerWithOrdersQuery } from '../server/generated/graphql';

export const CustomerDetail:React.FC = () => {
  // get id from the url
  let {id} = useParams();

  const [result] = useFetchCustomerWithOrdersQuery({variables: {id}});
  const { data, fetching, error } = result;
  if (fetching) return (
    <Box fill="vertical" align="center" justify="center">
      <Spinner size='medium'/>
    </Box>
  );
  if (error) return <p>Oh no... {error.message}</p>;

  const customer = data?.customers_by_pk;

  return (
    <Box fill="vertical" overflow="auto" align="center" flex="grow" justify="start" margin="medium" pad="medium">
      <Button label="Back" href='/' icon={<FormPrevious/>} gap="xxsmall"/>
      <Heading>{customer?.name}</Heading>
      <Box margin={{bottom:"medium"}}>
        <Text><strong>UUID:</strong> {customer?.uuid}</Text>
        <Text><strong>Date of birth:</strong> {customer?.birth_date}</Text>
        <Text><strong>Vip:</strong> { customer?.vip ? "Yes" : "No"}</Text>
      </Box>

      <OrdersList orders={customer?.orders}/>
    </Box>
  )
}
