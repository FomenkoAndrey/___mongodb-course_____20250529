db = db.getSiblingDB('mainDB') // Вибір бази даних

// Створення користувача з правами для роботи з базою 'maindb'
db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [{ role: 'dbOwner', db: 'mainDB' }] // Користувачу надається роль dbOwner для бази даних mainDB, що дозволяє користувачеві виконувати будь-які операції всередині цієї бази даних, включно зі зміною схем, створенням нових колекцій, читанням і записом даних.
})

db.createCollection('users') // Створення колекції

// Додавання документу в колекцію 'users'
db.users.insertOne({
  name: 'John Doe',
  email: 'johndoe@example.com',
  age: 30
})
