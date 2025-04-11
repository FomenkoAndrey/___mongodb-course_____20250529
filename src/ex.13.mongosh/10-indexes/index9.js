load('../random.js')

db.customers.drop()

db.createCollection('customers')

const users = []

for (let i = 0; i < 25; i++) {
  const user = {
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    age: randomNumber(21, 70)
  }

  if (randomNumber(1, 3) % 3 === 0) {
    user.orders = {
      product: faker.product(),
      count: randomNumber(1, 10)
    }
  }

  users.push(user)
}

db.customers.insertMany(users)

cls

print('Documents in a collection:', db.customers.countDocuments())

print('Documents in a collection with orders:', db.customers.find(
  { orders: { $exists: true } }
).count())

db.customers.createIndex({ 'orders.count': 1 })
