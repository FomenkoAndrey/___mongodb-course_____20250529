load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(10, 10))

cls

db.customers.find({}, { orders: true })

db.customers.find({}, { orders: true }).sort({ orders: 1 })

db.customers.find({}, { orders: true }).sort({ orders: -1 })
