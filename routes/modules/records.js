const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  Category.findOne({ name: category })
    .lean()
    .then((categorys) => {
      const categoryId = categorys._id
      return Record.create({
        name, date, amount, userId, categoryId
      })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then((records) => {
      const categoryId = records.categoryId
      Category.findOne({ _id: categoryId })
        .lean()
        .then((categorys) => {
          res.render('edit', { records, categorys })
        })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, amount, category } = req.body
  Category.findOne({ name: category })
    .lean()
    .then((categorys) => {
      const categoryId = categorys._id
      return Record.findByIdAndUpdate({ _id, userId }, { name, date, amount, categoryId })
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findByIdAndRemove({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router