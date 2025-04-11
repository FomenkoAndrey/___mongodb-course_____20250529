load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(1000, 10))

cls

db.customers.createIndex({ firstName: 1 })
db.customers.createIndex({ lastName: 1 })
db.customers.createIndex({ orders: 1 })

db.customers.getIndexes()

const stats1 = db.customers.find({ firstName: 'John' }).hint({ firstName: 1 }).explain('executionStats')

print('nReturned:', stats1.executionStats.nReturned)
print('totalKeysExamined:', stats1.executionStats.totalKeysExamined)
print('totalDocsExamined:', stats1.executionStats.totalDocsExamined)

const stats2 = db.customers.find({ firstName: 'John' }).hint({ orders: 1 }).explain('executionStats')

print('nReturned:', stats2.executionStats.nReturned)
print('totalKeysExamined:', stats2.executionStats.totalKeysExamined)
print('totalDocsExamined:', stats2.executionStats.totalDocsExamined)
