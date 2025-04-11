load('../random.js')

db.customers.drop()

db.createCollection('customers')

const users = []

for (let i = 0; i < 100000; i++) {
  const user = {
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    age: randomNumber(21, 70)
  }

  if (randomNumber(1, 10) % 10 === 0) {
    user.orders = {
      product: faker.product(),
      count: randomNumber(1, 100)
    }
  }

  users.push(user)
}

db.customers.insertMany(users)

cls

const ordersCount = db.customers.find(
  { orders: { $exists: true } }
).count()
print('Documents with orders:', ordersCount)

// ! size: 421888 bytes
// db.customers.createIndex({ orders: 1 })

// ! size: 106496 bytes - for sparse index
db.customers.createIndex({ orders: 1 }, { sparse: true })

const indexStats = db.customers.stats().indexSizes

const ordersIndexSize = indexStats['orders_1']

print(`Index name: orders_1, size: ${ordersIndexSize} bytes`)
