cls

db.customers.drop()
db.createCollection('customers')

print('============= STATS START =============')
db.customers.stats()
print('============= STATS END =============')
