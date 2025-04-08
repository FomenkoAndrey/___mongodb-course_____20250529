cls

db.customers.drop()

db.customers.insertOne({ name: 'John', age: 25 })

print('=============== 1 ==============')
db.customers.find()
print('=============== 1 ==============')

db.customers.updateOne(
  { name: 'John' },
  { $unset: { age: true } }
)

print('=============== 2 ==============')
db.customers.find()
print('=============== 2 ==============')
