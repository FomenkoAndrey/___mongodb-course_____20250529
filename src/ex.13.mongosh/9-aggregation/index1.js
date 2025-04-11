load('../random.js')

db.customers.drop()

db.createCollection('customers')

const orders = []

for (let i = 0; i < 500; i++) {
  orders.push({
    product: faker.product(),
    user: faker.firstName(),
    count: randomNumber(1, 10)
  })
}

db.customers.insertMany(orders)

cls

db.customers.aggregate([
  {
    $group: {
      _id: '$user',
      total_user_orders: { $sum: 1 },
      total_products_ordered: { $sum: '$count' }
    }
  }
])
