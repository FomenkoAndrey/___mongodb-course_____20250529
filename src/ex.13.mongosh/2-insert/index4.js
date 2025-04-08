cls

db.customers.drop()
db.createCollection('customers')

const getCount = () => {
  try {
    const stats = db.customers.stats()
    return stats.count || 0
  } catch (error) {
    return 0
  }
}

print('Number of documents before insert', getCount())

db.customers.insertMany([{ name: 'John' }, { name: 'Bob' }, { name: 'Mary' }, { name: 'Karl' }])

print('Number of documents after insert', getCount())
