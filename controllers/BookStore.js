const BookStore = require('../models/bookstore')

const getAllBooks = async(req, res)=>{
    const books= await BookStore.find({})
    if (!books) {
        res.status(200).json({msg:"No Books available"})
    }
    else{
        res.status(200).json({books})
    }
}

const addBook = async(req, res)=>{
    const data = req.body
    const books = await BookStore.create(data)
    if(!books){
        res.status(500).json({msg:"Failed to add book"})
    }
    else{
        res.status(201).json({books})
    }
}

const updateBook = async (req, res) => {
    const books = await BookStore.findById(req.params.id);
    Object.assign(books, req.body);
    books.save();
    res.status(201).json({ books });

    // res.send({ data: books });
}

const deleteBook = async (req, res) => {
    try {
        const{id:bookId} = req.params
        const book = await BookStore.findByIdAndDelete({_id:bookId})
        if (!book) {
            res.status(200).json({msg: `No book with id ${bookId}`})
        }
        res.status(200).json({msg:"Book Deleted Successfully" })

    } catch {
        res.status(404).send({ error: "Book is not found! " });
    }
}

const singleBook = async (req, res) => {
    const{id:bookId} = req.params
    const book = await BookStore.findOne({_id:bookId})
    if (!book) {
        res.status(200).json({msg: `No book with id ${bookId}`})
    }
    res.status(200).json({ book })
}

module.exports = {getAllBooks, addBook, updateBook, deleteBook, singleBook}