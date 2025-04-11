load('../random.js')

db.customers.drop()

db.createCollection('customers')

const users = []

for (let i = 0; i < 10; i++) {
  users.push({
    firstName: faker.firstName(),
    lastName: faker.lastName(),
    orders: randomProducts(randomNumber(1, 5))
  })
}

db.customers.insertMany(users)

cls

db.customers.createIndex({ 'orders.product': 1 })

db.customers.find({ 'orders.product': 'Oranges' })

db.customers.getIndexes()

//   {
//     _id: ObjectId('666c86b6c331f17f6acdcdfc'),
//     firstName: 'Rafael',
//     lastName: 'Smithson',
//     orders: [
//       {
// !       product: 'Potatoes', <-- індексуємо це поле
//         count: 20
//       },
//       { product: 'Potatoes', count: 16 },
//       { product: 'Apples', count: 4 },
//       { product: 'Lemons', count: 22 },
//       { product: 'Oranges', count: 21 }
//     ]
//   }
