cls

db.customers.drop()

print('=========== 1 ============')
db.customers.insertOne({ _id: 1 })
db.customers.insertOne({ _id: 1 })

print('=========== 2 ============')
db.customers.insertOne({ name: 'John' })
