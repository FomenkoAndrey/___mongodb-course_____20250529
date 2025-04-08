load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(40, 10))

cls

db.customers.find(
  { orders: { $in: [2, 7] } },
  { _id: false, firstName: true, orders: true }
)
