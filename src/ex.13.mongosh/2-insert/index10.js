cls

db.customers.drop()

const { insertedId } = db.customers.insertOne({ name: 'John' })

print('_id:', insertedId)
print('Type of _id:', typeof insertedId)
