load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(10, 10))

cls

db.customers.find({}, { orders: true })

db.customers.find({}, { orders: true }).limit(3).skip(1)

db.customers.find({}, { orders: true }).sort({ orders: 1 }).limit(3).skip(1)

db.customers.find({}, { orders: true }).sort({ orders: -1 }).skip(1).limit(3)
