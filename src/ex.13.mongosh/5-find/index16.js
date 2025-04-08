load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(100))

cls

db.customers.find(
  { firstName: { $regex: 'jo', $options: 'i' } },
  { _id: false, firstName: true }
)
