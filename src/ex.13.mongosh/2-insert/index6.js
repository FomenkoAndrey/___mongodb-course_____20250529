cls

db.customers.drop()

print('=========== 1 ============')

try {
  db.customers.insertOne({ _id: 1 })
  db.customers.insertOne({ _id: 1 })
} catch (error) {
  print('Write error:', error.message)
}

print('=========== 2 ============')
try {
  db.customers.insertMany([{ name: 'John' }])
} catch (error) {
  print('Error:', error.message)
}
