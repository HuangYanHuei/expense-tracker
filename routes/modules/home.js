// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  const category = req.query.value
  let totalAmount = 0
  if (!category || category === 'all') {
    Record.find({ userId })
      .lean()
      .sort({ _id: 'asc' })
      .then((records) => {
        records.map(value => totalAmount += value.amount)
        res.render('index', { records, totalAmount })
      })
  } else {
    Category.findOne({ name: category })
      .lean()
      .then((categorys) => {
        const categoryId = categorys._id
        const categoryIcon = categorys.icon
        return Record.find({ userId, categoryId })
          .lean()
          .sort({ _id: 'asc' })
          .then((records) => {
            let totalAmount = 0
            records.map(value => totalAmount += value.amount)
            records.map(value => value.icon = categoryIcon)
            res.render('index', { records, totalAmount })
          })
      })
      .catch(error => console.error(error))
  }
})
// 匯出路由模組
module.exports = router