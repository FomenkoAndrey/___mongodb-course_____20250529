cls

db.customers.drop()

const { insertedId } = db.customers.insertOne({
  name: 'John',
  scores: [70, 62]
})

db.customers.updateOne(
  { _id: insertedId },
  { $set: { name: 'Andrii' } }
)

db.customers.find()
