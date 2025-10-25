/*
 * ДЕМОНСТРАЦІЯ РОЗМІРУ ІНДЕКСІВ ПРИ ВИДАЛЕННІ ДОКУМЕНТІВ
 *
 * Цей приклад показує:
 * - Як змінюється розмір індексів при вставці та видаленні документів
 * - Чи оновлюються розміри індексів автоматично після операцій
 * - Проблему фрагментації індексів в MongoDB
 * - Порівняння розмірів індексів на різних етапах з затримками
 * - Ефект фонового оновлення індексів через 30 секунд
 */

import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { users } from '../helpers/fakeUsers.mjs'

dotenv.config({ quiet: true })

// Час очікування перед повторним запитом індексів (в секундах)
const INDEX_REFRESH_DELAY = 30

// Функція для порівняння розмірів індексів
function compareIndexSizes(statsBefore, statsAfter, title, additionalStats = null) {
  console.log(chalk.yellowBright(`\n=== ${title} ===`))
  console.log(chalk.greenBright('Розмір індексів до видалення:'), statsBefore.totalIndexSize, 'байт')
  console.log(chalk.redBright('Розмір індексів після видалення:'), statsAfter.totalIndexSize, 'байт')

  if (additionalStats) {
    console.log(
      chalk.blueBright(`Розмір індексів після затримки (${INDEX_REFRESH_DELAY} сек):`),
      additionalStats.totalIndexSize,
      'байт'
    )
  }

  const immediateDifference = statsBefore.totalIndexSize - statsAfter.totalIndexSize
  console.log(chalk.cyanBright('Різниця в розмірі:'), immediateDifference, 'байт')

  if (additionalStats) {
    const delayedDifference = statsBefore.totalIndexSize - additionalStats.totalIndexSize
    const changeAfterDelay = statsAfter.totalIndexSize - additionalStats.totalIndexSize
    console.log(chalk.cyanBright(`Різниця в розмірі (через ${INDEX_REFRESH_DELAY} сек):`), delayedDifference, 'байт')
    console.log(chalk.cyanBright(`Зміна після затримки:`), changeAfterDelay, 'байт')

    if (changeAfterDelay < 0) {
      console.log(chalk.greenBright(`✅ Індекси оновилися після ${INDEX_REFRESH_DELAY} секунд очікування!`))
    } else if (immediateDifference > 0) {
      console.log(chalk.greenBright('✅ Індекси автоматично оновлено після видалення документів!'))
    } else if (immediateDifference < 0) {
      console.log(chalk.redBright('❌ Розмір індексів ЗБІЛЬШИВСЯ після видалення! Це вказує на фрагментацію індексів.'))
    } else {
      console.log(chalk.yellowBright('⚠️ Розмір індексів залишився незмінним'))
    }
  } else {
    if (immediateDifference > 0) {
      console.log(chalk.greenBright('✅ Індекси автоматично оновлено після видалення документів!'))
    } else if (immediateDifference < 0) {
      console.log(chalk.redBright('❌ Розмір індексів ЗБІЛЬШИВСЯ після видалення! Це вказує на фрагментацію індексів.'))
    } else {
      console.log(chalk.yellowBright('⚠️ Розмір індексів залишився незмінним'))
    }
  }
}

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI)
  const dbName = process.env.DB_NAME

  try {
    await client.connect()
    console.log('Підключено до бази даних')

    const db = client.db(dbName)
    const usersCollection = db.collection('users')

    const collections = await db.listCollections({}, { nameOnly: true }).toArray()
    const usersCollectionExists = collections.some((col) => col.name === 'users')

    if (usersCollectionExists) {
      await usersCollection.drop()
      console.log(chalk.redBright('Колекцію "users" видалено.'))
    }

    // Вставляємо документи
    await usersCollection.insertMany(users)
    console.log(chalk.greenBright('Документи вставлено в колекцію "users".'))

    // Створюємо індекс
    await usersCollection.createIndex({ 'person.first': 1, 'person.last': -1 })
    console.log(chalk.greenBright('Індекси для person.first та person.last створено.'))

    // Отримуємо статистику колекції після додавання документів
    const statsAfterInsert = await db.command({ collStats: 'users' })
    console.log(chalk.yellowBright('\n=== СТАТИСТИКА ПІСЛЯ ВСТАВКИ ДОКУМЕНТІВ ==='))
    console.log(chalk.cyanBright('Загальна кількість документів:'), statsAfterInsert.count)
    console.log(chalk.cyanBright('Розмір колекції:'), statsAfterInsert.size, 'байт')
    console.log(chalk.cyanBright('Загальний розмір індексів:'), statsAfterInsert.totalIndexSize, 'байт')

    // Очікуємо перед повторним запитом індексів після вставки
    console.log(chalk.yellowBright(`\n=== ОЧІКУВАННЯ ${INDEX_REFRESH_DELAY} СЕКУНД ПІСЛЯ ВСТАВКИ ===`))
    console.log(chalk.cyanBright(`Чекаємо ${INDEX_REFRESH_DELAY} секунд перед повторним запитом індексів...`))
    console.log(chalk.cyanBright('Це дозволяє MongoDB стабілізувати індекси після масової вставки.'))

    await new Promise((resolve) => setTimeout(resolve, INDEX_REFRESH_DELAY * 1000))

    console.log(
      chalk.greenBright(`\n✅ Очікування завершено! Перевіряємо індекси через ${INDEX_REFRESH_DELAY} секунд...`)
    )

    // Отримуємо статистику колекції після затримки після вставки
    const statsAfterInsertDelay = await db.command({ collStats: 'users' })
    console.log(chalk.yellowBright('\n=== СТАТИСТИКА ПІСЛЯ ЗАТРИМКИ ПІСЛЯ ВСТАВКИ ==='))
    console.log(chalk.cyanBright('Загальна кількість документів:'), statsAfterInsertDelay.count)
    console.log(chalk.cyanBright('Розмір колекції:'), statsAfterInsertDelay.size, 'байт')
    console.log(chalk.cyanBright('Загальний розмір індексів:'), statsAfterInsertDelay.totalIndexSize, 'байт')

    // Порівняння розмірів індексів після вставки
    compareIndexSizes(statsAfterInsert, statsAfterInsertDelay, 'ПОРІВНЯННЯ ПІСЛЯ ВСТАВКИ')

    // Видаляємо всі документи
    console.log(chalk.redBright('\n=== ВИДАЛЕННЯ ВСІХ ДОКУМЕНТІВ ==='))
    const deleteResult = await usersCollection.deleteMany({})
    console.log(chalk.redBright(`Видалено ${deleteResult.deletedCount} документів.`))

    // Отримуємо статистику колекції після видалення документів
    const statsAfterDelete = await db.command({ collStats: 'users' })
    console.log(chalk.yellowBright('\n=== СТАТИСТИКА ПІСЛЯ ВИДАЛЕННЯ ДОКУМЕНТІВ ==='))
    console.log(chalk.cyanBright('Загальна кількість документів:'), statsAfterDelete.count)
    console.log(chalk.cyanBright('Розмір колекції:'), statsAfterDelete.size, 'байт')
    console.log(chalk.cyanBright('Загальний розмір індексів:'), statsAfterDelete.totalIndexSize, 'байт')

    // Перше порівняння - після видалення
    compareIndexSizes(statsAfterInsertDelay, statsAfterDelete, 'ПОРІВНЯННЯ ПІСЛЯ ВИДАЛЕННЯ')

    // Очікуємо перед повторним запитом індексів
    console.log(chalk.yellowBright(`\n=== ОЧІКУВАННЯ ${INDEX_REFRESH_DELAY} СЕКУНД ===`))
    console.log(chalk.cyanBright(`Чекаємо ${INDEX_REFRESH_DELAY} секунд перед повторним запитом індексів...`))
    console.log(chalk.cyanBright('Це дозволяє MongoDB оновити індекси в фоновому режимі.'))

    await new Promise((resolve) => setTimeout(resolve, INDEX_REFRESH_DELAY * 1000))

    console.log(
      chalk.greenBright(`\n✅ Очікування завершено! Перевіряємо індекси через ${INDEX_REFRESH_DELAY} секунд...`)
    )

    // Отримуємо фінальну статистику після затримки
    const statsAfterDelay = await db.command({ collStats: 'users' })
    console.log(chalk.yellowBright('\n=== ФІНАЛЬНА СТАТИСТИКА ПІСЛЯ ЗАТРИМКИ ==='))
    console.log(chalk.cyanBright('Загальна кількість документів:'), statsAfterDelay.count)
    console.log(chalk.cyanBright('Розмір колекції:'), statsAfterDelay.size, 'байт')
    console.log(chalk.cyanBright('Загальний розмір індексів:'), statsAfterDelay.totalIndexSize, 'байт')

    // Друге порівняння - після затримки
    compareIndexSizes(statsAfterInsertDelay, statsAfterDelete, 'ПОРІВНЯННЯ ПІСЛЯ ЗАТРИМКИ', statsAfterDelay)

    await client.close()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await client.close()
  }
}

run()

/*
 * ВИСНОВОК:
 *
 * 1. MongoDB НЕ оновлює розмір індексів автоматично при операціях з документами
 * 2. Вставка та видалення документів призводить до фрагментації індексів
 * 3. Розмір індексів може залишатися незмінним або навіть збільшуватися
 * 4. Це демонструє проблему фрагментації індексів в MongoDB
 * 5. Фрагментація може впливати на продуктивність запитів
 * 6. Важливо враховувати цю поведінку при плануванні операцій з БД
 * 7. Для очищення фрагментації потрібні спеціальні команди (reIndex)
 * 8. Затримка в 30 секунд дозволяє MongoDB стабілізувати індекси в фоновому режимі
 * 9. Час затримки можна налаштувати через змінну INDEX_REFRESH_DELAY
 * 10. Приклад демонструє чотири стани: після вставки, після стабілізації, після видалення, після затримки
 */
