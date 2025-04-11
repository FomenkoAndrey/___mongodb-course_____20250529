load('../random.js')

db.customers.drop()

db.createCollection('customers')

const orders = []

for (let i = 0; i < 10000; i++) {
  orders.push({
    product: faker.product(),
    user: {
      firstName: faker.firstName(),
      lastName: faker.lastName()
    },
    count: randomNumber(1, 10)
  })
}

db.customers.insertMany(orders)

cls

db.customers.aggregate([
  {
    $group: {
      _id: {
        firstName: '$user.firstName',
        lastName: '$user.lastName'
      },
      total_user_orders: { $sum: 1 },
      total_products_ordered: { $sum: '$count' }
    }
  },
  { $sort: { total_user_orders: -1 } },
  { $limit: 10 }
])
