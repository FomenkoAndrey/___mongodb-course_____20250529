load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(50))

cls

db.customers.createIndex({ firstName: 1 })

db.customers.find({ firstName: /Jo/i })
