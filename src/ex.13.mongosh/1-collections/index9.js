cls

db.customers.drop()
db.createCollection('customers')

print('Collection is capped?', db.customers.stats().capped)
print('Capped collection max size', db.customers.stats().maxSize)

print('============= CONVERT TO CAPPED START =============')
db.customers.convertToCapped(65535)
print('============= CONVERT TO CAPPED END =============')

print('Collection is capped?', db.customers.stats().capped)
print('Capped collection max size', db.customers.stats().maxSize, 'bytes')
