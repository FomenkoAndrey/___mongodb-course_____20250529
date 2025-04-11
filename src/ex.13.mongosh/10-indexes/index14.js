load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(1000, 10))

cls

db.customers.createIndex({ firstName: 1 })
db.customers.createIndex({ lastName: 1 })
db.customers.createIndex({ orders: 1 })

print('========================= CREATE INDEXES =============================')
print('Indexes:', db.customers.getIndexes())
print('Number of indexes:', db.customers.getIndexes().length)

const r1 = db.customers.dropIndex({ firstName: 1 })
const r2 = db.customers.dropIndex({ lastName: 1 })
const r3 = db.customers.dropIndex('orders_1')

print('========================= DROP INDEXES =============================')
print('Indexes:', db.customers.getIndexes())
print('Number of indexes:', db.customers.getIndexes().length)
