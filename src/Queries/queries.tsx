import gql from 'graphql-tag'

export const fetchCustomers = gql`
  {
    customers {
      uuid
      name
      birth_date
      vip
      orders_aggregate {
        aggregate {
          sum {
            total_sum
          }
        }
      }
    }
  }
`

export const fetchCustomerWithOrders = gql`
  ($id: uuid!) {
    customers_by_pk(uuid: $id) {
      uuid
      name
      birth_date
      vip
      orders {
        uuid
        date
        total_sum
        items_number
      }
    }
  }
`