import { Card, CardBody, CardHeader, DataTable, Text } from "grommet";
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
    <Card background="light-1">
      <CardHeader pad="small"><strong>Orders</strong></CardHeader>
      <CardBody pad="medium">
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
        />
      </CardBody>
    </Card>
  );
}