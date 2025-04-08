cls

db.customers.drop()

db.customers.insertOne({
  name: 'John',
  scores: [920, 230]
})

print('=============== 1 ==============')
db.customers.find()
print('=============== 1 ==============')

db.customers.updateOne(
  { name: 'John' },
  {
    $push: {
      scores: { $each: [50, 90, 40, 35] }
    }
  }
)

print('=============== 2 ==============')
db.customers.find()
print('=============== 2 ==============')

db.customers.updateOne(
  { name: 'John' },
  {
    $addToSet: {
      scores: { $each: [50, 90, 40, 86, 89] }
    }
  }
)

print('=============== 3 ==============')
db.customers.find()
print('=============== 3 ==============')
