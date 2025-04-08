cls

db.customers.drop()

db.customers.insertOne({ _id: ObjectId(), name: 'John' })

db.customers.insertOne({ name: 'John' })
