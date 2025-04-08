load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(30, 10))

cls

db.customers.find(
  { orders: { $eq: 5 } },
  { _id: false, firstName: true, orders: true }
)
db.customers.find(
  { orders: 5 },
  { _id: false, firstName: true, orders: true }
)
db.customers.find(
  { orders: { $not: { $eq: 5 } } },
  { _id: false, firstName: true, orders: true }
)
db.customers.find(
  { orders: { $ne: 5 } },
  { _id: false, firstName: true, orders: true }
)
