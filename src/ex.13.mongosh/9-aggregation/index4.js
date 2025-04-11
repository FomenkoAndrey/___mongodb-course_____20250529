load('../random.js')

db.customers.drop()

db.createCollection('customers')

const orders = []

for (let i = 0; i < 50; i++) {
  orders.push({
    product: faker.product(),
    user: faker.firstName(),
    count: randomNumber(1, 10)
  })
}

db.customers.insertMany(orders)

cls

db.customers.find(
  { product: { $in: ['Oranges', 'Apples', 'Lemons', 'Bananas'] } },
  { _id: 0, product: 1, user: 1, count: 1 }
)

db.customers.aggregate([
  {
    $match: {
      product: { $in: ['Oranges', 'Apples', 'Lemons', 'Bananas'] }
    }
  },
  {
    $group: {
      _id: '$product',
      total_ordered: { $sum: '$count' }
    }
  },
  {
    $sort: {
      total_ordered: -1
    }
  }
])
