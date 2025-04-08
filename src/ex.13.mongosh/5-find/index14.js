load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(50, 10, -1))

const query = [
  { scores: { $size: 7 } },
  { firstName: /jo/gi }
]

cls

db.customers.find(
  { $or: query },
  { _id: false, firstName: true, scores: true }
)
