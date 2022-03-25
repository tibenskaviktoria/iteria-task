export const FetchCustomersQuery = `
  query {
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

export const FetchCustomerWithOrdersQuery = `
  query ($id: uuid!) {
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
