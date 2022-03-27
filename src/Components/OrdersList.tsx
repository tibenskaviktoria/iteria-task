import { Box, Card, DataTable, Heading, Text } from "grommet";
import React from "react";

interface Props {
  orders: any;
}

export const OrdersList:React.FC<Props> = ({orders}) => {
  function getDateFromTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US");
  }

  return (
    <Box margin={{top: "medium"}} align="center">
      <Heading margin="small" size="small">Orders</Heading>
      <Card background="light-1" width={{min:"800px"}}>
        <DataTable
          columns={[
            {
              property: 'uuid',
              header: 'UUID',
              primary: true,
            },
            {
              property: 'date',
              header: 'Date',
              render: val => (
                <Text>{getDateFromTimestamp(val.date)}</Text>
              ),
            },
            {
              property: 'total_sum',
              header: 'Total',
            },
            {
              property: 'items_number',
              header: 'Number of items',
            },
          ]}
          data={orders}
          pad="small"
          background={{"header":{"color":"dark-2"}}}
        />
        <Text alignSelf="center" size="large" margin="medium" hidden={orders.length !== 0}>No orders yet</Text>
      </Card>
    </Box>
  );
}