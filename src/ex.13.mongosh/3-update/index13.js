cls

db.customers.drop()

db.customers.insertOne({
  name: 'John',
  products: [{ apples: 10 }, { oranges: 7 }, { bananas: 5 }]
})

print('=============== 1 ==============')
db.customers.find()
print('=============== 1 ==============')

db.customers.updateOne(
  { name: 'John' },
  { $pop: { products: -1 } }
)

print('=============== 2 ==============')
db.customers.find()
print('=============== 2 ==============')
