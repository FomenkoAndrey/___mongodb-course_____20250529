load('../random.js')

db.customers.drop()

db.createCollection('customers')

const orders = []

for (let i = 0; i < 100; i++) {
  orders.push({
    product: faker.product(),
    user: faker.firstName(),
    count: randomNumber(1, 10)
  })
}

db.customers.insertMany(orders)

cls

const distinct = db.customers.distinct('user')

print('Unique users:', distinct.length)
