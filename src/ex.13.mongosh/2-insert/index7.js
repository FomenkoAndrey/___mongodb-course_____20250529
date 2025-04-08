cls

db.customers.drop()

db.customers.insertOne({ _id: 1, name: 'John' })
db.customers.insertOne({ _id: 2, name: 'John' })

db.customers.insertOne({ _id: new Date(), name: 'John' })
db.customers.insertOne({ _id: new Date(), name: 'John' })
