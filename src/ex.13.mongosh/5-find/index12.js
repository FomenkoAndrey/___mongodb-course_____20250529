load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(100, 10, -1))

cls

db.customers.find(
  { scores: { $size: 5 } },
  { _id: false, firstName: true, scores: true }
)

print('Count:', db.customers.countDocuments())
