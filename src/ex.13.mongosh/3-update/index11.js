cls

db.customers.drop()

db.customers.insertOne({
  name: 'John',
  products: [{ apples: 10 }, { oranges: 7 }, { lime: 3 }, { bananas: 5 }]
})

print('=============== 1 ==============')
db.customers.find()
print('=============== 1 ==============')

db.customers.updateOne(
  { name: 'John' },
  {
    $pullAll: {
      products: [{ oranges: 7 }, { bananas: 5 }]
    }
  }
)
print('=============== 2 ==============')
db.customers.find()
print('=============== 2 ==============')
