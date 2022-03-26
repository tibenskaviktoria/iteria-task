import { Box, Button, Heading, Text } from 'grommet';
import { FormPrevious } from 'grommet-icons';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql';
import { FetchCustomerWithOrdersQuery } from '../server/queries';
import { OrdersList } from './OrdersList';

export const CustomerDetail:React.FC = () => {
  // get id from the url
  let {id} = useParams();

  const [result] = useQuery({
    query: FetchCustomerWithOrdersQuery,
    variables: {id},
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const customer = data.customers_by_pk;

  return (
    <Box fill="vertical" overflow="auto" align="center" flex="grow" justify="start" margin="medium" pad="medium">
      <Button label="Back" href='/' icon={<FormPrevious/>} gap="xxsmall"/>
      <Heading>{customer.name}</Heading>
      <Box margin={{bottom:"medium"}}>
        <Text><strong>UUID:</strong> {customer.uuid}</Text>
        <Text><strong>Date of birth:</strong> {customer.birth_date}</Text>
        <Text><strong>Vip:</strong> { customer.vip ? "Yes" : "No"}</Text>
      </Box>

      <OrdersList orders={customer.orders}/>
    </Box>
  )
}
