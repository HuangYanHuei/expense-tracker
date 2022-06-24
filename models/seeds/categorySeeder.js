const mongoose = require('mongoose')
const Category = require('../category')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const category_seed = [
  {
    id: '1',
    name: '家居物業',
    icon: 'fa-house'
  },
  {
    id: '2',
    name: '交通出行',
    icon: 'fa-van-shuttle'
  },
  {
    id: '3',
    name: '休閒娛樂',
    icon: 'fa-face-grin-beam'
  },
  {
    id: '4',
    name: '餐飲食品',
    icon: 'fa-utensils'
  },
  {
    id: '5',
    name: '其他',
    icon: 'fa-pen'
  }
]
db.once('open', async () => {
  await Category.create(category_seed)
  console.log('mongodb connected!')
  console.log('done')
})

