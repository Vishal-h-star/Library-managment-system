const express = require('express')
const { books } = require('../Data/books.json')

const router = express.Router()

// -------->>------------->------------->>
// Route: /books
// Method : Get
// Description:  Get all the list of books  in the system
// Access: public
// Parameters :none

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    })
})

// ----------->--------------------->
// Route: /books/:id
// Method : Get
// Description:  Get a book details by their id
// Access: public
// Parameters : id

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const book = books.find((book) => book.id === id)
    if (!book) {
        res.status(404).json({
            success: false,
            message: `Book id ${id} not found`
        })
    }

    res.status(200).json({
        success: true,
        data: book,
    })
})



// ----------->--------------------->
// Route: /books
// Method : POST
// Description:   creating /entering new book detail
// Access: public
// Parameters : None

//  {
//             "id": 1,
//             "name": "The Silent Patient",
//             "author": "Alex Michaelides",
//             "genre": "Psychological Thriller",
//             "price": 499,
//             "publisher": "Orion Publishing"
//         }

router.post('/', (req, res) => {
    const { id, name, author, genre, price, publisher } = req.body;
     console.log( id, name, author, genre, price, publisher)
    if (!id || !name || !author || !genre || !price || !publisher) {
        res.status(400).json({
            success: false,
            message: "Please  enter all the required details"
        })
    }
    const book = books.find((book) => book.id === Number(id))
    if (book) {
        return res.status(409).json({
            success: false,
            message: "Given id is already registerd"
        })
    }

    books.push({id, name, author, genre, price, publisher})
    res.status(201).json({
        success:true,
        message:"New book is added"
    })
})




module.exports = router;