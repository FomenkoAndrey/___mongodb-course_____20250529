load('../random.js')

db.customers.drop()
db.reports.drop()
db.backup.drop()

db.createCollection('customers')
db.createCollection('backup')

db.customers.insertMany(getUsers(10))

const cursor = db.customers.find({})

cls

cursor.forEach((doc) => {
  print(`Save to backup ${doc._id.valueOf()}`)
  db.backup.insertOne(doc)
})

db.customers.find(
  {},
  { _id: false, firstName: true, lastName: true }
)

db.backup.find(
  {},
  { _id: false, firstName: true, lastName: true }
)
