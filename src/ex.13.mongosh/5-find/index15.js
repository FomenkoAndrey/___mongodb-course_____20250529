load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(25, 10))

cls

db.customers.find(
  { orders: { $mod: [2, 0] } },
  { _id: false, firstName: true, orders: true }
)
