cls

db.customers.drop()

db.customers.insertOne({
  name: 'John',
  scores: [1, 2, 3, 4, 5]
})

print('=============== 1 ==============')
db.customers.find()
print('=============== 1 ==============')

db.customers.updateOne(
  { name: 'John' },
  {
    $push: {
      scores: {
        $each: [7, 8, 9],
        $position: 2
      }
    }
  }
)
print('=============== 2 ==============')
db.customers.find()
print('=============== 2 ==============')
