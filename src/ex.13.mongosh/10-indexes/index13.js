// load('../random.js')
//
// db.customers.drop()
//
// db.createCollection('customers')
//
// db.customers.insertMany(getUsers(10000))
//
// cls

// db.customers.createIndex({ '$**': 'text' })

db.customers.find(
  { $text: { $search: 'JOHN SMITH', $caseSensitive: true } },
  { score: { $meta: 'textScore' } }
).sort(
  { score: { $meta: 'textScore' } }
).limit(5)
