const express = require('express')
const Author = require('../models/author')
const router = express.Router()

// All authors route
router.get('/', async (req, res) => {
    try {
        let searchOptions = {}
        let searchText = req.query.name
        if (searchText != null && searchText != '') {
            searchOptions.name = new RegExp(searchText, 'i')
        }

        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New author route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author()})
})

// Create new author
router.post('/', async (req, res) => {
   const author = new Author ({
    name: req.body.name
   })
   try {
        const newAuthor = await author.save()
        //res.redirect('authors/${newAuthor.id}')
        res.redirect('authors')
   } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'New author was not saved'
        })
   }
})

module.exports = router