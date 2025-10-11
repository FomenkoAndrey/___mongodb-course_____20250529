import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config({ quiet: true })

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI)
  const dbName = process.env.DB_NAME

  try {
    await client.connect()
    console.log('Connected to Database')

    const db = client.db(dbName)

    const collections = await db.listCollections({ name: 'users' }).toArray()
    if (collections.length > 0) {
      await db.collection('users').drop()
      console.log(chalk.redBright('Collection "users" has been dropped.'))
    } else {
      console.log(chalk.yellowBright('Collection "users" does not exist. Skipping drop.'))
    }

    const usersToInsert = [
      { name: 'John Doe', age: 30 },
      { name: 'Jane Smith', age: 25 },
      { name: 'Alice Johnson', age: 28 },
      { name: 'Bob Williams', age: 35 },
      { name: 'Charlie Brown', age: 22 }
    ]

    const numberNames = ['Перший', 'Другий', 'Третій', 'Четвертий', "П'ятий"]

    // Створюємо ОДИН спільний _id для всіх документів (демонстрація проблеми!)
    const commonId = new ObjectId()
    console.log(chalk.yellowBright('\n⚠️  Увага: Використовується ОДИН _id для всіх документів!\n'))

    for await (const [index, user] of usersToInsert.entries()) {
      try {
        const result = await db.collection('users').insertOne({
          _id: commonId,
          ...user
        })
        console.log(chalk.greenBright(`${numberNames[index]} документ вставлено у колекцію "users".`))
        console.log(chalk.black.bgGreenBright(`result${index + 1}:`), result)
      } catch (insertError) {
        // Обробка помилки дублювання _id
        if (insertError.code === 11000) {
          console.log(chalk.redBright(`\n❌ ${numberNames[index]} документ: Помилка! _id вже існує.`))
          console.log(chalk.gray(`   Документ: ${user.name} (вік: ${user.age})`))
          console.log(chalk.gray(`   Причина: Дублювання унікального ключа _id\n`))
        } else {
          console.log(chalk.redBright(`\n❌ ${numberNames[index]} документ: Невідома помилка`))
          console.log(chalk.gray(`   ${insertError.message}\n`))
        }
      }
    }

    const documents = await db.collection('users').find({}).toArray()
    console.log(chalk.magentaBright('\nContents of the "users" collection:'))
    console.log(chalk.cyan(`Знайдено документів: ${documents.length}`))
    documents.forEach((doc, i) => {
      console.log(chalk.gray(`  ${i + 1}. ${doc.name} (вік: ${doc.age})`))
    })
  } catch (error) {
    console.error(chalk.redBright('\n❌ Помилка підключення до MongoDB:'), error.message)
  } finally {
    await client.close()
  }
}

run()
