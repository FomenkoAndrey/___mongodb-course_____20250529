cls

db.customers.drop()

print('================ INSERT WITH NULL ====================')
db.customers.insertOne({ _id: null, name: 'John' })

print('================ INSERT WITH {} ====================')
db.customers.insertOne({ _id: {}, name: 'John' })

print('================ INSERT WITH UNDEFINED ====================')
db.customers.insertOne({ _id: undefined, name: 'John' })
