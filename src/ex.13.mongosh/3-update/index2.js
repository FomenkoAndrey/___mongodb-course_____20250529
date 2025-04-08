cls

db.customers.drop()

db.customers.insertMany([
  { name: 'John', age: 25 },
  { name: 'John', age: 30 },
  { name: 'John', age: 35 }
])

db.customers.updateMany(
  { name: 'John' },
  { $set: { name: 'Andrii' } }
)

db.customers.find()
