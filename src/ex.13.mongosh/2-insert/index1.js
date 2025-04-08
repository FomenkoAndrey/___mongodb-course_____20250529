cls

db.customers.drop()
db.createCollection('customers')

const getCount = () => {
  const stats = db.customers.stats()
  return stats.count || 0
}

print('Number of documents before insert:', getCount())

db.customers.insertOne({ name: 'John' })

print('Number of documents after insert:', getCount())
