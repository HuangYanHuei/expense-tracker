const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const category_seed = [
  {
    name: '家居物業',
    icon: 'fa-house'
  },
  {
    name: '交通出行',
    icon: 'fa-van-shuttle'
  },
  {
    name: '休閒娛樂',
    icon: 'fa-face-grin-beam'
  },
  {
    name: '餐飲食品',
    icon: 'fa-utensils'
  },
  {
    name: '其他',
    icon: 'fa-pen'
  }
]

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  category_seed.map(seed => {
    Category.create({
      name: seed.name,
      icon: seed.icon
    })
  })
  console.log('done')
})

