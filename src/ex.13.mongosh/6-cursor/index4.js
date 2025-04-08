load('../random.js')

db.customers.drop()
db.backup.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(200))

const cursor = db.customers.find({})
const cursorWithQuery = db.customers.find({ firstName: /jo/i })

cls

print('============= CURSOR =============')
print('cursor', cursor.size())
print('=======================================')

while (cursorWithQuery.hasNext()) {
  const { firstName, lastName } = cursorWithQuery.next()
  print(firstName, lastName)
}

print('============= CURSOR WITH QUERY =============')
print('cursorWithQuery', cursorWithQuery.size())
print('=======================================')
