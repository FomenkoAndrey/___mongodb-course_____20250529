load('../random.js')

db.customers.drop()
db.reports.drop()

db.createCollection('customers')
db.createCollection('reports')

db.customers.insertMany(getUsers(10))

const cursor = db.customers.find({})

cls

while (cursor.hasNext()) {
  const { _id, firstName, lastName } = cursor.next()

  db.reports.insertOne({ message: `${firstName} ${lastName} has id: ${_id.valueOf()}` })
}

db.reports.find({}, { _id: false })
