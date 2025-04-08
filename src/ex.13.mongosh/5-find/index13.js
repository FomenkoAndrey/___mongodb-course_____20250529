load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(1000, 10, -1))

const query = [{ scores: { $size: 7 } }]

if (true) {
  query.push({ firstName: /jo/gi })
  // ! query (було)
  // [{ scores: { $size: 7 } }

  // ! query (стало)
  // [{ scores: { $size: 7 } }, { firstName: /jo/gi }]
}

cls

db.customers.find(
  { $and: query },
  { _id: false, firstName: true, scores: true }
)
