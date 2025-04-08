load('../random.js')

db.customers.drop()

db.createCollection('customers')

db.customers.insertMany(getUsers(30, 10))

cls

const itemsPerPage = 10
const pages = Math.ceil(db.customers.countDocuments({}) / itemsPerPage)

for (let page = 0; page < pages; page++) {
  print(`============= Page: ${page + 1} =============`)

  const cursor = db.customers
    .find(
      {},
      {
        _id: false,
        firstName: true,
        lastName: true,
        orders: true
      }
    )
    .sort({ orders: -1 })
    .skip(page * itemsPerPage)
    .limit(itemsPerPage)

  print(cursor.toArray())
}
