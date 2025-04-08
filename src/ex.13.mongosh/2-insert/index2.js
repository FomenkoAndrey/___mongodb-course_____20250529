cls

db.customers.drop()
db.createCollection('customers')

const getCount = () => {
  const stats = db.customers.stats()
  return stats.count || 0
}

print('Number of documents before insert', getCount())

const users = []

for (let i = 0; i < 1000; i++) {
  users.push({ name: `John${i}` })
}

db.customers.insertMany([{ name: 'John' }, { name: 'Andrey' }, { name: 'Julia' }])
db.customers.insertMany(users)

print('Number of documents after insert', getCount())
