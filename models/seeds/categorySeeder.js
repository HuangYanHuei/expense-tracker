const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const category_seed = [
  {
    name: '家居物業'
  },
  {
    name: '交通出行'
  },
  {
    name: '休閒娛樂'
  },
  {
    name: '餐飲食品'
  },
  {
    name: '其他'
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  category_seed.map(seed => {
    Category.create({
      name: seed.name
    })
  })
  console.log('done')
})

