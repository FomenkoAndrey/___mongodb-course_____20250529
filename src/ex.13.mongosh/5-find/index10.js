load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(10, 10))

cls

db.customers.find(
  { orders: { $nin: [2, 3, 4, 7, 8] } },
  { _id: false, firstName: true, orders: true }
)
