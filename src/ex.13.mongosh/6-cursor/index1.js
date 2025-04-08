load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(3))

cls

db.customers.find({})

const cursor = db.customers.find({})
