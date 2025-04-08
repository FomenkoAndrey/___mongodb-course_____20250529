cls

db.customers.drop()

db.customers.insertMany([
  { product: 'apple', price: 15 },
  { product: 'orange', price: 20 },
  { product: 'banana', price: 25 }
])

print('=============== 1 ==============')
db.customers.find()
print('=============== 1 ==============')

db.customers.updateMany(
  {},
  { $max: { price: 21 } }
)

print('=============== 2 ==============')
db.customers.find()
print('=============== 2 ==============')
