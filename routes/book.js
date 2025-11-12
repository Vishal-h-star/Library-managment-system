const  express = require('express')
const {books} = require('../Data/books.json')

const router =  express.Router()

router.get('/', (req,res)=>{
   res.status(200).json({
     success:true,
     data: books,
   })
})



module.exports = router;