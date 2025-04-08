cls

db.customers.drop()

db.customers.updateMany(
  { name: 'John' },
  { $set: { name: 'Andrii' } },
  { upsert: true }
)

db.customers.find()
