if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const bcrypt = require('bcryptjs')
const recordList = require("./records.json").results
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'Gene',
    email: 'user1@example.com',
    password: '12345678'
  }
]

db.once('open', async () => {
  try {
    await Promise.all(
      SEED_USER.map(async seed => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(seed.password, salt)
        await User.create({
          name: seed.name,
          email: seed.email,
          password: hash
        })
      })
    )
    await Promise.all(
      recordList.map(async record => {
        const user = await User.findOne({ name: record.user })
        record.userId = user._id
        const category = await Category.findOne({ icon: record.icon })
        record.categoryId = category._id
        await Record.create(record)
      })
    )
    console.log('Done')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})