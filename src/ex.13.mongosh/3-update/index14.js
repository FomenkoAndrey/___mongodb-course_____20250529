cls

db.customers.drop()

db.customers.insertOne({
  name: 'John',
  products: [{ apples: 10 }, { oranges: 3 }]
})

print('=============== 1 ==============')
db.customers.find()
print('=============== 1 ==============')

db.customers.updateOne(
  { name: 'John' },
  { $addToSet: { products: { oranges: 3 } } }
)

print('=============== 2 ==============')
db.customers.find()
print('=============== 2 ==============')

db.customers.updateOne(
  { name: 'John' },
  { $addToSet: { products: { oranges: 5 } } }
)

print('=============== 3 ==============')
db.customers.find()
print('=============== 3 ==============')
