cls

db.customers.drop()
db.createCollection('customers')

print('============= STATS START =============')
print(db.customers.storageSize(), 'bytes')
print(db.customers.totalSize(), 'bytes')
print('============= STATS END =============')
