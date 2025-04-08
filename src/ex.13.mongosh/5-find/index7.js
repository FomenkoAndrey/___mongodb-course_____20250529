load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(20, 10))

cls

db.customers.find(
  { orders: { $gt: 3, $lt: 7 } },
  { _id: false, firstName: true, orders: true }
)
