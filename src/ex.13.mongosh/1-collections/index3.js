cls

db.users.drop()
db.customers.drop()
db.details.drop()

db.createCollection('users')
db.getCollectionNames()

db.users.renameCollection('customers')
db.getCollectionNames()
