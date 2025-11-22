const { BookModel, UserModel } = require("../Models")
const IssueBook = require('../dtos/book-dto')

// const getAllBooks = () =>{

// }

// const getSingleBookById = () =>{

// }


// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }

// This approch will be headache is there are good amount of methods

exports.getAllBooks = async (req, res) => {
    const books = await BookModel.find()
    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books in System"
        })
    }

    res.status(200).json({
        success: true,
        data: books,
    })
}

exports.getSingleBookById = async (req, res) => {
    const id = req.params.id
    // here findById is method from mongoose
    // which is equivalent to 
    // User.findOne({ _id: "676a3f79d38f4d2a6f43c55e" })
    const book = await BookModel.findById(id)

    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book id ${id} not found`
        })
    }

    res.status(200).json({
        success: true,
        data: book,
    })
}


exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModel.find({
        issueBook: { $exists: true }
    }).populate("issueBook")

    const issuedBooks = users.map((user) => {
        return new IssueBook(user);
    })

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Books issued yet"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks,
    })
}

exports.addNewBook = async (req, res) => {
    const { data } = req.body

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please Provide data to add a new book"
        })
    }

    await BookModel.create(data)

    //    if want to show the book which is added
    //  res.status(201).json({
    //     success:true,
    //      message:"Book is added"
    //     data
    //  })

    // if want to show the all book  now then

    const allBooks = await BookModel.find()
    res.status(201).json({
        success: true,
        message: "Book is added",
        data: allBooks
    })
}

exports.updateBookById = async (req, res) => {
    const id = req.params.id
    const { data } = req.body

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide data to update"
        })
    }

    //  1 method

    // const book = await BookModel.findById(id)
    // if(!book){
    //     return res.status(404).json({
    //         success:false,
    //         message: `Book not found by Id ${id}`
    //     })
    // }

    // Object.assign(book, data)
    // await book.save()

    // res.status(200).json({
    //     success:true,
    //     message:`Book is updated by Id : ${id}`
    // })

    // 2 method
    const updatedBook = await BookModel.findByIdAndUpdate(
        { _id: id },
        data,
        { new: true }
    )

    if (!updatedBook) {
        return res.status(404).json({
            success: fales,
            message: `Book not found by Id ${id}`
        })
    }

    res.status(200).json({
        success: true,
        message: `Book data is updated`
    })



}

exports.deleteBookById = async (req, res) => {
    const id = req.params.id
    const book =   await BookModel.findById(id)

    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book not found by this id :${id}`
        })
    }
    
    await BookModel.findByIdAndDelete(id)
    res.status(200).json({
        success:true,
        message:`Book deleted successfully`
    })
}