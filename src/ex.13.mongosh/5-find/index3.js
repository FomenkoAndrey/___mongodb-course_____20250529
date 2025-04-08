load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(25))

cls

db.customers.find({ firstName: /jo/i })

db.customers.find({ firstName: new RegExp('jo', 'gi') })

print('Count:', db.customers.countDocuments())
