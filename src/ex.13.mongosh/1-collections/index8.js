cls

db.customers.drop()
db.createCollection('customers')

print('============= STATS START =============')
db.customers.latencyStats()
print('============= STATS END =============')
