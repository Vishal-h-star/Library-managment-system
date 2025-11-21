const express = require('express')
const { books } = require('../Data/books.json')
const { users } = require('../Data/user.json')

const { UserModel , BookModel} = require('../Models')

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
    console.log(id, name, author, genre, price, publisher)
    if (!id || !name || !author || !genre || !price || !publisher) {
        res.status(400).json({
            success: false,
            message: "Please  enter all the required details"
        })
    }
    const book = books.find((book) => book.id === Number(id))
    if (book) {
        //  indicates that the request could not be completed due to a conflict with the current state of the target resource.
        return res.status(409).json({
            success: false,
            message: "Given id is already registerd"
        })
    }

    books.push({ id, name, author, genre, price, publisher })
    res.status(201).json({
        success: true,
        message: "New book is added"
    })
})


// ----------->--------------------->
// Route: /books/:id
// Method : PUT
// Description:   Editing the  book details
// Access: public
// Parameters :  id

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const { data } = req.body

    const book = books.find((book) => book.id === id)
    console.log("book which have to find", book)
    if (!book) {
        return res.status(404).json({
            success: true,
            message: `Book not found by the give id : ${id}`
        })
    }

    const updatedBooks = books.map((book) => {
        if (book.id === id) {
            return {
                ...book,
                ...data,
                id: book.id
            }
        }
        return book
    })


    //    both ways  are coorect 
    // const updatedBooks = books.map((book) =>
    //     book.id === id
    //         ? { ...book, ...data, id: book.id }
    //         : book
    // );

    res.status(200).json({
        success: true,
        data: updatedBooks,
        message: `Book is updated with id number : ${id} `
    })
})

// ----------->--------------------->
// Route: /books/:id
// Method : DELETE
// Description:  Deleting books by their id 
// Access: public
// Parameters :  id

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    const book = books.find((book) => book.id === id)
    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book id is not found`
        })
    }

    // const remaningBooks = books.filter((book) => book.id !== id)
    const bookToremove = books.indexOf(book)
    if (bookToremove > -1) {
        books.splice(bookToremove, 1)
    }

    res.status(200).json({
        success: true,
        message: `Book id  ${id} is deleted`
    })


})


// ----------->--------------------->
// Route: /books/issued/for-users
// Method : GET
// Description: Get all the issued books
// Access: public
// Parameters :  None

router.get('/issued/for-users', (req, res) => {

    // each user  to whom book is issued 
    const userWithIssuedBook = users.filter((user) => {
        if (user.issueBook) {
            return user
        }
    })

    let issueBooks = []

    userWithIssuedBook.forEach((each) => {

        const book = books.find((book) => book.id === Number(each.issueBook))

        // console.log("Book found with same id", book)

        book.issuedBy = each.name
        book.issuedDate = each.issueDate
        book.returnDate = each.returnDate


        issueBooks.push(book)
    })

    if (issueBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No book issue yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issueBooks,
    })
})





module.exports = router;