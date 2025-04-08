cls

db.customers.drop()
db.createCollection('customers')

print('============= STATS START EMPTY COLLECTION =============')
print(db.customers.dataSize(), 'bytes')
print('============= STATS END EMPTY COLLECTION =============')

db.customers.insertOne({ name: 'John' })

print('============= STATS START NON EMPTY COLLECTION =============')
print(db.customers.dataSize(), 'bytes')
print('============= STATS END NON EMPTY COLLECTION =============')
