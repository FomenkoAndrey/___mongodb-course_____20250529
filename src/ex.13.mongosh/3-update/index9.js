cls

db.customers.drop()

db.customers.insertOne({ name: 'John', products: [{ apples: 12 }] })

print('=============== 1 ==============')
db.customers.find()
print('=============== 1 ==============')

db.customers.updateOne(
  { name: 'John' },
  {
    $push: {
      products: { oranges: 7 }
    }
  }
)

print('=============== 2 ==============')
db.customers.find()
print('=============== 2 ==============')
