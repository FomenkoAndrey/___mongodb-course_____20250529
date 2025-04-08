cls

db.customers.drop()

const { insertedId } = db.customers.insertOne({ name: 'John' })

print(insertedId.getTimestamp())
print(insertedId.toString())
print(insertedId.valueOf())
