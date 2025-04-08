db.customers.drop()

db.customers.insertMany([
  { firstName: 'John', age: 25 },
  { firstName: 'John', age: 30 },
  { firstName: 'John', age: 35 }
])

cls

db.customers.find({ firstName: 'John' })

db.customers.findOne({ firstName: 'John' })
