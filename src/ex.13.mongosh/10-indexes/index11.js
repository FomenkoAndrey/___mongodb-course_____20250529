load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(10000))

cls

db.customers.createIndex({ firstName: 'text', lastName: 'text' })

db.customers.find(
  { $text: { $search: 'John Smith' } },
  { score: { $meta: 'textScore' } }
).sort(
  { score: { $meta: 'textScore' } }
).limit(5)
