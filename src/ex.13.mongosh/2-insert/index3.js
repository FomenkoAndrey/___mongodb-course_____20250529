cls

db.customers.drop()

const getCount = () => {
  try {
    const stats = db.customers.stats()
    return stats.count || 0
  } catch (error) {
    console.error('Error getting count')
    return 0
  }
}

print('Number of documents before insert', getCount())

db.customers.insertOne({ name: 'John' })

print('Number of documents after insert', getCount())
