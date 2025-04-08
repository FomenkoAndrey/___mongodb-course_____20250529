cls

db.customers.drop()
db.createCollection('customers')

print('associated DB name:', db.customers.getDB())
