cls

db.customers.drop()

db.customers.insertMany([
  { name: 'John', age: 25 },
  { name: 'John', age: 30 },
  { name: 'John', age: 35 }
])

db.customers.find()

db.customers.deleteOne({ name: 'John' })

db.customers.find()
